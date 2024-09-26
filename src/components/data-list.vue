<template>
  <div class="data-list" v-for="item in dataList">
    <div class="data-list-title">
      <span class="left-line-title-tag"></span>
      <h3>
        {{ item.name }}
      </h3>
      <p>{{ item.count }}</p>
    </div>
    <el-table :data="item.dataList" style="width: 100%">
      <el-table-column
        v-for="a in item.dataType"
        :prop="a.type"
        :label="a.name"
      />
    </el-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { dataListDemo } from "@/assets/js/dataList";

// const props = defineProps({
//   dataObj: {
//     type: Object ,
//     required: true,
//   },
// })

const dataList = ref(dataListDemo);
</script>

<style lang="scss" scoped>
.data-list {
  padding: 20px 35px;
  font-size: 16px;
  .data-list-title {
    padding-bottom: 20px;
    padding-left: 20px;
    position: relative;
    h3 {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 3px;
    }
    p {
      color: #999;
    }
    .left-line-title-tag {
      top: 8px;
      height: 48px;
      width: 5px;
    }
  }
}
</style>
