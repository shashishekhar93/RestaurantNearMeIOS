import {InternalAxiosRequestConfig} from 'axios';

export const requestInterceptor = async (
  config: InternalAxiosRequestConfig,
) => {
  /**
   * Later:
   * Read access token from storage
   * Add Authorization header
   */

  return config;
};