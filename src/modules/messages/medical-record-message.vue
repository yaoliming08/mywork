<template>
  <div class="medical-record-message message-component" :class="clazz">
    <Avatar :message="message"></Avatar>

    <div class="text-content-wrap">
      <div class="text-content">
        <section>
          <section class="title">电子病历</section>
          <section class="diagnosis">
            <label>诊断</label>
            {{ message.medicalRecord.diagnosisName }}
          </section>
          <section class="date">
            {{ toDate(message.medicalRecord.signatureTime) }}
          </section>
          <section class="view-detail" @click="openMedicalRecordDetail">
            <span>点击查看病历详情</span>
          </section>
        </section>
        <section class="icon-container flex-center">
          <div class="icon-wrap flex-center">
            <u-icon color="#fff" size="40" name="order"></u-icon>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type SMedicalRecordMessage } from '@/model/message'
import { onMounted, type PropType, reactive, ref } from 'vue'
import { toDate } from '@/common/to-date'
import { useRouter } from 'vue-router'
import { chatManager } from '@/model/chat-manager'
import Avatar from './avatar.vue'
import { postMSignViewUrl } from '@/request/chat'

const router = useRouter()
const props = defineProps({
  message: { type: Object as PropType<SMedicalRecordMessage>, required: true },
})
const clazz = chatManager.isCurrentUser(props.message.sender?.userId) ? 'right' : 'left'

async function openMedicalRecordDetail() {  //跳转H5病历页面
      // url: '/pages/order/document-info?documentId=' + props.message.medicalRecord.documentId,

      let signUrl = await postMSignViewUrl(props.message.medicalRecord.documentId)
      let webViewSrc = encodeURIComponent(`/r-chat-sign/?signUrl=${signUrl}&title=电子病历`)
      uni.navigateTo({
      url: `/pages/index/index-webview?webViewSrc=${webViewSrc}`,
      })

}
</script>
<style lang="scss" scoped>
@import './message.scss';

.medical-record-message {
  .text-content-wrap {
    padding-top: 4rpx;
    min-height: 100%;
    align-items: center;
    display: flex;
  }

  .text-content {
    padding: 0 30rpx;
    box-sizing: border-box;
    display: flex;
    border-radius: 50rpx;
    line-height: 1.5em;
    padding: 0.7em;

    .title {
      font-weight: bold;
    }

    .diagnosis {
      font-size: 0.8em;

      label {
        &::after {
          content: ':';
          margin-right: 0.5em;
        }
      }
    }

    .date {
      color: #a1a0a6;
      font-size: 0.8em;
    }

    .view-detail {
      color: #73affc;
      font-size: 0.9em;
    }

    .icon-container {
      // display: ;
      margin-left: 0.5em;
    }

    .icon-wrap {
      background-color: #6aaaf1;
      width: 70rpx;
      height: 70rpx;
      font-size: 60rpx;
      border-radius: 10rpx;

      .van-icon {
        color: #fff;
      }
    }
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

.avatar {
  width: $avatarSize;
  height: $avatarSize;
  // position: absolute;
  border-radius: 50%;
  flex-shrink: 0;
  // background-color: red;
  overflow: hidden;

  // margin: 0 30rpx;
  >img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
