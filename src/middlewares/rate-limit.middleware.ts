import type { FastifyRequest, FastifyReply } from 'fastify';
import { env } from '@/config/env';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class RateLimiter {
  private store: RateLimitStore = {};
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = env.RATE_LIMIT_MAX, windowMs: number = env.RATE_LIMIT_WINDOW_MS) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;

    // Cleanup old entries every 5 minutes
    setInterval(
      () => {
        this.cleanup();
      },
      5 * 60 * 1000
    );
  }

  getKey(request: FastifyRequest): string {
    return request.ip || 'unknown';
  }

  private cleanup(): void {
    const now = Date.now();
    Object.keys(this.store).forEach(key => {
      if (this.store[key].resetTime < now) {
        delete this.store[key];
      }
    });
  }

  isLimited(key: string): boolean {
    const now = Date.now();
    const record = this.store[key];

    if (!record || record.resetTime < now) {
      this.store[key] = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      return false;
    }

    if (record.count >= this.maxRequests) {
      return true;
    }

    record.count += 1;
    return false;
  }

  getRemainingRequests(key: string): number {
    const record = this.store[key];
    if (!record) {
      return this.maxRequests;
    }
    return Math.max(0, this.maxRequests - record.count);
  }

  getResetTime(key: string): number {
    const record = this.store[key];
    if (!record) {
      return Date.now();
    }
    return record.resetTime;
  }
}

const limiter = new RateLimiter();

export const rateLimitMiddleware = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const key = limiter.getKey(request);

  if (limiter.isLimited(key)) {
    const resetTime = limiter.getResetTime(key);
    const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);

    reply.status(429);
    reply.header('X-RateLimit-Limit', env.RATE_LIMIT_MAX.toString());
    reply.header('X-RateLimit-Remaining', '0');
    reply.header('X-RateLimit-Reset', resetTime.toString());
    reply.header('Retry-After', retryAfter.toString());

    reply.send({
      error: {
        message: 'Too Many Requests',
        code: 'RATE_LIMIT_EXCEEDED',
      },
      retryAfter,
    });
    return;
  }

  // Add rate limit headers to response
  const remaining = limiter.getRemainingRequests(key);
  const resetTime = limiter.getResetTime(key);

  reply.header('X-RateLimit-Limit', env.RATE_LIMIT_MAX.toString());
  reply.header('X-RateLimit-Remaining', remaining.toString());
  reply.header('X-RateLimit-Reset', resetTime.toString());
};

export const rateLimiter = limiter;
