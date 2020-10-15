<template>
  <el-button type="danger" @click="del">删除</el-button>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    del() {
      // 调取一个弹框
      this.$confirm("你确定要删除吗?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "el-button el-button--danger",
        type: "warning",
      })
        .then(() => {
          this.$emit("hDele");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>