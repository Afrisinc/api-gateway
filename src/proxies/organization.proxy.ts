import { FastifyRequest, FastifyReply } from 'fastify';
import { env } from '@/config/env';
import { httpClient } from '@/utils/http-client';
import { proxyLogger } from '@/utils/logger';

export class OrganizationProxy {
  private readonly baseUrl = env.AUTH_SERVICE_URL;

  async getAllOrganizations(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const params = request.query as Record<string, string>;
      const response = await httpClient.forward(`${this.baseUrl}/organizations`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get all organizations proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async createOrganization(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/organizations`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      const statusCode = (response.data as any)?.success ? 201 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Create organization proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async getOrganization(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { organizationId } = request.params as { organizationId: string };
      const response = await httpClient.forward(`${this.baseUrl}/organizations/${organizationId}`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get organization proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async updateOrganization(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { organizationId } = request.params as { organizationId: string };
      const response = await httpClient.forward(`${this.baseUrl}/organizations/${organizationId}`, {
        method: 'PUT',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Update organization proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async addMember(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { organizationId } = request.params as { organizationId: string };
      const response = await httpClient.forward(`${this.baseUrl}/organizations/${organizationId}/members`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      const statusCode = (response.data as any)?.success ? 201 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Add member proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async removeMember(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { organizationId, userId } = request.params as { organizationId: string; userId: string };
      const response = await httpClient.forward(`${this.baseUrl}/organizations/${organizationId}/members/${userId}`, {
        method: 'DELETE',
        headers: request.headers as Record<string, string>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Remove member proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async listMembers(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { organizationId } = request.params as { organizationId: string };
      const response = await httpClient.forward(`${this.baseUrl}/organizations/${organizationId}/members`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'List members proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }
}

export const organizationProxy = new OrganizationProxy();
