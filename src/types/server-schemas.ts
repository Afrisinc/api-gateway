/**
 * Server Admin Request/Response Schemas
 * Professional JSON Schema definitions for server management endpoints
 */

export const ServerSchemas = {
  /**
   * List All Servers Response Schema
   * Returned from GET /admin/servers (200)
   */
  listServersResponse: {
    type: 'object',
    title: 'List All Servers Response',
    description: 'Comprehensive list of all VPN servers with detailed configuration',
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
        example: 'Servers retrieved successfully',
      },
      data: {
        type: 'array',
        description: 'List of VPN servers',
        items: {
          type: 'object',
          additionalProperties: true,
          properties: {
            id: { type: 'string', description: 'Server unique identifier' },
            name: { type: 'string', description: 'Server name' },
            location: { type: 'string', description: 'Geographic location' },
            regionCode: { type: 'string', description: 'Region code' },
            countryCode: { type: 'string', description: 'ISO country code' },
            publicIp: { type: 'string', description: 'Public IP address' },
            agentUrl: { type: 'string', format: 'uri', description: 'Agent service URL' },
            wireguardPort: { type: 'number', description: 'WireGuard listening port' },
            serverPublicKey: { type: 'string', description: 'Server WireGuard public key' },
            networkCidr: { type: 'string', description: 'Network CIDR block' },
            nextAvailableIp: { type: 'number', description: 'Next available IP index' },
            maxClients: { type: 'number', description: 'Maximum clients allowed' },
            currentClients: { type: 'number', description: 'Currently connected clients' },
            bandwidthLimitMbps: { type: 'number', description: 'Bandwidth limit in Mbps' },
            status: {
              type: 'string',
              enum: ['active', 'maintenance', 'offline', 'full'],
              description: 'Server status',
            },
            healthStatus: {
              type: 'string',
              enum: ['healthy', 'degraded', 'down', 'unknown'],
              description: 'Health status',
            },
            lastHealthCheck: { type: 'string', format: 'date-time', description: 'Last health check timestamp' },
            latitude: { type: 'number', description: 'Geographic latitude' },
            longitude: { type: 'number', description: 'Geographic longitude' },
            createdAt: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
            updatedAt: { type: 'string', format: 'date-time', description: 'Last update timestamp' },
          },
        },
      },
    },
  },

  /**
   * List Healthy Servers Response Schema
   * Returned from GET /admin/servers/healthy (200)
   */
  listHealthyServersResponse: {
    type: 'object',
    title: 'List Healthy Servers Response',
    description: 'Filtered list of healthy and active servers for client selection',
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
        example: 'Healthy servers retrieved successfully',
      },
      data: {
        type: 'array',
        description: 'List of healthy servers',
        items: {
          type: 'object',
          additionalProperties: true,
          properties: {
            id: { type: 'string', description: 'Server identifier' },
            name: { type: 'string', description: 'Server name' },
            status: { type: 'string', description: 'Server status' },
            healthStatus: { type: 'string', description: 'Health status' },
            currentClients: { type: 'number', description: 'Current client count' },
            maxClients: { type: 'number', description: 'Maximum clients' },
          },
        },
      },
    },
  },

  /**
   * Create Server Request Schema
   * Used for POST /admin/servers
   */
  createServerRequest: {
    type: 'object',
    title: 'Create Server Request',
    description: 'Create a new VPN server with configuration',
    required: [
      'id',
      'name',
      'location',
      'regionCode',
      'countryCode',
      'publicIp',
      'agentUrl',
      'agentApiKey',
      'wireguardPort',
      'serverPublicKey',
      'networkCidr',
      'maxClients',
    ],
    additionalProperties: false,
    properties: {
      id: {
        type: 'string',
        description: 'Unique server identifier',
        example: 'server-id',
      },
      name: {
        type: 'string',
        description: 'Server name',
        example: 'Server Name',
      },
      location: {
        type: 'string',
        description: 'Geographic location',
        example: 'Paris',
      },
      regionCode: {
        type: 'string',
        description: 'Region code',
        example: 'EU',
      },
      countryCode: {
        type: 'string',
        description: 'ISO country code',
        minLength: 2,
        maxLength: 2,
        example: 'FR',
      },
      publicIp: {
        type: 'string',
        description: 'Public IP address of the server',
        format: 'ipv4',
        example: '123.45.67.89',
      },
      agentUrl: {
        type: 'string',
        description: 'Agent service URL',
        format: 'uri',
        example: 'https://agent.example.com',
      },
      agentApiKey: {
        type: 'string',
        description: 'API key for agent authentication',
        minLength: 1,
        example: 'secret-key',
      },
      wireguardPort: {
        type: 'number',
        description: 'WireGuard listening port',
        minimum: 1024,
        maximum: 65535,
        example: 51820,
      },
      serverPublicKey: {
        type: 'string',
        description: 'Server WireGuard public key (base64)',
        example: 'base64-public-key',
      },
      networkCidr: {
        type: 'string',
        description: 'Network CIDR block',
        example: '192.168.0.0/24',
      },
      maxClients: {
        type: 'number',
        description: 'Maximum clients allowed',
        minimum: 1,
        example: 250,
      },
    },
  },

  /**
   * Create Server Response Schema
   * Returned from POST /admin/servers (201)
   */
  createServerResponse: {
    type: 'object',
    title: 'Create Server Response',
    description: 'Server successfully created',
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
        example: 'Server created successfully',
      },
      data: {
        type: 'object',
        additionalProperties: true,
        description: 'Created server information',
        properties: {
          id: { type: 'string', description: 'Server identifier' },
        },
      },
    },
  },

  /**
   * Update Server Status Request Schema
   * Used for PUT /admin/servers/{serverId}/status
   */
  updateServerStatusRequest: {
    type: 'object',
    title: 'Update Server Status Request',
    description: 'Update server operational and health status',
    additionalProperties: false,
    properties: {
      status: {
        type: 'string',
        enum: ['active', 'maintenance', 'offline', 'full'],
        description: 'Server operational status',
        example: 'active',
      },
      healthStatus: {
        type: 'string',
        enum: ['healthy', 'degraded', 'down', 'unknown'],
        description: 'Server health status',
        example: 'healthy',
      },
    },
  },

  /**
   * Update Server Status Response Schema
   * Returned from PUT /admin/servers/{serverId}/status (200)
   */
  updateServerStatusResponse: {
    type: 'object',
    title: 'Update Server Status Response',
    description: 'Server status updated successfully',
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
        example: 'Server status updated successfully',
      },
    },
  },

  /**
   * Error Response Schema
   * Used for all server endpoint errors
   */
  errorResponse: {
    type: 'object',
    title: 'Error Response',
    description: 'Standard server endpoint error response',
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
        example: 'Server not found',
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
 * HTTP Status Code Responses for Server Endpoints
 */
export const ServerResponses = {
  '200': {
    description: 'Success',
    schema: ServerSchemas.listServersResponse,
  },
  '201': {
    description: 'Created',
    schema: ServerSchemas.createServerResponse,
  },
  '400': {
    description: 'Bad Request - Validation error',
    schema: ServerSchemas.errorResponse,
  },
  '404': {
    description: 'Not Found',
    schema: ServerSchemas.errorResponse,
  },
  '500': {
    description: 'Internal Server Error',
    schema: ServerSchemas.errorResponse,
  },
};
