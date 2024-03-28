import request from './request';

//获取随机标签
export const getRandomTags = () => request({ url: `/blogs/views/getTags`, method: 'get' })

//获取全部标签
export const getAllTags = (name, uid) => request({ url: `/tags/view/selectTags`, method: 'post', data: { name, uid } })

//获取热门标签
export const getHotsTags = () => request({ url: `/tags/view/getHotTags`, method: 'get' })

//获取标签
export const selectTags = (name, uid) => request({ url: `/tags/view/selectTags`, method: 'post', data: { name, uid } })

//标签获取文章列表接口
export const getBlogsByTag = (tagId) => request({ url: `/tags/view/getBlogsByTag`, method: 'post', data: { tagId } })

//关注标签
export const insertTags = (uid, tagId) => request({ url: `/tags/insertTags`, method: 'post', data: { uid, tagId } })
