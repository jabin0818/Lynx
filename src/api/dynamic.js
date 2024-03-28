import request from './request';

//关注用户
export const subscribeUser = (userId, touserId) => request({ url: `/dynamic/subUsers`, method: 'post', data: { userId, touserId } })

//取消关注用户
export const unsubscribeUser = (userId, touserId) => request({ url: `/dynamic/unsubUsers`, method: 'post', data: { userId, touserId } })

//添加动态接口
export const uploadDynamic = ({ userId, userName, userAvatar, content, contentUrl, dynamicType, isOriginal }) => request({ url: `dynamic/addDn`, method: 'post', data: { userId, userName, userAvatar, content, contentUrl, dynamicType, isOriginal } })

//查找动态页面中的所有动态（我关注的人的动态和我自己的动态）
export const getAllDynamics = (userId, page, rows) => request({ url: `/dynamic/queryDynamics`, method: 'post', data: { userId, page, rows } })

//查找我的动态
export const getMyDynamics = (userId, page, rows, title, typeId, TAV) => request({ url: `/dynamic/view/queryDn`, method: 'post', data: { userId, page, rows, title, typeId, TAV } })

//修改动态接口
export const updateDynamics = (content, contentUrl, dynamicType, isOriginal, id) => request({ url: `/dynamic/changeDynamic`, method: 'post', data: { content, contentUrl, dynamicType, isOriginal, id } })

//删除动态接口
export const deleteDynamics = (id) => request({ url: `/dynamic/deleteOne`, method: 'post', data: { id } })

//动态点赞
export const likeDynamic = (dynamicId) => request({ url: `/dynamic/dynamicThumbs`, method: 'post', data: { dynamicId } })

//分享接口
export const shareDynamic = (userId,userName, userAvatar, content, contentUrl, dynamicType, linkId) => request({ url: `/dynamic/shareDn`, method: 'post', data: {userId, userName, userAvatar, content, contentUrl, dynamicType, linkId } })