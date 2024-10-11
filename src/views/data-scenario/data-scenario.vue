<template>
    <div class="scenario-box">
    <img src="@/assets/img/bg/scenario.png" alt="">
    <span class="position-btn" @click="applyData"></span>


    </div>
    <Bottom />

    <applyBox
      v-if="data.dialogVisible"
      :key="data.dialogVisible"
      :dialogVisible="data.dialogVisible"
      @setData="setData"

    />

 
</template>

<script setup>
import Bottom from "@/components/bottom.vue";
import { getDtresAndQuota, authCheck } from "@/api/login";
import applyBox from "@/components/home/apply.vue";
import { reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";


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

</script>

<style lang="scss" scoped>

.scenario-box{
    display: flex;
    justify-content: center;
    position: relative;
    img{
        width: 100%;
    }
    .position-btn{
        display: block;
    
        width: 120px;
        height: 40px;
        position: absolute;
        left: 360px;
        top: 260px;
    }
}

</style>