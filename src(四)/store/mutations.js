export const state = {
    // 用户信息   
    // 判断用户信息登录进去设置用户名密码，当页面刷新，之前登录存过就可以直接用，没有登录过则为空
    userInfo: sessionStorage.getItem("userinfo") ? JSON.parse(sessionStorage.getItem("userInfo")) : {}
}
export const mutations = {
    changeUserInfo(state, info) {
        state.userInfo = info
        // 状态层和本地存储同步
        // 由于状态层刷新数据就没有了，但我们希望数据还存在所以在本地也存储一份
        if (info.id) {
            sessionStorage.setItem("userInfo", JSON.stringify(info))
        } else {
            // 判断用户信息登录进去设置用户名密码，退出登录则清除本地缓存
            sessionStorage.removeItem("userInfo")
        }
    }
}
export const getters = {
    userInfo(state) {
        return state.userInfo
    }
}
