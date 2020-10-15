import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"
Vue.use(Router)

// 封装路由独享守卫
function checkedEnter(path, next) {
  // 拿到路径
  let menus_url = store.state.userInfo.menus_url
  if (menus_url.includes(path)) {
    next()
    return
  }
  next("/")
}


export let indexRoutes = [
  {
    name: "轮播管理",
    path: 'banner',
    component: () => import("../pages/banner/banner.vue"),
    beforeEnter(to, from, next) {
      checkedEnter("/banner", next)
    }
  },
  {
    name: "分类管理",
    path: 'cate',
    component: () => import("../pages/cate/cate.vue"),
    beforeEnter(to, from, next) {
      checkedEnter("/cate", next)
    }
  },
  {
    name: "商品管理",
    path: 'goods',
    component: () => import("../pages/goods/goods.vue"),
    beforeEnter(to, from, next) {
      checkedEnter("/goods", next)
    }
  },
  {
    name: "管理员管理",
    path: 'manage',
    component: () => import("../pages/manage/manage.vue"),
    beforeEnter(to, from, next) {
      checkedEnter("/manage", next)
    }
  },
  {
    name: "会员管理",
    path: 'member',
    component: () => import("../pages/member/member.vue"),
    beforeEnter(to, from, next) {
      checkedEnter("/member", next)
    }
  },
  {
    name: "菜单管理",
    path: 'menu',
    component: () => import("../pages/menu/menu.vue"),
    beforeEnter(to, from, next) {
      checkedEnter("/menu", next)
    }
  },
  {
    name: "角色管理",
    path: 'role',
    component: () => import("../pages/role/role.vue"),
    beforeEnter(to, from, next) {
      checkedEnter("/role", next)
    }
  },
  {
    name: "秒杀管理",
    path: 'seckill',
    component: () => import("../pages/seckill/seckill.vue"),
    beforeEnter(to, from, next) {
      checkedEnter("/seckill", next)
    }
  },
  {
    name: "规格管理",
    path: 'specs',
    component: () => import("../pages/specs/specs.vue"),
    beforeEnter(to, from, next) {
      checkedEnter("/specs", next)
    }
  },
]

let router = new Router({
  routes: [
    {
      path: '/',
      component: () => import("../pages/index/index.vue"),
      children: [
        {
          path: '',
          component: () => import("../pages/home/home.vue")
        },
        ...indexRoutes
      ]
    },
    {
      path: '/login',
      component: () => import("../pages/login/login.vue")
    },
  ]
})
// 全局守卫--登录拦截
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    next();
    return
  }

  if (store.state.userInfo.token) {
    next();
    return
  }
  next("/login")
})
export default router
