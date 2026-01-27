import { FastifyRequest, FastifyReply } from 'fastify';
import { env } from '@/config/env';
import { httpClient } from '@/utils/http-client';
import { proxyLogger } from '@/utils/logger';

export class MediaProxy {
  private readonly baseUrl = env.MEDIA_SERVICE_URL;

  async uploadMedia(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/media/upload`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Upload media proxy failed');
      reply.status(503).send({ message: 'Media service unavailable' });
    }
  }

  async getMedia(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params as { id: string };
      const response = await httpClient.forward(`${this.baseUrl}/media/${id}`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });

      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get media proxy failed');
      reply.status(503).send({ message: 'Media service unavailable' });
    }
  }

  async deleteMedia(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params as { id: string };
      const response = await httpClient.forward(`${this.baseUrl}/media/${id}`, {
        method: 'DELETE',
        headers: request.headers as Record<string, string>,
      });

      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Delete media proxy failed');
      reply.status(503).send({ message: 'Media service unavailable' });
    }
  }
}

export const mediaProxy = new MediaProxy();
