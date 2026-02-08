/**
 * VPN Request/Response Schemas
 * Professional JSON Schema definitions for VPN user endpoints
 */

export const VpnSchemas = {
  /**
   * List All Users Response Schema
   * Returned from GET /vpn/users (200)
   */
  listUsersResponse: {
    type: 'object',
    title: 'List All Users Response',
    description: 'List of all VPN users with their connection status, devices, and usage information',
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
        example: 'Users fetched successfully',
      },
      data: {
        type: 'array',
        description: 'List of VPN users with comprehensive details',
        items: {
          type: 'object',
          additionalProperties: true,
          properties: {
            userId: {
              type: 'string',
              description: 'User identifier (UUID)',
              example: 'e8486116-b514-4335-9413-db8a89e71c53',
            },
            email: { type: 'string', format: 'email', description: 'User email address', example: 'admin@example.com' },
            ip: { type: 'string', description: 'Allocated IP address with CIDR notation', example: '10.0.0.1/32' },
            publicKey: {
              type: 'string',
              description: 'WireGuard public key (base64 encoded)',
              example: '7IaizPy528IFgOao6Z8A11VbgBWivz5hniJc4XUQQyI=',
            },
            status: {
              type: 'string',
              enum: ['active', 'disconnected', 'suspended'],
              description: 'User connection status',
            },
            dataUsageLimit: { type: 'number', description: 'Data usage limit in bytes', example: 0 },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation timestamp',
              example: '2026-02-07T19:05:46Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
              example: '2026-02-07T19:06:41Z',
            },
            lastConnected: {
              type: 'string',
              format: 'date-time',
              description: 'Last connection timestamp',
              example: '2026-02-07T19:06:41Z',
            },
            deviceCount: { type: 'number', description: 'Total number of devices registered', example: 3 },
            connectedCount: { type: 'number', description: 'Number of currently connected devices', example: 1 },
            devices: {
              type: 'array',
              description: 'List of devices registered by this user',
              items: {
                type: 'object',
                additionalProperties: true,
                properties: {
                  deviceId: {
                    type: 'string',
                    description: 'Device identifier (UUID)',
                    example: '30b82a56-a554-4a70-ab72-b82219ed3e87',
                  },
                  deviceName: { type: 'string', description: 'Device name', example: 'Primary Device' },
                  deviceType: {
                    type: 'string',
                    enum: ['mobile', 'desktop', 'tablet', 'router', 'unknown'],
                    description: 'Type of device',
                    example: 'unknown',
                  },
                  ip: { type: 'string', description: 'Device IP address with CIDR', example: '10.0.0.1/32' },
                  status: {
                    type: 'string',
                    enum: ['active', 'disconnected', 'suspended'],
                    description: 'Device connection status',
                  },
                  isConnected: { type: 'boolean', description: 'Whether device is currently connected', example: true },
                  lastConnected: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Last time device was connected',
                    example: '2026-02-07T19:06:41Z',
                  },
                  createdAt: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Device registration timestamp',
                    example: '2026-02-07T19:05:46Z',
                  },
                },
              },
            },
            usageInfo: {
              type: 'object',
              description: 'User data usage statistics and limits',
              additionalProperties: true,
              properties: {
                totalBytesSent: { type: 'number', description: 'Total bytes sent by user', example: 0 },
                totalBytesReceived: { type: 'number', description: 'Total bytes received by user', example: 0 },
                totalBytes: { type: 'number', description: 'Total bytes transferred', example: 0 },
                totalGB: { type: 'number', description: 'Total usage in gigabytes', example: 0 },
                limitGB: { type: 'number', description: 'Usage limit in gigabytes', example: 0 },
                usedPercentage: { type: 'number', description: 'Percentage of limit used (0-100)', example: 0 },
                remainingGB: { type: 'number', description: 'Remaining quota in gigabytes', example: 0 },
              },
            },
          },
        },
      },
    },
  },

  /**
   * Get User by Public Key Request Schema
   * Used for GET /vpn/users/by-public-key
   */
  getUserByPublicKeyRequest: {
    type: 'object',
    title: 'Get User by Public Key Request',
    description: 'Query parameters for retrieving a VPN user by their public key',
    required: ['publicKey'],
    additionalProperties: false,
    properties: {
      publicKey: {
        type: 'string',
        description: 'The public key of the VPN user (base64 encoded, 44 characters)',
        minLength: 44,
        maxLength: 44,
        example: 'wTDxDK7V2+JExjysQZtIKK2xWXoSGtqwhz65+qF3Fm4=',
      },
    },
  },

  /**
   * Get User by Public Key Response Schema
   * Returned from GET /vpn/users/by-public-key (200)
   */
  getUserByPublicKeyResponse: {
    type: 'object',
    title: 'Get User by Public Key Response',
    description: 'VPN user information retrieved by public key',
    additionalProperties: true,
    properties: {
      success: {
        type: 'boolean',
        description: 'Success status',
        example: true,
      },
      data: {
        type: 'object',
        additionalProperties: true,
        description: 'User information',
        properties: {
          userId: { type: 'string', description: 'Unique user identifier' },
          email: { type: 'string', format: 'email', description: 'User email address' },
          publicKey: { type: 'string', description: 'User public key' },
          status: { type: 'string', description: 'Connection status' },
          ip: { type: 'string', description: 'Allocated IP address' },
          createdAt: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
        },
      },
    },
  },

  /**
   * Register VPN User Request Schema
   * Used for POST /vpn/users/register
   */
  registerUserRequest: {
    type: 'object',
    title: 'Register VPN User Request',
    description: 'Register a new VPN user with email and IP address',
    required: ['email', 'ip'],
    additionalProperties: false,
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'Email address of the user',
        example: 'user@example.com',
        minLength: 5,
        maxLength: 255,
      },
      ip: {
        type: 'string',
        description: 'Valid IPv4 address allocation for the user (e.g., 10.0.0.1/32)',
        example: '10.0.0.1/32',
        pattern:
          '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:/\\d{1,2})?$',
      },
    },
  },

  /**
   * Register VPN User Response Schema
   * Returned from POST /vpn/users/register (201)
   */
  registerUserResponse: {
    type: 'object',
    title: 'Register VPN User Response',
    description: 'Successful VPN user registration response',
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
        example: 'User registered successfully',
      },
      data: {
        type: 'object',
        additionalProperties: true,
        description: 'Registered user information',
        properties: {
          userId: { type: 'string', description: 'Unique user identifier (UUID)' },
          email: { type: 'string', format: 'email', description: 'Registered email address' },
          ip: { type: 'string', description: 'Allocated IP address' },
          publicKey: { type: 'string', description: 'Generated public key' },
          wireGuardConfig: { type: 'string', description: 'WireGuard configuration' },
          createdAt: { type: 'string', format: 'date-time', description: 'Account creation timestamp' },
        },
      },
    },
  },

  /**
   * Toggle User Connection Request Schema
   * Used for POST /vpn/users/toggle
   */
  toggleConnectionRequest: {
    type: 'object',
    title: 'Toggle User Connection Request',
    description: 'Toggle VPN connection status for a user (connect or disconnect)',
    required: ['action', 'publicKey'],
    additionalProperties: false,
    properties: {
      action: {
        type: 'string',
        enum: ['connect', 'disconnect'],
        description: 'The action to perform on the connection',
        example: 'connect',
      },
      publicKey: {
        type: 'string',
        description: 'The public key of the VPN user',
        minLength: 44,
        maxLength: 44,
        example: 'wTDxDK7V2+JExjysQZtIKK2xWXoSGtqwhz65+qF3Fm4=',
      },
    },
  },

  /**
   * Toggle User Connection Response Schema
   * Returned from POST /vpn/users/toggle (200)
   */
  toggleConnectionResponse: {
    type: 'object',
    title: 'Toggle User Connection Response',
    description: 'VPN connection status toggled successfully',
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
        example: 'Connection toggled successfully',
      },
      data: {
        type: 'object',
        additionalProperties: true,
        description: 'Updated connection information',
        properties: {
          userId: { type: 'string', description: 'User identifier' },
          publicKey: { type: 'string', description: 'User public key' },
          status: { type: 'string', description: 'Current connection status' },
          action: { type: 'string', description: 'Applied action' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Last update timestamp' },
          lastConnected: { type: 'string', format: 'date-time', description: 'Last connection timestamp' },
        },
      },
    },
  },

  /**
   * Error Response Schema
   * Used for all error responses (400, 404, 409, 503)
   */
  errorResponse: {
    type: 'object',
    title: 'Error Response',
    description: 'Standard VPN service error response format',
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
        example: 'User not found',
      },
      error: {
        type: 'object',
        additionalProperties: true,
        description: 'Detailed error information',
        properties: {
          code: { type: 'string', description: 'Error code for client handling' },
          message: { type: 'string', description: 'Detailed error message' },
        },
      },
    },
  },
};

/**
 * HTTP Status Code Responses
 */
export const VpnResponses = {
  '200': {
    description: 'Success',
    schema: VpnSchemas.getUserByPublicKeyResponse,
  },
  '201': {
    description: 'Created',
    schema: VpnSchemas.registerUserResponse,
  },
  '400': {
    description: 'Bad Request - Validation error',
    schema: VpnSchemas.errorResponse,
  },
  '404': {
    description: 'Not Found',
    schema: VpnSchemas.errorResponse,
  },
  '409': {
    description: 'Conflict - User already exists',
    schema: VpnSchemas.errorResponse,
  },
  '503': {
    description: 'Service Unavailable',
    schema: VpnSchemas.errorResponse,
  },
};
