<template>
  <div class="pic2-echarts">
    <div ref="picRef3"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";

// const props = defineProps({
//   picObj: {
//     type: Object,
//     required: true,
//   },
// });

let option;

let myChart;

option = {
  title: {
    x: "center",
    y: "center",
    textStyle: {
      fontSize: 20,
    },
  },
  tooltip: {
    trigger: "item",
  },
  color: [
    "#58b2ff",
    "#68d4b2",
    "#7380ff",
    "#fdd56a",
    "#fdb36a",
    "#fd866a",
    "#9e87ff",
  ],
  series: [
    {
      type: "pie",
      center: ["50%", "50%"],
      radius: ["70%", "55%"],
      clockwise: true,
      avoidLabelOverlap: true,
      hoverOffset: 15,
      itemStyle: {
        normal: {},
      },
      label: {
        show: true,
        position: "outside",
        formatter: "{a|{b}：{d}%}\n{hr|}",
        rich: {
          a: {
            padding: [0, 0, -10, 0],
          },
        },
      },
      labelLine: {
        normal: {
          length: 20,
          length2: 30,
          lineStyle: {
            width: 1,
          },
        },
      },
      data: [
        {
          name: "城市个人用户",
          value: 1.45,
        },
        {
          name: "中型企业",
          value: 2.93,
        },
        {
          name: "小微企业",
          value: 3.15,
        },
        {
          name: "其他",
          value: 4.78,
        },
        {
          name: "农业户口",
          value: 5.93,
        },
      ],
    },
  ],
};

const picRef3 = ref(null);

onMounted(() => {
  myChart = echarts.init(picRef3.value);
  myChart.setOption(option);
});
</script>

<style lang="scss" scoped>
.pic2-echarts {
  & > div {
    height: 100%;
    width: 100%;
  }
}
</style>
