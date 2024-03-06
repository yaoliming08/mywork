<template>
  <div class="voice-message message-component" :class="clazz">
    <Resend :message="message"></Resend>
    <Avatar :message="message"></Avatar>
    <div class="voice-content-wrap">
      <div class="voice-content" :style="voiceContentStyle" @click="togglePlay">
        <wifi-symbol :className="symbolClazz"></wifi-symbol>
        <span span class="duration"> {{ format(message.duration) }}</span>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type SVoiceMessage } from '@/model/message'
import { onMounted, type PropType, type Ref, computed, ref, watch, onUnmounted } from 'vue'
import WifiSymbol from './wifi-symbol.vue'
import Resend from './resend.vue'
import { chatManager } from '@/model/chat-manager'
import Avatar from './avatar.vue'
import { voicePlayer, useVoicePlayerOnEnd } from './voice-player'

const playing = ref(false)

const props = defineProps({
  message: { type: Object as PropType<SVoiceMessage>, required: true },
})

function format(duration: number) {
  return `${Math.floor(duration)}″`
}

let width = (props.message.duration / (45 * 1000)) * 60

const voiceContentStyle = {
  width: `${width}vw`,
}

useVoicePlayerOnEnd(() => {
  playing.value = false
})

function togglePlay() {
  const p = playing.value
  if (p) {
    voicePlayer.stop()
  } else {
    voicePlayer.start(props.message.content)
  }
  playing.value = !p
}

const clazz = chatManager.isCurrentUser(props.message.sender?.userId) ? 'right' : 'left'

const symbolClazz = computed(() => {
  let cls = chatManager.isCurrentUser(props.message.sender?.userId) ? 'wifi-symbol-wrap white rotate ' : 'wifi-symbol-wrap'
  if (!playing.value) {
    cls += ' stop'
  }
  return cls
})
</script>
<style lang="scss">
/**
控制 wifi symbol位置的
*/
.voice-message {
  &.left {
    .voice-content {
      .wifi-symbol-wrap {
        order: 1;
      }
    }
  }

  &.right {
    .voice-content {
      .wifi-symbol-wrap {
        order: 2;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@import './message.scss';

.voice-message {
  .voice-content-wrap {
    padding-top: 4rpx;
    min-height: 100%;
    align-items: center;
    display: flex;
  }

  .voice-content {
    padding: 4rpx 30rpx;
    box-sizing: border-box;
    border-radius: 50rpx;
    display: flex;
    align-items: center;
    min-width: 5em;
  }

  &.left {
    text-align: left;
    align-self: flex-start;

    .voice-content-wrap {
      order: 2;
      margin-right: 30rpx;
    }

    .voice-content {
      background-color: #fff;
      color: #565656;
      border-top-left-radius: 8rpx;

      .duration {
        order: 3;
      }
    }
  }

  &.right {
    // text-align: right;
    // margin-right: $avatarSize;
    // text-align: left;
    // align-self: flex-end;
    line-height: 70rpx;
    justify-content: flex-end;

    .voice-content-wrap {
      order: 1;
      margin-left: 30rpx;
    }

    .voice-content {
      border-top-right-radius: 8rpx;
      background-color: #3377ff;
      border: 1rpx solid #3377ff;
      justify-content: flex-end;

      .duration {
        order: 1;
      }
    }
  }
}
</style>
