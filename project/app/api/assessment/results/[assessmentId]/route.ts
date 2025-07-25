import { NextRequest, NextResponse } from 'next/server';
import { getAssessment } from '@/lib/assessment-db';

export async function GET(
  request: NextRequest,
  { params }: { params: { assessmentId: string } }
) {
  try {
    const { assessmentId } = params;

    if (!assessmentId) {
      return NextResponse.json(
        { error: 'Assessment ID is required' },
        { status: 400 }
      );
    }

    const assessment = await getAssessment(assessmentId);
    
    if (!assessment) {
      return NextResponse.json(
        { error: 'Assessment not found' },
        { status: 404 }
      );
    }

    if (assessment.status !== 'completed') {
      return NextResponse.json(
        { error: 'Assessment not yet completed' },
        { status: 400 }
      );
    }

    if (!assessment.results) {
      return NextResponse.json(
        { error: 'Assessment results not available' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      assessmentId,
      url: assessment.url,
      companyName: assessment.companyName,
      completedAt: assessment.completedAt,
      ...assessment.results
    });

  } catch (error: any) {
    console.error('Results fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assessment results' },
      { status: 500 }
    );
  }
}