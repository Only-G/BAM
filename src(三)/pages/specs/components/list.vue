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
      <el-table-column prop="id" label="规格编号"> </el-table-column>
      <el-table-column prop="specsname" label="规格名称"> </el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item">{{
            item
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态">
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
import { reqSpecsDelete } from "../../../utils/api";
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
      lists: "specs/lists",
      size: "specs/size",
      total: "specs/total",
    }),
  },
  methods: {
    ...mapActions({
      reqListMenu: "specs/reqListMenu",
      // 获取总页码
      reqTotalAction: "specs/reqTotalAction",
      // 修改页码总数
      reqTotalAction: "specs/reqTotalAction",
      // 修改当前页页码
      changePageAcion: "specs/changePageAcion",
    }),
    // 删除事件
    del(id) {
      // 调取删除接口
      reqSpecsDelete(id).then((res) => {
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
    editor(id) {
      // 子传父----自定义事件
      this.$emit("hide", id);
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
.el-tag {
  margin-left: 5px;
}
</style>