<template>
  <div class="data-list">
    <div class="data-list-box">
      <div class="table-hed">
        <span v-for="(e, index) in tableHedList" :key="index">
          {{ e.title }}
        </span>
      </div>
      <div v-for="(item, index) in tableData" :key="index">
        <span v-for="(a, index) in tableHedList" :key="index">
          {{ item[a.value] }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { tableHedList, tableData } from "../data.js";
</script>

<style lang="scss" scoped>
.data-list {
  // background-color: #2e3246;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px 0 10px 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  height: calc(100% - 40px);

  .data-list-box {
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 5px;
    }

    /* 设置滚动条轨道的样式 */
    &::-webkit-scrollbar-track {
      background-color: #f1f1f1;
    }

    /* 设置滚动条滑块的样式 */
    &::-webkit-scrollbar-thumb {
      background-color: #888;
    }
    & > div {
      display: flex;
      padding: 0 10px;
      margin-bottom: 10px;
      // background-color: #24283c;
      color: #24283c;
      & > span {
        flex: 1;
      }
    }

    .table-hed {
      color: #36ebfd;
      padding: 10px 20px;
      // background-color: #2e3c50;
    }
  }
}
</style>
