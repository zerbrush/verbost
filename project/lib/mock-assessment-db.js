// Mock database for testing without Supabase
// Use global variable to persist across requests in development
let mockAssessments;
if (typeof global !== 'undefined' && global.mockAssessments) {
  mockAssessments = global.mockAssessments;
} else {
  mockAssessments = new Map();
  if (typeof global !== 'undefined') {
    global.mockAssessments = mockAssessments;
  }
}

export async function createAssessment(assessmentData) {
  console.log('💾 Creating assessment in Mock DB:', assessmentData.id);
  
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const formattedData = {
    id: assessmentData.id,
    url: assessmentData.url,
    name: assessmentData.name,
    email: assessmentData.email,
    status: assessmentData.status || 'pending',
    progress: assessmentData.progress || 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  mockAssessments.set(assessmentData.id, formattedData);
  console.log('✅ Assessment created successfully in Mock DB:', formattedData.id);
  return formattedData;
}

export async function getAssessment(id) {
  console.log('🔍 Getting assessment from Mock DB:', id);
  console.log('📊 Current mock database size:', mockAssessments.size);
  console.log('📊 All assessment IDs in mock DB:', Array.from(mockAssessments.keys()));
  
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 50));
  
  const assessment = mockAssessments.get(id);
  if (!assessment) {
    console.log('❌ Assessment not found in Mock DB:', id);
    return null;
  }
  
  console.log('✅ Assessment found in Mock DB:', assessment.id, assessment.status);
  return assessment;
}

export async function updateAssessment(id, updates) {
  console.log('📝 Updating assessment in Mock DB:', id, updates.status || 'progress update');
  
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 50));
  
  const assessment = mockAssessments.get(id);
  if (!assessment) {
    throw new Error(`Assessment not found: ${id}`);
  }
  
  const updatedAssessment = {
    ...assessment,
    ...updates,
    updated_at: new Date().toISOString()
  };
  
  mockAssessments.set(id, updatedAssessment);
  console.log('✅ Assessment updated successfully in Mock DB');
  return updatedAssessment;
}

export async function completeAssessment(id, results) {
  console.log('🎉 Completing assessment in Mock DB:', id);
  
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const assessment = mockAssessments.get(id);
  if (!assessment) {
    throw new Error(`Assessment not found: ${id}`);
  }
  
  const completedAssessment = {
    ...assessment,
    status: 'completed',
    progress: 100,
    completed_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    
    // Overall scores
    overall_score: results.overall.score,
    overall_grade: results.overall.grade,
    
    // Category details
    structured_data: results.categories.structuredData,
    content_analysis: results.categories.contentQuality,
    technical_performance: results.categories.technicalPerformance,
    business_context: results.categories.businessContext,
    
    // Additional insights and recommendations
    analysis_metadata: {
      summary: results.overall.summary,
      insights: results.keyInsights || [],
      nextSteps: results.nextSteps || [],
      competitiveAnalysis: results.competitiveAdvantage || '',
      estimatedImpact: results.estimatedImpact || '',
      analysisDate: new Date().toISOString(),
      scopeControlled: true,
      pagesAnalyzed: results.pagesAnalyzed || 'Limited scope'
    }
  };
  
  mockAssessments.set(id, completedAssessment);
  console.log('✅ Assessment completed successfully in Mock DB');
  
  return completedAssessment;
}

export async function markAssessmentFailed(id, errorMessage) {
  console.log('❌ Marking assessment as failed in Mock DB:', id);
  
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 50));
  
  const assessment = mockAssessments.get(id);
  if (!assessment) {
    console.log('❌ Assessment not found in Mock DB:', id);
    return null;
  }
  
  const failedAssessment = {
    ...assessment,
    status: 'failed',
    error_message: errorMessage,
    updated_at: new Date().toISOString()
  };
  
  mockAssessments.set(id, failedAssessment);
  console.log('✅ Assessment marked as failed in Mock DB');
  return failedAssessment;
}

// Helper function to get all assessments (for debugging)
export function getAllMockAssessments() {
  return Array.from(mockAssessments.values());
}

// Helper function to clear mock data (for testing)
export function clearMockData() {
  mockAssessments.clear();
  console.log('🧹 Mock database cleared');
} 