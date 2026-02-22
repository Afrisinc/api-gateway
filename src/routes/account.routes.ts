import type { FastifyInstance } from 'fastify';
import { accountProxy } from '@/proxies/account.proxy';
import { AccountSchemas } from '@/types/account-schemas';
import { authGuard } from '@/middlewares/authGuard';

export const registerAccountRoutes = async (app: FastifyInstance): Promise<void> => {
  /**
   * GET /accounts/all
   * Get all accounts with pagination and filtering
   */
  app.get(
    '/accounts/all',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Accounts'],
        summary: 'Get all accounts',
        description:
          'Retrieve a paginated list of all accounts with optional search and type filtering. Requires authentication.',
        querystring: AccountSchemas.getAllAccountsQuery,
        response: {
          200: AccountSchemas.getAllAccountsResponse,
          400: AccountSchemas.errorResponse,
          401: AccountSchemas.errorResponse,
          503: AccountSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await accountProxy.getAllAccounts(request, reply);
    }
  );

  /**
   * GET /accounts
   * Get all accounts for authenticated user
   */
  app.get(
    '/accounts',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Accounts'],
        summary: 'Get user accounts',
        description: 'Retrieve all accounts belonging to the authenticated user. Requires authentication.',
        response: {
          200: AccountSchemas.getUserAccountsResponse,
          401: AccountSchemas.errorResponse,
          503: AccountSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await accountProxy.getUserAccounts(request, reply);
    }
  );

  /**
   * GET /accounts/user/:userId
   * Get accounts for a specific user
   */
  app.get(
    '/accounts/user/:userId',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Accounts'],
        summary: 'Get user accounts by ID',
        description: 'Retrieve accounts for a specific user by user ID. Requires authentication.',
        params: {
          type: 'object',
          properties: {
            userId: {
              type: 'string',
              description: 'User ID',
            },
          },
          required: ['userId'],
        },
        response: {
          200: AccountSchemas.getUserAccountsResponse,
          401: AccountSchemas.errorResponse,
          404: AccountSchemas.errorResponse,
          503: AccountSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await accountProxy.getUserAccountsById(request, reply);
    }
  );

  /**
   * GET /accounts/:accountId
   * Get specific account details
   */
  app.get(
    '/accounts/:accountId',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Accounts'],
        summary: 'Get account details',
        description: 'Retrieve account information and enrolled products. Requires authentication.',
        params: {
          type: 'object',
          properties: {
            accountId: {
              type: 'string',
              description: 'Account ID',
            },
          },
          required: ['accountId'],
        },
        response: {
          200: AccountSchemas.getAccountByIdResponse,
          401: AccountSchemas.errorResponse,
          404: AccountSchemas.errorResponse,
          503: AccountSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await accountProxy.getAccount(request, reply);
    }
  );

  /**
   * GET /accounts/:accountId/products
   * Get products enrolled by account
   */
  app.get(
    '/accounts/:accountId/products',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Accounts', 'Products'],
        summary: 'Get account products',
        description: 'Retrieve all products the account is enrolled in. Requires authentication.',
        params: {
          type: 'object',
          properties: {
            accountId: {
              type: 'string',
              description: 'Account ID',
            },
          },
          required: ['accountId'],
        },
        response: {
          200: AccountSchemas.getAccountProductsResponse,
          401: AccountSchemas.errorResponse,
          404: AccountSchemas.errorResponse,
          503: AccountSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await accountProxy.getAccountProducts(request, reply);
    }
  );

  /**
   * POST /accounts/:accountId/enroll-product
   * Enroll account in a product
   */
  app.post(
    '/accounts/:accountId/enroll-product',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Accounts', 'Products'],
        summary: 'Enroll in product',
        description: 'Register an account for a specific product with a chosen plan. Requires authentication.',
        params: {
          type: 'object',
          properties: {
            accountId: {
              type: 'string',
              description: 'Account ID',
            },
          },
          required: ['accountId'],
        },
        body: AccountSchemas.enrollProductRequest,
        response: {
          201: AccountSchemas.enrollProductResponse,
          400: AccountSchemas.errorResponse,
          401: AccountSchemas.errorResponse,
          503: AccountSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await accountProxy.enrollProduct(request, reply);
    }
  );

  /**
   * POST /auth/switch-product
   * Switch to product context and get product-scoped token
   */
  app.post(
    '/auth/switch-product',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Auth', 'Products'],
        summary: 'Switch product context',
        description:
          'Get a product-scoped token for accessing a specific product. Requires authentication and account enrollment.',
        body: AccountSchemas.switchProductRequest,
        response: {
          200: AccountSchemas.switchProductResponse,
          400: AccountSchemas.errorResponse,
          401: AccountSchemas.errorResponse,
          503: AccountSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await accountProxy.switchProduct(request, reply);
    }
  );
};
