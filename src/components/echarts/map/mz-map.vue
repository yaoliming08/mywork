<template>
  <div class="mz-map">
    <div  ref="chartRef" class="mz-map-box"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import map from "@/stores/map/mz.json";
import * as echarts from "echarts";
import { geoCoordMap } from "@/stores/map/china";
const chartRef = ref(null);

const emit = defineEmits(['setData'])

const domImg = {
  src: new URL("@/assets/img/bg/mz-map.png", import.meta.url),
};

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
  // backgroundColor: "#FFFFFF",  //画布背景色
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
    layoutCenter: ["52%", "50%"],
    layoutSize: "100%",
    label: {
      //默认静态标题
      show: true,
      color: "#87CAEB",
      fontSize: "14px",
      areaColor: "#2e82ff",
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


function initMap(){
  const myChart = echarts.init(chartRef.value);
  echarts.registerMap("mz", { geoJSON: map });
  myChart.setOption(option);


  myChart.on('mouseover', function () {
        // _this.myChart.dispatchAction({
        //   type: 'downplay',
        //   seriesIndex: 0,
        // });
      });
      myChart.on('click', function (params) {
        console.log('点击一次', params)
        emit('setData',{

        })
        // _this.circulationChart()
        // _this.myChart.dispatchAction({  //隐藏弹框
        //   type: 'hideTip',
        // })
        // if( _this.checkId === params.dataIndex){
        //   _this.checkId = null
        //   _this.$emit('getCity', {
        //     areaLevel: 'CITY',
        //     areaName: '海西蒙古族藏族自治州',
        //   });
        // }else{
        //   console.log('触发方法')
        //   _this.$emit('getCity', {
        //     areaLevel: 'DISTRICT',
        //     areaName: params.name,
        //   })
        //   _this.checkId = params.dataIndex
        // }


      });


  
}






onMounted(() => {

  initMap()
});
</script>

<style lang="scss" scoped>
.mz-map {
  .mz-map-box {
    width: 100%;
    height: 100%;
    // background-color: red;
    // background-image: url("@/assets/img/bg/mz-map.png");
    // background-repeat: no-repeat;
    // background-size: 100% 100%;
    // background-color: #1a45ce;
    display: flex;
    align-items: center;
  }
}
</style>
