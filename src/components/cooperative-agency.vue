<template>
  <div class="cooperative-agency">
    <div v-for="(item, index) in agencyList" class="cooperative-box">
      <div class="agency-title">
        <span class="left-line-title-tag"></span>
        {{ item.title }}
      </div>
      <div class="agency-box">
        <div v-for="e in item.list" class="agency-box-line">
          <div>
            <img :src="e.src" alt="" />
            <!-- <span> {{ e.name }}</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { agencyData } from "@/assets/js/dataList";
import { ref } from "vue";

let agencyList = ref(agencyData);
</script>

<style lang="scss" scoped>
.cooperative-agency {
  font-size: 22px;
  .cooperative-box {
    padding-left: 20px;
    padding-top: 10px;
    .agency-title {
      padding-left: 16px;
      position: relative;
      font-size: 20px;
      color: #0a1632;
      font-weight: 700;
    }

    .agency-box {
      display: flex;
      flex-wrap: wrap;
      padding: 20px 20px 5px 0;
      justify-content: space-between;
      .agency-box-line {
        width: 24%;
        padding: 20px 0;
        box-sizing: border-box;
        margin-bottom: 20px;
        box-shadow: 2px 2px 9px 1px rgba(62, 102, 245, 0.24);
        > div {
          display: flex;
          justify-content: center;
          img {
            width: 50%;
            height: 30%;
          }
        }
      }
    }
  }
}
</style>
