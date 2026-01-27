import { env } from '@/config/env';
import { logger, startupLogger } from '@/utils/logger';
import { createApp } from './app';

// Global error handlers
process.on('uncaughtException', (error: Error) => {
  logger.fatal(
    {
      error: error.message,
      stack: error.stack,
    },
    'Uncaught Exception'
  );
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  logger.fatal(
    {
      reason: reason instanceof Error ? reason.message : String(reason),
      stack: reason instanceof Error ? reason.stack : undefined,
    },
    'Unhandled Rejection'
  );
  process.exit(1);
});

// Graceful shutdown handling
let isShuttingDown = false;

const gracefulShutdownHandler = async (signal: string) => {
  if (isShuttingDown) {
    logger.warn('Force shutdown requested');
    process.exit(1);
  }

  isShuttingDown = true;
  logger.info(`Received ${signal}, starting graceful shutdown`);

  try {
    // Set a timeout for the shutdown process
    const shutdownTimeout = setTimeout(() => {
      logger.error('Shutdown timeout reached, forcing exit');
      process.exit(1);
    }, 30000); // 30 seconds timeout

    // Close the Fastify server
    if (globalThis.fastifyApp) {
      logger.info('Closing Fastify server');
      await globalThis.fastifyApp.close();
      logger.info('Fastify server closed');
    }

    // Clear the shutdown timeout
    clearTimeout(shutdownTimeout);

    logger.info('Graceful shutdown completed');
    process.exit(0);
  } catch (error) {
    logger.error(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      'Error during graceful shutdown'
    );
    process.exit(1);
  }
};

// Register signal handlers for graceful shutdown
process.on('SIGTERM', () => gracefulShutdownHandler('SIGTERM'));
process.on('SIGINT', () => gracefulShutdownHandler('SIGINT'));

// Add fastify app to global for shutdown handling
declare global {
  var fastifyApp: { close: () => Promise<void> } | undefined;
}

const start = async (): Promise<void> => {
  try {
    startupLogger.info(
      {
        nodeVersion: process.version,
        environment: env.NODE_ENV,
        port: env.PORT,
      },
      'Starting API Gateway'
    );

    // Create and start the app
    startupLogger.info({}, 'Creating Fastify application');
    const app = await createApp();

    // Store app globally for graceful shutdown
    globalThis.fastifyApp = app;

    const PORT = env.PORT;
    const HOST = '0.0.0.0';

    startupLogger.info({ port: PORT, host: HOST }, 'Starting server');
    await app.listen({ port: PORT, host: HOST });

    startupLogger.info(
      {
        port: PORT,
        host: HOST,
        environment: env.NODE_ENV,
        pid: process.pid,
        swagger: `http://localhost:${PORT}/docs`,
        health: `http://localhost:${PORT}/health`,
      },
      'API Gateway started successfully'
    );

    // Log memory usage on startup
    const memoryUsage = process.memoryUsage();
    startupLogger.debug(
      {
        heapUsed: Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100,
        heapTotal: Math.round((memoryUsage.heapTotal / 1024 / 1024) * 100) / 100,
        external: Math.round((memoryUsage.external / 1024 / 1024) * 100) / 100,
        unit: 'MB',
      },
      'Initial memory usage'
    );
  } catch (error) {
    startupLogger.fatal(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      'Failed to start application'
    );

    process.exit(1);
  }
};

// Add process event listeners for monitoring
process.on('warning', (warning: any) => {
  logger.warn(
    {
      name: warning.name,
      message: warning.message,
      stack: warning.stack,
    },
    'Process warning'
  );
});

// Memory usage monitoring (optional - for debugging)
if (env.NODE_ENV !== 'production') {
  setInterval(() => {
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    logger.debug(
      {
        memory: {
          heapUsed: Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100,
          heapTotal: Math.round((memoryUsage.heapTotal / 1024 / 1024) * 100) / 100,
          external: Math.round((memoryUsage.external / 1024 / 1024) * 100) / 100,
          unit: 'MB',
        },
        cpu: {
          user: cpuUsage.user,
          system: cpuUsage.system,
        },
        uptime: process.uptime(),
      },
      'Process metrics'
    );
  }, 60000); // Every 60 seconds
}

// Start the server
start();
