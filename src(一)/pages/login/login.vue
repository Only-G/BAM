<template>
  <div class="login">
    <div class="box">
      <div class="center">登录</div>
      <div class="line">
        <el-input placeholder="请输入账号"></el-input>
      </div>
      <div class="line">
        <el-input placeholder="请输入密码"></el-input>
      </div>
      <div class="center line">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
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
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    login() {
      this.$router.push("/");
    },
  },
  mounted() {},
};
</script>
<style scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553443, #303d60);
}
.box {
  width: 350px;
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 20px;
}
.center {
  text-align: center;
}
.line {
  margin-top: 10px;
}
</style>