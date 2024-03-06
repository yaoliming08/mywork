<template>
  <div class="voice-input" @touchstart.stop="gotouchstart" @touchmove.stop="gotouchmove" @touchcancel.stop="gotouchend" @touchend.stop="gotouchend">按住 说话</div>

  <section v-show="showVoiceMaskFlag" class="voice-mask-wrap">
    <div class="voice-img-wrap">
      <canvas type="2d" id="waveCanvas" class="waveCanvas"></canvas>
    </div>
    <div class="text-wrap">
      <p></p>
    </div>
    <div class="close-wrap">
      <u-icon name="close" class="icon-close-item"></u-icon>
      <i class="icon icon-cross"></i>
      <div class="icon-clear icon-clear-wrap an-x" :class="{ 'active-voice-close': cancelFlag }" />
    </div>
    <div class="release-wrap an-x" :class="{ 'active-voice-record': !cancelFlag }">松开 发送</div>
  </section>
</template>
<script lang="ts" setup>
import SiriWave from '@/modules/input/wave'
import { onReady } from '@dcloudio/uni-app'
import { nextTick, onMounted, ref, type Ref, watch, watchEffect } from 'vue'
// import { } from '@dcloudio/uni-app'
import { useRecord } from './use-record'
const emit = defineEmits(['speak'])

let voicePlugin: SiriWave
const { startRecord, stopRecord } = useRecord()

onReady(() => {
  initCanvas()
})

const initCanvas = async () => {
  voicePlugin = new SiriWave({ width: 100, height: 55 })
  await voicePlugin.init()
  openVoice()
}
async function openVoice() {
  if (!voicePlugin) {
    return
  }
  voicePlugin.setSpeed(0.15)
  voicePlugin.setNoise(0.35)
  voicePlugin.start()
}

const showVoiceMaskFlag = ref(false)

function setVol(vol: number) {
  voicePlugin && voicePlugin.setNoise(vol)
}
function closeVoice() {
  voicePlugin && voicePlugin.stop()
}

let startTime = 0
// let endTime = 0
let timeoutHandle = 0
let y = 0

const cancelFlag = ref(false)

function gotouchstart(e: TouchEvent) {
  e.preventDefault()
  let touch = e.touches[0]
  y = Number(touch.pageY)
  startTime = Date.now()
  showVoiceMaskFlag.value = true
  cancelFlag.value = false
  startRecord(res => {
    clearRecord()
    emit('speak', res)
  })
  // let timeoutHandle = setTimeout(async () => {
  //   timeoutHandle = null
  //   await startRecord(async result => {
  //     if (navigator.vibrate) navigator.vibrate(100)
  //     clearRecord()
  //     emit('speak', result)
  //   })
  //   //调用震动
  //   if (navigator.vibrate) navigator.vibrate(30)
  // }, 100)
}
let windowHeight = uni.getSystemInfoSync().windowHeight

async function gotouchend() {
  // debugger
  clearTimeout(timeoutHandle)
  let endTime = new Date().getTime()
  showVoiceMaskFlag.value = false
  cancelFlag.value = false
  if (endTime - startTime < 500) {
    cancelFlag.value = true
    uni.showToast({
      title: '说话时间太短',
      position: 'bottom',
      //提示的显示时间可以短一点
      duration: 500,
    })
  }

  let bottomHeight = 130
  if (y < windowHeight - bottomHeight - 20) {
    cancelFlag.value = true
    console.log('位置太高了', windowHeight, y)
  }
  if (cancelFlag.value != true) {
    let res = await stopRecord()

    emit('speak', res)
  } else {
    await stopRecord()
  }
  clearRecord()
}

function gotouchmove(e: TouchEvent) {
  let touch = e.touches[0]
  y = Number(touch.pageY)

  let bottomHeight = 130
  if (y < windowHeight - bottomHeight - 20) {
    cancelFlag.value = true
  } else {
    cancelFlag.value = false
  }
}
function clearRecord() {
  showVoiceMaskFlag.value = false
  cancelFlag.value = false
  startTime = 0
}
</script>
<style lang="scss">
.an-x {
  transition: all 0.3s;
}

.voice-mask-wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(254, 254, 254, 0.9);
  text-align: center;

  .icon-clear {
    position: absolute;
    left: 0;
    top: 0;
    color: #ccc !important;
  }

  .voice-img-wrap {
    width: 580rpx;
    height: 110rpx;
    margin: 22% auto 3% auto;
  }

  .release-wrap {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    background: #eee;
    color: #333;
    border-radius: 50% 50% 0 0/10% 10% 0 0;
    height: 260rpx;
    font-size: 28rpx;
    padding-top: 40rpx;

    &.min {
      height: 220rpx; //iosX上因为安全区的问题 高度要稍微高一点
    }
  }

  .active-voice-close {
    background: red !important;
    transform: scale(1.8);
  }

  .active-voice-record {
    background: #e6eeff;
    transform: scale(1.2);
  }
}

.close-wrap {
  border-radius: 50%;
  width: 120rpx;
  height: 120rpx;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 50%;
}

.wave-gif {
  width: 95%;
  height: 110rpx;
  margin: 0 auto;
}

.icon-clear-wrap {
  background: #ccc;
  border-radius: 50%;
  width: 120rpx;
  height: 120rpx;
  position: absolute;
  z-index: 0;
  left: 60rpx;
}

.icon-close-item {
  position: absolute !important;
  z-index: 999 !important;
  color: #fff !important;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  font-size: 46rpx;
}
</style>
