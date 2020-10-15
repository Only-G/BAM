<template>
  <div>
    <el-table
      :data="lists"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标" sortable width="180">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="地址"> </el-table-column>
      <el-table-column prop="type" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="primary" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="editor(scope.row.id)"
            >编辑</el-button
          >
          <!-- <el-button type="danger" @click="del(scope.row.id)">删除</el-button> -->
          <!-- 调取公共删除按钮 -->
          <deltes @hDele="del(scope.row.id)"></deltes>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqMenuDelete } from "../../../utils/api";
// 引进弹框
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
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
    // 删除事件
    del(id) {
      // 调取删除接口
      reqMenuDelete(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 再次渲染列表
          this.reqListMenu();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // del(id) {
    //   // 调取一个弹框
    //   this.$confirm("你确定要删除吗?", "删除提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       // 调取删除接口
    //       reqMenuDelete(id).then((res) => {
    //         if (res.data.code == 200) {
    //           successAlert(res.data.msg);
    //           // 再次渲染列表
    //           this.reqListMenu();
    //         } else {
    //           warningAlert(res.data.msg);
    //         }
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除",
    //       });
    //     });
    // },
    // 编辑
    editor(id) {
      // 子传父----自定义事件
      this.$emit("hide", id);
    },
  },
  mounted() {
    this.reqListMenu();
  },
};
</script>
<style scoped>
</style>