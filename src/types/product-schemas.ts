/**
 * Product Management Request/Response Schemas
 * Professional JSON Schema definitions for product endpoints
 */

export const ProductSchemas = {
  /**
   * Create Product Request Schema
   * Used for POST /products
   */
  createProductRequest: {
    type: 'object',
    title: 'Create Product Request',
    description: 'Create a new product with name, code, and optional description',
    additionalProperties: false,
    required: ['name', 'code'],
    properties: {
      name: {
        type: 'string',
        description: 'Product name',
        minLength: 1,
        maxLength: 255,
        example: 'Email Notifications',
      },
      code: {
        type: 'string',
        description: 'Product code (short identifier, must be unique)',
        minLength: 1,
        maxLength: 50,
        example: 'notify',
      },
      description: {
        type: ['string', 'null'],
        description: 'Product description (optional)',
        minLength: 0,
        maxLength: 1000,
        example: 'Email notification service for applications',
      },
    },
  },

  /**
   * Create Product Response Schema
   * Returned from POST /products
   */
  createProductResponse: {
    type: 'object',
    title: 'Create Product Response',
    description: 'Newly created product',
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
        example: 'Product created successfully',
      },
      resp_code: {
        type: 'number',
        description: 'Response code',
        example: 1001,
      },
      data: {
        type: 'object',
        additionalProperties: true,
        properties: {
          id: {
            type: 'string',
            description: 'Product ID (UUID)',
            example: 'prod_123456789',
          },
          name: {
            type: 'string',
            description: 'Product name',
            example: 'Email Notifications',
          },
          code: {
            type: 'string',
            description: 'Product code',
            example: 'notify',
          },
          description: {
            type: ['string', 'null'],
            description: 'Product description',
            example: 'Email notification service for applications',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Creation timestamp',
            example: '2026-01-27T21:06:35.014Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last update timestamp',
            example: '2026-01-27T21:06:35.014Z',
          },
        },
      },
    },
  },

  /**
   * Get Product Enrollments Response Schema
   * Used for GET /products/enrollments
   */
  getProductEnrollmentsResponse: {
    type: 'object',
    title: 'Get Product Enrollments Response',
    description: 'All products with enrollment statistics',
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
        example: 'Products enrollments retrieved successfully',
      },
      resp_code: {
        type: 'number',
        description: 'Response code',
        example: 1000,
      },
      data: {
        type: 'array',
        description: 'Array of products with enrollment statistics',
        items: {
          type: 'object',
          additionalProperties: true,
          properties: {
            productId: {
              type: 'string',
              description: 'Product ID',
              example: 'prod_123456789',
            },
            productName: {
              type: 'string',
              description: 'Product name',
              example: 'Email Notifications',
            },
            productCode: {
              type: 'string',
              description: 'Product code',
              example: 'notify',
            },
            totalEnrollments: {
              type: 'number',
              description: 'Total number of enrollments',
              example: 350,
            },
            active: {
              type: 'number',
              description: 'Number of active enrollments',
              example: 340,
            },
            suspended: {
              type: 'number',
              description: 'Number of suspended enrollments',
              example: 10,
            },
            plans: {
              type: 'object',
              description: 'Enrollment distribution by plan',
              properties: {
                FREE: {
                  type: 'number',
                  description: 'Free plan enrollments',
                  example: 250,
                },
                PRO: {
                  type: 'number',
                  description: 'Pro plan enrollments',
                  example: 80,
                },
                ENTERPRISE: {
                  type: 'number',
                  description: 'Enterprise plan enrollments',
                  example: 20,
                },
              },
            },
          },
        },
      },
    },
  },

  /**
   * Get Product Accounts Query Schema
   * Used for GET /products/:productId/accounts
   */
  getProductAccountsQuery: {
    type: 'object',
    title: 'Get Product Accounts Query',
    description: 'Query parameters for paginated account list',
    additionalProperties: false,
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
        default: 1,
        description: 'Page number (default: 1)',
        example: 1,
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        default: 50,
        description: 'Items per page (default: 50, max: 100)',
        example: 50,
      },
      status: {
        type: 'string',
        enum: ['ACTIVE', 'SUSPENDED', 'PENDING'],
        description: 'Filter by enrollment status',
        example: 'ACTIVE',
      },
    },
  },

  /**
   * Get Product Accounts Response Schema
   * Used for GET /products/:productId/accounts
   */
  getProductAccountsResponse: {
    type: 'object',
    title: 'Get Product Accounts Response',
    description: 'Accounts enrolled in a specific product with pagination',
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
        example: 'Product accounts retrieved successfully',
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
          product: {
            type: 'object',
            properties: {
              productId: {
                type: 'string',
                description: 'Product ID',
                example: 'prod_123456789',
              },
              productName: {
                type: 'string',
                description: 'Product name',
                example: 'Email Notifications',
              },
              productCode: {
                type: 'string',
                description: 'Product code',
                example: 'notify',
              },
            },
          },
          accounts: {
            type: 'array',
            description: 'Array of enrolled accounts',
            items: {
              type: 'object',
              additionalProperties: true,
              properties: {
                id: {
                  type: 'string',
                  description: 'Account ID',
                  example: 'acc_123456789',
                },
                type: {
                  type: 'string',
                  enum: ['INDIVIDUAL', 'ORGANIZATION'],
                  description: 'Account type',
                  example: 'INDIVIDUAL',
                },
                owner_user_id: {
                  type: 'string',
                  description: 'Owner user ID',
                },
                owner: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      description: 'User ID',
                    },
                    email: {
                      type: 'string',
                      format: 'email',
                      description: 'User email',
                    },
                    firstName: {
                      type: ['string', 'null'],
                      description: 'First name',
                    },
                    lastName: {
                      type: ['string', 'null'],
                      description: 'Last name',
                    },
                  },
                },
                enrollment: {
                  type: 'object',
                  properties: {
                    enrollmentId: {
                      type: 'string',
                      description: 'Enrollment ID',
                    },
                    status: {
                      type: 'string',
                      enum: ['ACTIVE', 'SUSPENDED', 'PENDING'],
                      description: 'Enrollment status',
                    },
                    plan: {
                      type: 'string',
                      enum: ['FREE', 'PRO', 'ENTERPRISE'],
                      description: 'Subscription plan',
                    },
                    enrolledAt: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Enrollment timestamp',
                    },
                  },
                },
              },
            },
          },
          pagination: {
            type: 'object',
            properties: {
              page: {
                type: 'integer',
                description: 'Current page number',
                example: 1,
              },
              limit: {
                type: 'integer',
                description: 'Items per page',
                example: 50,
              },
              totalItems: {
                type: 'integer',
                description: 'Total number of items',
                example: 250,
              },
              totalPages: {
                type: 'integer',
                description: 'Total number of pages',
                example: 5,
              },
              hasNext: {
                type: 'boolean',
                description: 'Whether there is a next page',
                example: true,
              },
              hasPrev: {
                type: 'boolean',
                description: 'Whether there is a previous page',
                example: false,
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
        example: 'Product not found',
      },
      resp_code: {
        type: 'number',
        description: 'Error code for client handling',
        example: 2000,
      },
      message: {
        type: 'string',
        description: 'Error message (fallback)',
        example: 'Product not found',
      },
    },
  },
};
