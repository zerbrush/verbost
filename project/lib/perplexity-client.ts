class PerplexityClient {
  private apiKey: string;
  private baseUrl: string;
  private model: string;
  private requestQueue: any[] = [];
  private processing: boolean = false;
  private requestCount: number = 0;
  private lastMinute: number = Date.now();

  constructor() {
    this.apiKey = process.env.PERPLEXITY_API_KEY!;
    this.baseUrl = 'https://api.perplexity.ai/chat/completions';
    // Using correct Perplexity model names from official documentation
    this.model = process.env.PERPLEXITY_MODEL || 'sonar-pro';
    
    if (!this.apiKey) {
      throw new Error('PERPLEXITY_API_KEY environment variable is required');
    }
  }

  async analyzeWebsite(url: string, prompt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.requestQueue.push({ url, prompt, resolve, reject, attempts: 0 });
      this.processQueue();
    });
  }

  private async processQueue(): Promise<void> {
    if (this.processing || this.requestQueue.length === 0) return;
    
    this.processing = true;
    
    while (this.requestQueue.length > 0) {
      // Rate limiting check
      const now = Date.now();
      if (now - this.lastMinute >= 60000) {
        this.requestCount = 0;
        this.lastMinute = now;
      }
      
      const maxRequests = parseInt(process.env.PERPLEXITY_REQUESTS_PER_MINUTE || '10'); // More conservative limit
      if (this.requestCount >= maxRequests) {
        const waitTime = 60000 - (now - this.lastMinute) + 1000;
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      
      const { url, prompt, resolve, reject, attempts } = this.requestQueue.shift();
      this.requestCount++;
      
      try {
        const result = await this.makeRequest(url, prompt, attempts);
        resolve(result);
      } catch (error) {
        reject(error);
      }
      
      // Delay between requests
      await new Promise(resolve => setTimeout(resolve, 5000)); // Increased delay
    }
    
    this.processing = false;
  }

  private async makeRequest(url: string, prompt: string, currentAttempt: number = 0): Promise<string> {
    const maxRetries = parseInt(process.env.PERPLEXITY_MAX_RETRIES || '5'); // Increased retries
    
    try {
      // Construct the request body according to Perplexity API specs
      const requestBody = {
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert AI optimization consultant. Analyze websites thoroughly and provide detailed, actionable recommendations in JSON format. Be specific and professional.'
          },
          {
            role: 'user',
            content: `${prompt}\n\nWebsite URL to analyze: ${url}\n\nPlease browse this website and provide your analysis in valid JSON format.`
          }
        ],
        max_tokens: parseInt(process.env.PERPLEXITY_MAX_TOKENS || '3000'), // Increased token limit
        temperature: parseFloat(process.env.PERPLEXITY_TEMPERATURE || '0.2'),
        top_p: 0.9,
        return_citations: true,
        return_images: false,
        return_related_questions: false,
        stream: false,
      };

      console.log('Making Perplexity API request:', {
        url: this.baseUrl,
        model: this.model,
        promptLength: prompt.length,
        attempt: currentAttempt + 1
      });

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(parseInt(process.env.PERPLEXITY_TIMEOUT || '180000')) // Increased timeout to 3 minutes
      });

      // Log response details for debugging
      console.log('Perplexity API response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Perplexity API error response:', errorText);
        
        // Parse error details if available
        let errorDetails;
        try {
          errorDetails = JSON.parse(errorText);
        } catch {
          errorDetails = { message: errorText };
        }
        
        throw new Error(`Perplexity API error: ${response.status} - ${errorDetails.message || response.statusText}`);
      }

      const data = await response.json();
      
      console.log('Perplexity API success:', {
        hasChoices: !!data.choices,
        choicesLength: data.choices?.length,
        hasMessage: !!data.choices?.[0]?.message,
        usage: data.usage
      });

      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from Perplexity API');
      }

      return data.choices[0].message.content;
      
    } catch (error: any) {
      console.error(`Perplexity API error (attempt ${currentAttempt + 1}):`, error);
      
      if (currentAttempt >= maxRetries) {
        throw new Error(`Perplexity API failed after ${maxRetries + 1} attempts: ${error.message}. Please try again later or contact support.`);
      }
      
      // Exponential backoff
      const delay = Math.min(
        parseInt(process.env.PERPLEXITY_RETRY_DELAY || '5000') * Math.pow(2, currentAttempt),
        60000 // Increased max delay to 1 minute
      );
      
      await new Promise(resolve => setTimeout(resolve, delay));
      return this.makeRequest(url, prompt, currentAttempt + 1);
    }
  }
}

const perplexityClient = new PerplexityClient();
export default perplexityClient;