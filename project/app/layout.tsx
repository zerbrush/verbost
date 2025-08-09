import './globals.css';
import type { Metadata } from 'next';
import { Poppins, Roboto } from 'next/font/google';
import Script from 'next/script'; 


const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins'
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto'
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://verbost.ai'),
  title: 'Verbost.ai - AI-Driven Website Optimization Agency',
  description: 'Building the web for the AI future. AI-vulnerability website assessments, CX and content strategy, and optimizing your website to ensure your business thrives in search engines and AI platforms.',
  keywords: 'AI SEO, website optimization, AI-first content, search engine optimization, website assessment, MCP server hosting, digital marketing agency',
  authors: [{ name: 'Verbost.ai Team' }],
  creator: 'Verbost.ai',
  publisher: 'Verbost.ai',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://verbost.ai',
    title: 'Verbost.ai - AI-Driven Website Optimization Agency',
    description: 'The agency built for the AI future. AI-driven website assessments, content strategy, and ongoing monitoring to ensure your business thrives in search engines and AI platforms.',
    siteName: 'Verbost.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verbost.ai - AI-Driven Website Optimization Agency',
    description: 'The agency built for the AI future. AI-driven website assessments, content strategy, and ongoing monitoring to ensure your business thrives in search engines and AI platforms.',
    creator: '@verbostai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-BJZ9CPCGBK"></Script>
        <Script id="google-analytics">
          {
            '
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BJZ9CPCGBK');
            '
          }
        </Script>
      </head>
      <body className={`${poppins.variable} ${roboto.variable} font-poppins`}>
        {children}
      </body>
    </html>
  );
}