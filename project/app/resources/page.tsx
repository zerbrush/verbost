'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowRight, 
  Zap, 
  Search, 
  FileText, 
  Download, 
  Calendar, 
  User, 
  Clock,
  Filter,
  ChevronRight,
  BookOpen,
  Video,
  Headphones,
  Globe,
  TrendingUp,
  Mail,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Resources', count: 24 },
    { id: 'ai-seo', label: 'AI & SEO', count: 8 },
    { id: 'optimization', label: 'Website Optimization', count: 6 },
    { id: 'content', label: 'Content Strategy', count: 5 },
    { id: 'insights', label: 'Industry Insights', count: 5 }
  ];

  const featuredArticles = [
    {
      id: 1,
      title: "The Complete Guide to AI-Driven SEO in 2024",
      excerpt: "Discover how AI is revolutionizing search engine optimization and what businesses need to do to maintain visibility in AI-powered search results.",
      author: "Verbost AI Team",
      date: "March 15, 2024",
      readTime: "15 min read",
      category: "ai-seo",
      categoryLabel: "AI SEO Guides",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      featured: true
    },
    {
      id: 2,
      title: "Understanding Voice Search: The Future of Content Discovery",
      excerpt: "Voice search is rapidly becoming the preferred method for finding information online, and businesses need to optimize their content for conversational queries.",
      author: "Verbost AI Team",
      date: "March 8, 2024",
      readTime: "12 min read",
      category: "voice-search",
      categoryLabel: "Voice Search Optimization",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      featured: true
    },
    {
      id: 3,
      title: "5 Essential Website Optimization Strategies for 2024",
      excerpt: "The digital landscape continues to evolve, and businesses need optimization strategies that work across traditional search engines and emerging AI platforms.",
      author: "Verbost AI Team",
      date: "February 28, 2024",
      readTime: "10 min read",
      category: "technical",
      categoryLabel: "Technical Implementation",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      featured: true
    }
  ];

  const articles = [
    {
      id: 4,
      title: "How to Optimize Your Content for AI Search Engines",
      excerpt: "A comprehensive guide to creating content that performs well in AI-powered search platforms. Learn the specific techniques and strategies that ensure your content is discovered by AI systems.",
      author: "Verbost AI Team",
      date: "March 20, 2024",
      readTime: "8 min read",
      category: "content",
      categoryLabel: "Content Strategy"
    },
    {
      id: 5,
      title: "The Impact of Core Web Vitals on AI Rankings",
      excerpt: "Understanding how page performance metrics affect your visibility in AI-powered search results. Discover the technical optimizations that improve both user experience and AI platform recognition.",
      author: "Verbost AI Team",
      date: "March 18, 2024",
      readTime: "6 min read",
      category: "ai-seo",
      categoryLabel: "Technical Implementation"
    },
    {
      id: 6,
      title: "Building Trust Signals for AI-Powered Platforms",
      excerpt: "Learn how to establish credibility and trust signals that AI platforms recognize and value. Discover the specific elements that influence AI platform recommendations.",
      author: "Verbost AI Team",
      date: "March 12, 2024",
      readTime: "7 min read",
      category: "content",
      categoryLabel: "AI SEO Guides"
    },
    {
      id: 7,
      title: "Technical SEO Best Practices for 2024",
      excerpt: "Stay ahead with the latest technical SEO strategies that work for both traditional search engines and AI platforms. Learn the implementation techniques that deliver measurable improvements.",
      author: "Verbost AI Team",
      date: "March 5, 2024",
      readTime: "9 min read",
      category: "technical",
      categoryLabel: "Technical Implementation"
    },
    {
      id: 8,
      title: "The Future of Voice Search and AI Assistants",
      excerpt: "Exploring how voice search is evolving and what it means for your content strategy. Understand the trends that will shape voice search optimization.",
      author: "Verbost AI Team",
      date: "February 25, 2024",
      readTime: "11 min read",
      category: "insights",
      categoryLabel: "Industry Insights"
    }
  ];

  const whitepapers = [
    {
      title: "AI-Readiness Optimization Checklist: A Complete Methodology",
      description: "A comprehensive 50-point checklist covering every aspect of AI-Readiness optimization with step-by-step implementation guidance.",
      pages: 24,
      downloadCount: "3.2k",
      category: "Strategy Guide"
    },
    {
      title: "Voice Search SEO: 2024 Industry Report",
      description: "Data-driven insights into the voice search landscape, including usage statistics, optimization opportunities, and strategic recommendations.",
      pages: 18,
      downloadCount: "1.8k",
      category: "Industry Report"
    },
    {
      title: "Content Optimization Checklist for AI Platforms",
      description: "A practical 35-point checklist for optimizing your content for AI platform compatibility with specific techniques and implementation strategies.",
      pages: 12,
      downloadCount: "2.7k",
      category: "Checklist"
    }
  ];

  const webinars = [
    {
      title: "Preparing Your Website for the AI Future",
      description: "Join our experts for a comprehensive overview of AI-Readiness optimization, including practical strategies for improving your website's compatibility with AI platforms.",
      date: "April 15, 2024",
      duration: "45 minutes",
      attendees: "750+",
      status: "upcoming"
    },
    {
      title: "Advanced Schema Markup for AI Optimization",
      description: "Learn advanced structured data implementation techniques that enhance AI platform understanding and improve your visibility in AI-powered search results.",
      date: "April 22, 2024",
      duration: "60 minutes",
      attendees: "450+",
      status: "upcoming"
    },
    {
      title: "AI-Driven Content Strategy Masterclass",
      description: "Discover how to create content that excels in AI-powered discovery platforms. Learn the specific techniques and strategies that ensure your content is found by AI systems.",
      date: "April 29, 2024",
      duration: "90 minutes",
      attendees: "600+",
      status: "upcoming"
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
                <Link href="/resources" className="text-coral px-3 py-2 text-sm font-medium">
                  Resources
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
                className="text-navy/70 hover:text-coral block px-3 py-2 text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/resources" 
                className="text-coral block px-3 py-2 text-base font-medium"
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
              Knowledge Center
            </Badge>
            <h1 className="mb-6">
              AI-Readiness Resources & Insights
            </h1>
            <p className="body-text mb-8 max-w-3xl mx-auto">
              Stay ahead of the curve with our comprehensive collection of guides, insights, and tools for AI-driven website optimization. Access expert knowledge that helps you navigate the rapidly evolving landscape of AI-powered search and discovery.
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search AI-Readiness resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-coral focus:ring-coral"
                  />
                </div>
                <Button variant="outline" className="btn-outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`text-sm ${selectedCategory === category.id ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {category.label} ({category.count})
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              Featured AI-Readiness Content
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              Our most popular and impactful content to help you optimize for the AI future. These comprehensive resources provide deep insights into AI-Readiness optimization strategies.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="card hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-coral border-coral/20">
                      {article.categoryLabel}
                    </Badge>
                    <div className="flex items-center text-sm text-navy/50">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg hover:text-coral transition-colors text-navy">
                    <Link href={`/resources/${article.id}`}>
                      {article.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="body-text">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-navy/50">
                      <User className="h-4 w-4 mr-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center text-sm text-navy/50">
                      <Calendar className="h-4 w-4 mr-1" />
                      {article.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              Latest AI-Readiness Insights
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              Stay updated with the latest insights, strategies, and industry developments in AI-driven website optimization.
            </p>
          </div>
          
          <div className="space-y-6">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="card hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Badge variant="outline" className="text-coral border-coral/20 mr-3">
                          {article.categoryLabel}
                        </Badge>
                        <div className="flex items-center text-sm text-navy/50">
                          <Clock className="h-4 w-4 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-navy mb-2 hover:text-coral transition-colors">
                        <Link href={`/resources/${article.id}`}>
                          {article.title}
                        </Link>
                      </h3>
                      <p className="body-text mb-4">{article.excerpt}</p>
                      <div className="flex items-center text-sm text-navy/50">
                        <User className="h-4 w-4 mr-1" />
                        {article.author}
                        <span className="mx-2">•</span>
                        <Calendar className="h-4 w-4 mr-1" />
                        {article.date}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 ml-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              Downloadable AI-Readiness Resources
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              In-depth guides, reports, and tools to help you implement AI-driven optimization strategies. These comprehensive resources provide detailed implementation guidance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {whitepapers.map((paper, index) => (
              <Card key={index} className="card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-deep-teal border-deep-teal/20">
                      {paper.category}
                    </Badge>
                    <div className="flex items-center text-sm text-navy/50">
                      <FileText className="h-4 w-4 mr-1" />
                      {paper.pages} pages
                    </div>
                  </div>
                  <CardTitle className="text-lg text-navy">{paper.title}</CardTitle>
                  <CardDescription className="body-text">
                    {paper.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-navy/50">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {paper.downloadCount} downloads
                    </div>
                    <Button size="sm" className="btn-primary">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Webinars */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              Webinars & Workshops
            </h2>
            <p className="body-text max-w-3xl mx-auto">
              Learn from our experts through live and recorded sessions covering the latest AI-Readiness optimization strategies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {webinars.map((webinar, index) => (
              <Card key={index} className="card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge 
                      variant="outline" 
                      className={webinar.status === 'upcoming' ? 'text-coral border-coral/20' : 'text-deep-teal border-deep-teal/20'}
                    >
                      {webinar.status === 'upcoming' ? 'Upcoming' : 'Recorded'}
                    </Badge>
                    <div className="flex items-center text-sm text-navy/50">
                      <Video className="h-4 w-4 mr-1" />
                      {webinar.duration}
                    </div>
                  </div>
                  <CardTitle className="text-lg text-navy">{webinar.title}</CardTitle>
                  <CardDescription className="body-text">
                    {webinar.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-navy/50">
                      <Calendar className="h-4 w-4 mr-1" />
                      {webinar.date}
                    </div>
                    <div className="flex items-center text-sm text-navy/50">
                      <Headphones className="h-4 w-4 mr-1" />
                      {webinar.attendees} attendees
                    </div>
                  </div>
                  <Button className={`w-full ${webinar.status === 'upcoming' ? 'btn-primary' : 'btn-outline'}`}>
                    {webinar.status === 'upcoming' ? 'Register Now' : 'Watch Recording'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-coral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-4">
            Stay Updated with Our Newsletter
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Get the latest AI-Readiness insights, tips, and industry updates delivered directly to your inbox
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white border-white focus:border-white focus:ring-white"
              />
              <Button variant="secondary" className="bg-white text-coral hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
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