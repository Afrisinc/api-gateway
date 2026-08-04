import 'dotenv/config';

export const env = {
  NODE_ENV: (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test',
  PORT: Number.parseInt(process.env.PORT || '3000', 10),
  JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret-key-change-in-production',
  SERVICE_SECRET: process.env.SERVICE_SECRET || 'gateway-service-secret-change-in-production',

  API_BASE_URL: process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
  // Microservice URLs
  AUTH_URL: process.env.AUTH_URL || 'http://localhost:3001',
  MEDIA_URL: process.env.MEDIA_URL || 'http://localhost:3003',
  NOTIFY_URL: process.env.NOTIFY_URL || 'http://localhost:3004',
  PAY_URL: process.env.PAY_URL || 'http://localhost:3005',
  VPN_URL: process.env.VPN_URL || 'http://localhost:8080',
  // Service timeouts (in milliseconds)
  SERVICE_TIMEOUT: Number.parseInt(process.env.SERVICE_TIMEOUT || '60000', 10),

  // Rate limiting
  RATE_LIMIT_MAX: Number.parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  RATE_LIMIT_WINDOW_MS: Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
} as const;
