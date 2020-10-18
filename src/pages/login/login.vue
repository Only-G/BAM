<template>
  <div class="login">
    <div class="box">
      <div class="center">登录</div>
      <div class="line">
        <el-input
          placeholder="请输入账号"
          v-model="form.username"
          clearable
        ></el-input>
      </div>
      <div class="line">
        <el-input
          placeholder="请输入密码"
          v-model="form.password"
          clearable
          show-password
        ></el-input>
      </div>
      <div class="center line">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../utils/alert";
import { reqLogin } from "../../utils/api";
export default {
  props: [],
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      changeUserInfoAaction: "changeUserInfoAaction",
    }),
    // 判断登录用户名和密码
    checkLogin() {
      if (this.form.username == "") {
        warningAlert("用户名不能为空");
        return false;
      } else {
        let n = this.form.username.length;
        let reg = /^[a-zA-Z]\w{3,10}$/gi;
        if (n > 6 || n <= 1) {
          warningAlert("用户名长度不正确");
          return false;
        } else if (!reg.test(this.form.username)) {
          warningAlert("用户名非法");
          return false;
        }
      }
      if (this.form.password == "") {
        warningAlert("密码不能为空");
        return false;
      } else {
        let passNum = this.form.password.length;
        // 长度为3~10的仅由字母/数字/下划线组成的字符串
        let reg = /^(\w|\d){3,10}$/;
        if (passNum > 6 || passNum <= 1) {
          warningAlert("密码长度不正确");
          return false;
        } else if (!reg.test(this.form.password)) {
          warningAlert("密码不正确");
          return false;
        }
      }
      return true;
    },
    login() {
      if (!this.checkLogin()) {
        return;
      }
      reqLogin(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("登录成功");
          // 将用户信息存起来供很多组件使用
          this.changeUserInfoAaction(res.data.list);
          // 跳转首页
          this.$router.push("/");
        } else {
          warningAlert(res.data.msg);
        }
      });
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