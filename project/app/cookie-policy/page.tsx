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
  X,
  Cookie
} from 'lucide-react';
import Link from 'next/link';

export default function CookiePolicyPage() {
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
              Cookie Policy
            </h1>
            <p className="body-text mb-8 max-w-3xl mx-auto">
              This policy explains how we use cookies and similar technologies on our website.
            </p>
            <p className="text-sm text-navy/60">
              Last updated: January 19, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Cookie Policy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">1. What Are Cookies?</h2>
                
                <p className="body-text mb-4">
                  Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners about how their site is being used.
                </p>
                
                <p className="body-text">
                  Cookies can be "persistent" (remaining on your device until deleted or expired) or "session" (deleted when you close your browser). They can also be "first-party" (set by the website you're visiting) or "third-party" (set by other websites).
                </p>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">2. How We Use Cookies</h2>
                
                <p className="body-text mb-4">
                  We use cookies and similar technologies for several purposes:
                </p>
                
                <h3 className="text-xl font-semibold text-navy mb-3">Essential Cookies</h3>
                <p className="body-text mb-4">
                  These cookies are necessary for our website to function properly. They enable basic features like page navigation, access to secure areas, and form submissions. Our website cannot function properly without these cookies.
                </p>
                
                <h3 className="text-xl font-semibold text-navy mb-3">Analytics Cookies</h3>
                <p className="body-text mb-4">
                  We use analytics cookies to understand how visitors interact with our website. This helps us improve our services and user experience. These cookies collect information about:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Pages visited and time spent on each page</li>
                  <li>How you arrived at our website</li>
                  <li>What device and browser you're using</li>
                  <li>General location information (country/city level)</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-navy mb-3">Functional Cookies</h3>
                <p className="body-text mb-4">
                  These cookies enable enhanced functionality and personalization, such as:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Remembering your preferences and settings</li>
                  <li>Providing personalized content</li>
                  <li>Enabling social media features</li>
                  <li>Improving website performance</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">3. Types of Cookies We Use</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 mb-6">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Cookie Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Purpose</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Session Cookies</td>
                        <td className="border border-gray-300 px-4 py-2">Enable website functionality and user authentication</td>
                        <td className="border border-gray-300 px-4 py-2">Session only</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Preference Cookies</td>
                        <td className="border border-gray-300 px-4 py-2">Remember your settings and preferences</td>
                        <td className="border border-gray-300 px-4 py-2">1 year</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Analytics Cookies</td>
                        <td className="border border-gray-300 px-4 py-2">Understand website usage and performance</td>
                        <td className="border border-gray-300 px-4 py-2">2 years</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Marketing Cookies</td>
                        <td className="border border-gray-300 px-4 py-2">Deliver relevant advertisements and track campaigns</td>
                        <td className="border border-gray-300 px-4 py-2">1 year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">4. Third-Party Cookies</h2>
                
                <p className="body-text mb-4">
                  We may use third-party services that set their own cookies. These include:
                </p>
                
                <h3 className="text-xl font-semibold text-navy mb-3">Google Analytics</h3>
                <p className="body-text mb-4">
                  We use Google Analytics to analyze website traffic and user behavior. Google Analytics uses cookies to collect information about how you use our website. You can learn more about Google Analytics cookies at <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage" className="text-coral hover:underline" target="_blank" rel="noopener noreferrer">Google's documentation</a>.
                </p>
                
                <h3 className="text-xl font-semibold text-navy mb-3">Email Marketing</h3>
                <p className="body-text mb-4">
                  We may use email marketing services that track email opens and clicks through cookies and similar technologies.
                </p>
                
                <h3 className="text-xl font-semibold text-navy mb-3">Social Media</h3>
                <p className="body-text">
                  Our website may include social media features that use cookies to track interactions and provide personalized content.
                </p>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">5. Managing Your Cookie Preferences</h2>
                
                <h3 className="text-xl font-semibold text-navy mb-3">Browser Settings</h3>
                <p className="body-text mb-4">
                  Most web browsers allow you to control cookies through their settings. You can:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>View what cookies are stored on your device</li>
                  <li>Delete existing cookies</li>
                  <li>Block cookies from being set</li>
                  <li>Set preferences for specific websites</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-navy mb-3">Browser-Specific Instructions</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings &gt; Cookies and site permissions &gt; Cookies and site data</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-navy mb-3">Opt-Out Tools</h3>
                <p className="body-text mb-4">
                  You can also use these tools to manage tracking:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><a href="https://tools.google.com/dlpage/gaoptout" className="text-coral hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
                  <li><a href="https://optout.networkadvertising.org/" className="text-coral hover:underline" target="_blank" rel="noopener noreferrer">Network Advertising Initiative Opt-out</a></li>
                  <li><a href="https://optout.aboutads.info/" className="text-coral hover:underline" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance Opt-out</a></li>
                </ul>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 text-sm">
                    <strong>Note:</strong> Disabling cookies may affect the functionality of our website and your user experience. Some features may not work properly without cookies enabled.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">6. Cookie Consent</h2>
                
                <p className="body-text mb-4">
                  By continuing to use our website, you consent to our use of cookies as described in this policy. We may display a cookie banner or notice when you first visit our website to inform you about our cookie usage.
                </p>
                
                <p className="body-text">
                  You can withdraw your consent at any time by adjusting your browser settings or using the opt-out tools mentioned above.
                </p>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">7. Updates to This Policy</h2>
                
                <p className="body-text mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date.
                </p>
                
                <p className="body-text">
                  We encourage you to review this policy periodically to stay informed about our cookie practices.
                </p>
              </CardContent>
            </Card>

            <Card className="card mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">8. More Information</h2>
                
                <p className="body-text mb-4">
                  For more information about cookies and how they work, you can visit:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><a href="https://www.allaboutcookies.org/" className="text-coral hover:underline" target="_blank" rel="noopener noreferrer">All About Cookies</a></li>
                  <li><a href="https://cookiepedia.co.uk/" className="text-coral hover:underline" target="_blank" rel="noopener noreferrer">Cookiepedia</a></li>
                  <li><a href="https://ico.org.uk/for-the-public/online/cookies/" className="text-coral hover:underline" target="_blank" rel="noopener noreferrer">ICO Cookies Guidance</a></li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">9. Contact Us</h2>
                
                <p className="body-text mb-4">
                  If you have any questions about this Cookie Policy or our use of cookies, please contact us:
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