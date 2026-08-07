import {InternalAxiosRequestConfig} from 'axios';
import {SessionManager} from '../../utils/SessionManager';

export const requestInterceptor =
async (
    config: InternalAxiosRequestConfig,
) => {

    const token =
        await SessionManager.getAccessToken();

    if (token) {

        config.headers.Authorization =
          `Bearer ${token}`;
    }

    return config;
};