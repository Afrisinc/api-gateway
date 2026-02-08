import type { FastifyInstance } from 'fastify';
import { vpnProxy } from '@/proxies/vpn.proxy';
import { UsageSchemas } from '@/types/usage-schemas';

export const registerUsageRoutes = async (app: FastifyInstance): Promise<void> => {
  /**
   * GET /vpn/users/{userId}/usage
   * Get aggregated usage statistics for a user
   */
  app.get(
    '/vpn/users/:userId/usage',
    {
      schema: {
        tags: ['Usage'],
        summary: 'Get User Total Usage',
        description: 'Retrieve aggregated data usage statistics for a user across all connected devices.',
        params: {
          type: 'object',
          properties: {
            userId: { type: 'string', description: 'The unique identifier of the user (UUID)' },
          },
          required: ['userId'],
        },
        response: {
          200: UsageSchemas.getUserUsageResponse,
          400: UsageSchemas.errorResponse,
          404: UsageSchemas.errorResponse,
          500: UsageSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await vpnProxy.getUserUsage(request, reply);
    }
  );
};
