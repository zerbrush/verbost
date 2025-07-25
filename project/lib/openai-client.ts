import OpenAI from 'openai';

// Initialize OpenAI client with robust configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
  maxRetries: 0, // We'll handle retries manually for better control
  timeout: parseInt(process.env.OPENAI_TIMEOUT || '90000'),
});

// Rate limiting and queue management
class APIRateLimiter {
  private requests: number[] = [];
  private maxRequestsPerMinute: number;
  private queue: Array<{
    requestFn: () => Promise<any>;
    resolve: (value: any) => void;
    reject: (error: any) => void;
    attempts: number;
  }> = [];
  private processing = false;

  constructor() {
    this.maxRequestsPerMinute = parseInt(process.env.OPENAI_REQUESTS_PER_MINUTE || '45');
  }

  async addRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({ requestFn, resolve, reject, attempts: 0 });
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    
    while (this.queue.length > 0) {
      // Check rate limit
      const now = Date.now();
      this.requests = this.requests.filter(time => now - time < 60000);
      
      if (this.requests.length >= this.maxRequestsPerMinute) {
        // Wait until we can make another request
        const oldestRequest = Math.min(...this.requests);
        const waitTime = 60000 - (now - oldestRequest) + 1000; // Add 1s buffer
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      
      const { requestFn, resolve, reject, attempts } = this.queue.shift()!;
      this.requests.push(now);
      
      try {
        const result = await this.executeWithRetry(requestFn, attempts);
        resolve(result);
      } catch (error) {
        reject(error);
      }
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    this.processing = false;
  }

  private async executeWithRetry(requestFn: () => Promise<any>, currentAttempt = 0): Promise<any> {
    const maxRetries = parseInt(process.env.OPENAI_MAX_RETRIES || '3');
    
    try {
      return await requestFn();
    } catch (error: any) {
      console.error(`OpenAI API error (attempt ${currentAttempt + 1}):`, error.message);
      
      if (currentAttempt >= maxRetries) {
        // Final failure - implement fallback strategy
        return this.handleFinalFailure(error);
      }
      
      // Exponential backoff
      const delay = Math.min(
        parseInt(process.env.OPENAI_RETRY_DELAY || '2000') * Math.pow(2, currentAttempt),
        30000 // Max 30 seconds
      );
      
      await new Promise(resolve => setTimeout(resolve, delay));
      return this.executeWithRetry(requestFn, currentAttempt + 1);
    }
  }

  private handleFinalFailure(error: any) {
    // Return structured fallback response
    return {
      score: 50, // Neutral score
      grade: 'C',
      findings: ['Assessment temporarily unavailable due to high demand'],
      recommendations: [
        {
          title: 'Schedule Detailed Analysis',
          description: 'Our AI analysis is currently experiencing high demand. Schedule a free consultation for a comprehensive manual review.',
          impact: 'Get expert insights when our automated system is available',
          difficulty: 'Easy',
          priority: 'High'
        }
      ],
      summary: 'Automated analysis temporarily unavailable. Please schedule a consultation for detailed insights.',
      fallback: true
    };
  }
}

export const rateLimiter = new APIRateLimiter();

// Cost monitoring and usage tracking
class CostMonitor {
  private dailyUsage = { date: new Date().toDateString(), assessments: 0, tokens: 0, cost: 0 };
  private monthlyUsage = { month: new Date().getMonth(), assessments: 0, tokens: 0, cost: 0 };

  async logTokenUsage(category: string, usage: any) {
    const cost = this.calculateCost(usage);
    
    // Update daily usage
    const today = new Date().toDateString();
    if (this.dailyUsage.date !== today) {
      this.dailyUsage = { date: today, assessments: 0, tokens: 0, cost: 0 };
    }
    
    this.dailyUsage.tokens += usage.total_tokens;
    this.dailyUsage.cost += cost;
    
    // Update monthly usage
    const currentMonth = new Date().getMonth();
    if (this.monthlyUsage.month !== currentMonth) {
      this.monthlyUsage = { month: currentMonth, assessments: 0, tokens: 0, cost: 0 };
    }
    
    this.monthlyUsage.tokens += usage.total_tokens;
    this.monthlyUsage.cost += cost;
    
    // Check for alerts
    await this.checkCostAlerts();
  }

  private calculateCost(usage: any) {
    // GPT-4 Turbo pricing
    const inputCost = (usage.prompt_tokens / 1000) * 0.01;
    const outputCost = (usage.completion_tokens / 1000) * 0.03;
    return inputCost + outputCost;
  }

  private async checkCostAlerts() {
    const threshold = parseFloat(process.env.COST_ALERT_THRESHOLD || '100');
    
    if (this.dailyUsage.cost > threshold / 30) { // Daily threshold
      await this.sendCostAlert('daily', this.dailyUsage.cost);
    }
    
    if (this.monthlyUsage.cost > threshold) { // Monthly threshold
      await this.sendCostAlert('monthly', this.monthlyUsage.cost);
    }
  }

  private async sendCostAlert(period: string, cost: number) {
    console.warn(`Cost alert: ${period} usage has reached $${cost.toFixed(2)}`);
    // Implement email/webhook notification here
  }

  async logAssessmentCompletion(assessmentId: string, results: any) {
    this.dailyUsage.assessments++;
    this.monthlyUsage.assessments++;
    console.log(`Assessment ${assessmentId} completed. Daily: ${this.dailyUsage.assessments}, Monthly: ${this.monthlyUsage.assessments}`);
  }

  async logAssessmentError(assessmentId: string, error: string) {
    console.error(`Assessment ${assessmentId} failed:`, error);
  }
}

export const costMonitor = new CostMonitor();

// Assessment prompts for different categories
export const ASSESSMENT_PROMPTS = {
  structuredData: (websiteData: any) => `
Analyze the following website for structured data and semantic optimization:

URL: ${websiteData.url}
Content: ${JSON.stringify(websiteData.content).slice(0, 3000)}

Evaluate:
1. Schema markup presence and quality
2. Semantic HTML structure
3. Metadata optimization
4. Rich snippet opportunities
5. AI platform compatibility

Provide analysis in this exact JSON format:
{
  "score": 0-100,
  "grade": "A-F",
  "findings": ["specific finding 1", "specific finding 2"],
  "recommendations": [
    {
      "title": "Specific recommendation",
      "description": "Detailed description",
      "impact": "Expected business impact",
      "difficulty": "Easy/Medium/Hard",
      "priority": "High/Medium/Low"
    }
  ],
  "summary": "Brief overall assessment"
}`,

  contentQuality: (websiteData: any) => `
Analyze the following website content for AI platform compatibility:

URL: ${websiteData.url}
Content: ${JSON.stringify(websiteData.content).slice(0, 3000)}

Evaluate:
1. Content depth and comprehensiveness
2. Question-answer format readiness
3. Conversational content structure
4. Topic authority and expertise
5. Voice search optimization

Provide analysis in this exact JSON format:
{
  "score": 0-100,
  "grade": "A-F",
  "findings": ["specific finding 1", "specific finding 2"],
  "recommendations": [
    {
      "title": "Specific recommendation",
      "description": "Detailed description",
      "impact": "Expected business impact",
      "difficulty": "Easy/Medium/Hard",
      "priority": "High/Medium/Low"
    }
  ],
  "summary": "Brief overall assessment"
}`,

  technicalPerformance: (websiteData: any) => `
Analyze the following website for technical AI optimization:

URL: ${websiteData.url}
Performance Data: ${JSON.stringify(websiteData.performance || {}).slice(0, 1000)}
Mobile Data: ${JSON.stringify(websiteData.mobile || {}).slice(0, 1000)}

Evaluate:
1. Page speed and Core Web Vitals
2. Mobile optimization
3. Accessibility compliance
4. Technical SEO factors
5. AI crawler accessibility

Provide analysis in this exact JSON format:
{
  "score": 0-100,
  "grade": "A-F",
  "findings": ["specific finding 1", "specific finding 2"],
  "recommendations": [
    {
      "title": "Specific recommendation",
      "description": "Detailed description",
      "impact": "Expected business impact",
      "difficulty": "Easy/Medium/Hard",
      "priority": "High/Medium/Low"
    }
  ],
  "summary": "Brief overall assessment"
}`,

  businessContext: (websiteData: any) => `
Analyze the following website for business context and trust signals:

URL: ${websiteData.url}
Content: ${JSON.stringify(websiteData.content).slice(0, 3000)}

Evaluate:
1. Value proposition clarity
2. Trust signals and credibility
3. Contact information completeness
4. Business information structure
5. Competitive positioning

Provide analysis in this exact JSON format:
{
  "score": 0-100,
  "grade": "A-F",
  "findings": ["specific finding 1", "specific finding 2"],
  "recommendations": [
    {
      "title": "Specific recommendation",
      "description": "Detailed description",
      "impact": "Expected business impact",
      "difficulty": "Easy/Medium/Hard",
      "priority": "High/Medium/Low"
    }
  ],
  "summary": "Brief overall assessment"
}`
};

// Main analysis function
export async function performAIAnalysis(websiteData: any) {
  const analyses: any = {};
  const analysisCategories = ['structuredData', 'contentQuality', 'technicalPerformance', 'businessContext'];
  
  try {
    // Process analyses with proper error handling
    const analysisPromises = analysisCategories.map(async (category) => {
      try {
        const analysis = await rateLimiter.addRequest(async () => {
          const prompt = ASSESSMENT_PROMPTS[category as keyof typeof ASSESSMENT_PROMPTS](websiteData);
          
          const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4-turbo-preview",
            messages: [
              {
                role: "system",
                content: "You are an expert AI optimization consultant. Provide detailed, actionable analysis in the exact JSON format requested. Be specific and practical in your recommendations. If you cannot analyze certain aspects due to limited data, clearly state this and provide general best practices."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.3'),
            max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '2000')
          });
          
          // Log token usage for cost tracking
          await costMonitor.logTokenUsage(category, response.usage);
          
          return response.choices[0].message.content;
        });
        
        // Parse and validate response
        const parsedAnalysis = parseAndValidateResponse(analysis, category);
        return { category, analysis: parsedAnalysis, success: true };
        
      } catch (error: any) {
        console.error(`Failed to analyze ${category}:`, error);
        
        // Return fallback analysis for this category
        const fallbackAnalysis = getFallbackAnalysis(category);
        return { category, analysis: fallbackAnalysis, success: false };
      }
    });
    
    const results = await Promise.all(analysisPromises);
    
    // Compile results
    let successfulAnalyses = 0;
    results.forEach(({ category, analysis, success }) => {
      analyses[category] = analysis;
      if (success) successfulAnalyses++;
    });
    
    return analyses;
    
  } catch (error: any) {
    console.error('Critical error in AI analysis:', error);
    
    // Return complete fallback analysis
    analysisCategories.forEach(category => {
      analyses[category] = getFallbackAnalysis(category);
    });
    
    return analyses;
  }
}

function parseAndValidateResponse(response: string | null, category: string) {
  try {
    if (!response) throw new Error('Empty response');
    
    const parsed = JSON.parse(response);
    
    // Validate required fields
    const required = ['score', 'grade', 'findings', 'recommendations', 'summary'];
    const missing = required.filter(field => !(field in parsed));
    
    if (missing.length > 0) {
      console.warn(`Missing fields in ${category} analysis:`, missing);
      return { ...getFallbackAnalysis(category), ...parsed };
    }
    
    // Validate score range
    if (parsed.score < 0 || parsed.score > 100) {
      parsed.score = Math.max(0, Math.min(100, parsed.score));
    }
    
    // Validate grade
    if (!['A', 'B', 'C', 'D', 'F'].includes(parsed.grade)) {
      parsed.grade = calculateGradeFromScore(parsed.score);
    }
    
    return parsed;
    
  } catch (error: any) {
    console.error(`Failed to parse ${category} response:`, error);
    return getFallbackAnalysis(category);
  }
}

function calculateGradeFromScore(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

function getFallbackAnalysis(category: string) {
  const fallbacks: Record<string, any> = {
    structuredData: {
      score: 45,
      grade: 'D',
      findings: ['Unable to complete automated structured data analysis'],
      recommendations: [
        {
          title: 'Implement Schema Markup',
          description: 'Add structured data markup to help AI systems understand your content better.',
          impact: 'Improves AI platform content understanding and search visibility',
          difficulty: 'Medium',
          priority: 'High'
        }
      ],
      summary: 'Structured data analysis requires manual review. Consider implementing basic schema markup for improved AI compatibility.',
      fallback: true
    },
    contentQuality: {
      score: 55,
      grade: 'C',
      findings: ['Unable to complete automated content analysis'],
      recommendations: [
        {
          title: 'Optimize Content for AI Platforms',
          description: 'Create comprehensive, well-structured content that answers common customer questions.',
          impact: 'Better AI platform understanding and user engagement',
          difficulty: 'Medium',
          priority: 'High'
        }
      ],
      summary: 'Content analysis requires manual review. Focus on creating comprehensive, question-answering content.',
      fallback: true
    },
    technicalPerformance: {
      score: 60,
      grade: 'C',
      findings: ['Unable to complete automated technical analysis'],
      recommendations: [
        {
          title: 'Improve Page Speed',
          description: 'Optimize images, minimize code, and improve server response times.',
          impact: 'Better user experience and AI platform processing',
          difficulty: 'Medium',
          priority: 'High'
        }
      ],
      summary: 'Technical analysis requires manual review. Focus on core web vitals and mobile optimization.',
      fallback: true
    },
    businessContext: {
      score: 50,
      grade: 'C',
      findings: ['Unable to complete automated business context analysis'],
      recommendations: [
        {
          title: 'Enhance Trust Signals',
          description: 'Add clear contact information, testimonials, and professional credentials.',
          impact: 'Improved credibility for both users and AI platforms',
          difficulty: 'Easy',
          priority: 'Medium'
        }
      ],
      summary: 'Business context analysis requires manual review. Focus on clear value propositions and trust signals.',
      fallback: true
    }
  };
  
  return fallbacks[category] || fallbacks.contentQuality;
}