import {
AxiosError,
AxiosResponse,
} from 'axios';

export const responseInterceptor =

(
response: AxiosResponse,
) => response;

export const responseErrorInterceptor =

async (

error: AxiosError,

) => {

if (error.response?.status === 401) {

    // logout later

}

return Promise.reject(error);

};