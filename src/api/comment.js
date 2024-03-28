import request from './request';

//获取笔记评论
export const getNotesComment = (blogId, sortTimeOrTrending, page, rows) => request({ url: `/comment/view/selectComments`, method: 'post', data: { blogId, sortTimeOrTrending, page, rows } })

//删除笔记评论
export const deleteComment = (commentId) => request({ url: `/comment/deleteComment`, method: 'post', data: { commentId } })

//添加笔记评论
export const insertComment = (commentAccount, commentUsername, blogId, commentAdmin, commentContent, commentAvatar, firstParentId, parentCommentId) => request({ url: `/comment/insertComment`, method: 'post', data: { commentAccount, commentUsername, blogId, commentAdmin, commentContent, commentAvatar, parentCommentId, firstParentId } })

//TODO
//视频评论点赞接口
export const likeNotesComment = (commentId) => request({ url: `/blogs/commentThumbsUp`, method: 'post', data: { commentId } })

//添加视频评论接口
export const insertVideoComment = (userId, commentAccount, commentUsername, videoId, commentAdmin, commentContent, commentAvatar, firstParentId, parentCommentId) => request({ url: `/videoComment/insertComment`, method: 'post', data: { userId, commentAccount, commentUsername, videoId, commentAdmin, commentContent, commentAvatar, firstParentId, parentCommentId } })

//查询视频评论接口
export const getVideoComment = (videoId, sortTimeOrTrending, page, rows, userId) => request({ url: `/videoComment/view/selectComments`, method: 'post', data: { videoId, sortTimeOrTrending, page, rows, userId } })

//删除视频评论
export const deleteVideoComment = (commentId) => request({ url: `/videoComment/deleteComment`, method: 'post', data: { commentId } })

//视频评论点赞接口
export const likeVideoComment = (commentId) => request({ url: `/videoComment/likeOrCancel`, method: 'post', data: { commentId } })

//TODO
//动态的评论的点赞接口
export const likeDynamicComment = (commentId) => request({ url: `/dynamic/commentThumbs`, method: 'post', data: { commentId } })

//添加动态评论接口
export const insertDynamicComment = (commentAccount, commentUsername, linkId, commentAdmin, commentContent, commentAvatar, firstParentId, parentCommentId) => request({ url: `/dynamic/commentOn`, method: 'post', data: { commentAccount, commentUsername, linkId, commentAdmin, commentContent, commentAvatar, firstParentId, parentCommentId } })

//查询动态评论接口
export const getDynamicComment = (linkId) => request({ url: `/dynamic/view/selectComments`, method: 'post', data: { linkId } })

//删除动态评论
export const deleteDynamicComment = (commentId) => request({ url: `/dynamic/deleteComment`, method: 'post', data: { commentId } })