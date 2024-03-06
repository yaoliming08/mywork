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

    <!-- <view>
      <u-form labelPosition="left" :model="dataObj.model1" :rules="dataObj.rules" ref="form1">
        <u-form-item label="姓名" prop="userInfo.name" borderBottom ref="item1">
          <u-input v-model="dataObj.model1.userInfo.name" border="none"></u-input>
        </u-form-item>
      </u-form>
    </view> -->

  </view>

</template>

<script setup lang="ts">




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
    .login-box-text{
      position: absolute;
      z-index: 3;
      width: 100%;
      height: 100%;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      .top-title{
        font-size: 60rpx;
        font-family: PangMenZhengDaoBiaoTiTiMianFeiBan-4;
font-weight: 400;
      }
      .top-text{
        color: #888888;
        font-size: 28rpx;
      }
    }

  }
}
</style>