import fp from 'fastify-plugin';
import { FastifyPluginAsync, FastifyError } from 'fastify';
import { ResponseHandler } from '../utils/response';
import { logger } from '../utils/logger';

const errorHandlerPlugin: FastifyPluginAsync = fp(async fastify => {
  fastify.setErrorHandler((error: FastifyError, request, reply) => {
    const statusCode = error.statusCode || 500;
    const connectionErrors = ['ECONNREFUSED', 'ETIMEDOUT', 'ENOTFOUND', 'ECONNRESET', 'EHOSTUNREACH'];

    let message = error.message || 'An error occurred';

    if (connectionErrors.includes((error as any).code)) {
      message = 'Service unavailable. Please try again later.';
    }

    if (statusCode === 403) {
      return reply.status(403).send({
        statusCode: 403,
        error: 'Forbidden',
        message,
      });
    }

    if (statusCode === 500) {
      logger.error({ error }, '500 Error');
    }

    return ResponseHandler.error(reply, 1001, message, statusCode);
  });

  fastify.setNotFoundHandler((request, reply) => {
    logger.warn(`Route not found: ${request.method} ${request.url}`);
    return ResponseHandler.error(reply, 1001, 'Route not found', 404);
  });
});

export default errorHandlerPlugin;
