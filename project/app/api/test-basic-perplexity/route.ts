import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('Testing basic Perplexity connection...');
    console.log('API Key present:', !!process.env.PERPLEXITY_API_KEY);
    console.log('API Key prefix:', process.env.PERPLEXITY_API_KEY?.substring(0, 10));
    
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'user',
            content: 'Hello, can you respond with just "test successful"?'
          }
        ]
      })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('Response body:', responseText);

    if (!response.ok) {
      return NextResponse.json({
        error: `API returned ${response.status}`,
        responseBody: responseText,
        apiKeyPresent: !!process.env.PERPLEXITY_API_KEY
      }, { status: 500 });
    }

    const data = JSON.parse(responseText);
    return NextResponse.json({ success: true, data });

  } catch (error: any) {
    console.error('Test error:', error);
    return NextResponse.json({
      error: error.message,
      apiKeyPresent: !!process.env.PERPLEXITY_API_KEY,
      apiKeyPrefix: process.env.PERPLEXITY_API_KEY?.substring(0, 10)
    }, { status: 500 });
  }
}