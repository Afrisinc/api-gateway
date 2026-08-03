import { FastifyPluginAsync } from 'fastify';
import { routes } from './routes';
import fastifyMultipart from '@fastify/multipart';
import corsPlugin from './plugins/cors';
import swaggerPlugin from './plugins/swagger';
import errorHandlerPlugin from './plugins/errorHandlerPlugin';
import attachShema from './plugins/attachShema';
import authenticatePlugin from './plugins/authenticate';
import authorizePlugin from './plugins/authorize';
import rateLimitPlugin from './plugins/rateLimit';

export const app: FastifyPluginAsync = async fastify => {
  await fastify.register(corsPlugin);
  await fastify.register(fastifyMultipart);
  await fastify.register(errorHandlerPlugin);
  await fastify.register(attachShema);
  await fastify.register(rateLimitPlugin);
  await fastify.register(authenticatePlugin);
  await fastify.register(authorizePlugin);
  await fastify.register(routes);
  await fastify.register(swaggerPlugin);
};
