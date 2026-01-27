import { FastifyRequest, FastifyReply } from 'fastify';
import { env } from '@/config/env';
import { httpClient } from '@/utils/http-client';
import { proxyLogger } from '@/utils/logger';

export class ContentProxy {
  private readonly baseUrl = env.CONTENT_SERVICE_URL;

  async generateContent(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/ai/generate`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Generate content proxy failed');
      reply.status(503).send({ message: 'Content service unavailable' });
    }
  }
}

export const contentProxy = new ContentProxy();
