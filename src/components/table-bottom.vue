<template>
  <div class="table-bottom">
    <div class="layout-center-box">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in tableData"
          :label="item.name"
          :name="item.name"
        >
          <div class="pan-left-box">
            <div v-for="(e, idx) in item.dataList" :key="e.title">
              <h4>{{ e.title }}</h4>
              <div class="tag-box">
                <span v-for="a in e.tagList">{{ a.name }}</span>
              </div>
              <div class="pan-text-box">
                <p class="pan-count">{{ e.count }}</p>
                <p>{{ e.date }}</p>
                <p>内容来源：{{ e.dataSource }}</p>
              </div>
            </div>
          </div>
          <div class="pan-right-box">
            <div class="pan-right-box-title">最新文章</div>
            <div class="information-text-box">
            <p
              class="text-overflow count-box"
              v-for="(text, index) in newArticleList"
              :key="text.title"
            >
            <div class="text-overflow">
                <span class="text-index">{{ index + 1 }}</span>  {{ text.title }}
            </div>
            <div class="text-time">
                {{ text.date }}
            </div>

            </p>
          </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { tableBottomList } from "@/assets/js/dataList";
import { newArticle } from "@/assets/js/dataList.js";

let newArticleList = ref(newArticle)


const tableData = ref(tableBottomList);

const activeName = ref("通知公告");

const handleClick = (tab, event) => {
  console.log(tab, event);
};
</script>
<style lang="scss" scoped>
.table-bottom {
  background: #f5f6f9;
  margin-top: 20px;

  .layout-center-box {
    padding: 20px;
    background-color: #ffffff;
    color: #31393c;
    font-size: 12px;

    .el-tab-pane {
      color: #31393c;
      display: flex;
      justify-content: center;
    }
    .pan-left-box {
      width: 65%;
      > div {
        padding: 10px;
        color: #ACA196;
        h4 {
          font-size: 17px;
          margin-bottom: 10px;
          color: #343434;
        }
        .tag-box {
            margin-bottom: 12px;
          span {
            color: #2e82ff;
            font-size: 12px;
            background-color: #e8edf6;
            margin-right: 10px;
            border-radius: 4px;
            padding: 1px 5px 2px;
            font-weight: 400;
          }
        }

        .pan-text-box {
          line-height: 22px;
          .pan-count{
            color: #ADADAD;
            font-size: 14px;
            margin-bottom: 5px;
          }
        }
      }
    }
    .pan-right-box {
      width: 35%;
      .pan-right-box-title{
            font-size: 22px;
            // text-align: center;
            margin-bottom: 20px;
        }
      .information-text-box {
        vertical-align: middle;
        display: flex;
        flex-direction: column;
        align-items: center;
       
        .count-box{
            border-bottom: 1px solid #E5E5E5;
            padding: 5px 0 15px;
        }
        .text-overflow{
            margin-bottom: 15px;
    

            .text-time{
                text-align: right;
            }
        }
      .text-index {
        background: #e7f2fe;
        color: #2e82ff;
        padding: 0 5px;
        text-align: center;
        border-radius: 4px;
        margin-right: 5px;
      }
    }
    }
  }
}
</style>
