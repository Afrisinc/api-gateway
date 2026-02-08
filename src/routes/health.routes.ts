import type { FastifyInstance } from 'fastify';
import { healthLogger } from '@/utils/logger';

export const registerHealthRoutes = async (app: FastifyInstance): Promise<void> => {
  app.get(
    '/health',
    {
      schema: {
        tags: ['Health'],
        description: 'Health check endpoint',
      },
    },
    async (_request, reply) => {
      healthLogger.debug('Health check request received');

      return reply.status(200).send({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
      });
    }
  );

  app.get(
    '/health/live',
    {
      schema: {
        tags: ['Health'],
        description: 'Liveness probe',
      },
    },
    async (_request, reply) => {
      return reply.status(200).send({ status: 'alive' });
    }
  );

  app.get(
    '/health/ready',
    {
      schema: {
        tags: ['Health'],
        description: 'Readiness probe',
      },
    },
    async (_request, reply) => {
      return reply.status(200).send({ status: 'ready' });
    }
  );
};
