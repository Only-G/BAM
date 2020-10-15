<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="info.isShow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单">
          <el-select v-model="form.pid" placeholder="请选择" @change="changPid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in lists"
              :key="item.path"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item label="菜单图标" v-if="form.type == 1">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="'/' + item.path"
            ></el-option>
          </el-select>
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
import { reqMenuAdd, reqMenuInfo, reqMenuEdit } from "../../../utils/api";
import { indexRoutes } from "../../../router/index";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      // 采单地址
      indexRoutes: indexRoutes,
      // 菜单图标
      icons: [
        "el-icon-s-tools",
        "el-icon-user",
        "el-icon-camera",
        "el-icon-message-solid",
      ],
    };
  },
  computed: {
    ...mapGetters({
      lists: "menu/lists",
    }),
  },
  methods: {
    ...mapActions({
      reqListMenu: "menu/reqListMenu",
    }),
    // 取消事件
    cancel() {
      this.info.isShow = false;
    },
    // 重置事件
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    // 添加事件
    menuAdd() {
      reqMenuAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          // 成功
          successAlert(res.data.msg);
          // 清空表单
          this.empty();
          // form表单取消事件
          this.cancel();
          // list数据刷新
          this.reqListMenu();
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
      reqMenuInfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          // 获取单独一条数据的时候没有id所以得拿到id
          this.form.id = id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改事件
    editors() {
      // 调取接口

      reqMenuEdit(this.form).then((res) => {
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
    // 编辑完成后再打开添加内容还在解决方法
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>