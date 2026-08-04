import { FastifyRequest, FastifyReply } from 'fastify';
import { apiAdapter } from '@/utils/apiAdapter';
import { logger } from '../utils/logger';
import { ResponseHandler } from '@/utils/response';
import { ALLOWED_ENV_KEYS } from '@/utils/allowedEnv';
import { FileHandler } from '@/utils/fileHandler';
import { serviceAuth } from '@/utils/serviceAuth';

export const createProxyHandler = (urlEnvKey: string, prefix: string) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      if (!ALLOWED_ENV_KEYS.has(urlEnvKey)) {
        logger.error('Invalid environment variable key requested');
        return ResponseHandler.error(reply, 500, 'Internal Server Error', 500);
      }

      const baseUrl = process.env[urlEnvKey];
      if (!baseUrl) {
        logger.error('Required service URL not configured');
        return ResponseHandler.error(reply, 500, 'Internal Server Error', 500);
      }

      const relativePath = request.url.startsWith(prefix) ? request.url.substring(prefix.length) || '/' : request.url;
      logger.info(`Proxying ${request.method} request`);

      if (request.isMultipart()) {
        const uploadResponse = await FileHandler.forwardUpload(request, baseUrl, relativePath);
        return reply.status(uploadResponse.status).send(uploadResponse.data);
      }

      const {
        host: _host,
        connection: _connection,
        'content-length': _contentLength,
        'transfer-encoding': _transferEncoding,
        ...forwardableHeaders
      } = request.headers;

      const signaturePath = relativePath.split('?')[0];
      const signatureHeaders = serviceAuth.getServiceHeaders(request.method, signaturePath, request.body);
      const headersWithSignature = {
        ...forwardableHeaders,
        ...signatureHeaders,
      };

      const api = apiAdapter(baseUrl, headersWithSignature);
      const method = request.method.toLowerCase() as 'get' | 'post' | 'put' | 'delete' | 'patch';

      let response;
      if (method === 'get' || method === 'delete') {
        response = await api[method](relativePath);
      } else {
        response = await api[method](relativePath, request.body);
      }

      return reply.status(response.status).send(response.data);
    } catch (error: any) {
      logger.error(`API Error: ${error.message}`);

      const status = error.response?.status || 500;
      const error_msg =
        error.response?.data.resp_msg ||
        error.response?.data?.message ||
        error.response?.data ||
        'An unknown error occurred.';

      const sanitizedErrorMsg = status >= 500 ? 'Internal service error' : error_msg;

      return reply.status(status).send({
        resp_code: status,
        resp_msg: 'API request failed',
        error_msg: sanitizedErrorMsg,
      });
    }
  };
};
