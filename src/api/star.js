import request from './request';

//取消收藏接口
export const cancelCollection = (collectId, favoriteId) => request({ url: `/tags/cancelCollection`, method: 'post', data: { collectId, favoriteId } })

//收藏或新建收藏夹接口
export const insertCollect = ({ collectId, groupName, groupDescription, color, type, id }) => request({ url: `/tags/insertCollect`, method: 'post', data: { collectId, groupName, groupDescription, color, type, id } })

//删除收藏夹接口
export const deleteFavorites = (id) => request({ url: `/tags/deleteFavorites`, method: 'post', data: { id } })

//修改收藏夹接口
export const changeFavorites = (groupName, groupDescription, color, id) => request({ url: `/tags/changeFavorites`, method: 'post', data: { groupName, groupDescription, color, id } })

//获取收藏夹接口
export const selectFavorites = (page, rows) => request({ url: `/tags/selectFavorites`, method: 'post', data: { page, rows } })

//获取收藏夹内容接口
export const selectFavContent = (favoriteId, groupName) => request({ url: `/tags/selectCollections`, method: 'post', data: { favoriteId, groupName } })



