<template>
    <div class="tip-message">
        {{  content}}
    </div>
</template>
<script lang="ts" setup>
import { type TipMessage } from '@/model/message'
import { type PropType,ref } from 'vue'



const props = defineProps({
    message: { type: Object as PropType<TipMessage>, required: true },
})
console.log(props.message,'赠送的消息')
let content = ref('')

if(props.message.contentStr.cmdType === 'ARRANGE_CONSULT'){  //音视频开始时间
    content.value = props.message.content
}else if(props.message.contentStr.cmdType === 'GIVE_REPLY_NUMBER'){ //医生赠送消息类型
    content.value = `医生赠送了您${props.message.content}条回复`
}else{
    content.value = props.message.content
}


</script>
<style lang="scss" scoped>
@import './message.scss';

.tip-message {
    text-align: center;
    margin: 10px 0;
}
</style>
  