<template>
  <div class="roll-cooperative-agency">

    <div class="roll-box" >
      <div style="font-size: 22px;font-weight: 500;margin-bottom: 10px;">合作机构</div>
      <el-carousel height="300px">

        <el-carousel-item v-for="(item,index) in agencyList" :key="index">
          <div class="agency-box">
            <div v-for="e in item.list" class="agency-box-line">
            <img :src="e.src" alt="" />
          </div>
          </div>

        </el-carousel-item>
    </el-carousel>

    </div>




  </div>
</template>

<script setup>
import { cooperationList } from "@/assets/js/dataList";
import { ref } from "vue";

let agencyList = ref(cooperationList);
</script>

<style lang="scss" scoped>
.roll-cooperative-agency {
  background-image: url('@/assets/img/bg/work-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 20px;

  .roll-box{
    width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
    background-color: #FFFFFF;
    padding: 20px 30px;
    .agency-box{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .agency-box-line{
        width: 15%;
        margin-bottom: 12px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }


  }




}
</style>

<style></style>
