import { FastifyRequest, FastifyReply } from 'fastify';
import { env } from '@/config/env';
import { httpClient } from '@/utils/http-client';
import { proxyLogger } from '@/utils/logger';

export class ProductProxy {
  private readonly baseUrl = env.AUTH_SERVICE_URL;

  async createProduct(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/products`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      const statusCode = (response.data as any)?.success ? 201 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Create product proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async getProductEnrollments(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/products/enrollments`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get product enrollments proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async getProductAccounts(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { productId } = request.params as { productId: string };
      const querystring = request.query as Record<string, string>;
      const response = await httpClient.forward(`${this.baseUrl}/products/${productId}/accounts`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        querystring,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get product accounts proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }
}

export const productProxy = new ProductProxy();
