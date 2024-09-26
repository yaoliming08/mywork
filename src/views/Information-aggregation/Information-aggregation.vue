<template>
  <div class="Information-aggregation">
    <div class="top-echarts-box">
      <div class="Information-top">梅州智能金融数据中心平台</div>

      <div class="map-box">
        <div class="map-box-left">
          <div class="map-box-left-title">
            服务累计数据总量
          </div>
          <mzLine class="mz-line"/>
        </div>
        <mzMap class="mz-map" />
        <div class="map-box-right"></div>
      </div>
    </div>
    <div class="Information-bottom-box">
      <img src="@/assets/img/img/demo-big.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import mzMap from "@/components/echarts/map/mz-map.vue";
import mzLine from "@/components/echarts/line/mz-line.vue";
</script>

<style lang="scss" scoped>
.Information-aggregation {
  color: #ffffff;
  .top-echarts-box {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-image: url("@/assets/img/bg/demo-bg.jpg");
  }

  .Information-top {
    text-align: center;
    color: #ffffff;
    line-height: 50px;
    font-size: 40px;
    padding-top: 30px;
    font-family: PingFang SC;
    font-weight: 600;
  }
  .map-box {
    flex: 1;
    display: flex;
    .map-box-left {
      width: 30%;
      height: 100%;
      .map-box-left-title{
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

      .mz-line{
        width: 100%;
        height: 80%;
      }
    }

    .map-box-right {
      width: 30%;
      height: 100%;
    }

    .mz-map {
      flex: 1;
      // background-color: #2e82ff;
    }
  }

  .Information-bottom-box {
    height: 900px;
    margin-top: 50px;
    text-align: center;
  }
}
</style>
