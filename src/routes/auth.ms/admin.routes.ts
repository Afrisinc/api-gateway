import type { FastifyInstance } from 'fastify';
import { adminProxy } from '@/proxies/admin.proxy';
import { authGuard } from '@/middlewares/authGuard';

const adminSchema = {
  security: [{ bearerAuth: [] }],
};

export const registerAdminRoutes = async (app: FastifyInstance): Promise<void> => {
  // ── Roles ────────────────────────────────────────────────────────────────

  app.get(
    '/api/admin/roles',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.getAllRoles(req, reply);
    }
  );

  app.get(
    '/api/admin/roles/:roleId',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.getRole(req, reply);
    }
  );

  app.post(
    '/api/admin/roles',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.createRole(req, reply);
    }
  );

  app.put(
    '/api/admin/roles/:roleId',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.updateRole(req, reply);
    }
  );

  app.delete(
    '/api/admin/roles/:roleId',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.deleteRole(req, reply);
    }
  );

  // ── Role ↔ Permissions ───────────────────────────────────────────────────

  app.get(
    '/api/admin/roles/:roleId/permissions',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.getRolePermissions(req, reply);
    }
  );

  app.post(
    '/api/admin/roles/:roleId/permissions',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.bulkAssignPermissions(req, reply);
    }
  );

  app.post(
    '/api/admin/roles/:roleId/permissions/:permissionId',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.addPermissionToRole(req, reply);
    }
  );

  app.delete(
    '/api/admin/roles/:roleId/permissions/:permissionId',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.removePermissionFromRole(req, reply);
    }
  );

  // ── Permissions ──────────────────────────────────────────────────────────

  app.get(
    '/api/admin/permissions',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.getAllPermissions(req, reply);
    }
  );

  app.post(
    '/api/admin/permissions',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.createPermission(req, reply);
    }
  );

  app.put(
    '/api/admin/permissions/:permissionId',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.updatePermission(req, reply);
    }
  );

  app.delete(
    '/api/admin/permissions/:permissionId',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.deletePermission(req, reply);
    }
  );

  // ── Sidebar Items ────────────────────────────────────────────────────────

  app.get(
    '/api/admin/sidebar-items',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.getAllSidebarItems(req, reply);
    }
  );

  app.post(
    '/api/admin/sidebar-items',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.createSidebarItem(req, reply);
    }
  );

  app.put(
    '/api/admin/sidebar-items/:itemId',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.updateSidebarItem(req, reply);
    }
  );

  app.delete(
    '/api/admin/sidebar-items/:itemId',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.deleteSidebarItem(req, reply);
    }
  );

  // ── Role ↔ Sidebar Items ─────────────────────────────────────────────────

  app.get(
    '/api/admin/roles/:roleId/sidebar-items',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.getRoleSidebarItems(req, reply);
    }
  );

  app.post(
    '/api/admin/roles/:roleId/sidebar-items',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.bulkAssignSidebarItems(req, reply);
    }
  );

  app.post(
    '/api/admin/roles/:roleId/sidebar-items/:itemId',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.addSidebarItemToRole(req, reply);
    }
  );

  app.delete(
    '/api/admin/roles/:roleId/sidebar-items/:itemId',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.removeSidebarItemFromRole(req, reply);
    }
  );

  // ── Platform Users (super admin view) ────────────────────────────────────

  app.get(
    '/api/admin/users',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.getAllUsers(req, reply);
    }
  );

  app.put(
    '/api/admin/users/:userId/status',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.updateUserStatus(req, reply);
    }
  );

  // ── Organizations (super admin view) ─────────────────────────────────────

  app.get(
    '/api/admin/organizations',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.getAllOrganizations(req, reply);
    }
  );

  app.get(
    '/api/admin/organizations/:orgId/members',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.getOrgMembers(req, reply);
    }
  );

  app.post(
    '/api/admin/organizations/:orgId/members',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.addOrgMember(req, reply);
    }
  );

  app.delete(
    '/api/admin/organizations/:orgId/members/:userId',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.removeOrgMember(req, reply);
    }
  );

  // ── Products (super admin view) ──────────────────────────────────────────

  app.get(
    '/api/admin/products',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.getAllProducts(req, reply);
    }
  );

  app.post(
    '/api/admin/products',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.createProduct(req, reply);
    }
  );

  app.put(
    '/api/admin/products/:productId',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.updateProduct(req, reply);
    }
  );

  app.get(
    '/api/admin/products/enrollments',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.getProductEnrollments(req, reply);
    }
  );

  app.get(
    '/api/admin/products/:productId/accounts',
    { preHandler: authGuard, schema: { tags: ['Admin'], ...adminSchema } },
    async (req, reply) => {
      await adminProxy.getProductAccounts(req, reply);
    }
  );
};
