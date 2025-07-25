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

export default function TermsOfServicePage() {
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
              Terms of Service
            </h1>
            <p className="body-text mb-8 max-w-3xl mx-auto">
              These terms govern your use of our services. Please read them carefully.
            </p>
            <p className="text-sm text-navy/60">
              Last updated: January 19, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">1. Acceptance of Terms</h2>
                
                <p className="body-text mb-4">
                  By accessing or using Verbost's website and services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.
                </p>
                
                <p className="body-text">
                  These Terms apply to all visitors, users, and others who access or use our services, including our AI-readiness assessment tools, consulting services, and website optimization services.
                </p>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">2. Description of Services</h2>
                
                <p className="body-text mb-4">
                  Verbost provides AI-readiness optimization services, including:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Website AI-readiness assessments and audits</li>
                  <li>AI optimization consulting and strategy development</li>
                  <li>Technical implementation and optimization services</li>
                  <li>Ongoing monitoring and performance tracking</li>
                  <li>Educational resources and training materials</li>
                </ul>
                
                <p className="body-text">
                  We reserve the right to modify, suspend, or discontinue any aspect of our services at any time with reasonable notice.
                </p>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">3. User Responsibilities</h2>
                
                <h3 className="text-xl font-semibold text-navy mb-3">Account Information</h3>
                <p className="body-text mb-4">
                  You are responsible for providing accurate and complete information when using our services. You must promptly update any information that becomes inaccurate or incomplete.
                </p>

                <h3 className="text-xl font-semibold text-navy mb-3">Prohibited Uses</h3>
                <p className="body-text mb-4">
                  You agree not to use our services to:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit harmful, offensive, or inappropriate content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt our services</li>
                  <li>Use our services for competitive intelligence against us</li>
                </ul>

                <h3 className="text-xl font-semibold text-navy mb-3">Website Access</h3>
                <p className="body-text">
                  For assessment services, you must own or have authorization to analyze the websites you submit. You are responsible for ensuring compliance with all applicable terms of service and privacy policies.
                </p>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">4. Payment Terms</h2>
                
                <h3 className="text-xl font-semibold text-navy mb-3">Fees and Billing</h3>
                <p className="body-text mb-4">
                  Fees for our services are as specified in our service agreements or as quoted. All fees are non-refundable unless otherwise specified in writing.
                </p>

                <h3 className="text-xl font-semibold text-navy mb-3">Payment Processing</h3>
                <p className="body-text mb-4">
                  Payments are processed through secure third-party payment processors. You agree to provide accurate payment information and authorize us to charge the specified amounts.
                </p>

                <h3 className="text-xl font-semibold text-navy mb-3">Late Payments</h3>
                <p className="body-text">
                  Late payments may result in suspension of services and may incur additional fees. We reserve the right to use collection agencies or legal action to recover unpaid amounts.
                </p>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">5. Intellectual Property</h2>
                
                <h3 className="text-xl font-semibold text-navy mb-3">Our Content</h3>
                <p className="body-text mb-4">
                  All content, features, and functionality of our services, including but not limited to text, graphics, logos, software, and methodologies, are owned by Verbost and protected by intellectual property laws.
                </p>

                <h3 className="text-xl font-semibold text-navy mb-3">Your Content</h3>
                <p className="body-text mb-4">
                  You retain ownership of any content you provide to us. By using our services, you grant us a limited license to use your content solely for the purpose of providing our services.
                </p>

                <h3 className="text-xl font-semibold text-navy mb-3">Assessment Reports</h3>
                <p className="body-text">
                  Assessment reports and recommendations we provide are for your internal use only. You may not redistribute, resell, or use our reports for commercial purposes without written permission.
                </p>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">6. Privacy and Data Protection</h2>
                
                <p className="body-text mb-4">
                  Your privacy is important to us. Our collection and use of personal information is governed by our <Link href="/privacy-policy" className="text-coral hover:underline">Privacy Policy</Link>, which is incorporated into these Terms by reference.
                </p>
                
                <p className="body-text">
                  By using our services, you consent to the collection, use, and sharing of your information as described in our Privacy Policy.
                </p>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">7. Service Availability and Performance</h2>
                
                <h3 className="text-xl font-semibold text-navy mb-3">Uptime and Availability</h3>
                <p className="body-text mb-4">
                  While we strive to maintain high availability, we do not guarantee uninterrupted access to our services. We may perform maintenance, updates, or experience technical issues that temporarily affect service availability.
                </p>

                <h3 className="text-xl font-semibold text-navy mb-3">Assessment Accuracy</h3>
                <p className="body-text mb-4">
                  Our assessments are based on publicly available information and industry best practices. While we strive for accuracy, we cannot guarantee the completeness or accuracy of all assessments.
                </p>

                <h3 className="text-xl font-semibold text-navy mb-3">Third-Party Dependencies</h3>
                <p className="body-text">
                  Our services may depend on third-party tools and services. We are not responsible for the availability or performance of third-party services.
                </p>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">8. Disclaimers and Limitations of Liability</h2>
                
                <h3 className="text-xl font-semibold text-navy mb-3">Service Disclaimers</h3>
                <p className="body-text mb-4">
                  Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We disclaim all warranties, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.
                </p>

                <h3 className="text-xl font-semibold text-navy mb-3">Limitation of Liability</h3>
                <p className="body-text mb-4">
                  To the maximum extent permitted by law, Verbost shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.
                </p>

                <h3 className="text-xl font-semibold text-navy mb-3">Maximum Liability</h3>
                <p className="body-text">
                  Our total liability for any claims arising from or related to our services shall not exceed the amount paid by you for the specific service giving rise to the claim.
                </p>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">9. Indemnification</h2>
                
                <p className="body-text">
                  You agree to indemnify, defend, and hold harmless Verbost and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our services, violation of these Terms, or infringement of any third-party rights.
                </p>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">10. Termination</h2>
                
                <h3 className="text-xl font-semibold text-navy mb-3">Termination by You</h3>
                <p className="body-text mb-4">
                  You may terminate your use of our services at any time by discontinuing use and notifying us in writing.
                </p>

                <h3 className="text-xl font-semibold text-navy mb-3">Termination by Us</h3>
                <p className="body-text mb-4">
                  We may terminate or suspend your access to our services immediately, without prior notice, for any reason, including breach of these Terms.
                </p>

                <h3 className="text-xl font-semibold text-navy mb-3">Effect of Termination</h3>
                <p className="body-text">
                  Upon termination, your right to use our services will cease immediately. Provisions that by their nature should survive termination will remain in effect.
                </p>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">11. Governing Law and Dispute Resolution</h2>
                
                <h3 className="text-xl font-semibold text-navy mb-3">Governing Law</h3>
                <p className="body-text mb-4">
                  These Terms are governed by and construed in accordance with the laws of the State of Georgia, without regard to conflict of law principles.
                </p>

                <h3 className="text-xl font-semibold text-navy mb-3">Dispute Resolution</h3>
                <p className="body-text mb-4">
                  Any disputes arising from these Terms or our services will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
                </p>

                <h3 className="text-xl font-semibold text-navy mb-3">Jurisdiction</h3>
                <p className="body-text">
                  You agree to submit to the personal jurisdiction of the courts located in Georgia for any actions not subject to arbitration.
                </p>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">12. Changes to Terms</h2>
                
                <p className="body-text mb-4">
                  We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on our website and updating the "Last updated" date.
                </p>
                
                <p className="body-text">
                  Your continued use of our services after such changes constitutes acceptance of the updated Terms.
                </p>
              </CardContent>
            </Card>

            <Card className="card">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">13. Contact Information</h2>
                
                <p className="body-text mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> <a href="mailto:legal@verbost.ai" className="text-coral hover:underline">legal@verbost.ai</a></p>
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