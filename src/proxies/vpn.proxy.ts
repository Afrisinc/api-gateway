import { FastifyRequest, FastifyReply } from 'fastify';
import { env } from '@/config/env';
import { httpClient } from '@/utils/http-client';
import { proxyLogger } from '@/utils/logger';

export class VpnProxy {
  private readonly baseUrl = env.VPN_SERVICE_URL;

  // ==================== VPN Users ====================

  async listUsers(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/users`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params: request.query as Record<string, unknown>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'List users proxy failed');
      reply.status(503).send({ success: false, message: 'VPN service unavailable', error: 'Service unavailable' });
    }
  }

  async getUserByPublicKey(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/users/by-public-key`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params: request.query as Record<string, unknown>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get user by public key proxy failed');
      reply.status(503).send({ success: false, message: 'VPN service unavailable', error: 'Service unavailable' });
    }
  }

  async registerUser(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/users/register`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      const statusCode = (response.data as any)?.success ? 201 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Register user proxy failed');
      reply.status(503).send({ success: false, message: 'VPN service unavailable', error: 'Service unavailable' });
    }
  }

  async toggleConnection(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/users/toggle`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Toggle connection proxy failed');
      reply.status(503).send({ success: false, message: 'VPN service unavailable', error: 'Service unavailable' });
    }
  }

  // ==================== Devices ====================

  async registerDevice(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { userId } = request.params as { userId: string };
      const response = await httpClient.forward(`${this.baseUrl}/users/${userId}/devices`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      const statusCode = (response.data as any)?.success ? 201 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Register device proxy failed');
      reply.status(500).send({ success: false, message: 'Device registration failed', error: 'Service error' });
    }
  }

  async listDevices(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { userId } = request.params as { userId: string };
      const response = await httpClient.forward(`${this.baseUrl}/users/${userId}/devices`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params: request.query as Record<string, unknown>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'List devices proxy failed');
      reply.status(500).send({ success: false, message: 'Failed to retrieve devices', error: 'Service error' });
    }
  }

  async getDevice(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { userId, deviceId } = request.params as { userId: string; deviceId: string };
      const response = await httpClient.forward(`${this.baseUrl}/users/${userId}/devices/${deviceId}`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get device proxy failed');
      reply.status(500).send({ success: false, message: 'Device not found', error: 'Service error' });
    }
  }

  async deleteDevice(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { userId, deviceId } = request.params as { userId: string; deviceId: string };
      const response = await httpClient.forward(`${this.baseUrl}/users/${userId}/devices/${deviceId}`, {
        method: 'DELETE',
        headers: request.headers as Record<string, string>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Delete device proxy failed');
      reply.status(500).send({ success: false, message: 'Device deletion failed', error: 'Service error' });
    }
  }

  async getDeviceConfig(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { userId, deviceId } = request.params as { userId: string; deviceId: string };
      const { serverId } = request.query as { serverId: string };

      const response = await httpClient.forward(
        `${this.baseUrl}/users/${userId}/devices/${deviceId}/config?serverId=${serverId}`,
        {
          method: 'GET',
          headers: request.headers as Record<string, string>,
        }
      );

      // Set proper headers for file download
      reply
        .header('Content-Type', 'text/plain')
        .header('Content-Disposition', 'attachment; filename="vpn-config.conf"')
        .status(200)
        .send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get device config proxy failed');
      reply.status(500).send({ success: false, message: 'Failed to generate config', error: 'Service error' });
    }
  }

  async getDeviceUsage(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { userId, deviceId } = request.params as { userId: string; deviceId: string };
      const response = await httpClient.forward(`${this.baseUrl}/users/${userId}/devices/${deviceId}/usage`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get device usage proxy failed');
      reply.status(500).send({ success: false, message: 'Failed to retrieve usage', error: 'Service error' });
    }
  }

  // ==================== Servers ====================

  async listServers(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/admin/servers`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params: request.query as Record<string, unknown>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'List servers proxy failed');
      reply.status(503).send({ success: false, message: 'VPN service unavailable', error: 'Service unavailable' });
    }
  }

  async listHealthyServers(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/admin/servers/healthy`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
        params: request.query as Record<string, unknown>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'List healthy servers proxy failed');
      reply.status(503).send({ success: false, message: 'VPN service unavailable', error: 'Service unavailable' });
    }
  }

  async createServer(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const response = await httpClient.forward(`${this.baseUrl}/admin/servers`, {
        method: 'POST',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      const statusCode = (response.data as any)?.success ? 201 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Create server proxy failed');
      reply.status(500).send({ success: false, message: 'Server creation failed', error: 'Service error' });
    }
  }

  async updateServerStatus(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { serverId } = request.params as { serverId: string };
      const response = await httpClient.forward(`${this.baseUrl}/admin/servers/${serverId}/status`, {
        method: 'PUT',
        headers: request.headers as Record<string, string>,
        data: request.body,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Update server status proxy failed');
      reply.status(503).send({ success: false, message: 'VPN service unavailable', error: 'Service unavailable' });
    }
  }

  // ==================== Usage ====================

  async getUserUsage(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { userId } = request.params as { userId: string };
      const response = await httpClient.forward(`${this.baseUrl}/users/${userId}/usage`, {
        method: 'GET',
        headers: request.headers as Record<string, string>,
      });

      const statusCode = (response.data as any)?.success ? 200 : response.status;
      reply.status(statusCode).send(response.data);
    } catch (error) {
      proxyLogger.error({ error }, 'Get user usage proxy failed');
      reply.status(500).send({ success: false, message: 'Failed to retrieve usage', error: 'Service error' });
    }
  }
}

export const vpnProxy = new VpnProxy();
