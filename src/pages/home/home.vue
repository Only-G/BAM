<template>
  <div>
    <h1>首页管理</h1>
    <div class="box" id="main"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// 图表运用
import echarts from "echarts";
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
      reqCateList: "cate/reqListMenu",
    }),
  },
  // 监听数据变化
  watch: {
    lists: {
      handler() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById("main"));

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: "数据",
          },
          tooltip: {},
          legend: {
            data: ["商品分类"],
          },
          xAxis: {
            // 遍历分类列表名称
            data: this.lists.map((item) => item.catename),
          },
          yAxis: {},
          series: [
            {
              name: "下级分类数量",
              type: "line",
              data: this.lists.map((item) => item.children.length),
            },
          ],
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      deep: true,
    },
  },
  mounted() {
    // 页面一加载调用数据
    this.reqCateList();
  },
};
</script>
<style scoped>
.box {
  width: 80%;
  height: 400px;
  margin: 10px auto;
  border: 1px solid #cccccc;
}
</style>