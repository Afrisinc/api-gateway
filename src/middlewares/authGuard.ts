import type { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';
import { authLogger } from '@/utils/logger';

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

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    // Attach user info to request object
    request.user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    authLogger.debug(
      {
        userId: decoded.userId,
        email: decoded.email,
        path: request.url,
      },
      'User authenticated successfully'
    );
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      authLogger.warn(
        {
          ip: request.ip,
          path: request.url,
          expiredAt: error.expiredAt,
        },
        'JWT token expired'
      );
      reply.status(401).send({ error: 'Unauthorized', message: 'Token expired' });
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      authLogger.warn(
        {
          ip: request.ip,
          path: request.url,
          error: error.message,
        },
        'Invalid JWT token'
      );
      reply.status(401).send({ error: 'Unauthorized', message: 'Invalid token' });
      return;
    }

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
