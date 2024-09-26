<template>
  <div class="information-tuwen">
    <div class="layout-center-box">
      <div class="information-img">
        <div>
          <h3>梅州市热门新闻</h3>
          <p>
            梅州市促力金融大力发展，推动经济高质量发展
            近年来，梅州市紧紧围绕金融发展这个重要主题，大力推进金融改革创新，优化金融生态，为实体经济发展提供了有力支持。通过一系列政策措施，梅州市金融业取得了显著成果，为全市经济高质量发展注入了强大动力。
          </p>
          <p class="bottom-date">2023-08-21</p>
        </div>
        <img src="@/assets/img/img/information.png" alt="" />
      </div>
      <div class="information-text">
        <div class="information-text-title">
          <h3>热门新闻</h3>
        </div>
        <div class="information-text-box">
          <p
            class="text-overflow"
            v-for="(text, index) in hotNewListData"
            :key="text.title"
          >
            <span class="text-index">{{ index + 1 }}</span>
            {{ text.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { hotNewList } from "@/assets/js/dataList.js";

import { ref } from "vue";

let hotNewListData = ref(hotNewList);
</script>

<style lang="scss" scoped>
.information-tuwen {
  background-color: #ffff;
  color: #000000;
  padding: 20px 0;

  .layout-center-box {
    display: flex;
    justify-content: space-between;
  }
  .information-img {
    width: 60%;
    // text-align: center;
    display: flex;
    justify-content: space-between;

    div {
      padding: 20px;
      width: 100%;
      position: relative;
      h3 {
        text-align: center;
        margin-bottom: 20px;
      }
      p{
        font-size: 14px;
      }

      .bottom-date{
        position: absolute;
        right: 50px;
        bottom: 20px;

      }
    }

    background-color: #e6f0ff;
    img {
      width: 50%;
    }
  }
  .information-text {
    font-size: 14px;
    width: 35%;
    color: #343434;
    line-height: 38px;
    .information-text-title {
      text-align: center;
      font-size: 22px;
    }
  }

  .information-text-box {
    vertical-align: middle;
    display: flex;
    flex-direction: column;
    align-items: center;
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
</style>
