import perplexityClient from './perplexity-client';
import { testPerplexityAPI } from './simple-perplexity';
import { performMockAssessment } from './mock-analysis';

export interface AssessmentCategory {
  score: number;
  grade: string;
  findings: string[];
  recommendations: Array<{
    title: string;
    description: string;
    impact: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    priority: 'High' | 'Medium' | 'Low';
    estimatedTime: string;
  }>;
  summary: string;
  fallback?: boolean;
}

export interface OverallAssessment {
  score: number;
  grade: string;
  insights: Array<{
    type: 'positive' | 'opportunity' | 'action';
    title: string;
    description: string;
    icon: string;
    color: string;
  }>;
  topRecommendations: AssessmentCategory['recommendations'];
  competitiveAnalysis: string;
  nextSteps: string[];
  summary: string;
  estimatedImpact: string;
  pagesAnalyzed: string;
  keyInsights: string[];
  competitiveAdvantage: string;
}

export interface AssessmentResults {
  url: string;
  timestamp: string;
  categories: {
    structuredData: AssessmentCategory;
    contentQuality: AssessmentCategory;
    technicalPerformance: AssessmentCategory;
    businessContext: AssessmentCategory;
  };
  overall: OverallAssessment;
}

const ASSESSMENT_PROMPTS = {
  structuredData: `Analyze this website for structured data and semantic optimization for AI platforms.

Please browse the website thoroughly and evaluate:

1. **Schema Markup Implementation**
   - Presence and quality of JSON-LD structured data
   - Schema.org markup coverage (Organization, WebSite, Article, etc.)
   - Rich snippet opportunities

2. **Semantic HTML Structure**
   - Proper heading hierarchy (H1, H2, H3)
   - Semantic HTML5 elements usage
   - Microdata implementation

3. **Metadata Optimization**
   - Title tags optimization
   - Meta descriptions quality
   - Open Graph and Twitter Card implementation

4. **AI Platform Compatibility**
   - Content structure for AI understanding
   - Entity recognition optimization
   - Knowledge graph potential

Return your analysis as valid JSON with these required fields:
- score: number (0-100)
- grade: string (A, B, C, D, or F)
- findings: array of specific findings
- recommendations: array of objects with title, description, impact, difficulty, priority, estimatedTime
- summary: comprehensive summary string`,

  contentQuality: `Analyze this website for content quality and AI compatibility.

Please browse the website thoroughly and evaluate:

1. **Content Depth and Authority**
   - Content comprehensiveness and expertise
   - Topic coverage and depth
   - Authority signals and credibility

2. **AI-Friendly Content Format**
   - Question-answer format optimization
   - Conversational content structure
   - Natural language processing compatibility

3. **Content Organization**
   - Information architecture clarity
   - Content categorization and tagging
   - Internal linking structure

4. **Voice Search and AI Platform Optimization**
   - Long-tail keyword optimization
   - Featured snippet potential
   - FAQ sections and conversational queries

Return your analysis as valid JSON with these required fields:
- score: number (0-100)
- grade: string (A, B, C, D, or F)
- findings: array of specific findings
- recommendations: array of objects with title, description, impact, difficulty, priority, estimatedTime
- summary: comprehensive summary string`,

  technicalPerformance: `Analyze this website for technical performance and AI platform compatibility.

Please browse the website thoroughly and evaluate:

1. **Core Web Vitals and Performance**
   - Page loading speed assessment
   - Largest Contentful Paint (LCP)
   - First Input Delay (FID)
   - Cumulative Layout Shift (CLS)

2. **Mobile Optimization**
   - Mobile responsiveness
   - Mobile-first design implementation
   - Touch-friendly interface

3. **Accessibility and Standards**
   - WCAG compliance assessment
   - Screen reader compatibility
   - Keyboard navigation support

4. **Technical SEO for AI Platforms**
   - URL structure optimization
   - Robots.txt and sitemap presence
   - HTTPS implementation
   - Page architecture for crawling

Return your analysis as valid JSON with these required fields:
- score: number (0-100)
- grade: string (A, B, C, D, or F)
- findings: array of specific findings
- recommendations: array of objects with title, description, impact, difficulty, priority, estimatedTime
- summary: comprehensive summary string`,

  businessContext: `Analyze this website for business context and trust signals that impact AI platform understanding.

Please browse the website thoroughly and evaluate:

1. **Trust Signals and Credibility**
   - Contact information completeness
   - About page quality and transparency
   - Professional credentials and certifications
   - Customer testimonials and reviews

2. **Value Proposition Clarity**
   - Clear business description
   - Service/product explanation quality
   - Unique selling proposition articulation

3. **Business Information for AI Platforms**
   - NAP (Name, Address, Phone) consistency
   - Business hours and location data
   - Industry and category clarity

4. **Conversion and User Experience**
   - Call-to-action effectiveness
   - Contact form accessibility
   - User journey optimization

Return your analysis as valid JSON with these required fields:
- score: number (0-100)
- grade: string (A, B, C, D, or F)
- findings: array of specific findings
- recommendations: array of objects with title, description, impact, difficulty, priority, estimatedTime
- summary: comprehensive summary string`
};

export async function performAIReadinessAssessment(url: string): Promise<AssessmentResults> {
  try {
    console.log(`Starting AI-Readiness assessment for: ${url}`);
    
    console.log('Perplexity API configured, proceeding with analysis...');
    
    const results: any = {};
    const categories = Object.keys(ASSESSMENT_PROMPTS) as Array<keyof typeof ASSESSMENT_PROMPTS>;
    
    // Process each category
    for (const category of categories) {
      console.log(`Analyzing ${category}...`);
      
      const rawResponse = await perplexityClient.analyzeWebsite(url, ASSESSMENT_PROMPTS[category]);
      console.log(`Raw response for ${category}:`, rawResponse?.substring(0, 200) + '...');
      
      // Parse JSON response
      const analysis = parseAnalysisResponse(rawResponse, category);
      results[category] = analysis;
      
      console.log(`✓ Completed ${category} analysis`);
    }
    
    // Generate overall assessment
    const overallAssessment = generateOverallAssessment(results, url);
    
    return {
      url,
      timestamp: new Date().toISOString(),
      categories: results,
      overall: overallAssessment
    };
    
  } catch (error: any) {
    console.error('Assessment engine failed:', error.message);
    throw new Error(`AI assessment failed: ${error.message}`);
  }
}

function parseAnalysisResponse(response: string, category: string): AssessmentCategory {
  try {
    if (!response || response.trim().length === 0) {
      throw new Error('Empty response received');
    }
    
    // Extract JSON from response (handle markdown code blocks)
    let jsonStr = response;
    
    // Try to extract JSON from markdown code blocks first
    const codeBlockMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
    if (codeBlockMatch) {
      jsonStr = codeBlockMatch[1];
    } else {
      // Try to find JSON object in the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonStr = jsonMatch[0];
      }
    }
    
    if (!jsonStr || jsonStr.trim().length === 0) {
      throw new Error(`No valid JSON found in ${category} response`);
    }
    
    const parsed = JSON.parse(jsonStr.trim());
    
    // Validate required fields
    const required = ['score', 'grade', 'findings', 'recommendations', 'summary'];
    const missing = required.filter(field => !(field in parsed));
    
    if (missing.length > 0) {
      throw new Error(`Missing required fields in ${category} response: ${missing.join(', ')}`);
    }
    
    // Validate and normalize data
    parsed.score = Math.max(0, Math.min(100, parseInt(parsed.score) || 0));
    parsed.grade = ['A', 'B', 'C', 'D', 'F'].includes(parsed.grade) ? parsed.grade : calculateGrade(parsed.score);
    parsed.findings = Array.isArray(parsed.findings) ? parsed.findings : [];
    parsed.recommendations = Array.isArray(parsed.recommendations) ? parsed.recommendations : [];
    
    return parsed;
    
  } catch (error: any) {
    console.error(`Failed to parse ${category} response:`, error?.message || error);
    throw new Error(`Failed to parse ${category} analysis: ${error?.message || 'Unknown error'}`);
  }
}

function createFallbackFromText(response: string, category: string): AssessmentCategory {
  const fallback = getFallbackAnalysis(category);
  
  // Try to extract some insights from the text response
  if (response && response.length > 50) {
    fallback.summary = `Analysis completed for ${category}. ${response.substring(0, 200)}...`;
    fallback.findings = [`AI analysis provided insights for ${category}`];
  }
  
  return fallback;
}

function getFallbackAnalysis(category: string): AssessmentCategory {
  const fallbacks: Record<string, AssessmentCategory> = {
    structuredData: {
      score: 45,
      grade: 'D',
      findings: [
        'Automated analysis temporarily unavailable',
        'Manual review recommended for structured data assessment'
      ],
      recommendations: [
        {
          title: 'Implement Basic Schema Markup',
          description: 'Add JSON-LD structured data for your organization, website, and key content pages to help AI platforms understand your business.',
          impact: 'Improves AI platform content understanding and search visibility',
          difficulty: 'Medium',
          priority: 'High',
          estimatedTime: '2-4 hours'
        }
      ],
      summary: 'Structured data analysis requires manual review. Implementing basic schema markup is recommended for improved AI compatibility.',
      fallback: true
    },
    contentQuality: {
      score: 55,
      grade: 'C',
      findings: [
        'Automated analysis temporarily unavailable',
        'Manual content review recommended'
      ],
      recommendations: [
        {
          title: 'Create FAQ Section',
          description: 'Develop a comprehensive FAQ section that answers common customer questions in a conversational format.',
          impact: 'Better AI platform understanding and improved user engagement',
          difficulty: 'Easy',
          priority: 'High',
          estimatedTime: '3-5 hours'
        }
      ],
      summary: 'Content analysis requires manual review. Focus on creating comprehensive, question-answering content for better AI compatibility.',
      fallback: true
    },
    technicalPerformance: {
      score: 60,
      grade: 'C',
      findings: [
        'Automated analysis temporarily unavailable',
        'Technical performance review recommended'
      ],
      recommendations: [
        {
          title: 'Optimize Core Web Vitals',
          description: 'Improve page loading speed, reduce layout shifts, and optimize for mobile devices.',
          impact: 'Better user experience and AI platform processing efficiency',
          difficulty: 'Medium',
          priority: 'High',
          estimatedTime: '4-8 hours'
        }
      ],
      summary: 'Technical analysis requires manual review. Focus on core web vitals and mobile optimization for better AI platform compatibility.',
      fallback: true
    },
    businessContext: {
      score: 50,
      grade: 'C',
      findings: [
        'Automated analysis temporarily unavailable',
        'Business context review recommended'
      ],
      recommendations: [
        {
          title: 'Enhance Contact Information',
          description: 'Ensure complete and consistent business information across all pages, including NAP (Name, Address, Phone) data.',
          impact: 'Improved credibility and better AI platform business understanding',
          difficulty: 'Easy',
          priority: 'Medium',
          estimatedTime: '1-2 hours'
        }
      ],
      summary: 'Business context analysis requires manual review. Focus on clear contact information and value proposition for better AI understanding.',
      fallback: true
    }
  };
  
  return fallbacks[category] || fallbacks.contentQuality;
}

function generateOverallAssessment(results: any, url: string): OverallAssessment {
  // Calculate weighted overall score
  const weights = {
    structuredData: 0.25,
    contentQuality: 0.30,
    technicalPerformance: 0.25,
    businessContext: 0.20
  };
  
  let overallScore = 0;
  let totalWeight = 0;
  
  Object.entries(weights).forEach(([category, weight]) => {
    if (results[category] && typeof results[category].score === 'number') {
      overallScore += results[category].score * weight;
      totalWeight += weight;
    }
  });
  
  overallScore = totalWeight > 0 ? Math.round(overallScore / totalWeight) : 50;
  const overallGrade = calculateGrade(overallScore);
  
  // Generate key insights
  const insights = generateKeyInsights(results, overallScore);
  
  // Prioritize recommendations
  const allRecommendations = Object.values(results)
    .flatMap((category: any) => category.recommendations || [])
    .sort((a: any, b: any) => {
      const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      const difficultyOrder = { 'Easy': 3, 'Medium': 2, 'Hard': 1 };
      
      const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 1;
      const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 1;
      const aDifficulty = difficultyOrder[a.difficulty as keyof typeof difficultyOrder] || 1;
      const bDifficulty = difficultyOrder[b.difficulty as keyof typeof difficultyOrder] || 1;
      
      // Sort by priority first, then by ease of implementation
      if (aPriority !== bPriority) return bPriority - aPriority;
      return bDifficulty - aDifficulty;
    });
  
  return {
    score: overallScore,
    grade: overallGrade,
    insights,
    topRecommendations: allRecommendations.slice(0, 5),
    competitiveAnalysis: generateCompetitiveAnalysis(overallScore),
    nextSteps: generateNextSteps(allRecommendations.slice(0, 3)),
    summary: `Overall AI-readiness assessment completed with a score of ${overallScore}/100 (${overallGrade} grade). Analysis covered structured data, content quality, technical performance, and business context.`,
    estimatedImpact: 'AI optimization improvements based on comprehensive analysis could significantly enhance your website\'s visibility and performance across AI platforms.',
    pagesAnalyzed: 'Comprehensive analysis of website structure and content',
    keyInsights: insights.map(insight => insight.description),
    competitiveAdvantage: generateCompetitiveAnalysis(overallScore)
  };
}

function calculateGrade(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

function generateKeyInsights(results: any, overallScore: number): Array<{
  type: 'positive' | 'opportunity' | 'action';
  title: string;
  description: string;
  icon: string;
  color: string;
}> {
  const insights: Array<{
    type: 'positive' | 'opportunity' | 'action';
    title: string;
    description: string;
    icon: string;
    color: string;
  }> = [];
  
  // Strong foundation insight
  if (overallScore >= 70) {
    insights.push({
      type: 'positive' as const,
      title: 'Strong AI-Ready Foundation',
      description: 'Your website demonstrates good fundamentals for AI platform optimization. With targeted improvements, you can achieve excellent AI visibility.',
      icon: 'check-circle',
      color: 'green'
    });
  }
  
  // Optimization opportunity
  const lowestCategory = Object.entries(results)
    .sort((a: any, b: any) => (a[1].score || 0) - (b[1].score || 0))[0];
  
  if (lowestCategory && (lowestCategory[1] as any).score < 70) {
    const categoryNames: Record<string, string> = {
      structuredData: 'structured data optimization',
      contentQuality: 'content AI compatibility',
      technicalPerformance: 'technical performance',
      businessContext: 'business context clarity'
    };
    
    insights.push({
      type: 'opportunity' as const,
      title: 'Primary Optimization Opportunity',
      description: `Your ${categoryNames[lowestCategory[0]]} presents the biggest opportunity for improvement. Addressing this could significantly boost your AI platform visibility.`,
      icon: 'lightbulb',
      color: 'yellow'
    });
  }
  
  // Quick wins
  const quickWins = Object.values(results)
    .flatMap((category: any) => category.recommendations || [])
    .filter((rec: any) => rec.difficulty === 'Easy' && rec.priority === 'High');
  
  if (quickWins.length > 0) {
    insights.push({
      type: 'action' as const,
      title: 'Quick Wins Available',
      description: `We identified ${quickWins.length} high-impact improvements that are easy to implement. These could boost your AI-readiness score by 15-25 points.`,
      icon: 'trending-up',
      color: 'blue'
    });
  }
  
  return insights;
}

function generateCompetitiveAnalysis(score: number): string {
  if (score >= 80) {
    return 'Your website is well-positioned for AI platforms and likely outperforms most competitors in AI optimization.';
  } else if (score >= 60) {
    return 'Your website has good potential but competitors with better AI optimization may gain visibility advantages.';
  } else {
    return 'Your website needs significant AI optimization to remain competitive as AI platforms become more prevalent.';
  }
}

function generateNextSteps(topRecommendations: any[]): string[] {
  return [
    'Review the detailed recommendations in each category',
    'Prioritize high-impact, easy-to-implement improvements first',
    'Consider professional AI optimization services for complex technical improvements',
    'Monitor AI platform performance and visibility after implementing changes'
  ];
}