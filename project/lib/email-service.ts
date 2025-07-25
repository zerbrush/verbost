import sgMail from '@sendgrid/mail';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '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');

const FROM_EMAIL = 'report@verbost.ai';
const ADMIN_EMAIL = 'hmzerbe@gmail.com';

export interface AssessmentEmailData {
  userEmail: string;
  userName: string;
  url: string;
  assessmentId: string;
  overallScore: number;
  overallGrade: string;
  categories: {
    structuredData: any;
    contentQuality: any;
    technicalPerformance: any;
    businessContext: any;
  };
  keyInsights?: string[];
  nextSteps?: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  website?: string;
  message: string;
  service?: string;
  budget?: string;
}

export async function sendAssessmentCompletionEmail(data: AssessmentEmailData) {
  try {
    // Email to user with their assessment report
    const userMsg = {
      to: data.userEmail,
      from: FROM_EMAIL,
      subject: `Your AI-Readiness Assessment Results for ${data.url}`,
      html: generateAssessmentUserEmail(data)
    };

    // Email to admin for follow-up
    const adminMsg = {
      to: ADMIN_EMAIL,
      from: FROM_EMAIL,
      subject: `New Assessment Completed: ${data.url} (Score: ${data.overallScore})`,
      html: generateAssessmentAdminEmail(data)
    };

    await Promise.all([
      sgMail.send(userMsg),
      sgMail.send(adminMsg)
    ]);

    console.log('✅ Assessment emails sent successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send assessment emails:', error);
    throw error;
  }
}

export async function sendContactFormEmails(data: ContactFormData) {
  try {
    // Email to admin about new contact form submission
    const adminMsg = {
      to: ADMIN_EMAIL,
      from: FROM_EMAIL,
      subject: `New Contact Form Submission from ${data.name}`,
      html: generateContactAdminEmail(data)
    };

    // Confirmation email to user
    const userMsg = {
      to: data.email,
      from: FROM_EMAIL,
      subject: 'Thank you for contacting Verbost - We\'ll be in touch soon',
      html: generateContactUserEmail(data)
    };

    await Promise.all([
      sgMail.send(adminMsg),
      sgMail.send(userMsg)
    ]);

    console.log('✅ Contact form emails sent successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send contact form emails:', error);
    throw error;
  }
}

function generateAssessmentUserEmail(data: AssessmentEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your AI-Readiness Assessment Results</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #003B5C; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FF4A5C, #006F6A); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
        .score-circle { display: inline-block; width: 80px; height: 80px; border-radius: 50%; background: #FF4A5C; color: white; text-align: center; line-height: 80px; font-size: 24px; font-weight: bold; margin: 20px 0; }
        .category { margin: 15px 0; padding: 15px; background: #f8f9fa; border-radius: 6px; }
        .category-name { font-weight: bold; color: #003B5C; }
        .category-score { float: right; font-weight: bold; color: #FF4A5C; }
        .insight { margin: 10px 0; padding: 10px; background: #e3f2fd; border-left: 4px solid #2196f3; }
        .section-header { background: #f0f9ff; padding: 15px; margin: 20px 0 10px 0; border-left: 4px solid #FF4A5C; font-weight: bold; color: #003B5C; }
        .recommendation { margin: 10px 0; padding: 12px; background: #f0fdf4; border-left: 4px solid #10b981; border-radius: 4px; }
        .recommendation-title { font-weight: bold; color: #065f46; margin-bottom: 5px; }
        .recommendation-desc { color: #374151; font-size: 14px; }
        .finding { margin: 8px 0; padding: 8px 12px; background: #fef3c7; border-left: 3px solid #f59e0b; border-radius: 3px; font-size: 14px; }
        .priority-high { border-left-color: #dc2626; }
        .priority-medium { border-left-color: #ea580c; }
        .priority-low { border-left-color: #65a30d; }
        .next-step { margin: 10px 0; padding: 10px; background: #ede9fe; border-left: 4px solid #8b5cf6; border-radius: 4px; }
        .step-number { display: inline-block; width: 24px; height: 24px; background: #FF4A5C; color: white; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: bold; margin-right: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Your AI-Readiness Assessment Results</h1>
          <p>Comprehensive analysis for ${data.url}</p>
        </div>
        
        <div class="content">
          <p>Dear ${data.userName},</p>
          
          <p>Thank you for using Verbost's AI-Readiness Assessment tool. We've completed a comprehensive analysis of your website and are excited to share your results.</p>
          
          <div style="text-align: center;">
            <div class="score-circle">${data.overallScore}</div>
            <h3>Overall Grade: ${data.overallGrade}</h3>
          </div>
          
          <h3>Category Breakdown:</h3>
          <div class="category">
            <span class="category-name">Structured Data & AI Compatibility</span>
            <span class="category-score">${data.categories.structuredData?.score || 'N/A'}/100</span>
            <div style="clear: both;"></div>
          </div>
          <div class="category">
            <span class="category-name">Content Quality</span>
            <span class="category-score">${data.categories.contentQuality?.score || 'N/A'}/100</span>
            <div style="clear: both;"></div>
          </div>
          <div class="category">
            <span class="category-name">Technical Performance</span>
            <span class="category-score">${data.categories.technicalPerformance?.score || 'N/A'}/100</span>
            <div style="clear: both;"></div>
          </div>
          <div class="category">
            <span class="category-name">Business Context</span>
            <span class="category-score">${data.categories.businessContext?.score || 'N/A'}/100</span>
            <div style="clear: both;"></div>
          </div>
          
          ${data.keyInsights && data.keyInsights.length > 0 ? `
          <h3>Key Insights:</h3>
          ${data.keyInsights.map(insight => `<div class="insight">${insight}</div>`).join('')}
          ` : ''}
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-bottom: 10px;">🚀 What This Means for Your Business</h3>
            <p style="margin-bottom: 15px;">Your AI-readiness score of <strong>${data.overallScore}/100</strong> indicates specific opportunities to improve your website's visibility and performance across AI platforms.</p>
            <p style="margin-bottom: 15px;"><strong>Competitive Advantage:</strong> Implementing these AI optimization improvements will position your business favorably in AI-powered search results, helping you capture market share as users increasingly rely on AI assistants for information discovery.</p>
            <p><strong>Estimated Impact:</strong> Based on our analysis, targeted AI optimization improvements could increase your organic visibility by 20-35% and enhance user engagement through better content structure and technical performance.</p>
          </div>
          
          <p>Questions about your results? We'd love to help you implement these improvements. Reply to this email or schedule a free consultation.</p>
          
          <p>Best regards,<br>The Verbost Team</p>
        </div>
        
        <div class="footer">
          <p><strong>Verbost</strong> - The Agency Built for the AI Future</p>
          <p>Visit us at <a href="https://verbost.ai">verbost.ai</a> | Email: hello@verbost.ai</p>
          <p style="margin-top: 15px; font-size: 12px; color: #6b7280;">This comprehensive report was generated by our AI-powered assessment engine. For questions about implementation or to discuss advanced optimization strategies, simply reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateAssessmentAdminEmail(data: AssessmentEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New AI-Readiness Assessment Completed</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #003B5C; margin: 0; padding: 0; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FF4A5C, #006F6A); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
        .score-circle { display: inline-block; width: 80px; height: 80px; border-radius: 50%; background: #FF4A5C; color: white; text-align: center; line-height: 80px; font-size: 24px; font-weight: bold; margin: 20px 0; }
        .category { margin: 15px 0; padding: 15px; background: #f8f9fa; border-radius: 6px; }
        .category-name { font-weight: bold; color: #003B5C; }
        .category-score { float: right; font-weight: bold; color: #FF4A5C; }
        .section-header { background: #f0f9ff; padding: 15px; margin: 20px 0 10px 0; border-left: 4px solid #FF4A5C; font-weight: bold; color: #003B5C; }
        .recommendation { margin: 10px 0; padding: 12px; background: #f0fdf4; border-left: 4px solid #10b981; border-radius: 4px; }
        .recommendation-title { font-weight: bold; color: #065f46; margin-bottom: 5px; }
        .finding { margin: 8px 0; padding: 8px 12px; background: #fef3c7; border-left: 3px solid #f59e0b; border-radius: 3px; font-size: 14px; }
        .priority-high { border-left-color: #dc2626; background: #fef2f2; }
        .priority-medium { border-left-color: #ea580c; background: #fff7ed; }
        .priority-low { border-left-color: #65a30d; background: #f7fee7; }
        .client-info { background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .follow-up { background: #fff3cd; padding: 15px; border-radius: 6px; border-left: 4px solid #ffc107; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 New AI-Readiness Assessment Completed</h1>
          <p>Complete assessment report for ${data.url}</p>
        </div>
        
        <div class="content">
          <div class="client-info">
            <h3>📋 Client Information</h3>
            <p><strong>Website:</strong> ${data.url}</p>
            <p><strong>Client Name:</strong> ${data.userName}</p>
            <p><strong>Email:</strong> ${data.userEmail}</p>
            <p><strong>Assessment ID:</strong> ${data.assessmentId}</p>
            <p><strong>Completed:</strong> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          </div>
          
          <div style="text-align: center;">
            <div class="score-circle">${data.overallScore}</div>
            <h3>Overall Grade: ${data.overallGrade}</h3>
          </div>
          
          <div class="section-header">📊 Category Breakdown</div>
          <div class="category">
            <span class="category-name">🏗️ Structured Data & AI Compatibility</span>
            <span class="category-score">${data.categories.structuredData?.score || 'N/A'}/100 (${data.categories.structuredData?.grade || 'N/A'})</span>
            <div style="clear: both;"></div>
            ${data.categories.structuredData?.summary ? `<p style="margin-top: 10px; font-size: 14px; color: #6b7280;">${data.categories.structuredData.summary}</p>` : ''}
          </div>
          <div class="category">
            <span class="category-name">📝 Content Quality</span>
            <span class="category-score">${data.categories.contentQuality?.score || 'N/A'}/100 (${data.categories.contentQuality?.grade || 'N/A'})</span>
            <div style="clear: both;"></div>
            ${data.categories.contentQuality?.summary ? `<p style="margin-top: 10px; font-size: 14px; color: #6b7280;">${data.categories.contentQuality.summary}</p>` : ''}
          </div>
          <div class="category">
            <span class="category-name">⚡ Technical Performance</span>
            <span class="category-score">${data.categories.technicalPerformance?.score || 'N/A'}/100 (${data.categories.technicalPerformance?.grade || 'N/A'})</span>
            <div style="clear: both;"></div>
            ${data.categories.technicalPerformance?.summary ? `<p style="margin-top: 10px; font-size: 14px; color: #6b7280;">${data.categories.technicalPerformance.summary}</p>` : ''}
          </div>
          <div class="category">
            <span class="category-name">🏢 Business Context</span>
            <span class="category-score">${data.categories.businessContext?.score || 'N/A'}/100 (${data.categories.businessContext?.grade || 'N/A'})</span>
            <div style="clear: both;"></div>
            ${data.categories.businessContext?.summary ? `<p style="margin-top: 10px; font-size: 14px; color: #6b7280;">${data.categories.businessContext.summary}</p>` : ''}
          </div>
          
          ${data.keyInsights && data.keyInsights.length > 0 ? `
          <div class="section-header">💡 Key Insights</div>
          ${data.keyInsights.map(insight => `<div class="finding">${insight}</div>`).join('')}
          ` : ''}
          
          <div class="section-header">🎯 Top Recommendations by Category</div>
          
          ${Object.entries(data.categories).map(([categoryKey, category]) => {
            const categoryName = {
              structuredData: '🏗️ Structured Data & AI Compatibility',
              contentQuality: '📝 Content Quality',
              technicalPerformance: '⚡ Technical Performance',
              businessContext: '🏢 Business Context'
            }[categoryKey] || categoryKey;
            
            return `
            <h4 style="color: #003B5C; margin: 20px 0 10px 0;">${categoryName}</h4>
            
            ${category?.findings && category.findings.length > 0 ? `
            <p style="font-weight: bold; margin: 10px 0 5px 0;">🔍 Key Findings:</p>
            ${category.findings.map((finding: any) => `<div class="finding">${finding}</div>`).join('')}
            ` : ''}
            
            ${category?.recommendations && category.recommendations.length > 0 ? `
            <p style="font-weight: bold; margin: 15px 0 5px 0;">✅ Recommendations:</p>
            ${category.recommendations.slice(0, 3).map((rec: any) => {
              const priorityClass = rec.priority === 'High' ? 'priority-high' : rec.priority === 'Medium' ? 'priority-medium' : 'priority-low';
              return `
              <div class="recommendation ${priorityClass}">
                <div class="recommendation-title">${rec.title || rec.description || rec}</div>
                ${rec.description && rec.title ? `<div style="color: #374151; font-size: 14px;">${rec.description}</div>` : ''}
                ${rec.priority ? `<div style="font-size: 12px; color: #6b7280; margin-top: 5px;">Priority: ${rec.priority} | Impact: ${rec.impact || 'Medium'}</div>` : ''}
              </div>`;
            }).join('')}
            ` : ''}
            `;
          }).join('')}
          
          ${data.nextSteps && data.nextSteps.length > 0 ? `
          <div class="section-header">🚀 Immediate Next Steps</div>
          ${data.nextSteps.map((step, index) => `
          <div style="margin: 10px 0; padding: 10px; background: #ede9fe; border-left: 4px solid #8b5cf6; border-radius: 4px;">
            <span style="display: inline-block; width: 24px; height: 24px; background: #FF4A5C; color: white; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: bold; margin-right: 10px;">${index + 1}</span>
            ${step}
          </div>
          `).join('')}
          ` : ''}
          
          <div class="follow-up">
            <h3 style="color: #92400e; margin-bottom: 10px;">📞 Recommended Follow-up Actions</h3>
            <p><strong>Priority Level:</strong> ${data.overallScore < 60 ? 'HIGH - Immediate attention needed' : data.overallScore < 80 ? 'MEDIUM - Schedule consultation within 1 week' : 'LOW - Monitor and optimize gradually'}</p>
            <p><strong>Suggested Response Time:</strong> ${data.overallScore < 60 ? 'Within 24 hours' : data.overallScore < 80 ? 'Within 3-5 business days' : 'Within 1-2 weeks'}</p>
            <p><strong>Consultation Value:</strong> High potential for AI optimization improvements and competitive advantage</p>
            <p><strong>Client Contact:</strong> ${data.userEmail} | Name: ${data.userName}</p>
          </div>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-bottom: 10px;">💼 Business Impact Summary</h3>
            <p><strong>Overall Score:</strong> ${data.overallScore}/100 (${data.overallGrade} Grade)</p>
            <p><strong>Competitive Position:</strong> ${data.overallScore >= 80 ? 'Strong - Well-positioned for AI platforms' : data.overallScore >= 60 ? 'Good - Some optimization needed for competitive advantage' : 'Needs Improvement - Significant AI optimization required'}</p>
            <p><strong>Revenue Impact Potential:</strong> ${data.overallScore < 60 ? 'High - 25-40% improvement possible' : data.overallScore < 80 ? 'Medium - 15-25% improvement possible' : 'Moderate - 10-15% improvement possible'}</p>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Verbost AI-Readiness Assessment</strong></p>
          <p>This comprehensive report was generated by our AI-powered assessment engine</p>
          <p style="margin-top: 15px; font-size: 12px; color: #6b7280;">Assessment completed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateContactAdminEmail(data: ContactFormData): string {
  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
    ${data.website ? `<p><strong>Website:</strong> ${data.website}</p>` : ''}
    ${data.service ? `<p><strong>Service Interest:</strong> ${data.service}</p>` : ''}
    ${data.budget ? `<p><strong>Budget Range:</strong> ${data.budget}</p>` : ''}
    
    <h3>Message:</h3>
    <p>${data.message.replace(/\n/g, '<br>')}</p>
    
    <hr>
    <p><em>Submitted on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</em></p>
    
    <p><strong>Recommended Follow-up:</strong> Respond within 24 hours to maintain high customer service standards.</p>
  `;
}

function generateContactUserEmail(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting Verbost</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #003B5C; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FF4A5C, #006F6A); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
        .highlight { background: #f0f9ff; padding: 15px; border-radius: 6px; margin: 20px 0; }
        .btn { display: inline-block; background: #FF4A5C; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Contacting Verbost</h1>
          <p>We've received your inquiry and will be in touch soon</p>
        </div>
        
        <div class="content">
          <p>Dear ${data.name},</p>
          
          <p>Thank you for reaching out to Verbost. We've received your message and our team is reviewing your inquiry. We typically respond to all business inquiries within 24 hours during business days.</p>
          
          <div class="highlight">
            <h3>What happens next?</h3>
            <ul>
              <li><strong>Review:</strong> Our team will carefully review your message and requirements</li>
              <li><strong>Response:</strong> We'll reach out within 24 hours with relevant information and next steps</li>
              <li><strong>Consultation:</strong> If appropriate, we'll schedule a free consultation to discuss your AI-readiness needs</li>
            </ul>
          </div>
          
          <p>In the meantime, feel free to explore our resources:</p>
          
          <div style="text-align: center;">
            <a href="https://verbost.ai/assessment" class="btn">Free AI Assessment</a>
            <a href="https://verbost.ai/services" class="btn">Our Services</a>
          </div>
          
          <p><strong>About Verbost:</strong> We're the agency built for the AI future, specializing in helping businesses optimize their websites for both traditional search engines and emerging AI platforms. Our comprehensive approach ensures your digital presence is ready for tomorrow's technology today.</p>
          
          <p>If you have any urgent questions, feel free to reply to this email or call us during business hours.</p>
          
          <p>Best regards,<br>The Verbost Team</p>
        </div>
        
        <div class="footer">
          <p><strong>Verbost</strong> - The Agency Built for the AI Future</p>
          <p>📧 hello@verbost.ai | 🌐 <a href="https://verbost.ai">verbost.ai</a></p>
          <p>📍 Atlanta, GA | ⏰ Mon-Fri: 9AM-6PM EST</p>
        </div>
      </div>
    </body>
    </html>
  `;
}