import axios, { AxiosInstance } from 'axios';
import logger from './logger';

export const apiAdapter = (baseURL: string, headers: any): AxiosInstance => {
  logger.info(`Creating API adapter with baseURL: ${baseURL}`);
  return axios.create({
    baseURL,
    headers: {
      Authorization: headers.authorization,
      'content-type': 'application/json',
    },
  });
};
