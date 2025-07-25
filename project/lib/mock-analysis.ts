export interface MockAnalysisResult {
  score: number;
  grade: string;
  findings: string[];
  recommendations: Array<{
    title: string;
    description: string;
    impact: string;
    difficulty: string;
    priority: string;
    estimatedTime: string;
  }>;
  summary: string;
}

export function getMockAnalysis(url: string, category: string): MockAnalysisResult {
  const mockData: Record<string, MockAnalysisResult> = {
    structuredData: {
      score: 72,
      grade: 'B',
      findings: [
        'Basic schema markup detected',
        'Missing organization schema',
        'Good meta tag implementation'
      ],
      recommendations: [
        {
          title: 'Add Organization Schema',
          description: 'Implement JSON-LD structured data for your organization to help AI platforms understand your business.',
          impact: 'Improves AI platform recognition and search visibility',
          difficulty: 'Medium',
          priority: 'High',
          estimatedTime: '2-3 hours'
        }
      ],
      summary: 'Your website has basic structured data but could benefit from more comprehensive schema markup for better AI platform compatibility.'
    },
    contentQuality: {
      score: 68,
      grade: 'C',
      findings: [
        'Content depth varies across pages',
        'Limited FAQ or conversational content',
        'Good readability scores'
      ],
      recommendations: [
        {
          title: 'Create Comprehensive FAQ Section',
          description: 'Develop detailed FAQ content that answers common customer questions in a conversational format.',
          impact: 'Better AI platform understanding and improved user engagement',
          difficulty: 'Easy',
          priority: 'High',
          estimatedTime: '4-6 hours'
        }
      ],
      summary: 'Content quality is good but needs optimization for AI platforms through more conversational and comprehensive formats.'
    },
    technicalPerformance: {
      score: 75,
      grade: 'B',
      findings: [
        'Good Core Web Vitals scores',
        'Mobile-responsive design',
        'Fast loading times'
      ],
      recommendations: [
        {
          title: 'Optimize Images for AI Processing',
          description: 'Add descriptive alt text and implement image optimization for better AI platform understanding.',
          impact: 'Improved accessibility and AI platform content recognition',
          difficulty: 'Easy',
          priority: 'Medium',
          estimatedTime: '2-3 hours'
        }
      ],
      summary: 'Technical performance is solid with good Core Web Vitals and mobile optimization.'
    },
    businessContext: {
      score: 70,
      grade: 'B',
      findings: [
        'Clear contact information',
        'Professional presentation',
        'Good trust signals'
      ],
      recommendations: [
        {
          title: 'Enhance About Page',
          description: 'Expand your About page with more detailed company information and team credentials.',
          impact: 'Increased credibility and better AI platform business understanding',
          difficulty: 'Easy',
          priority: 'Medium',
          estimatedTime: '1-2 hours'
        }
      ],
      summary: 'Business context is well-presented with good trust signals and clear value proposition.'
    }
  };

  return mockData[category] || mockData.contentQuality;
}

export function performMockAssessment(url: string) {
  const categories = ['structuredData', 'contentQuality', 'technicalPerformance', 'businessContext'];
  const results: Record<string, MockAnalysisResult> = {};
  
  categories.forEach(category => {
    results[category] = getMockAnalysis(url, category);
  });

  // Calculate overall score
  const overallScore = Math.round(
    Object.values(results).reduce((sum, result) => sum + result.score, 0) / categories.length
  );

  return {
    url,
    timestamp: new Date().toISOString(),
    categories: results,
    overall: {
      score: overallScore,
      grade: overallScore >= 80 ? 'B' : overallScore >= 70 ? 'C' : 'D',
      insights: [
        {
          type: 'opportunity',
          title: 'AI Optimization Opportunity',
          description: 'Your website has good fundamentals but needs targeted improvements for optimal AI platform compatibility.',
          icon: 'lightbulb',
          color: 'yellow'
        }
      ],
      topRecommendations: Object.values(results).flatMap(r => r.recommendations).slice(0, 3),
      competitiveAnalysis: 'Your website is positioned well but competitors with better AI optimization may gain advantages.',
      nextSteps: [
        'Implement recommended schema markup improvements',
        'Create comprehensive FAQ content',
        'Schedule consultation for advanced optimization'
      ]
    }
  };
}