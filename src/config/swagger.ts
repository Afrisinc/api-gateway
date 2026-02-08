import { env } from './env';
import type { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

/**
 * Get server URL based on environment
 */
const getServerUrl = (): string => {
  if (env.NODE_ENV === 'production') {
    return env.API_BASE_URL || 'https://api.afrisinc.com';
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
      // Auth Microservice
      { name: 'Auth', description: 'User authentication and account management' },

      // VPN Microservice
      { name: 'VPN Users', description: 'VPN user account management' },
      { name: 'Devices', description: 'Device registration and management' },
      { name: 'Servers', description: 'VPN server administration and management' },
      { name: 'Usage', description: 'User and device data usage statistics' },

      // Content Microservice
      { name: 'Content', description: 'Content management endpoints' },

      // System
      { name: 'Health', description: 'Health check and status endpoints' },
    ],
    'x-tagGroups': [
      {
        name: 'Authentication Service',
        description: 'User authentication, registration, and account management',
        tags: ['Auth'],
      },
      {
        name: 'VPN Microservice',
        description: 'Complete VPN management including users, devices, servers, and usage tracking',
        tags: ['VPN Users', 'Devices', 'Servers', 'Usage'],
      },
      {
        name: 'Content Service',
        description: 'Content management and delivery',
        tags: ['Content'],
      },
      {
        name: 'System',
        description: 'System health and monitoring',
        tags: ['Health'],
      },
    ] as any,
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
