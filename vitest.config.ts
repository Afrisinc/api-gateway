import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  esbuild: {
    target: 'node20',
  },
  test: {
    globals: true,
    environment: 'node',
    typecheck: {
      enabled: false,
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', '**/*.d.ts', 'vitest.config.ts', 'src/config/'],
      reportsDirectory: './coverage',
      all: true,
    },
    testTimeout: 10000,
    hookTimeout: 10000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/config': path.resolve(__dirname, './src/config'),
      '@/middlewares': path.resolve(__dirname, './src/middlewares'),
      '@/routes': path.resolve(__dirname, './src/routes'),
      '@/proxies': path.resolve(__dirname, './src/proxies'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/types': path.resolve(__dirname, './src/types'),
    },
  },
});
