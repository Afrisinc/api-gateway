import { FastifyRequest, FastifyReply } from 'fastify';
import { logger } from '../utils/logger';
import { ResponseHandler } from '../utils/response';

interface RoutePermission {
  method: string;
  pathPattern: string;
  allowedRoles: string[];
}

const RESTRICTED_ROUTES: RoutePermission[] = [
  // Admin-only routes
  { method: 'GET', pathPattern: '/vpn/admin/servers.*', allowedRoles: ['ADMIN', 'OWNER'] },
  { method: 'POST', pathPattern: '/vpn/admin/servers.*', allowedRoles: ['ADMIN', 'OWNER'] },
  { method: 'PUT', pathPattern: '/vpn/admin/servers.*', allowedRoles: ['ADMIN', 'OWNER'] },
  { method: 'DELETE', pathPattern: '/vpn/admin/servers.*', allowedRoles: ['ADMIN', 'OWNER'] },
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
