<template>
  <div class="layout-hed">
    <div class="layout-center-box">
      <div class="top-left-title">
        <img src="@/assets/data/logo.png" alt="" />
      
      </div>

      <div class="layout-hed-right">
        <div class="tab-box">
          <el-menu
            :default-active="activeIndex"
            background-color="#FFFFFF"
            active-text-color="#fff"
            text-color="#000000"
            :ellipsis="false"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item
              v-for="(tag, index) in tabData"
              :key="index"
              :index="tag.name"
              @click="TableClick(tag)"
            >
              {{ tag.name }}
            </el-menu-item>
          </el-menu>
        </div>
        <el-button type="danger" @click="login" v-if="!token"
          >注册/登录</el-button
        >

        <el-dropdown placement="bottom-start" v-else>
          <div class="userBox">
            <span>{{ data.userInfo.nickName }}</span>
            <img v-if="data.userInfo.avatar"  class="user-img" :src="data.userInfo.avatar" alt="" />
            <img v-else class="user-img" src="@/assets/img/icon/user.png" alt="" />
          </div>
          
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goUserCenter">用户中心</el-dropdown-item>
              <el-dropdown-item @click="goEnterpriseAuth" v-if="!data.userInfo.enterpriseName">企业认证</el-dropdown-item>
              <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <Login
      v-if="data.dialogVisible"
      :dialogVisible="data.dialogVisible"
      @setData="setData"
      @handRegister="handRegister"
    />
    <register
      v-if="data.registerDialogVisible"
      :dialogVisible="data.registerDialogVisible"
      @setData="setData"
      @handLogin="login"
    />
    <enterpriseAuth
      v-if="data.enterpriseAuthDialogVisible"
      :dialogVisible="data.enterpriseAuthDialogVisible"
      @setData="setData"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { tabList } from "@/assets/js/layout.js";
import { useRouter, useRoute } from "vue-router";
import { userData } from "@/stores/data";
import Login from "@/components/login.vue";
import register from "@/components/register.vue";
import enterpriseAuth from "@/components/enterpriseAuth.vue";
import { ElMessage } from "element-plus";

import { getUserCenterInfo } from "@/api/login";


const dataObj = userData();

const router = useRouter();
const route = useRoute();

const data = reactive({
  registerDialogVisible: false,
  dialogVisible: false,
  enterpriseAuthDialogVisible: false,
  userInfo: {},
});

let tabData = ref(tabList);
const activeIndex = ref("首页");
let currentTable = tabData.value.find((e) => e.path == route.path);

if (currentTable?.name) {
  activeIndex.value = currentTable.name;
} else {
  activeIndex.value = "首页";
}

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath, 111111);
};

const TableClick = function (e) {
  dataObj.currentTable = e;
  router.push({
    path: e.path,
  });
  window.scrollTo(0, 0);
};

const token = localStorage.getItem("token");

console.log(token,121312333333)

const login = function () {
  data.dialogVisible = true;
};

const goEnterpriseAuth = function () {
  data.enterpriseAuthDialogVisible = true;
};





const logOut = function () {
  localStorage.setItem("token", '');
  localStorage.setItem("userInfo", '');
  window.location.reload();
  ElMessage({
    message: '退出成功',
    type: 'success',
    duration:3000
  })
};

const goUserCenter = function(){
  router.push({
    path: 'current-user-center',
  });
}




const handRegister = function (value) {
  data.registerDialogVisible = true;
};

const getUserInfo = async function () {
  let resData = await getUserCenterInfo();

  localStorage.setItem("userInfo", JSON.stringify(resData));
  data.userInfo = resData;

  console.log(resData, "用户信息");
};

const setData = function (value) {
  console.log(value, 11111111);

  data[value.key] = value.value;
};

const setRegisterData = function (value) {
  data.registerDialogVisible = value.value;
};

if (token ) {
  console.log(token,12132)
  getUserInfo();
}
</script>

<style lang="scss" scoped>
.layout-hed {
  padding: 2px 0 0;
  border-bottom: 1px solid #ffffff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 200;
  background-color: #ffff;
  height: 70px;
  color: #000000;
  overflow: hidden;

  .layout-center-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70%;
    .top-left-title {
      line-height: 70px;
      font-size: 18px;
      font-weight: 600;
      display: flex;
      align-items: center;
      img {
        width: 220px;
      }
    }

    .layout-hed-right {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 800px;
      :deep(.el-tooltip__trigger:focus-visible) {
            outline: unset;
        }

      .tab-box {
        .el-menu--horizontal.el-menu {
          border-bottom: none;
        }

        .el-menu-item {
          font-size: 18px;
          border-radius: 50px;
          background: none !important;
          &:hover {
            border-radius: 50px;
            background: none !important;
          }
        }
        .is-active {
          color: #00b7a4 !important;
          color: #2e82ff !important;
          border-radius: 50px;
        }
      }


      .userBox {
        display: flex;
        cursor: pointer;
        font-size: 18px;
        align-items: center;
        &:hover{
          border: none;
        }

        .user-img{
          width: 20px;
          margin-left: 10px;
        }

   
      }
    }
  }
}
</style>
