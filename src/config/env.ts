import 'dotenv/config';

export const env = {
  NODE_ENV: (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test',
  PORT: Number.parseInt(process.env.PORT || '3000', 10),
  JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret-key-change-in-production',

  API_BASE_URL: process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
  // Microservice URLs
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
  CONTENT_SERVICE_URL: process.env.CONTENT_SERVICE_URL || 'http://localhost:3002',
  MEDIA_SERVICE_URL: process.env.MEDIA_SERVICE_URL || 'http://localhost:3003',
  // Service timeouts (in milliseconds)
  SERVICE_TIMEOUT: Number.parseInt(process.env.SERVICE_TIMEOUT || '60000', 10),

  // Rate limiting
  RATE_LIMIT_MAX: Number.parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  RATE_LIMIT_WINDOW_MS: Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
} as const;
