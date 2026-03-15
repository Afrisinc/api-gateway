import type { FastifyInstance } from 'fastify';
import { registerNotificationPlatformRoutes } from './platform.routes';
import { registerNotificationSecurityRoutes } from './security.routes';

export const registerNotificationRoutes = async (app: FastifyInstance): Promise<void> => {
  await registerNotificationPlatformRoutes(app);
  await registerNotificationSecurityRoutes(app);
};
