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
      <el-table-column prop="id" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="180">
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
          <el-button type="primary" @click="editor(scope.row.uid)"
            >编辑</el-button
          >
          <!-- <el-button type="danger" @click="del(scope.row.id)">删除</el-button> -->
          <!-- 调取公共删除按钮 -->
          <deltes @hDele="del(scope.row.uid)"></deltes>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePageAcion"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqManageDelete } from "../../../utils/api";
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
      lists: "manage/lists",
      size: "manage/size",
      total: "manage/total",
    }),
  },
  methods: {
    ...mapActions({
      reqListMenu: "manage/reqListMenu",
      // 获取总页码
      reqTotalAction: "manage/reqTotalAction",
      // 修改页码总数
      reqTotalAction: "manage/reqTotalAction",
      // 修改当前页页码
      changePageAcion: "manage/changePageAcion",
    }),
    // 删除事件
    del(uid) {
      // 调取删除接口
      reqManageDelete(uid).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 再次渲染列表
          this.reqListMenu();
          // 页总数更新
          this.reqTotalAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    // 编辑
    editor(uid) {
      // 子传父----自定义事件
      this.$emit("hide", uid);
    },
    // changePage(e) {
    //   this.changePageAcion(e);
    // },
  },
  mounted() {
    this.reqListMenu();
    // 调取总页码
    this.reqTotalAction();
  },
};
</script>
<style scoped>
</style>