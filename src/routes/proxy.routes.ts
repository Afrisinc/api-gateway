import { FastifyInstance } from 'fastify';
import { createProxyHandler } from '@/proxies/proxyService';
import { HTTP_METHODS, PUBLIC_ENDPOINTS } from '@/config/http.config';

const registerProxyRoute = (fastify: FastifyInstance, envKey: string, prefix: string) => {
  const handler = createProxyHandler(envKey, prefix);
  const config = {
    preHandler: [fastify.rateLimit, fastify.authenticate, fastify.authorize],
  };

  HTTP_METHODS.forEach(method => {
    fastify.route({
      method,
      url: `${prefix}/*`,
      handler,
      ...config,
    });
  });
};

export async function authRoutes(fastify: FastifyInstance) {
  const handler = createProxyHandler('AUTH_URL', '/auth');
  const protectedConfig = {
    preHandler: [fastify.rateLimit, fastify.authenticate, fastify.authorize],
  };
  const publicConfig = { preHandler: [fastify.rateLimit] };

  // Register all specific public endpoints first
  PUBLIC_ENDPOINTS.forEach(endpoint => {
    HTTP_METHODS.forEach(method => {
      fastify.route({
        method,
        url: endpoint,
        handler,
        ...publicConfig,
      });
    });
  });

  // Register catch-all protected routes last (less specific, lower priority)
  HTTP_METHODS.forEach(method => {
    fastify.route({
      method,
      url: '/auth/*',
      handler,
      ...protectedConfig,
    });
  });
}

export async function mediaRoutes(fastify: FastifyInstance) {
  registerProxyRoute(fastify, 'MEDIA_URL', '/media');
}

export async function notifyRoutes(fastify: FastifyInstance) {
  registerProxyRoute(fastify, 'NOTIFY_URL', '/notify');
}

export async function vpnRoutes(fastify: FastifyInstance) {
  registerProxyRoute(fastify, 'VPN_URL', '/vpn');
}

export async function payRoutes(fastify: FastifyInstance) {
  registerProxyRoute(fastify, 'PAY_URL', '/pay');
}
