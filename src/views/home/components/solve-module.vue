<template>
  <div class="solve-module">
    <div class="solve-module-title">解决方案</div>

    <div class="center-box">
      <div class="solve-img-box">
        <div class="solve-img-line" v-for="item in solveList" :key="item.titleMsg">
          <img :src="item.src" alt="" />
          <div class="solve-count-box">
            <p class="count-box-title">{{ item.name }}</p>
            <p>{{ item.titleMsg }}</p>
          </div>
        </div>
   
      </div>
    </div>
  </div>
</template>

<script setup>


import { solveList } from "@/assets/js/home.js";

</script>

<style lang="scss" scoped>
.solve-module {

    
  .solve-module-title {
    display: flex;
    justify-content: center;
    font-weight: 600;
    line-height: 50px;
    margin-top: 10px;
    font-size: 22px;
  } 

  .center-box {
   
    margin: 0 auto;
    

  }

  .solve-img-box {
    display: flex;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
    margin-right: -1%;
    padding: 10px 118px;


    .solve-img-line {
      width: 26%;
      margin-right: 15px;
      margin-bottom: 15px;
      position: relative;
      cursor: pointer;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
        &:hover {
        transform: scale(1.5);
      }
      }


      img {
        width: 100%;
      }

      .solve-count-box{
        position: absolute;
        color: #FFFFFF;
        left: 20px;
        bottom: 60px;
        font-size: 16px;
        .count-box-title{
          font-size: 22px;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
