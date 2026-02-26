import type { FastifyInstance } from 'fastify';
import { securityProxy } from '@/proxies/security.proxy';
import { SecuritySchemas } from '@/types/security-schemas';
import { authGuard } from '@/middlewares/authGuard';

export const registerSecurityRoutes = async (app: FastifyInstance): Promise<void> => {
  /**
   * GET /platform/security/overview
   * Get security overview with failed logins, top IPs, and suspicious activity
   */
  app.get(
    '/platform/security/overview',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Security'],
        summary: 'Security overview',
        description:
          'Returns comprehensive security monitoring data including failed login attempts, top attacking IPs, token issuance counts, and suspicious activity status. Requires authentication.',
        querystring: SecuritySchemas.getSecurityOverviewQuery,
        response: {
          200: SecuritySchemas.getSecurityOverviewResponse,
          400: SecuritySchemas.errorResponse,
          401: SecuritySchemas.errorResponse,
          503: SecuritySchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await securityProxy.getSecurityOverview(request, reply);
    }
  );
  app.get(
    '/platform/security/loginevents',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Security'],
        summary: 'Login events',
        description: 'Returns login events. Requires authentication.',
        querystring: SecuritySchemas.getSecurityLoginEventsQuery,
        response: {
          200: SecuritySchemas.getSecurityLoginEventsResponse,
          400: SecuritySchemas.errorResponse,
          401: SecuritySchemas.errorResponse,
          503: SecuritySchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await securityProxy.getSecurityLoginEvents(request, reply);
    }
  );
};
