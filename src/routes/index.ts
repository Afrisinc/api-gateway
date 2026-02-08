import type { FastifyInstance } from 'fastify';
import { registerHealthRoutes } from './health.routes';
import { registerAuthRoutes } from './auth.routes';
import { registerContentRoutes } from './content.routes';
import { registerVpnMicroservice } from './vpn';

export const registerRoutes = async (app: FastifyInstance): Promise<void> => {
  // Health check routes
  await registerHealthRoutes(app);

  // API routes
  await registerAuthRoutes(app);
  await registerContentRoutes(app);

  // VPN Microservice (all routes prefixed with /vpn/)
  await registerVpnMicroservice(app);
};
