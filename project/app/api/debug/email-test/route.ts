import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

export async function GET(request: NextRequest) {
  try {
    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    
    const debugInfo = {
      hasSendGridKey: !!sendgridApiKey,
      keyLength: sendgridApiKey ? sendgridApiKey.length : 0,
      keyPrefix: sendgridApiKey ? sendgridApiKey.substring(0, 10) + '...' : 'Not set',
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    };

    console.log('🔍 Email debug info:', debugInfo);

    if (!sendgridApiKey) {
      return NextResponse.json({
        success: false,
        error: 'SENDGRID_API_KEY not configured',
        debugInfo
      });
    }

    // Test SendGrid connection
    sgMail.setApiKey(sendgridApiKey);
    
    const testEmail = {
      to: process.env.ADMIN_EMAIL || 'hmzerbe@gmail.com',
      from: 'report@verbost.ai',
      subject: 'Email Test from Verbost Production',
      text: `This is a test email from Verbost production environment.
      
Time: ${new Date().toISOString()}
Environment: ${process.env.NODE_ENV}
      
If you receive this, email sending is working correctly.`,
      html: `
        <h2>Email Test from Verbost Production</h2>
        <p>This is a test email from Verbost production environment.</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        <p><strong>Environment:</strong> ${process.env.NODE_ENV}</p>
        <p>If you receive this, email sending is working correctly.</p>
      `
    };

    const result = await sgMail.send(testEmail);
    
    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      debugInfo,
      sendGridResponse: result
    });

  } catch (error: any) {
    console.error('❌ Email test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      details: {
        code: error.code,
        response: error.response?.body,
        statusCode: error.response?.statusCode
      },
      debugInfo: {
        hasSendGridKey: !!process.env.SENDGRID_API_KEY,
        nodeEnv: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
      }
    }, { status: 500 });
  }
} 