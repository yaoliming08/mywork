<template>
  <div class="home-table-box " >
    <div class="home-table-hed">
      <img src="@/assets/data/homelogo.png"  alt="">
    </div>

    <div class="bottom-table">
      <div v-for="item in bottomData" :key="item.id" class="bottom-table-line">
        <img :src="item.src" alt="" />
        <p style="font-weight: 600;font-size: 22px; margin:8px 0 14px 0;">{{ item.name }}</p>
        <p style="width: 80%;margin: 0 auto; color: #A3A3A3;font-size: 18px;">{{ item.titleMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { bottomTable } from "@/assets/js/home";

let bottomData = ref(bottomTable);
</script>

<style lang="scss" scoped>
.home-table-box {
  padding-bottom: 20px;
  overflow: hidden;


    .home-table-hed{
        display: flex;
        justify-content: center;
        img{
          width: 380px;
          margin: 20px 0 8px;
        }

    }


  .bottom-table {
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    .bottom-table-line {
      width: 350px;
      height: 350px;
      text-align: center;
    
      font-size: 32px;
      margin-top: 10px;
      padding: 55px 25px 25px;
      border-radius: 10px;
      background-image: url('@/assets/portal/img/home3.png');
      background-size: 100% 100%;
   
      cursor: pointer;
      // &:hover {
      //   transform: scale(1.2);
      // }
   
      p {
        font-size: 14px;
        &:first-child {
          font-size: 36px;
          font-weight: 600;
        }
      }
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>
