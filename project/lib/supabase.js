import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Log environment variables for debugging (without exposing sensitive data)
console.log('🔍 Environment check:', {
  hasUrl: !!supabaseUrl,
  hasAnonKey: !!supabaseAnonKey,
  hasServiceKey: !!supabaseServiceKey,
  urlPrefix: supabaseUrl ? supabaseUrl.substring(0, 20) + '...' : 'missing',
  nodeEnv: process.env.NODE_ENV,
  isConfigured: !!(supabaseUrl && supabaseAnonKey && supabaseServiceKey && 
                   !supabaseUrl.includes('placeholder') && 
                   !supabaseAnonKey.includes('placeholder') && 
                   !supabaseServiceKey.includes('placeholder'))
})

// Check if environment variables are properly configured
if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
  console.warn('⚠️ NEXT_PUBLIC_SUPABASE_URL is not configured properly')
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ Using fallback in-memory storage for development - API features will work but data will not persist')
  } else {
    console.error('❌ Supabase URL is not configured. Please set NEXT_PUBLIC_SUPABASE_URL in your .env.local file')
  }
}

if (!supabaseServiceKey || supabaseServiceKey.includes('placeholder')) {
  console.warn('⚠️ SUPABASE_SERVICE_ROLE_KEY is not configured properly')
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ Using fallback in-memory storage for development - API features will work but data will not persist')
  } else {
    console.error('❌ Supabase Service Role Key is not configured. Please set SUPABASE_SERVICE_ROLE_KEY in your .env.local file')
  }
}

if (!supabaseAnonKey || supabaseAnonKey.includes('placeholder')) {
  console.warn('⚠️ NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured properly')
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ Using fallback in-memory storage for development - API features will work but data will not persist')
  } else {
    console.error('❌ Supabase Anon Key is not configured. Please set NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file')
  }
}

// Check if Supabase is properly configured
const isSupabaseConfigured = supabaseUrl && 
                            supabaseAnonKey && 
                            supabaseServiceKey && 
                            !supabaseUrl.includes('placeholder') && 
                            !supabaseAnonKey.includes('placeholder') && 
                            !supabaseServiceKey.includes('placeholder')

// Server-side client (for API routes) with additional configuration
export const supabaseServer = isSupabaseConfigured ? createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'X-Client-Info': 'verbost-api'
    }
  }
}) : null

// Client-side client (for frontend) with additional configuration
export const supabaseClient = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  },
  db: {
    schema: 'public'
  }
}) : null

if (isSupabaseConfigured) {
  console.log('✅ Supabase clients initialized successfully')
} else {
  console.log('⚠️ Supabase not configured - using fallback storage')
}