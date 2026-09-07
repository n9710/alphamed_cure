// In-memory sliding window rate limiter
// ponytail: ceiling is single-node / serverless instance; upgrade path is Upstash Redis when multi-region horizontal scaling is enabled.

const rateLimitMap = new Map();

/**
 * Checks if an IP or key has exceeded the allowed limit within a window.
 * @param {string} key - Unique identifier (e.g. IP address + route)
 * @param {number} limit - Maximum requests allowed in window
 * @param {number} windowMs - Window duration in milliseconds (default: 60s)
 * @returns {{ success: boolean, remaining: number, reset: number }}
 */
export function rateLimit(key, limit = 10, windowMs = 60000) {
  const now = Date.now();
  const record = rateLimitMap.get(key) || { count: 0, resetTime: now + windowMs };

  // Reset window if expired
  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + windowMs;
  }

  record.count += 1;
  rateLimitMap.set(key, record);

  // Periodically clean stale records to prevent memory leak
  if (rateLimitMap.size > 5000) {
    for (const [k, v] of rateLimitMap.entries()) {
      if (now > v.resetTime) rateLimitMap.delete(k);
    }
  }

  const success = record.count <= limit;
  const remaining = Math.max(0, limit - record.count);

  return {
    success,
    remaining,
    reset: record.resetTime,
  };
}
