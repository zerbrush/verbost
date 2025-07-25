// Website content extraction and analysis utilities

export interface PageContent {
  url: string;
  title: string;
  metaDescription: string;
  headings: {
    h1: string[];
    h2: string[];
    h3: string[];
  };
  textContent: string;
  images: Array<{ src: string; alt: string }>;
  links: Array<{ href: string; text: string; internal: boolean }>;
  structuredData: any[];
}

export interface WebsiteData {
  url: string;
  pages: PageContent[];
  content: {
    totalWords: number;
    mainTopics: string[];
    hasContactInfo: boolean;
    hasAboutPage: boolean;
    hasServicePages: boolean;
  };
  performance?: any;
  mobile?: any;
}

// Discover key pages for analysis
export async function discoverKeyPages(url: string): Promise<string[]> {
  try {
    const baseUrl = new URL(url);
    const domain = baseUrl.origin;
    
    // Start with the homepage
    const keyPages = [url];
    
    // Try to discover common important pages
    const commonPaths = [
      '/about',
      '/about-us',
      '/services',
      '/products',
      '/contact',
      '/contact-us',
      '/blog',
      '/news',
      '/team',
      '/pricing'
    ];
    
    // Add common pages that might exist
    for (const path of commonPaths) {
      const pageUrl = domain + path;
      try {
        const response = await fetch(pageUrl, { 
          method: 'HEAD',
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; VerbostBot/1.0; +https://verbost.ai/bot)'
          }
        });
        if (response.ok) {
          keyPages.push(pageUrl);
        }
      } catch (error) {
        // Page doesn't exist or is inaccessible, skip it
        continue;
      }
    }
    
    // Try to get sitemap for additional pages
    try {
      const sitemapUrl = domain + '/sitemap.xml';
      const sitemapResponse = await fetch(sitemapUrl);
      if (sitemapResponse.ok) {
        const sitemapText = await sitemapResponse.text();
        const urls = extractUrlsFromSitemap(sitemapText);
        keyPages.push(...urls.slice(0, 5)); // Add up to 5 more pages from sitemap
      }
    } catch (error) {
      // Sitemap not available, continue with discovered pages
    }
    
    // Remove duplicates and limit to 10 pages
    return [...new Set(keyPages)].slice(0, 10);
    
  } catch (error) {
    console.error('Error discovering pages:', error);
    return [url]; // Fallback to just the homepage
  }
}

// Extract content from a single page
export async function extractPageContent(url: string): Promise<PageContent> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VerbostBot/1.0; +https://verbost.ai/bot)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const html = await response.text();
    return parseHTMLContent(url, html);
    
  } catch (error) {
    console.error(`Error extracting content from ${url}:`, error);
    throw error;
  }
}

// Parse HTML content and extract relevant information
function parseHTMLContent(url: string, html: string): PageContent {
  // Simple HTML parsing (in a real implementation, you'd use a proper HTML parser)
  const content: PageContent = {
    url,
    title: extractTitle(html),
    metaDescription: extractMetaDescription(html),
    headings: extractHeadings(html),
    textContent: extractTextContent(html),
    images: extractImages(html),
    links: extractLinks(html, url),
    structuredData: extractStructuredData(html)
  };
  
  return content;
}

function extractTitle(html: string): string {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return titleMatch ? titleMatch[1].trim() : '';
}

function extractMetaDescription(html: string): string {
  const metaMatch = html.match(/<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"']+)["\'][^>]*>/i);
  return metaMatch ? metaMatch[1].trim() : '';
}

function extractHeadings(html: string): { h1: string[]; h2: string[]; h3: string[] } {
  const headings = { h1: [] as string[], h2: [] as string[], h3: [] as string[] };
  
  const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi) || [];
  const h2Matches = html.match(/<h2[^>]*>([^<]+)<\/h2>/gi) || [];
  const h3Matches = html.match(/<h3[^>]*>([^<]+)<\/h3>/gi) || [];
  
  headings.h1 = h1Matches.map(match => match.replace(/<[^>]*>/g, '').trim());
  headings.h2 = h2Matches.map(match => match.replace(/<[^>]*>/g, '').trim());
  headings.h3 = h3Matches.map(match => match.replace(/<[^>]*>/g, '').trim());
  
  return headings;
}

function extractTextContent(html: string): string {
  // Remove script and style elements
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // Remove HTML tags
  text = text.replace(/<[^>]*>/g, ' ');
  
  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  // Limit to first 2000 characters for analysis
  return text.slice(0, 2000);
}

function extractImages(html: string): Array<{ src: string; alt: string }> {
  const images: Array<{ src: string; alt: string }> = [];
  const imgMatches = html.match(/<img[^>]*>/gi) || [];
  
  imgMatches.forEach(imgTag => {
    const srcMatch = imgTag.match(/src=["\']([^"']+)["\']/i);
    const altMatch = imgTag.match(/alt=["\']([^"']*)["\']/i);
    
    if (srcMatch) {
      images.push({
        src: srcMatch[1],
        alt: altMatch ? altMatch[1] : ''
      });
    }
  });
  
  return images.slice(0, 10); // Limit to first 10 images
}

function extractLinks(html: string, baseUrl: string): Array<{ href: string; text: string; internal: boolean }> {
  const links: Array<{ href: string; text: string; internal: boolean }> = [];
  const linkMatches = html.match(/<a[^>]*href=["\']([^"']+)["\'][^>]*>([^<]*)<\/a>/gi) || [];
  
  const baseDomain = new URL(baseUrl).hostname;
  
  linkMatches.forEach(linkTag => {
    const hrefMatch = linkTag.match(/href=["\']([^"']+)["\']/i);
    const textMatch = linkTag.match(/>([^<]*)<\/a>/i);
    
    if (hrefMatch) {
      const href = hrefMatch[1];
      const text = textMatch ? textMatch[1].trim() : '';
      
      let isInternal = false;
      try {
        const linkUrl = new URL(href, baseUrl);
        isInternal = linkUrl.hostname === baseDomain;
      } catch (error) {
        // Invalid URL, skip
        return;
      }
      
      links.push({
        href,
        text,
        internal: isInternal
      });
    }
  });
  
  return links.slice(0, 20); // Limit to first 20 links
}

function extractStructuredData(html: string): any[] {
  const structuredData: any[] = [];
  
  // Look for JSON-LD structured data
  const jsonLdMatches = html.match(/<script[^>]*type=["\']application\/ld\+json["\'][^>]*>([\s\S]*?)<\/script>/gi) || [];
  
  jsonLdMatches.forEach(script => {
    try {
      const jsonMatch = script.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
      if (jsonMatch) {
        const jsonData = JSON.parse(jsonMatch[1]);
        structuredData.push(jsonData);
      }
    } catch (error) {
      // Invalid JSON, skip
    }
  });
  
  return structuredData;
}

function extractUrlsFromSitemap(sitemapXml: string): string[] {
  const urls: string[] = [];
  const urlMatches = sitemapXml.match(/<loc>([^<]+)<\/loc>/gi) || [];
  
  urlMatches.forEach(match => {
    const urlMatch = match.match(/<loc>([^<]+)<\/loc>/i);
    if (urlMatch) {
      urls.push(urlMatch[1]);
    }
  });
  
  return urls;
}

// Aggregate content from multiple pages
export function aggregateContent(pages: PageContent[]): WebsiteData['content'] {
  const allText = pages.map(page => page.textContent).join(' ');
  const words = allText.split(/\s+/).filter(word => word.length > 3);
  
  // Simple topic extraction (count word frequency)
  const wordCounts: Record<string, number> = {};
  words.forEach(word => {
    const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
    if (cleanWord.length > 3) {
      wordCounts[cleanWord] = (wordCounts[cleanWord] || 0) + 1;
    }
  });
  
  const mainTopics = Object.entries(wordCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word);
  
  // Check for important page types
  const hasContactInfo = pages.some(page => 
    page.textContent.toLowerCase().includes('contact') ||
    page.textContent.toLowerCase().includes('email') ||
    page.textContent.toLowerCase().includes('phone')
  );
  
  const hasAboutPage = pages.some(page => 
    page.url.toLowerCase().includes('about') ||
    page.title.toLowerCase().includes('about')
  );
  
  const hasServicePages = pages.some(page => 
    page.url.toLowerCase().includes('service') ||
    page.url.toLowerCase().includes('product') ||
    page.title.toLowerCase().includes('service')
  );
  
  return {
    totalWords: words.length,
    mainTopics,
    hasContactInfo,
    hasAboutPage,
    hasServicePages
  };
}

// Analyze performance (simplified version)
export async function analyzePerformance(url: string): Promise<any> {
  try {
    const startTime = Date.now();
    const response = await fetch(url);
    const endTime = Date.now();
    
    const loadTime = endTime - startTime;
    const contentLength = parseInt(response.headers.get('content-length') || '0');
    
    return {
      loadTime,
      contentLength,
      status: response.status,
      headers: Object.fromEntries(response.headers.entries())
    };
  } catch (error) {
    return { error: 'Performance analysis failed' };
  }
}

// Analyze mobile optimization (simplified version)
export async function analyzeMobileOptimization(url: string): Promise<any> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15'
      }
    });
    
    const html = await response.text();
    
    const hasViewportMeta = html.includes('viewport');
    const hasResponsiveImages = html.includes('srcset') || html.includes('picture');
    const hasTouchIcons = html.includes('apple-touch-icon');
    
    return {
      hasViewportMeta,
      hasResponsiveImages,
      hasTouchIcons,
      mobileOptimized: hasViewportMeta && hasResponsiveImages
    };
  } catch (error) {
    return { error: 'Mobile analysis failed' };
  }
}