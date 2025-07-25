export interface MockAssessmentResults {
  assessmentId: string;
  url: string;
  status: string;
  crawledPages: any[];
  technicalSeo: any;
  contentAnalysis: any;
  aiOptimization: any;
  userJourney: any;
  overallScore: {
    total: number;
    seoScore: number;
    aiCompatibilityScore: number;
    userExperienceScore: number;
    contentQualityScore: number;
  };
  recommendations: any[];
  createdAt: string;
  completedAt: string;
}

export function generateMockAssessmentData(url: string): MockAssessmentResults {
  const domain = new URL(url).hostname;
  const assessmentId = `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Generate realistic scores based on domain characteristics
  const baseScore = 60 + Math.floor(Math.random() * 30);
  const seoScore = Math.max(50, baseScore + Math.floor(Math.random() * 20) - 10);
  const aiScore = Math.max(45, baseScore + Math.floor(Math.random() * 25) - 15);
  const uxScore = Math.max(55, baseScore + Math.floor(Math.random() * 20) - 5);
  const contentScore = Math.max(50, baseScore + Math.floor(Math.random() * 25) - 10);
  const totalScore = Math.round((seoScore + aiScore + uxScore + contentScore) / 4);

  return {
    assessmentId,
    url,
    status: 'completed',
    crawledPages: [
      {
        url: url,
        title: `${domain.charAt(0).toUpperCase() + domain.slice(1)} - Home`,
        metaDescription: `Welcome to ${domain}. Discover our products and services.`,
        textContent: `Welcome to ${domain}. We provide excellent products and services to our customers. Our team is dedicated to delivering quality solutions that meet your needs. Contact us today to learn more about what we can do for you.`,
        imageAlts: ['Company logo', 'Hero image', 'Product showcase'],
        internalLinks: [`${url}/about`, `${url}/services`, `${url}/contact`],
        externalLinks: ['https://facebook.com', 'https://twitter.com'],
        headings: {
          h1: [`Welcome to ${domain}`],
          h2: ['Our Services', 'Why Choose Us', 'Get Started'],
          h3: ['Quality Products', 'Expert Support', 'Fast Delivery'],
          h4: [],
          h5: [],
          h6: []
        },
        wordCount: 250
      },
      {
        url: `${url}/about`,
        title: `About Us - ${domain}`,
        metaDescription: `Learn more about ${domain} and our mission to provide excellent service.`,
        textContent: `About ${domain}. We are a leading company in our industry with years of experience. Our mission is to provide the best possible service to our customers.`,
        imageAlts: ['Team photo', 'Office building'],
        internalLinks: [url, `${url}/services`, `${url}/contact`],
        externalLinks: [],
        headings: {
          h1: ['About Our Company'],
          h2: ['Our Mission', 'Our Team'],
          h3: ['Company History', 'Our Values'],
          h4: [],
          h5: [],
          h6: []
        },
        wordCount: 180
      },
      {
        url: `${url}/services`,
        title: `Services - ${domain}`,
        metaDescription: `Explore our comprehensive range of services at ${domain}.`,
        textContent: `Our services include consulting, implementation, and support. We work with businesses of all sizes to deliver customized solutions.`,
        imageAlts: ['Service illustration', 'Process diagram'],
        internalLinks: [url, `${url}/about`, `${url}/contact`],
        externalLinks: [],
        headings: {
          h1: ['Our Services'],
          h2: ['Consulting', 'Implementation', 'Support'],
          h3: ['Custom Solutions', 'Industry Expertise'],
          h4: [],
          h5: [],
          h6: []
        },
        wordCount: 320
      }
    ],
    technicalSeo: {
      lighthouse: {
        performance: Math.max(50, seoScore + Math.floor(Math.random() * 20) - 10),
        accessibility: Math.max(60, seoScore + Math.floor(Math.random() * 15)),
        bestPractices: Math.max(70, seoScore + Math.floor(Math.random() * 10)),
        seo: seoScore,
        pwa: Math.max(30, seoScore - 20)
      },
      robotsTxt: {
        exists: Math.random() > 0.3,
        content: 'User-agent: *\nDisallow: /admin\nSitemap: ' + url + '/sitemap.xml',
        issues: Math.random() > 0.7 ? ['No sitemap reference found'] : []
      },
      sitemap: {
        exists: Math.random() > 0.2,
        url: url + '/sitemap.xml',
        pageCount: Math.floor(Math.random() * 50) + 10
      },
      brokenLinks: Math.random() > 0.6 ? [
        {
          sourceUrl: url,
          brokenUrl: url + '/old-page',
          statusCode: 404
        }
      ] : [],
      pageSpeed: {
        desktop: Math.max(60, seoScore + Math.floor(Math.random() * 15)),
        mobile: Math.max(50, seoScore - 10 + Math.floor(Math.random() * 15)),
        coreWebVitals: {
          lcp: 1.5 + Math.random() * 2,
          fid: 50 + Math.random() * 150,
          cls: 0.05 + Math.random() * 0.15
        }
      }
    },
    contentAnalysis: {
      duplicateContent: Math.random() > 0.7 ? [
        {
          page1: url,
          page2: url + '/about',
          similarityScore: 35,
          duplicateText: ['Contact us today', 'We provide excellent service']
        }
      ] : [],
      toneOfVoice: {
        sentiment: {
          score: Math.floor(Math.random() * 10) - 5,
          magnitude: Math.random() * 5,
          label: Math.random() > 0.5 ? 'Positive' : 'Neutral'
        },
        readability: {
          fleschKincaid: 60 + Math.random() * 25,
          grade: 'Standard (8th-9th grade)'
        },
        emotions: [
          { emotion: 'trust', confidence: 0.7 },
          { emotion: 'joy', confidence: 0.4 }
        ]
      },
      contentGaps: Math.random() > 0.5 ? ['Missing FAQ section', 'No testimonials'] : [],
      keywordDensity: [
        { keyword: 'service', frequency: 8, density: 2.1 },
        { keyword: 'company', frequency: 6, density: 1.6 },
        { keyword: 'customer', frequency: 5, density: 1.3 }
      ]
    },
    aiOptimization: {
      nlpScore: aiScore,
      schemaMarkup: {
        present: Math.random() > 0.4,
        types: Math.random() > 0.4 ? ['Organization', 'WebSite'] : [],
        coverage: Math.floor(Math.random() * 60) + 20
      },
      conversationalContent: {
        questionAnswerPairs: Math.floor(Math.random() * 8) + 2,
        directAnswers: Math.floor(Math.random() * 5) + 1,
        voiceSearchReadiness: Math.max(30, aiScore - 10 + Math.floor(Math.random() * 20))
      },
      structuredData: {
        score: Math.max(40, aiScore - 5 + Math.floor(Math.random() * 15)),
        recommendations: [
          'Add FAQ schema markup',
          'Implement breadcrumb navigation',
          'Add organization schema'
        ]
      }
    },
    userJourney: {
      personas: [
        {
          name: 'Information Seeker',
          characteristics: ['Research-focused', 'Detail-oriented'],
          goals: ['Find detailed information', 'Compare options'],
          painPoints: ['Information overload', 'Unclear navigation']
        },
        {
          name: 'Quick Decision Maker',
          characteristics: ['Time-conscious', 'Action-oriented'],
          goals: ['Quick solutions', 'Fast checkout'],
          painPoints: ['Slow loading', 'Complex processes']
        }
      ],
      journeys: [
        {
          persona: 'Information Seeker',
          steps: [
            { page: 'Homepage', action: 'Land and explore', dropOffRisk: 30 },
            { page: 'Services', action: 'Learn more', dropOffRisk: 25 },
            { page: 'Contact', action: 'Get information', dropOffRisk: 40 }
          ]
        }
      ],
      ctaAnalysis: {
        totalCtas: Math.floor(Math.random() * 15) + 5,
        ctaTypes: [
          { type: 'contact', count: 3, effectiveness: 75 },
          { type: 'learn more', count: 4, effectiveness: 60 },
          { type: 'get started', count: 2, effectiveness: 85 }
        ]
      }
    },
    overallScore: {
      total: totalScore,
      seoScore,
      aiCompatibilityScore: aiScore,
      userExperienceScore: uxScore,
      contentQualityScore: contentScore
    },
    recommendations: generateRecommendations(seoScore, aiScore, uxScore, contentScore),
    createdAt: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    completedAt: new Date().toISOString()
  };
}

function generateRecommendations(seoScore: number, aiScore: number, uxScore: number, contentScore: number) {
  const recommendations = [];

  if (seoScore < 70) {
    recommendations.push({
      category: 'Technical SEO',
      priority: 'High',
      title: 'Improve Technical SEO Foundation',
      description: 'Your website has several technical SEO issues that need attention. Focus on page speed, meta tags, and site structure.',
      impact: 'High',
      effort: 'Medium'
    });
  }

  if (aiScore < 65) {
    recommendations.push({
      category: 'AI Optimization',
      priority: 'High',
      title: 'Enhance AI Compatibility',
      description: 'Add structured data markup and improve content format for better AI understanding.',
      impact: 'High',
      effort: 'Medium'
    });
  }

  if (uxScore < 70) {
    recommendations.push({
      category: 'User Experience',
      priority: 'Medium',
      title: 'Optimize User Experience',
      description: 'Improve page loading speed and mobile responsiveness to enhance user satisfaction.',
      impact: 'Medium',
      effort: 'High'
    });
  }

  if (contentScore < 65) {
    recommendations.push({
      category: 'Content',
      priority: 'Medium',
      title: 'Improve Content Quality',
      description: 'Enhance content readability and add more comprehensive information to fill content gaps.',
      impact: 'Medium',
      effort: 'Medium'
    });
  }

  recommendations.push({
    category: 'AI Optimization',
    priority: 'Low',
    title: 'Add FAQ Section',
    description: 'Create a comprehensive FAQ section with structured data to improve voice search optimization.',
    impact: 'Medium',
    effort: 'Low'
  });

  recommendations.push({
    category: 'Technical SEO',
    priority: 'Low',
    title: 'Optimize Images',
    description: 'Add descriptive alt text to all images and optimize file sizes for better performance.',
    impact: 'Low',
    effort: 'Low'
  });

  return recommendations;
}

export function simulateAssessmentProgress() {
  const steps = [
    { status: 'pending', progress: 0, message: 'Assessment queued...' },
    { status: 'crawling', progress: 25, message: 'Crawling website pages...' },
    { status: 'analyzing', progress: 75, message: 'Analyzing content and performance...' },
    { status: 'completed', progress: 100, message: 'Assessment completed!' }
  ];

  return steps;
}