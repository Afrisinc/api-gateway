/**
 * Organization Management Request/Response Schemas
 * Professional JSON Schema definitions for organization endpoints
 */

export const OrganizationSchemas = {
  /**
   * Get All Organizations Query Schema
   * Used for GET /organizations
   */
  getAllOrganizationsQuery: {
    type: 'object',
    title: 'Get All Organizations Query',
    description: 'Query parameters for paginated organization list with optional search',
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
        description: 'Search term to filter organizations by name, legal name, or email',
        example: 'acme',
      },
      status: {
        type: 'string',
        description: 'Filter organizations by status',
        example: 'active',
      },
    },
  },

  /**
   * Get All Organizations Response Schema
   * Returned from GET /organizations
   */
  getAllOrganizationsResponse: {
    type: 'object',
    title: 'Get All Organizations Response',
    description: 'Paginated list of organizations',
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
        example: 'Organizations retrieved successfully',
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
            description: 'Array of organizations',
            items: {
              type: 'object',
              additionalProperties: true,
              properties: {
                id: {
                  type: 'string',
                  description: 'Organization ID',
                  example: 'org_123456789',
                },
                name: {
                  type: 'string',
                  description: 'Organization name',
                  example: 'Acme Corporation',
                },
                legal_name: {
                  type: ['string', 'null'],
                  description: 'Legal name',
                  example: 'Acme Corp Inc.',
                },
                country: {
                  type: ['string', 'null'],
                  description: 'Country',
                },
                tax_id: {
                  type: ['string', 'null'],
                  description: 'Tax ID',
                },
                org_email: {
                  type: ['string', 'null'],
                  format: 'email',
                  description: 'Organization email',
                },
                org_phone: {
                  type: ['string', 'null'],
                  description: 'Organization phone',
                },
                location: {
                  type: ['string', 'null'],
                  description: 'Organization location',
                },
                status: {
                  type: ['string', 'null'],
                  description: 'Organization status',
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
                members: {
                  type: 'array',
                  description: 'Organization members',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      user_id: { type: 'string' },
                      role: {
                        type: 'string',
                        enum: ['OWNER', 'ADMIN', 'MEMBER'],
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
   * Create Organization Request Schema
   * Used for POST /organizations
   */
  createOrganizationRequest: {
    type: 'object',
    title: 'Create Organization Request',
    description: 'Create a new organization with name and optional details',
    additionalProperties: false,
    required: ['name'],
    properties: {
      name: {
        type: 'string',
        description: 'Organization name',
        minLength: 1,
        maxLength: 255,
        example: 'Acme Corporation',
      },
      legal_name: {
        type: 'string',
        description: 'Legal name of organization',
        minLength: 1,
        maxLength: 255,
        example: 'Acme Corp Inc.',
      },
      country: {
        type: 'string',
        description: 'Country of organization',
        minLength: 2,
        maxLength: 100,
        example: 'United States',
      },
      tax_id: {
        type: ['string', 'null'],
        description: 'Tax ID (optional)',
        example: 'EIN123456789',
      },
      org_email: {
        type: ['string', 'null'],
        format: 'email',
        description: 'Organization email address (optional)',
        example: 'info@acmecorp.com',
      },
      org_phone: {
        type: ['string', 'null'],
        description: 'Organization phone number (optional)',
        example: '+1-555-123-4567',
      },
      location: {
        type: ['string', 'null'],
        description: 'Organization location/address (optional)',
        example: '123 Main St, New York, NY 10001',
      },
    },
  },

  /**
   * Create Organization Response Schema
   * Returned from POST /organizations
   */
  createOrganizationResponse: {
    type: 'object',
    title: 'Create Organization Response',
    description: 'Newly created organization',
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
        example: 'Organization created successfully',
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
          organization_id: {
            type: 'string',
            description: 'Newly created organization ID',
            example: 'org_123456789',
          },
          account_id: {
            type: 'string',
            description: 'Associated account ID',
            example: 'acc_987654321',
          },
          name: {
            type: 'string',
            description: 'Organization name',
            example: 'Acme Corporation',
          },
          legal_name: {
            type: ['string', 'null'],
            description: 'Legal name',
            example: 'Acme Corp Inc.',
          },
          country: {
            type: ['string', 'null'],
            description: 'Country',
            example: 'United States',
          },
          tax_id: {
            type: ['string', 'null'],
            description: 'Tax ID',
            example: 'EIN123456789',
          },
          org_email: {
            type: ['string', 'null'],
            description: 'Organization email',
            example: 'info@acmecorp.com',
          },
          org_phone: {
            type: ['string', 'null'],
            description: 'Organization phone',
            example: '+1-555-123-4567',
          },
          location: {
            type: ['string', 'null'],
            description: 'Organization location',
            example: '123 Main St, New York, NY 10001',
          },
        },
      },
    },
  },

  /**
   * Get Organization Response Schema
   * Used for GET /organizations/:organizationId
   */
  getOrganizationResponse: {
    type: 'object',
    title: 'Get Organization Response',
    description: 'Organization details and members',
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
        example: 'Organization retrieved successfully',
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
            description: 'Organization ID',
            example: 'org_123456789',
          },
          name: {
            type: 'string',
            description: 'Organization name',
            example: 'Acme Corporation',
          },
          legal_name: {
            type: ['string', 'null'],
            description: 'Legal name',
          },
          country: {
            type: ['string', 'null'],
            description: 'Country',
          },
          tax_id: {
            type: ['string', 'null'],
            description: 'Tax ID',
          },
          org_email: {
            type: ['string', 'null'],
            format: 'email',
            description: 'Organization email',
          },
          org_phone: {
            type: ['string', 'null'],
            description: 'Organization phone',
          },
          location: {
            type: ['string', 'null'],
            description: 'Organization location',
          },
          members: {
            type: 'array',
            description: 'Organization members',
            items: {
              type: 'object',
              additionalProperties: true,
              properties: {
                id: {
                  type: 'string',
                  description: 'Membership record ID',
                },
                organization_id: {
                  type: 'string',
                  description: 'Organization ID',
                },
                user_id: {
                  type: 'string',
                  description: 'User ID',
                },
                role: {
                  type: 'string',
                  enum: ['OWNER', 'ADMIN', 'MEMBER'],
                  description: 'Member role',
                },
                user: {
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
   * Update Organization Request Schema
   * Used for PUT /organizations/:organizationId
   */
  updateOrganizationRequest: {
    type: 'object',
    title: 'Update Organization Request',
    description: 'Update organization information',
    additionalProperties: false,
    properties: {
      name: {
        type: 'string',
        description: 'Organization name',
        minLength: 1,
        maxLength: 255,
        example: 'Acme Corporation Updated',
      },
      legal_name: {
        type: ['string', 'null'],
        description: 'Legal name of organization',
        example: 'Acme Corp Inc.',
      },
      country: {
        type: ['string', 'null'],
        description: 'Country of organization',
        example: 'United States',
      },
      tax_id: {
        type: ['string', 'null'],
        description: 'Tax ID',
        example: 'EIN123456789',
      },
      org_email: {
        type: ['string', 'null'],
        format: 'email',
        description: 'Organization email address',
        example: 'info@acmecorp.com',
      },
      org_phone: {
        type: ['string', 'null'],
        description: 'Organization phone number',
        example: '+1-555-123-4567',
      },
      location: {
        type: ['string', 'null'],
        description: 'Organization location/address',
        example: '123 Main St, New York, NY 10001',
      },
    },
  },

  /**
   * Update Organization Response Schema
   * Returned from PUT /organizations/:organizationId
   */
  updateOrganizationResponse: {
    type: 'object',
    title: 'Update Organization Response',
    description: 'Updated organization information',
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
        example: 'Organization updated successfully',
      },
      resp_code: {
        type: 'number',
        description: 'Response code',
        example: 1000,
      },
      data: {
        type: 'object',
        additionalProperties: true,
      },
    },
  },

  /**
   * Add Member Request Schema
   * Used for POST /organizations/:organizationId/members
   */
  addMemberRequest: {
    type: 'object',
    title: 'Add Member Request',
    description: 'Add a user as a member of the organization',
    additionalProperties: false,
    required: ['user_id', 'role'],
    properties: {
      user_id: {
        type: 'string',
        description: 'User ID to add as member',
        example: '81744ed8-697b-4c19-ac9e-aba1a55cb342',
      },
      role: {
        type: 'string',
        enum: ['OWNER', 'ADMIN', 'MEMBER'],
        description: 'Member role in organization',
        example: 'MEMBER',
      },
    },
  },

  /**
   * Add Member Response Schema
   * Returned from POST /organizations/:organizationId/members
   */
  addMemberResponse: {
    type: 'object',
    title: 'Add Member Response',
    description: 'Member added to organization',
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
        example: 'Member added successfully',
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
          member_id: {
            type: 'string',
            description: 'Membership record ID',
          },
          organization_id: {
            type: 'string',
            description: 'Organization ID',
          },
          user_id: {
            type: 'string',
            description: 'User ID',
          },
          role: {
            type: 'string',
            enum: ['OWNER', 'ADMIN', 'MEMBER'],
            description: 'Member role',
          },
        },
      },
    },
  },

  /**
   * Remove Member Response Schema
   * Returned from DELETE /organizations/:organizationId/members/:userId
   */
  removeMemberResponse: {
    type: 'object',
    title: 'Remove Member Response',
    description: 'Member removed from organization',
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
        example: 'Member removed successfully',
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
          message: {
            type: 'string',
            description: 'Confirmation message',
            example: 'Member removed successfully',
          },
        },
      },
    },
  },

  /**
   * List Members Response Schema
   * Returned from GET /organizations/:organizationId/members
   */
  listMembersResponse: {
    type: 'object',
    title: 'List Members Response',
    description: 'List of organization members',
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
        example: 'Members retrieved successfully',
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
          members: {
            type: 'array',
            description: 'Array of organization members',
            items: {
              type: 'object',
              additionalProperties: true,
              properties: {
                id: {
                  type: 'string',
                  description: 'Membership record ID',
                },
                organization_id: {
                  type: 'string',
                  description: 'Organization ID',
                },
                user_id: {
                  type: 'string',
                  description: 'User ID',
                },
                role: {
                  type: 'string',
                  enum: ['OWNER', 'ADMIN', 'MEMBER'],
                  description: 'Member role',
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
        example: 'Organization not found',
      },
      resp_code: {
        type: 'number',
        description: 'Error code for client handling',
        example: 2000,
      },
      message: {
        type: 'string',
        description: 'Error message (fallback)',
        example: 'Organization not found',
      },
    },
  },
};
