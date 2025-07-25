'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Zap, 
  Search, 
  TrendingUp, 
  CheckCircle, 
  Globe,
  BarChart3,
  Shield,
  Users,
  Target,
  Lightbulb,
  Award,
  Building,
  Mail,
  Linkedin,
  Twitter,
  Star,
  Menu,
  X,
  Clock,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

interface AssessmentData {
  assessmentId: string;
  url: string;
  status: string;
  progress: number;
  currentStep?: string;
  results?: any;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AssessmentResultsPage({ params }: { params: { assessmentId: string } }) {
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchAssessmentData = async () => {
      try {
        console.log('Fetching assessment:', params.assessmentId);
        const response = await fetch(`/api/assessment/status/${params.assessmentId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch assessment data');
        }
        
        const data = await response.json();
        console.log('Assessment data:', data);
        setAssessmentData(data);
        
        // If still processing, poll for updates
        if (data.status !== 'completed' && data.status !== 'failed') {
          setTimeout(fetchAssessmentData, 2000); // Poll every 2 seconds
        }
      } catch (err) {
        console.error('Error fetching assessment:', err);
        setError('Failed to load assessment data');
      } finally {
        setLoading(false);
      }
    };

    fetchAssessmentData();
  }, [params.assessmentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral mx-auto mb-4"></div>
          <p className="text-navy">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (error || !assessmentData) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Assessment not found'}</p>
          <Link href="/assessment">
            <Button className="btn-primary">Start New Assessment</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Show progress if still processing
  if (assessmentData.status !== 'completed') {
    return (
      <div className="min-h-screen bg-light-gray">
        {/* Navigation */}
        <nav className="border-b border-gray-200 bg-white backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="flex-shrink-0 flex items-center">
                  <div className="w-8 h-8 bg-coral rounded-lg flex items-center justify-center mr-3">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-navy">Verbost</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <Badge className="mb-4 badge-coral">
              Assessment in Progress
            </Badge>
            <h1 className="text-3xl font-bold text-navy mb-2">
              Analyzing {assessmentData.url}
            </h1>
            <p className="text-navy/60">
              {assessmentData.currentStep || 'Processing your website...'}
            </p>
          </div>

          <Card className="border-0 bg-white shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-navy">Progress</span>
                <span className="text-sm text-navy/60">{assessmentData.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <div 
                  className="bg-coral h-3 rounded-full transition-all duration-500"
                  style={{ width: `${assessmentData.progress}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-center">
                <RefreshCw className="h-5 w-5 text-coral animate-spin mr-2" />
                <span className="text-navy">
                  {assessmentData.status === 'crawling' && 'Crawling website pages...'}
                  {assessmentData.status === 'analyzing' && 'Analyzing content and performance...'}
                  {assessmentData.status === 'pending' && 'Preparing analysis...'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show results if completed
  const results = assessmentData.results;
  if (!results) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Assessment completed but results not available</p>
          <Link href="/assessment">
            <Button className="btn-primary">Start New Assessment</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-coral rounded-lg flex items-center justify-center mr-3">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-navy">Verbost</span>
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <Link href="/services" className="text-navy/70 hover:text-coral px-3 py-2 text-sm font-medium transition-colors">
                    Services
                  </Link>
                  <Link href="/assessment" className="text-coral px-3 py-2 text-sm font-medium">
                    AI-Readiness Assessment
                  </Link>
                  <Link href="/about" className="text-navy/70 hover:text-coral px-3 py-2 text-sm font-medium transition-colors">
                    About
                  </Link>
                  <Link href="/contact" className="text-navy/70 hover:text-coral px-3 py-2 text-sm font-medium transition-colors">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-navy"
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
              <div className="hidden md:block">
              <Link href="/assessment">
                <Button size="sm" className="btn-primary">
                  Get Started
                </Button>
              </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <Link 
                href="/services" 
                className="text-navy/70 hover:text-coral block px-3 py-2 text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/assessment" 
                className="text-coral block px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI-Readiness Assessment
              </Link>
              <Link 
                href="/about" 
                className="text-navy/70 hover:text-coral block px-3 py-2 text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-navy/70 hover:text-coral block px-3 py-2 text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="px-3 py-2">
                <Link href="/assessment">
                  <Button size="sm" className="btn-primary w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Results Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 badge-emerald">
              Assessment Complete
            </Badge>
            <h1 className="text-3xl font-bold text-navy mb-2">
              AI-Readiness Report for {assessmentData.url}
            </h1>
            <p className="text-navy/60">
              Generated on {new Date(assessmentData.createdAt).toLocaleDateString()} • Analyzed by Verbost AI
            </p>
          </div>
        </div>
      </div>

      {/* Results Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Score Overview */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Overall Score */}
            <div className="lg:col-span-1">
              <Card className="text-center border-0 bg-white shadow-sm">
                <CardContent className="p-8">
                  <div className="w-32 h-32 mx-auto mb-6 relative">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="#f97316"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(results.overall?.score || 74) * 3.14} 314`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-navy">{results.overall?.score || 74}</div>
                        <div className="text-sm text-navy/60">/100</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-navy mb-2">{results.overall?.grade || 'C'}</div>
                  <div className="text-navy/60">Overall Grade</div>
                </CardContent>
              </Card>
            </div>

            {/* Category Scores */}
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(assessmentData.results?.categories || {}).map(([categoryKey, category]: [string, any]) => (
                  <Card key={categoryKey} className="border-0 bg-white shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-navy">
                            {categoryKey === 'structuredData' && 'Structured Data'}
                            {categoryKey === 'contentQuality' && 'Content Quality'}
                            {categoryKey === 'technicalPerformance' && 'Technical Performance'}
                            {categoryKey === 'businessContext' && 'Business Context'}
                          </h3>
                          <p className="text-sm text-navy/60">{category?.grade || 'N/A'} Grade</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-navy">{category?.score || 0}/100</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-coral h-2 rounded-full transition-all duration-500"
                          style={{ width: `${category?.score || 0}%` }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div>
            <h2 className="text-2xl font-bold text-navy mb-6">Key Insights</h2>
            {assessmentData.results?.overall?.insights && assessmentData.results.overall.insights.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {assessmentData.results.overall.insights.map((insight: any, index: number) => (
                  <Card key={index} className="border-0 bg-white shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-full bg-blue-100">
                          <Lightbulb className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-navy mb-2">Key Insight {index + 1}</h3>
                          <p className="text-sm text-navy/70">{insight.description || insight.title || insight}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-0 bg-white shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-blue-100">
                        <Lightbulb className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy mb-2">AI Platform Compatibility</h3>
                        <p className="text-sm text-navy/70">Your website shows good potential for AI platform optimization with some areas for improvement.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Overall Summary */}
          {assessmentData.results?.overall?.summary && (
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">Executive Summary</h2>
              <Card className="border-0 bg-white shadow-sm">
                <CardContent className="p-6">
                  <p className="text-lg text-navy/80 leading-relaxed">{assessmentData.results.overall.summary}</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Detailed Category Analysis */}
          <div>
            <h2 className="text-2xl font-bold text-navy mb-6">Detailed Analysis by Category</h2>
            <div className="space-y-8">
              {Object.entries(assessmentData.results?.categories || {}).map(([categoryKey, category]: [string, any]) => (
                <Card key={categoryKey} className="border-0 bg-white shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-navy">
                        {categoryKey === 'structuredData' && 'Structured Data & Semantic Optimization'}
                        {categoryKey === 'contentQuality' && 'Content Quality & AI Compatibility'}
                        {categoryKey === 'technicalPerformance' && 'Technical Performance'}
                        {categoryKey === 'businessContext' && 'Business Context & Trust Signals'}
                      </CardTitle>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className={`${
                          category?.priority === 'High' ? 'border-red-200 text-red-700' :
                          category?.priority === 'Medium' ? 'border-amber-200 text-amber-700' :
                          'border-green-200 text-green-700'
                        }`}>
                          {category?.priority || 'Medium'} Priority
                        </Badge>
                        <Badge variant="outline" className={`${
                          category?.impact === 'High' ? 'border-red-200 text-red-700' :
                          category?.impact === 'Medium' ? 'border-amber-200 text-amber-700' :
                          'border-green-200 text-green-700'
                        }`}>
                          {category?.impact || 'Medium'} Impact
                        </Badge>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-navy">{category?.score || 0}/100</div>
                          <div className="text-sm text-navy/60">{category?.grade || 'N/A'} Grade</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Findings */}
                    {category?.findings && category.findings.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-navy mb-3 flex items-center">
                          <Search className="h-4 w-4 mr-2" />
                          Key Findings
                        </h4>
                        <ul className="space-y-2">
                          {category.findings.map((finding: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="text-coral mr-2 mt-1">•</span>
                              <span className="text-navy/70">{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Recommendations */}
                    {category?.recommendations && category.recommendations.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-navy mb-3 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Recommendations
                        </h4>
                        <ul className="space-y-2">
                          {category.recommendations.map((recommendation: any, index: number) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-navy/70">
                                {typeof recommendation === 'string' 
                                  ? recommendation 
                                  : (recommendation?.description || recommendation?.title || 'Recommendation')
                                }
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          {assessmentData.results?.overall?.nextSteps && assessmentData.results.overall.nextSteps.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">Immediate Next Steps</h2>
              <Card className="border-0 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {assessmentData.results.overall.nextSteps.map((step: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-coral text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-navy/80 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Competitive Advantage & Impact */}
          <div className="grid md:grid-cols-2 gap-8">
            {assessmentData.results?.overall?.competitiveAnalysis && (
              <Card className="border-0 bg-gradient-to-br from-deep-teal/5 to-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-navy flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-deep-teal" />
                    Competitive Advantage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-navy/80">{assessmentData.results.overall.competitiveAnalysis}</p>
                </CardContent>
              </Card>
            )}
            
            {assessmentData.results?.analysis_metadata?.estimatedImpact && (
              <Card className="border-0 bg-gradient-to-br from-soft-gold/5 to-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-navy flex items-center">
                    <Star className="h-5 w-5 mr-2 text-soft-gold" />
                    Estimated Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-navy/80">{assessmentData.results.analysis_metadata.estimatedImpact}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* CTA Section */}
          <Card className="border-0 bg-coral text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Optimize for AI?</h2>
              <p className="text-xl text-white/90 mb-6 max-w-3xl mx-auto">
                Get personalized recommendations and implementation guidance from our AI optimization experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="secondary" className="bg-white text-coral hover:bg-gray-100">
                    Schedule Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-coral rounded-lg flex items-center justify-center mr-3">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Verbost</span>
              </div>
              <p className="text-white/70 mb-4">
                The agency built for the AI future. We help businesses optimize their websites for both traditional search engines and emerging AI platforms.
              </p>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-white/70">
                <li><Link href="/assessment" className="hover:text-white transition-colors">AI-Readiness Assessment</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">AI-Readiness Audit</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">AI-Readiness Optimization</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Enterprise Solutions</Link></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-white/70">
                <li><Link href="/about" className="hover:text-white transition-colors">About Verbost</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
              <div className="space-y-3 text-white/70">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-coral" />
                  <span>hello@verbost.ai</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-3 text-coral" />
                  <span>Atlanta, GA</span>
                </div>
                <div className="mt-4">
                  <Link href="/contact">
                    <Button size="sm" className="bg-coral hover:bg-coral/90 text-white">
                      Schedule Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-white/70">
              <div className="mb-4 md:mb-0">
                <p>&copy; 2024 Verbost. All rights reserved.</p>
              </div>
              <div className="flex space-x-6 text-sm">
                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}