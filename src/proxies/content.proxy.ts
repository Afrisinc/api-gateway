import { FastifyRequest, FastifyReply } from 'fastify';
import { env } from '@/config/env';
import { httpClient } from '@/utils/http-client';
import { proxyLogger } from '@/utils/logger';

export class ContentProxy {
  private readonly baseUrl = env.CONTENT_SERVICE_URL;

  async generateContent(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/content/ai/generate`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      const statusCode = (response.data as any)?.success ? 201 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Generate content proxy failed');
      reply.status(503).send({ success: false, message: 'Content service unavailable', error: 'Service unavailable' });
    }
  }
}

export const contentProxy = new ContentProxy();
