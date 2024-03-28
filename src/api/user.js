import request from './request';

//获取用户信息接口
export const obtainUserInfo = ({ id, touserId }) => request({ url: `/user/getUserinfo`, method: 'post', data: { id, touserId } })

//修改用户信息
export const updateUserInfo = (id, username, birthday, city, gender, resume, degree, uuid, avatar) => request({ url: `/user/changeUserInfo`, method: 'post', data: { id, username, birthday, city, gender, resume, degree, uuid, avatar } })

//获取笔记作者信息
export const getAuthorInfo = (userId) => request({ url: `/blogs/views/getUserInfo`, method: 'post', data: { userId } })

//获取用户关注的人
export const getUserFollow = (userId) => request({ url: `/dynamic/view/findSub`, method: 'post', data: { userId } })

//获取用户的粉丝
export const getUserFans = (userId) => request({ url: `/dynamic/view/findFollow`, method: 'post', data: { userId } })

//TODO
//获取个人的博客
export const selectUserBlogs = (userId, page, rows, title, TAV, typeId) => request({ url: `/blogs/view/selectBlogs`, method: 'post', data: { userId, page, rows, title, TAV, typeId } })

//获取个人的卡片集
export const selectUserCardSets = (uid, page, rows, title, TAV, typeId) => request({ url: `/card/view/selectCardSets`, method: 'post', data: { uid, page, rows, title, TAV, typeId } })

//获取个人视频
export const selectUserVideos = (userId, page, rows, title, TAV, typeId) => request({ url: `/video/view/selectVideos`, method: 'post', data: { userId, page, rows, title, TAV, typeId } })

