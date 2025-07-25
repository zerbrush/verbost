import { NextRequest, NextResponse } from 'next/server';
import perplexityClient from '@/lib/perplexity-client';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    // Simple test prompt
    const testPrompt = `Please analyze the website ${url} and provide a brief summary of what you find. Respond in JSON format with: {"summary": "your analysis", "status": "success"}`;
    
    console.log('Testing Perplexity API with:', {
      url,
      apiKeyPresent: !!process.env.PERPLEXITY_API_KEY,
      apiKeyPrefix: process.env.PERPLEXITY_API_KEY?.substring(0, 10) + '...',
      model: process.env.PERPLEXITY_MODEL
    });
    
    const result = await perplexityClient.analyzeWebsite(url, testPrompt);
    
    return NextResponse.json({
      success: true,
      result,
      config: {
        model: process.env.PERPLEXITY_MODEL,
        hasApiKey: !!process.env.PERPLEXITY_API_KEY
      }
    });
    
  } catch (error: any) {
    console.error('Perplexity test error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      config: {
        model: process.env.PERPLEXITY_MODEL,
        hasApiKey: !!process.env.PERPLEXITY_API_KEY,
        apiKeyPrefix: process.env.PERPLEXITY_API_KEY?.substring(0, 10) + '...'
      }
    }, { status: 500 });
  }
}