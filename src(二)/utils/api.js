import axios from "axios"
import qs from "qs"

let baseUrl = "/api"

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
