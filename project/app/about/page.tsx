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
  Users,
  Target,
  Lightbulb,
  Award,
  Building,
  Mail,
  Menu,
  X,
  Linkedin,
  Twitter
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const values = [
    {
      icon: <Lightbulb className="h-8 w-8 text-soft-gold" />,
      title: "Innovation First",
      description: "We believe in leading rather than following when it comes to AI-Readiness optimization. Our team continuously researches emerging AI platforms and develops innovative strategies that keep our clients ahead of the competition."
    },
    {
      icon: <Users className="h-8 w-8 text-coral" />,
      title: "Client Success Above All",
      description: "We measure our success by the results our clients achieve, not by the services we sell. Every strategy we recommend is designed to deliver measurable business results that justify your investment in AI-Readiness optimization."
    },
    {
      icon: <Shield className="h-8 w-8 text-deep-teal" />,
      title: "Transparency in Everything",
      description: "We believe that effective partnerships require complete transparency in communication, strategy development, and results reporting. Our clients always understand what we're doing, why we're doing it, and what results they can expect."
    },
    {
      icon: <Target className="h-8 w-8 text-coral" />,
      title: "Results-Driven",
      description: "We focus exclusively on optimization strategies that deliver measurable business results. Every recommendation we make is based on proven techniques that have delivered results for businesses across industries."
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Founder",
      bio: "Former Head of SEO at Google, Sarah brings 15+ years of search engine optimization expertise and AI research to Verbost.",
      expertise: ["AI Strategy", "Technical SEO", "Business Development"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Technology Officer",
      bio: "AI researcher and software architect with experience at Microsoft and OpenAI, leading our technical innovation and product development.",
      expertise: ["AI/ML", "Software Architecture", "Product Development"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Emily Johnson",
      role: "Head of Strategy",
      bio: "Content marketing expert with 12+ years at leading agencies, specializing in AI-optimized content strategies and customer experience design.",
      expertise: ["Content Strategy", "UX Design", "Digital Marketing"],
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "David Park",
      role: "Lead Data Scientist",
      bio: "PhD in Machine Learning from Stanford, David develops our AI assessment algorithms and predictive analytics capabilities.",
      expertise: ["Machine Learning", "Data Analysis", "Algorithm Development"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    }
  ];

  const achievements = [
    {
      icon: <Award className="h-8 w-8 text-soft-gold" />,
      title: "AI Optimization Leadership",
      description: "Recognized as innovation leaders in AI-Readiness optimization, with our methodologies being adopted by businesses across industries"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-deep-teal" />,
      title: "Client Success Metrics",
      description: "Our clients achieve 150% improvement in AI platform visibility on average, with many experiencing even more dramatic results"
    },
    {
      icon: <Users className="h-8 w-8 text-coral" />,
      title: "Global Impact and Reach",
      description: "Our AI-Readiness optimization strategies have helped businesses in over 25 countries optimize their digital presence for AI platforms"
    },
    {
      icon: <Globe className="h-8 w-8 text-deep-teal" />,
      title: "Innovation and Technology Development",
      description: "Our team has developed proprietary tools and methodologies for AI-Readiness assessment that deliver superior results"
    }
  ];

  const differentiators = [
    {
      title: "AI-First Approach",
      description: "While other agencies treat AI optimization as one service among many, we've built our entire organization around AI-Readiness specialization. This exclusive focus enables us to stay at the forefront of AI platform developments."
    },
    {
      title: "Proven Methodology with Consistent Results",
      description: "Our AI-Readiness optimization methodology has been refined through hundreds of successful implementations across diverse industries and business sizes, ensuring consistent results."
    },
    {
      title: "Dedicated Support and Strategic Partnership",
      description: "We believe in building long-term partnerships with our clients rather than providing one-time services. Our approach emphasizes ongoing support and strategic guidance."
    },
    {
      title: "Future-Proof Strategies and Continuous Innovation",
      description: "The AI landscape evolves rapidly, and our future-proof approach ensures that your AI-Readiness optimization remains effective despite technological change and platform evolution."
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
                <Link href="/services" className="text-navy/70 hover:text-coral px-3 py-2 text-sm font-medium transition-colors">
                  Services
                </Link>
                <Link href="/assessment" className="text-navy/70 hover:text-coral px-3 py-2 text-sm font-medium transition-colors">
                  AI-Readiness Assessment
                </Link>
                <Link href="/about" className="text-coral px-3 py-2 text-sm font-medium">
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
                className="text-navy/70 hover:text-coral block px-3 py-2 text-base font-medium transition-colors"
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
                className="text-coral block px-3 py-2 text-base font-medium"
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
              About Verbost
            </Badge>
            <h1 className="mb-6">
              The Agency Built for the{' '}
              <span className="text-coral">AI Future</span>
            </h1>
            <p className="body-text mb-8 max-w-3xl mx-auto">
              We're pioneers in AI-driven website optimization, helping businesses thrive in both traditional search engines and emerging AI platforms. Our team combines deep technical expertise with practical business experience to deliver AI-Readiness solutions that create lasting competitive advantages.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              Our Mission
            </h2>
            <p className="text-2xl text-navy/70 max-w-4xl mx-auto leading-relaxed">
              "To empower businesses with the tools, strategies, and insights they need to optimize their digital presence for the AI future, ensuring sustained growth and competitive advantage in the rapidly evolving landscape of AI-driven search and discovery."
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-navy mb-4">Why We Started Verbost</h3>
              <p className="body-text mb-4">
                The digital landscape is undergoing its most significant transformation since the advent of the internet itself. Artificial intelligence is reshaping how customers discover businesses, how search engines evaluate content, and how digital platforms determine relevance and authority.
              </p>
              <p className="body-text mb-4">
                We founded Verbost because we recognized that businesses need specialized expertise to navigate this transformation successfully. While other agencies continue to focus on yesterday's optimization techniques, we've dedicated ourselves exclusively to understanding and mastering the AI-driven future of digital discovery.
              </p>
              <p className="body-text">
                Our exclusive focus on AI-Readiness optimization ensures that our clients stay ahead of the curve, maintaining competitive advantage as the digital ecosystem continues to evolve toward AI-powered discovery and recommendation systems.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-coral/5 to-deep-teal/5 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-coral mb-2">2M+</div>
                  <div className="secondary-text">Webpages Optimized</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-deep-teal mb-2">1,500+</div>
                  <div className="secondary-text">Data Points Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-soft-gold mb-2">98%</div>
                  <div className="secondary-text">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-coral mb-2">25+</div>
                  <div className="secondary-text">Countries Served</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              The Principles That Guide Everything We Do
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              Our values shape how we work with clients, develop strategies, and deliver results. These principles ensure that every interaction with Verbost reflects our commitment to excellence, transparency, and genuine partnership.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4">{value.icon}</div>
                  <CardTitle className="text-lg text-navy">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="body-text">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              Who We Are
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              Industry Experts and AI Pioneers Dedicated to Your Success
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="body-text mb-6">
                Our team brings together decades of combined experience in digital optimization, AI technology, and business strategy. We've worked with businesses ranging from innovative startups to established enterprises, giving us unique insight into the challenges and opportunities that characterize different business sizes and industries.
              </p>
              <p className="body-text">
                What sets our team apart is our exclusive focus on AI-Readiness optimization and our commitment to staying at the forefront of AI platform developments. While other agencies spread their attention across multiple services, our team dedicates 100% of their time to understanding AI platforms, developing optimization strategies, and delivering results that create lasting competitive advantages for our clients.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="card">
                <CardHeader>
                  <CardTitle className="text-lg text-navy flex items-center">
                    <Lightbulb className="h-6 w-6 text-coral mr-2" />
                    Startup Innovation and Agility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="body-text">
                    Our team has extensive experience working with innovative startups that need to establish market presence quickly and efficiently. This startup experience has taught us the importance of agility, efficiency, and results-focused optimization that delivers maximum impact with minimal resource investment.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card">
                <CardHeader>
                  <CardTitle className="text-lg text-navy flex items-center">
                    <TrendingUp className="h-6 w-6 text-deep-teal mr-2" />
                    SMB Growth and Scalability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="body-text">
                    Small and medium-sized businesses represent the backbone of the economy, and our team has deep experience helping SMBs navigate the complexities of digital optimization while managing the practical constraints of limited budgets and resources.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card">
                <CardHeader>
                  <CardTitle className="text-lg text-navy flex items-center">
                    <Users className="h-6 w-6 text-soft-gold mr-2" />
                    Enterprise Scale and Complexity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="body-text">
                    Enterprise organizations face unique challenges in AI-Readiness optimization, including complex technical environments and multiple stakeholder requirements. Our enterprise experience has taught us the importance of strategic planning and systematic implementation.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card">
                <CardHeader>
                  <CardTitle className="text-lg text-navy flex items-center">
                    <Shield className="h-6 w-6 text-coral mr-2" />
                    Technical Expertise and Innovation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="body-text">
                    Our team combines deep technical expertise in AI platform optimization with practical business experience that ensures all strategies are both technically sophisticated and practically implementable.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              Recognition and Results That Demonstrate Our Commitment to Excellence
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              Our success is measured by the results we deliver for our clients and the recognition we receive from the industry for our innovative approaches to AI-Readiness optimization.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {achievement.icon}
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">{achievement.title}</h3>
                <p className="body-text">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              Why Choose Verbost for Your AI-Readiness Journey?
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              Choosing the right partner for AI-Readiness optimization is crucial for your business success in the AI-driven digital landscape. Our unique combination of exclusive specialization, proven results, and comprehensive expertise makes us the ideal partner.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map((differentiator, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-coral rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy mb-2">{differentiator.title}</h3>
                  <p className="body-text">{differentiator.description}</p>
                </div>
              </div>
            ))}
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