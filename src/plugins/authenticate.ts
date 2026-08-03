import fp from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { authProxy } from '@/proxies/auth.proxy';
import { authLogger } from '@/utils/logger';
import { ResponseHandler } from '@/utils/response';

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      userId: string;
      email: string;
      role?: string;
      accountId?: string;
      product?: string;
    };
  }
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

async function authenticatePlugin(fastify: FastifyInstance) {
  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    let authHeader = request.headers.authorization;

    if (!authHeader) {
      authLogger.warn({ ip: request.ip, path: request.url }, 'Authorization header missing');
      return ResponseHandler.error(reply, 1001, 'Authorization header is required', 401);
    }

    if (!authHeader.startsWith('Bearer ')) {
      authHeader = `Bearer ${authHeader}`;
    }

    const token = authHeader.slice(7);
    if (!token) {
      authLogger.warn({ ip: request.ip, path: request.url }, 'Bearer token missing');
      return ResponseHandler.error(reply, 1001, 'Bearer token is required', 401);
    }

    const result = await authProxy.verifyToken(token);
    if (!result.valid) {
      authLogger.warn({ ip: request.ip, path: request.url }, 'Token verification failed');
      return ResponseHandler.error(reply, 1001, 'Invalid token', 401);
    }

    request.user = {
      userId: result.userId || '',
      email: result.email || '',
      role: result.role,
      accountId: result.accountId,
      product: result.product,
    };

    authLogger.debug({ userId: result.userId, role: result.role, path: request.url }, 'User authenticated');
  });
}

export default fp(authenticatePlugin, {
  name: 'authenticate',
  fastify: '4.x',
});
