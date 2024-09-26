<template>
  <div class="useCenterBox layout-center-box">
    <div class="left-box">
      <span
        class="label-title"
        :class="currentId == '0' ? 'currentTab' : ''"
        @click="checkTab(0)"
        >首页</span
      >
      <span
        class="label-title"
        :class="currentId == '1' ? 'currentTab' : ''"
        @click="checkTab(1)"
        >我的数据需求</span
      >
    </div>
    <div class="right-box">

      <div class="count-center" v-if="currentId == 0">
        <div style="margin-bottom: 30px;color: #2e82ff;font-size: 28px;">欢迎登录数据要素服务门户用户中心</div>

        <el-form-item label="用户头像">
        <img :src="userInfo.avatar" alt="" style="width: 100px;"/>
      </el-form-item>
      <el-form-item label="用户呢称">
        <span>{{ userInfo.nickName }}</span>
      </el-form-item>
      <el-form-item label="用户手机号">
        <span>{{ userInfo.phoneNumber }}</span>
      </el-form-item>
      <el-form-item label="用户企业">
        <span style="margin-right: 20px;">{{ userInfo.enterpriseName }}</span>
        <span>{{ userInfo.enterpriseBindingStatus == '0' ? '未认证' : (userInfo.enterpriseBindingStatus == '1' ? '已认证' : '' ) }}</span>
      </el-form-item>

      <el-form-item label="企业编号">
        <span>{{ userInfo.socialCode }}</span>
        <el-icon @click="edit" v-if="userInfo.enterpriseBindingStatus == '0'"><Edit /></el-icon>
      </el-form-item>

      </div>

      <div v-if="currentId == 1">

        <dataList/>

      </div>
    </div>

    <enterpriseAuth
      v-if="data.enterpriseAuthDialogVisible"
      :dialogVisible="data.enterpriseAuthDialogVisible"
      :formData="userInfo"
      @setData="setData"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getUserCenterInfo } from "@/api/login";
import enterpriseAuth from "@/components/enterpriseAuth.vue";
import dataList from './components/data-list.vue'

const userInfo = ref({});
const currentId = ref("0");

const data = reactive({
  enterpriseAuthDialogVisible: false,
});

const setData = function (value) {
  console.log(value, 11111111);

  data[value.key] = value.value;
};

const getUserInfo = async function () {
  let data = await getUserCenterInfo();
  userInfo.value = data;
  console.log(data, 121311);
};

const checkTab = function (id) {
  currentId.value = id;
};

const edit = function () {
  console.log("点击编辑");
  data.enterpriseAuthDialogVisible = true;
};

getUserInfo();
</script>

<style lang="scss" scoped>
.useCenterBox {
  display: flex;
  height: 70%;
  margin-top: 20px;
  .left-box {
    width: 200px;
    display: flex;
    flex-direction: column;
    line-height: 60px;
    border: 1px solid #a8a8a8;
    align-items: center;
    .currentTab {
      color: #2e82ff;
    }

    .label-title {
      width: 100%;
      border-bottom: 1px solid #a8a8a8;
      text-align: center;
      cursor: pointer;
    }
  }

  .right-box {
    flex: 1;
    border: 1px solid #a8a8a8;
    border-left: none;
    .count-center {
      padding-left: 100px;
      padding-top: 60px;

      .user-info-box {
        display: flex;

        img {
          width: 50px;
        }
      }
    }
  }
}
</style>
