<template>
  <view class="login-box">
    <view class="login-box-hed">
      <image class="login-bg-hed" mode="widthFix" src="@/assets/img/bg1.png" />
      <image class="login-icon-hed" mode="widthFix" src="@/assets/img/icon1.png" />
      <view class="login-box-text">
        <text class="top-title">AI-RISKP</text>
        <text class="top-text">个人智能税收评估</text>
      </view>
    </view>



    <view class="login-box-bottom">

      <view class="bottom-line">
        <image class="img" mode="widthFix" src="@/assets/img/icon2.png" />

        <u-input v-model="dataObj.model1.userInfo.useName" placeholder="请输入用户名" border="none" placeholderStyle="font-size: 12rpx"></u-input>
      </view>


      <view class="bottom-line">
        <image class="img" mode="widthFix" src="@/assets/img/icon3.png" />

        <u-input v-model="dataObj.model1.userInfo.useName" placeholder="请输入密码" border="none"></u-input>

      </view>





    </view>

  </view>

</template>

<script setup lang="ts">

import { reactive } from 'vue'

const dataObj = reactive({
  id: 111111,
  showSex: false,
  model1: {
    userInfo: {
      useName: '',
      passWord: '',
    },
  },
  rules: {}
})

</script>

<style lang="scss" scoped>
.login-box {
  .login-box-hed {
    width: 750rpx;
    height: 455rpx;
    position: relative;

    .login-bg-hed {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;

    }

    .login-icon-hed {
      position: absolute;
      z-index: 2;
      width: 130rpx;
      height: 130rpx;
      left: calc(50% - 65rpx);
      top: calc(50% - 35rpx);

    }

    .login-box-text {
      position: absolute;
      z-index: 3;
      width: 100%;
      height: 100%;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;

      .top-title {
        font-size: 60rpx;
        font-family: PangMenZhengDaoBiaoTiTiMianFeiBan-4;
        font-weight: 400;
      }

      .top-text {
        color: #888888;
        font-size: 28rpx;
      }
    }

  }


  .login-box-bottom{
    padding: 80rpx 36rpx 30rpx;
    .bottom-line{
      display: flex;
      align-items: center;
      border-bottom: 1px solid #E0E0E0;
      padding-bottom: 20rpx;
      padding-top: 25rpx;
      .img{
        width: 34rpx;
        height: 34rpx;
        margin-right: 20rpx;
      }
    }

  }
}
</style>