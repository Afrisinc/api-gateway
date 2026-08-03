import { FastifyInstance } from 'fastify';
import { createProxyHandler } from '@/proxies/proxyService';
import { HTTP_METHODS } from '@/config/http.config';

const registerProxyRoute = (fastify: FastifyInstance, envKey: string, prefix: string) => {
  const handler = createProxyHandler(envKey, prefix);
  const config = { preHandler: [fastify.rateLimit, fastify.authenticate, fastify.authorize] };

  HTTP_METHODS.forEach(method => {
    fastify.route({ method, url: `${prefix}/*`, handler, ...config });
  });
};

export async function authRoutes(fastify: FastifyInstance) {
  registerProxyRoute(fastify, 'AUTH_URL', '/auth');
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
