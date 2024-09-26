<template>
  <div class="data-screen">
    <div class="data-screen-top">金融授信大数据展示平台</div>
    <div class="data-box">
      <div class="data-box-top">
        <picEcharts
          v-for="(item, index) in picData"
          :key="index"
          :picObj="item"
        />
      </div>

      <div class="data-box-bottom">
        <div class="data-box-bottom-left">
            <pic2Echarts class="line-chart"/>
            <lineEcharts class="line-chart"/>
            <columnarEcharts class="line-chart"/>
            <lineEcharts2 class="line-chart"/>
        </div>
        <div class="data-box-bottom-right">
          <dataList/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import picEcharts from "./components/pic-echarts.vue";
import pic2Echarts from "./components/pic2-echarts.vue";
import lineEcharts from "./components/line-echarts.vue";
import lineEcharts2 from "./components/line-echarts2.vue";
import columnarEcharts from "./components/columnar-echarts.vue";
import dataList from "./components/data-list.vue";
import { picData } from "./data.js";

import { ref } from "vue";

const mzLineRef = ref(null);
const mzCakeRef = ref(null);


const getData = function () {
  mzLineRef.value.setData();
  mzCakeRef.value.setData();
  console.log("父组件事件触发");
};
</script>

<style lang="scss" scoped>
.data-screen {
  color: #ffffff;
  background-color: #24283c;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .data-screen-top {
    text-align: center;
    color: #36ebfd;
    line-height: 80px;
    font-size: 38px;
    font-family: PingFang SC;
    font-weight: 400;
  }

  .data-box {
    box-sizing: border-box;
    padding: 0 20px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    flex: 1;

    .data-box-top {
      display: flex;
      height: 120px;
      overflow: hidden;
      & > div {
        flex: 1;
        margin-right: 10px;
        &:last-child{
          margin-right: 0;
        }
      }
    }

    .data-box-bottom{
      display: flex;
      height: calc(100vh - 200px);
      .data-box-bottom-left{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        .line-chart{
          width: 50%;
          height: 50%;
          overflow: hidden;
        }
      }

      .data-box-bottom-right{
        width: 40%;
        height: 100%;
        overflow: hidden;
      }


    }
  }
}
</style>
