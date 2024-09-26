<template>
  <div class="mz-map">
    <div
      v-bind:id="chartRef"
      ref="chartRef"
      class="mz-map-box"
      style="width: 100%"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import map from "@/stores/map/mz.json";
import * as echarts from "echarts";
import { geoCoordMap } from "@/stores/map/china";
const chartRef = ref(null);

const domImg = {
  src : new URL("@/assets/img/bg/mz-map.png", import.meta.url),
}







let option = {};
let series = [
  {
    itemStyle: {
      normal: {
        areaColor: "#3075b2",
        borderColor: "#4c99f9",
        borderWidth: 1,
      },
      emphasis: {
        areaColor: "#01215c",
      },
    },
  },
];

option = {
  // backgroundColor: "#2e82ff",  //画布背景色
  backgroundColor: "#FFFFFF",  //画布背景色
  geo: {
    map: "mz",
    label: {
      emphasis: {
        show: true,
      },
    },

    image: domImg, //配置图片
        repeat: "repeat", //可选值r


    roam: false, //是否支持缩放
    layoutCenter: ["50%", "50%"],
    layoutSize: "80%",
    label: {
      //默认静态标题
      show: true,
      color: "#87CAEB",
      fontSize: "14px",
      areaColor: '#2e82ff',  
    },
    select: {
      //鼠标选中省份后的颜色
      label: {
        color: "#ffff",
      },
      itemStyle: {
        areaColor: "#01C0FE",
        borderColor: "#081D71",
        borderWidth: "3",
      },
    },
    emphasis: {
      //鼠标移入操作
      label: {
        show: true,
        fontSize: "14px",
        color: "#ffff",
      },
      itemStyle: {
        areaColor: "#01C0FE", //鼠标移入地图背景色
        borderWidth: 3,
        borderColor: "#081E71",
        shadowColor: "#081E71",
        shadowBlur: 30,
      },
    },
    itemStyle: {
      //基础样式
      borderColor: "#081D71", //默认边框颜色
      borderWidth: 1.0, //默认边框宽度
      areaColor: "#2466D9", //默认背景色
    },
  },
  series: series,
};

onMounted(() => {
  const myChart = echarts.init(chartRef.value);
  echarts.registerMap("mz", { geoJSON: map });
  myChart.setOption(option);
});
</script>

<style lang="scss" scoped>
.Information-aggregation {
  .mz-map-box {
    width: 100%;
    height: 100%;
    background-color: #2e82ff;

    


  }
}
</style>

