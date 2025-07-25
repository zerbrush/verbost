'use client';

import { useState } from 'react';
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
  Clock,
  Target,
  Users,
  Lightbulb,
  Settings,
  Monitor,
  FileText,
  Headphones,
  Mail,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const services = [
    {
      icon: <Search className="h-12 w-12 text-coral" />,
      title: "Website Assessment Tool",
      description: "Comprehensive AI-driven analysis of your website's performance, SEO health, and optimization opportunities.",
      features: [
        "AI-powered content analysis",
        "Technical SEO audit",
        "Performance benchmarking",
        "Competitor comparison",
        "Actionable recommendations",
        "Detailed reporting"
      ],
      pricing: "Starting at $149",
      timeline: "Results in 24-48 hours"
    },
    {
      icon: <Globe className="h-12 w-12 text-deep-teal" />,
      title: "MCP Server Hosting",
      description: "Advanced content management platform designed for AI-optimized content delivery and seamless integration.",
      features: [
        "AI-optimized content delivery",
        "Scalable infrastructure",
        "Real-time synchronization",
        "Advanced caching",
        "Security monitoring",
        "24/7 technical support"
      ],
      pricing: "Custom pricing",
      timeline: "Setup in 1-2 weeks"
    },
    {
      icon: <Monitor className="h-12 w-12 text-soft-gold" />,
      title: "Ongoing Monitoring Services",
      description: "Continuous performance tracking with real-time alerts and recommendations for sustained optimization.",
      features: [
        "24/7 performance monitoring",
        "Automated alerts",
        "Monthly reports",
        "Trend analysis",
        "Competitor tracking",
        "Optimization recommendations"
      ],
      pricing: "From $299/month",
      timeline: "Active monitoring starts immediately"
    },
    {
      icon: <Users className="h-12 w-12 text-coral" />,
      title: "CX & Content Strategy",
      description: "Expert consultation and strategic guidance for content optimization and customer experience improvement.",
      features: [
        "Content strategy development",
        "User experience optimization",
        "AI-friendly content creation",
        "Conversion rate optimization",
        "Brand voice development",
        "Training and workshops"
      ],
      pricing: "Starting at $199/hour",
      timeline: "Customized to your needs"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Analysis",
      description: "We start by understanding your business goals, target audience, and current digital presence through comprehensive analysis.",
      duration: "1-2 weeks"
    },
    {
      step: "02",
      title: "Strategic Planning",
      description: "Based on our findings, we develop a customized strategy that aligns with your objectives and industry best practices.",
      duration: "1 week"
    },
    {
      step: "03",
      title: "Implementation",
      description: "Our team executes the planned improvements, whether it's technical optimizations, content updates, or infrastructure changes.",
      duration: "2-6 weeks"
    },
    {
      step: "04",
      title: "Monitoring & Optimization",
      description: "We continuously monitor performance and make data-driven adjustments to ensure sustained growth and improvement.",
      duration: "Ongoing"
    }
  ];

  const caseStudies = [
    {
      client: "TechCorp Solutions",
      industry: "SaaS",
      challenge: "Low organic traffic and poor search visibility",
      solution: "Comprehensive SEO audit and AI optimization",
      results: [
        "150% increase in organic traffic",
        "300% improvement in search rankings",
        "45% increase in lead generation"
      ],
      timeline: "3 months"
    },
    {
      client: "E-commerce Plus",
      industry: "E-commerce",
      challenge: "Slow website performance and high bounce rate",
      solution: "Performance optimization and UX improvements",
      results: [
        "60% faster page load times",
        "40% reduction in bounce rate",
        "25% increase in conversion rate"
      ],
      timeline: "2 months"
    },
    {
      client: "Professional Services Inc.",
      industry: "Professional Services",
      challenge: "Poor AI search visibility and outdated content",
      solution: "AI-friendly content restructuring and optimization",
      results: [
        "200% increase in AI-generated traffic",
        "80% improvement in content engagement",
        "50% increase in qualified leads"
      ],
      timeline: "4 months"
    }
  ];

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
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/services" className="text-coral px-3 py-2 text-sm font-medium">
                  Services
                </Link>
                <Link href="/assessment" className="text-navy/70 hover:text-coral px-3 py-2 text-sm font-medium transition-colors">
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
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <Link 
                href="/services" 
                className="text-coral block px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/assessment" 
                className="text-navy/70 hover:text-coral block px-3 py-2 text-base font-medium transition-colors"
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

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-coral/5 via-white to-deep-teal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 badge-coral">
              Our Services
            </Badge>
            <h1 className="mb-6">
              Comprehensive Website AI Optimization Services
            </h1>
            <p className="body-text mb-8 max-w-3xl mx-auto">
              From comprehensive assessments to complete optimization, we provide everything you need to succeed in the AI-driven digital landscape
            </p>
            <Button size="lg" className="btn-primary">
              <Link href="/contact">
                Schedule Consultation
              </Link>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              Choose Your Optimization Level
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              Select the service level that best fits your needs and budget. Each tier provides increasing value and comprehensive optimization.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <Card className="card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-coral" />
                  </div>
                  <CardTitle className="text-lg text-navy">AI-Readiness Audit</CardTitle>
                  <p className="text-coral font-medium mt-2">Perfect for businesses starting their AI journey</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-navy mb-2">$497</div>
                  <Badge variant="outline" className="mt-2 border-coral/20 text-coral">
                    5-7 business days
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="body-text mb-4">
                  Comprehensive AI-compatibility analysis of up to 100 pages, focusing on fundamental AI-readiness factors that impact your visibility across AI platforms.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Comprehensive AI-compatibility analysis of up to 100 pages</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Voice search optimization assessment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Schema markup evaluation and recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Conversational content analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">AI platform compatibility report</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Detailed action plan with priority rankings</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Email support for implementation questions</span>
                  </li>
                </ul>
                <Button className="w-full btn-primary">
                  <Link href="/contact">
                    Get Started
                  </Link>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Tier 2 */}
            <Card className="card hover:shadow-lg transition-shadow border-2 border-deep-teal/20 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-deep-teal text-white">Most Popular</Badge>
              </div>
              <CardHeader>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-deep-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-deep-teal" />
                  </div>
                  <CardTitle className="text-lg text-navy">AI-Readiness Optimization</CardTitle>
                  <p className="text-deep-teal font-medium mt-2">Ideal for businesses serious about AI optimization</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-navy mb-2">$1,497</div>
                  <Badge variant="outline" className="mt-2 border-deep-teal/20 text-deep-teal">
                    7-10 business days
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="body-text mb-4">
                  Everything in AI-Readiness Audit plus comprehensive optimization implementation and strategic guidance.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Everything in AI-Readiness Audit PLUS:</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Custom schema markup implementation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Voice search content optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Technical AI-readiness improvements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Competitive AI analysis and positioning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Content strategy for conversational queries</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Performance monitoring setup</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Strategic support and consultation</span>
                  </li>
                </ul>
                <Button className="w-full btn-secondary">
                  Buy Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Tier 3 */}
            <Card className="card hover:shadow-lg transition-shadow border-2 border-soft-gold/20 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-soft-gold text-white">Best Value</Badge>
              </div>
              <CardHeader>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-soft-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-soft-gold" />
                  </div>
                  <CardTitle className="text-lg text-navy">AI-Readiness Transformation</CardTitle>
                  <p className="text-soft-gold font-medium mt-2">For organizations requiring comprehensive AI transformation support</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-navy mb-2">$3,497</div>
                  <Badge variant="outline" className="mt-2 border-soft-gold/20 text-soft-gold">
                    14-21 business days
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="body-text mb-4">
                  Everything in AI-Readiness Optimization plus advanced implementation and comprehensive strategic partnership.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Everything in AI-Readiness Optimization PLUS:</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Advanced technical implementation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Multi-platform AI optimization strategy</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Custom AI-readiness roadmap development</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Executive stakeholder presentation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Competitive intelligence and market analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Priority access to emerging AI technologies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Strategic partnership and optimization</span>
                  </li>
                </ul>
                <Button className="w-full btn-primary">
                  Buy Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Enterprise Callout */}
          <div className="mt-12">
            <Card className="card border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4">Need Something More Custom?</h3>
                <p className="body-text mb-6 max-w-2xl mx-auto">
                  For large organizations requiring bespoke AI strategies, multi-domain optimization, or dedicated account management, we offer custom enterprise solutions tailored to your specific needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button className="bg-purple-600 text-white hover:bg-purple-700">
                      Discuss Enterprise Needs
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              Our Proven Methodology Delivers Consistent AI-Readiness Results
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              We've refined our AI-Readiness optimization process through years of experience helping businesses across all industries prepare for the AI-driven future.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Comprehensive AI-Readiness Discovery",
                description: "Understanding your business goals and current AI-Readiness position through comprehensive analysis of your digital presence and competitive environment."
              },
              {
                step: "02", 
                title: "Custom AI Optimization Strategy",
                description: "Developing tailored AI-Readiness strategies specifically for your business objectives, target audience, and competitive environment."
              },
              {
                step: "03",
                title: "Expert Implementation Guidance", 
                description: "Guiding successful execution of AI-Readiness optimizations with detailed guidance and ongoing consultation."
              },
              {
                step: "04",
                title: "Continuous AI Performance Monitoring",
                description: "Ensuring sustained AI-Readiness performance and competitive advantage through continuous monitoring and strategic updates."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-coral text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-navy mb-2">{step.title}</h3>
                <p className="body-text">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Why Choose Verbost */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              Why Choose Verbost for Your AI-Readiness Transformation?
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              Unlike agencies that offer multiple services, we concentrate exclusively on AI-Readiness optimization, ensuring you receive the most advanced strategies available.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8 text-coral" />,
                title: "Exclusive AI-Readiness Specialization",
                description: "Unlike agencies that offer multiple services, we concentrate exclusively on AI-Readiness optimization, ensuring you receive the most advanced strategies available."
              },
              {
                icon: <Users className="h-8 w-8 text-deep-teal" />,
                title: "Proven Methodology and Measurable Results", 
                description: "Our AI-Readiness optimization methodology has been refined through years of experience and hundreds of successful implementations across all business sizes."
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-soft-gold" />,
                title: "Cutting-Edge Technology and Analytics",
                description: "We stay ahead of emerging AI technologies, ensuring you receive the most sophisticated optimization strategies available."
              },
              {
                icon: <Shield className="h-8 w-8 text-coral" />,
                title: "Ongoing Support and Continuous Optimization",
                description: "AI platforms evolve rapidly, and we provide continuous support, regular performance monitoring, and strategic updates to maintain your competitive advantage."
              },
              {
                icon: <Target className="h-8 w-8 text-deep-teal" />,
                title: "Transparent Communication and Partnership",
                description: "We believe in transparent communication, clear reporting, and genuine partnership. You'll always understand what we're doing and what results to expect."
              },
              {
                icon: <Lightbulb className="h-8 w-8 text-soft-gold" />,
                title: "Future-Proof Strategies",
                description: "Our strategies are designed for both current AI platforms and emerging technologies, ensuring your optimization investment delivers long-term value."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-navy mb-2">{item.title}</h3>
                <p className="body-text">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-coral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-4">
            Ready to Transform Your Digital Presence for the AI Future?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Choose the AI-Readiness service level that matches your needs and start your transformation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
            <Button size="lg" variant="secondary" className="bg-white text-coral hover:bg-gray-100">
              Schedule Your AI-Readiness Consultation
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