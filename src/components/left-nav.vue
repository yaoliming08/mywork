<template>
  <div class="left-nav">
    <div
      v-for="(item, index) in navData"
      class="nav-line"
      :key="index"
      @click="navClick(item)"
    >
      <img :src="item.src" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { navList } from "@/assets/js/home.js";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

let navData = ref(navList);

const navClick = function (e) {
  return
  console.log("二级菜单点击", e);
  router.push({
    path: e.path,
  });
};



</script>

<style lang="scss" scoped>
.left-nav {
  position: fixed;
  top: 15%;
  left: 50px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;

  .nav-line {
    width: 100px;
    height: 100px;
    padding: 10px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      transition: transform 0.5s;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style>
