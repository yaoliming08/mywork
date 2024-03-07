<template>
  <view class="instructions">

    <u-navbar title=" 操作指南" :bgColor="'#1D76F6'" titleStyle="color:#FFFFFF;" leftIconColor="#FFFFFF" @leftClick="goBack">
			
		</u-navbar>


    <image class="img" mode="widthFix" src="@/assets/deal/deal0.png" />
  </view>

</template>

<script setup lang="ts">

import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
import { ref } from 'vue';

const query = ref({})

onLoad(query => {
// console.log(query, '‘query’');

// query.value = query
})



const goBack = ()=>{
  uni.navigateBack();
}

</script>

<style lang="scss" scoped>
.instructions {
  overflow-y: scroll;
  height: 100vh;

  .img {
    width: 750rpx;
  }
}
</style>