<template>
  <div class="home">

    <img src="@/assets/data/homebg.png" style="width: 100%;" alt="">

    <!-- <div class="apply-box"><el-button type="primary" @click="applyNeed">需求申请</el-button></div> -->
    <centerTable />

    <img src="@/assets/portal/img/home2.png" style="width: 100%;" alt="">
    <solveModule/>


    <bottom/>
    

  </div>




  <applyBox
      v-if="data.dialogVisible"
      :dialogVisible="data.dialogVisible"
      @setData="setData"
    />
</template>

<script setup>
import centerTable from "@/components/center-table.vue";
import solveModule from "./components/solve-module.vue";
import applyBox from "./components/apply.vue";
import bottom from '@/components/bottom.vue'



import { useRouter, useRoute } from "vue-router";
import { reactive } from "vue";

const router = useRouter();
const route = useRoute();

const data = reactive({
  dialogVisible:false
})


const applyNeed = function(){
  console.log('申请需求页面')
  data.dialogVisible = true


}


const setData = function (value) {
  data[value.key] = value.value;
};



</script>

<style lang="scss" scoped>
.home {


  margin: 0 auto;
  position: relative;

  .apply-box{
    display: flex;
    justify-content: flex-end;
  }


  .home-data {
    color: #ffffff;
    padding-left: 200px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 150px;

    .data-box-count{
      margin-top: 45px;
      text-align: center;
      font-size: 18px;
    }




      .box-title {
        font-size: 40px;
        font-family: PingFang SC;
        text-align: center;

      }

      .home-img{

        width: 800px;
        margin-top: 25px;
        height: 300px;
        img{
          width: 100%;
          height: 100%;
        }

        


      }
    

  }
  .home-nav-box {
    height: 150px;
    position: absolute;
    left: 0;
    right: 0;
    margin-top: 28%;
    display: flex;
    justify-content: center;
  }
}

.home-bottom {
}
</style>
