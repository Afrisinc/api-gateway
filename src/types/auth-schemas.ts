/**
 * Auth Request/Response Schemas
 * Professional JSON Schema definitions for authentication endpoints
 */

export const AuthSchemas = {
  /**
   * Registration Request Schema
   * Used for POST /auth/register
   */
  registerRequest: {
    type: 'object',
    title: 'User Registration Request',
    description: 'User registration with email, password, and account details (personal or company)',
    required: ['firstName', 'lastName', 'email', 'password', 'account_type', 'phone'],
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
      email: {
        type: 'string',
        format: 'email',
        description: 'User email address for registration',
        example: 'john.doe@example.com',
        minLength: 5,
        maxLength: 255,
      },
      phone: {
        type: 'string',
        description: 'User phone number',
        minLength: 10,
        maxLength: 20,
        pattern: '^[+]?[0-9]{10,20}$',
        example: '+1234567890',
      },
      location: {
        type: 'string',
        description: 'User location/address (optional)',
        example: 'New York, USA',
      },
      password: {
        type: 'string',
        minLength: 6,
        maxLength: 128,
        description: 'User password (minimum 6 characters)',
        example: 'SecurePass123!',
      },
      account_type: {
        type: 'string',
        enum: ['personal', 'company'],
        description: 'Account type',
        example: 'company',
      },
      account_name: {
        type: 'string',
        description: 'Account name',
        example: 'My Company Account',
      },
      product_code: {
        type: 'string',
        description: 'Product code (optional)',
      },
      displayName: {
        type: 'string',
        description: 'Display name (optional)',
        example: 'John D.',
      },
      organizationName: {
        type: 'string',
        description: 'Organization name',
        example: 'Acme Corporation',
      },
      jobTitle: {
        type: 'string',
        description: 'Job title (optional)',
        example: 'Software Engineer',
      },
      industry: {
        type: 'string',
        description: 'Industry (optional)',
        example: 'Technology',
      },
      companyEmail: {
        type: 'string',
        format: 'email',
        description: 'Company email',
        example: 'john@acmecorp.com',
      },
      companySize: {
        type: 'string',
        description: 'Company size (optional)',
        example: '50-100',
      },
      website: {
        type: 'string',
        description: 'Website (optional)',
        example: 'https://acmecorp.com',
      },
    },
  },

  /**
   * Login Request Schema
   * Used for POST /auth/login
   */
  loginRequest: {
    type: 'object',
    title: 'User Login Request',
    description: 'User login with email and password',
    required: ['email', 'password'],
    additionalProperties: false,
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'Registered user email address',
        example: 'john.doe@example.com',
      },
      password: {
        type: 'string',
        description: 'User password',
        example: 'SecurePass123!',
      },
      product_code: {
        type: 'string',
        description: 'Product code',
      },
    },
  },

  /**
   * Login Response Schema
   * Returned from POST /auth/login
   */

  loginResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      resp_msg: { type: 'string', example: 'Login successful' },
      resp_code: { type: 'number', example: 1000 },
      data: {
        type: 'object',
        properties: {
          user_id: { type: 'string', description: 'User ID' },
          email: { type: 'string', description: 'User email' },
          account_ids: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of account IDs user owns',
          },
          code: { type: 'string', description: 'Authorization code (short-lived, 10 minutes)' },
          redirect: { type: 'boolean', description: 'Whether a redirect is required' },
          callback: { type: 'string', description: 'URL to redirect user after login with authorization code' },
          productCount: { type: 'number', description: 'Number of products user is enrolled in' },
        },
        required: ['user_id', 'email', 'account_ids', 'code', 'redirect'],
      },
    },
    required: ['success', 'resp_msg', 'resp_code', 'data'],
  },

  /**
   * Registration Response Schema
   * Returned from POST /auth/register
   */
  registrationResponse: {
    type: 'object',
    title: 'User Registration Response',
    description: 'Successful registration response',
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
        example: 'User registered successfully',
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
          user: {
            type: 'object',
            additionalProperties: true,
            description: 'User information',
            properties: {
              id: {
                type: 'string',
                description: 'Newly created user ID',
                example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
              },
              email: {
                type: 'string',
                format: 'email',
                description: 'Registered email address',
                example: 'john.doe@example.com',
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
                example: '2024-01-27T10:30:00Z',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                description: 'Last account update timestamp',
                example: '2024-01-27T10:30:00Z',
              },
              lastLogin: {
                type: 'string',
                description: 'Last login timestamp',
                example: '',
              },
            },
          },
          token: {
            type: 'string',
            description: 'JWT authentication token',
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4MTc0NGVkOC02OTdiLTRjMTktYWM5ZS1hYmExYTU1Y2IzNDIiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3Njk1NDgwMDUsImV4cCI6MTc3MDE1MjgwNX0.aZ0zY0Yp2cjB5bCp9K5LiI2_l4YSqh8h4l8_uydJteY',
          },
        },
      },
    },
  },

  /**
   * Forgot Password Request Schema
   * Used for POST /auth/forgot-password
   */
  forgotPasswordRequest: {
    type: 'object',
    title: 'Forgot Password Request',
    description: 'Request password reset link via email',
    required: ['email'],
    additionalProperties: false,
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'Registered user email address',
        example: 'john.doe@example.com',
      },
    },
  },

  /**
   * Forgot Password Response Schema
   * Returned from POST /auth/forgot-password
   */
  forgotPasswordResponse: {
    type: 'object',
    title: 'Forgot Password Response',
    description: 'Password reset link sent to email',
    properties: {
      message: {
        type: 'string',
        description: 'Success message',
        example: 'Password reset link has been sent to your email address',
      },
      emailSent: {
        type: 'boolean',
        description: 'Whether email was successfully sent',
        example: true,
      },
    },
  },

  /**
   * Reset Password Request Schema
   * Used for POST /auth/reset-password
   */
  resetPasswordRequest: {
    type: 'object',
    title: 'Reset Password Request',
    description: 'Reset password using token or OTP',
    required: ['password'],
    additionalProperties: false,
    properties: {
      password: {
        type: 'string',
        description:
          'New password (minimum 8 characters, must contain uppercase, lowercase, number, and special character)',
        minLength: 8,
        maxLength: 128,
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
        example: 'NewSecurePass456!',
      },
      token: {
        type: ['string', 'null'],
        description: 'Password reset token (provided in reset email)',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
      otp: {
        type: ['string', 'null'],
        description: 'One-time password (6-8 digits sent via email/SMS)',
        minLength: 6,
        maxLength: 8,
        pattern: '^[0-9]{6,8}$',
        example: '123456',
      },
    },
    oneOf: [{ required: ['token'] }, { required: ['otp'] }],
  },

  /**
   * Reset Password Response Schema
   * Returned from POST /auth/reset-password
   */
  resetPasswordResponse: {
    type: 'object',
    title: 'Reset Password Response',
    description: 'Password successfully reset',
    properties: {
      message: {
        type: 'string',
        description: 'Success message',
        example: 'Password has been successfully reset',
      },
      success: {
        type: 'boolean',
        description: 'Operation success status',
        example: true,
      },
    },
  },

  /**
   * Verify Token Response Schema
   * Returned from POST /auth/verify
   */
  verifyResponse: {
    type: 'object',
    title: 'Verify Token Response',
    description: 'Token verification result',
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
        example: 'Token verified successfully',
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
          userId: {
            type: 'string',
            description: 'User ID from token',
            example: '81744ed8-697b-4c19-ac9e-aba1a55cb342',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email from token',
            example: 'user@example.com',
          },
          iat: {
            type: 'number',
            description: 'Token issued at (Unix timestamp)',
            example: 1769548005,
          },
          exp: {
            type: 'number',
            description: 'Token expiration (Unix timestamp)',
            example: 1770152805,
          },
        },
      },
    },
  },

  /**
   * Verify Email Request Schema
   * Used for GET /auth/verify-email
   */
  verifyEmailRequest: {
    type: 'object',
    title: 'Verify Email Request',
    description: 'Verify email using token from email link',
    required: ['token'],
    additionalProperties: false,
    properties: {
      token: {
        type: 'string',
        description: 'JWT verification token from email link',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  },

  /**
   * Verify Email Response Schema
   * Returned from GET /auth/verify-email
   */
  verifyEmailResponse: {
    type: 'object',
    title: 'Verify Email Response',
    description: 'Email verification result',
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
        properties: {
          message: {
            type: 'string',
            description: 'Verification message',
            example: 'Email verified successfully',
          },
          user_id: {
            type: 'string',
            description: 'User ID',
            example: 'fda71605-5948-4177-9782-b3dd6c872ef0',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Verified email address',
            example: 'user@example.com',
          },
        },
      },
      message: {
        type: 'string',
        description: 'Response message',
        example: 'Email verified successfully',
      },
    },
  },

  /**
   * Exchange Code for Token Request Schema
   * Used for POST /auth/exchange
   */
  exchangeCodeForTokenRequest: {
    type: 'object',
    title: 'Exchange Code for Token Request',
    description: 'Exchange authorization code for access token',
    required: ['code'],
    additionalProperties: false,
    properties: {
      code: {
        type: 'string',
        description: 'Authorization code from login response',
        example: 'abc123def456',
      },
    },
  },

  /**
   * Exchange Code for Token Response Schema
   * Returned from POST /auth/exchange
   */
  exchangeCodeForTokenResponse: {
    type: 'object',
    title: 'Exchange Code for Token Response',
    description: 'Access token response from authorization code exchange',
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
        example: 'Token issued successfully',
      },
      resp_code: {
        type: 'number',
        description: 'Response code',
        example: 2000,
      },
      data: {
        type: 'object',
        additionalProperties: true,
        properties: {
          user_id: {
            type: 'string',
            description: 'User ID',
            example: '81744ed8-697b-4c19-ac9e-aba1a55cb342',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email',
            example: 'user@example.com',
          },
          account_ids: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of account IDs user owns',
            example: ['acc-123', 'acc-456'],
          },
          token: {
            type: 'string',
            description: 'JWT authentication token (base token)',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          },
          token_type: {
            type: 'string',
            description: 'Token type',
            example: 'Bearer',
          },
          expires_in: {
            type: 'number',
            description: 'Token expiration time in seconds',
            example: 604800,
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
        example: 'Invalid email or password',
      },
      resp_code: {
        type: 'number',
        description: 'Error code for client handling',
        example: 2000,
      },
      message: {
        type: 'string',
        description: 'Error message (fallback)',
        example: 'Invalid email or password',
      },
    },
  },
};

/**
 * HTTP Status Code Responses
 */
export const AuthResponses = {
  '200': {
    description: 'Success',
    schema: AuthSchemas.loginResponse,
  },
  '201': {
    description: 'Created',
    schema: AuthSchemas.registrationResponse,
  },
  '400': {
    description: 'Bad Request - Validation error',
    schema: AuthSchemas.errorResponse,
  },
  '401': {
    description: 'Unauthorized - Invalid credentials',
    schema: AuthSchemas.errorResponse,
  },
  '409': {
    description: 'Conflict - Email already registered',
    schema: AuthSchemas.errorResponse,
  },
  '503': {
    description: 'Service Unavailable',
    schema: AuthSchemas.errorResponse,
  },
};
