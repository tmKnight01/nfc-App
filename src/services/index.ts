import axios, { AxiosResponse } from "axios";


const intance = axios.create({
    baseURL: ' http://bc0101.ddnsnet:12800/'
});



intance.interceptors.request.use(
    (config) => {
        // 后期需要进行auth鉴权
        return config;
    },
    (error) => {
        Promise.reject(error.response);
    }
);

intance.interceptors.response.use(
    (response: AxiosResponse) => {
        // 服务端统一返回数据格式，此处进行数据过滤
        if (response.status === 200) return response;

        throw Error(response.status.toString());
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default intance;