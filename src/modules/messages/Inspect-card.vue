<template>
    <div class="inspect message-component" :class="clazz">
        <Avatar :message="message"></Avatar>

        <div class="text-content-wrap">
            <div class="text-content">
                <section>
                    <section class="title">
                        {{ message.contentStr.type === 'CHECK' ? '检查申请单' : '检验申请单' }}
                        <span style="color:#FF6633" v-if="message.contentStr.cancel">已撤销</span>
                    </section>
                    <section class="date">
                        <p>{{ message.contentStr?.inspectMsgResult }}</p>
                        <p>{{ message.contentStr?.reportTime }}</p>
                    </section>
                    <section class="view-detail" @click="openMedicalRecordDetail">
                        <span> 点击查看详情</span>
                    </section>
                </section>
                <section class="icon-container flex-center">
                    <div class="icon-wrap flex-center">
                        <!-- <u-icon color="#fff" size="140" name="order"></u-icon> -->
                        <img v-if="message.contentStr.type === 'CHECK'" class="check-inspect-logo" src="@/assets/img/chat/check.svg">
                        <img v-else class="check-inspect-logo" src="@/assets/img/chat/inspect.svg">
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { type InspectMessage } from '@/model/message'
import { type PropType } from 'vue'
import { chatManager } from '@/model/chat-manager'
import Avatar from './avatar.vue'
import { toQuery } from '@/common/record-to-query'


const props = defineProps({
    message: { type: Object as PropType<InspectMessage>, required: true },
})

const clazz = chatManager.isCurrentUser(props.message.sender?.userId) ? 'right' : 'left'

async function openMedicalRecordDetail() {  //跳转H5检查页面
    const { inspectionorderid, compatIdcard, compatIdcardtype, bookhosid, patId, compatId } = props.message.contentStr
    let query = toQuery({
        yyid: bookhosid,
        idcard: compatIdcard,
        idcardtype: compatIdcardtype,
        inspectionorderid,
        patientid: patId,
        patientVisitId: compatId,
        commpatId: compatId,
        hosId: bookhosid // 支付检查检验费用时需要，与医院id相同
    });

    let webViewSrc = encodeURIComponent(`/inspection/detail/?${query}`)
    console.log('跳转检查的地址', webViewSrc)
    // https://zlwyl-test.iflyhealth.com/ty_wechat/?openId=oH2-I5YefLAcVwbW5i88IdMykdjY/#/inspection/detail/yyid=057106&idcard=342622199808113238&idcardtype=CN&inspectionorderid=1279&patientid=106842061721829622&patientVisitId=633000853504&commpatId=633000853504&hosId=057106
    uni.navigateTo({
        url: `/pages/index/index-webview?webViewSrc=${webViewSrc}`,
    })

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
  