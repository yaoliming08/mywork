<template>
  <div class="line-echarts">
    <div ref="lineRef"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";

let myChart;
let option;
const lineRef = ref(null);

const initEcharts = function () {
  myChart = echarts.init(lineRef.value);
  myChart.setOption(option);
  console.log(myChart, 22111111);

  myChart.on("mouseover", function (e) {
    // 当检测到鼠标悬停事件，取消默认选中高亮
    console.log(13322234);
    myChart.dispatchAction({
      type: "downplay",
      dataIndex: 0,
    });
  });
};

option = {
  xAxis: {
    type: "category",
    boundaryGap: false,
    show: false,
    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: "value",
    boundaryGap: false,
    show: false,
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      emphasis: false,
      showSymbol: false, //是否展示节点
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#36EBFD",
          },
          {
            offset: 0.55,
            color: "#306376",
          },
          {
            offset: 0.9,
            color: "#2E3549",
          },
        ]),
      },

      lineStyle: {
        width: 2,
        color: "#36EBFD",
      },
      itemStyle: {},
    },
  ],
};

onMounted(() => {
  initEcharts()
});
</script>

<style lang="scss" scoped>
.line-echarts {
  & > div {
    width: 100%;
    height: 100%;
  }
}
</style>
