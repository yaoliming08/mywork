<template>
  <div class="hot-recommend">
    <div class="recommend-title">
      <h3>热门推荐</h3>
      <p>TOP RECOMMENDED</p>
    </div>
    <div class="recommend-box">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in hotDataList" :key="item">
          <div class="recommend-box-line">
            <div class="left-img">
              <img src="@/assets/img/home/home-left-bottom.png" alt="" />
              <h3>热门推荐</h3>
              <p>智能推荐热门产品</p>
            </div>
            <div class="right-box-count">
              <div v-for="e in item.dataList">
                <div class="hot-top-title">
                  <span class="hot-apply">申请笔数：{{ e.applyNum }}</span>
                  <span>申请金额：{{ e.applySum }}</span>
                  <span>放款笔数：{{ e.loanNum }}</span>
                  <span>放款金额：{{ e.loanSum }}</span>
                </div>
                <div class="hot-box-count">
                  <div class="hot-box-count-name">
                    <img :src="e.src" alt="" />
                    <div>
                      <p>{{ e.name }}</p>
                      <p>{{ e.tag }}</p>
                    </div>
                  </div>
                  <div class="hot-max-sum">
                    <p>
                      {{ e.maxSum }}
                      <span>万</span>
                    </p>
                    <p>最高贷款额度(元)</p>
                  </div>
                  <div class="hot-rage">
                    <p>{{ e.rate }}</p>
                    <p>参考利率</p>
                  </div>
                  <div class="hot-data-time">
                    <p>
                      {{ e.date }}
                      <span>月</span>
                    </p>
                    <p>申请期限</p>
                  </div>
                  <div>
                    <el-button color="#2d69ff"> 立即申请 </el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup>
import { hotList } from "@/assets/js/dataList";
import { ref } from "vue";

const hotDataList = ref(hotList);
</script>

<style lang="scss" scoped>
.hot-recommend {
  color: #5c5c5c;
  padding-bottom: 50px;
  background-color: #f3f3f3;
  .recommend-title {
    text-align: center;
    h3 {
      font-size: 40px;
    }
  }
  .recommend-box {
    height: 500px;
    margin-top: 20px;
    .el-carousel {
      height: 100%;
    }
    .el-carousel__item {
      height: 100%;
      width: 100%;
      .recommend-box-line {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        h3 {
          font-size: 36px;
          padding-top: 40px;
        }

        .left-img {
          width: 15%;
          height: 100%;
          position: relative;
          color: #ffffff;
          text-align: center;
          margin-top: 12px;
          margin-left: 30px;

          img {
            height: 100%;
            width: 100%;
            position: absolute;
            left: 0;
            right: 0;
            z-index: -1;
          }
        }

        .right-box-count {
          width: 60%;
          margin-left: 50px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top:  10px;

          > div {
            background-color: #ffffff;
            height: 30%;
            font-size: 12px;
            padding: 5px 50px 5px 10px;
            transition: transform 0.5s;
            cursor: pointer;
            &:hover{

              transform: scale(1.2);
              position: relative;
              z-index: 300;
            }

            .hot-top-title {
              margin-bottom: 30px;
              .hot-apply {
                color: #5889ff;
              }
              > span {
                margin-right: 30px;
              }
            }
            .hot-box-count {
              display: flex;
              align-items: center;
              justify-content: space-between;
              > div {
                display: flex;
                flex-direction: column;
                align-items: center;
              }

              .hot-box-count-name {
                display: flex;
                margin: 0 20px 0 10px;
                flex-direction: row;
                img {
                  width: 50px;
                  height: 50px;
                  margin-right: 10px;
                }
                p {
                  color: #999;
                  &:first-child {
                    font-size: 26px;
                    margin-bottom: 2px;
                    color: #333;
                  }
                }
              }

              .hot-max-sum {
                p {
                  &:first-child {
                    font-size: 26px;
                    color: #2d69ff;
                    font-weight: 700;
                    span {
                      font-size: 14px;
                      color: #666;
                      font-weight: 400;
                    }
                  }
                }
              }

              .hot-rage {
                text-align: center;

                p {
                  &:first-child {
                    font-size: 26px;
                    color: #333;
                    font-weight: 700;
                  }
                }
              }

              .hot-data-time {
                p {
                  &:first-child {
                    font-size: 26px;
                    color: #333;
                    font-weight: 700;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

<style>
.el-carousel__container {
  height: 100%;
}
</style>
