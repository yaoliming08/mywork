<template>
    <div class="agreement-tips">
        <div>
            <template v-if="isAgree">
            您已经授权医生查看您的历史病历。如果您想撤销授权医生查看，点击
            <span class="blue-text" @click="revoke">撤销</span>
        </template>
        <template v-if="isDisAgree">
            您已拒绝医生查看历史病历
        </template>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { type ReviewTipMessage } from '@/model/message'
import { type PropType, computed } from 'vue'
import { useStore } from '@stores/chat-consult'
import { patCancel } from '@/request/chat/index'


const props = defineProps({
    message: { type: Object as PropType<ReviewTipMessage>, required: true },
})

const isAgree = computed(() => {
    return props.message.contentStr.type === 'PAT_AGREE'
})

const isDisAgree = computed(() => {
    return props.message.contentStr.type === 'PAT_DISAGREE'
})

console.log(props.message, '病历文本消息')



async function revoke() {
    const store = useStore()
    if (store.consultInfo?.consultStatus !== '3') {
        return uni.showToast({
            title: '当前订单已结束',
            icon: 'none',
        })
    } else {
        const { docId, compatId } = props.message.contentStr
       await patCancel({
            docId,
            consultId: store.consultId,
            compatId,
            applyMsgId: props.message.messageUId
        })
    }

}

</script>
<style lang="scss" scoped>
@import './message.scss';

.agreement-tips {
    width: 95%;
    padding: 0 10px;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    color: #999999;
    line-height: 36px;
    text-align: center;

    .blue-text {
        color: #2F8AFF;
    }
}
</style>
  