<template>
  <div class="image-message message-component" :class="clazz">
    <Resend :message="message"></Resend>
    <Avatar :message="message"></Avatar>
    <div class="img-content-wrap">
      <div class="img-content" @click="showFullScreen">
        <image :src="thumbnail" alt="图片消息" mode="widthFix" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type SImageMessage } from '@/model/message'
import { onMounted, type PropType, reactive, ref, computed, onUnmounted } from 'vue'
import Resend from './resend.vue'
import { chatManager } from '@/model/chat-manager'
import Avatar from './avatar.vue'
import { addImg, removeImg, getPreviewData } from './img-preview-data'

const props = defineProps({
  message: { type: Object as PropType<SImageMessage>, required: true },
})

onMounted(() => {
  addImg(props.message)
})
onUnmounted(() => {
  removeImg(props.message)
})

const clazz = chatManager.isCurrentUser(props.message.sender?.userId) ? 'right' : 'left'

const thumbnail = computed(() => {
  return `data:image/jpeg;base64,${props.message.thumbnail}`
})

function showFullScreen() {
  uni.previewImage(getPreviewData(props.message))
}
</script>
<style lang="scss" scoped>
@import './message.scss';

.image-message {
  .img-content-wrap {
    padding-top: 4rpx;
    min-height: 100%;
    align-items: center;
    display: flex;
  }

  .img-content {
    overflow: hidden;
    // padding: 30rpx 30rpx;
    box-sizing: border-box;
    // display: inline-block;
    border-radius: 50rpx;
    display: flex;
    max-width: 50vw;
    object-fit: contain;
  }

  &.left {
    text-align: left;
    align-self: flex-start;

    .img-content-wrap {
      order: 2;
      margin-right: 30rpx;
    }

    .img-content {
      width: 300rpx;
      background-color: #fff;
      color: #565656;
      border-top-left-radius: 8rpx;
    }
  }

  &.right {
    justify-content: flex-end;
    line-height: 70rpx;

    .img-content-wrap {
      order: 1;
      margin-left: 30rpx;
    }

    .img-content {
      border-top-right-radius: 8rpx;
    }
  }
  .img-content {
    image {
      width: 400rpx;
    }
  }
}
</style>
