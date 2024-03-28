

const state = {
    // 登录注册的modal是否可见
    loginRegVisible: false,
    // 邮箱找回密码modal是否可见
    emailResetPasswordVisible: false,
    // 收藏modal是否可见
    collectionVisible: false,
    // 当前打开收藏nodal的类型和id
    collectionContentInfo: {},
    // 分享modal是否可见
    shareVisible: false,
    // 分享modal中的数据
    shareDetailInfo: {},
    // 查看收藏夹详细的modal是否可见
    favoriteDetailVisible: false,
    // 查看收藏夹详细的数据
    favoriteDetailInfo: {}

}

const mutations = {
    SETSHAREDETAILINFO(state, info) {
        state.shareDetailInfo = info
    },
    SETFAVORITEDETAILINFO(state, favInfo) {
        state.favoriteDetailInfo = favInfo
    },
    SETCOLLECTIONCONTENTINFO(state, content) {
        state.collectionContentInfo = content
    }
}

const actions = {

}

const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}