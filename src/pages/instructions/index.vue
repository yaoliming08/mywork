<template>
  <view class="instructions">

    <u-navbar title=" 操作指南" :bgColor="'#1D76F6'" titleStyle="color:#FFFFFF;" leftIconColor="#FFFFFF" @leftClick="goBack">
			
		</u-navbar>


    <image v-if="queryData.id =='0'" class="img" mode="widthFix" src="@/assets/deal/deal0.png" />
    <image v-else-if="queryData.id =='1'" class="img" mode="widthFix" src="@/assets/deal/deal1.png" />
    <image v-else-if="queryData.id =='2'" class="img" mode="widthFix" src="@/assets/deal/deal2.png" />
    <image v-else-if="queryData.id =='3'" class="img" mode="widthFix" src="@/assets/deal/deal3.png" />
    <image v-else-if="queryData.id =='4'" class="img" mode="widthFix" src="@/assets/deal/deal4.png" />
    <image v-else-if="queryData.id =='5'" class="img" mode="widthFix" src="@/assets/deal/deal5.png" />
    <image v-else-if="queryData.id =='6'" class="img" mode="widthFix" src="@/assets/deal/deal6.png" />
  </view>

</template>

<script setup lang="ts">

import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
import { ref } from 'vue';

const queryData = ref({id:''})

onLoad(query => {
console.log(query, '‘query’');
queryData.value = query
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