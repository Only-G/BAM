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
      <el-table-column prop="id" label="商品编号"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>

      <el-table-column label="图片">
        <template slot-scope="scope">
          <img
            v-if="scope.row.pid != 0"
            :src="$imgPre + scope.row.img"
            alt=""
          />
        </template>
      </el-table-column>

      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary">是</el-button>
          <el-button v-else type="danger">否</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="type" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="primary" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" sortable width="180">
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
import { reqGoodsDelete } from "../../../utils/api";
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
      lists: "goods/lists",
      size: "goods/size",
      total: "goods/total",
    }),
  },
  methods: {
    ...mapActions({
      reqListMenu: "goods/reqListMenu",
      // 获取总页码
      reqTotalAction: "goods/reqTotalAction",
      // 修改页码总数
      reqTotalAction: "goods/reqTotalAction",
      // 修改当前页页码
      changePageAcion: "goods/changePageAcion",
    }),
    // 删除事件
    del(id) {
      // 调取删除接口
      reqGoodsDelete(id).then((res) => {
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
img {
  width: 50px;
  height: 50px;
}
</style>