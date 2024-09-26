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

option = {
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["01/01", "01/02", "01/03", "01/04", "01/05", "01/06", "01/07"],
  },
  yAxis: {
    type: "value",
    boundaryGap: false,
    data: ["500万", "1000万", "1500万", "2000万", "2500万", "3000万"],
    splitLine: {
      show: false
    }
  },
  series: [
    {
      data: [720, 832, 701, 934, 890, 1130, 920],
      type: "line",

      areaStyle: {
        emphasis: false,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#8831E8",
                },
                {
                  offset: 0.55,
                  color: "#5C3198",
                },
                {
                  offset: 0.9,
                  color: "rgba(92,49,152,0.4)",
                },
              ]),
      },
      itemStyle: {

        color:'#8831E8'
      },
    },
    {
      data: [620, 632, 461, 534, 390, 930, 1000],
      type: "line",
      emphasis: false,
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
      itemStyle: {
        color:'#36EBFD'
      },
    },
  ],
};

onMounted(() => {
  myChart = echarts.init(lineRef.value);
  myChart.setOption(option);
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
