import fastify from 'fastify';
import { app } from './app';
import { env } from './config/env';
import logger from './utils/logger';

export const server = fastify({ logger: false });

const start = async () => {
  await server.register(app);
  await server.ready();
  await server.listen({ port: env.PORT });
  logger.info(`Gateway Is Running on ${env.PORT}`);
};

start();
