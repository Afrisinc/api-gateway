import type { FastifyInstance } from 'fastify';
import { authProxy } from '@/proxies/auth.proxy';
import { AuthSchemas } from '@/types/auth-schemas';

export const registerAuthRoutes = async (app: FastifyInstance): Promise<void> => {
  /**
   * POST /auth/register
   * Register a new user account
   */
  app.post(
    '/auth/register',
    {
      schema: {
        tags: ['Auth'],
        summary: 'User Registration',
        description: 'Register a new user account with email, password, and personal details. Email must be unique.',
        body: AuthSchemas.registerRequest,
        response: {
          201: AuthSchemas.registrationResponse,
          400: AuthSchemas.errorResponse,
          409: AuthSchemas.errorResponse,
          503: AuthSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await authProxy.register(request, reply);
    }
  );

  /**
   * POST /auth/login
   * Authenticate user and return access token
   */
  app.post(
    '/auth/login',
    {
      schema: {
        tags: ['Auth'],
        summary: 'User Login',
        description: 'Authenticate user with email and password. Returns JWT access and refresh tokens.',
        body: AuthSchemas.loginRequest,
        response: {
          200: AuthSchemas.loginResponse,
          400: AuthSchemas.errorResponse,
          401: AuthSchemas.errorResponse,
          503: AuthSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await authProxy.login(request, reply);
    }
  );

  /**
   * POST /auth/forgot-password
   * Initiate password reset flow
   */
  app.post(
    '/auth/forgot-password',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Forgot Password',
        description:
          'Request a password reset link. A reset token or OTP will be sent to the registered email address.',
        body: AuthSchemas.forgotPasswordRequest,
        response: {
          200: AuthSchemas.forgotPasswordResponse,
          400: AuthSchemas.errorResponse,
          404: AuthSchemas.errorResponse,
          503: AuthSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await authProxy.forgotPassword(request, reply);
    }
  );

  /**
   * POST /auth/reset-password
   * Complete password reset with token or OTP
   */
  app.post(
    '/auth/reset-password',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Reset Password',
        description:
          'Reset password using either a token (from email link) or OTP (from email/SMS). Password must meet complexity requirements.',
        body: AuthSchemas.resetPasswordRequest,
        response: {
          200: AuthSchemas.resetPasswordResponse,
          400: AuthSchemas.errorResponse,
          401: AuthSchemas.errorResponse,
          503: AuthSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await authProxy.resetPassword(request, reply);
    }
  );

  /**
   * POST /auth/verify
   * Verify JWT token validity
   */
  app.post(
    '/auth/verify',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Verify Token',
        description: 'Verify the validity of a JWT token. Returns token data if valid.',
        response: {
          200: AuthSchemas.verifyResponse,
          400: AuthSchemas.errorResponse,
          401: AuthSchemas.errorResponse,
          503: AuthSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await authProxy.verify(request, reply);
    }
  );
};
