<template>
  <div class="flow-bottom">
    <div class="flow-title">
      <h2>申请流程</h2>
      <p>仅需5步，轻松贷款</p>
    </div>
    <div class="flow-box">
      <div v-for="item in flowData">
        <img :src="item.src" alt="">
        <p class="title">{{ item.name }}</p>
        <p class="count">{{ item.count }}</p>
       
      </div>
    </div>
  </div>
</template>

<script setup>
import { flowList } from "@/assets/js/layout";
import { ref } from "vue";

const flowData = ref(flowList);
</script>

<style lang="scss" scoped>
.flow-bottom {
  .flow-title {
    text-align: center;
    font-size: 12px;
    color: #333;

    h2 {
      font-size: 36px;
      color: #333;
    }
  }

  .flow-box {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    text-align: center;
    padding: 25px 180px;
    >div{
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
            width: 50px;
            height: 40px;
            margin-bottom: 20px;
        }
        .count{
            width: 100px;
            color: #999;
        }
        .title{
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 10px;
        }
    }
  }
}
</style>
