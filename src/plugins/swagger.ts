import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';
import { buildAggregatedSwaggerDocument, buildExternalApiSources, type OpenAPIObject } from './swaggerAggregator';
export default fp(async (fastify: FastifyInstance) => {
  const gatewayBaseSpec: OpenAPIObject = {
    openapi: '3.0.0',
    info: {
      title: 'API Gateway',
      description: 'API Gateway service',
      version: '1.0.0',
    },
    security: [{ bearerAuth: [] }],
    paths: {},
    tags: [],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: `Bearer Token Authentication
Format: Authorization: Bearer <jwt_token>`,
        },
      },
    },
  };

  await fastify.register(swagger, {
    openapi: gatewayBaseSpec as any,
  });

  const externalServices = buildExternalApiSources();

  let aggregatedDocument: Record<string, unknown> = {
    ...gatewayBaseSpec,
    paths: {},
    components: gatewayBaseSpec.components ?? {},
    tags: [],
  };

  const refreshAggregatedDocument = async (): Promise<void> => {
    try {
      const nextDocument = await buildAggregatedSwaggerDocument(gatewayBaseSpec, externalServices);
      aggregatedDocument = nextDocument as Record<string, unknown>;
    } catch (error) {
      console.error('Failed to refresh aggregated Swagger document', error);
    }
  };

  void refreshAggregatedDocument();

  await fastify.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'none',
      deepLinking: true,
    },

    transformSpecification: (spec: any): Record<string, unknown> => {
      const aggDoc = aggregatedDocument as OpenAPIObject;
      const merged: Record<string, unknown> = {
        ...spec,
        paths: {
          ...(spec.paths || {}),
          ...(aggDoc.paths || {}),
        },
        tags: [...(spec.tags || []), ...(aggDoc.tags || [])],
        components: {
          schemas: {
            ...(spec.components?.schemas || {}),
            ...(aggDoc.components?.schemas || {}),
          },
          securitySchemes: {
            ...(spec.components?.securitySchemes || {}),
            ...(aggDoc.components?.securitySchemes || {}),
          },
          responses: {
            ...(spec.components?.responses || {}),
            ...(aggDoc.components?.responses || {}),
          },
        },
      };

      return merged;
    },
    transformSpecificationClone: true,
  });
});
