import { FastifyRequest, FastifyReply } from 'fastify';
import { logger } from '../utils/logger';
import { ResponseHandler } from '../utils/response';

interface RoutePermission {
  method: string;
  pathPattern: string;
  allowedRoles: string[];
}

// Platform-staff roles (see platform-frontend's `ControlRole` / `PLATFORM_WIDE_ROLES`)
// that can reach the Notify admin console. This is a staff console, so it
// uses the staff role vocabulary, not per-account roles like the VPN
// dashboard's account-owner "OWNER" below.
const NOTIFY_PLATFORM_ADMIN_ROLES = ['SUPER_ADMIN', 'OPS_MANAGER'];

const RESTRICTED_ROUTES: RoutePermission[] = [
  // Admin-only routes
  { method: 'GET', pathPattern: '/vpn/admin/servers.*', allowedRoles: ['ADMIN', 'OWNER'] },
  { method: 'POST', pathPattern: '/vpn/admin/servers.*', allowedRoles: ['ADMIN', 'OWNER'] },
  { method: 'PUT', pathPattern: '/vpn/admin/servers.*', allowedRoles: ['ADMIN', 'OWNER'] },
  { method: 'DELETE', pathPattern: '/vpn/admin/servers.*', allowedRoles: ['ADMIN', 'OWNER'] },

  // Notify admin console - platform-wide client/dashboard/analytics views,
  // restricted to platform admins (mirrored on notify-service itself).
  { method: 'GET', pathPattern: '/notify/api/v1/clients.*', allowedRoles: NOTIFY_PLATFORM_ADMIN_ROLES },
  { method: 'GET', pathPattern: '/notify/api/v1/dashboard.*', allowedRoles: NOTIFY_PLATFORM_ADMIN_ROLES },
  { method: 'GET', pathPattern: '/notify/admin/internal/platform/.*', allowedRoles: NOTIFY_PLATFORM_ADMIN_ROLES },
  {
    method: 'GET',
    pathPattern: '/notify/api/admin/platform-email-settings',
    allowedRoles: NOTIFY_PLATFORM_ADMIN_ROLES,
  },
  {
    method: 'PUT',
    pathPattern: '/notify/api/admin/platform-email-settings',
    allowedRoles: NOTIFY_PLATFORM_ADMIN_ROLES,
  },
  { method: 'GET', pathPattern: '/notify/api/admin/mail-aliases.*', allowedRoles: NOTIFY_PLATFORM_ADMIN_ROLES },
  { method: 'POST', pathPattern: '/notify/api/admin/mail-aliases.*', allowedRoles: NOTIFY_PLATFORM_ADMIN_ROLES },
  { method: 'PATCH', pathPattern: '/notify/api/admin/mail-aliases.*', allowedRoles: NOTIFY_PLATFORM_ADMIN_ROLES },
  { method: 'DELETE', pathPattern: '/notify/api/admin/mail-aliases.*', allowedRoles: NOTIFY_PLATFORM_ADMIN_ROLES },
];

export async function authorize(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user) {
    return;
  }

  const { method, url } = request;
  const userId = request.user.userId;
  const userRole = request.user.role;

  const matchedRoute = RESTRICTED_ROUTES.find(route => {
    if (route.method !== method) {
      return false;
    }
    const pattern = new RegExp(`^${route.pathPattern}$`);
    return pattern.test(url);
  });

  if (!matchedRoute) {
    logger.debug({ userId, method, url }, 'Route not restricted');
    return;
  }

  if (!userRole || !matchedRoute.allowedRoles.includes(userRole)) {
    logger.warn(
      { userId, userRole, method, url, allowedRoles: matchedRoute.allowedRoles },
      'Access denied: insufficient permissions'
    );
    return ResponseHandler.error(
      reply,
      1003,
      `Access denied. Required role: ${matchedRoute.allowedRoles.join(', ')}`,
      403
    );
  }

  logger.info({ userId, userRole, method, url }, 'Access granted');
}
