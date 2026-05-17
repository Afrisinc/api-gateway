import { FastifyRequest, FastifyReply } from 'fastify';
import { env } from '@/config/env';
import { httpClient } from '@/utils/http-client';
import { proxyLogger } from '@/utils/logger';

export class NotificationProxy {
  private readonly baseUrl = env.NOTIFICATION_SERVICE_URL;

  /**
   * Platform Analytics Endpoints
   */
  async getAnalyticsOverview(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/admin/internal/platform/analytics/overview`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get analytics overview proxy failed');
      reply.status(503).send({ success: false, message: 'Notification service unavailable' });
    }
  }

  async getAnalyticsUsers(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const params = request.query as Record<string, string>;
      const response = await httpClient.forward(`${this.baseUrl}/admin/internal/platform/analytics/users`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get user analytics proxy failed');
      reply.status(503).send({ success: false, message: 'Notification service unavailable' });
    }
  }

  async getAnalyticsAccounts(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/admin/internal/platform/analytics/accounts`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get account analytics proxy failed');
      reply.status(503).send({ success: false, message: 'Notification service unavailable' });
    }
  }

  async getAnalyticsGrowth(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const params = request.query as Record<string, string>;
      const response = await httpClient.forward(`${this.baseUrl}/admin/internal/platform/analytics/growth`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get growth metrics proxy failed');
      reply.status(503).send({ success: false, message: 'Notification service unavailable' });
    }
  }

  async getAllUsers(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const params = request.query as Record<string, string>;
      const response = await httpClient.forward(`${this.baseUrl}/admin/internal/platform/users`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get all users proxy failed');
      reply.status(503).send({ success: false, message: 'Notification service unavailable' });
    }
  }

  async getUserById(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { userId } = request.params as { userId: string };
      const response = await httpClient.forward(`${this.baseUrl}/admin/internal/platform/users/${userId}`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get user by ID proxy failed');
      reply.status(503).send({ success: false, message: 'Notification service unavailable' });
    }
  }

  /**
   * Plans Management Endpoints
   * Backend: GET /api/admin/plans, GET /api/admin/plans/:planId
   */
  async getPlans(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/plans`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });
      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get plans proxy failed');
      reply.status(503).send({ success: false, message: 'Notification service unavailable' });
    }
  }

  /**
   * Account Listing — forwards to platform users endpoint
   * Backend: GET /admin/internal/platform/users
   */
  async getAccounts(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const params = request.query as Record<string, string>;
      const response = await httpClient.forward(`${this.baseUrl}/admin/internal/platform/users`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params,
      });
      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get accounts proxy failed');
      reply.status(503).send({ success: false, message: 'Notification service unavailable' });
    }
  }

  /**
   * Account Limit Overrides
   * Backend: GET /api/admin/accounts/:accountId/limit-overrides
   */
  async getAccountLimits(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { accountId } = request.params as { accountId: string };
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/accounts/${accountId}/limit-overrides`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });
      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get account limits proxy failed');
      reply.status(503).send({ success: false, message: 'Notification service unavailable' });
    }
  }

  /**
   * Set a single account limit override
   * Backend: POST /api/admin/accounts/:accountId/limit-override
   * Body: { metric, temporary_limit, reason? }
   */
  async setAccountLimitOverride(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { accountId } = request.params as { accountId: string };
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/accounts/${accountId}/limit-override`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });
      const statusCode = (response.data as any)?.success ? 201 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Set account limit override proxy failed');
      reply.status(503).send({ success: false, message: 'Notification service unavailable' });
    }
  }

  /**
   * Remove a single account limit override
   * Backend: DELETE /api/admin/accounts/:accountId/limit-overrides/:metric
   */
  async removeAccountLimitOverride(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { accountId, metric } = request.params as { accountId: string; metric: string };
      const response = await httpClient.forward(
        `${this.baseUrl}/api/admin/accounts/${accountId}/limit-overrides/${metric}`,
        { method: 'DELETE', headers: request.headers as Record<string, string> }
      );
      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Remove account limit override proxy failed');
      reply.status(503).send({ success: false, message: 'Notification service unavailable' });
    }
  }

  /**
   * Platform Security Endpoints
   */
  async getSecurityOverview(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const params = request.query as Record<string, string>;
      const response = await httpClient.forward(`${this.baseUrl}/admin/internal/platform/security/overview`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get security overview proxy failed');
      reply.status(503).send({ success: false, message: 'Notification service unavailable' });
    }
  }

  async getSecurityLoginEvents(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const params = request.query as Record<string, string>;
      const response = await httpClient.forward(`${this.baseUrl}/admin/internal/platform/security/loginevents`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get security login events proxy failed');
      reply.status(503).send({ success: false, message: 'Notification service unavailable' });
    }
  }
}

export const notificationProxy = new NotificationProxy();
