import request from './request';

//随机推荐视频
export const randomVideos = () => request({ url: `/video/view/randomVideos`, method: 'post' })

//随机卡片接口
export const randomCardSets = () => request({ url: `/card/view/randomCardSets`, method: 'post' })
