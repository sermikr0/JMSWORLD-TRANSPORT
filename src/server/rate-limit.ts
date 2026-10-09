/**
 * Small in-memory sliding-window rate limiter for the inquiry forms.
 *
 * State lives in the Node.js process, which is right for a single-instance
 * deployment (PM2/systemd behind Nginx). If the site is ever scaled to several
 * instances or a serverless platform, swap this for a shared store such as
 * Redis/Upstash while keeping the same `checkRateLimit` signature.
 */

const buckets = new Map<string, number[]>();

const DEFAULT_WINDOW_MS = 15 * 60 * 1000;
const DEFAULT_MAX = 5;
const SWEEP_THRESHOLD = 5000;

export type RateLimitResult = { allowed: boolean; retryAfterMs: number };

export function checkRateLimit(
  key: string,
  { max = DEFAULT_MAX, windowMs = DEFAULT_WINDOW_MS } = {},
): RateLimitResult {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= max) {
    buckets.set(key, recent);
    return { allowed: false, retryAfterMs: windowMs - (now - recent[0]) };
  }

  recent.push(now);
  buckets.set(key, recent);

  if (buckets.size > SWEEP_THRESHOLD) sweep(now, windowMs);
  return { allowed: true, retryAfterMs: 0 };
}

function sweep(now: number, windowMs: number) {
  for (const [key, hits] of buckets) {
    if (hits.every((t) => now - t >= windowMs)) buckets.delete(key);
  }
}
