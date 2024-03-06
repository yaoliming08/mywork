<template>
  <div
    class="r-chat-notice">
    <template v-if="replyNumber > 0">
      您还可以回复 <span class="link">{{ replyNumber }}</span> 条
    </template>
    <template v-else-if="replyNumber === 0">
      <span style="color: #cb8305">您的回复条数已用完</span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@stores/chat-consult'
import { type limitMessage } from '@/model/message'
import { onMounted, type PropType, reactive, ref,computed } from 'vue'
import { chatManager } from '@/model/chat-manager'

const store = useStore()


const replyNumber = computed(() => {
  return chatManager.patReplyRemainNumber || 0 
})


// const props = defineProps({
//   message: { type: Object as PropType<limitMessage>, required: true },
// })



// const seat = chatManager.isCurrentUser(props.message.sender?.userId) ? 'right' : 'left'
// const replyNumber = props.message.contentStr


// console.log(seat,1111111)





</script>

<style scoped lang="scss">
.r-chat-notice {
  position: fixed;
  right: 0;
  padding: 5px 12px;
  line-height: 22px;
  font-size: 16px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 31px 2px rgba(116, 151, 208, 0.13);
  border-radius: 181px 0px 0px 181px;
  bottom: 80px;
  .link {
    color: #2F8AFF;
  }
}
</style>