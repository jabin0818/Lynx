import request from './request';

//发布笔记
export const articleCreate = (data) => request({ url: `/blogs/insertBlogsAndTags`, method: 'post', data: data })

//查找笔记详情
export const getNotesDetail = (blogId, userId) => request({ url: `/blogs/view/blogToOne`, method: 'post', data: { blogId, userId } })

//获取笔记分类
export const getNotesType = () => request({ url: `/blogs/views/getType`, method: 'get' })

//获取笔记分类的列表
export const getNotesListByType = (type, page, rows) => request({ url: `/blogs/view/selectBlogByType`, method: 'post', data: { type, page, rows } })

//删除笔记
export const deleteOneNotes = (blogId) => request({ url: `/blogs/deleteBlogs`, method: 'post', data: { blogId } })

//获取笔记的相关笔记列表
export const getBoundNotes = (typeId) => request({ url: `/blogs/views/getBoundBlogs`, method: 'post', data: { typeId } })

//编辑笔记 
export const updateNotes = (data) => request({ url: `/blogs/updateBlogs`, method: 'post', data: data })

//文章上传图片
export const uploadPicture = (data) => request({ url: `/blogs/saveImg`, method: 'post', data: data })

//笔记管理
export const selectBlogsByUser = (uuid) => request({ url: `/blogs/selectBlogsByUser`, method: 'post', data: { uuid } })

//笔记点赞或取消点赞
export const likeBolgs = (blogId) => request({ url: `/blogs/blogThumbsUp`, method: 'post', data: { blogId } })

//获取热门笔记
export const getHotNotes = () => request({ url: `/blogs/view/getBlogsHot`, method: 'get' })

// 笔记评论点赞
export const likeNotesComment = (commentId) => request({ url: `/blogs/commentThumbsUp`, method: 'post', data: { commentId } })
