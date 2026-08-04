import crypto from 'node:crypto';
import { env } from '@/config/env';

export const serviceAuth = {
  /**
   * Create HMAC signature for request verification
   * Services verify this signature to confirm request came from gateway
   */
  createSignature(method: string, path: string, body?: any): string {
    const timestamp = Math.floor(Date.now() / 1000);
    const bodyStr = body ? JSON.stringify(body) : '';
    const data = `${method}:${path}:${timestamp}:${bodyStr}`;

    const signature = crypto.createHmac('sha256', env.SERVICE_SECRET).update(data).digest('hex');

    return signature;
  },

  /**
   * Get timestamp for signature verification (services check timestamp is recent)
   */
  getTimestamp(): string {
    return Math.floor(Date.now() / 1000).toString();
  },

  /**
   * Get headers to add to service requests for verification
   */
  getServiceHeaders(method: string, path: string, body?: any) {
    return {
      'X-Gateway-Signature': this.createSignature(method, path, body),
      'X-Gateway-Timestamp': this.getTimestamp(),
    };
  },
};
