import type { FastifyInstance } from 'fastify';
import { contentProxy } from '@/proxies/content.proxy';
import { authMiddleware } from '@/middlewares/authGuard';
import { ContentSchemas } from '@/types/content-schemas';

export const registerContentRoutes = async (app: FastifyInstance): Promise<void> => {
  // AI Content Generation
  app.post(
    '/content/ai/generate',
    {
      onRequest: authMiddleware,
      schema: {
        tags: ['Content'],
        summary: 'Generate Content with AI',
        description: 'Generate content using AI with a specified prompt (requires authentication)',
        security: [{ bearerAuth: [] }],
        body: ContentSchemas.aiGenerateRequest,
        response: {
          200: ContentSchemas.aiGenerateResponse,
          400: ContentSchemas.errorResponse,
          401: ContentSchemas.errorResponse,
          503: ContentSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await contentProxy.generateContent(request, reply);
    }
  );
  app.get(
    '/articles',
    {
      schema: {
        tags: ['Content'],
        summary: 'Get Articles',
        description: "Retrieve a list of articles with search and pagination (doesn't require authentication)",
        querystring: {
          type: 'object',
          properties: {
            search: {
              type: 'string',
              description: 'Search term to filter articles by headline, summary, or creator',
            },
            page: {
              type: ['integer', 'string'],
              minimum: 1,
              default: 1,
              description: 'Page number for pagination',
            },
            limit: {
              type: ['integer', 'string'],
              minimum: 1,
              maximum: 100,
              default: 10,
              description: 'Number of articles per page',
            },
          },
        },
        response: {
          200: ContentSchemas.getAllArticlesResponse,
          400: ContentSchemas.errorResponse,
          503: ContentSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await contentProxy.getArticles(request, reply);
    }
  );
  app.get(
    '/articles/category/:category',
    {
      schema: {
        tags: ['Content'],
        summary: 'Get Articles by Category',
        description: "Retrieve a list of articles in a specific category (doesn't require authentication)",
        params: {
          type: 'object',
          required: ['category'],
          properties: {
            category: {
              type: 'string',
              description: 'Article category to filter by',
            },
          },
        },
        querystring: {
          type: 'object',
          properties: {
            page: {
              type: ['integer', 'string'],
              minimum: 1,
              default: 1,
              description: 'Page number for pagination',
            },
            limit: {
              type: ['integer', 'string'],
              minimum: 1,
              maximum: 100,
              default: 10,
              description: 'Number of articles per page',
            },
          },
        },
        response: {
          200: ContentSchemas.getArticlesByCategoryResponse,
          400: ContentSchemas.errorResponse,
          503: ContentSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await contentProxy.getArticlesByCategory(request, reply);
    }
  );
  app.get(
    '/articles/:id',
    {
      schema: {
        tags: ['Content'],
        summary: 'Get Article by ID',
        description: "Retrieve a specific article by its ID (doesn't require authentication)",
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: {
              type: 'string',
              description: 'Article ID (numeric)',
            },
          },
        },
        response: {
          200: ContentSchemas.getArticleByIdResponse,
          400: ContentSchemas.errorResponse,
          404: ContentSchemas.errorResponse,
          503: ContentSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await contentProxy.getArticleById(request, reply);
    }
  );

  // Generated Posts Endpoints
  app.get(
    '/generated-posts',
    {
      onRequest: authMiddleware,
      schema: {
        tags: ['Generated Posts'],
        summary: 'Get All Generated Posts',
        description: 'Get all generated posts with pagination (requires authentication)',
        security: [{ bearerAuth: [] }],
        querystring: {
          type: 'object',
          properties: {
            page: {
              type: ['integer', 'string'],
              minimum: 1,
              default: 1,
              description: 'Page number for pagination',
            },
            limit: {
              type: ['integer', 'string'],
              minimum: 1,
              maximum: 100,
              default: 10,
              description: 'Number of posts per page',
            },
          },
        },
        response: {
          200: ContentSchemas.getAllGeneratedPostsResponse,
          400: ContentSchemas.errorResponse,
          401: ContentSchemas.errorResponse,
          503: ContentSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await contentProxy.getAllGeneratedPosts(request, reply);
    }
  );

  app.get(
    '/generated-posts/platform/:platform',
    {
      onRequest: authMiddleware,
      schema: {
        tags: ['Generated Posts'],
        summary: 'Get Generated Posts by Platform',
        description: 'Get generated posts by platform with pagination (requires authentication)',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['platform'],
          properties: {
            platform: {
              type: 'string',
              description: 'Platform to filter by (facebook, instagram, etc.)',
            },
          },
        },
        querystring: {
          type: 'object',
          properties: {
            page: {
              type: ['integer', 'string'],
              minimum: 1,
              default: 1,
              description: 'Page number for pagination',
            },
            limit: {
              type: ['integer', 'string'],
              minimum: 1,
              maximum: 100,
              default: 10,
              description: 'Number of posts per page',
            },
          },
        },
        response: {
          200: ContentSchemas.getGeneratedPostsByPlatformResponse,
          400: ContentSchemas.errorResponse,
          401: ContentSchemas.errorResponse,
          503: ContentSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await contentProxy.getGeneratedPostsByPlatform(request, reply);
    }
  );

  app.get(
    '/generated-posts/status/:status',
    {
      onRequest: authMiddleware,
      schema: {
        tags: ['Generated Posts'],
        summary: 'Get Generated Posts by Status',
        description: 'Get generated posts by status with pagination (requires authentication)',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['status'],
          properties: {
            status: {
              type: 'string',
              description: 'Post status to filter by (e.g., draft, published)',
            },
          },
        },
        querystring: {
          type: 'object',
          properties: {
            page: {
              type: ['integer', 'string'],
              minimum: 1,
              default: 1,
              description: 'Page number for pagination',
            },
            limit: {
              type: ['integer', 'string'],
              minimum: 1,
              maximum: 100,
              default: 10,
              description: 'Number of posts per page',
            },
          },
        },
        response: {
          200: ContentSchemas.getGeneratedPostsByStatusResponse,
          400: ContentSchemas.errorResponse,
          401: ContentSchemas.errorResponse,
          503: ContentSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await contentProxy.getGeneratedPostsByStatus(request, reply);
    }
  );

  app.get(
    '/generated-posts/:id',
    {
      onRequest: authMiddleware,
      schema: {
        tags: ['Generated Posts'],
        summary: 'Get Generated Post by ID',
        description: 'Retrieve a specific generated post by ID (requires authentication)',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: {
              type: 'string',
              description: 'Generated post ID',
            },
          },
        },
        response: {
          200: ContentSchemas.getGeneratedPostByIdResponse,
          400: ContentSchemas.errorResponse,
          401: ContentSchemas.errorResponse,
          404: ContentSchemas.errorResponse,
          503: ContentSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await contentProxy.getGeneratedPostById(request, reply);
    }
  );

  app.post(
    '/generated-posts',
    {
      onRequest: authMiddleware,
      schema: {
        tags: ['Generated Posts'],
        summary: 'Create Generated Post',
        description: 'Create a new generated post (requires authentication)',
        security: [{ bearerAuth: [] }],
        body: ContentSchemas.createGeneratedPostRequest,
        response: {
          201: ContentSchemas.createGeneratedPostResponse,
          400: ContentSchemas.errorResponse,
          401: ContentSchemas.errorResponse,
          503: ContentSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await contentProxy.createGeneratedPost(request, reply);
    }
  );

  app.put(
    '/generated-posts/:id',
    {
      onRequest: authMiddleware,
      schema: {
        tags: ['Generated Posts'],
        summary: 'Update Generated Post',
        description: 'Update an existing generated post (requires authentication)',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: {
              type: 'string',
              description: 'Generated post ID',
            },
          },
        },
        body: ContentSchemas.updateGeneratedPostRequest,
        response: {
          200: ContentSchemas.createGeneratedPostResponse,
          400: ContentSchemas.errorResponse,
          401: ContentSchemas.errorResponse,
          404: ContentSchemas.errorResponse,
          503: ContentSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await contentProxy.updateGeneratedPost(request, reply);
    }
  );

  app.delete(
    '/generated-posts/:id',
    {
      onRequest: authMiddleware,
      schema: {
        tags: ['Generated Posts'],
        summary: 'Delete Generated Post',
        description: 'Delete a generated post (requires authentication)',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: {
              type: 'string',
              description: 'Generated post ID',
            },
          },
        },
        response: {
          200: ContentSchemas.createGeneratedPostResponse,
          400: ContentSchemas.errorResponse,
          401: ContentSchemas.errorResponse,
          404: ContentSchemas.errorResponse,
          503: ContentSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await contentProxy.deleteGeneratedPost(request, reply);
    }
  );
};
