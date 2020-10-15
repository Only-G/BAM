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
