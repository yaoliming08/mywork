<template>
  <div class="characteristic-finance">
    <div class="characteristic-finance-top-bg">
      <h3>金融助力实现中国式现代化</h3>
      <p>
        Finance is helping to achieve Chinese-style modernization
      </p>
    </div>
    <div class="supermarket-box layout-center-box">
      <cardList />
    </div>
    <bottom/>
  </div>
</template>

<script setup>
import cardList from "./components/card.list.vue";
import bottom from '@/components/bottom.vue'
</script>

<style lang="scss" scoped>
.characteristic-finance {
  position: relative;
  padding-top: 200px;
  background: #f7f7f7;
  min-height: 100vh;
  .characteristic-finance-top-bg {
    height: 350px;
    width: 100%;
    background-image: url("@/assets/img/bg/jr-bg2.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    text-align: center;
    font-family: PingFang SC;
    color: #f7f7f7;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    padding-top: 20px;

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
