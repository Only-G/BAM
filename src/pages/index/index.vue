<template>
  <el-container class="index">
    <!-- 左边 -->
    <el-aside width="200px" class="left">
      <el-menu
        default-active="/"
        class="el-menu-vertical-demo"
        background-color="#20222a"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        unique-opened
      >
        <!-- 首页 -->
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <!-- 动态侧边栏 -->
        <div v-for="item in userInfo.menus" :key="item.id">
          <el-submenu :index="item.id + ''" v-if="item.children">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="i in item.children"
                :key="i.id"
                :index="i.url"
                >{{ i.title }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item v-else :index="item.url">{{ item.title }}</el-menu-item>
        </div>

        <!-- 系统设置  
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/menu">菜单管理</el-menu-item>
            <el-menu-item index="/role">角色管理</el-menu-item>
            <el-menu-item index="/manage">管理员管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        商城管理
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-goods"></i>
            <span>商城管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/cate">商品分类</el-menu-item>
            <el-menu-item index="/specs">商品规格</el-menu-item>
            <el-menu-item index="/goods">商品管理</el-menu-item>
            <el-menu-item index="/member">会员管理</el-menu-item>
            <el-menu-item index="/banner">轮播图管理</el-menu-item>
            <el-menu-item index="/seckill">秒杀活动</el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->
      </el-menu>
    </el-aside>
    <!-- content -->
    <el-container>
      <!-- header -->
      <el-header class="header">
        <div class="back">
          <span>{{ userInfo.username }}</span>
          <el-button @click="userBack">退出</el-button>
        </div>
      </el-header>
      <!-- main -->
      <el-main>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 二级路由 -->
        <router-view class="distance" />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      changeUserInfoAaction: "changeUserInfoAaction",
    }),
    // 退出登录
    userBack() {
      this.changeUserInfoAaction({});
      this.$router.push("/login");
    },
  },
  mounted() {},
};
</script>
<style scoped>
.index {
  height: 100vh;
}
.left {
  background: #20222a;
}
.header {
  overflow: hidden;
  background: #b3c0d1;
}
.distance {
  padding-top: 10px;
}
.back {
  float: right;
  line-height: 60px;
}
</style>