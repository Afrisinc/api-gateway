import type { FastifyInstance } from 'fastify';
import { platformProxy } from '@/proxies/platform.proxy';
import { PlatformSchemas } from '@/types/platform-schemas';
import { authGuard } from '@/middlewares/authGuard';

export const registerPlatformRoutes = async (app: FastifyInstance): Promise<void> => {
  /**
   * GET /platform/analytics/overview
   * Get analytics overview
   */
  app.get(
    '/platform/analytics/overview',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Platform Analytics'],
        summary: 'Analytics overview',
        description:
          'Retrieve high-level statistics about users, accounts, and product enrollments. Requires authentication and platform_admin role.',
        response: {
          200: PlatformSchemas.analyticsOverviewResponse,
          403: PlatformSchemas.errorResponse,
          503: PlatformSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await platformProxy.getAnalyticsOverview(request, reply);
    }
  );

  /**
   * GET /platform/analytics/users
   * Get user analytics
   */
  app.get(
    '/platform/analytics/users',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Platform Analytics'],
        summary: 'User analytics',
        description:
          'Retrieve user statistics including new, verified, and active users in a date range. Requires authentication and platform_admin role.',
        querystring: PlatformSchemas.userAnalyticsQuery,
        response: {
          200: PlatformSchemas.userAnalyticsResponse,
          403: PlatformSchemas.errorResponse,
          503: PlatformSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await platformProxy.getAnalyticsUsers(request, reply);
    }
  );

  /**
   * GET /platform/analytics/accounts
   * Get account analytics
   */
  app.get(
    '/platform/analytics/accounts',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Platform Analytics'],
        summary: 'Account analytics',
        description:
          'Retrieve account statistics including individual and organization accounts. Requires authentication and platform_admin role.',
        response: {
          200: PlatformSchemas.accountAnalyticsResponse,
          403: PlatformSchemas.errorResponse,
          503: PlatformSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await platformProxy.getAnalyticsAccounts(request, reply);
    }
  );

  /**
   * GET /platform/analytics/products
   * Get product analytics
   */
  app.get(
    '/platform/analytics/products',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Platform Analytics'],
        summary: 'Product analytics',
        description:
          'Retrieve detailed product enrollment statistics including plan distribution. Requires authentication and platform_admin role.',
        response: {
          200: PlatformSchemas.productAnalyticsResponse,
          403: PlatformSchemas.errorResponse,
          503: PlatformSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await platformProxy.getAnalyticsProducts(request, reply);
    }
  );

  /**
   * GET /platform/analytics/growth
   * Get growth metrics
   */
  app.get(
    '/platform/analytics/growth',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Platform Analytics'],
        summary: 'Growth metrics',
        description:
          'Retrieve daily growth aggregation for users, accounts, and enrollments. Requires authentication and platform_admin role.',
        querystring: PlatformSchemas.growthMetricsQuery,
        response: {
          200: PlatformSchemas.growthMetricsResponse,
          403: PlatformSchemas.errorResponse,
          503: PlatformSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await platformProxy.getAnalyticsGrowth(request, reply);
    }
  );
};
