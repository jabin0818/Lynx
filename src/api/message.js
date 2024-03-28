import request from './request';

//发私信
export const sendMessage = (message) => request({ url: `/dynamic/contact`, method: 'post', data: { message } })
