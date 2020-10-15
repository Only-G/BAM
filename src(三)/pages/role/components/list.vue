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
      <el-table-column prop="id" label="角色编号" sortable width="180">
      </el-table-column>

      <el-table-column prop="rolename" label="角色名称" sortable width="180">
      </el-table-column>

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
import { reqRoleDelete } from "../../../utils/api";
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
      lists: "role/lists",
    }),
  },
  methods: {
    ...mapActions({
      reqListMenu: "role/reqListMenu",
    }),
    // 删除事件
    del(id) {
      // 调取删除接口
      reqRoleDelete(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 再次渲染列表
          this.reqListMenu();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

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