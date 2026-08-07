import axios from 'axios';
import Config from 'react-native-config';
console.log('BASE URL =', Config.baseURL);
import { requestInterceptor } from '../interceptor/requestInterceptor';
import { responseInterceptor, responseErrorInterceptor } from '../interceptor/responseInterceptor';


const api = axios.create({
    baseURL : Config.baseURL,
    timeout : 30000,
    headers : {
        'Content-Type':'Application/json',
    }
});

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(
    responseInterceptor,
    responseErrorInterceptor
)

export default api