import { reqSpecsList, reqSpecsCount } from "../../utils/api"

const state = {
    list: [],
    // 一页的数量
    size: 2,
    // 页码
    page: 1,
    // 总数
    total: 0
}
const mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    // 修改total
    changeTotal(state, num) {
        state.total = num
    },
    // 修改页码
    changePage(state, page) {
        state.page = page
    }
}
const actions = {

    reqListMenu(context) {
        // 调用接口
        reqSpecsList({ size: context.state.size, page: context.state.page }).then(res => {
            // 判断没有属性为空
            let list = res.data.list ? res.data.list : [];
            // 最后处理------修理bug，例如如果删除完第三页应该跳到第二页而不是显示没有数据
            if (context.state.page > 1 && list.length == 0) {
                context.commit("changePage", context.state.page - 1)
                context.dispatch("reqListMenu")
                return;
            }
            // 转换每一个list  
            list.forEach(item => {
                item.attrs = JSON.parse(item.attrs)
            })
            context.commit("changeList", list)
        })
    },
    // 获取总页数的请求
    reqTotalAction(context) {
        // 接口
        reqSpecsCount().then(res => {
            context.commit("changeTotal", res.data.list[0].total)
        })
    },
    // 组件修改页码
    changePageAcion(context, page) {
        // 修改页码
        context.commit("changePage", page);
        //发起list请求
        context.dispatch("reqListMenu")
    }
}
const getters = {
    lists(state) {
        return state.list
    },
    size(state) {
        return state.size
    },
    total(state) {
        return state.total
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}
