import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { contactSchema } from '@/lib/validations';
import { sendContactNotification } from '@/lib/email';
import { trackEvent } from '@/lib/analytics';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
    const limitResult = rateLimit(`contact:${ip}`, 5, 60000);
    if (!limitResult.success) {
      return NextResponse.json(
        { error: 'Too many contact submissions. Please wait 1 minute before trying again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validated = contactSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.errors[0]?.message || 'Invalid contact fields' },
        { status: 400 }
      );
    }

    const { name, email, company, phone, subject, message } = validated.data;

    // Store in DB
    const contactMsg = await prisma.contactMessage.create({
      data: {
        name,
        email: email.toLowerCase(),
        company: company || null,
        phone: phone || null,
        subject,
        message,
      },
    });

    // Send email alert
    await sendContactNotification({
      name,
      email,
      company,
      phone,
      subject,
      message,
    });

    await trackEvent({
      event: 'contact_form_submitted',
      properties: { subject, company },
    });

    return NextResponse.json({
      success: true,
      message: 'Message delivered to Alphamed Cure procurement desk.',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to deliver message' },
      { status: 500 }
    );
  }
}
