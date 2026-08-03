import fp from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { authorize } from '@/middlewares/authorize.middleware';

declare module 'fastify' {
  interface FastifyInstance {
    authorize: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

async function authorizePlugin(fastify: FastifyInstance) {
  fastify.decorate('authorize', authorize);
}

export default fp(authorizePlugin, {
  name: 'authorize',
  fastify: '4.x',
});
