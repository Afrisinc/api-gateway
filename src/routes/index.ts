import type { FastifyInstance } from 'fastify';
import { registerHealthRoutes } from './health.routes';
import { registerAuthRoutes } from './auth.ms/auth.routes';
import { registerContentRoutes } from './content.routes';
import { registerUserRoutes } from './auth.ms/user.routes';
import { registerAccountRoutes } from './auth.ms/account.routes';
import { registerOrganizationRoutes } from './auth.ms/organization.routes';
import { registerPlatformRoutes } from './auth.ms/platform.routes';
import { registerProductRoutes } from './auth.ms/product.routes';
import { registerSecurityRoutes } from './auth.ms/security.routes';
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
