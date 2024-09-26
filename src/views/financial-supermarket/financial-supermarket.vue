<template>
  <div class="financial-supermarket">
    <div class="financial-supermarket-top-bg">
      <h3>整合金融优质资源，拓宽企业融资途径</h3>
      <p>
        INTEGRATE HIGH-QUALITY FINANCIAL RESOURCES AND BROADEN ENTERPRISE
        FINANCING CHANNELS
      </p>
    </div>
    <div class="supermarket-box layout-center-box">
      <cardList />
      <dataList/>

    </div>
    <bottom/>
  </div>
</template>

<script setup>
import cardList from "./components/card.list.vue";
import dataList from '@/components/data-list.vue'
import bottom from '@/components/bottom.vue'

</script>

<style lang="scss" scoped>
.financial-supermarket {
  position: relative;
  padding-top: 250px;
  background: #f7f7f7;
  min-height: 100vh;
  .financial-supermarket-top-bg {
    height: 350px;
    width: 100%;
    background-image: url("@/assets/img/bg/jr-bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    text-align: center;
    font-family: PingFang SC;
    color: #f7f7f7;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    padding-top: 90px;

    h3 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 10px;
    }
  }

  .supermarket-box {
    position: relative;
    z-index: 20;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
  }
}
</style>
