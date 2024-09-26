<template>
  <div class="card">
    <div class="card-title">
      <div class="top-bg">
        <span class="card-top-bg-title">综合评分</span>
        <span class="rate" >
          <el-rate
            v-model="dataObj.rate"
            disabled
            show-score
            score-template="{value}分"
          />
        </span>
        <span>适用地区:全省</span>
      </div>
      <div class="top-right-btn"></div>
    </div>

    <div class="card-bottom">
      <p class="card-bottom-top">
        <span>{{ dataObj.name }}</span>
        <span v-for="tag in dataObj.tagList">{{ tag.tag }}</span>
      </p>
      <div class="card-bottom-box">
        <div>
          <img :src="dataObj.src" alt="" />
        </div>
        <div v-for="item in dataObj.tagData">
          <p class="value">{{ item.value }} {{ item.unit }}</p>
          <p>{{ item.title }}</p>
        </div>
      </div>
      <div class="card-bottom-bottom">
        <p
          class="bottom-tag"
          v-for="e in dataObj.dataList"
          :style="{ 'background-color': e.bgColor, color: e.color }"
        >
          <span>{{ e.title }}</span>
          <span>{{ e.value }}{{ e.unit }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  dataObj: {
    type: Object,
    required: true,
  },
});

</script>

<style lang="scss" scoped>
.card {
  margin-top: 20px;
  background-color: #ffffff;
  cursor: pointer;
  transition: transform 0.3s ease; /* 添加过渡效果 */

  &:hover {
    transform: scale(1.1); /* 鼠标悬停时放大到原来的1.2倍 */
  }
  .card-title {
    display: flex;
    justify-content: space-between;
    .top-bg {
      background-image: url("@/assets/img/bg/detail-tag.png");
      background-repeat: no-repeat;
      flex: 1;
      margin-right: 20px;
      padding: 10px 40px;
      display: flex;
      align-items: center;
      .card-top-bg-title {
        font-weight: 600;
      }

      .rate{
        margin: 0 10px;

      }
    }
    .top-right-btn {
      width: 200px;
    }
  }

  .card-bottom {
    padding: 20px 40px;

    .card-bottom-top {
      display: flex;
      margin-left: -8px;
      span {
        margin-right: 10px;
        background: #e5ecff;
        color: #4e68b1;
        padding: 1px 8px;
        border-radius: 20px;
        &:first-child {
          font-weight: 600;
          background-color: #ffffff;
          color: #333;
        }
      }
    }

    .card-bottom-box {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      font-size: 12px;
      div {
        &:first-child {
          display: flex;
          align-items: center;
          img {
            width: 120px;
          }
        }
      }
      .value {
        color: #ff9231;
        font-weight: 700;
        margin-bottom: 12px;
        font-size: 18px;
      }
    }

    .card-bottom-bottom {
      display: flex;

      .bottom-tag {
        padding: 2px 8px;
        border-radius: 3px;
        margin-right: 10px;
        font-size: 12px;
      }
    }
  }
}
</style>


<style>

.el-rate__text{
            color: #F3A21C;
        }

</style>
