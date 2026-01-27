import { env } from './env';
import type { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

/**
 * Get server URL based on environment
 */
const getServerUrl = (): string => {
  if (env.NODE_ENV === 'production') {
    return process.env.API_BASE_URL || 'https://api.afrisinc.com';
  }
  return `http://localhost:${env.PORT}`;
};

/**
 * Fastify Swagger Plugin Configuration (OpenAPI 3.0)
 * API Gateway documentation
 */
export const swaggerConfig = {
  mode: 'dynamic' as const,
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Afrisinc API Gateway',
      description:
        'Production-ready API Gateway for Afrisinc microservices architecture. ' +
        'Routes requests to Auth, Content, and Media services with JWT authentication.',
      version: '1.0.0',
      contact: {
        name: 'Afrisinc Engineering',
        url: 'https://afrisinc.com',
        email: 'info@afrisinc.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: getServerUrl(),
        description: env.NODE_ENV === 'production' ? 'Production' : 'Development',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http' as const,
          scheme: 'bearer' as const,
          bearerFormat: 'JWT',
          description: 'JWT Bearer token. Include in header: "Authorization: Bearer <token>"',
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Content', description: 'Content management endpoints' },
      { name: 'Default', description: 'Default endpoints' },
    ],
    externalDocs: {
      description: 'Afrisinc Documentation',
      url: 'https://afrisinc.com',
    },
  },
  hideUntagged: false,
};

/**
 * Swagger UI Configuration
 */
export const swaggerUiConfig: FastifySwaggerUiOptions = {
  routePrefix: '/docs',
  staticCSP: false,
  uiConfig: {
    layout: 'BaseLayout',
    deepLinking: true,
    docExpansion: 'none',
    defaultModelExpandDepth: 2,
    filter: true,
    tryItOutEnabled: true,
    persistAuthorization: true,
    displayOperationId: false,
  },
  transformSpecificationClone: true,
};
