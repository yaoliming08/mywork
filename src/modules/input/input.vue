<template>
  <div class="app-input">
    <div ref="inputMessageContainer" class="input-group flex-align">
      <template v-if="inputType === 2">
        <i class="icon icon-keyboard" @touchend="changeType()"></i>
        <voice-mask @speak="speak"></voice-mask>
      </template>
      <template v-else>
        <i class="icon icon-voice" @touchend="changeType()"></i>
      
        <input ref="inputMessage" confirm-hold class="uni-input" @focus="focused = true" @blur="focused = false" confirm-type="send" @confirm="sendMsg" placeholder="请输入" v-model="message" />
      </template>
      <div class="icon icon-add" name="add-o" @click="changeMore" />
    </div>
    <div v-if="showMore" class="func-more">
      <div class="item" @click="chooseImg">
        <label class="absolute0 flex-center">
          <u-icon name="photo" size="80"></u-icon>
        </label>
      </div>
      <!-- <div class="item">
        <label class="absolute0 flex-center">
          <input type="file" accept="image/*" class="hidden" capture />
          <Icon name="photograph" />
        </label>
      </div> -->
      <!-- <div class="item">
        <Icon name="phone-o" @click="voicecallOnclick" />
      </div>
      <div class="item">
        <Icon name="contact" @click="videocallOnclick" />
      </div> -->
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// import Footer from './min-app-footer.vue'
import { type Ref, ref } from 'vue'
// import { Toast, Field, Icon } from 'vant'
import VoiceMask from './voice-mask.vue'
import { useTouch } from '@/modules/use-touch'
// import { isIos, isMiniApp, isWechat } from '@/common/util'
import type { RecorderRes } from '@/modules/input/use-record'
import { nextTick } from 'vue'
// import { useImg } from '../../pages/chat/useImg'

// const { choiseImg } = useImg()

enum InputType {
  TEXT = 1,
  VOICE = 2,
}

const changeMore = () => {
  showMore.value = !showMore.value
}

const showMore = ref(false)

const props = defineProps({
  placeholder: { type: String, default: '请输入' },
})

const emit = defineEmits(['input', 'select-img', 'speak', 'voice-call', 'video-call', 'update:img-selecting'])

const inputMessageContainer: Ref<HTMLDivElement> = ref(null)
const inputMessage = ref<{ $el: HTMLDivElement; blur: () => void; focus: () => void }>(null)
// console.log(inputMessage)
// const _isIos = isIos()
// if (_isIos) {
//   useTouch(evt => {
//     // IOS端 ，键盘不会自动收起 -- 加上这个就能自动收起来了
//     if (inputMessage.value && !inputMessageContainer.value.contains(evt.target as Node)) {
//       inputMessage.value.blur()
//     }
//   })
// }

// const canRecord = Boolean(window['MediaRecorder']) || isWechat()

const message = ref('')
// if (import.meta.env.DEV) {
//   message.value = '头疼挂什么科'
// }
// console.log(import.meta.env)
const focused = ref(false)

const inputType = ref(InputType.TEXT)

const sendMsg = () => {
  let msg = message.value
  message.value = ''
  if (msg) {
    emit('input', msg)
  }
}
// function cancelOnclick() {
//   inputMessage.value?.blur()
// }
// function blurInput() {
//   inputMessage.value?.blur()
// }
async function changeType() {
  inputType.value = inputType.value == InputType.TEXT ? InputType.VOICE : InputType.TEXT
  if (inputType.value == InputType.TEXT) {
    // 切换到文字输入的时候，隐藏底下的功能区
    await nextTick()
    inputMessage.value?.focus()
  } else {
    inputMessage.value?.blur()
  }
  showMore.value = false
}

function speak(speakContent: RecorderRes) {
  emit('speak', speakContent)
}

const chooseImg = async () => {
  emit('update:img-selecting', true)
  uni.chooseImage({
    count: 9,
    sizeType: ['original', 'compressed'], // 原图  压缩
    sourceType: ['album', 'camera'],
    success: function (res) {
      emit('update:img-selecting', false)
      // if (res.tempFilePaths.length <= 0) {
      //   return
      // }
      // const fileArr = res.tempFiles as File[]
      // const file = {
      //   url: path,
      // }
      const fileArr =  res.tempFilePaths as []
      console.log(res.tempFilePaths,871111111)
      fileArr.forEach(el => {
        console.log(el,'图片参数')
        emit('select-img', el)
      });
    },
  })
}

function voicecallOnclick() {
  emit('voice-call')
}

function videocallOnclick() {
  emit('video-call')
}

function imgOnchange(evt: Event) {
  let input = evt.target as HTMLInputElement
  if (input.files.length > 0) {
    emit('select-img', input.files[0])
    input.value = ''
  }
}
</script>
<style lang="scss">
.app-input {
  width: 100vw;
  margin-top: auto;
  color: #333;
  background-color: #fff;
  z-index: 111;
  border-top: 1rpx solid #eee;
  position: relative;
  // z-index: 10;
  .func-more {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    min-height: 200rpx;
    overflow: auto;
    box-shadow: 0 0 4rpx 0 rgba(0, 0, 0, 0.5);

    .item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 140rpx;
      height: 140rpx;
      margin: 20rpx;
      font-size: 70rpx;
      border-radius: 10rpx;
      box-shadow: 0 0 6rpx 0 rgba(0, 0, 0, 0.5);

      &:empty {
        height: 0;
        margin: 0 20rpx;
      }
    }
  }

  .icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 70rpx;
    height: 70rpx;
    font-size: 60rpx;
    background-size: 100% 100%;

    &.icon-voice {
      background-image: url('@/assets/img/icon-voice.svg');
    }

    &.icon-keyboard {
      background-image: url('@/assets/img/icon-keyboard.svg');
    }

    &.icon-add {
      display: block;
      background-image: url(@/assets/img/icon-funcs.png);
    }
  }

  .hint-group {
    height: 90rpx;
    padding: 0 18rpx;

    .app-icon {
      flex-shrink: 0;
      width: 36rpx;
      height: 36rpx;
    }
  }

  .input-message {
    font-size: 32rpx;
  }

  .input-group {
    box-sizing: border-box;
    justify-content: space-between;
    width: inherit;
    height: 90rpx;
    padding: 0 20rpx 0 10rpx;

    /* stylelint-disable-next-line scss/selector-no-redundant-nesting-selector */
    & > div {
      height: 70rpx;
      line-height: 70rpx;
      border-radius: 16rpx;
    }

    .voice-input {
      flex-grow: 1;
      font-size: 28rpx;
      font-weight: 400;
      text-align: center;
      border: 1rpx solid rgba(204, 204, 204, 1);

      &:active {
        background-color: #ccc;
      }
    }

    .van-cell.van-field {
      padding-top: 0;
      padding-bottom: 0;
      background-color: rgba(242, 242, 242, 1);

      // input {
      //   color: rgba(179, 179, 179, 1);
      // }
    }

    .icon-add-btn {
      flex-shrink: 0;
      width: 74rpx;
      height: 74rpx;
      // min-width: 90rpx;
    }
  }

  .flex-align {
    display: flex;
    align-items: center;
  }

  .bottom-nav {
    box-sizing: content-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 90rpx;
    background-color: #fff;

    .nav-item {
      .app-icon-small {
        width: 28rpx;
        height: 28rpx;
        margin-right: 8rpx;
      }

      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 196rpx;
      height: 56rpx;
      font-size: 24rpx;
      background: rgba(247, 247, 247, 1) rgba(255, 255, 255, 1);
      border-radius: 28rpx;
      box-shadow: 0 10rpx 10rpx 0 rgba(76, 166, 255, 0.1);

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 392rpx;
        height: 112rpx;
        content: '';
        border: 1rpx solid rgba(230, 230, 230, 1);
        border-radius: 52rpx;
        transform: scale(0.5);
        transform-origin: top left;
      }
    }
  }

  .c-btn--cancel {
    height: 28rpx;
    padding-left: 20rpx;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 28rpx;
    color: rgba(51, 51, 51, 1);
    word-break: keep-all;
    // min-width: 3rem;
  }
}

.uni-input {
  margin-bottom: 10rpx;
  position: absolute;
  left: 80rpx;
  right: 80rpx;
}
.app-input-main {
  .van-field__control {
    padding-top: 18rpx;
    padding-bottom: 18rpx;
    line-height: 40rpx !important;
    color: #333 !important;
  }

  .popup-title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 108rpx;
    font-size: 28rpx;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    border-radius: 14rpx 14rpx 0 0;
  }

  .van-popup__close-icon {
    position: absolute !important;
  }
}
</style>
