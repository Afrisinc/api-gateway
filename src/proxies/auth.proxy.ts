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

      const statusCode = (response.data as any)?.success ? 201 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Auth register proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async login(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Auth login proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async verifyToken(token: string): Promise<{ valid: boolean; userId?: string; email?: string }> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/auth/verify`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
        data: {},
      });

      if (response.status === 200) {
        const data = response.data as any;
        return {
          valid: true,
          userId: data?.data?.userId || data?.userId,
          email: data?.data?.email || data?.email,
        };
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

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Forgot password proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async resetPassword(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/auth/reset-password`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Reset password proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }
}

export const authProxy = new AuthProxy();
