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
      <el-table-column prop="id" label="分类编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img
            v-if="scope.row.pid != 0"
            :src="$imgPre + scope.row.img"
            alt=""
          />
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
import { reqCateDelete } from "../../../utils/api";
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
      lists: "cate/lists",
    }),
  },
  methods: {
    ...mapActions({
      reqListMenu: "cate/reqListMenu",
    }),
    // 删除事件
    del(id) {
      // 调取删除接口
      reqCateDelete(id).then((res) => {
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
img {
  width: 110px;
  height: 100px;
}
</style>