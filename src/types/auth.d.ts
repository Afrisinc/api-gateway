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
