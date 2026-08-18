import fastify from 'fastify';
import { app } from './app';
import { env } from './config/env';
import logger from './utils/logger';

export const server = fastify({
  logger: false,
  bodyLimit: 536870912, // 512MB for video files and bulk uploads
});

const start = async () => {
  await server.register(app);
  await server.ready();
  await server.listen({ port: env.PORT, host: '0.0.0.0' });
  logger.info(`Gateway Is Running on ${env.PORT}`);
};

start();
