import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export let indexRoutes = [
  {
    name: "轮播管理",
    path: 'banner',
    component: () => import("../pages/banner/banner.vue"),
  },
  {
    name: "分类管理",
    path: 'cate',
    component: () => import("../pages/cate/cate.vue"),
  },
  {
    name: "商品管理",
    path: 'goods',
    component: () => import("../pages/goods/goods.vue"),
  },
  {
    name: "管理员管理",
    path: 'manage',
    component: () => import("../pages/manage/manage.vue"),
  },
  {
    name: "会员管理",
    path: 'member',
    component: () => import("../pages/member/member.vue"),
  },
  {
    name: "菜单管理",
    path: 'menu',
    component: () => import("../pages/menu/menu.vue"),
  },
  {
    name: "角色管理",
    path: 'role',
    component: () => import("../pages/role/role.vue"),
  },
  {
    name: "秒杀管理",
    path: 'seckill',
    component: () => import("../pages/seckill/seckill.vue"),
  },
  {
    name: "规格管理",
    path: 'specs',
    component: () => import("../pages/specs/specs.vue"),
  },
]

export default new Router({
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
