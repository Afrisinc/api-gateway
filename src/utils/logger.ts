import pino from 'pino';

// Define log levels
export type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

// Environment-based configuration
const isDevelopment = process.env.NODE_ENV !== 'production';
const logLevel = (process.env.LOG_LEVEL as LogLevel) || (isDevelopment ? 'debug' : 'info');

// Create logger instance
export const logger = pino({
  level: logLevel,

  // Pretty print in development, structured JSON in production
  ...(isDevelopment && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
        singleLine: false,
        messageFormat: '{msg}',
      },
    },
  }),

  // Production configuration
  ...(!isDevelopment && {
    formatters: {
      level(label: string) {
        return { level: label };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
      paths: [
        'password',
        'token',
        'authorization',
        'cookie',
        'session',
        'req.headers.authorization',
        'req.headers.cookie',
        'res.headers["set-cookie"]',
        'email',
        'phoneNumber',
        'ssn',
        'creditCard',
      ],
      censor: '[REDACTED]',
    },
  }),

  // Base fields for all log entries
  base: {
    pid: process.pid,
    hostname: process.env.HOSTNAME || 'unknown',
    service: 'api-gateway',
    version: process.env.npm_package_version || '1.0.0',
  },
});

// Request logger for Fastify
export const requestLogger = pino({
  level: logLevel,

  ...(isDevelopment && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname,reqId',
        singleLine: true,
        messageFormat: '{req.method} {req.url} - {msg}',
      },
    },
  }),

  ...(!isDevelopment && {
    formatters: {
      level(label: string) {
        return { level: label };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
      paths: ['req.headers.authorization', 'req.headers.cookie', 'res.headers["set-cookie"]'],
      censor: '[REDACTED]',
    },
  }),

  base: {
    pid: process.pid,
    hostname: process.env.HOSTNAME || 'unknown',
    service: 'api-gateway-http',
    version: process.env.npm_package_version || '1.0.0',
  },
});

// Gateway-specific loggers
export const proxyLogger = logger.child({ component: 'proxy' });
export const authLogger = logger.child({ component: 'auth' });
export const perfLogger = logger.child({ component: 'performance' });

// Error logger with stack trace
export const logError = (error: Error | unknown, context?: Record<string, unknown>) => {
  if (error instanceof Error) {
    logger.error(
      {
        err: error,
        stack: error.stack,
        ...context,
      },
      error.message
    );
  } else {
    logger.error(
      {
        error: String(error),
        ...context,
      },
      'Unknown error occurred'
    );
  }
};

// Performance monitoring helper
export const logPerformance = (operation: string, duration: number, context?: Record<string, unknown>) => {
  perfLogger.info(
    {
      operation,
      duration,
      unit: 'ms',
      ...context,
    },
    `Operation ${operation} completed in ${duration}ms`
  );
};

// Request context logger
export const createRequestLogger = (requestId: string) => {
  return logger.child({ requestId });
};

// Audit logger for sensitive operations
export const auditLogger = logger.child({
  component: 'audit',
  type: 'security',
});

// Health check logger
export const healthLogger = logger.child({ component: 'health' });

// Startup logger
export const startupLogger = logger.child({ component: 'startup' });

export default logger;
