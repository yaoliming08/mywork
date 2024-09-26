<template>
  <div class="big-screen">
    <div class="top-echarts-box">
      <div class="big-screen-top">梅州智能金融数据中心平台</div>

      <div class="map-box">
        <div class="map-box-left">
          <div class="map-box-left-title">服务累计数据总量</div>
          <mzLine class="mz-line" ref="mzLineRef" />
        </div>
        <mzMap class="mz-map"  @setData="getData"/>
        <div class="map-box-right">
            <mzCake2 ref="mzCakeRef"/>
        </div>
      </div>
    </div>
    <div class="big-screen-bottom-box">
      <div class="big-screen-top">基于AI人工智能服务于金融群体</div>
      <div class="big-screen-bottom-box-data">
        <div class="big-screen-bottom-box-left">


           <mzCake class="mz-cake"/>
        </div>
        <!-- <div class="big-screen-bottom-box-center">
          <img src="@/assets/img/img/demo-big.png" alt="" />
        </div> -->
        <div class="big-screen-bottom-box-right">
            <img src="@/assets/img/img/demo-big.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import mzMap from "@/components/echarts/map/mz-map.vue";
import mzLine from "@/components/echarts/line/mz-line.vue";
import mzCake from '@/components/echarts/cake/mz-cake.vue'
import mzCake2 from '@/components/echarts/cake/mz-cake2.vue'


import { ref } from 'vue'

const mzLineRef = ref(null)
const mzCakeRef = ref(null)




const getData = function(){

  mzLineRef.value.setData()
  mzCakeRef.value.setData()
  console.log('父组件事件触发', )
}


</script>

<style lang="scss" scoped>
.big-screen {
  color: #ffffff;

  .big-screen-top {
    text-align: center;
    color: #ffffff;
    line-height: 50px;
    font-size: 40px;
    padding-top: 30px;
    font-family: PingFang SC;
    font-weight: 600;
  }
  .top-echarts-box {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-image: url("@/assets/img/bg/demo-bg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .map-box {
    flex: 1;
    display: flex;
    .map-box-left {
      width: 30%;
      height: 100%;
      .map-box-left-title {
        text-align: center;
        font-size: 30px;
        font-family: PingFang SC;
        padding-top: 10px;
        margin-bottom: 20px;
        margin-left: 50px;
      }
      img {
        width: 100%;
      }

      .mz-line {
        width: 100%;
        height: 80%;
      }
    }

    .map-box-right {
      width: 30%;
      height: 100%;
      .mz-cake2{
        width: 100%;
        height: 100%;
      }
    }

    .mz-map {
      flex: 1;
      // background-color: #2e82ff;
    }
  }

  .big-screen-bottom-box {
    height: 100vh;
    background-image: url("@/assets/img/bg/demo-bg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;

    .big-screen-bottom-box-data {
      display: flex;
      justify-content: space-between;
      flex: 1;
    }
    .big-screen-bottom-box-center {
      display: flex;
      align-items: center;
      img {
        width: 400px;
        margin-bottom: 100px;
      }
    }

    .big-screen-bottom-box-left{
        width: 50%;
        .mz-cake{
            height: 100%;
            width: 100%;
        }
    }

    .big-screen-bottom-box-right{
        width: 50%;
        // display: flex;
        img{
            width: 90%;
            margin-top: 80px;
        }
    }
  }
}
</style>
