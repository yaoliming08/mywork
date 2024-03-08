<template>
  <view class="instructions">
    <u-navbar title=" 操作指南" :bgColor="'#1D76F6'" titleStyle="color:#FFFFFF;" leftIconColor="#FFFFFF" @leftClick="goBack">
		</u-navbar>
    <image v-if="queryData.id =='0'" class="img" mode="widthFix" src="https://miniprogram.lixuepeng.cn/group1/M00/00/05/birvhmXqqieAUOg3AAbqNJWuaSU175.png" />
    <image v-else-if="queryData.id =='1'" class="img" mode="widthFix" src="https://miniprogram.lixuepeng.cn/group1/M00/00/05/birvhmXqqNGAGk26AAkf8e3h9cA960.png" />
    <image v-else-if="queryData.id =='2'" class="img" mode="widthFix" src="https://miniprogram.lixuepeng.cn/group1/M00/00/05/birvhmXqqgeAE58YAAiCQxeHa-s508.png" />
    <image v-else-if="queryData.id =='3'" class="img" mode="widthFix" src="https://miniprogram.lixuepeng.cn/group1/M00/00/05/birvhmXqqeGAeuv7AAgKpNmE6ts919.png" />
    <image v-else-if="queryData.id =='4'" class="img" mode="widthFix" src="https://miniprogram.lixuepeng.cn/group1/M00/00/05/birvhmXqqYmAUYi0AAk8SiWsj_A875.png" />
    <image v-else-if="queryData.id =='5'" class="img" mode="widthFix" src="https://miniprogram.lixuepeng.cn/group1/M00/00/05/birvhmXqqcmAcd1OAAa6PSPiN80180.png" />
    <image v-else-if="queryData.id =='6'" class="img" mode="widthFix" src="https://miniprogram.lixuepeng.cn/group1/M00/00/05/birvhmXqqfWAY7MCAAfLMORd8C0879.png" />
  </view>

</template>

<script setup lang="ts">

import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const queryData = ref({id:''})

onLoad(query => {
console.log(query, 'query');
queryData.value = {
  id:query.id
}
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