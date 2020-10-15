import { rewMenuList } from "../../utils/api"

const state = {
    list: []
}
const mutations = {
    changeList(state, arr) {
        state.list = arr
    }
}
const actions = {

    reqListMenu(context) {
        // 调用接口
        rewMenuList().then(res => {
            context.commit("changeList", res.data.list)
        })
    }
}
const getters = {
    lists(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}
