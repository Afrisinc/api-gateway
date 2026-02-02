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

  async getArticles(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/articles`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params: request.query as Record<string, unknown>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get articles proxy failed');
      reply.status(503).send({ success: false, message: 'Content service unavailable', error: 'Service unavailable' });
    }
  }

  async getArticlesByCategory(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { category } = request.params as { category: string };
      const response = await httpClient.forward(`${this.baseUrl}/articles/category/${category}`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params: request.query as Record<string, unknown>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get articles by category proxy failed');
      reply.status(503).send({ success: false, message: 'Content service unavailable', error: 'Service unavailable' });
    }
  }

  async getArticleById(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params as { id: string };
      const response = await httpClient.forward(`${this.baseUrl}/articles/${id}`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get article by ID proxy failed');
      reply.status(503).send({ success: false, message: 'Content service unavailable', error: 'Service unavailable' });
    }
  }

  async getAllGeneratedPosts(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/generated-posts`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params: request.query as Record<string, unknown>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get all generated posts proxy failed');
      reply.status(503).send({ success: false, message: 'Content service unavailable', error: 'Service unavailable' });
    }
  }

  async getGeneratedPostsByPlatform(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { platform } = request.params as { platform: string };
      const response = await httpClient.forward(`${this.baseUrl}/generated-posts/platform/${platform}`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params: request.query as Record<string, unknown>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get generated posts by platform proxy failed');
      reply.status(503).send({ success: false, message: 'Content service unavailable', error: 'Service unavailable' });
    }
  }

  async getGeneratedPostsByStatus(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { status } = request.params as { status: string };
      const response = await httpClient.forward(`${this.baseUrl}/generated-posts/status/${status}`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params: request.query as Record<string, unknown>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get generated posts by status proxy failed');
      reply.status(503).send({ success: false, message: 'Content service unavailable', error: 'Service unavailable' });
    }
  }

  async getGeneratedPostById(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params as { id: string };
      const response = await httpClient.forward(`${this.baseUrl}/generated-posts/${id}`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get generated post by ID proxy failed');
      reply.status(503).send({ success: false, message: 'Content service unavailable', error: 'Service unavailable' });
    }
  }

  async createGeneratedPost(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/generated-posts`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      const statusCode = (response.data as any)?.success ? 201 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Create generated post proxy failed');
      reply.status(503).send({ success: false, message: 'Content service unavailable', error: 'Service unavailable' });
    }
  }

  async updateGeneratedPost(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params as { id: string };
      const response = await httpClient.forward(`${this.baseUrl}/generated-posts/${id}`, {
        method: 'PUT',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Update generated post proxy failed');
      reply.status(503).send({ success: false, message: 'Content service unavailable', error: 'Service unavailable' });
    }
  }

  async deleteGeneratedPost(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params as { id: string };
      const response = await httpClient.forward(`${this.baseUrl}/generated-posts/${id}`, {
        method: 'DELETE',
        headers: request.headers as Record<string, string>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Delete generated post proxy failed');
      reply.status(503).send({ success: false, message: 'Content service unavailable', error: 'Service unavailable' });
    }
  }
}

export const contentProxy = new ContentProxy();
