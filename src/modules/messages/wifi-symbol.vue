<template>
  <div :class="className">
    <div class="box">
      <div class="wifi-symbol">
        <div class="wifi-circle first"></div>
        <div class="wifi-circle second"></div>
        <div class="wifi-circle third"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
const props = defineProps({
  className: { type: String, required: true },
})
</script>
<style lang="scss" scoped>
.wifi-symbol-wrap {
  transform: scale(0.6);

  &.stop {
    .wifi-circle {
      animation: none;
    }
  }

  &.white {
    .wifi-circle {
      &.first {
        background: #fff;
      }

      border-color: #fff;
    }
  }

  &.rotate {
    .box {
      transform: rotateY(180deg);
    }
  }
}

.box {
  box-sizing: border-box;
  position: relative;
}

.wifi-symbol {
  width: 50rpx;
  height: 50rpx;
  box-sizing: border-box;
  overflow: hidden;
  transform: rotate(135deg);
}

.wifi-circle {
  border: 6rpx solid #999999;
  border-radius: 50%;
  position: absolute;
}

.first {
  width: 10rpx;
  height: 10rpx;
  background: #cccccc;
  top: 43rpx;
  left: 43rpx;
}

.second {
  width: 40rpx;
  height: 40rpx;
  top: 28rpx;
  left: 28rpx;
  animation: fadeInOutFirst 1s infinite;
}

.third {
  width: 70rpx;
  height: 70rpx;
  top: 10rpx;
  left: 10rpx;
  animation: fadeInOutSecond 1s infinite;
}

@keyframes fadeInOutFirst {
  0% {
    opacity: 0;
    /*初始状态 透明度为0*/
  }

  33% {
    opacity: 0;
    /*初始状态 透明度为0*/
  }

  66% {
    opacity: 1;
    /*初始状态 透明度为0*/
  }

  100% {
    opacity: 1;
    /*结尾状态 透明度为1*/
  }
}

@keyframes fadeInOutSecond {
  0% {
    opacity: 0;
    /*初始状态 透明度为0*/
  }

  50% {
    opacity: 0;
    /*初始状态 透明度为0*/
  }

  100% {
    opacity: 1;
    /*结尾状态 透明度为1*/
  }
}
</style>
