import { env } from './env';
import type { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

/**
 * Get server URL based on environment
 */
const getServerUrl = (): string => {
  if (env.NODE_ENV === 'production') {
    return env.API_BASE_URL || 'https://api.afrisinc.com';
  }
  return `http://localhost:${env.PORT}`;
};

/**
 * Fastify Swagger Plugin Configuration (OpenAPI 3.0)
 * API Gateway documentation
 */
export const swaggerConfig = {
  mode: 'dynamic' as const,
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Afrisinc API Gateway',
      description:
        'Production-ready API Gateway for Afrisinc microservices architecture. ' +
        'Routes requests to Auth, Content, and Media services with JWT authentication.',
      version: '1.0.0',
      contact: {
        name: 'Afrisinc Engineering',
        url: 'https://afrisinc.com',
        email: 'info@afrisinc.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: getServerUrl(),
        description: env.NODE_ENV === 'production' ? 'Production' : 'Development',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http' as const,
          scheme: 'bearer' as const,
          bearerFormat: 'JWT',
          description: 'JWT Bearer token. Include in header: "Authorization: Bearer <token>"',
        },
      },
    },
    tags: [
      // ═════════════════════════════════════════════════════════════
      // AUTHENTICATION SERVICE
      // ═════════════════════════════════════════════════════════════
      { name: 'Auth - Core', description: 'User authentication, registration, and account management' },
      { name: 'Auth - Security', description: 'Security, token verification, and password management' },
      { name: 'Auth - Users', description: 'User profile and account operations' },

      // ═════════════════════════════════════════════════════════════
      // NOTIFICATIONS SERVICE
      // ═════════════════════════════════════════════════════════════
      { name: 'Notifications - Core', description: 'Platform analytics, overview, and core notification metrics' },
      { name: 'Notifications - Security', description: 'Security events, login monitoring, and threat detection' },
      { name: 'Notifications - Users', description: 'User management, profiles, and notification preferences' },

      // ═════════════════════════════════════════════════════════════
      // VPN MICROSERVICE
      // ═════════════════════════════════════════════════════════════
      { name: 'VPN - Authentication', description: 'VPN user authentication and access control' },
      { name: 'VPN - Security', description: 'VPN security, encryption, and protocols' },
      { name: 'VPN - Users', description: 'VPN user account management and profiles' },
      { name: 'VPN - Devices', description: 'Device registration, management, and configuration' },
      { name: 'VPN - Servers', description: 'VPN server administration and infrastructure management' },
      { name: 'VPN - Usage', description: 'User and device data usage statistics and analytics' },

      // ═════════════════════════════════════════════════════════════
      // CONTENT SERVICE
      // ═════════════════════════════════════════════════════════════
      { name: 'Content', description: 'Content management, creation, and delivery' },

      // ═════════════════════════════════════════════════════════════
      // SYSTEM & HEALTH
      // ═════════════════════════════════════════════════════════════
      { name: 'Health', description: 'Health check and system status endpoints' },
    ],
    'x-tagGroups': [
      {
        name: '🔐 Authentication Service',
        description: 'User authentication, registration, password management, and token operations',
        tags: ['Auth - Core', 'Auth - Security', 'Auth - Users'],
      },
      {
        name: '🔔 Notifications Service',
        description: 'Real-time notifications for security alerts, user events, and system updates',
        tags: ['Notifications - Core', 'Notifications - Security', 'Notifications - Users'],
      },
      {
        name: '🌐 VPN Microservice',
        description: 'Complete VPN management including user authentication, devices, servers, and usage tracking',
        tags: [
          'VPN - Authentication',
          'VPN - Security',
          'VPN - Users',
          'VPN - Devices',
          'VPN - Servers',
          'VPN - Usage',
        ],
      },
      {
        name: '📚 Content Service',
        description: 'Content management, creation, updates, and delivery operations',
        tags: ['Content'],
      },
      {
        name: '💚 System',
        description: 'System health monitoring, status checks, and diagnostics',
        tags: ['Health'],
      },
    ] as any,
    externalDocs: {
      description: 'Afrisinc Documentation',
      url: 'https://afrisinc.com',
    },
  },
  hideUntagged: false,
};

/**
 * Swagger UI Configuration with Professional Styling
 */
export const swaggerUiConfig: FastifySwaggerUiOptions = {
  routePrefix: '/docs',
  staticCSP: false,
  uiConfig: {
    layout: 'BaseLayout',
    deepLinking: true,
    docExpansion: 'list',
    defaultModelExpandDepth: 1,
    filter: true,
    tryItOutEnabled: true,
    persistAuthorization: true,
    displayOperationId: false,
    showExtensions: false,
    showCommonExtensions: false,
    syntaxHighlight: {
      activate: true,
      theme: 'obsidian',
    },
  },
  transformSpecificationClone: true,
} as const;

/**
 * Professional Dark Mode CSS Theme
 * Applied via <link> tag in HTML head
 */
export const swaggerDarkThemeCss = `
      /* Professional Dark Mode Theme */
      :root {
        --afrisinc-primary: #1a73e8;
        --afrisinc-secondary: #34a853;
        --afrisinc-danger: #ea4335;
        --afrisinc-warning: #fbbc04;
        --afrisinc-dark-bg: #0f1419;
        --afrisinc-dark-surface: #1a1d23;
        --afrisinc-dark-border: #292d33;
      }

      /* Dark Mode Styles */
      body {
        background-color: var(--afrisinc-dark-bg) !important;
        color: #e8eaed !important;
        font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif !important;
        font-size: 13px !important;
      }

      /* Topbar */
      .topbar {
        background: linear-gradient(135deg, var(--afrisinc-dark-surface) 0%, #1e2127 100%) !important;
        border-bottom: 1px solid var(--afrisinc-dark-border) !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
      }

      .topbar-wrapper {
        padding: 16px 20px !important;
      }

      .topbar .download-url-wrapper input {
        background-color: var(--afrisinc-dark-surface) !important;
        border: 1px solid var(--afrisinc-dark-border) !important;
        color: #e8eaed !important;
        font-size: 12px !important;
        padding: 8px 12px !important;
        border-radius: 6px !important;
      }

      .topbar .download-url-wrapper input:focus {
        border-color: var(--afrisinc-primary) !important;
        outline: none !important;
        box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1) !important;
      }

      /* Headers */
      h1, h2, h3, h4, h5, h6 {
        color: #e8eaed !important;
        font-weight: 600 !important;
      }

      .scheme-container {
        background: var(--afrisinc-dark-surface) !important;
        border: 1px solid var(--afrisinc-dark-border) !important;
        border-radius: 8px !important;
        padding: 20px !important;
      }

      /* Operation Tags */
      .opblock-tag {
        color: #e8eaed !important;
        border-bottom: 1px solid var(--afrisinc-dark-border) !important;
        padding: 12px 16px !important;
        font-size: 14px !important;
        font-weight: 600 !important;
      }

      .opblock-tag:hover {
        background-color: rgba(26, 115, 232, 0.08) !important;
      }

      /* Operation Blocks */
      .opblock {
        border: 1px solid var(--afrisinc-dark-border) !important;
        border-radius: 6px !important;
        margin: 12px 0 !important;
        background: var(--afrisinc-dark-surface) !important;
      }

      .opblock.opblock-get {
        border-left: 4px solid #34a853 !important;
      }

      .opblock.opblock-post {
        border-left: 4px solid #1a73e8 !important;
      }

      .opblock.opblock-put {
        border-left: 4px solid #fbbc04 !important;
      }

      .opblock.opblock-delete {
        border-left: 4px solid #ea4335 !important;
      }

      .opblock.opblock-patch {
        border-left: 4px solid #9c27b0 !important;
      }

      .opblock-summary {
        padding: 12px 16px !important;
      }

      .opblock-summary-method {
        background: var(--afrisinc-primary) !important;
        border-radius: 4px !important;
        padding: 4px 8px !important;
        font-size: 11px !important;
        font-weight: 700 !important;
        min-width: 50px !important;
        text-align: center !important;
      }

      .opblock-summary-path {
        color: #9aa0a6 !important;
        font-size: 12px !important;
        font-family: 'Roboto Mono', monospace !important;
      }

      .opblock-summary-description {
        color: #9aa0a6 !important;
        font-size: 12px !important;
      }

      /* Parameters & Models Section */
      .parameters-container {
        background: transparent !important;
        padding: 12px 0 !important;
      }

      .parameter__name {
        color: #e8eaed !important;
        font-weight: 500 !important;
        font-size: 12px !important;
      }

      .parameter__type {
        color: var(--afrisinc-primary) !important;
        font-family: 'Roboto Mono', monospace !important;
        font-size: 11px !important;
      }

      .model-box {
        background: rgba(26, 115, 232, 0.05) !important;
        border: 1px solid rgba(26, 115, 232, 0.2) !important;
        border-radius: 6px !important;
        padding: 12px !important;
        margin: 8px 0 !important;
      }

      /* Tables */
      table {
        background-color: var(--afrisinc-dark-surface) !important;
        color: #e8eaed !important;
        font-size: 12px !important;
      }

      table thead tr {
        background-color: rgba(26, 115, 232, 0.1) !important;
        border-bottom: 2px solid var(--afrisinc-dark-border) !important;
      }

      table thead tr th {
        color: #e8eaed !important;
        font-weight: 600 !important;
        font-size: 12px !important;
        padding: 10px !important;
      }

      table tbody tr {
        border-bottom: 1px solid var(--afrisinc-dark-border) !important;
      }

      table tbody tr td {
        padding: 10px !important;
        color: #9aa0a6 !important;
        font-size: 12px !important;
      }

      table tbody tr:hover {
        background-color: rgba(26, 115, 232, 0.05) !important;
      }

      /* Input Fields */
      input[type="text"],
      input[type="password"],
      input[type="email"],
      input[type="number"],
      textarea,
      select {
        background-color: var(--afrisinc-dark-surface) !important;
        border: 1px solid var(--afrisinc-dark-border) !important;
        color: #e8eaed !important;
        font-size: 12px !important;
        padding: 8px 10px !important;
        border-radius: 4px !important;
      }

      input[type="text"]:focus,
      input[type="password"]:focus,
      input[type="email"]:focus,
      input[type="number"]:focus,
      textarea:focus,
      select:focus {
        border-color: var(--afrisinc-primary) !important;
        outline: none !important;
        box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1) !important;
      }

      /* Buttons */
      .btn {
        border-radius: 6px !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        padding: 8px 16px !important;
        border: none !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
      }

      .btn-execute {
        background-color: var(--afrisinc-primary) !important;
        color: white !important;
      }

      .btn-execute:hover {
        background-color: #1557b0 !important;
        box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3) !important;
      }

      .btn-clear {
        background-color: transparent !important;
        border: 1px solid var(--afrisinc-dark-border) !important;
        color: #e8eaed !important;
      }

      .btn-clear:hover {
        background-color: rgba(26, 115, 232, 0.1) !important;
        border-color: var(--afrisinc-primary) !important;
      }

      /* Response Section */
      .responses-wrapper {
        margin-top: 16px !important;
      }

      .response-col_description {
        color: #9aa0a6 !important;
        font-size: 12px !important;
      }

      .response-col_links {
        color: var(--afrisinc-primary) !important;
        font-size: 12px !important;
      }

      /* Code Blocks */
      .microlight,
      code {
        background-color: rgba(0, 0, 0, 0.3) !important;
        color: #88d0d1 !important;
        font-family: 'Roboto Mono', 'Courier New', monospace !important;
        font-size: 11px !important;
        border-radius: 4px !important;
        padding: 2px 4px !important;
      }

      pre {
        background-color: rgba(0, 0, 0, 0.4) !important;
        border: 1px solid var(--afrisinc-dark-border) !important;
        border-radius: 6px !important;
        padding: 12px !important;
        color: #88d0d1 !important;
      }

      /* Authorization Section */
      .auth-container {
        background: var(--afrisinc-dark-surface) !important;
        border: 1px solid var(--afrisinc-dark-border) !important;
        border-radius: 8px !important;
        padding: 16px !important;
        margin: 12px 0 !important;
      }

      .auth-container h3 {
        color: #e8eaed !important;
        font-size: 13px !important;
        margin-top: 0 !important;
      }

      /* Scrollbar */
      ::-webkit-scrollbar {
        width: 8px !important;
        height: 8px !important;
      }

      ::-webkit-scrollbar-track {
        background: var(--afrisinc-dark-bg) !important;
      }

      ::-webkit-scrollbar-thumb {
        background: var(--afrisinc-dark-border) !important;
        border-radius: 4px !important;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: rgba(26, 115, 232, 0.5) !important;
      }

      /* Links */
      a {
        color: var(--afrisinc-primary) !important;
        text-decoration: none !important;
      }

      a:hover {
        text-decoration: underline !important;
      }

      /* Swagger UI Logo */
      .topbar .logo__img {
        display: none !important;
      }

      .topbar .logo__title {
        color: #e8eaed !important;
        font-weight: 700 !important;
        font-size: 16px !important;
      }

      /* Model-box styling */
      .model {
        background: var(--afrisinc-dark-surface) !important;
        border: 1px solid var(--afrisinc-dark-border) !important;
        border-radius: 6px !important;
        margin: 8px 0 !important;
      }

      .model-title {
        background: rgba(26, 115, 232, 0.1) !important;
        border-radius: 4px 4px 0 0 !important;
        color: var(--afrisinc-primary) !important;
        font-weight: 600 !important;
        font-size: 12px !important;
        padding: 8px 12px !important;
      }
    `;
