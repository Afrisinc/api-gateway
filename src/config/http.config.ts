export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'] as const;
export type HttpMethod = (typeof HTTP_METHODS)[number];
