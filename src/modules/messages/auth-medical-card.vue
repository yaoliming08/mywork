<template>
    <div class="inspect message-component" :class="seat">
        <Avatar :message="message"></Avatar>

        <div class="text-content-wrap">
            <div class="text-content">
                <section>
                    <section class="title"> 病历调阅提示</section>
                    <section class="date">
                        在本次咨询（诊疗）中，为确保诊疗信息的完整，您的历史病历会授权给医生查看，我们将严格按照保密要求，保护您的信息安全。
                    </section>
                    <section class="view-detail">
                        <span @click="isAgreeAuth(0)">暂不授权</span>
                        <span @click="isAgreeAuth(1)">授权</span>
                    </section>
                </section>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { type AuthSMedicalRecordMessage } from '@/model/message'
import { type PropType, computed } from 'vue'
import { chatManager } from '@/model/chat-manager'
import Avatar from './avatar.vue'
import { useStore } from '@stores/chat-consult'
import { authMedical } from '@/request/chat/index'

const props = defineProps({
    message: { type: Object as PropType<AuthSMedicalRecordMessage>, required: true },
})

// const isVideoCall = computed(() => {
//   return JSON.parse(props.message.content?.content)
// })
console.log(props.message, 91222222222)

const seat = chatManager.isCurrentUser(props.message.sender?.userId) ? 'right' : 'left'
async function openMedicalRecordDetail() {  //跳转H5百科页面
    let webViewSrc = encodeURIComponent(`/diseases-encyclopedia/?diseaseName=${props.message.contentStr.title}`)
    uni.navigateTo({
        url: `/pages/index/index-webview?webViewSrc=${webViewSrc}`,
    })
}


async function  isAgreeAuth(isAgree:Number) {
    console.log(isAgree,'0拒绝授权','1同意授权')
        let url = isAgree ? 'smarthos.medical.info.view.pat.agree'  : 'smarthos.medical.info.view.pat.disagree'
        const {docId ,  compatId } = props.message.contentStr
        const store = useStore()
        try{
            await authMedical(url, {
            docId,
            consultId:store.consultId,
            compatId,
            applyMsgId: props.message.messageUId
        })   
        await store.reloadConsult()
        }
        catch (err) {
            console.log(err)
            uni.showToast({
            title: '授权失败！',
            icon: 'none',
          })
        }
}


</script>
<style lang="scss" scoped>
@import './message.scss';

.inspect {
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
            display: flex;
            justify-content: space-between;
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
}</style>
  