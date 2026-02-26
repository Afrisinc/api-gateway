/**
 * Security Monitoring Request/Response Schemas
 * Professional JSON Schema definitions for security endpoints
 */

export const SecuritySchemas = {
  /**
   * Get Security Overview Query Schema
   * Used for GET /platform/security/overview
   */
  getSecurityOverviewQuery: {
    type: 'object',
    title: 'Get Security Overview Query',
    description: 'Query parameters for security overview',
    additionalProperties: false,
    properties: {
      range: {
        type: 'string',
        enum: ['24h', '7d', '30d'],
        default: '24h',
        description: 'Time range for failed logins - "24h", "7d", "30d"',
        example: '24h',
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 50,
        default: 5,
        description: 'Number of top IPs to return (default: 5, max: 50)',
        example: 5,
      },
      failed_login_limit: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        default: 10,
        description: 'Number of failed login records to return (default: 10, max: 100)',
        example: 10,
      },
    },
  },

  /**
   * Get Security Overview Response Schema
   * Returned from GET /platform/security/overview
   */
  getSecurityOverviewResponse: {
    type: 'object',
    title: 'Get Security Overview Response',
    description: 'Comprehensive security monitoring data',
    additionalProperties: true,
    properties: {
      success: {
        type: 'boolean',
        description: 'Success status',
        example: true,
      },
      resp_msg: {
        type: 'string',
        description: 'Response message',
        example: 'Security overview retrieved successfully',
      },
      resp_code: {
        type: 'number',
        description: 'Response code',
        example: 1000,
      },
      data: {
        type: 'object',
        additionalProperties: true,
        properties: {
          failedLogins24h: {
            type: 'number',
            description: 'Count of failed login attempts in the specified range',
            example: 47,
          },
          tokenIssuanceCount: {
            type: 'number',
            description: 'Total number of tokens issued',
            example: 1284,
          },
          suspiciousActivity: {
            type: 'boolean',
            description: 'Whether suspicious activity has been detected',
            example: true,
          },
          topIPs: {
            type: 'array',
            description: 'Array of top IP addresses with failed login attempts',
            items: {
              type: 'object',
              properties: {
                ip: {
                  type: 'string',
                  description: 'IP address',
                  example: '192.168.1.105',
                },
                attempts: {
                  type: 'number',
                  description: 'Number of failed login attempts from this IP',
                  example: 12,
                },
              },
            },
          },
          failedLogins: {
            type: 'array',
            description: 'Array of recent failed login records',
            items: {
              type: 'object',
              additionalProperties: true,
              properties: {
                id: {
                  type: 'string',
                  description: 'Failed login record ID',
                  example: 'fl-001',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'User email address',
                  example: 'user@example.com',
                },
                ip: {
                  type: 'string',
                  description: 'IP address of the login attempt',
                  example: '192.168.1.105',
                },
                timestamp: {
                  type: 'string',
                  format: 'date-time',
                  description: 'When the failed login occurred',
                  example: '2026-02-22T10:30:00.000Z',
                },
                reason: {
                  type: 'string',
                  enum: ['Invalid password', 'Account locked', 'MFA failed', 'Expired token'],
                  description: 'Reason for login failure',
                  example: 'Invalid password',
                },
              },
            },
          },
        },
      },
    },
  },

  /**
   * Error Response Schema
   * Used for all error responses
   */
  errorResponse: {
    type: 'object',
    title: 'Error Response',
    description: 'Standard error response format',
    additionalProperties: true,
    properties: {
      success: {
        type: 'boolean',
        description: 'Success status (false for errors)',
        example: false,
      },
      resp_msg: {
        type: 'string',
        description: 'Error message',
        example: 'Invalid range parameter',
      },
      resp_code: {
        type: 'number',
        description: 'Error code for client handling',
        example: 2000,
      },
      message: {
        type: 'string',
        description: 'Error message (fallback)',
        example: 'Invalid range parameter',
      },
    },
  },

  /**
   * Get Security Overview Query Schema
   * Used for GET /platform/security/overview
   */
  getSecurityLoginEventsQuery: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
        default: 1,
        description: 'Page number for pagination',
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        default: 10,
        description: 'Number of records per page',
      },
      search: {
        type: 'string',
        description: 'Search by user name (first/last), phone number, or IP address',
      },
      sortBy: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'desc',
        description: 'Sort by date - "asc" for oldest first, "desc" for newest first',
      },
    },
  },

  /**
   * Get Security Overview Response Schema
   * Returned from GET /platform/security/overview
   */
  getSecurityLoginEventsResponse: {
    type: 'object',
    title: 'Get Security Overview Response',
    description: 'Comprehensive security monitoring data',
    additionalProperties: true,
    properties: {
      success: {
        type: 'boolean',
        description: 'Success status',
        example: true,
      },
      resp_msg: {
        type: 'string',
        description: 'Response message',
        example: 'Login events retrieved successfully',
      },
      resp_code: {
        type: 'number',
        description: 'Response code',
        example: 1000,
      },
      data: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'event-123' },
                type: { type: 'string', enum: ['login_event', 'login_failure'], example: 'login_event' },
                userId: { type: 'string', example: 'user-456' },
                email: { type: 'string', example: 'user@example.com' },
                name: { type: 'string', example: 'John Doe' },
                phone: { type: 'string', example: '1234567890' },
                status: { type: 'string', example: 'success' },
                ip: { type: 'string', example: '192.168.1.100' },
                reason: { type: 'string', example: 'Invalid password' },
                createdAt: { type: 'string', format: 'date-time', example: '2026-02-26T10:30:00.000Z' },
              },
            },
          },
          pagination: {
            type: 'object',
            properties: {
              page: { type: 'integer', example: 1 },
              limit: { type: 'integer', example: 10 },
              total: { type: 'integer', example: 50 },
              pages: { type: 'integer', example: 5 },
            },
          },
        },
      },
    },
  },
};
