import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { sendInquiryNotification } from '@/lib/email';
import { trackEvent } from '@/lib/analytics';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
    const limitResult = rateLimit(`inquiry:${ip}`, 10, 60000);
    if (!limitResult.success) {
      return NextResponse.json(
        { error: 'Too many inquiries submitted from this connection. Please wait 1 minute.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { items = [], notes = '', guestInfo = {} } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'At least one product item is required for inquiry submission.' },
        { status: 400 }
      );
    }

    const session = await getSession();
    let user = session?.user;

    // If guest and email provided, find or construct user representation
    if (!user) {
      if (!guestInfo.email) {
        return NextResponse.json(
          { error: 'Contact email is required to submit an inquiry.' },
          { status: 400 }
        );
      }

      // Check if user with this email already exists
      let dbUser = await prisma.user.findUnique({
        where: { email: guestInfo.email.toLowerCase() },
      });

      if (!dbUser) {
        // Create an unverified user shell for this inquiry
        dbUser = await prisma.user.create({
          data: {
            email: guestInfo.email.toLowerCase(),
            passwordHash: 'GUEST_UNAUTHENTICATED',
            firstName: guestInfo.name || 'Guest',
            company: guestInfo.company || 'Healthcare Entity',
            phone: guestInfo.phone || null,
            role: 'customer',
            status: 'unverified',
          },
        });
      }
      user = dbUser;
    }

    // Create Inquiry Cart in DB
    const inquiryCart = await prisma.inquiryCart.create({
      data: {
        userId: user.id,
        status: 'submitted',
        notes: notes || null,
        items: {
          create: items
            .filter((it) => it.productId && it.productId.length > 10)
            .map((it) => ({
              productId: it.productId,
              quantity: parseInt(it.quantity || 1, 10),
              notes: it.notes || null,
            })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Send notifications
    await sendInquiryNotification({
      inquiry: inquiryCart,
      user,
      items: inquiryCart.items,
    });

    await trackEvent({
      event: 'inquiry_submitted',
      userId: user.id,
      properties: {
        inquiryId: inquiryCart.id,
        itemCount: inquiryCart.items.length,
      },
    });

    return NextResponse.json({
      success: true,
      inquiryId: inquiryCart.id,
    });
  } catch (error) {
    console.error('Inquiry API error:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry submission' },
      { status: 500 }
    );
  }
}
