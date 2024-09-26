<template>
  <div class="card-list">
    <h3 class="top-title">融资服务</h3>
    <p class="top-title-count">一站式 全方位</p>
    <div class="card-box">
      <div class="card-line-box" v-for="item in serveList">
        <div
          class="card-top-title"
          :style="{
            background: 'url(' + item.src + ') no-repeat',
          }"
        >
          {{ item.title }}
        </div>
        <div class="card-count-box">
          <p>{{ item.count }}</p>

          <el-button color="#465cf5" @click="goDetail">查看详情</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { serveDetailList } from "@/assets/js/dataList";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const serveList = ref(serveDetailList);

const goDetail = function(){

  router.push({
    path: '/detail',
  });

  


}




</script>








<style lang="scss" scoped>
.card-list {
  width: 100%;
  padding-top: 20px;

  .top-title {
    text-align: center;
    color: #0060ff;
    font-size: 25px;
    font-weight: 700;
  }
  .top-title-count {
    margin-top: 9px;
    font-size: 20px;
    color: #000;
    text-align: center;
  }
  .card-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 20px;
    padding: 10px 30px;
    .card-line-box {
      width: 31%;
      box-sizing: border-box;
      margin-bottom: 10px;
      box-shadow: 0 0 12px 2px hsla(0, 0%, 55.3%, 0.16);
      border-radius: 8px;
      .card-top-title {
        line-height: 60px;
        color: #ffffff;
        padding-left: 30px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        // background-size: 100% 100%;
      }

      .card-count-box {
        font-size: 12px;
        padding: 15px 15px 30px 30px;
        p{
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
