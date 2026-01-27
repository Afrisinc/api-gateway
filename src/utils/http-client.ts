import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { env } from '@/config/env';
import { logger } from './logger';

export interface ProxyRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
  headers?: Record<string, string | string[] | undefined>;
  data?: unknown;
  params?: Record<string, unknown>;
  timeout?: number;
}

interface ProxyResponse<T = unknown> {
  data: T;
  status: number;
  headers: Record<string, any>;
}

class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      timeout: env.SERVICE_TIMEOUT,
      validateStatus: () => true,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config: any) => {
        logger.debug(
          {
            method: config.method?.toUpperCase(),
            url: config.url,
            params: config.params,
          },
          'Outgoing request to microservice'
        );
        return config;
      },
      (error: any) => {
        logger.error({ error }, 'Request interceptor error');
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response: any) => {
        logger.debug(
          {
            method: response.config.method?.toUpperCase?.(),
            url: response.config.url,
            status: response.status,
          },
          'Microservice response received'
        );
        return response;
      },
      (error: any) => {
        logger.error({ error }, 'Response interceptor error');
        return Promise.reject(error);
      }
    );
  }

  async forward<T = unknown>(url: string, options: ProxyRequestOptions = {}): Promise<ProxyResponse<T>> {
    const { method = 'GET', headers = {}, data, params, timeout = env.SERVICE_TIMEOUT } = options;

    try {
      const config: AxiosRequestConfig = {
        method,
        headers: this.sanitizeHeaders(headers),
        timeout,
      };

      if (params) {
        config.params = params;
      }

      if (data) {
        config.data = data;
      }

      const response = await this.client.request<T>({
        url,
        ...config,
      });

      return {
        data: response.data,
        status: response.status,
        headers: response.headers,
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        logger.error(
          {
            url,
            method,
            status: error.response?.status,
            message: error.message,
          },
          'Proxy request failed'
        );

        if (error.response) {
          return {
            data: error.response.data as T,
            status: error.response.status,
            headers: error.response.headers,
          };
        }

        const err = new Error('Service unavailable');
        (err as any).statusCode = 503;
        (err as any).originalError = error.message;
        throw err;
      }

      logger.error({ error: String(error) }, 'Unexpected error during proxy request');
      throw error;
    }
  }

  private sanitizeHeaders(headers: Record<string, string | string[] | undefined>): Record<string, string | string[]> {
    const sanitized: Record<string, string | string[]> = {};

    // List of headers to forward
    const allowedHeaders = [
      'authorization',
      'content-type',
      'accept',
      'user-agent',
      'x-request-id',
      'x-forwarded-for',
      'x-forwarded-proto',
      'x-forwarded-host',
      'x-real-ip',
    ];

    Object.entries(headers).forEach(([key, value]) => {
      if (value !== undefined && allowedHeaders.includes(key.toLowerCase())) {
        sanitized[key] = value;
      }
    });

    return sanitized;
  }
}

export const httpClient = new HttpClient();
