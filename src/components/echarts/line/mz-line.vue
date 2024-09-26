<template>
  <div class="mz-line">
    <div class="mz-line-box" ref="lineRef"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
import { getRandomNumber } from "@/utils/mz";

const lineRef = ref(null);
let myChart;

let data1 = [];
for (let i = 0; i < 7; i++) {
  data1.push([Math.floor(Math.random() * 1000), String.fromCodePoint(65 + i)]);
}

data1.sort(function (a, b) {
  return b[0] - a[0];
});

let option = {
  title: {
    // text: "动态追加数据的柱图",
  },
  xAxis: {
    // type: 'time',
    splitLine: {
      show: false
    }
  },

  legend: {
    left: 50,
  },

  grid: {
    top: "0",
    left: "1%",
    right: "5%",
    bottom: "0",
    containLabel: true,
  },

  yAxis: {
    type: "category",
    data: [
      "事业单位",
      "小微企业",
      "农户",
      "基金会",
      "社会团体",
      "群团",
      "民办非企业单位",
      "机关",
      "个体工商户",
      "企业",
    ],

  },
  series: [
    {
      type: "bar",
      label: {
        show: true,
        position: "right",
      },
      data: [80, 300, 200, 150, 280, 70, 110, 130, 89, 420],
      //   barWidth: 10, // 设置柱状图宽度
      itemStyle: {
        color: "#2e82ff", // 设置柱状图颜色为红色
      },
    },
  ],
};

const setData = function () {
  console.log("line页面参数");

  let list = [];

  for (let i = 0; i < 10; i++) {
    let num = getRandomNumber(1, 100);

    list.push(num);
    console.log(num, 4444);
  }

  option.series[0].data = list

  myChart.setOption(option);
};

onMounted(() => {
  myChart = echarts.init(lineRef.value);
  myChart.setOption(option);
  //   setInterval(function () {
  //     console.log(data1.length,1111)
  //     if (data1.length === 0) {
  //       return clearInterval(interval);
  //     }
  //     option.series[0].data.push(data1.pop());
  //     myChart.setOption(option);
  //   }, 1000);
});

defineExpose({ setData });
</script>

<style lang="scss" scoped>
.mz-line {
  .mz-line-box {
    width: 100%;
    height: 100%;
  }
}
</style>
