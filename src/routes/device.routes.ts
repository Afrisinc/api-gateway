import type { FastifyInstance } from 'fastify';
import { vpnProxy } from '@/proxies/vpn.proxy';
import { DeviceSchemas } from '@/types/device-schemas';

export const registerDeviceRoutes = async (app: FastifyInstance): Promise<void> => {
  /**
   * POST /vpn/users/{userId}/devices
   * Register a new device for a user
   */
  app.post(
    '/vpn/users/:userId/devices',
    {
      schema: {
        tags: ['Devices'],
        summary: 'Register Device',
        description: 'Register a new device for a VPN user with device name and type.',
        params: {
          type: 'object',
          properties: {
            userId: { type: 'string', description: 'The unique identifier of the user (UUID)' },
          },
          required: ['userId'],
        },
        body: DeviceSchemas.registerDeviceRequest,
        response: {
          201: DeviceSchemas.registerDeviceResponse,
          400: DeviceSchemas.errorResponse,
          404: DeviceSchemas.errorResponse,
          409: DeviceSchemas.errorResponse,
          500: DeviceSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await vpnProxy.registerDevice(request, reply);
    }
  );

  /**
   * GET /vpn/users/{userId}/devices
   * List all devices for a user
   */
  app.get(
    '/vpn/users/:userId/devices',
    {
      schema: {
        tags: ['Devices'],
        summary: 'List User Devices',
        description: 'Retrieve a list of all devices registered for a specific user.',
        params: {
          type: 'object',
          properties: {
            userId: { type: 'string', description: 'The unique identifier of the user (UUID)' },
          },
          required: ['userId'],
        },
        response: {
          200: DeviceSchemas.listDevicesResponse,
          400: DeviceSchemas.errorResponse,
          404: DeviceSchemas.errorResponse,
          500: DeviceSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await vpnProxy.listDevices(request, reply);
    }
  );

  /**
   * GET /vpn/users/{userId}/devices/{deviceId}
   * Get a specific device
   */
  app.get(
    '/vpn/users/:userId/devices/:deviceId',
    {
      schema: {
        tags: ['Devices'],
        summary: 'Get Device',
        description: 'Retrieve details of a specific device.',
        params: {
          type: 'object',
          properties: {
            userId: { type: 'string', description: 'The unique identifier of the user (UUID)' },
            deviceId: { type: 'string', description: 'The unique identifier of the device (UUID)' },
          },
          required: ['userId', 'deviceId'],
        },
        response: {
          200: DeviceSchemas.getDeviceResponse,
          400: DeviceSchemas.errorResponse,
          404: DeviceSchemas.errorResponse,
          500: DeviceSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await vpnProxy.getDevice(request, reply);
    }
  );

  /**
   * DELETE /vpn/users/{userId}/devices/{deviceId}
   * Delete a device
   */
  app.delete(
    '/vpn/users/:userId/devices/:deviceId',
    {
      schema: {
        tags: ['Devices'],
        summary: 'Delete Device',
        description: 'Delete a device and remove it from the VPN network.',
        params: {
          type: 'object',
          properties: {
            userId: { type: 'string', description: 'The unique identifier of the user (UUID)' },
            deviceId: { type: 'string', description: 'The unique identifier of the device (UUID)' },
          },
          required: ['userId', 'deviceId'],
        },
        response: {
          200: DeviceSchemas.deleteDeviceResponse,
          400: DeviceSchemas.errorResponse,
          404: DeviceSchemas.errorResponse,
          500: DeviceSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await vpnProxy.deleteDevice(request, reply);
    }
  );

  /**
   * GET /vpn/users/{userId}/devices/{deviceId}/config
   * Get device WireGuard configuration
   */
  app.get(
    '/vpn/users/:userId/devices/:deviceId/config',
    {
      schema: {
        tags: ['Devices'],
        summary: 'Get Device Config',
        description: 'Download WireGuard configuration file for a device.',
        params: {
          type: 'object',
          properties: {
            userId: { type: 'string', description: 'The unique identifier of the user (UUID)' },
            deviceId: { type: 'string', description: 'The unique identifier of the device (UUID)' },
          },
          required: ['userId', 'deviceId'],
        },
        querystring: {
          type: 'object',
          properties: {
            serverId: { type: 'string', description: 'The VPN server to connect to (required)' },
          },
          required: ['serverId'],
        },
        response: {
          200: DeviceSchemas.getDeviceConfigResponse,
          400: DeviceSchemas.errorResponse,
          404: DeviceSchemas.errorResponse,
          500: DeviceSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await vpnProxy.getDeviceConfig(request, reply);
    }
  );

  /**
   * GET /vpn/users/{userId}/devices/{deviceId}/usage
   * Get device data usage statistics
   */
  app.get(
    '/vpn/users/:userId/devices/:deviceId/usage',
    {
      schema: {
        tags: ['Devices'],
        summary: 'Get Device Usage',
        description: 'Retrieve data usage statistics for a specific device.',
        params: {
          type: 'object',
          properties: {
            userId: { type: 'string', description: 'The unique identifier of the user (UUID)' },
            deviceId: { type: 'string', description: 'The unique identifier of the device (UUID)' },
          },
          required: ['userId', 'deviceId'],
        },
        response: {
          200: DeviceSchemas.getDeviceUsageResponse,
          400: DeviceSchemas.errorResponse,
          404: DeviceSchemas.errorResponse,
          500: DeviceSchemas.errorResponse,
        },
      },
    },
    async (request, reply) => {
      await vpnProxy.getDeviceUsage(request, reply);
    }
  );
};
