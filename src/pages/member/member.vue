<template>
  <div>
    <v-add :info="info" ref="add"></v-add>
    <v-list @hide="change"></v-list>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  props: [],
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        // add显示与隐藏控制
        isShow: false,
        //添加还是编辑的状态 true添加 ，false 编辑
        isAdd: true,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    // 点击添加弹框
    changeShow() {
      this.info.isShow = !this.info.isShow;
      // 点击为true为添加名称
      this.info.isAdd = true;
    },
    // 点击编辑弹出add页面
    change(id) {
      this.info.isShow = true;
      // 点击为false为编辑名称
      this.info.isAdd = false;
      // 编辑显示当前编辑的信息
      this.$refs.add.look(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
.add {
  margin-bottom: 5px;
}
</style>