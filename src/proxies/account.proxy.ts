import { FastifyRequest, FastifyReply } from 'fastify';
import { env } from '@/config/env';
import { httpClient } from '@/utils/http-client';
import { proxyLogger } from '@/utils/logger';

export class AccountProxy {
  private readonly baseUrl = env.AUTH_SERVICE_URL;

  async getAllAccounts(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const querystring = request.query as Record<string, string>;
      const response = await httpClient.forward(`${this.baseUrl}/accounts/all`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        querystring,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get all accounts proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async getUserAccounts(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/accounts`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get user accounts proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async getUserAccountsById(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { userId } = request.params as { userId: string };
      const response = await httpClient.forward(`${this.baseUrl}/accounts/user/${userId}`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get user accounts by ID proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async getAccount(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { accountId } = request.params as { accountId: string };
      const response = await httpClient.forward(`${this.baseUrl}/accounts/${accountId}`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get account proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async getAccountProducts(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { accountId } = request.params as { accountId: string };
      const response = await httpClient.forward(`${this.baseUrl}/accounts/${accountId}/products`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get account products proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async enrollProduct(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { accountId } = request.params as { accountId: string };
      const response = await httpClient.forward(`${this.baseUrl}/accounts/${accountId}/enroll-product`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      const statusCode = (response.data as any)?.success ? 201 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Enroll product proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async switchProduct(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/auth/switch-product`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Switch product proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }
}

export const accountProxy = new AccountProxy();
