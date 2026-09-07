import { PostHog } from 'posthog-node';
import prisma from './prisma';

let posthogClient = null;

export function getPostHogServer() {
  if (!posthogClient && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return posthogClient;
}

/**
 * Server-side event tracking:
 * Writes to DB table `analytics_events` and forwards to PostHog if configured.
 */
export async function trackEvent({ event, userId = null, sessionId = null, properties = {}, ip = null, userAgent = null }) {
  try {
    // Record in local PostgreSQL
    await prisma.analyticsEvent.create({
      data: {
        event,
        userId,
        sessionId,
        properties,
        ip,
        userAgent,
      },
    });

    // Send to PostHog if available
    const ph = getPostHogServer();
    if (ph) {
      ph.capture({
        distinctId: userId || sessionId || 'anonymous',
        event,
        properties,
      });
    }
  } catch (err) {
    console.error('Analytics trackEvent error:', err.message);
  }
}
