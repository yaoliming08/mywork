<template>
  <div class="detail">
    <div class="detail-top">
      <h3>
        <p>知识产权融资</p>
        <p>将无形资产转化为流动资金</p>
      </h3>
    </div>
    <div class="detail-bottom layout-center-box">
      <div class="search-box">
        <div class="search-line" v-for="item in searchList">
          <span>{{ item.name }}：</span>
          <span
            v-for="e in item.value"
            @click="checkSearch(e, item.value)"
            :style="{ color: e.isCheck ? '#2e82ff' : '' }"
          >
            {{ e.tag }}
          </span>
        </div>

        <div class="detail-data-box">
          <div class="data-box-title">
            <p>共找到378个结果</p>
            <p>申请笔数</p>
            <p>放款笔数</p>
            <p>申请额度</p>
            <p>贷款利率</p>
            <p>申请期限</p>
          </div>
        </div>
        <div class="detail-data-card">
          <Card v-for="(e, index) in tableData" :key="index" :dataObj="e" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { searchData, detailDataTableList } from "@/assets/js/dataList";
import Card from "./components/card.vue";

const tableData = ref(detailDataTableList);

const searchList = ref(searchData);

const checkSearch = function (e, item) {
  console.log(e, item, 8888);

  item.forEach((a) => {
    a.isCheck = false;
  });

  e.isCheck = true;

  tableData.value.reverse();
};
</script>

<style lang="scss" scoped>
.detail {
  background-color: #f5f5f5;
  padding-bottom: 50px;
  .detail-top {
    height: 200px;
    background-image: url("@/assets/img/bg/detail-top-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #ffff;
    font-family: PingFang SC;

    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    h3 {
      margin-right: 500px;
      p {
        &:first-child {
          font-size: 30px;
        }
      }
    }
  }

  .detail-bottom {
    background-color: #ffff;
    padding: 40px 0 40px 0;
    font-size: 14px;
    color: #333;
    .search-box {
      .search-line {
        font-weight: 600;
        display: flex;
        margin-bottom: 25px;
        // justify-content: space-between;
        span {
          width: 100px;
          cursor: pointer;
          margin-left: 50px;
        }
      }
    }

    .detail-data-box {
      margin-top: 20px;
      .data-box-title {
        display: flex;
        border-top: 10px solid #eee;
        padding: 15px 15px;
        p {
          padding: 0 20px;
        }
      }
    }

    .detail-data-card {
      background: #f7f7f7;
      padding-top: 10px;
    }
  }
}
</style>
