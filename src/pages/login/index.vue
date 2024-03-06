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

      <u-form labelPosition="left" :model="dataObj" :rules="dataObj.rules" ref="loginFrom">


        <u-form-item  borderBottom prop="useName">

          <view class="bottom-line">
            <image class="img" mode="widthFix" src="@/assets/img/icon2.png" />
            <u-input v-model="dataObj.useName" placeholder="请输入用户名" border="none"
              placeholderClass="input-line"></u-input>
          </view>

        </u-form-item>




        <u-form-item prop="passWord" borderBottom>

          <view class="bottom-line">
            <image class="img" mode="widthFix" src="@/assets/img/icon3.png" />

            <u-input v-model="dataObj.passWord" placeholder="请输入密码" border="none"
              placeholderClass="input-line"></u-input>

          </view>

        </u-form-item>



        <view class="bottom-line-btn">
          <u-button text="登录" color="#1D76F6" @click="login"></u-button>
        </view>


      </u-form>


    </view>

    <view class="login-box-deal">
      <text>阅读并同意<text class="deal">《用户协议》</text>&<text class="deal">《隐私条款》</text></text>

    </view>

  </view>

</template>

<script setup lang="ts">

import { reactive, ref } from 'vue'

const loginFrom = ref(null)

const dataObj = reactive({
  id: 111111,
  showSex: false,
  useName: '',
  passWord: '',
  model1: {
    userInfo: {
      useName: '',
      passWord: '',
    },
  },
  rules: {
    'useName': {
      type: 'string',
      required: true,
      message: '请填写用户名',
      trigger: ['blur', 'change']
    },
    'passWord': {
      type: 'string',
      required: true,
      message: '请填写密码',
      trigger: ['blur', 'change']
    }

  }
})


const login = async () => {

  loginFrom.value.validate().then((res:boolean) => {
    console.log('登录挑战页面')

    uni.redirectTo({
          url: `/pages/ai-riskp/index`,
        })

     

	
			}).catch((errors:any) => {
    

			})
		


    }




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


  .login-box-bottom {
    padding: 80rpx 36rpx 30rpx;

    .bottom-line {
      display: flex;
      align-items: center;
      padding-bottom: 20rpx;
      padding-top: 25rpx;

      .img {
        width: 34rpx;
        height: 34rpx;
        margin-right: 28rpx;
      }
    }

  }

  .bottom-line-btn {
    margin-top: 100rpx;
    border-radius: 20rpx;
    overflow: hidden;
  }

  .login-box-deal {
    position: fixed;
    width: 100vw;
    text-align: center;
    bottom: 65rpx;
    font-size: 24rpx;
    color: #666666;

    .deal {
      color: #56AEED;
    }
  }
}
</style>

<style>
.input-line {
  color: #BBBBBB;
  font-size: 26rpx;
}
</style>