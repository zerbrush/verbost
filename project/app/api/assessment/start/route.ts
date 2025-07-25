import { NextRequest, NextResponse } from 'next/server';
import { createAssessment, updateAssessment, completeAssessment, markAssessmentFailed } from '@/lib/assessment-db';
import { performAIReadinessAssessment } from '@/lib/assessment-engine';

// Add logging to debug issues
console.log('Assessment API route loaded');

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Assessment API called');
    const { url: rawUrl, name, email } = await request.json();
    console.log('📝 Request data:', { rawUrl, name, email });
    
    // Validate required fields first
    if (!name || !email || !rawUrl) {
      console.error('❌ Missing required fields:', { 
        hasName: !!name, 
        hasEmail: !!email, 
        hasUrl: !!rawUrl 
      });
      return NextResponse.json({ 
        error: 'Name, email, and website URL are required',
        details: 'Missing required fields'
      }, { status: 400 });
    }
    
    // Normalize URL - add https:// if missing and handle www
    const url = normalizeUrl(rawUrl);
    console.log('🚀 Starting enhanced assessment for:', url);

    // Validate URL
    if (!url || !isValidUrl(url)) {
      console.error('❌ Invalid URL provided:', rawUrl, 'normalized to:', url);
      return NextResponse.json({ 
        error: 'Please enter a valid website URL or domain (e.g., example.com)',
        details: 'URL validation failed'
      }, { status: 400 });
    }

    // Generate unique ID
    const assessmentId = `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log('📝 Generated assessment ID:', assessmentId);

    // Create assessment in Supabase
    const assessmentData = {
      id: assessmentId,
      url,
      name: name.trim(),
      email: email.trim(),
      status: 'pending',
      progress: 0
    };

    console.log('💾 Creating assessment in Supabase...');
    try {
      await createAssessment(assessmentData);
    } catch (dbError) {
      console.error('❌ Database creation failed:', dbError);
      return NextResponse.json({ 
        error: 'Failed to create assessment in database',
        details: dbError.message,
        code: 'DATABASE_ERROR'
      }, { status: 500 });
    }
    console.log('✅ Assessment created in Supabase:', assessmentId);

    // Start background processing (don't await)
    processAssessmentInBackground(assessmentId, url).catch(error => {
      console.error('❌ Background processing error:', error);
      markAssessmentFailed(assessmentId, error.message).catch(console.error);
    });

    return NextResponse.json({
      assessmentId: assessmentId,
      status: 'started',
      message: 'Enhanced assessment created successfully',
      estimatedTime: 60 // 1 minute for analysis
    });

  } catch (error: any) {
    console.error('❌ Assessment start failed:', error);
    return NextResponse.json({ 
      error: 'Failed to start assessment',
      details: error.message,
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}

function normalizeUrl(input: string): string {
  if (!input) return '';
  
  // Remove whitespace
  let url = input.trim();
  
  // If it already has a protocol, use it as is
  if (url.match(/^https?:\/\//)) {
    return url;
  }
  
  // Remove www. if present at the start (we'll add https:// and let the site handle www redirects)
  if (url.startsWith('www.')) {
    url = url.substring(4);
  }
  
  // Add https:// protocol
  return `https://${url}`;
}

async function processAssessmentInBackground(assessmentId: string, url: string) {
  try {
    console.log('🔄 Background processing started for:', assessmentId);
    
    // Update progress: crawling
    await updateAssessment(assessmentId, { status: 'crawling', progress: 10 });
    console.log('📊 Progress: crawling (10%)');
    await new Promise(resolve => setTimeout(resolve, 2000)); // Increased delay
    
    // Update progress: analyzing
    await updateAssessment(assessmentId, { status: 'analyzing', progress: 30 });
    console.log('📊 Progress: analyzing (30%)');
    await new Promise(resolve => setTimeout(resolve, 3000)); // Increased delay
    
    await updateAssessment(assessmentId, { progress: 60 });
    console.log('📊 Progress: 60%');
    await new Promise(resolve => setTimeout(resolve, 3000)); // Increased delay
    
    await updateAssessment(assessmentId, { progress: 80 });
    console.log('📊 Progress: 80%');
    await new Promise(resolve => setTimeout(resolve, 2000)); // Increased delay
    
    await updateAssessment(assessmentId, { progress: 90 });
    console.log('📊 Progress: 90%');
    
    console.log('🤖 Starting analysis for:', url);
    
    // Use Perplexity AI for real analysis - no fallback
    console.log('🤖 Starting Perplexity AI analysis for:', url);
    const analysisResults = await performAIReadinessAssessment(url);
    console.log('✅ Perplexity analysis completed successfully');
    
    // Complete assessment with results
    const completedAssessment = await completeAssessment(assessmentId, analysisResults);
    console.log('✅ Assessment completed in Supabase:', assessmentId);
    
    console.log('✅ Assessment completed successfully:', assessmentId);
    
  } catch (error: any) {
    console.error('❌ Assessment processing error:', error);
    await markAssessmentFailed(assessmentId, error.message);
    throw error; // Re-throw to ensure proper error handling
  }
}

function generateFallbackResults(url: string, baseScore: number = 72) {
  // Generate realistic scores with some variation
  const variation = Math.floor(Math.random() * 20) - 10; // -10 to +10
  const adjustedScore = Math.max(50, Math.min(95, baseScore + variation));
  
  return {
    overall: {
      score: adjustedScore,
      grade: getGradeFromScore(adjustedScore),
      summary: `Fallback AI-readiness assessment completed for ${url}. Analysis identified optimization opportunities with potential for improved AI platform visibility and competitive advantage. Note: This assessment used fallback analysis due to API limitations.`
    },
    categories: {
      structuredData: {
        score: Math.max(40, adjustedScore - 8),
        grade: getGradeFromScore(Math.max(40, adjustedScore - 8)),
        findings: [
          'Schema markup implementation could be enhanced for better AI understanding',
          'Semantic HTML structure shows room for improvement',
          'Meta descriptions could be optimized for AI platforms'
        ],
        recommendations: [
          'Implement comprehensive JSON-LD schema markup for Organization, WebSite, and key content types',
          'Enhance semantic HTML structure with proper heading hierarchy and semantic elements',
          'Optimize meta descriptions with natural language that AI platforms can easily understand'
        ],
        priority: 'High',
        impact: 'High'
      },
      contentQuality: {
        score: Math.max(45, adjustedScore - 3),
        grade: getGradeFromScore(Math.max(45, adjustedScore - 3)),
        findings: [
          'Content shows good foundation but could benefit from AI-focused optimization',
          'FAQ or conversational content format could be enhanced',
          'Voice search optimization presents significant opportunities'
        ],
        recommendations: [
          'Develop comprehensive FAQ sections using natural, conversational language',
          'Enhance content depth to demonstrate expertise and authority in your field',
          'Structure content for voice search with natural question-answer formatting'
        ],
        priority: 'High',
        impact: 'High'
      },
      technicalPerformance: {
        score: Math.max(50, adjustedScore + 2),
        grade: getGradeFromScore(Math.max(50, adjustedScore + 2)),
        findings: [
          'Technical performance shows solid foundation with optimization opportunities',
          'Mobile responsiveness is functional but could be enhanced',
          'Core Web Vitals present opportunities for improvement'
        ],
        recommendations: [
          'Optimize Core Web Vitals scores for better user experience and AI platform evaluation',
          'Enhance mobile-first design approach for improved mobile performance',
          'Strengthen technical SEO foundation with comprehensive implementation'
        ],
        priority: 'Medium',
        impact: 'Medium'
      },
      businessContext: {
        score: Math.max(45, adjustedScore - 5),
        grade: getGradeFromScore(Math.max(45, adjustedScore - 5)),
        findings: [
          'Business context is established but could be strengthened for AI platforms',
          'Trust signals and credibility indicators show potential for enhancement',
          'Contact information and business details could be more prominent'
        ],
        recommendations: [
          'Strengthen About page with comprehensive company information and team details',
          'Implement customer testimonials and case studies for enhanced credibility',
          'Optimize contact information presentation and add structured business data'
        ],
        priority: 'Medium',
        impact: 'Medium'
      }
    },
    keyInsights: [
      'AI optimization implementation will provide competitive advantage in search visibility',
      'Structured data and content optimization offer the highest impact opportunities',
      'Technical improvements will enhance both user experience and AI platform compatibility (Note: Fallback analysis used)'
    ],
    nextSteps: [
      'Prioritize schema markup implementation for improved AI platform understanding',
      'Develop conversational content format to enhance voice search compatibility',
      'Consider professional consultation for comprehensive optimization strategy'
    ],
    competitiveAdvantage: 'AI optimization will position your business favorably in AI-powered search results, helping capture market share as users increasingly rely on AI assistants for information discovery',
    estimatedImpact: 'Targeted AI optimization improvements could increase organic visibility by 20-35% and enhance user engagement through better content structure and technical performance',
    pagesAnalyzed: 'Homepage and key pages analyzed for comprehensive AI-readiness assessment'
  };
}

function getGradeFromScore(score: number): string {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}

function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const isValidProtocol = urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    const hasValidHostname = urlObj.hostname && urlObj.hostname.includes('.');
    return isValidProtocol && hasValidHostname;
  } catch {
    return false;
  }
}