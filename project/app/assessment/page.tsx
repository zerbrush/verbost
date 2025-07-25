'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowRight, 
  Zap, 
  Search, 
  CheckCircle, 
  Clock,
  Shield,
  Brain,
  TrendingUp,
  Lightbulb,
  Star,
  AlertCircle,
  Download,
  Calendar,
  Globe,
  Mail,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function AIReadinessAssessment() {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const normalizeUrlInput = (input: string): string => {
    if (!input) return '';
    
    let url = input.trim();
    
    // Don't modify if it already has a protocol
    if (url.match(/^https?:\/\//)) {
      return url;
    }
    
    // Remove protocol if user typed it incorrectly
    url = url.replace(/^(https?:\/\/)?/, '');
    
    // Remove www. if present (we'll let the server handle redirects)
    url = url.replace(/^www\./, '');
    
    // Add https:// prefix
    return url ? `https://${url}` : '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !name || !email) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      console.log('Submitting assessment with:', { url, name, email });
      
      const response = await fetch('/api/assessment/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          url: url.trim(),
          name: name.trim(), 
          email: email.trim() 
        })
      });

      const data = await response.json();
      console.log('Assessment response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start assessment');
      }

      // Small delay to ensure database record is created
      setTimeout(() => {
        window.location.href = `/assessment/results/${data.assessmentId}`;
      }, 500);

    } catch (error: any) {
      console.error('Assessment submission error:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  <Link href="/resources" className="text-navy/70 hover:text-coral px-3 py-2 text-sm font-medium transition-colors">
                    Resources
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
                href="/resources" 
                className="text-navy/70 hover:text-coral block px-3 py-2 text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
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

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-coral/5 via-white to-deep-teal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 badge-coral">
              Free AI-Readiness Assessment
            </Badge>
            <h1 className="mb-6">
              Discover How Ready Your Website Is for the{' '}
              <span className="text-coral">AI Future</span>
            </h1>
            <p className="body-text mb-8 max-w-3xl mx-auto">
              Get a comprehensive analysis of your website's AI compatibility and optimization opportunities. Our advanced assessment reveals exactly where you stand and what you need to do to thrive in the AI-powered digital landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Assessment Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 bg-white shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-navy">Start Your Free AI-Readiness Assessment</CardTitle>
              <CardDescription className="body-text">
                Enter your website information below to begin your comprehensive AI-Readiness analysis. Our advanced assessment tool will evaluate your site across multiple AI compatibility factors and provide detailed insights within minutes.
                <br /><br />
                We'll send your detailed report to your email and may follow up with additional insights and recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-navy mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-navy mb-2">
                    Website URL *
                  </label>
                  <input
                    type="text"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(normalizeUrlInput(e.target.value))}
                    placeholder="zarbees.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                    required
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isSubmitting || !url || !name || !email}
                  className="w-full btn-primary py-4 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing your website...
                    </>
                  ) : (
                    <>
                      Analyze Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              {/* Trust Signals */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-navy">100% Free Analysis</p>
                  <p className="text-xs text-navy/60">Complete assessment with no hidden costs</p>
                </div>
                <div className="text-center">
                  <Search className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-navy">Results in 2-3 Minutes</p>
                  <p className="text-xs text-navy/60">Fast, comprehensive analysis</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-navy">Secure & Private</p>
                  <p className="text-xs text-navy/60">Your information is protected</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-6 w-6 text-coral mx-auto mb-2" />
                  <p className="text-sm font-medium text-navy">Actionable Insights</p>
                  <p className="text-xs text-navy/60">Specific recommendations for improvement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What We Analyze */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              What Our AI-Readiness Assessment Analyzes
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              Our comprehensive assessment evaluates your website across four critical categories that determine how well AI platforms understand, rank, and recommend your content to users.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="card text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-coral/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-coral" />
                </div>
                <CardTitle className="text-lg text-navy">AI Compatibility</CardTitle>
                <CardDescription className="secondary-text">
                  Structured data, voice search readiness, and AI platform optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="body-text">
                  We analyze how well your website communicates with AI systems through structured data markup, semantic HTML, and content formatting that AI platforms can easily understand and interpret.
                </p>
              </CardContent>
            </Card>

            <Card className="card text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-deep-teal/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-deep-teal" />
                </div>
                <CardTitle className="text-lg text-navy">Performance Metrics</CardTitle>
                <CardDescription className="secondary-text">
                  Page speed, Core Web Vitals, mobile responsiveness, and user experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="body-text">
                  AI platforms consider user experience signals when evaluating and ranking content, making technical performance crucial for AI-Readiness success.
                </p>
              </CardContent>
            </Card>

            <Card className="card text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-soft-gold/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-soft-gold" />
                </div>
                <CardTitle className="text-lg text-navy">Content Quality</CardTitle>
                <CardDescription className="secondary-text">
                  Content depth, readability, keyword optimization, and engagement factors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="body-text">
                  Content quality represents one of the most important factors in AI-Readiness optimization, as AI platforms prioritize websites that provide comprehensive, helpful, and authoritative information.
                </p>
              </CardContent>
            </Card>

            <Card className="card text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg text-navy">Technical Foundation</CardTitle>
                <CardDescription className="secondary-text">
                  Site architecture, crawlability, indexing, and technical SEO elements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="body-text">
                  A strong technical foundation is essential for optimal AI platform performance, as AI systems must be able to effectively crawl, understand, and index your website content.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-coral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-4">
            Ready to Work with Us?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join hundreds of businesses that have already transformed their digital presence for the AI future. Our team is ready to help you achieve industry-leading AI-Readiness performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-coral hover:bg-gray-100">
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

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