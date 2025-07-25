'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Zap, 
  Shield,
  Mail,
  Globe,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              Legal Information
            </Badge>
            <h1 className="mb-6">
              Privacy Policy
            </h1>
            <p className="body-text mb-8 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-navy/60">
              Last updated: January 19, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">1. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-navy mb-3">Personal Information</h3>
                <p className="body-text mb-4">
                  We collect information you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Name and email address when you request an assessment</li>
                  <li>Contact information when you fill out forms</li>
                  <li>Website URL and business information for assessments</li>
                  <li>Communication preferences and feedback</li>
                </ul>

                <h3 className="text-xl font-semibold text-navy mb-3">Automatically Collected Information</h3>
                <p className="body-text mb-4">
                  When you visit our website, we automatically collect:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>IP address and browser information</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website information</li>
                  <li>Device and operating system information</li>
                </ul>

                <h3 className="text-xl font-semibold text-navy mb-3">Website Assessment Data</h3>
                <p className="body-text mb-4">
                  For our AI-readiness assessments, we analyze:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Publicly available website content and structure</li>
                  <li>Technical performance metrics</li>
                  <li>SEO and optimization factors</li>
                  <li>Content quality and AI compatibility</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">2. How We Use Your Information</h2>
                
                <p className="body-text mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Provide and improve our AI-readiness assessment services</li>
                  <li>Send you assessment reports and recommendations</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send you relevant updates about our services (with your consent)</li>
                  <li>Analyze and improve our website and services</li>
                  <li>Comply with legal obligations and protect our rights</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">3. Information Sharing and Disclosure</h2>
                
                <p className="body-text mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>Service Providers:</strong> With trusted third-party services that help us operate our business (email delivery, analytics, hosting)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">4. Data Security</h2>
                
                <p className="body-text mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information, including:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication measures</li>
                  <li>Secure hosting and database management</li>
                </ul>
                
                <p className="body-text">
                  While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but are committed to protecting your data using industry best practices.
                </p>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">5. Your Rights and Choices</h2>
                
                <p className="body-text mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                  <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
                </ul>
                
                <p className="body-text">
                  To exercise these rights, please contact us at <a href="mailto:privacy@verbost.ai" className="text-coral hover:underline">privacy@verbost.ai</a>.
                </p>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">6. Cookies and Tracking Technologies</h2>
                
                <p className="body-text mb-4">
                  We use cookies and similar technologies to enhance your experience on our website. For detailed information about our use of cookies, please see our <Link href="/cookie-policy" className="text-coral hover:underline">Cookie Policy</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">7. Data Retention</h2>
                
                <p className="body-text mb-4">
                  We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Specifically:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Assessment data: Retained for 2 years for service improvement and support</li>
                  <li>Contact information: Retained until you request deletion or opt-out</li>
                  <li>Website analytics: Aggregated data retained indefinitely for business insights</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">8. International Data Transfers</h2>
                
                <p className="body-text mb-4">
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with applicable privacy laws.
                </p>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">9. Children's Privacy</h2>
                
                <p className="body-text mb-4">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
                </p>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">10. Changes to This Policy</h2>
                
                <p className="body-text mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
                </p>
              </CardContent>
            </Card>

            <Card className="card">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">11. Contact Us</h2>
                
                <p className="body-text mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> <a href="mailto:privacy@verbost.ai" className="text-coral hover:underline">privacy@verbost.ai</a></p>
                  <p><strong>General Contact:</strong> <a href="mailto:hello@verbost.ai" className="text-coral hover:underline">hello@verbost.ai</a></p>
                  <p><strong>Address:</strong> Verbost, Atlanta, GA</p>
                </div>
              </CardContent>
            </Card>
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