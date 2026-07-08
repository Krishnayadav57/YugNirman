// In-memory rate limiter. Works well for a single Node process (e.g. a VPS or single
// long-running container). If you deploy to a serverless/multi-instance platform
// (Vercel, multiple containers), each instance has its own memory — switch to a
// shared store like Upstash Redis (`@upstash/ratelimit`) for consistent limits there.

const buckets = new Map();

export function rateLimit(key, { limit = 5, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.start > windowMs) {
    buckets.set(key, { start: now, count: 1 });
    return { allowed: true, remaining: limit - 1 };
  }

  if (bucket.count >= limit) {
    return { allowed: false, remaining: 0, retryAfterMs: windowMs - (now - bucket.start) };
  }

  bucket.count += 1;
  return { allowed: true, remaining: limit - bucket.count };
}

export function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

// Periodically clear stale buckets so memory doesn't grow unbounded.
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets.entries()) {
    if (now - bucket.start > 10 * 60_000) buckets.delete(key);
  }
}, 5 * 60_000).unref?.();
