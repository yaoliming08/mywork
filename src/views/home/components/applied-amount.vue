<template>
  <div class="applied-amount">
    <div class="center-img">
      <img src="@/assets/img/home/home-bottom-bg.png" alt="" />
    </div>
    <div class="applied-amount-count">
      <h2>一站式金融服务平台</h2>
      <p>政策扶持、智能对接、优先审核</p>
      <div class="count-img">
        <img v-for="item in countData" :src="item.src" alt="" />
      </div>
    </div>

    <div class="applied-amount-form">
      <div class="from-title">
        <h3>智能贷款申请</h3>
        <p>智能申请为您推荐申请贷款产品</p>
      </div>

      <div class="form-box">
        <el-input
          v-model="input4"
          class="w-50 m-2"
          placeholder="请输入贷款金额"
        >
          <template #suffix> (万元) </template>
        </el-input>
        <el-input
          v-model="input4"
          class="w-50 m-2"
          placeholder="请输入贷款期限"
        >
          <template #suffix> (月) </template>
        </el-input>

        <el-button color="#2D69FF">我要申请</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { countList } from "@/assets/js/home";
import { ref } from "vue";

let countData = ref(countList);

const input4 = ref("");
</script>

<style lang="scss" scoped>
.applied-amount {
  height: 80vh;
  background-image: url("@/assets/img/home/bottom.png");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 120px 100px 50px 150px;

  .center-img {
    width: 420px;
    position: absolute;
    height: 420px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    @keyframes move-data {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-15px);
      }
    }

    img {
      width: 100%;
      height: 100%;
      animation: move-data 0.6s infinite alternate;
    }
  }

  .applied-amount-count {
    h2 {
      font-size: 50px;
      margin-bottom: 20px;
    }
    p {
      font-size: 24px;
    }

    .count-img {
      z-index: 30;
      position: relative;
      margin-top: 20px;
      img {
        margin-right: 30px;
      }
    }
  }

  .applied-amount-form {
    height: 400px;
    background-color: #ffffff;
    color: #333333;
    top: -50px;
    position: relative;
    z-index: 50;
    width: 450px;
    border-radius: 15px;


    .from-title {
      text-align: center;
      padding: 20px;
      h3 {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 10px;
      }
      p {
        color: #999999;
      }
    }
    .form-box {
      padding: 5px 50px 5px;
      .el-button{
        width: 100%;
        line-height: 40px;
        height: 40px;
      }
      .el-input {
        margin-bottom: 20px;
        line-height: 44px;
      }
    }
  }
}
</style>

<style>
.el-input__suffix-inner {
  color: #333333;
}
</style>
