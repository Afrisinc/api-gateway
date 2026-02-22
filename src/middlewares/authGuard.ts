import type { FastifyRequest, FastifyReply } from 'fastify';
import { authLogger } from '@/utils/logger';
import { authProxy } from '@/proxies/auth.proxy';

export interface JwtPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      userId: string;
      email: string;
    };
  }
}

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    let authHeader = request.headers.authorization;

    if (!authHeader) {
      authLogger.warn(
        {
          ip: request.ip,
          userAgent: request.headers['user-agent'],
          path: request.url,
        },
        'Authorization header missing'
      );
      reply.status(401).send({ error: 'Unauthorized', message: 'Authorization header is required' });
      return;
    }

    // Auto-prefix Bearer if token is provided without it
    if (!authHeader.startsWith('Bearer ')) {
      authHeader = `Bearer ${authHeader}`;
    }

    const token = authHeader.slice(7); // Remove 'Bearer ' prefix

    if (!token) {
      authLogger.warn(
        {
          ip: request.ip,
          path: request.url,
        },
        'Bearer token missing'
      );
      reply.status(401).send({ error: 'Unauthorized', message: 'Bearer token is required' });
      return;
    }

    // Verify token with auth service
    const verificationResult = await authProxy.verifyToken(token);

    if (!verificationResult.valid) {
      authLogger.warn(
        {
          ip: request.ip,
          path: request.url,
        },
        'Token verification failed'
      );
      reply.status(401).send({ error: 'Unauthorized', message: 'Invalid token' });
      return;
    }

    // Attach user info to request object
    request.user = {
      userId: verificationResult.userId || '',
      email: verificationResult.email || '',
    };

    authLogger.debug(
      {
        userId: verificationResult.userId,
        email: verificationResult.email,
        path: request.url,
      },
      'User authenticated successfully'
    );
  } catch (error) {
    authLogger.error(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        ip: request.ip,
        path: request.url,
      },
      'Auth middleware error'
    );

    reply.status(500).send({ error: 'Internal Server Error', message: 'Authentication failed' });
  }
};

export const optionalAuthMiddleware = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return; // Continue without authentication
  }

  try {
    await authMiddleware(request, reply);
  } catch (error) {
    // For optional auth, we don't block the request on auth failure
    authLogger.debug(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        ip: request.ip,
        path: request.url,
      },
      'Optional auth failed, continuing without authentication'
    );
  }
};

export const authGuard = authMiddleware;
