import axios from "axios"
import Vue from "vue"
import qs from "qs"

// 开发环境使用
Vue.prototype.$imgPre = "http://localhost:3000"
let baseUrl = "/api"

// 打包
// Vue.prototype.$imgPre = ""
// let baseUrl = ""

// 响应拦截
axios.interceptors.response.use(res => {
    console.group("=====The Path" + res.config.url)
    console.log(res);
    console.groupEnd();
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
export const rewCateList = () => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: 'get',
        params: {
            istree: true,

        }
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