'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Calendar,
  Download,
  HelpCircle,
  Headphones,
  Zap,
  ArrowRight,
  Menu,
  X,
  Globe,
  Shield
} from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    website: '',
    message: ''
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }
      
      setSuccess(result.message || 'Thank you for your message! We\'ll be in touch within 24 hours.');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        website: '',
        message: ''
      });
      
    } catch (err: any) {
      console.error('Contact form error:', err);
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-coral" />,
      title: "Email Us",
      description: "Get in touch via email",
      contact: "hello@verbost.ai",
      action: "Send Email"
    },
    {
      icon: <Clock className="h-6 w-6 text-coral" />,
      title: "Office Hours",
      description: "When we're available",
      contact: "Mon-Fri: 9AM-6PM EST",
      action: "Schedule Call"
    }
  ];

  const faqs = [
    {
      question: "How long does a website assessment take?",
      answer: "Our standard assessment takes 24-48 hours to complete. For larger websites or enterprise clients, it may take 3-5 business days. We'll provide you with a detailed timeline when you submit your project, and we always deliver comprehensive results that justify the investment in thorough analysis."
    },
    {
      question: "Do you offer ongoing monitoring services?",
      answer: "Yes, we provide 24/7 monitoring services with real-time alerts and monthly reports. Our monitoring includes performance tracking, competitive analysis, and strategic recommendations to ensure your AI-Readiness optimization continues to deliver results."
    },
    {
      question: "What makes your AI optimization different?",
      answer: "Our proprietary algorithms are specifically designed for AI-powered search engines and content discovery platforms, not just traditional SEO. We focus exclusively on AI-Readiness optimization, which means our strategies are designed specifically for the platforms and technologies that are reshaping digital discovery."
    },
    {
      question: "Can you help with international SEO?",
      answer: "Absolutely! We work with businesses in 25+ countries and understand the nuances of international AI optimization. Our strategies account for different languages, cultural contexts, and regional AI platform variations."
    },
    {
      question: "Do you provide training for our team?",
      answer: "Yes, we offer comprehensive training programs and workshops to help your team understand and implement AI-Readiness optimization strategies. Our training includes hands-on workshops, documentation, and ongoing support that builds internal capabilities."
    },
    {
      question: "What's included in your ongoing support?",
      answer: "Our support includes 24/7 monitoring, monthly reports, strategy updates, priority email support, and quarterly strategy calls. We provide comprehensive guidance for maintaining and enhancing your AI-Readiness performance."
    }
  ];

  const leadMagnets = [
    {
      title: "Free Website Assessment",
      description: "Get a comprehensive analysis of your website's AI readiness and optimization opportunities.",
      icon: <Globe className="h-8 w-8 text-coral" />,
      cta: "Start Assessment"
    },
    {
      title: "Schedule Consultation",
      description: "Book a 30-minute strategy call with our experts to discuss your specific needs and goals.",
      icon: <Calendar className="h-8 w-8 text-deep-teal" />,
      cta: "Book Call"
    },
    {
      title: "AI Optimization Guide",
      description: "Download our comprehensive guide to preparing your website for AI-powered search engines.",
      icon: <Shield className="h-8 w-8 text-soft-gold" />,
      cta: "Download Guide"
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
                <Link href="/about" className="text-navy/70 hover:text-coral px-3 py-2 text-sm font-medium transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-coral px-3 py-2 text-sm font-medium">
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
                className="text-navy/70 hover:text-coral block px-3 py-2 text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-coral block px-3 py-2 text-base font-medium"
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
              Get In Touch
            </Badge>
            <h1 className="mb-6">
              Let's Optimize Your Website for the{' '}
              <span className="text-coral">AI Future</span>
            </h1>
            <p className="body-text mb-8 max-w-3xl mx-auto">
              Ready to transform your digital presence? Our experts are here to help you succeed in the AI-driven landscape. Get started with a free consultation and discover how AI-Readiness optimization can transform your business.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Lead Magnets */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Contact Form */}
            <div className="w-full">
              <h2 className="mb-6">
                Send Us a Message
              </h2>
              <Card className="card">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-navy mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="border-gray-300 focus:border-coral focus:ring-coral"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="border-gray-300 focus:border-coral focus:ring-coral"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-navy mb-2">
                          Company
                        </label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company"
                          className="border-gray-300 focus:border-coral focus:ring-coral"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-navy mb-2">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                          className="border-gray-300 focus:border-coral focus:ring-coral"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-navy mb-2">
                        Website URL
                      </label>
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://yourwebsite.com"
                        className="border-gray-300 focus:border-coral focus:ring-coral"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-navy mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project and how we can help..."
                        className="border-gray-300 focus:border-coral focus:ring-coral"
                      />
                    </div>
                    
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-sm">{error}</p>
                      </div>
                    )}
                    
                    {success && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-700 text-sm">{success}</p>
                      </div>
                    )}
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full btn-primary"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              Frequently Asked Questions
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              Get answers to common questions about our services and process
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-start text-navy">
                    <HelpCircle className="h-5 w-5 text-coral mr-2 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="body-text ml-7">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-coral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Don't let your competitors get ahead. Start optimizing your website for the AI future today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment">
              <Button size="lg" variant="secondary" className="bg-white text-coral hover:bg-gray-100">
                Free AI-Readiness Assessment
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
              <div className="flex items-center space-x-2 text-white/70">
                <Headphones className="h-4 w-4" />
              </div>
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