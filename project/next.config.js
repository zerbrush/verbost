/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    return config;
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key',
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || 'placeholder-sendgrid-key',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://placeholder.com',
    PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY || 'placeholder-perplexity-key',
    PERPLEXITY_MODEL: process.env.PERPLEXITY_MODEL || 'sonar-pro',
    PERPLEXITY_REQUESTS_PER_MINUTE: process.env.PERPLEXITY_REQUESTS_PER_MINUTE || '10',
    PERPLEXITY_MAX_RETRIES: process.env.PERPLEXITY_MAX_RETRIES || '5',
    PERPLEXITY_MAX_TOKENS: process.env.PERPLEXITY_MAX_TOKENS || '3000',
    PERPLEXITY_TEMPERATURE: process.env.PERPLEXITY_TEMPERATURE || '0.2',
    PERPLEXITY_TIMEOUT: process.env.PERPLEXITY_TIMEOUT || '180000',
    PERPLEXITY_RETRY_DELAY: process.env.PERPLEXITY_RETRY_DELAY || '5000',
  },
};

module.exports = nextConfig;
