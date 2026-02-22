/**
 * Platform Analytics Request/Response Schemas
 * Professional JSON Schema definitions for platform analytics endpoints
 * Note: All endpoints require authentication and platform_admin role
 */

export const PlatformSchemas = {
  /**
   * Analytics Overview Response Schema
   * Used for GET /platform/analytics/overview
   */
  analyticsOverviewResponse: {
    type: 'object',
    title: 'Analytics Overview Response',
    description: 'High-level statistics about users, accounts, and product enrollments',
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
        example: 'Analytics retrieved successfully',
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
          total_users: {
            type: 'number',
            description: 'Total number of users',
            example: 1250,
          },
          total_accounts: {
            type: 'number',
            description: 'Total number of accounts',
            example: 950,
          },
          total_organizations: {
            type: 'number',
            description: 'Total number of organizations',
            example: 120,
          },
          total_enrollments: {
            type: 'number',
            description: 'Total product enrollments',
            example: 2100,
          },
          active_enrollments: {
            type: 'number',
            description: 'Active product enrollments',
            example: 2050,
          },
          suspended_enrollments: {
            type: 'number',
            description: 'Suspended product enrollments',
            example: 50,
          },
          individual_accounts: {
            type: 'number',
            description: 'Individual (personal) accounts',
            example: 830,
          },
          organization_accounts: {
            type: 'number',
            description: 'Organization accounts',
            example: 120,
          },
          products: {
            type: 'array',
            description: 'Per-product enrollment statistics',
            items: {
              type: 'object',
              properties: {
                product_code: {
                  type: 'string',
                  description: 'Product code',
                  example: 'notify',
                },
                total_enrollments: {
                  type: 'number',
                  description: 'Total enrollments for this product',
                  example: 700,
                },
                active_enrollments: {
                  type: 'number',
                  description: 'Active enrollments for this product',
                  example: 680,
                },
              },
            },
          },
        },
      },
    },
  },

  /**
   * User Analytics Response Schema
   * Used for GET /platform/analytics/users
   */
  userAnalyticsResponse: {
    type: 'object',
    title: 'User Analytics Response',
    description: 'User statistics including new, verified, and active users',
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
        example: 'User analytics retrieved successfully',
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
          total_users: {
            type: 'number',
            description: 'Total users in the platform',
            example: 1250,
          },
          new_users_in_range: {
            type: 'number',
            description: 'New users in the specified range',
            example: 85,
          },
          verified_users: {
            type: 'number',
            description: 'Email-verified users',
            example: 1180,
          },
          suspended_users: {
            type: 'number',
            description: 'Suspended user accounts',
            example: 12,
          },
          active_users_in_range: {
            type: 'number',
            description: 'Users active in the specified range',
            example: 340,
          },
        },
      },
    },
  },

  /**
   * User Analytics Query Schema
   * Used for GET /platform/analytics/users query parameters
   */
  userAnalyticsQuery: {
    type: 'object',
    title: 'User Analytics Query',
    description: 'Query parameters for user analytics',
    properties: {
      range: {
        type: 'string',
        description: 'Date range (30d, 7d, 90d, etc)',
        example: '30d',
      },
    },
  },

  /**
   * Account Analytics Response Schema
   * Used for GET /platform/analytics/accounts
   */
  accountAnalyticsResponse: {
    type: 'object',
    title: 'Account Analytics Response',
    description: 'Account statistics including individual and organization accounts',
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
        example: 'Account analytics retrieved successfully',
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
          total_accounts: {
            type: 'number',
            description: 'Total accounts',
            example: 950,
          },
          individual_accounts: {
            type: 'number',
            description: 'Individual (personal) accounts',
            example: 830,
          },
          organization_accounts: {
            type: 'number',
            description: 'Organization accounts',
            example: 120,
          },
          new_accounts_30d: {
            type: 'number',
            description: 'New accounts in last 30 days',
            example: 42,
          },
          active_accounts_30d: {
            type: 'number',
            description: 'Active accounts in last 30 days',
            example: 567,
          },
        },
      },
    },
  },

  /**
   * Product Analytics Response Schema
   * Used for GET /platform/analytics/products
   */
  productAnalyticsResponse: {
    type: 'object',
    title: 'Product Analytics Response',
    description: 'Product enrollment statistics including plan distribution',
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
        example: 'Product analytics retrieved successfully',
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
          products: {
            type: 'array',
            description: 'Per-product enrollment details',
            items: {
              type: 'object',
              additionalProperties: true,
              properties: {
                product_code: {
                  type: 'string',
                  description: 'Product code',
                  example: 'notify',
                },
                total_enrollments: {
                  type: 'number',
                  description: 'Total enrollments for this product',
                  example: 700,
                },
                active_enrollments: {
                  type: 'number',
                  description: 'Active enrollments',
                  example: 680,
                },
                suspended_enrollments: {
                  type: 'number',
                  description: 'Suspended enrollments',
                  example: 20,
                },
                plan_distribution: {
                  type: 'object',
                  description: 'Distribution of plans',
                  properties: {
                    FREE: {
                      type: 'number',
                      description: 'Free plan enrollments',
                      example: 450,
                    },
                    PRO: {
                      type: 'number',
                      description: 'Pro plan enrollments',
                      example: 180,
                    },
                    ENTERPRISE: {
                      type: 'number',
                      description: 'Enterprise plan enrollments',
                      example: 70,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  /**
   * Growth Metrics Response Schema
   * Used for GET /platform/analytics/growth
   */
  growthMetricsResponse: {
    type: 'object',
    title: 'Growth Metrics Response',
    description: 'Daily growth aggregation for users, accounts, and enrollments',
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
        example: 'Growth metrics retrieved successfully',
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
          users: {
            type: 'array',
            description: 'Daily user growth data',
            items: {
              type: 'object',
              properties: {
                date: {
                  type: 'string',
                  format: 'date',
                  description: 'Date (YYYY-MM-DD)',
                  example: '2026-02-15',
                },
                count: {
                  type: 'number',
                  description: 'New users on this date',
                  example: 5,
                },
              },
            },
          },
          accounts: {
            type: 'array',
            description: 'Daily account growth data',
            items: {
              type: 'object',
              properties: {
                date: {
                  type: 'string',
                  format: 'date',
                  description: 'Date (YYYY-MM-DD)',
                  example: '2026-02-15',
                },
                count: {
                  type: 'number',
                  description: 'New accounts on this date',
                  example: 3,
                },
              },
            },
          },
          enrollments: {
            type: 'array',
            description: 'Daily enrollment growth data',
            items: {
              type: 'object',
              properties: {
                date: {
                  type: 'string',
                  format: 'date',
                  description: 'Date (YYYY-MM-DD)',
                  example: '2026-02-15',
                },
                count: {
                  type: 'number',
                  description: 'New enrollments on this date',
                  example: 12,
                },
              },
            },
          },
        },
      },
    },
  },

  /**
   * Growth Metrics Query Schema
   * Used for GET /platform/analytics/growth query parameters
   */
  growthMetricsQuery: {
    type: 'object',
    title: 'Growth Metrics Query',
    description: 'Query parameters for growth metrics',
    properties: {
      range: {
        type: 'string',
        description: 'Date range (30d, 7d, 90d, etc)',
        example: '30d',
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
        example: 'Insufficient permissions for analytics access',
      },
      resp_code: {
        type: 'number',
        description: 'Error code for client handling',
        example: 2003,
      },
      message: {
        type: 'string',
        description: 'Error message (fallback)',
        example: 'Insufficient permissions for analytics access',
      },
    },
  },
};
