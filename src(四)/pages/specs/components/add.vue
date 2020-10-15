<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加商品规格' : '编辑商品规格'"
      :visible.sync="info.isShow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          v-for="(item, index) in arr"
          :key="index"
        >
          <div class="con">
            <div class="inp">
              <el-input v-model="item.v"></el-input>
            </div>
            <el-button type="primary" v-if="index == 0" @click="addSpecs"
              >新增规格属性</el-button
            >
            <el-button type="danger" v-else @click="delSpecs(index)"
              >删除</el-button
            >
          </div>
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
import { reqSpecsAdd, reqSpecsInfo, reqSpecsEdit } from "../../../utils/api";
import { indexRoutes } from "../../../router/index";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      // 规格属性的数组
      arr: [{ v: "" }, { v: "" }],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqListMenu: "specs/reqListMenu",
      // 总数
      reqTotalAction: "specs/reqTotalAction",
    }),
    // 判断
    checkedData() {
      // 判断规格名称
      if (this.form.specsname == "") {
        warningAlert("规格名称不能为空");
        return false;
      }
      // 判断规格属性
      if (this.arr.some((item) => item.v == "")) {
        warningAlert("规格属性不能为空");
        return false;
      }
      return true;
    },
    // 取消事件
    cancel() {
      this.info.isShow = false;
    },
    // 重置事件
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.arr = [{ v: "" }, { v: "" }];
    },
    // 添加事件
    menuAdd() {
      // 判断填入的内容
      if (!this.checkedData()) {
        return;
      }
      // 转换 [{value:'s'},{value:'l'},{value:'xl'}]  ---map-->['s','l','xl']
      this.form.attrs = JSON.stringify(this.arr.map((item) => item.v));
      reqSpecsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          // 成功
          successAlert(res.data.msg);
          // 清空表单
          this.empty();
          // form表单取消事件
          this.cancel();
          // list数据刷新
          this.reqListMenu();
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
    look(id) {
      reqSpecsInfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list[0];
          // 将字符串转换为数组
          this.arr = JSON.parse(this.form.attrs).map((item) => ({ v: item }));
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改事件
    editors() {
      // 判断填入的内容
      if (!this.checkedData()) {
        return;
      }
      this.form.attrs = JSON.stringify(this.arr.map((item) => item.v));
      // 调取接口
      reqSpecsEdit(this.form).then((res) => {
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
    // 新增规格属性
    addSpecs() {
      this.arr.push({ v: "" });
    },
    // 删除规格属性
    delSpecs(index) {
      this.arr.splice(index, 1);
    },
  },
  mounted() {
    if (this.reqListMenu.length == 0) {
      this.reqListMenu();
    }
  },
};
</script>
<style scoped>
.con {
  display: flex;
}
.inp {
  flex: 1;
}
</style>