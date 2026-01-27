import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import { getCorsConfig } from '@/config/cors';
import { swaggerConfig, swaggerUiConfig } from '@/config/swagger';
import { errorHandler } from '@/middlewares/errorHandler';
import { rateLimitMiddleware } from '@/middlewares/rate-limit.middleware';
import { registerRoutes } from '@/routes/index';
import { logger, startupLogger } from '@/utils/logger';

/**
 * Creates and configures the Fastify API Gateway instance
 * Registers plugins, middlewares, error handlers, and routes
 */
const createApp = async (): Promise<FastifyInstance> => {
  const app = Fastify({
    trustProxy: true,
    ajv: {
      customOptions: {
        removeAdditional: 'all',
        useDefaults: true,
        coerceTypes: true,
        strict: false,
      },
    },
  });

  try {
    // Register CORS plugin for cross-origin requests
    startupLogger.info('Registering CORS plugin');
    const corsConfig = getCorsConfig();
    await app.register(fastifyCors, corsConfig);

    // Register Helmet for security headers
    startupLogger.info('Registering Helmet security plugin');
    await app.register(fastifyHelmet, {
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
      frameguard: {
        action: 'deny',
      },
      referrerPolicy: {
        policy: 'strict-origin-when-cross-origin',
      },
    });

    // Register Swagger documentation plugin
    startupLogger.info('Registering Swagger documentation plugin');
    await app.register(fastifySwagger, swaggerConfig);

    // Register Swagger UI plugin
    startupLogger.info('Registering Swagger UI plugin');
    await app.register(fastifySwaggerUI, swaggerUiConfig);

    // Register rate limiting middleware
    startupLogger.info('Registering rate limiting middleware');
    app.addHook('preHandler', rateLimitMiddleware);

    // Set global error handler
    app.setErrorHandler(errorHandler);

    // Register all application routes
    startupLogger.info('Registering application routes');
    await registerRoutes(app);

    // Log registered routes
    startupLogger.info(
      {
        routeCount: app.printRoutes().split('\n').length,
      },
      'Application routes registered successfully'
    );
  } catch (error) {
    logger.error(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      'Error during application initialization'
    );
    throw error;
  }

  return app;
};

export { createApp };
