<template>
  <div class="top-bg">
    <img src="@/assets/img/bg/financing-institution-bg.png" alt="" />
    <div class="default-bg-title">
      <p>全方位<span>享受扶持政策</span></p>
      <p>一站式<span>获得金融服务</span></p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.top-bg {
  position: relative;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
  }
  .default-bg-title {
    position: absolute;
    top: 35%;
    left: 0;
    right: 0;
    // font-weight: 700;
    display: flex;
    justify-content: center;
    p {
      margin-right: 30px;
      font-size: 30px;
      font-family: "Courier New", Courier, monospace; /* Courier New、等宽字体 */
      font-weight: 600;

      span {
        font-size: 45px;
      }
    }
  }
}
</style>
