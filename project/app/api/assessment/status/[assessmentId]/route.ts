import { NextRequest, NextResponse } from 'next/server';
import { getAssessment } from '@/lib/assessment-db';

export async function GET(
  request: NextRequest,
  { params }: { params: { assessmentId: string } }
) {
  try {
    const assessmentId = params.assessmentId;
    console.log('🔍 Polling for assessment:', assessmentId);

    if (!assessmentId) {
      console.error('❌ No assessment ID provided');
      return NextResponse.json({ error: 'Assessment ID required' }, { status: 400 });
    }

    // Get assessment from Supabase
    const assessment = await getAssessment(assessmentId);
    
    if (!assessment) {
      console.error('❌ Assessment not found in Supabase:', assessmentId);
      return NextResponse.json({ 
        error: 'Assessment not found',
        assessmentId
      }, { status: 404 });
    }

    console.log('✅ Assessment found:', assessment.status, assessment.progress + '%');
    
    // Transform Supabase data to expected format
    const response = {
      status: assessment.status,
      progress: assessment.progress || 0,
      currentStep: getStepMessage(assessment.status, assessment.progress),
      results: assessment.status === 'completed' ? {
        url: assessment.url,
        timestamp: assessment.created_at,
        overall: {
          score: assessment.overall_score,
          grade: assessment.overall_grade,
          summary: assessment.analysis_metadata?.summary,
          insights: assessment.analysis_metadata?.insights || [],
          nextSteps: assessment.analysis_metadata?.nextSteps || [],
          competitiveAnalysis: assessment.analysis_metadata?.competitiveAnalysis || ''
        },
        categories: {
          structuredData: assessment.structured_data,
          contentQuality: assessment.content_analysis,
          technicalPerformance: assessment.technical_performance,
          businessContext: assessment.business_context
        },
        analysis_metadata: assessment.analysis_metadata
      } : null,
      error: assessment.error_message || null,
      assessmentId: assessment.id,
      url: assessment.url,
      createdAt: assessment.created_at,
      updatedAt: assessment.updated_at
    };

    return NextResponse.json(response);

  } catch (error: any) {
    console.error('❌ Polling error:', error);
    return NextResponse.json({ 
      error: 'Polling failed', 
      details: error.message,
      assessmentId: params.assessmentId
    }, { status: 500 });
  }
}

function getStepMessage(status: string, progress: number): string {
  if (status === 'completed') return 'Assessment completed!';
  if (status === 'failed') return 'Assessment failed';
  
  if (progress < 15) return 'Initializing AI analysis...';
  if (progress < 35) return 'Analyzing structured data...';
  if (progress < 55) return 'Evaluating content quality...';
  if (progress < 75) return 'Checking technical performance...';
  if (progress < 90) return 'Analyzing business context...';
  return 'Generating recommendations...';
}