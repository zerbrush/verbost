export interface SyntheticAssessmentData {
  assessmentId: string;
  url: string;
  status: 'pending' | 'crawling' | 'analyzing' | 'completed' | 'failed';
  progress: number;
  crawledPages: CrawledPage[];
  technicalSeo: TechnicalSeoData;
  contentAnalysis: ContentAnalysisData;
  aiOptimization: AiOptimizationData;
  userJourney: UserJourneyData;
  overallScore: OverallScoreData;
  recommendations: RecommendationData[];
  createdAt: string;
  completedAt?: string;
}

export interface CrawledPage {
  url: string;
  title: string;
  metaDescription: string;
  textContent: string;
  imageAlts: string[];
  internalLinks: string[];
  externalLinks: string[];
  headings: {
    h1: string[];
    h2: string[];
    h3: string[];
    h4: string[];
    h5: string[];
    h6: string[];
  };
  wordCount: number;
}

export interface TechnicalSeoData {
  lighthouse: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
    pwa: number;
  };
  robotsTxt: {
    exists: boolean;
    content: string;
    issues: string[];
  };
  sitemap: {
    exists: boolean;
    url: string;
    pageCount: number;
  };
  brokenLinks: Array<{
    sourceUrl: string;
    brokenUrl: string;
    statusCode: number;
  }>;
  pageSpeed: {
    desktop: number;
    mobile: number;
    coreWebVitals: {
      lcp: number;
      fid: number;
      cls: number;
    };
  };
}

export interface ContentAnalysisData {
  duplicateContent: Array<{
    page1: string;
    page2: string;
    similarityScore: number;
    duplicateText: string[];
  }>;
  toneOfVoice: {
    sentiment: {
      score: number;
      magnitude: number;
      label: string;
    };
    readability: {
      fleschKincaid: number;
      grade: string;
    };
    emotions: Array<{
      emotion: string;
      confidence: number;
    }>;
  };
  contentGaps: string[];
  keywordDensity: Array<{
    keyword: string;
    frequency: number;
    density: number;
  }>;
}

export interface AiOptimizationData {
  nlpScore: number;
  schemaMarkup: {
    present: boolean;
    types: string[];
    coverage: number;
  };
  conversationalContent: {
    questionAnswerPairs: number;
    directAnswers: number;
    voiceSearchReadiness: number;
  };
  structuredData: {
    score: number;
    recommendations: string[];
  };
}

export interface UserJourneyData {
  personas: Array<{
    name: string;
    characteristics: string[];
    goals: string[];
    painPoints: string[];
  }>;
  journeys: Array<{
    persona: string;
    steps: Array<{
      page: string;
      action: string;
      dropOffRisk: number;
    }>;
  }>;
  ctaAnalysis: {
    totalCtas: number;
    ctaTypes: Array<{
      type: string;
      count: number;
      effectiveness: number;
    }>;
  };
}

export interface OverallScoreData {
  total: number;
  seoScore: number;
  aiCompatibilityScore: number;
  userExperienceScore: number;
  contentQualityScore: number;
}

export interface RecommendationData {
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'High' | 'Medium' | 'Low';
}

// Synthetic data that simulates a realistic website with various issues
export function generateSyntheticAssessmentData(url: string): SyntheticAssessmentData {
  const domain = extractDomain(url);
  const assessmentId = `synthetic-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    assessmentId,
    url,
    status: 'completed',
    progress: 100,
    crawledPages: generateCrawledPages(url, domain),
    technicalSeo: generateTechnicalSeoData(url),
    contentAnalysis: generateContentAnalysisData(),
    aiOptimization: generateAiOptimizationData(),
    userJourney: generateUserJourneyData(),
    overallScore: {
      total: 67,
      seoScore: 72,
      aiCompatibilityScore: 58,
      userExperienceScore: 74,
      contentQualityScore: 65
    },
    recommendations: generateRecommendations(72, 58, 74, 65),
    createdAt: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
    completedAt: new Date().toISOString()
  };
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return 'example.com';
  }
}

function generateCrawledPages(url: string, domain: string): CrawledPage[] {
  const baseUrl = url.replace(/\/$/, '');
  
  return [
    {
      url: baseUrl,
      title: `${domain.charAt(0).toUpperCase() + domain.slice(1)} - Professional Services & Solutions`,
      metaDescription: `Leading provider of professional services and innovative solutions. Contact us today to learn how we can help your business grow and succeed.`,
      textContent: `Welcome to ${domain}. We are a leading provider of professional services and innovative solutions designed to help businesses thrive in today's competitive marketplace. Our team of experienced professionals is dedicated to delivering exceptional results that exceed our clients' expectations. We offer a comprehensive range of services including consulting, implementation, and ongoing support. Our proven methodology ensures that every project is completed on time and within budget. Contact us today to schedule a consultation and discover how we can help your business achieve its goals. We pride ourselves on our commitment to excellence and our ability to deliver measurable results. Our clients trust us to provide reliable, cost-effective solutions that drive growth and improve operational efficiency.`,
      imageAlts: ['Company headquarters building', 'Professional team meeting', 'Modern office workspace'],
      internalLinks: [`${baseUrl}/about`, `${baseUrl}/services`, `${baseUrl}/contact`, `${baseUrl}/blog`],
      externalLinks: ['https://linkedin.com/company/example', 'https://twitter.com/example'],
      headings: {
        h1: [`Welcome to ${domain}`],
        h2: ['Our Services', 'Why Choose Us', 'Client Success Stories', 'Get Started Today'],
        h3: ['Professional Consulting', 'Implementation Services', 'Ongoing Support', 'Industry Expertise'],
        h4: ['Strategic Planning', 'Process Optimization', 'Technology Integration'],
        h5: [],
        h6: []
      },
      wordCount: 187
    },
    {
      url: `${baseUrl}/about`,
      title: `About Us - ${domain}`,
      metaDescription: `Learn about our company history, mission, and the experienced team behind our success.`,
      textContent: `About ${domain}. Founded in 2015, we have grown from a small startup to a recognized leader in our industry. Our mission is to provide innovative solutions that help businesses overcome challenges and achieve sustainable growth. Our team consists of highly skilled professionals with diverse backgrounds and extensive experience in their respective fields. We believe in building long-term partnerships with our clients based on trust, transparency, and mutual success. Our core values include integrity, innovation, and excellence in everything we do. We are committed to staying at the forefront of industry trends and continuously improving our services to meet the evolving needs of our clients.`,
      imageAlts: ['Company founders', 'Team photo', 'Office culture'],
      internalLinks: [baseUrl, `${baseUrl}/services`, `${baseUrl}/contact`],
      externalLinks: [],
      headings: {
        h1: ['About Our Company'],
        h2: ['Our Story', 'Our Mission', 'Our Team', 'Our Values'],
        h3: ['Company History', 'Leadership Team', 'Core Values'],
        h4: [],
        h5: [],
        h6: []
      },
      wordCount: 142
    },
    {
      url: `${baseUrl}/services`,
      title: `Services - ${domain}`,
      metaDescription: `Comprehensive range of professional services including consulting, implementation, and support.`,
      textContent: `Our comprehensive range of services is designed to address the unique needs of businesses across various industries. We offer strategic consulting to help organizations identify opportunities for growth and improvement. Our implementation services ensure that recommended solutions are deployed effectively and efficiently. We provide ongoing support and maintenance to ensure continued success and optimal performance. Our team has expertise in project management, change management, and technology integration. We work closely with our clients to understand their specific requirements and develop customized solutions that deliver measurable results. Whether you need help with process optimization, system integration, or strategic planning, we have the knowledge and experience to help you succeed.`,
      imageAlts: ['Service delivery process', 'Client consultation', 'Project implementation'],
      internalLinks: [baseUrl, `${baseUrl}/about`, `${baseUrl}/contact`],
      externalLinks: [],
      headings: {
        h1: ['Our Services'],
        h2: ['Consulting Services', 'Implementation', 'Support & Maintenance'],
        h3: ['Strategic Planning', 'Process Optimization', 'Technology Solutions', 'Change Management'],
        h4: ['Business Analysis', 'Solution Design', 'Project Management'],
        h5: [],
        h6: []
      },
      wordCount: 156
    },
    {
      url: `${baseUrl}/contact`,
      title: `Contact Us - ${domain}`,
      metaDescription: `Get in touch with our team to discuss your project requirements and schedule a consultation.`,
      textContent: `Contact us today to discuss your project requirements and learn how we can help your business achieve its goals. Our team is available to answer your questions and provide detailed information about our services. We offer free initial consultations to help you understand the potential benefits of working with us. You can reach us by phone, email, or through our online contact form. We are committed to responding to all inquiries within 24 hours. Our office is located in the heart of the business district, and we welcome visitors by appointment. We look forward to hearing from you and exploring opportunities for collaboration.`,
      imageAlts: ['Contact form', 'Office location', 'Customer service team'],
      internalLinks: [baseUrl, `${baseUrl}/about`, `${baseUrl}/services`],
      externalLinks: [],
      headings: {
        h1: ['Contact Us'],
        h2: ['Get In Touch', 'Office Location', 'Business Hours'],
        h3: ['Phone', 'Email', 'Address'],
        h4: [],
        h5: [],
        h6: []
      },
      wordCount: 118
    }
  ];
}

function generateTechnicalSeoData(url: string): TechnicalSeoData {
  return {
    lighthouse: {
      performance: 68,
      accessibility: 79,
      bestPractices: 83,
      seo: 72,
      pwa: 42
    },
    robotsTxt: {
      exists: false,
      content: '',
      issues: ['robots.txt file not found', 'Missing sitemap reference']
    },
    sitemap: {
      exists: true,
      url: `${url}/sitemap.xml`,
      pageCount: 24
    },
    brokenLinks: [
      {
        sourceUrl: url,
        brokenUrl: `${url}/old-page`,
        statusCode: 404
      },
      {
        sourceUrl: `${url}/about`,
        brokenUrl: `${url}/legacy/team`,
        statusCode: 404
      }
    ],
    pageSpeed: {
      desktop: 72,
      mobile: 58,
      coreWebVitals: {
        lcp: 2.8,
        fid: 145,
        cls: 0.12
      }
    }
  };
}

function generateContentAnalysisData(): ContentAnalysisData {
  return {
    duplicateContent: [
      {
        page1: '/about',
        page2: '/services',
        similarityScore: 34,
        duplicateText: [
          'We are committed to delivering exceptional results',
          'Our team of experienced professionals',
          'Contact us today to learn more'
        ]
      }
    ],
    toneOfVoice: {
      sentiment: {
        score: 2.3,
        magnitude: 4.1,
        label: 'Positive'
      },
      readability: {
        fleschKincaid: 58.7,
        grade: 'Standard (10th-12th grade)'
      },
      emotions: [
        { emotion: 'trust', confidence: 0.78 },
        { emotion: 'confidence', confidence: 0.65 },
        { emotion: 'professionalism', confidence: 0.82 }
      ]
    },
    contentGaps: [
      'Missing FAQ section',
      'No customer testimonials',
      'Lack of case studies',
      'Missing pricing information',
      'No blog or resources section'
    ],
    keywordDensity: [
      { keyword: 'services', frequency: 12, density: 2.1 },
      { keyword: 'business', frequency: 9, density: 1.6 },
      { keyword: 'professional', frequency: 8, density: 1.4 },
      { keyword: 'solutions', frequency: 7, density: 1.2 },
      { keyword: 'team', frequency: 6, density: 1.1 }
    ]
  };
}

function generateAiOptimizationData(): AiOptimizationData {
  return {
    nlpScore: 58,
    schemaMarkup: {
      present: false,
      types: [],
      coverage: 0
    },
    conversationalContent: {
      questionAnswerPairs: 2,
      directAnswers: 1,
      voiceSearchReadiness: 35
    },
    structuredData: {
      score: 25,
      recommendations: [
        'Add Organization schema markup',
        'Implement FAQ structured data',
        'Add LocalBusiness schema for contact information',
        'Include breadcrumb navigation markup',
        'Add Service schema for service pages'
      ]
    }
  };
}

function generateUserJourneyData(): UserJourneyData {
  return {
    personas: [
      {
        name: 'Business Decision Maker',
        characteristics: ['Results-oriented', 'Time-conscious', 'Budget-aware'],
        goals: ['Find reliable service provider', 'Understand pricing', 'Evaluate expertise'],
        painPoints: ['Unclear service descriptions', 'Missing pricing information', 'No social proof']
      },
      {
        name: 'Technical Evaluator',
        characteristics: ['Detail-oriented', 'Research-focused', 'Quality-conscious'],
        goals: ['Assess technical capabilities', 'Review case studies', 'Understand methodology'],
        painPoints: ['Lack of technical details', 'Missing case studies', 'No process documentation']
      }
    ],
    journeys: [
      {
        persona: 'Business Decision Maker',
        steps: [
          { page: 'Homepage', action: 'Initial evaluation', dropOffRisk: 35 },
          { page: 'Services', action: 'Service exploration', dropOffRisk: 28 },
          { page: 'About', action: 'Credibility check', dropOffRisk: 22 },
          { page: 'Contact', action: 'Inquiry submission', dropOffRisk: 45 }
        ]
      }
    ],
    ctaAnalysis: {
      totalCtas: 8,
      ctaTypes: [
        { type: 'contact', count: 4, effectiveness: 72 },
        { type: 'learn more', count: 2, effectiveness: 58 },
        { type: 'get started', count: 2, effectiveness: 81 }
      ]
    }
  };
}

function generateRecommendations(seoScore: number, aiScore: number, uxScore: number, contentScore: number): RecommendationData[] {
  const recommendations: RecommendationData[] = [];

  if (seoScore < 70) {
    recommendations.push({
      category: 'Technical SEO',
      priority: 'High',
      title: 'Fix Critical Technical SEO Issues',
      description: 'Your website has fundamental technical SEO problems that are preventing search engines from properly understanding and ranking your content. Address page speed optimization, missing meta tags, and improve site architecture for better crawlability.',
      impact: 'High',
      effort: 'Medium'
    });
  }

  if (aiScore < 65) {
    recommendations.push({
      category: 'AI Optimization',
      priority: 'High',
      title: 'Implement AI-First Content Strategy',
      description: 'Your content is not optimized for AI-powered search engines. Add comprehensive structured data markup, create FAQ sections with natural language, and format content to answer specific user questions that AI systems can easily understand and reference.',
      impact: 'High',
      effort: 'Medium'
    });
  }

  if (uxScore < 70) {
    recommendations.push({
      category: 'User Experience',
      priority: 'Medium',
      title: 'Enhance Mobile Performance & Usability',
      description: 'Your website provides a suboptimal user experience, particularly on mobile devices. Focus on improving page load times, optimizing for mobile viewports, and ensuring intuitive navigation to reduce bounce rates and improve engagement metrics.',
      impact: 'Medium',
      effort: 'High'
    });
  }

  if (contentScore < 65) {
    recommendations.push({
      category: 'Content',
      priority: 'Medium',
      title: 'Develop Comprehensive Content Strategy',
      description: 'Your content lacks depth and fails to address key user questions. Create detailed, authoritative content that covers topics comprehensively, add FAQ sections, customer testimonials, and ensure all content provides clear value to your target audience.',
      impact: 'Medium',
      effort: 'Medium'
    });
  }

  // Add more specific, actionable recommendations
  recommendations.push({
    category: 'AI Optimization',
    priority: 'High',
    title: 'Add Structured Data for Rich Snippets',
    description: 'Implement JSON-LD structured data markup for your organization, services, and FAQ content. This helps AI systems understand your business and can result in rich snippets in search results, improving click-through rates by up to 30%.',
    impact: 'High',
    effort: 'Low'
  });

  recommendations.push({
    category: 'Content',
    priority: 'Medium',
    title: 'Create Voice Search Optimized Content',
    description: 'Optimize your content for voice search by including natural language questions and conversational phrases. Add a comprehensive FAQ section that answers common customer questions in a natural, spoken format.',
    impact: 'Medium',
    effort: 'Medium'
  });

  recommendations.push({
    category: 'Technical SEO',
    priority: 'High',
    title: 'Implement Core Web Vitals Optimization',
    description: 'Your Core Web Vitals scores need improvement to meet Google\'s page experience standards. Focus on optimizing Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS) to improve both user experience and search rankings.',
    impact: 'High',
    effort: 'High'
  });

  recommendations.push({
    category: 'AI Optimization',
    priority: 'Medium',
    title: 'Optimize for Featured Snippets',
    description: 'Structure your content to target featured snippets by creating clear, concise answers to common questions. Use proper heading hierarchy and bullet points to increase your chances of appearing in position zero.',
    impact: 'Medium',
    effort: 'Low'
  });

  recommendations.push({
    category: 'Content',
    priority: 'Low',
    title: 'Enhance Content Depth and Authority',
    description: 'Expand your content to demonstrate expertise and authority in your field. Add case studies, detailed guides, and industry insights that position your brand as a thought leader and provide comprehensive value to users.',
    impact: 'Medium',
    effort: 'Low'
  });

  return recommendations;
}

// Simulate assessment progress steps
export const assessmentSteps = [
  { status: 'pending', progress: 0, message: 'Assessment queued...' },
  { status: 'crawling', progress: 25, message: 'Crawling website pages...' },
  { status: 'analyzing', progress: 75, message: 'Analyzing content and performance...' },
  { status: 'completed', progress: 100, message: 'Assessment completed!' }
];

// Storage for synthetic assessments (in-memory)
const syntheticAssessments = new Map<string, SyntheticAssessmentData>();

export function storeSyntheticAssessment(assessment: SyntheticAssessmentData): void {
  syntheticAssessments.set(assessment.assessmentId, assessment);
}

export function getSyntheticAssessment(assessmentId: string): SyntheticAssessmentData | null {
  return syntheticAssessments.get(assessmentId) || null;
}

export function getAllSyntheticAssessments(): SyntheticAssessmentData[] {
  return Array.from(syntheticAssessments.values());
}