/**
 * Device Request/Response Schemas
 * Professional JSON Schema definitions for device management endpoints
 */

export const DeviceSchemas = {
  /**
   * Register Device Request Schema
   * Used for POST /vpn/users/{userId}/devices
   */
  registerDeviceRequest: {
    type: 'object',
    title: 'Register Device Request',
    description: 'Register a new device for a VPN user',
    required: ['deviceName', 'deviceType'],
    additionalProperties: false,
    properties: {
      deviceName: {
        type: 'string',
        description: 'Name of the device',
        minLength: 1,
        maxLength: 100,
        example: 'My Phone',
      },
      deviceType: {
        type: 'string',
        enum: ['mobile', 'desktop', 'tablet', 'router', 'unknown'],
        description: 'Type of device',
        example: 'mobile',
      },
    },
  },

  /**
   * Register Device Response Schema
   * Returned from POST /vpn/users/{userId}/devices (201)
   */
  registerDeviceResponse: {
    type: 'object',
    title: 'Register Device Response',
    description: 'Successfully registered device with WireGuard configuration',
    additionalProperties: true,
    properties: {
      success: {
        type: 'boolean',
        description: 'Success status',
        example: true,
      },
      message: {
        type: 'string',
        description: 'Response message',
        example: 'Device registered successfully',
      },
      data: {
        type: 'object',
        additionalProperties: true,
        description: 'Registered device information',
        properties: {
          deviceId: { type: 'string', description: 'Unique device identifier (UUID)' },
          deviceName: { type: 'string', description: 'Device name' },
          deviceType: { type: 'string', description: 'Device type' },
          ip: { type: 'string', description: 'Allocated IP address' },
          publicKey: { type: 'string', description: 'Generated WireGuard public key' },
          status: { type: 'string', description: 'Initial device status (disconnected)' },
          createdAt: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
        },
      },
    },
  },

  /**
   * List User Devices Response Schema
   * Returned from GET /vpn/users/{userId}/devices (200)
   */
  listDevicesResponse: {
    type: 'object',
    title: 'List User Devices Response',
    description: 'List of all devices registered for a user',
    additionalProperties: true,
    properties: {
      success: {
        type: 'boolean',
        description: 'Success status',
        example: true,
      },
      message: {
        type: 'string',
        description: 'Response message',
        example: 'Devices retrieved successfully',
      },
      data: {
        type: 'array',
        description: 'List of user devices',
        items: {
          type: 'object',
          additionalProperties: true,
          properties: {
            id: { type: 'string', description: 'Device identifier (UUID)' },
            userId: { type: 'string', description: 'Owner user identifier' },
            deviceName: { type: 'string', description: 'Device name' },
            deviceType: { type: 'string', description: 'Device type' },
            publicKey: { type: 'string', description: 'WireGuard public key' },
            ip: { type: 'string', description: 'Allocated IP address' },
            status: { type: 'string', enum: ['active', 'disconnected', 'suspended'], description: 'Connection status' },
            createdAt: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
            updatedAt: { type: 'string', format: 'date-time', description: 'Last update timestamp' },
          },
        },
      },
    },
  },

  /**
   * Get Device Response Schema
   * Returned from GET /vpn/users/{userId}/devices/{deviceId} (200)
   */
  getDeviceResponse: {
    type: 'object',
    title: 'Get Device Response',
    description: 'Details of a specific device',
    additionalProperties: true,
    properties: {
      success: {
        type: 'boolean',
        description: 'Success status',
        example: true,
      },
      message: {
        type: 'string',
        description: 'Response message',
        example: 'Device retrieved successfully',
      },
      data: {
        type: 'object',
        additionalProperties: true,
        description: 'Device information',
        properties: {
          id: { type: 'string', description: 'Device identifier (UUID)' },
          userId: { type: 'string', description: 'Owner user identifier' },
          deviceName: { type: 'string', description: 'Device name' },
          deviceType: { type: 'string', description: 'Device type' },
          publicKey: { type: 'string', description: 'WireGuard public key' },
          ip: { type: 'string', description: 'Allocated IP address' },
          status: { type: 'string', description: 'Connection status' },
          createdAt: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Last update timestamp' },
        },
      },
    },
  },

  /**
   * Delete Device Response Schema
   * Returned from DELETE /vpn/users/{userId}/devices/{deviceId} (200)
   */
  deleteDeviceResponse: {
    type: 'object',
    title: 'Delete Device Response',
    description: 'Device successfully deleted',
    additionalProperties: true,
    properties: {
      success: {
        type: 'boolean',
        description: 'Success status',
        example: true,
      },
      message: {
        type: 'string',
        description: 'Response message',
        example: 'Device deleted successfully',
      },
      data: {
        type: ['object', 'null'],
        description: 'Empty data on successful deletion',
      },
    },
  },

  /**
   * Get Device Config Response Schema
   * Returned from GET /vpn/users/{userId}/devices/{deviceId}/config (200)
   * Note: Returns text/plain WireGuard config file
   */
  getDeviceConfigResponse: {
    type: 'object',
    title: 'Get Device Config Response',
    description: 'WireGuard configuration file for device',
    properties: {
      description: {
        type: 'string',
        example: 'Returns text/plain WireGuard configuration with proper headers for file download',
      },
    },
  },

  /**
   * Get Device Usage Response Schema
   * Returned from GET /vpn/users/{userId}/devices/{deviceId}/usage (200)
   */
  getDeviceUsageResponse: {
    type: 'object',
    title: 'Get Device Usage Response',
    description: 'Data usage statistics for a device',
    additionalProperties: true,
    properties: {
      success: {
        type: 'boolean',
        description: 'Success status',
        example: true,
      },
      message: {
        type: 'string',
        description: 'Response message',
        example: 'Device usage retrieved successfully',
      },
      data: {
        type: 'object',
        additionalProperties: true,
        description: 'Device usage statistics',
        properties: {
          deviceId: { type: 'string', description: 'Device identifier' },
          deviceName: { type: 'string', description: 'Device name' },
          bytesSent: { type: 'number', description: 'Bytes sent (upload)' },
          bytesReceived: { type: 'number', description: 'Bytes received (download)' },
          totalBytes: { type: 'number', description: 'Total bytes transferred' },
          totalGB: { type: 'number', description: 'Total data usage in GB' },
        },
      },
    },
  },

  /**
   * Error Response Schema
   * Used for all device endpoint errors
   */
  errorResponse: {
    type: 'object',
    title: 'Error Response',
    description: 'Standard device endpoint error response',
    additionalProperties: true,
    properties: {
      success: {
        type: 'boolean',
        description: 'Success status (false for errors)',
        example: false,
      },
      message: {
        type: 'string',
        description: 'Error message',
        example: 'Device not found',
      },
      error: {
        type: 'object',
        additionalProperties: true,
        description: 'Detailed error information',
        properties: {
          code: { type: 'string', description: 'Error code' },
          message: { type: 'string', description: 'Detailed error message' },
        },
      },
    },
  },
};

/**
 * HTTP Status Code Responses for Device Endpoints
 */
export const DeviceResponses = {
  '201': {
    description: 'Created',
    schema: DeviceSchemas.registerDeviceResponse,
  },
  '200': {
    description: 'Success',
    schema: DeviceSchemas.listDevicesResponse,
  },
  '400': {
    description: 'Bad Request - Validation error',
    schema: DeviceSchemas.errorResponse,
  },
  '404': {
    description: 'Not Found',
    schema: DeviceSchemas.errorResponse,
  },
  '409': {
    description: 'Conflict - Device limit reached',
    schema: DeviceSchemas.errorResponse,
  },
  '500': {
    description: 'Internal Server Error',
    schema: DeviceSchemas.errorResponse,
  },
};
