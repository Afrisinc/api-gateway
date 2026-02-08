import type { FastifyInstance } from 'fastify';
import { registerVpnRoutes } from './users.routes';
import { registerDeviceRoutes } from './devices.routes';
import { registerServerRoutes } from './servers.routes';
import { registerUsageRoutes } from './usage.routes';

/**
 * VPN Microservice Routes
 * All routes are prefixed with /vpn/
 */
export const registerVpnMicroservice = async (app: FastifyInstance): Promise<void> => {
  await app.register(
    async fastify => {
      // Register all VPN-related route handlers
      await registerVpnRoutes(fastify);
      await registerDeviceRoutes(fastify);
      await registerServerRoutes(fastify);
      await registerUsageRoutes(fastify);
    },
    { prefix: '/vpn' }
  );
};
