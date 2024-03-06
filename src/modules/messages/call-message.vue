<template>
  <div class="call-message message-component" :class="clazz">
    <Avatar :message="message"></Avatar>
    <div class="text-content-wrap">
      <div class="text-content" @click="pullBack">
        <span>
          {{ content }}
        </span>
        <span v-if="message.icon == 'voice'" class="call-icon voice">
          <u-icon name="phone-fill" style="position: absolute"></u-icon>
        </span>
        <span v-if="message.icon == 'video'" class="call-icon video"> </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type SCallMessage } from '@/model/message'
import { type PropType, computed } from 'vue'
import { chatManager } from '@model/chat-manager'
import Avatar from './avatar.vue'

const props = defineProps({
  message: { type: Object as PropType<SCallMessage>, required: true },
})
const clazz = chatManager.isCurrentUser(props.message.sender?.userId) ? 'right' : 'left'

// const content =  props.message.userId === props.message.sender.userId ?  props.message.content : ''

// console.log(props.message, '一条视频或者语音消息')
const title = props.message.icon === 'video' ? '视频' : '语音'


const pullBack = function () {
  console.log(888)
  uni.showToast({
    title: '暂不支持回拨',
    icon: 'none',
  })
}





const content = computed(() => {
  let str: string = props.message.content
  if (str.indexOf('对方已挂断') != -1) {
    str = `${title}已挂断`
  } else if (str.indexOf('对方无应答') != -1) {
    str = `${title}未接听`
  } else if (str.indexOf('视频') === -1 && str.indexOf('语音')) {
    str = title + props.message.content
  }
  return str
})



</script>
<style lang="scss" scoped>
@import './message.scss';

.call-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-size: 100% 100%;
  color: #4395ff;
  margin-left: 0.5em;

  &.video {
    background-image: url(@/assets/img/icon-video.png);
  }

  &.voice {
    // position: relative;
    // top: 15rpx;
    transform: rotate(135deg);
  }
}

.call-message {
  .text-content-wrap {
    padding-top: 4rpx;
    min-height: 100%;
    align-items: center;
    display: flex;
  }

  .text-content {
    padding: 0 30rpx;
    box-sizing: border-box;
    // display: inline-block;
    border-radius: 50rpx;
    display: flex;
    align-items: baseline;
  }

  &.left {
    text-align: left;
    align-self: flex-start;

    // margin-left: $avatarSize;

    .text-content-wrap {
      order: 2;
      margin-right: 30rpx;
    }

    .text-content {
      background-color: #fff;
      color: #565656;
      border-top-left-radius: 8rpx;
    }
  }

  &.right {
    // text-align: right;
    // margin-right: $avatarSize;
    text-align: left;
    align-self: flex-end;
    justify-content: flex-end;
    line-height: 70rpx;

    .text-content-wrap {
      order: 1;
      margin-left: 30rpx;
    }

    .text-content {
      border-top-right-radius: 8rpx;
      background-color: #3377ff;
      border: 1rpx solid #3377ff;
    }
  }
}
</style>
