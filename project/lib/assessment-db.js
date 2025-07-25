import { supabaseServer } from './supabase'
import { sendAssessmentCompletionEmail } from './email-service'

// In-memory fallback storage for development/testing
const inMemoryStorage = new Map()

// Check if Supabase is properly configured
function isSupabaseConfigured() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  return supabaseUrl && 
         supabaseAnonKey && 
         supabaseServiceKey && 
         !supabaseUrl.includes('placeholder') && 
         !supabaseAnonKey.includes('placeholder') && 
         !supabaseServiceKey.includes('placeholder')
}

export async function createAssessment(assessmentData) {
  console.log('💾 Creating assessment:', assessmentData.id)
  
  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    console.warn('⚠️ Supabase not configured, using in-memory storage')
    
    // Store in memory for development/testing
    const formattedData = {
      id: assessmentData.id,
      url: assessmentData.url,
      name: assessmentData.name,
      email: assessmentData.email,
      status: assessmentData.status || 'pending',
      progress: assessmentData.progress || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    inMemoryStorage.set(assessmentData.id, formattedData)
    console.log('✅ Assessment created in memory:', assessmentData.id)
    return formattedData
  }
  
  try {
    // Test connection first
    const { data: testData, error: testError } = await supabaseServer
      .from('assessments')
      .select('count')
      .limit(1)
    
    if (testError) {
      console.error('❌ Supabase connection test failed:', testError)
      throw new Error(`Database connection failed: ${testError.message}`)
    }
    
    console.log('✅ Supabase connection test successful')
    
  // Ensure all required fields are present and properly formatted
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
  
  console.log('📝 Formatted assessment data:', formattedData);
  
  const { data, error } = await supabaseServer
    .from('assessments')
    .insert([formattedData])
    .select()
    .single()

    if (error) {
      console.error('❌ Supabase insert error:', error)
      console.error('❌ Error details:', JSON.stringify(error, null, 2))
      
      // Check for specific error types
      if (error.code === 'PGRST301') {
        throw new Error('Database table "assessments" not found. Please run database migrations.')
      } else if (error.code === '42501') {
        throw new Error('Database permission denied. Please check RLS policies.')
      } else if (error.message.includes('DNS')) {
        throw new Error('Database connection failed. Please check your Supabase URL and network connection.')
      } else {
        throw new Error(`Database error: ${error.message}`)
      }
    }

    console.log('✅ Assessment created successfully:', data.id)
    return data
  } catch (dbError) {
    console.error('❌ Database connection error:', dbError)
    
    // If it's already our custom error, re-throw it
    if (dbError.message.includes('Database') || dbError.message.includes('connection')) {
      throw dbError
    }
    
    // Otherwise, wrap it
    throw new Error(`Unexpected database error: ${dbError.message}`)
  }
}

export async function getAssessment(id) {
  console.log('🔍 Getting assessment:', id)
  
  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    console.warn('⚠️ Supabase not configured, using in-memory storage')
    const data = inMemoryStorage.get(id)
    if (data) {
      console.log('✅ Assessment found in memory:', data.id, data.status)
      return data
    }
    console.log('❌ Assessment not found in memory:', id)
    return null
  }
  
  const { data, error } = await supabaseServer
    .from('assessments')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      console.log('❌ Assessment not found:', id)
      return null
    }
    console.error('❌ Supabase select error:', error)
    throw new Error(`Failed to get assessment: ${error.message}`)
  }

  console.log('✅ Assessment found:', data.id, data.status)
  return data
}

export async function updateAssessment(id, updates) {
  console.log('📝 Updating assessment:', id, updates.status || 'progress update')
  
  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    console.warn('⚠️ Supabase not configured, using in-memory storage')
    const existingData = inMemoryStorage.get(id)
    if (existingData) {
      const updatedData = {
        ...existingData,
        ...updates,
        updated_at: new Date().toISOString()
      }
      inMemoryStorage.set(id, updatedData)
      console.log('✅ Assessment updated in memory')
      return updatedData
    }
    throw new Error(`Assessment not found: ${id}`)
  }
  
  const updateData = {
    ...updates,
    updated_at: new Date().toISOString()
  }

  const { data, error } = await supabaseServer
    .from('assessments')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('❌ Supabase update error:', error)
    throw new Error(`Failed to update assessment: ${error.message}`)
  }

  console.log('✅ Assessment updated successfully')
  return data
}

export async function completeAssessment(id, results) {
  console.log('🎉 Completing assessment:', id)
  
  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    console.warn('⚠️ Supabase not configured, using in-memory storage')
    const existingData = inMemoryStorage.get(id)
    if (existingData) {
      const completedData = {
        ...existingData,
        status: 'completed',
        progress: 100,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        
        // Overall scores
        overall_score: results.overall.score,
        overall_grade: results.overall.grade,
        
        // Category details (enhanced structure)
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
      }
      
      inMemoryStorage.set(id, completedData)
      console.log('✅ Assessment completed in memory')
      
      // Try to send email (but don't fail if it doesn't work)
      try {
        await sendAssessmentCompletionEmail({
          userEmail: completedData.email,
          userName: completedData.name,
          url: completedData.url,
          assessmentId: completedData.id,
          overallScore: completedData.overall_score,
          overallGrade: completedData.overall_grade,
          categories: {
            structuredData: completedData.structured_data,
            contentQuality: completedData.content_analysis,
            technicalPerformance: completedData.technical_performance,
            businessContext: completedData.business_context
          },
          keyInsights: completedData.analysis_metadata?.insights,
          nextSteps: completedData.analysis_metadata?.nextSteps
        });
        console.log('✅ Assessment completion emails sent');
      } catch (emailError) {
        console.error('❌ Failed to send assessment emails:', emailError);
      }
      
      return completedData
    }
    throw new Error(`Assessment not found: ${id}`)
  }
  
  const { data, error } = await supabaseServer
    .from('assessments')
    .update({
      status: 'completed',
      progress: 100,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      
      // Overall scores
      overall_score: results.overall.score,
      overall_grade: results.overall.grade,
      
      // Category details (enhanced structure)
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
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('❌ Failed to complete assessment:', error)
    throw new Error(`Failed to complete assessment: ${error.message}`)
  }

  console.log('✅ Assessment completed successfully')
  
  // Send completion emails
  try {
    await sendAssessmentCompletionEmail({
      userEmail: data.email,
      userName: data.name,
      url: data.url,
      assessmentId: data.id,
      overallScore: data.overall_score,
      overallGrade: data.overall_grade,
      categories: {
        structuredData: data.structured_data,
        contentQuality: data.content_analysis,
        technicalPerformance: data.technical_performance,
        businessContext: data.business_context
      },
      keyInsights: data.analysis_metadata?.insights,
      nextSteps: data.analysis_metadata?.nextSteps
    });
    console.log('✅ Assessment completion emails sent');
  } catch (emailError) {
    console.error('❌ Failed to send assessment emails:', emailError);
    // Don't fail the assessment completion if email fails
  }
  
  return data
}

export async function markAssessmentFailed(id, errorMessage) {
  console.log('❌ Marking assessment as failed:', id)
  
  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    console.warn('⚠️ Supabase not configured, using in-memory storage')
    const existingData = inMemoryStorage.get(id)
    if (existingData) {
      const failedData = {
        ...existingData,
        status: 'failed',
        error_message: errorMessage,
        updated_at: new Date().toISOString()
      }
      inMemoryStorage.set(id, failedData)
      console.log('✅ Assessment marked as failed in memory')
      return failedData
    }
    return null
  }
  
  const { data, error } = await supabaseServer
    .from('assessments')
    .update({
      status: 'failed',
      error_message: errorMessage,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('❌ Failed to mark assessment as failed:', error)
  }

  return data
}