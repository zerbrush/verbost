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
  X,
  Building
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
              Strategic Consulting
            </Badge>
            <h1 className="mb-6">
              AI-Readiness Website Transformation
            </h1>
            <p className="body-text mb-8 max-w-3xl mx-auto">
              Strategic partnership for sustainable competitive advantage in the post-search economy
            </p>
            <Button size="lg" className="btn-primary">
              <Link href="/contact">
                Schedule Strategic Consultation
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
              Strategic AI-Readiness Services
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              Bespoke strategic solutions designed for your industry, competitive environment, and transformation objectives.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Service 1 */}
            <Card className="card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-coral/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-coral" />
                  </div>
                  <CardTitle className="text-xl text-navy">Strategic AI-Readiness Assessment</CardTitle>
                  <p className="text-coral font-medium mt-2">Comprehensive strategic analysis and website transformation roadmap</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="body-text mb-4">
                  Custom strategic assessment, competitive analysis, and transformation roadmap development based on our proprietary AI-Readiness Framework.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Proprietary five-dimension AI-readiness evaluation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Competitive intelligence and market positioning analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Strategic transformation roadmap development</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Executive stakeholder presentation and guidance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Research-backed strategic recommendations</span>
                  </li>
                </ul>
                <div className="text-center mb-4">
                  <p className="text-navy/60 text-sm">Investment varies based on scope and strategic objectives</p>
                </div>
                <Link href="/contact">
                <Button className="w-full btn-primary">
                    Schedule Strategic Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Service 2 */}
            <Card className="card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-deep-teal/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-deep-teal" />
                  </div>
                  <CardTitle className="text-xl text-navy">Competitive Intelligence & Positioning</CardTitle>
                  <p className="text-deep-teal font-medium mt-2">Strategic market positioning for AI transformation leadership</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="body-text mb-4">
                  Competitive advantage development, market positioning analysis, and strategic guidance for AI transformation leadership.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Comprehensive competitive landscape analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Strategic market positioning development</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">AI transformation leadership strategy</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Competitive advantage identification and development</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Strategic guidance for sustainable market leadership</span>
                  </li>
                </ul>
                <div className="text-center mb-4">
                  <p className="text-navy/60 text-sm">Investment varies based on scope and strategic objectives</p>
                </div>
                <Link href="/contact">
                <Button className="w-full btn-secondary">
                  Discuss Strategic Positioning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            {/* Service 3 */}
            <Card className="card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-soft-gold/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Settings className="h-8 w-8 text-soft-gold" />
                  </div>
                  <CardTitle className="text-xl text-navy">Technical Implementation Strategy</CardTitle>
                  <p className="text-soft-gold font-medium mt-2">Dual-audience website optimization and technical transformation</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="body-text mb-4">
                  Technical architecture optimization, implementation guidance, and performance enhancement for dual-audience effectiveness.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Dual-audience technical architecture design</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Technical optimization that ensures AI agents can effectively understand your business</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Performance optimization for machine accessibility</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Implementation partnership and ongoing technical guidance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Continuous performance monitoring and optimization</span>
                  </li>
                </ul>
                <div className="text-center mb-4">
                  <p className="text-navy/60 text-sm">Investment varies based on scope and strategic objectives</p>
                </div>
                <Link href="/contact">
                <Button className="w-full btn-primary">
                  Schedule Technical Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Service 4 */}
            <Card className="card hover:shadow-lg transition-shadow border-2 border-coral/20 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-coral text-white">Strategic Partnership</Badge>
              </div>
              <CardHeader>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-coral/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-coral" />
                  </div>
                  <CardTitle className="text-xl text-navy">Strategic Partnership Program</CardTitle>
                  <p className="text-coral font-medium mt-2">Long-term strategic advisory and website repositioning partnership</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="body-text mb-4">
                  Executive advisory, continuous optimization, and strategic guidance for sustained competitive advantage in the AI-driven future.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Executive-level strategic advisory relationship</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Continuous competitive advantage development</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Priority access to proprietary research and frameworks</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Ongoing strategic optimization and market intelligence</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy/70">Long-term partnership for sustained competitive advantage</span>
                  </li>
                </ul>
                <div className="text-center mb-4">
                  <p className="text-navy/60 text-sm">Investment varies based on scope and strategic objectives</p>
                </div>
                <Link href="/contact">
                <Button className="w-full btn-primary">
                  Explore Partnership Options
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          
          {/* Enterprise Callout */}
          <div className="mt-12">
            <Card className="card border-2 border-deep-teal/20 bg-gradient-to-br from-deep-teal/5 to-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-deep-teal/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-deep-teal" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4">Executive Advisory & Strategic Partnership</h3>
                <p className="body-text mb-6 max-w-2xl mx-auto">
                  For organizations committed to AI transformation leadership, we provide executive-level strategic advisory and long-term partnership relationships that deliver sustained competitive advantage.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button className="bg-deep-teal text-white hover:bg-deep-teal/90">
                      Schedule Executive Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Research-Backed Expertise */}
      <section className="py-16 bg-gradient-to-br from-coral/5 via-white to-deep-teal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 badge-coral">
              Research-Backed Expertise
            </Badge>
            <h2 className="mb-4">
              Proprietary Frameworks Based on Comprehensive Research
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              Our website strategies are based on extensive research and proprietary frameworks developed through comprehensive analysis of AI transformation dynamics and competitive positioning requirements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="text-center">
              <div className="w-16 h-16 bg-deep-teal/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-deep-teal" />
              </div>
              <h3 className="text-lg font-semibold text-navy mb-2">Proprietary Assessment Framework</h3>
              <p className="text-sm text-navy/70">Five-dimension evaluation methodology</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-soft-gold/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-soft-gold" />
              </div>
              <h3 className="text-lg font-semibold text-navy mb-2">Dual-Audience Optimization</h3>
              <p className="text-sm text-navy/70">Exclusive methodology for serving humans and AI</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-coral/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-coral" />
              </div>
              <h3 className="text-lg font-semibold text-navy mb-2">Research-Backed Intelligence</h3>
              <p className="text-sm text-navy/70">Competitive intelligence and market analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              Strategic Partnership Process
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              Our streamlined strategic partnership approach ensures comprehensive transformation and sustained competitive advantage development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Strategic Discovery",
                description: "Understanding your competitive environment and transformation objectives through comprehensive strategic analysis."
              },
              {
                step: "02", 
                title: "Bespoke Strategy Development",
                description: "Custom website solutions designed for your specific business challenges and competitive positioning requirements."
              },
              {
                step: "03",
                title: "Implementation Partnership", 
                description: "Strategic guidance and support throughout transformation with ongoing consultation and optimization."
              },
              {
                step: "04",
                title: "Ongoing Strategic Advisory",
                description: "Continuous optimization and competitive advantage development through long-term strategic partnership."
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
              Strategic Partnership Advantages
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              Our unique combination of exclusive specialization, proprietary research, and strategic partnership approach delivers sustained competitive advantage.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-8 w-8 text-coral" />,
                title: "Strategic Partnership Approach",
                description: "Long-term strategic relationships, not project-based vendor services. We become your dedicated website AI transformation partner."
              },
              {
                icon: <FileText className="h-8 w-8 text-deep-teal" />,
                title: "Proprietary Research & Frameworks", 
                description: "Access to exclusive AI-readiness methodologies and research insights unavailable elsewhere in the market."
              },
              {
                icon: <Target className="h-8 w-8 text-soft-gold" />,
                title: "Bespoke Solution Architecture",
                description: "Custom website strategies designed for your specific competitive environment and business transformation objectives."
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-coral" />,
                title: "Business Outcome Focus",
                description: "Competitive advantage development and strategic positioning, not just technical deliverables or optimization metrics."
              },
              {
                icon: <Shield className="h-8 w-8 text-deep-teal" />,
                title: "Research-Backed Methodologies",
                description: "All strategies based on comprehensive research, emerging technology and trends, and proprietary competitive intelligence."
              },
              {
                icon: <Lightbulb className="h-8 w-8 text-soft-gold" />,
                title: "Exclusive AI-Readiness Specialization",
                description: "Unlike agencies that offer multiple services, we concentrate exclusively on AI-readiness transformation and strategic positioning."
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