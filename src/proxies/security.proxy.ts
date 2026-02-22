import { FastifyRequest, FastifyReply } from 'fastify';
import { env } from '@/config/env';
import { httpClient } from '@/utils/http-client';
import { proxyLogger } from '@/utils/logger';

export class SecurityProxy {
  private readonly baseUrl = env.AUTH_SERVICE_URL;

  async getSecurityOverview(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const params = request.query as Record<string, string>;
      const response = await httpClient.forward(`${this.baseUrl}/platform/security/overview`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get security overview proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }
}

export const securityProxy = new SecurityProxy();
