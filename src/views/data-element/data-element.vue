<template>
  <div class="data-element">
    <div class="data-element-top">
      <span class="position-btn" @click="applyData">立即申请》</span>
    </div>
    <div class="center-title">数据资源库</div>
    <div class="center-table">
      <div
        class="table-box"
        v-for="item in data.resGroupList"
        :key="item.resGroup"
      >
        <div class="table-hed">
          <img
            style="width: 32px; height: 32px"
            src="@/assets/data/icon1.png"
            alt=""
          />
          <span
            style="
              color: #333333;
              font-size: 30px;
              font-weight: 600;
              margin-left: 10px;
            "
            >{{ item.resName }}</span
          >
        </div>
        <div style="color: #666666; margin-top: 20px">
          {{ item.resDesc }}
        </div>
      </div>
    </div>

    <div class="bottom-img-box">
      <div class="center-title">个人风险评估模型</div>
      <img class="bottom-img" src="@/assets/data/dataBG5.png" alt="" />
    </div>
    <Bottom />

    <applyBox
      v-if="data.dialogVisible"
      :key="data.dialogVisible"
      :dialogVisible="data.dialogVisible"
      @setData="setData"

    />
  </div>
</template>

<script setup>
import applyBox from "@/components/home/apply.vue";
import Bottom from "@/components/bottom.vue";
import { reactive } from "vue";
import { getDtresAndQuota, authCheck } from "@/api/login";
import { ElMessage, ElMessageBox } from "element-plus";

let userInfo = localStorage.getItem("userInfo");

console.log(userInfo, 4444444444);

if (userInfo && userInfo != "undefined") {
  userInfo = JSON.parse(localStorage.getItem("userInfo"));
}

const data = reactive({
  dialogVisible: false,
  resGroupList: [],
});

const applyData = async function () {
  if (localStorage.getItem("token")) {
    let isOk = await authCheck();

    if (isOk == 1) {
      data.dialogVisible = true;
    }

    if (isOk == 3) {
      ElMessage({
        message: "请先进行企业认证",
        type: "warning",
      });
      return;
    }

    if (isOk == 4) {
      ElMessage({
        message: "企业未通过审核,请通过审核后提交",
        type: "warning",
      });
      return;
    }

    if (isOk == 2) {
      ElMessageBox.confirm(
        "当前用户已经有正在审核中的需求，是否继续创建新需求？",
        { confirmButtonText: "确定", cancelButtonText: "取消" }
      )
        .then(() => {
          data.dialogVisible = true;
        })
        .catch(() => {
          // catch error
        });
    }
  } else {
    ElMessage({
      message: "请先登录才可以申请",
      type: "warning",
    });
  }
};

const getDtresAndQuotaList = async function () {
  let resData = await getDtresAndQuota();
  data.resGroupList = resData;
  console.log(resData, "资源信息");
};

const setData = function (value) {
  data[value.key] = value.value;
};

getDtresAndQuotaList();
</script>

<style lang="scss" scoped>
.data-element {
  .data-element-top {
    height: 404px;
    width: 100%;
    background-image: url("@/assets/data/dataBG.png");
    background-size: 100% 100%;
    position: relative;
    .position-btn {
      position: absolute;
      left: 374px;
      bottom: 98px;
      color: #ffffff;
      cursor: pointer;
    }
  }

  .center-table {
    display: flex;
    flex-wrap: wrap;
    padding: 8px 150px 20px 260px;

    .table-box {
      width: 400px;
      height: 180px;
      background-image: url("@/assets/data/dataBG2.png");
      background-size: 100% 100%;
      padding: 20px 25px;
      margin-left: 60px;
      margin-bottom: 20px;
      .table-hed {
        display: flex;
        align-items: center;
      }
    }
  }

  .bottom-img-box {
    position: relative;
    .center-title {
      position: absolute;
      left: 0;
      right: 0;
      top: 15px;
    }
    .bottom-img {
      width: 100%;
      height: 660px;
    }
  }
}
</style>
