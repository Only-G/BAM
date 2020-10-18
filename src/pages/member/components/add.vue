<template>
  <div>
    <el-dialog title="会员修改" :visible.sync="info.isShow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="editors">修 改</el-button>
      </div>
    </el-dialog>

    <!--  -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqMemberInfo, reqMemberEdit } from "../../../utils/api";
import { indexRoutes } from "../../../router/index";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      lists: "member/lists",
    }),
  },
  methods: {
    ...mapActions({
      // list
      reqListMenu: "member/reqListMenu",
    }),
    // 取消事件
    cancel() {
      this.info.isShow = false;
      this.empty();
    },
    // 重置事件
    empty() {
      this.form = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
    // 判断
    checkMember() {
      if (this.form.nickname == "") {
        warningAlert("昵称不能为空");
        return false;
      } else {
        // 帐号是否合法(文字开头，允许字母数字下划线)
        let reg = /^[\u4e00-\u9fa5]+[\u4E00-\u9FA5A-Za-z0-9_]+$/;
        if (!reg.test(this.form.nickname)) {
          warningAlert("昵称不正确");
          return false;
        }
      }
      // 手机号
      if (this.form.phone == "") {
        warningAlert("手机号不能为空");
        return false;
      } else {
        let tel = this.form.phone.length;
        // 以1开头第二位可以是34578中任意一位，最后以10-9，9个整数结尾
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (tel > 11) {
          warningAlert("手机号太长");
          return false;
        } else if (!reg.test(this.form.phone)) {
          warningAlert("手机号不正确");
          return false;
        }
      }
      return true;
    },
    // 获取单独一条信息
    look(uid) {
      reqMemberInfo(uid).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.password = "";
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改事件
    editors() {
      if (!this.checkMember()) {
        return;
      }
      // 调取接口
      reqMemberEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqListMenu();
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
</style>