/**
 * Account Management Request/Response Schemas
 * Professional JSON Schema definitions for account endpoints
 */

export const AccountSchemas = {
  /**
   * Get All Accounts Query Schema
   * Used for GET /accounts/all
   */
  getAllAccountsQuery: {
    type: 'object',
    title: 'Get All Accounts Query',
    description: 'Query parameters for paginated account list with optional filtering',
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
        default: 10,
        description: 'Items per page (default: 10, max: 100)',
        example: 10,
      },
      search: {
        type: 'string',
        description: 'Search term to filter accounts by ID or owner email',
        example: 'user@example.com',
      },
      type: {
        type: 'string',
        enum: ['INDIVIDUAL', 'ORGANIZATION'],
        description: 'Filter accounts by type',
        example: 'INDIVIDUAL',
      },
    },
  },

  /**
   * Get All Accounts Response Schema
   * Used for GET /accounts/all
   */
  getAllAccountsResponse: {
    type: 'object',
    title: 'Get All Accounts Response',
    description: 'Paginated list of all accounts',
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
        example: 'Accounts retrieved successfully',
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
          data: {
            type: 'array',
            description: 'Array of accounts',
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
                organization_id: {
                  type: ['string', 'null'],
                  description: 'Organization ID (if applicable)',
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Creation timestamp',
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Last update timestamp',
                },
                owner: {
                  type: 'object',
                  additionalProperties: true,
                  properties: {
                    id: {
                      type: 'string',
                      description: 'Owner user ID',
                    },
                    email: {
                      type: 'string',
                      format: 'email',
                      description: 'Owner email',
                    },
                  },
                },
                products: {
                  type: 'array',
                  description: 'Enrolled products',
                  items: {
                    type: 'object',
                    additionalProperties: true,
                    properties: {
                      id: {
                        type: 'string',
                        description: 'Enrollment ID',
                      },
                      account_id: {
                        type: 'string',
                        description: 'Account ID',
                      },
                      product_id: {
                        type: 'string',
                        description: 'Product ID',
                      },
                      status: {
                        type: 'string',
                        enum: ['PROVISIONING', 'ACTIVE', 'SUSPENDED'],
                        description: 'Enrollment status',
                      },
                      plan: {
                        type: 'string',
                        enum: ['FREE', 'PRO', 'ENTERPRISE'],
                        description: 'Subscription plan',
                      },
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
                example: 10,
              },
              totalItems: {
                type: 'integer',
                description: 'Total number of items',
                example: 100,
              },
              totalPages: {
                type: 'integer',
                description: 'Total number of pages',
                example: 10,
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
   * Get User Accounts Response Schema
   * Used for GET /accounts
   */
  getUserAccountsResponse: {
    type: 'object',
    title: 'Get User Accounts Response',
    description: 'List of accounts belonging to authenticated user',
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
        example: 'Accounts retrieved successfully',
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
          accounts: {
            type: 'array',
            description: 'Array of accounts',
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
                  example: '81744ed8-697b-4c19-ac9e-aba1a55cb342',
                },
                organization_id: {
                  type: ['string', 'null'],
                  description: 'Organization ID (if applicable)',
                  example: null,
                },
                products: {
                  type: 'array',
                  description: 'Enrolled products',
                  items: {
                    type: 'object',
                    additionalProperties: true,
                    properties: {
                      id: {
                        type: 'string',
                        description: 'Product enrollment ID',
                      },
                      account_id: {
                        type: 'string',
                        description: 'Account ID',
                      },
                      product_id: {
                        type: 'string',
                        description: 'Product ID',
                      },
                      status: {
                        type: 'string',
                        enum: ['ACTIVE', 'SUSPENDED'],
                        description: 'Enrollment status',
                      },
                      plan: {
                        type: 'string',
                        enum: ['FREE', 'PRO', 'ENTERPRISE'],
                        description: 'Subscription plan',
                      },
                      product: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          name: { type: 'string' },
                          code: { type: 'string' },
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
    },
  },

  /**
   * Get Account By ID Response Schema
   * Used for GET /accounts/:accountId
   */
  getAccountByIdResponse: {
    type: 'object',
    title: 'Get Account Response',
    description: 'Account details and enrolled products',
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
        example: 'Account retrieved successfully',
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
          organization_id: {
            type: ['string', 'null'],
            description: 'Organization ID',
          },
          products: {
            type: 'array',
            description: 'Enrolled products',
            items: {
              type: 'object',
              additionalProperties: true,
            },
          },
        },
      },
    },
  },

  /**
   * Get Account Products Response Schema
   * Used for GET /accounts/:accountId/products
   */
  getAccountProductsResponse: {
    type: 'object',
    title: 'Get Account Products Response',
    description: 'List of products enrolled by account',
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
        example: 'Products retrieved successfully',
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
            description: 'Array of enrolled products',
            items: {
              type: 'object',
              additionalProperties: true,
              properties: {
                id: {
                  type: 'string',
                  description: 'Enrollment ID',
                },
                account_id: {
                  type: 'string',
                  description: 'Account ID',
                },
                product_id: {
                  type: 'string',
                  description: 'Product ID',
                },
                status: {
                  type: 'string',
                  enum: ['PROVISIONING', 'ACTIVE', 'SUSPENDED'],
                  description: 'Product status',
                },
                plan: {
                  type: 'string',
                  enum: ['FREE', 'PRO', 'ENTERPRISE'],
                  description: 'Subscription plan',
                },
                external_resource_id: {
                  type: ['string', 'null'],
                  description: 'External resource identifier',
                },
                product: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    code: { type: 'string' },
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
   * Enroll Product Request Schema
   * Used for POST /accounts/:accountId/enroll-product
   */
  enrollProductRequest: {
    type: 'object',
    title: 'Enroll Product Request',
    description: 'Enroll account in a product with specified plan',
    additionalProperties: false,
    required: ['product_code'],
    properties: {
      product_code: {
        type: 'string',
        description: 'Product code (e.g., notify, media, billing)',
        example: 'notify',
      },
      plan: {
        type: 'string',
        enum: ['FREE', 'PRO', 'ENTERPRISE'],
        description: 'Subscription plan (default: FREE)',
        example: 'FREE',
      },
    },
  },

  /**
   * Enroll Product Response Schema
   * Returned from POST /accounts/:accountId/enroll-product
   */
  enrollProductResponse: {
    type: 'object',
    title: 'Enroll Product Response',
    description: 'Product enrollment confirmation',
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
        example: 'Product enrollment successful',
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
          enrollment_id: {
            type: 'string',
            description: 'Enrollment record ID',
          },
          product_code: {
            type: 'string',
            description: 'Product code',
            example: 'notify',
          },
          account_id: {
            type: 'string',
            description: 'Account ID',
          },
          plan: {
            type: 'string',
            enum: ['FREE', 'PRO', 'ENTERPRISE'],
            description: 'Subscription plan',
          },
          status: {
            type: 'string',
            enum: ['PROVISIONING', 'ACTIVE', 'SUSPENDED'],
            description: 'Product status',
          },
        },
      },
    },
  },

  /**
   * Switch Product Request Schema
   * Used for POST /auth/switch-product
   */
  switchProductRequest: {
    type: 'object',
    title: 'Switch Product Request',
    description: 'Get a product-scoped token for accessing a specific product',
    additionalProperties: false,
    required: ['account_id', 'product_code'],
    properties: {
      account_id: {
        type: 'string',
        description: 'Account ID',
        example: 'acc_123456789',
      },
      product_code: {
        type: 'string',
        description: 'Product code to switch to',
        example: 'notify',
      },
    },
  },

  /**
   * Switch Product Response Schema
   * Returned from POST /auth/switch-product
   */
  switchProductResponse: {
    type: 'object',
    title: 'Switch Product Response',
    description: 'Product-scoped authentication token',
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
        example: 'Product switched successfully',
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
          account_id: {
            type: 'string',
            description: 'Account ID',
          },
          product: {
            type: 'string',
            description: 'Product code',
            example: 'notify',
          },
          account_type: {
            type: 'string',
            enum: ['INDIVIDUAL', 'ORGANIZATION'],
            description: 'Account type',
          },
          token: {
            type: 'string',
            description: 'Product-scoped JWT token',
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4MTc0NGVkOC02OTdiLTRjMTktYWM5ZS1hYmExYTU1Y2IzNDIiLCJwcm9kdWN0Ijoibm90aWZ5IiwiaWF0IjoxNzY5NTQ4MDA1LCJleHAiOjE3NzAxNTI4MDV9.aZ0zY0Yp2cjB5bCp9K5LiI2_l4YSqh8h4l8_uydJteY',
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
        example: 'Account not found',
      },
      resp_code: {
        type: 'number',
        description: 'Error code for client handling',
        example: 2000,
      },
      message: {
        type: 'string',
        description: 'Error message (fallback)',
        example: 'Account not found',
      },
    },
  },
};
