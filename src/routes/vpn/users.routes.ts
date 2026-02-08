import type { FastifyInstance } from 'fastify';
import { vpnProxy } from '@/proxies/vpn.proxy';
import { VpnSchemas } from '@/types/vpn-schemas';

export const registerVpnRoutes = async (app: FastifyInstance): Promise<void> => {
  /**
   * GET /users
   * Retrieve all VPN users
   */
  app.get(
    '/users',
    {
      schema: {
        tags: ['VPN Users'],
        summary: 'List All Users',
        description: 'Retrieve a list of all VPN users with their connection status and details.',
        response: {
          200: VpnSchemas.listUsersResponse,
          503: VpnSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await vpnProxy.listUsers(request, reply);
    }
  );

  /**
   * GET /users/by-public-key
   * Retrieve a VPN user by public key
   */
  app.get(
    '/users/by-public-key',
    {
      schema: {
        tags: ['VPN Users'],
        summary: 'Get User by Public Key',
        description: 'Retrieve VPN user information by their public key.',
        querystring: VpnSchemas.getUserByPublicKeyRequest,
        response: {
          200: VpnSchemas.getUserByPublicKeyResponse,
          404: VpnSchemas.errorResponse,
          503: VpnSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await vpnProxy.getUserByPublicKey(request, reply);
    }
  );

  /**
   * POST /users/register
   * Register a new VPN user
   */
  app.post(
    '/users/register',
    {
      schema: {
        tags: ['VPN Users'],
        summary: 'Register VPN User',
        description: 'Register a new VPN user with email and IP address.',
        body: VpnSchemas.registerUserRequest,
        response: {
          201: VpnSchemas.registerUserResponse,
          409: VpnSchemas.errorResponse,
          503: VpnSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await vpnProxy.registerUser(request, reply);
    }
  );

  /**
   * POST /users/toggle
   * Toggle VPN connection for a user (connect/disconnect)
   */
  app.post(
    '/users/toggle',
    {
      schema: {
        tags: ['VPN Users'],
        summary: 'Toggle User Connection',
        description: 'Toggle VPN connection status for a user (connect or disconnect).',
        body: VpnSchemas.toggleConnectionRequest,
        response: {
          200: VpnSchemas.toggleConnectionResponse,
          503: VpnSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await vpnProxy.toggleConnection(request, reply);
    }
  );
};
