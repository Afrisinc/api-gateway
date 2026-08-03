import { FastifyPluginAsync } from 'fastify';
import { authRoutes, mediaRoutes, notifyRoutes, vpnRoutes, payRoutes } from './proxy.routes';

export const routes: FastifyPluginAsync = async fastify => {
  await fastify.register(authRoutes);
  await fastify.register(mediaRoutes);
  await fastify.register(notifyRoutes);
  await fastify.register(vpnRoutes);
  await fastify.register(payRoutes);
};
