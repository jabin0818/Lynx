import request from './request';

//发布视频接口
export const uploadVideo = (data) => request({ url: `/video/insertVideosAndTags`, method: 'post', data: data })

//根据类型查找视频接口
export const getVideoListByType = (type, page, rows) => request({ url: `/video/view/selectVideoInfoByType`, method: 'post', data: { type, page, rows } })

//根据id获取视频信息接口
export const getVideoDetail = (id, lookUserId) => request({ url: `/video/view/videoToOne`, method: 'post', data: { id, lookUserId } })

//视频点赞或取消点赞接口
export const likeVideo = (id) => request({ url: `/video/likeOrCancel`, method: 'post', data: { id } })

//修改视频接口
export const updateVideo = (data) => request({ url: `/video/changeVideo`, method: 'post', data: data })

//删除视频接口
export const deleteVideo = (id) => request({ url: `/video/deleteVideo`, method: 'post', data: { id } })