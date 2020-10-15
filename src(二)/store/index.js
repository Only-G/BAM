import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

import { state, getters, mutations } from "./mutations"
import { actions } from "./actions"

// 引入各个管理
import menu from "./modules/menu"
import role from "./modules/role"
import manage from "./modules/manage"

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        menu,
        role,
        manage
    }
})