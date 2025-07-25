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
  nodeEnv: process.env.NODE_ENV
})

// Check if environment variables are properly configured
if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL is not configured properly')
  if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
    // During build time, allow placeholder values
    console.warn('⚠️ Using placeholder Supabase URL for build process')
  } else {
    throw new Error('Supabase URL is not configured. Please set NEXT_PUBLIC_SUPABASE_URL in your .env.local file')
  }
}

if (!supabaseServiceKey || supabaseServiceKey.includes('placeholder')) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY is not configured properly')
  if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
    console.warn('⚠️ Using placeholder service key for build process')
  } else {
    throw new Error('Supabase Service Role Key is not configured. Please set SUPABASE_SERVICE_ROLE_KEY in your .env.local file')
  }
}

if (!supabaseAnonKey || supabaseAnonKey.includes('placeholder')) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured properly')
  if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
    console.warn('⚠️ Using placeholder anon key for build process')
  } else {
    throw new Error('Supabase Anon Key is not configured. Please set NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file')
  }
}

// Server-side client (for API routes) with additional configuration
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
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
})

// Client-side client (for frontend) with additional configuration
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  },
  db: {
    schema: 'public'
  }
})

console.log('✅ Supabase clients initialized successfully')