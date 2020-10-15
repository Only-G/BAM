<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加角色' : '编辑菜单'"
      :visible.sync="info.isShow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>

        <el-form-item label="角色权限">
          <el-tree
            ref="tree"
            :data="Menulists"
            show-checkbox
            node-key="id"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
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
import { reqRoleAdd, reqRoleInfo, reqRoleEdit } from "../../../utils/api";
import { indexRoutes } from "../../../router/index";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: [],
        status: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      Menulists: "menu/lists",
    }),
  },
  methods: {
    ...mapActions({
      // 菜单列表
      reqListMenu: "menu/reqListMenu",
      // 角色的list
      roleListMenu: "role/reqListMenu",
    }),
    // 取消事件
    cancel() {
      this.info.isShow = false;
    },
    // 重置事件
    empty() {
      this.form = {
        rolename: "",
        menus: [],
        status: "",
      };
      //树形控件清空
      this.$refs.tree.setCheckedKeys([]);
    },
    // 添加事件
    menuAdd() {
      // 将数组转化为字符串
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          // 成功
          successAlert(res.data.msg);
          // 清空表单
          this.empty();
          // form表单取消事件
          this.cancel();
          // list数据刷新
          this.roleListMenu();
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
    look(id) {
      reqRoleInfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          // 获取单独一条数据的时候没有id所以得拿到id
          this.form.id = id;
          // 给树形控件赋值
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改事件
    editors() {
      // 调取接口
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.roleListMenu();
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
    // 如果菜单list没有请求过，就请求一次，请求过了，就不用在请求了
    if (this.Menulists.length == 0) {
      this.reqListMenu();
    }
  },
};
</script>
<style scoped>
</style>