export type AccountType = 'personal' | 'company';

export interface VerifyEmailQuery {
  token: string;
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location?: string;
  password: string;
  account_type: AccountType;
  account_name: string;
  product_code?: string;
  displayName?: string;
  organizationName: string;
  jobTitle?: string;
  industry?: string;
  companyEmail: string;
  companySize?: string;
  website?: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export interface UserContext {
  userId: string;
  email: string;
}

export interface GatewayResponse<T = unknown> {
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  timestamp: string;
  path?: string;
}

export interface ServiceResponse<T = unknown> {
  data: T;
  status: number;
  headers: Record<string, string | string[] | undefined>;
}
