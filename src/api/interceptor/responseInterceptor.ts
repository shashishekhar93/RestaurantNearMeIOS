import { AxiosError, AxiosResponse } from "axios";

export const responseInterceptor = (
    response : AxiosResponse,
)=>response;

export const responseErrorInterceptor = (
    error:AxiosError,
)=>{
    return Promise.reject(error)
}