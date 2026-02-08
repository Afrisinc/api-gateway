import type { FastifyInstance } from 'fastify';
import { vpnProxy } from '@/proxies/vpn.proxy';
import { ServerSchemas } from '@/types/server-schemas';

export const registerServerRoutes = async (app: FastifyInstance): Promise<void> => {
  /**
   * GET /vpn/admin/servers
   * List all VPN servers
   */
  app.get(
    '/vpn/admin/servers',
    {
      schema: {
        tags: ['Servers'],
        summary: 'Get All VPN Servers',
        description: 'Retrieve a comprehensive list of all available VPN servers with their configurations and status.',
        response: {
          200: ServerSchemas.listServersResponse,
          503: ServerSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await vpnProxy.listServers(request, reply);
    }
  );

  /**
   * GET /admin/servers/healthy
   * List only healthy and active servers
   */
  app.get(
    '/admin/servers/healthy',
    {
      schema: {
        tags: ['Servers'],
        summary: 'Get Healthy Servers',
        description: 'Retrieve a filtered list of healthy and active servers available for client connections.',
        response: {
          200: ServerSchemas.listHealthyServersResponse,
          503: ServerSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await vpnProxy.listHealthyServers(request, reply);
    }
  );

  /**
   * POST /admin/servers
   * Create a new VPN server
   */
  app.post(
    '/admin/servers',
    {
      schema: {
        tags: ['Servers'],
        summary: 'Create Server',
        description: 'Create a new VPN server with WireGuard configuration and agent details.',
        body: ServerSchemas.createServerRequest,
        response: {
          201: ServerSchemas.createServerResponse,
          400: ServerSchemas.errorResponse,
          500: ServerSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await vpnProxy.createServer(request, reply);
    }
  );

  /**
   * PUT /admin/servers/{serverId}/status
   * Update server status
   */
  app.put(
    '/admin/servers/:serverId/status',
    {
      schema: {
        tags: ['Servers'],
        summary: 'Update Server Status',
        description: 'Update the operational and health status of a VPN server.',
        params: {
          type: 'object',
          properties: {
            serverId: { type: 'string', description: 'The unique identifier of the VPN server' },
          },
          required: ['serverId'],
        },
        body: ServerSchemas.updateServerStatusRequest,
        response: {
          200: ServerSchemas.updateServerStatusResponse,
          400: ServerSchemas.errorResponse,
          404: ServerSchemas.errorResponse,
          500: ServerSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await vpnProxy.updateServerStatus(request, reply);
    }
  );
};
