import request from './request';

// 创建卡片集数据
export const insertCardSet = (cardSetId, title, desc, uid) => request({ url: `/card/insertCardSet`, method: 'post', data: { cardSetId, title, desc, uid } })

//类型查找卡片
export const getCardsByType = (type, rows, page) => request({ url: `/card/view/selectCardsByType`, method: 'post', data: { type, rows, page } })

//查询卡片集信息
// export const getOneCardsInfo = ({ uid, cardSetId }) => request({ url: `/card/view/getOneCardSet`, method: 'post', data: { uid, cardSetId } })

//查询卡片集里的卡片
// export const getCardById = (uid, cardSetId) => request({ url: `/card/view/getCards`, method: 'post', data: { uid, cardSetId } })
// export const getCardById = (uid, cardSetId) => request({ url: `/card/view/selectCardSets`, method: 'post', data: { uid, cardSetId } })

//查询用户单个卡片集信息
// export const getUserCardsInfo = (uid, cardSetId) => request({ url: `/card/selectCardSetOne`, method: 'post', data: { uid, cardSetId } })

//获取单个卡片集信息
export const selectCardsSetInfo = (cardSetId) => request({ url: `/card/view/selectCardSet`, method: 'post', data: { cardSetId } })

//查询用户卡片集里的卡片
export const selectCards = (uid, cardSetId) => request({ url: `/card/selectCards`, method: 'post', data: { uid, cardSetId } })

//添加卡片集里的卡片
export const insertStudyCard = (cardSetId, caption, typeId, uid, type, title, content, color, tier) => request({ url: `/card/insertStudyCard`, method: 'post', data: { cardSetId, caption, typeId, uid, type, title, content, color, tier } })

//用户卡片学习信息
export const setUserCardInfo = (uid, cardId) => request({ url: `/card/setUserCardInfo`, method: 'post', data: { uid, cardId } })

//添加用户卡片学习信息 卡片集存在时（在卡片集上添加新的卡片）
// export const insertUserCards = (cardId, cardSetId, firstImg) => request({ url: `/card/insertUserCards`, method: 'post', data: { cardId, cardSetId } })

// 收藏卡片接口
export const collectionCardSet = (uid, cardSetId) => request({ url: `/card/collectionCardSet`, method: 'post', data: { uid, cardSetId } })

// 取消收藏接口
export const cancelCardSet = (uid, cardSetId) => request({ url: `/card/cancelCardSet`, method: 'post', data: { uid, cardSetId } })

// 图片保存接口
export const uploadCardImg = (data) => request({ url: `/card/cardImg`, method: 'post', data: data })

// 修改卡片接口
export const changeCardInfo = (cardSetId, uid, id, type, title, content, color, tier) => request({ url: `/card/changeCardInfo`, method: 'post', data: { cardSetId, uid, id, type, title, content, color, tier } })

// 删除卡片接口
export const deleteCard = (cardSetId, uid, cardId) => request({ url: `/card/deleteCard`, method: 'post', data: { cardSetId, uid, cardId } })

// 修改卡片集接口
// export const changeCardSetInfo = (uid, cardSetId, title, intro, firstImg) => request({ url: `/card/changeCardSetInfo`, method: 'post', data: { uid, cardSetId, title, intro, firstImg } })
export const changeCardSetInfo = (data) => request({ url: `/card/changeCardSetInfo`, method: 'post', data })

// 删除卡片集接口
export const deleteCardSet = (cardSetId, uid) => request({ url: `/card/deleteCardSet`, method: 'post', data: { cardSetId, uid } })

// 发布卡片集接口
export const uploadCardSets = (cardSetId, tags, typeId) => request({ url: `/card/uploadCardSets`, method: 'post', data: { cardSetId, tags, typeId } })

// 重新开始学习卡片
export const restartCard = (uid, cardId) => request({ url: `/card/resetUserCardInfo`, method: 'post', data: { uid, cardId } })

// 获取相关卡片集信息
export const getRelatCardSet = (cardSetId) => request({ url: `/card/views/getBoundCardSet`, method: 'get', params: { cardSetId } })