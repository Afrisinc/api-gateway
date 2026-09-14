export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'] as const;
export type HttpMethod = (typeof HTTP_METHODS)[number];

export const PUBLIC_ENDPOINTS = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/verify-email',
  '/auth/reset-password',
  '/auth/oauth/exchange',
];

/**
 * The anonymous reading surface afrisinc-web needs — published stories and
 * articles plus their view/read pings. Everything else under /media (drafting,
 * publishing, the dashboard's own endpoints) stays behind auth.
 */
export const PUBLIC_MEDIA_ENDPOINTS: { method: HttpMethod; url: string }[] = [
  { method: 'GET', url: '/media/stories/public' },
  { method: 'GET', url: '/media/stories/public/:id' },
  { method: 'GET', url: '/media/stories/public/:id/episodes/:episodeNumber' },
  { method: 'POST', url: '/media/stories/public/:id/episodes/:episodeNumber/view' },
  { method: 'POST', url: '/media/stories/public/:id/episodes/:episodeNumber/read' },
  { method: 'GET', url: '/media/articles' },
  { method: 'GET', url: '/media/articles/top' },
  { method: 'GET', url: '/media/articles/category/:category' },
  { method: 'GET', url: '/media/articles/slug/:slug' },
  { method: 'POST', url: '/media/articles/slug/:slug/view' },
  { method: 'POST', url: '/media/articles/slug/:slug/read' },
  { method: 'GET', url: '/media/articles/:id' },
];
