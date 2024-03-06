<template>
  <span v-if="message.sendError" class="send-error-wrap flex-center" @click="resend">
    <u-icon name="info-circle-fill" size="44" color="#fa3534"></u-icon>
  </span>
</template>
<script lang="ts" setup>
import { onMounted, PropType, reactive, ref } from 'vue'
// import { Icon } from 'vant'
import { SMessage } from '@/model/message'
const props = defineProps({
  message: { type: Object as PropType<SMessage>, required: true },
})
function resend() {
  props.message.resend()
}
</script>
<style lang="scss" scoped>
.send-error-wrap {
  height: 100%;
}
</style>
