<template>
  <div class="bottom">
    <div class="bottom-box">
      <img src="@/assets/portal/icon/icon.png" class="bottom-box-img" alt="" />
      <div class="page-bottom-bottom" style="color: #cdcdcd">
        <p>佛山数字投资有限公司</p>
        <p>地址：佛山市南海区桂城街道灯湖东路1号友邦金融中心二座32楼</p>
        <p>电话：0757-83995186</p>
        <p>邮箱：fsjk@fs-financial.com</p>
      </div>
    </div>
    <p style="margin-top: 30px; text-align: center; color: #999999">
      Copyright © 2024 佛山数字投资有限公司　<span>粤ICP备17060142号 </span>
    </p>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.bottom {
  color: #ffff;
  margin-top: 30px;
  width: 100%;

  background-color: #31393c;
  padding-bottom: 20px;

  .bottom-box {
    display: flex;
    justify-content: space-between;
    padding: 0 12% 0 10%;
    .bottom-box-img {
      width: 500px;
      height: 95px;
      margin-top: 50px;
      margin-left: 40px;
    }
  }
  .page-bottom-bottom {
    background-color: #31393c;
    padding-top: 20px;
    line-height: 26px;
    font-size: 18px;
    margin-left: 300px;
    margin-top: 20px;
    span {
      color: #6190e8;
    }
  }
}
</style>
