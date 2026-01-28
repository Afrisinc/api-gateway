import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { env } from '@/config/env';
import { logger } from '@/utils/logger';

// Custom error types
export class GatewayError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;

  constructor(message: string, statusCode: number = 500, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;

    Object.setPrototypeOf(this, GatewayError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends GatewayError {
  constructor(message: string, details?: unknown) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
    Object.assign(this, { details });
  }
}

export class AuthenticationError extends GatewayError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends GatewayError {
  constructor(message: string = 'Access denied') {
    super(message, 403, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends GatewayError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND_ERROR');
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends GatewayError {
  constructor(message: string = 'Resource conflict') {
    super(message, 409, 'CONFLICT_ERROR');
    this.name = 'ConflictError';
  }
}

export class ServiceUnavailableError extends GatewayError {
  constructor(message: string = 'Service unavailable') {
    super(message, 503, 'SERVICE_UNAVAILABLE');
    this.name = 'ServiceUnavailableError';
  }
}

// Helper function to determine if error should be logged
const shouldLogError = (statusCode: number): boolean => {
  return statusCode >= 500;
};

// Helper function to sanitize error for client
const sanitizeError = (error: Record<string, unknown>, statusCode: number) => {
  const isDevelopment = env.NODE_ENV !== 'production';

  // In production, don't expose internal error details for 5xx errors
  if (!isDevelopment && statusCode >= 500) {
    return {
      message: 'Internal Server Error',
      details: undefined,
    };
  }

  return {
    message: error.message || 'An error occurred',
    details: error.details || undefined,
  };
};

export const errorHandler = (
  error: FastifyError | GatewayError | Error,
  request: FastifyRequest,
  reply: FastifyReply
): void => {
  let statusCode = 500;
  let errorCode: string | undefined;
  let message = 'Internal Server Error';
  let details: unknown;

  // Handle different error types
  if (error instanceof GatewayError) {
    statusCode = error.statusCode;
    message = error.message;
    errorCode = error.code;
    details = (error as any).details;
  } else if (error instanceof ZodError) {
    // Zod validation errors
    statusCode = 400;
    errorCode = 'VALIDATION_ERROR';
    message = 'Validation failed';
    details = error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message,
      code: err.code,
    }));
  } else if ('statusCode' in error && typeof error.statusCode === 'number') {
    // Fastify errors
    statusCode = error.statusCode;
    message = error.message || 'Request failed';
  } else {
    // Generic errors
    statusCode = 500;
    message = error.message || 'Internal Server Error';
  }

  // Sanitize error for client
  const sanitized = sanitizeError({ message, details }, statusCode);

  // Log error if it's a server error
  if (shouldLogError(statusCode)) {
    logger.error(
      {
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
          code: errorCode,
        },
        request: {
          method: request.method,
          url: request.url,
          ip: request.ip,
          userAgent: request.headers['user-agent'],
        },
        statusCode,
        timestamp: new Date().toISOString(),
      },
      `${error.name || 'Error'}: ${error.message}`
    );
  } else {
    // Log as warning for client errors (4xx)
    logger.warn(
      {
        error: {
          name: error.name,
          message: error.message,
          code: errorCode,
        },
        request: {
          method: request.method,
          url: request.url,
          ip: request.ip,
        },
        statusCode,
        timestamp: new Date().toISOString(),
      },
      `${error.name || 'Client Error'}: ${error.message}`
    );
  }

  // Send error response
  reply.status(statusCode).send({
    error: sanitized.message,
    code: errorCode,
    ...(sanitized.details && { details: sanitized.details }),
    timestamp: new Date().toISOString(),
    path: request.url,
  });
};

// Helper function to create standardized errors
export const createError = {
  badRequest: (message: string, details?: unknown) => new ValidationError(message, details),
  unauthorized: (message?: string) => new AuthenticationError(message),
  forbidden: (message?: string) => new AuthorizationError(message),
  notFound: (message?: string) => new NotFoundError(message),
  conflict: (message?: string) => new ConflictError(message),
  serviceUnavailable: (message?: string) => new ServiceUnavailableError(message),
  internal: (message?: string) => new GatewayError(message || 'Internal Server Error', 500),
};
