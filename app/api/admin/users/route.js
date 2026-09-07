import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function POST(request) {
  // Layer 3: Route handler security check
  const adminCheck = await requireAdmin();
  if (adminCheck.error) {
    return NextResponse.json({ error: adminCheck.error }, { status: adminCheck.status });
  }

  try {
    let userId = '';
    let status = '';

    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await request.json();
      userId = body.userId;
      status = body.status;
    } else {
      const formData = await request.formData();
      userId = formData.get('userId');
      status = formData.get('status');
    }

    if (!userId || !status) {
      return NextResponse.json({ error: 'Missing userId or status' }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        status,
        ...(status === 'verified' ? { emailVerifiedAt: new Date() } : {}),
      },
    });

    // If submitted via HTML form, redirect back
    if (!contentType.includes('application/json')) {
      const url = new URL('/admin/users', request.url);
      return NextResponse.redirect(url, { status: 303 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin user update error:', error);
    return NextResponse.json({ error: 'Failed to update user status' }, { status: 500 });
  }
}
