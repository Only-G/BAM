<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加管理员' : '编辑管理员'"
      :visible.sync="info.isShow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid" placeholder="请选择上级菜单">
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="item in lists"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
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
        <el-button type="primary" @click="menuAdd" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="editors" v-else>修 改</el-button>
      </div>
    </el-dialog>

    <!--  -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqManageAdd, reqManageInfo, reqManageEdit } from "../../../utils/api";
import { indexRoutes } from "../../../router/index";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      lists: "role/lists",
    }),
  },
  methods: {
    ...mapActions({
      // 角色list
      reqListMenu: "role/reqListMenu",
      // 管理员list
      reqManageList: "manage/reqListMenu",
      // 总数
      reqTotalAction: "manage/reqTotalAction",
    }),
    // 取消事件
    cancel() {
      this.info.isShow = false;
      this.empty();
    },
    // 重置事件
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    // 判断
    checkManage() {
      if (this.form.roleid == "") {
        warningAlert("所属角色不能为空");
        return false;
      }
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
          warningAlert("密码格式不正确");
          return false;
        }
      }
      return true;
    },
    // 添加事件
    menuAdd() {
      if (!this.checkManage()) {
        return;
      }
      reqManageAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          // 成功
          successAlert(res.data.msg);
          // 清空表单
          this.empty();
          // form表单取消事件
          this.cancel();
          // list数据刷新
          this.reqManageList();
          // 页总数更新
          this.reqTotalAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 判断菜单
    changPid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    // 获取单独一条信息
    look(uid) {
      reqManageInfo(uid).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          // 获取单独一条数据的时候没有id所以得拿到id
          // this.form.uid = uid;
          this.form.password = "";
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改事件
    editors() {
      // 判断输入内容
      if (!this.checkManage()) {
        return;
      }
      // 调取接口

      reqManageEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqManageList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 编辑完成后再打开添加内容还在解决方法
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
  },
  mounted() {
    if (this.lists.length == 0) {
      this.reqListMenu();
    }
  },
};
</script>
<style scoped>
</style>