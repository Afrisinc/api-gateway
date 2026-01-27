import type { FastifyInstance } from 'fastify';
import { registerHealthRoutes } from './health.routes';
import { registerAuthRoutes } from './auth.routes';
import { registerContentRoutes } from './content.routes';

export const registerRoutes = async (app: FastifyInstance): Promise<void> => {
  // Health check routes
  await registerHealthRoutes(app);

  // API routes
  await registerAuthRoutes(app);
  await registerContentRoutes(app);
};
