import axios, { AxiosInstance } from 'axios';
import logger from './logger';

export const apiAdapter = (baseURL: string, headers: any): AxiosInstance => {
  logger.info(`Creating API adapter with baseURL: ${baseURL}`);
  const defaultHeaders = {
    'content-type': 'application/json',
    ...headers,
  };

  return axios.create({
    baseURL,
    headers: {
      ...defaultHeaders,
      Authorization: headers.authorization,
    },
  });
};
