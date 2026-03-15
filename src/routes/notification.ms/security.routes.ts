import type { FastifyInstance } from 'fastify';
import { notificationProxy } from '@/proxies/notification.proxy';

export const registerNotificationSecurityRoutes = async (app: FastifyInstance): Promise<void> => {
  /**
   * GET /notifications/security/overview
   * Get security overview with failed logins, top IPs, and suspicious activity
   */
  app.get(
    '/notifications/security/overview',
    {
      schema: {
        tags: ['Notifications - Security'],
        summary: 'Security Overview',
        description: 'Get security overview including failed logins, suspicious IPs, and activity alerts',
        response: {
          200: { type: 'object', additionalProperties: true },
          503: { type: 'object', additionalProperties: true },
        },
      },
    },
    async (request, reply) => {
      await notificationProxy.getSecurityOverview(request, reply);
    }
  );

  /**
   * GET /notifications/security/loginevents
   * Get login events with pagination and search
   */
  app.get(
    '/notifications/security/loginevents',
    {
      schema: {
        tags: ['Notifications - Security'],
        summary: 'Login Events',
        description: 'Retrieve login events with pagination, filtering, and search capabilities',
        querystring: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number for pagination' },
            limit: { type: 'number', description: 'Number of records per page' },
            search: { type: 'string', description: 'Search query for filtering events' },
          },
        },
        response: {
          200: { type: 'object', additionalProperties: true },
          503: { type: 'object', additionalProperties: true },
        },
      },
    },
    async (request, reply) => {
      await notificationProxy.getSecurityLoginEvents(request, reply);
    }
  );
};
