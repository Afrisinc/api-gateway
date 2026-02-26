import type { FastifyInstance } from 'fastify';
import { userProxy } from '@/proxies/user.proxy';
import { UserSchemas } from '@/types/user-schemas';
import { authGuard } from '@/middlewares/authGuard';

export const registerUserRoutes = async (app: FastifyInstance): Promise<void> => {
  /**
   * GET /users
   * Get all users with pagination and search
   */
  app.get(
    '/users',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Users'],
        summary: 'Get all users',
        description: 'Retrieve a paginated list of users with optional search filtering. Requires authentication.',
        querystring: UserSchemas.getAllUsersRequest,
        response: {
          200: UserSchemas.getAllUsersResponse,
          400: UserSchemas.errorResponse,
          401: UserSchemas.errorResponse,
          503: UserSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await userProxy.getAllUsers(request, reply);
    }
  );

  /**
   * GET /users/profile
   * Get current authenticated user's profile
   */
  app.get(
    '/users/profile',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Users'],
        summary: 'Get user profile',
        description: 'Retrieve the current authenticated user profile. Requires valid JWT token.',
        response: {
          200: UserSchemas.getUserProfileResponse,
          400: UserSchemas.errorResponse,
          401: UserSchemas.errorResponse,
          503: UserSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await userProxy.getUserProfile(request, reply);
    }
  );

  /**
   * PUT /users/profile
   * Update current authenticated user's profile
   */
  app.put(
    '/users/profile',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Users'],
        summary: 'Update user profile',
        description: 'Update the current authenticated user profile information. Requires valid JWT token.',
        body: UserSchemas.updateUserProfileRequest,
        response: {
          200: UserSchemas.updateUserProfileResponse,
          400: UserSchemas.errorResponse,
          401: UserSchemas.errorResponse,
          409: UserSchemas.errorResponse,
          503: UserSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await userProxy.updateUserProfile(request, reply);
    }
  );
};
