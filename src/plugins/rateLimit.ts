import fp from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { rateLimitMiddleware } from '@/middlewares/rate-limit.middleware';

declare module 'fastify' {
  interface FastifyInstance {
    rateLimit: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

async function rateLimitPlugin(fastify: FastifyInstance) {
  fastify.decorate('rateLimit', rateLimitMiddleware);
}

export default fp(rateLimitPlugin, {
  name: 'rateLimit',
  fastify: '4.x',
});
