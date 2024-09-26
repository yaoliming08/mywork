<template>
  <div class="search-information">
    <div class="information-box">
      <h3>一站式金融政策查询、政策解读、贷款申请服务</h3>
      <el-input v-model="searchInput" placeholder="请输入内容" class="input-box">
        <template #append>搜索</template>
      </el-input>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchInput = ref('')


</script>

<style lang="scss" scoped>
.search-information {
  height: 240px;
  background-image: url("@/assets/img/bg/information-top-bg.png");
  background-size: cover;
  display: flex;
  justify-content: center;
  .information-box {
    text-align: center;
    padding-top: 30px;
    .input-box{
        width: 50vw;
        margin-top: 40px;
        line-height: 50px;
    }
  }
}
</style>
