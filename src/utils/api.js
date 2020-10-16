import axios from "axios"
import Vue from "vue"
import qs from "qs"
import store from "../store"
import { warningAlert } from "./alert"
import router from "../router"

// 开发环境使用
Vue.prototype.$imgPre = "http://localhost:3000"
let baseUrl = "/api"

// 打包
// Vue.prototype.$imgPre = ""
// let baseUrl = ""

// 请求拦截
axios.interceptors.request.use(config => {
    if (config.url !== baseUrl + "/api/userlogin") {
        config.headers.authorization = store.state.userInfo.token
    }
    return config;
})

// 响应拦截
axios.interceptors.response.use(res => {
    console.group("=====The Path" + res.config.url)
    console.log(res);
    console.groupEnd();

    if (res.data.msg == "登录已过期或访问权限受限") {
        warningAlert(res.data.msg)
        router.push("/login")
    }
    return res;
})
// ==========菜单管理===========
// 菜单添加
export const reqMenuAdd = (params) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: 'post',
        data: qs.stringify(params)
    })
}
// 菜单列表
export const rewMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: 'get',
        params: {
            istree: true
        }
    })
}
// 菜单删除
export const reqMenuDelete = (id) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: {
            id
        }
    })
}
// 获取一条菜单的信息
export const reqMenuInfo = (id) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: {
            id
        }
    })
}
// 菜单修改
export const reqMenuEdit = (params) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: 'post',
        data: qs.stringify(params)
    })
}
// ==========角色管理===========
// 添加
export const reqRoleAdd = (params) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: 'post',
        data: qs.stringify(params)
    })
}
// 列表
export const rewRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: 'get',
    })
}
// 删除
export const reqRoleDelete = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: {
            id
        }
    })
}
// 获取一条信息
export const reqRoleInfo = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id
        }
    })
}
// 修改
export const reqRoleEdit = (params) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: 'post',
        data: qs.stringify(params)
    })
}
// ==========管理员管理===========
// 添加
export const reqManageAdd = (params) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: 'post',
        data: qs.stringify(params)
    })
}
// 管理员总数
export const reqManageCount = () => {
    return axios({
        url: baseUrl + "/api/usercount"
    })
}
// 管理员列表(分页)
export const reqManageList = (params) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: 'get',
        params
    })
}

// 删除
export const reqManageDelete = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({ uid })
    })
}
// 获取一条信息
export const reqManageInfo = (uid) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid
        }
    })
}
// 修改
export const reqManageEdit = (params) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: 'post',
        data: qs.stringify(params)
    })
}
// ==========商品分类===========
// 添加
export const reqCateAdd = (params) => {
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: 'post',
        data: data
    })
}
// 列表
export const rewCateList = (params) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: 'get',
        params: params
    })
}
// 删除
export const reqCateDelete = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: {
            id
        }
    })
}
// 获取一条信息
export const reqCateInfo = (id) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: {
            id
        }
    })
}
// 修改
export const reqCateEdit = (params) => {
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: 'post',
        data: data
    })
}
// ==========商品规格管理===========
// 添加
export const reqSpecsAdd = (params) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: 'post',
        data: qs.stringify(params)
    })
}
// 总数
export const reqSpecsCount = () => {
    return axios({
        url: baseUrl + "/api/specscount"
    })
}
// 列表(分页)
export const reqSpecsList = (params) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: 'get',
        params
    })
}

// 删除
export const reqSpecsDelete = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({ id })
    })
}
// 获取一条信息
export const reqSpecsInfo = (id) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id
        }
    })
}
// 修改
export const reqSpecsEdit = (params) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: 'post',
        data: qs.stringify(params)
    })
}
// ==========会员管理===========

// 列表
export const reqMemberList = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: 'get',
    })
}
// 获取一条信息
export const reqMemberInfo = (uid) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params: {
            uid
        }
    })
}
// 修改
export const reqMemberEdit = (params) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: 'post',
        data: qs.stringify(params)
    })
}

// ==========轮播图管理===========
// 添加
export const reqBannerAdd = (params) => {
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: 'post',
        data: data
    })
}
// 列表
export const rewBannerList = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: 'get',
    })
}
// 删除
export const reqBannerDelete = (id) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: {
            id
        }
    })
}
// 获取一条信息
export const reqBannerInfo = (id) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: {
            id
        }
    })
}
// 修改
export const reqBannerEdit = (params) => {
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/banneredit",
        method: 'post',
        data: data
    })
}
// ==========商品管理===========
// 添加
export const reqGoodsAdd = (params) => {
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: 'post',
        data: data
    })
}
// 总数
export const reqGoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount"
    })
}
// 列表(分页)
export const reqGoodsList = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: 'get',
        params
    })
}

// 删除
export const reqGoodsDelete = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify({ id })
    })
}
// 获取一条信息
export const reqGoodsInfo = (id) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: {
            id
        }
    })
}
// 修改
export const reqGoodsEdit = (params) => {
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: 'post',
        data: data
    })
}
// ==========限时秒杀===========
// 添加
export const reqSeckillAdd = (params) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: 'post',
        data: qs.stringify(params)
    })
}
// 列表
export const rewSeckillList = () => {
    return axios({
        url: baseUrl + "/api/secklist",
        method: 'get',
    })
}
// 删除
export const reqSeckillDelete = (id) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: {
            id
        }
    })
}
// 获取一条信息
export const reqSeckillInfo = (id) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params: {
            id
        }
    })
}
// 修改
export const reqSeckillEdit = (params) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: 'post',
        data: qs.stringify(params)
    })
}




//登录
export const reqLogin = (params) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(params)
    })
}