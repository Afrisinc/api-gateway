import { FastifyRequest, FastifyReply } from 'fastify';
import { env } from '@/config/env';
import { httpClient } from '@/utils/http-client';
import { proxyLogger } from '@/utils/logger';

export class AdminProxy {
  private readonly baseUrl = env.AUTH_SERVICE_URL;

  // ── Roles ──────────────────────────────────────────────────────────────────

  async getAllRoles(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const params = request.query as Record<string, string>;
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/roles`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get all roles proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async getRole(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { roleId } = request.params as { roleId: string };
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/roles/${roleId}`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get role proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async createRole(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/roles`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Create role proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async updateRole(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { roleId } = request.params as { roleId: string };
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/roles/${roleId}`, {
        method: 'PUT',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Update role proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async deleteRole(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { roleId } = request.params as { roleId: string };
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/roles/${roleId}`, {
        method: 'DELETE',
        headers: request.headers as Record<string, string>,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Delete role proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  // ── Role Permissions ───────────────────────────────────────────────────────

  async getRolePermissions(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { roleId } = request.params as { roleId: string };
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/roles/${roleId}/permissions`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get role permissions proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async bulkAssignPermissions(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { roleId } = request.params as { roleId: string };
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/roles/${roleId}/permissions`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Bulk assign permissions proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async addPermissionToRole(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { roleId, permissionId } = request.params as { roleId: string; permissionId: string };
      const response = await httpClient.forward(
        `${this.baseUrl}/api/admin/roles/${roleId}/permissions/${permissionId}`,
        { method: 'POST', headers: request.headers as Record<string, string> }
      );
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Add permission to role proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async removePermissionFromRole(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { roleId, permissionId } = request.params as { roleId: string; permissionId: string };
      const response = await httpClient.forward(
        `${this.baseUrl}/api/admin/roles/${roleId}/permissions/${permissionId}`,
        { method: 'DELETE', headers: request.headers as Record<string, string> }
      );
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Remove permission from role proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  // ── Permissions ────────────────────────────────────────────────────────────

  async getAllPermissions(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const params = request.query as Record<string, string>;
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/permissions`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get all permissions proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async createPermission(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/permissions`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Create permission proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async updatePermission(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { permissionId } = request.params as { permissionId: string };
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/permissions/${permissionId}`, {
        method: 'PUT',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Update permission proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async deletePermission(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { permissionId } = request.params as { permissionId: string };
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/permissions/${permissionId}`, {
        method: 'DELETE',
        headers: request.headers as Record<string, string>,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Delete permission proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  // ── Sidebar Items ──────────────────────────────────────────────────────────

  async getAllSidebarItems(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const params = request.query as Record<string, string>;
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/sidebar-items`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get all sidebar items proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async createSidebarItem(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/sidebar-items`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Create sidebar item proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async updateSidebarItem(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { itemId } = request.params as { itemId: string };
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/sidebar-items/${itemId}`, {
        method: 'PUT',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Update sidebar item proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async deleteSidebarItem(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { itemId } = request.params as { itemId: string };
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/sidebar-items/${itemId}`, {
        method: 'DELETE',
        headers: request.headers as Record<string, string>,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Delete sidebar item proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  // ── Role Sidebar Items ─────────────────────────────────────────────────────

  async getRoleSidebarItems(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { roleId } = request.params as { roleId: string };
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/roles/${roleId}/sidebar-items`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get role sidebar items proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async bulkAssignSidebarItems(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { roleId } = request.params as { roleId: string };
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/roles/${roleId}/sidebar-items`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Bulk assign sidebar items proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async addSidebarItemToRole(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { roleId, itemId } = request.params as { roleId: string; itemId: string };
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/roles/${roleId}/sidebar-items/${itemId}`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Add sidebar item to role proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async removeSidebarItemFromRole(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { roleId, itemId } = request.params as { roleId: string; itemId: string };
      const response = await httpClient.forward(`${this.baseUrl}/api/admin/roles/${roleId}/sidebar-items/${itemId}`, {
        method: 'DELETE',
        headers: request.headers as Record<string, string>,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Remove sidebar item from role proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  // ── Platform Users (admin view) ────────────────────────────────────────────

  async getAllUsers(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const params = request.query as Record<string, string>;
      const response = await httpClient.forward(`${this.baseUrl}/users`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Admin get all users proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async updateUserStatus(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { userId } = request.params as { userId: string };
      const response = await httpClient.forward(`${this.baseUrl}/users/${userId}/status`, {
        method: 'PUT',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Update user status proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  // ── Organizations (admin view) ─────────────────────────────────────────────

  async getAllOrganizations(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const params = request.query as Record<string, string>;
      const response = await httpClient.forward(`${this.baseUrl}/organizations`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Admin get all organizations proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async getOrgMembers(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { orgId } = request.params as { orgId: string };
      const response = await httpClient.forward(`${this.baseUrl}/organizations/${orgId}/members`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get org members proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async addOrgMember(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { orgId } = request.params as { orgId: string };
      const response = await httpClient.forward(`${this.baseUrl}/organizations/${orgId}/members`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Add org member proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async removeOrgMember(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { orgId, userId } = request.params as { orgId: string; userId: string };
      const response = await httpClient.forward(`${this.baseUrl}/organizations/${orgId}/members/${userId}`, {
        method: 'DELETE',
        headers: request.headers as Record<string, string>,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Remove org member proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  // ── Products (admin view) ──────────────────────────────────────────────────

  async getAllProducts(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const params = request.query as Record<string, string>;
      const response = await httpClient.forward(`${this.baseUrl}/products`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Admin get all products proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async createProduct(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/products`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Create product proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async updateProduct(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { productId } = request.params as { productId: string };
      const response = await httpClient.forward(`${this.baseUrl}/products/${productId}`, {
        method: 'PUT',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Update product proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async getProductEnrollments(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/products/enrollments`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get product enrollments proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }

  async getProductAccounts(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { productId } = request.params as { productId: string };
      const params = request.query as Record<string, string>;
      const response = await httpClient.forward(`${this.baseUrl}/products/${productId}/accounts`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params,
      });
      reply.status(response.status).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get product accounts proxy failed');
      reply.status(503).send({ success: false, resp_msg: 'Authentication service unavailable', resp_code: 5003 });
    }
  }
}

export const adminProxy = new AdminProxy();
