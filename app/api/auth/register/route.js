import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { registerSchema } from '@/lib/validations';
import { trackEvent } from '@/lib/analytics';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
    const limitResult = rateLimit(`register:${ip}`, 3, 60000);
    if (!limitResult.success) {
      return NextResponse.json(
        { error: 'Too many registration requests. Please wait a moment before trying again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validated = registerSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.errors[0]?.message || 'Invalid form data' },
        { status: 400 }
      );
    }

    const { email, password, firstName, lastName, company, phone } = validated.data;

    // Check if existing user
    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email address already exists.' },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        firstName,
        lastName,
        company,
        phone,
        role: 'customer',
        status: 'unverified', // Requires administrative/regulatory verification for live contract prices
      },
    });

    await trackEvent({
      event: 'user_register',
      userId: newUser.id,
      properties: { company },
    });

    return NextResponse.json({
      success: true,
      message: 'Registration successful. Account awaiting verification.',
    });
  } catch (error) {
    console.error('Register API error:', error);
    return NextResponse.json(
      { error: 'Internal server error during registration' },
      { status: 500 }
    );
  }
}
