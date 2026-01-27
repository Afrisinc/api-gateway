import { FastifyRequest, FastifyReply } from 'fastify';
import { env } from '@/config/env';
import { httpClient } from '@/utils/http-client';
import { proxyLogger } from '@/utils/logger';

export class AuthProxy {
  private readonly baseUrl = env.AUTH_SERVICE_URL;

  async register(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/auth/register`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Auth register proxy failed');
      reply.status(503).send({ message: 'Authentication service unavailable' });
    }
  }

  async login(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Auth login proxy failed');
      reply.status(503).send({ message: 'Authentication service unavailable' });
    }
  }

  async verifyToken(token: string): Promise<{ valid: boolean; userId?: string }> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/auth/verify`, {
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        return { valid: true, userId: (response.data as any)?.userId };
      }

      return { valid: false };
    } catch (error) {
      proxyLogger.error({ error }, 'Token verification failed');
      return { valid: false };
    }
  }

  async forgotPassword(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/auth/forgot-password`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Forgot password proxy failed');
      reply.status(503).send({ message: 'Authentication service unavailable' });
    }
  }

  async resetPassword(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/auth/reset-password`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Reset password proxy failed');
      reply.status(503).send({ message: 'Authentication service unavailable' });
    }
  }
}

export const authProxy = new AuthProxy();
