//axios进行二次封装
import axios from 'axios';
import Qs from 'qs';

import store from '@/store';
import { setToken } from '@/utils/localStorage';

let instance = axios.create({
    timeout: 30000,
});

//请求拦截器
instance.interceptors.request.use((config) => {

    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // config.data = Qs.stringify(config.data)
    // console.log(config.data);
    if (store.state.user.token) {
        config.headers.Authorization = store.state.user.token;
    }

    return config;
});

//响应拦截器
instance.interceptors.response.use((res) => {
    if (res.headers.authorization) {
        setToken(res.headers.authorization)
        store.commit('user/SAVETOKEN', res.headers.authorization)
        console.log('设置了新的token');
    }
    return res.data;
}, (error) => {
    //终止promise链
    // console.log(error.response.data);
    return Promise.reject(error.response.data);
});
//对外暴露二次封装的axios
export default instance;