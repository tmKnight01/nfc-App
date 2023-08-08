import axios, { AxiosResponse } from "axios";


const intance = axios.create({
    baseURL: 'http://bc0101.ddns.net:12800/'
});



intance.interceptors.request.use(
    (config) => {
        // 后期需要进行auth鉴权
        console.log('config', config);
        return config;
    },
    (error) => {
        Promise.reject(error.response);
    }
);

intance.interceptors.response.use(
    (response: AxiosResponse) => {
        // 服务端统一返回数据格式，此处进行数据过滤
        if (response.status === 200) return response?.data;

        throw Error(response.status.toString());
    },
    (error) => {
        console.log('error', error)
        return Promise.reject(error);
    }
);

export default intance;