import type { FastifyInstance } from 'fastify';
import { productProxy } from '@/proxies/product.proxy';
import { ProductSchemas } from '@/types/product-schemas';
import { authGuard } from '@/middlewares/authGuard';

export const registerProductRoutes = async (app: FastifyInstance): Promise<void> => {
  /**
   * POST /products
   * Create a new product
   */
  app.post(
    '/products',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Products'],
        summary: 'Create product',
        description: 'Create a new product with name, code, and optional description. Requires authentication.',
        body: ProductSchemas.createProductRequest,
        response: {
          201: ProductSchemas.createProductResponse,
          400: ProductSchemas.errorResponse,
          401: ProductSchemas.errorResponse,
          503: ProductSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await productProxy.createProduct(request, reply);
    }
  );

  /**
   * GET /products/enrollments
   * Get all products with enrollment statistics
   */
  app.get(
    '/products/enrollments',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Products'],
        summary: 'Get products with enrollments',
        description:
          'Retrieve all products with enrollment counts by status (ACTIVE, SUSPENDED) and plan (FREE, PRO, ENTERPRISE). Requires authentication.',
        response: {
          200: ProductSchemas.getProductEnrollmentsResponse,
          400: ProductSchemas.errorResponse,
          401: ProductSchemas.errorResponse,
          503: ProductSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await productProxy.getProductEnrollments(request, reply);
    }
  );

  /**
   * GET /products/:productId/accounts
   * Get accounts enrolled in a specific product
   */
  app.get(
    '/products/:productId/accounts',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Products'],
        summary: 'Get product accounts',
        description:
          'Retrieve all accounts enrolled in a product with owner details and enrollment information. Requires authentication.',
        params: {
          type: 'object',
          properties: {
            productId: {
              type: 'string',
              description: 'Product ID',
            },
          },
          required: ['productId'],
        },
        querystring: ProductSchemas.getProductAccountsQuery,
        response: {
          200: ProductSchemas.getProductAccountsResponse,
          400: ProductSchemas.errorResponse,
          401: ProductSchemas.errorResponse,
          404: ProductSchemas.errorResponse,
          503: ProductSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await productProxy.getProductAccounts(request, reply);
    }
  );
};
