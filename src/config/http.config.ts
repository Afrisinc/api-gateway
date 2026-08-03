export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'] as const;
export type HttpMethod = (typeof HTTP_METHODS)[number];

export const PUBLIC_ENDPOINTS = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/verify-email',
  '/auth/reset-password',
  '/oauth/exchange',
];
