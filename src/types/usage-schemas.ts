/**
 * Usage Request/Response Schemas
 * Professional JSON Schema definitions for usage statistics endpoints
 */

export const UsageSchemas = {
  /**
   * Get User Total Usage Response Schema
   * Returned from GET /vpn/users/{userId}/usage (200)
   */
  getUserUsageResponse: {
    type: 'object',
    title: 'Get User Total Usage Response',
    description: 'Aggregated data usage statistics for a user across all devices',
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
        example: 'User usage retrieved successfully',
      },
      data: {
        type: 'object',
        additionalProperties: true,
        description: 'User usage statistics',
        properties: {
          userId: { type: 'string', description: 'User identifier (UUID)' },
          totalBytesSent: { type: 'number', description: 'Total bytes sent across all devices' },
          totalBytesReceived: { type: 'number', description: 'Total bytes received across all devices' },
          totalBytes: { type: 'number', description: 'Total bytes transferred' },
          totalGB: { type: 'number', description: 'Total usage in gigabytes' },
          devices: {
            type: 'array',
            description: 'Per-device usage breakdown',
            items: {
              type: 'object',
              additionalProperties: true,
              properties: {
                deviceId: { type: 'string', description: 'Device identifier' },
                deviceName: { type: 'string', description: 'Device name' },
                bytesSent: { type: 'number', description: 'Bytes sent on this device' },
                bytesReceived: { type: 'number', description: 'Bytes received on this device' },
                totalGB: { type: 'number', description: 'Total usage for this device in GB' },
              },
            },
          },
        },
      },
    },
  },

  /**
   * Error Response Schema
   * Used for usage endpoint errors
   */
  errorResponse: {
    type: 'object',
    title: 'Error Response',
    description: 'Standard usage endpoint error response',
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
          code: { type: 'string', description: 'Error code' },
          message: { type: 'string', description: 'Detailed error message' },
        },
      },
    },
  },
};

/**
 * HTTP Status Code Responses for Usage Endpoints
 */
export const UsageResponses = {
  '200': {
    description: 'Success',
    schema: UsageSchemas.getUserUsageResponse,
  },
  '400': {
    description: 'Bad Request - Invalid UUID',
    schema: UsageSchemas.errorResponse,
  },
  '404': {
    description: 'Not Found',
    schema: UsageSchemas.errorResponse,
  },
  '500': {
    description: 'Internal Server Error',
    schema: UsageSchemas.errorResponse,
  },
};
