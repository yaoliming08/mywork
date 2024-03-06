<template>
    <div class="text-msg" v-if="msgText">
      <span v-html="msgText"></span>
  </div>
  <div class="text-message message-component" :class="clazz" v-else >
    <Resend :message="message"></Resend>
    <Avatar :message="message"></Avatar>
    <div class="text-content-wrap">
      <div class="text-content">
        {{ message.content }}
      </div>
    </div>
  </div>

</template>
<script lang="ts" setup>
import { type STextMessage } from '@/model/message'
import { onMounted, type PropType, reactive, ref } from 'vue'
import Resend from './resend.vue'
import { chatManager } from '@/model/chat-manager'
import Avatar from './avatar.vue'

const props = defineProps({
  message: { type: Object as PropType<STextMessage>, required: true },
})
let msgText= ''
console.log(66666666666,props.message.content,msgText)




try {
  if(JSON.parse(props.message.content)){
 msgText = JSON.parse(props.message.content)?.content
let str = msgText.substring(msgText.length-2,msgText.length-7)
let replaceString = '<span style="color:rgb(76,142,218)' + ';">' + str + "</span>";
 msgText = msgText.replace(RegExp(str,'g') ,replaceString);
}
} catch (error) {
  
}




const clazz = chatManager.isCurrentUser(props.message.sender?.userId) ? 'right' : 'left'
</script>
<style lang="scss">
@import './message.scss';
.text-msg{
  text-align: center;
    margin: 12px 6px 13px;
    // color: #63afff;
}

.text-message {
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
    white-space: break-spaces;
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
    text-align: left;
    justify-content: flex-end;
    // float: right;
    align-self: flex-end;
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
