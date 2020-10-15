import { rewRoleList } from "../../utils/api"

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
        rewRoleList().then(res => {
            // 判断一下数据库列表是否有内容，有就渲染，没有就为空
            let list = res.data.list ? res.data.list : []
            context.commit("changeList", list)
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
