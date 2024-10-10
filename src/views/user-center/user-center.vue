<template>
  <div class="user-bg"></div>
  <div class="useCenterBox layout-center-box">
    <div class="left-box">
      <div
        class="label-title"
        :class="currentId == '0' ? 'currentTab' : ''"
        @click="checkTab(0)"
      >
        <img src="@/assets/data/userTabIcon2.png" alt="" />
        <span>我的信息</span>
      </div>
      <div
        class="label-title"
        :class="currentId == '1' ? 'currentTab' : ''"
        @click="checkTab(1)"
      >
        <img src="@/assets/data/userTabIcon.png" alt="" />
        <span>我的数据需求</span>
      </div>
    </div>
    <div class="right-box">
      <div class="count-center" v-if="currentId == 0">
        <el-form-item label="用户头像：">
          <img
            v-if="userInfo.avatar"
            :src="userInfo.avatar"
            alt=""
            style="width: 100px;height: 100px;"
          />
          <img
            v-else
           style="width: 100px;height: 100px;"
            src="@/assets/img/icon/user.png"
            alt=""
          />
        </el-form-item>
        <el-form-item label="用户呢称：">
          <span>{{ userInfo.nickName }}</span>
        </el-form-item>
        <el-form-item label="用户手机号：">
          <span>{{ userInfo.phoneNumber }}</span>
        </el-form-item>
        <el-form-item label="用户企业：">
          <span style="margin-right: 20px">{{ userInfo.enterpriseName }}</span>
          <span class="user-enter">{{
            userInfo.enterpriseBindingStatus == "0"
              ? "未认证"
              : userInfo.enterpriseBindingStatus == "1"
              ? "已认证"
              : ""
          }}</span>
        </el-form-item>
        <el-form-item label="法定代表人/负责人：">
          <span>{{ userInfo.legalMan }}</span>

        </el-form-item>

        <el-form-item label="信用代码：">
          <span>{{ userInfo.socialCode }}</span>
          <el-icon @click="edit" v-if="userInfo.enterpriseBindingStatus == '0'"
            ><Edit
          /></el-icon>
        </el-form-item>
        <el-form-item label="详细地址：">
          <span>{{ userInfo.registerAddress }}</span>
   
        </el-form-item>
        <el-form-item label="营业执照：">
          <img
            v-if="userInfo.licenseImage"
            :src="userInfo.licenseImage"
            alt=""
            style="width: 200px;"
          />
        </el-form-item>
      </div>

      <div v-if="currentId == 1">
        <dataList />
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
import dataList from "./components/data-list.vue";

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
.user-bg {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  background-image: url("@/assets/data/userBg.png");
  background-size: 100% 100%;
}
.useCenterBox {
  display: flex;
  min-height: 70%;

  margin-top: 20px;
  z-index: 20;
  position: relative;

  .left-box {
    width: 200px;
    display: flex;
    flex-direction: column;

    border-radius: 12px;
    background: #ffffff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

    margin-right: 20px;
    align-items: center;
    .currentTab {
      color: #2e82ff;
      background: #edf2ff;
    }

    .label-title {
      width: 100%;
      text-align: center;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 30px 0;
      img {
        width: 30px;
      }
    }
  }

  .right-box {
    flex: 1;
    background: #ffffff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
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

    .el-form-item {
      border-bottom: 1px solid #eeeeee;
      padding: 15px 0 25px;
    }

    :deep(.el-form-item__label) {
      width: 200px ;
      justify-content: flex-start;
      color: #999999;
    }

    

    :deep(.el-form-item__content) {
      color: #666666;
    }

    .user-enter{
      background: #ECFDE5;
      color: #29BC11;
      padding: 2px 6px ;
      border-radius: 5px;
    }

  }
}
</style>
