import _axios from 'axios';
import auth from "commons/auth";

const axios = baseURL => {
    const instance = _axios.create({
        baseURL:
            baseURL || process.env.REACT_APP_API_DOMAIN || 'https://webstorenashi-api.herokuapp.com/',
        timeout: 1000
    });

    // instance.interceptors.request.use(
    //     config => {
    //         const jwToken = auth.getToken();
    //         config.headers['Authorization'] = 'Bearer ' + jwToken;
    //     // Do something before request is sent
    //         return config;
    //     },
    //     error => {
    //     // Do something with request error
    //         return Promise.reject(error);
    //     }
    // );

    return instance;
};

export { axios };

export default axios();