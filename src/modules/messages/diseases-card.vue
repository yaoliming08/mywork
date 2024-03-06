<template>
    <div class="diseases message-component" :class="seat">
        <Avatar :message="message"></Avatar>

        <div class="text-content-wrap">
            <div class="text-content">
                <section>
                    <section class="title">{{ message.contentStr.title }}</section>
                    <section class="date">
                        百科详情
                    </section>
                    <section class="view-detail" @click="openMedicalRecordDetail">
                        <span>点击查看百科</span>
                    </section>
                </section>
                <section class="icon-container flex-center">
                    <div class="icon-wrap flex-center">
                        <img src="../../../../../../" alt="">
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { type DiagnosisMessage } from '@/model/message'
import { type PropType} from 'vue'
import { chatManager } from '@/model/chat-manager'
import Avatar from './avatar.vue'

const props = defineProps({
    message: { type: Object as PropType<DiagnosisMessage>, required: true },
})

const seat = chatManager.isCurrentUser(props.message.sender?.userId) ? 'right' : 'left'
async function openMedicalRecordDetail() {  //跳转H5百科页面
    let webViewSrc = encodeURIComponent(`/diseases-encyclopedia/?diseaseName=${props.message.contentStr.title}`)
    uni.navigateTo({
        url: `/pages/index/index-webview?webViewSrc=${webViewSrc}`,
    })

}
</script>
<style lang="scss" scoped>
@import './message.scss';

.diseases {
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
    border-radius: 50%;
    flex-shrink: 0;
    overflow: hidden;
    >img {
        max-width: 100%;
        max-height: 100%;
    }
}
</style>
  