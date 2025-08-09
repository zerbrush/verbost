import { NextRequest, NextResponse } from 'next/server';
import { sendContactFormEmails } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    console.log('📧 Contact form submission received:', formData);

    // Validate required fields
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Send emails
    const emailResult = await sendContactFormEmails({
      name: name.trim(),
      email: email.trim(),
      company: formData.company?.trim(),
      phone: formData.phone?.trim(),
      website: formData.website?.trim(),
      message: message.trim()
    });

    if (!emailResult.success) {
      console.warn('⚠️ Email sending failed:', emailResult.error);
      // Still return success to user, but log the email issue
    }

    console.log('✅ Contact form processed successfully');

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We\'ll be in touch within 24 hours.'
    });

  } catch (error: any) {
    console.error('❌ Contact form error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again or email us directly at hello@verbost.ai',
        details: error.message 
      },
      { status: 500 }
    );
  }
}