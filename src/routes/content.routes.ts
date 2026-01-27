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
};
