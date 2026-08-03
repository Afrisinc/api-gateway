import { env } from '@/config/env';
import { apiAdapter } from '@/utils/apiAdapter';

interface VerificationResult {
  valid: boolean;
  userId?: string;
  email?: string;
  role?: string;
  accountId?: string;
  product?: string;
  tokenType?: string;
}

export const authProxy = {
  async verifyToken(token: string): Promise<VerificationResult> {
    try {
      const api = apiAdapter(env.AUTH_URL, {});
      const response = await api.post('/auth/verify', { token });
      const data = response.data.data;

      return {
        valid: response.data.success !== false,
        userId: data?.user_id || data?.userId,
        email: data?.email,
        role: data?.role,
        accountId: data?.account_id,
        product: data?.product,
        tokenType: data?.token_type,
      };
    } catch {
      return { valid: false };
    }
  },
};
