'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Zap, 
  Search, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Globe,
  BarChart3,
  Shield,
  Star,
  Clock,
  Target,
  Lightbulb,
  Mail,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [assessmentUrl, setAssessmentUrl] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showExpandedForm, setShowExpandedForm] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAssessmentUrl(normalizeUrlInput(value));
    
    // Show expanded form when user types a domain (contains a dot)
    if (value.includes('.') && value.length > 3 && !showExpandedForm) {
      setShowExpandedForm(true);
    } else if (!value.includes('.') && showExpandedForm) {
      setShowExpandedForm(false);
      setName('');
      setEmail('');
    }
  };

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

  const handleAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🎯 Form submitted with:', { assessmentUrl, name, email });
    
    if (!assessmentUrl || !name || !email) return;

    setIsAnalyzing(true);
    setError('');

    try {
      console.log('Starting assessment for:', assessmentUrl);
      const response = await fetch('/api/assessment/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: assessmentUrl.trim(), name: name.trim(), email: email.trim() }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ API Error:', errorData);
        throw new Error(errorData.error || 'Assessment failed');
      }

      const data = await response.json();
      console.log('Assessment started:', data);
      
      // Redirect to assessment results page
      console.log('🔄 Redirecting to results page...');
      // Add a small delay to ensure the assessment is created before redirecting
      setTimeout(() => {
        window.location.href = `/assessment/results/${data.assessmentId}`;
      }, 500);
    } catch (err) {
      console.error('Assessment error:', err);
      setError(err instanceof Error ? err.message : 'Failed to start assessment. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-coral" />,
      title: "Comprehensive AI-Readiness Analysis",
      description: "Deep-dive analysis using advanced AI algorithms to identify optimization opportunities across voice search, schema markup, and conversational content."
    },
    {
      icon: <Users className="h-8 w-8 text-deep-teal" />,
      title: "Expert CX Strategy",
      description: "Professional content and user experience optimization from industry experts with proven results."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-soft-gold" />,
      title: "Continuous Monitoring",
      description: "Ongoing performance tracking and recommendations to ensure sustained growth and optimization."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Submit Website for Analysis",
      description: "Enter your website URL for comprehensive analysis of your digital presence."
    },
    {
      number: "02",
      title: "Receive Detailed Report",
      description: "Get comprehensive insights on performance, SEO health, and optimization opportunities."
    },
    {
      number: "03",
      title: "Implement Recommendations",
      description: "Follow our expert recommendations to improve your website's performance and visibility."
    },
    {
      number: "04",
      title: "Monitor & Optimize",
      description: "Continuous tracking and improvements to maintain peak performance and growth."
    }
  ];

  const testimonials = [
    {
      name: "Hank Zerbe",
      role: "JUICE HAUS",
      content: "The continuous monitoring service keeps us ahead of algorithm changes. It's like having an AI SEO expert watching our site 24/7.",
      rating: 5
    },
    {
      name: "Jeff Matlock",
      role: "Thrill Pop",
      content: "Verbost.ai's assessment revealed optimization opportunities we never knew existed.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "ProtoDC",
      content: "The AI-driven insights helped us prepare for the future of search. Our website now ranks in both traditional and AI-powered search results.",
      rating: 5
    }
  ];

  const stats = [
    { value: "2M+", label: "Webpages Analyzed" },
    { value: "24/7", label: "Monitoring Service" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "25+", label: "Countries Served" }
  ];

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-coral rounded-lg flex items-center justify-center mr-3">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-navy">Verbost</span>
              </div>
            </div>
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-white via-light-gray to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 badge-coral">
              The Agency Built for the AI Future
            </Badge>
            <h1 className="mb-6">
              Optimize Your Website for the{' '}
              <span className="text-coral">AI Future</span>
            </h1>
            <p className="body-text mb-8 max-w-3xl mx-auto">
              AI-driven website assessments, content strategy, and ongoing monitoring to ensure your business thrives in search engines and AI platforms
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/assessment">
                <Button size="lg" className="btn-primary">
                  Get Free Website Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {/* Quick Assessment Form */}
            <Card className="max-w-2xl mx-auto card shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-navy">Start Your Free Assessment</CardTitle>
                <CardDescription className="secondary-text">
                  Enter your website URL to begin your AI-powered analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAssessment} className="space-y-4">
                  <div>
                    <Input
                      type="url"
                     placeholder="Enter your domain (e.g., zarbees.com)"
                      value={assessmentUrl}
                      onChange={handleUrlChange}
                      className="border-gray-300 focus:border-coral focus:ring-coral"
                      required
                    />
                    <p className="text-xs text-navy/60 mt-1">
                     Get your free report in seconds
                    </p>
                  </div>
                  
                  {showExpandedForm && (
                    <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-gray-300 focus:border-coral focus:ring-coral"
                            required
                          />
                        </div>
                        <div>
                          <Input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-gray-300 focus:border-coral focus:ring-coral"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    disabled={isAnalyzing || !assessmentUrl || (showExpandedForm && (!name || !email))}
                    className="w-full btn-primary"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analyzing...
                      </>
                    ) : showExpandedForm ? (
                      <>
                        Analyze
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      'Analyze'
                    )}
                  </Button>
                </form>
                
                {showExpandedForm && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-700 text-sm">
                      📧 We'll email your detailed report and may follow up with additional insights.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-coral mb-2">{stat.value}</div>
                <div className="secondary-text">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">
              Why Choose Verbost?
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              We combine cutting-edge AI technology with expert human insight to deliver unparalleled website optimization results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl text-navy">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="body-text">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">
              How It Works
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              Our streamlined process ensures you get maximum value from your website optimization journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-coral text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-navy mb-2">{step.title}</h3>
                <p className="body-text">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">
              Complete AI Optimization Solutions for Every Business
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              From comprehensive assessments to complete optimization, we provide everything you need to succeed in the AI-driven digital landscape
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-coral/10 rounded-lg flex items-center justify-center">
                  <Search className="h-6 w-6 text-coral" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy mb-2">AI-Powered Assessment</h3>
                  <p className="body-text">Comprehensive analysis of your website's performance, SEO health, and optimization opportunities.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-soft-gold/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-soft-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy mb-2">Expert CX Strategy</h3>
                  <p className="body-text">Professional content and user experience optimization from industry experts with proven results.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-deep-teal/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-deep-teal" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy mb-2">Continuous Monitoring</h3>
                  <p className="body-text">Ongoing performance tracking and recommendations to ensure sustained growth and optimization.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-coral/5 to-deep-teal/5 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-coral rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4">Ready to Get Started?</h3>
                <p className="body-text mb-6">
                  Join hundreds of businesses that have transformed their online presence
                </p>
                <Link href="/assessment">
                  <Button size="lg" className="btn-primary">
                    Get Free Assessment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">
              What Our Clients Say
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              Don't just take our word for it - hear from businesses that have transformed their online presence
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-soft-gold fill-current" />
                    ))}
                  </div>
                  <p className="body-text mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-navy">{testimonial.name}</p>
                    <p className="secondary-text">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-coral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-4">
            Ready to Optimize for the AI Future?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join hundreds of businesses that have already transformed their digital presence for the AI future. Get your free assessment today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment">
              <Button size="lg" variant="secondary" className="bg-white text-coral hover:bg-gray-100">
                Get Free Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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