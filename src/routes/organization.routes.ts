import type { FastifyInstance } from 'fastify';
import { organizationProxy } from '@/proxies/organization.proxy';
import { OrganizationSchemas } from '@/types/organization-schemas';
import { authGuard } from '@/middlewares/authGuard';

export const registerOrganizationRoutes = async (app: FastifyInstance): Promise<void> => {
  /**
   * GET /organizations
   * Get all organizations with pagination and search
   */
  app.get(
    '/organizations',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Organizations'],
        summary: 'Get all organizations',
        description:
          'Retrieve a paginated list of organizations with optional search filtering. Requires authentication.',
        querystring: OrganizationSchemas.getAllOrganizationsQuery,
        response: {
          200: OrganizationSchemas.getAllOrganizationsResponse,
          400: OrganizationSchemas.errorResponse,
          401: OrganizationSchemas.errorResponse,
          503: OrganizationSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await organizationProxy.getAllOrganizations(request, reply);
    }
  );

  /**
   * POST /organizations
   * Create a new organization
   */
  app.post(
    '/organizations',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Organizations'],
        summary: 'Create organization',
        description: 'Create a new organization with name and optional details. Requires authentication.',
        body: OrganizationSchemas.createOrganizationRequest,
        response: {
          201: OrganizationSchemas.createOrganizationResponse,
          400: OrganizationSchemas.errorResponse,
          401: OrganizationSchemas.errorResponse,
          503: OrganizationSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await organizationProxy.createOrganization(request, reply);
    }
  );

  /**
   * GET /organizations/:organizationId
   * Get organization details
   */
  app.get(
    '/organizations/:organizationId',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Organizations'],
        summary: 'Get organization details',
        description: 'Retrieve organization information and members. Requires authentication.',
        params: {
          type: 'object',
          properties: {
            organizationId: {
              type: 'string',
              description: 'Organization ID',
            },
          },
          required: ['organizationId'],
        },
        response: {
          200: OrganizationSchemas.getOrganizationResponse,
          401: OrganizationSchemas.errorResponse,
          404: OrganizationSchemas.errorResponse,
          503: OrganizationSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await organizationProxy.getOrganization(request, reply);
    }
  );

  /**
   * PUT /organizations/:organizationId
   * Update organization details
   */
  app.put(
    '/organizations/:organizationId',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Organizations'],
        summary: 'Update organization',
        description: 'Update organization information. Requires authentication.',
        params: {
          type: 'object',
          properties: {
            organizationId: {
              type: 'string',
              description: 'Organization ID',
            },
          },
          required: ['organizationId'],
        },
        body: OrganizationSchemas.updateOrganizationRequest,
        response: {
          200: OrganizationSchemas.updateOrganizationResponse,
          400: OrganizationSchemas.errorResponse,
          401: OrganizationSchemas.errorResponse,
          404: OrganizationSchemas.errorResponse,
          503: OrganizationSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await organizationProxy.updateOrganization(request, reply);
    }
  );

  /**
   * POST /organizations/:organizationId/members
   * Add a member to organization
   */
  app.post(
    '/organizations/:organizationId/members',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Organizations', 'Members'],
        summary: 'Add organization member',
        description: 'Add a user as a member of the organization with specified role. Requires authentication.',
        params: {
          type: 'object',
          properties: {
            organizationId: {
              type: 'string',
              description: 'Organization ID',
            },
          },
          required: ['organizationId'],
        },
        body: OrganizationSchemas.addMemberRequest,
        response: {
          201: OrganizationSchemas.addMemberResponse,
          400: OrganizationSchemas.errorResponse,
          401: OrganizationSchemas.errorResponse,
          503: OrganizationSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await organizationProxy.addMember(request, reply);
    }
  );

  /**
   * DELETE /organizations/:organizationId/members/:userId
   * Remove a member from organization
   */
  app.delete(
    '/organizations/:organizationId/members/:userId',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Organizations', 'Members'],
        summary: 'Remove organization member',
        description: 'Remove a user from organization. Requires authentication.',
        params: {
          type: 'object',
          properties: {
            organizationId: {
              type: 'string',
              description: 'Organization ID',
            },
            userId: {
              type: 'string',
              description: 'User ID to remove',
            },
          },
          required: ['organizationId', 'userId'],
        },
        response: {
          200: OrganizationSchemas.removeMemberResponse,
          400: OrganizationSchemas.errorResponse,
          401: OrganizationSchemas.errorResponse,
          404: OrganizationSchemas.errorResponse,
          503: OrganizationSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await organizationProxy.removeMember(request, reply);
    }
  );

  /**
   * GET /organizations/:organizationId/members
   * List organization members
   */
  app.get(
    '/organizations/:organizationId/members',
    {
      preHandler: authGuard,
      schema: {
        tags: ['Organizations', 'Members'],
        summary: 'List organization members',
        description: 'Get all members of an organization. Requires authentication.',
        params: {
          type: 'object',
          properties: {
            organizationId: {
              type: 'string',
              description: 'Organization ID',
            },
          },
          required: ['organizationId'],
        },
        response: {
          200: OrganizationSchemas.listMembersResponse,
          401: OrganizationSchemas.errorResponse,
          404: OrganizationSchemas.errorResponse,
          503: OrganizationSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await organizationProxy.listMembers(request, reply);
    }
  );
};
