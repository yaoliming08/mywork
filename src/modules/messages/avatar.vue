<template>
  <div class="avatar">
    <image :src="message.sender.photo" alt="" />
  </div>
</template>
<script lang="ts" setup>
import { SMessage } from '@/model/message'
import { onMounted, reactive, ref, PropType } from 'vue'
const props = defineProps({
  message: { type: Object as PropType<SMessage>, required: true },
})

</script>
<style lang="scss">
@import './message.scss';


.avatar {
  width: $avatarSize;
  height: $avatarSize;
  // position: absolute;
  border-radius: 50%;
  flex-shrink: 0;
  // background-color: red;
  overflow: hidden;

  > image {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
