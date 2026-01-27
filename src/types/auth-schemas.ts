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
    description: 'User registration with email, password, and personal details',
    required: ['email', 'password', 'firstName', 'lastName', 'phone'],
    additionalProperties: false,
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'User email address (unique identifier)',
        example: 'john.doe@example.com',
        minLength: 5,
        maxLength: 255,
      },
      password: {
        type: 'string',
        description:
          'User password (minimum 8 characters, must contain uppercase, lowercase, number, and special character)',
        minLength: 8,
        maxLength: 128,
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
        example: 'SecurePass123!',
      },
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
    },
  },

  /**
   * Login Response Schema
   * Returned from POST /auth/login
   */
  loginResponse: {
    type: 'object',
    title: 'User Login Response',
    description: 'Successful login response with authentication token',
    properties: {
      success: {
        type: 'boolean',
        description: 'Success status',
        example: true,
      },
      resp_msg: {
        type: 'string',
        description: 'Response message',
        example: 'Login successful',
      },
      resp_code: {
        type: 'number',
        description: 'Response code',
        example: 1000,
      },
      data: {
        type: 'object',
        properties: {
          user: {
            type: 'object',
            description: 'User information',
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
   * Registration Response Schema
   * Returned from POST /auth/register
   */
  registrationResponse: {
    type: 'object',
    title: 'User Registration Response',
    description: 'Successful registration response',
    properties: {
      data: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'Newly created user ID',
            example: '507f1f77bcf86cd799439011',
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
          emailVerificationRequired: {
            type: 'boolean',
            description: 'Whether email verification is required',
            example: true,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Account creation timestamp',
            example: '2024-01-27T10:30:00Z',
          },
        },
      },
      message: {
        type: 'string',
        description: 'Success message',
        example: 'User registered successfully. Please verify your email.',
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
   * Error Response Schema
   * Used for all error responses
   */
  errorResponse: {
    type: 'object',
    title: 'Error Response',
    description: 'Standard error response format',
    required: ['message'],
    properties: {
      message: {
        type: 'string',
        description: 'Error message',
        example: 'Invalid email or password',
      },
      code: {
        type: 'string',
        description: 'Error code for client handling',
        example: 'INVALID_CREDENTIALS',
      },
      details: {
        type: 'object',
        description: 'Additional error details',
        additionalProperties: true,
      },
      timestamp: {
        type: 'string',
        format: 'date-time',
        description: 'Error timestamp',
        example: '2024-01-27T10:30:00Z',
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
