import type { FastifyInstance } from 'fastify';
import { registerHealthRoutes } from './health.routes';
import { registerAuthRoutes } from './auth.routes';
import { registerContentRoutes } from './content.routes';
import { registerUserRoutes } from './user.routes';
import { registerAccountRoutes } from './account.routes';
import { registerOrganizationRoutes } from './organization.routes';
import { registerPlatformRoutes } from './platform.routes';
import { registerProductRoutes } from './product.routes';
import { registerSecurityRoutes } from './security.routes';
import { registerVpnMicroservice } from './vpn';

export const registerRoutes = async (app: FastifyInstance): Promise<void> => {
  // Health check routes
  await registerHealthRoutes(app);

  // API routes - Auth Service
  await registerAuthRoutes(app);
  await registerUserRoutes(app);
  await registerAccountRoutes(app);
  await registerOrganizationRoutes(app);
  await registerPlatformRoutes(app);
  await registerProductRoutes(app);
  await registerSecurityRoutes(app);

  // API routes - Content Service
  await registerContentRoutes(app);

  // VPN Microservice (all routes prefixed with /vpn/)
  await registerVpnMicroservice(app);
};
