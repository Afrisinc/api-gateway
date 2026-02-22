/**
 * User Management Request/Response Schemas
 * Professional JSON Schema definitions for user endpoints
 */

export const UserSchemas = {
  /**
   * Get All Users Request Schema
   * Used for GET /users
   */
  getAllUsersRequest: {
    type: 'object',
    title: 'Get All Users Query',
    description: 'Query parameters for paginated user list with optional search',
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
        description: 'Search term to filter users by firstName, lastName, email, or phone',
        example: 'john',
      },
    },
  },

  /**
   * Get All Users Response Schema
   * Returned from GET /users
   */
  getAllUsersResponse: {
    type: 'object',
    title: 'Get All Users Response',
    description: 'Paginated list of users',
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
        example: 'Users retrieved successfully',
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
            description: 'Array of users',
            items: {
              type: 'object',
              additionalProperties: true,
              properties: {
                id: {
                  type: 'string',
                  description: 'Unique user identifier (UUID)',
                  example: '81744ed8-697b-4c19-ac9e-aba1a55cb342',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'User email address',
                  example: 'user@example.com',
                },
                firstName: {
                  type: 'string',
                  description: 'User first name',
                  example: 'John',
                },
                lastName: {
                  type: 'string',
                  description: 'User last name',
                  example: 'Doe',
                },
                phone: {
                  type: 'string',
                  description: 'User phone number',
                  example: '+1234567890',
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Account creation timestamp',
                  example: '2026-01-27T21:06:35.014Z',
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
                example: 50,
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
   * Get User Profile Request Schema
   * Used for GET /users/profile
   */
  getUserProfileRequest: {
    type: 'object',
    title: 'Get User Profile Query',
    description: 'No query parameters required',
  },

  /**
   * Get User Profile Response Schema
   * Returned from GET /users/profile
   */
  getUserProfileResponse: {
    type: 'object',
    title: 'Get User Profile Response',
    description: 'Current authenticated user profile',
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
        example: 'User profile retrieved successfully',
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
            description: 'Unique user identifier (UUID)',
            example: '81744ed8-697b-4c19-ac9e-aba1a55cb342',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address',
            example: 'user@example.com',
          },
          firstName: {
            type: 'string',
            description: 'User first name',
            example: 'John',
          },
          lastName: {
            type: 'string',
            description: 'User last name',
            example: 'Doe',
          },
          phone: {
            type: 'string',
            description: 'User phone number',
            example: '+1234567890',
          },
          tin: {
            type: 'string',
            description: 'Tax identification number',
            example: '',
          },
          companyName: {
            type: 'string',
            description: 'Company name',
            example: '',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Account creation timestamp',
            example: '2026-01-27T21:06:35.014Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last account update timestamp',
            example: '2026-01-27T21:06:35.014Z',
          },
        },
      },
    },
  },

  /**
   * Update User Profile Request Schema
   * Used for PUT /users/profile
   */
  updateUserProfileRequest: {
    type: 'object',
    title: 'Update User Profile Request',
    description: 'Update current authenticated user profile information',
    additionalProperties: false,
    properties: {
      firstName: {
        type: 'string',
        description: 'User first name',
        minLength: 1,
        maxLength: 50,
        example: 'John',
      },
      lastName: {
        type: 'string',
        description: 'User last name',
        minLength: 1,
        maxLength: 50,
        example: 'Doe',
      },
      phone: {
        type: 'string',
        description: 'User phone number (international format recommended)',
        minLength: 10,
        maxLength: 20,
        pattern: '^[+]?[0-9]{10,20}$',
        example: '+1234567890',
      },
      tin: {
        type: ['string', 'null'],
        description: 'Tax identification number',
        example: '',
      },
      companyName: {
        type: ['string', 'null'],
        description: 'Company name',
        example: 'Acme Corp',
      },
    },
  },

  /**
   * Update User Profile Response Schema
   * Returned from PUT /users/profile
   */
  updateUserProfileResponse: {
    type: 'object',
    title: 'Update User Profile Response',
    description: 'Updated user profile',
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
        example: 'User profile updated successfully',
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
            description: 'Unique user identifier (UUID)',
            example: '81744ed8-697b-4c19-ac9e-aba1a55cb342',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address',
            example: 'user@example.com',
          },
          firstName: {
            type: 'string',
            description: 'User first name',
            example: 'John',
          },
          lastName: {
            type: 'string',
            description: 'User last name',
            example: 'Doe',
          },
          phone: {
            type: 'string',
            description: 'User phone number',
            example: '+1234567890',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last account update timestamp',
            example: '2026-01-27T21:06:35.014Z',
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
        example: 'User not found',
      },
      resp_code: {
        type: 'number',
        description: 'Error code for client handling',
        example: 2000,
      },
      message: {
        type: 'string',
        description: 'Error message (fallback)',
        example: 'User not found',
      },
    },
  },
};
