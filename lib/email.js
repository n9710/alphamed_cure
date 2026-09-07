import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = process.env.EMAIL_FROM || 'Alphamed Cure <notifications@alphamedcure.com>';
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'sales@alphamedcure.com';

/**
 * Sends inquiry confirmation to the customer and alert to admin
 */
export async function sendInquiryNotification({ inquiry, user, items }) {
  if (!resend) {
    console.log('[Email Mock] Resend API key not set. Inquiry notification:', {
      inquiryId: inquiry.id,
      user: user.email,
      itemCount: items.length,
    });
    return { success: true, simulated: true };
  }

  try {
    const itemListHtml = items
      .map(
        (it) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${it.product?.name || 'Product'}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">${it.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${it.notes || '—'}</td>
        </tr>
      `
      )
      .join('');

    // Send confirmation to user
    await resend.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: `Inquiry Received #${inquiry.id.slice(0, 8).toUpperCase()} — Alphamed Cure`,
      html: `
        <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; line-height: 1.6;">
          <h2 style="color: #0284c7;">Thank you for your inquiry, ${user.firstName || 'Valued Customer'}!</h2>
          <p>We have received your medical supply inquiry and our pharmaceutical procurement specialist will review your request shortly.</p>
          <p><strong>Inquiry ID:</strong> #${inquiry.id.slice(0, 8).toUpperCase()}</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #f8fafc; text-align: left;">
                <th style="padding: 8px; border-bottom: 2px solid #cbd5e1;">Product</th>
                <th style="padding: 8px; border-bottom: 2px solid #cbd5e1; text-align: center;">Qty</th>
                <th style="padding: 8px; border-bottom: 2px solid #cbd5e1;">Notes</th>
              </tr>
            </thead>
            <tbody>${itemListHtml}</tbody>
          </table>
          <p style="color: #64748b; font-size: 14px;">If you have immediate questions, please reply directly to this email or reach us at contact@alphamedcure.com.</p>
        </div>
      `,
    });

    // Alert admin team
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `[New Inquiry] #${inquiry.id.slice(0, 8).toUpperCase()} from ${user.company || user.email}`,
      html: `
        <div style="font-family: sans-serif; color: #1e293b;">
          <h3>New Customer Inquiry Submitted</h3>
          <p><strong>Customer:</strong> ${user.firstName} ${user.lastName} (${user.email})</p>
          <p><strong>Company:</strong> ${user.company || 'N/A'}</p>
          <p><strong>Phone:</strong> ${user.phone || 'N/A'}</p>
          <p><strong>Inquiry ID:</strong> ${inquiry.id}</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #f8fafc; text-align: left;">
                <th style="padding: 8px; border-bottom: 2px solid #cbd5e1;">Product</th>
                <th style="padding: 8px; border-bottom: 2px solid #cbd5e1; text-align: center;">Qty</th>
                <th style="padding: 8px; border-bottom: 2px solid #cbd5e1;">Notes</th>
              </tr>
            </thead>
            <tbody>${itemListHtml}</tbody>
          </table>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send inquiry emails via Resend:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Sends contact form notification to admin
 */
export async function sendContactNotification({ name, email, company, phone, subject, message }) {
  if (!resend) {
    console.log('[Email Mock] Contact message received:', { name, email, subject });
    return { success: true, simulated: true };
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `[Contact Form] ${subject} from ${name} (${company || 'Direct'})`,
      html: `
        <div style="font-family: sans-serif; color: #1e293b;">
          <h3>New Contact Message</h3>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="padding: 12px; background: #f8fafc; border-left: 4px solid #0284c7; margin-top: 16px;">
            ${message.replace(/\n/g, '<br/>')}
          </div>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send contact notification email:', error);
    return { success: false, error: error.message };
  }
}
