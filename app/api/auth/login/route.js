import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { loginSchema } from '@/lib/validations';
import { trackEvent } from '@/lib/analytics';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
    const limitResult = rateLimit(`login:${ip}`, 5, 60000);
    if (!limitResult.success) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please wait 1 minute before retrying.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validated = loginSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.errors[0]?.message || 'Invalid input' },
        { status: 400 }
      );
    }

    const { email, password } = validated.data;

    // Check user in DB
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password credentials' },
        { status: 401 }
      );
    }

    if (user.status === 'suspended') {
      return NextResponse.json(
        { error: 'This institutional account has been suspended. Please contact compliance.' },
        { status: 403 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password credentials' },
        { status: 401 }
      );
    }

    // Save session
    const session = await getSession();
    session.user = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.company,
      role: user.role,
      status: user.status,
    };
    await session.save();

    await trackEvent({
      event: 'user_login',
      userId: user.id,
      properties: { role: user.role, company: user.company },
    });

    return NextResponse.json({
      success: true,
      user: session.user,
    });
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { error: 'Internal server error during authentication' },
      { status: 500 }
    );
  }
}
