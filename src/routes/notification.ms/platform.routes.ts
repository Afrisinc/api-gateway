import type { FastifyInstance } from 'fastify';
import { notificationProxy } from '@/proxies/notification.proxy';

export const registerNotificationPlatformRoutes = async (app: FastifyInstance): Promise<void> => {
  /**
   * GET /notifications/analytics/overview
   * Get platform analytics overview
   */
  app.get(
    '/notifications/analytics/overview',
    {
      schema: {
        tags: ['Notifications - Core'],
        summary: 'Analytics Overview',
        description: 'Get platform analytics overview dashboard data',
        response: {
          200: { type: 'object', additionalProperties: true },
          503: { type: 'object', additionalProperties: true },
        },
      },
    },
    async (request, reply) => {
      await notificationProxy.getAnalyticsOverview(request, reply);
    }
  );

  /**
   * GET /notifications/analytics/users
   * Get user analytics data
   */
  app.get(
    '/notifications/analytics/users',
    {
      schema: {
        tags: ['Notifications - Core'],
        summary: 'User Analytics',
        description: 'Get detailed user analytics and statistics',
        response: {
          200: { type: 'object', additionalProperties: true },
          503: { type: 'object', additionalProperties: true },
        },
      },
    },
    async (request, reply) => {
      await notificationProxy.getAnalyticsUsers(request, reply);
    }
  );

  /**
   * GET /notifications/analytics/accounts
   * Get account analytics data
   */
  app.get(
    '/notifications/analytics/accounts',
    {
      schema: {
        tags: ['Notifications - Core'],
        summary: 'Account Analytics',
        description: 'Get account-level analytics and insights',
        response: {
          200: { type: 'object', additionalProperties: true },
          503: { type: 'object', additionalProperties: true },
        },
      },
    },
    async (request, reply) => {
      await notificationProxy.getAnalyticsAccounts(request, reply);
    }
  );

  /**
   * GET /notifications/analytics/growth
   * Get growth metrics
   */
  app.get(
    '/notifications/analytics/growth',
    {
      schema: {
        tags: ['Notifications - Core'],
        summary: 'Growth Metrics',
        description: 'Get platform growth metrics and trends',
        response: {
          200: { type: 'object', additionalProperties: true },
          503: { type: 'object', additionalProperties: true },
        },
      },
    },
    async (request, reply) => {
      await notificationProxy.getAnalyticsGrowth(request, reply);
    }
  );

  /**
   * GET /notifications/users
   * Get all users with accounts and organizations
   */
  app.get(
    '/notifications/users',
    {
      schema: {
        tags: ['Notifications - Users'],
        summary: 'Get All Users',
        description: 'Retrieve all users with their accounts and organization information',
        response: {
          200: { type: 'object', additionalProperties: true },
          503: { type: 'object', additionalProperties: true },
        },
      },
    },
    async (request, reply) => {
      await notificationProxy.getAllUsers(request, reply);
    }
  );

  /**
   * GET /notifications/users/:userId
   * Get specific user with details
   */
  app.get(
    '/notifications/users/:userId',
    {
      schema: {
        tags: ['Notifications - Users'],
        summary: 'Get User By ID',
        description: 'Retrieve specific user details including accounts and organization info',
        params: {
          type: 'object',
          required: ['userId'],
          properties: {
            userId: { type: 'string', description: 'User ID' },
          },
        },
        response: {
          200: { type: 'object', additionalProperties: true },
          503: { type: 'object', additionalProperties: true },
        },
      },
    },
    async (request, reply) => {
      await notificationProxy.getUserById(request, reply);
    }
  );
};
