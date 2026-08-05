import axios from 'axios';
import logger from './logger';

export class FileHandler {
  static async forwardUpload(
    req: any,
    baseUrl: string,
    relativePath: string,
    extraHeaders: Record<string, string> = {}
  ) {
    try {
      const targetUrl = `${baseUrl}${relativePath}`;
      const contentType = req.headers['content-type'];

      const response = await axios.post(targetUrl, req.raw, {
        headers: {
          'content-type': contentType,
          Authorization: req.headers.authorization,
          ...extraHeaders,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        timeout: 300000,
      });

      return response;
    } catch (error: any) {
      logger.error(`File Upload Proxy Error: ${error.message}`);
      throw error;
    }
  }

  static async fetchFile(fileUrl: string, headers: any) {
    const config = {
      method: 'get' as const,
      url: fileUrl,
      responseType: 'arraybuffer' as const,
      headers: {
        ...headers,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    };

    const response = await axios(config);
    return response;
  }
}
