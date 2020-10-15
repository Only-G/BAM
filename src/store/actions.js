export const actions = {
    // 触发修改userInfo
    changeUserInfoAaction(context, info) {
        context.commit("changeUserInfo", info)
    }
}