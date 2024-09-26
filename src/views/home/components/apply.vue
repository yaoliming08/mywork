<template>
  <el-dialog
    v-model="dialog"
    width="700"
    :lock-scroll="false"
    draggable
    class="dialog-login-box"
    top="15vh"
    @close="dialogClose"
  >
    <div class="login-box">
      <div class="container">
        <div class="login-title">{{ data.title }}</div>
        <div class="login-btn-box">
          <el-form-item label="需求名称">
            <el-input v-model="formData.requireName" />
          </el-form-item>
          <el-form-item label="机构名称">
            <el-input v-model="formData.enterpriseName" disabled />
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="formData.contactName" />
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="formData.contactPhone" />
          </el-form-item>

          <el-form-item label="数据要素">


            <el-select
              v-model="formData.resGroup"
              multiple
              placeholder="请选择数据要素"
              style="width: 100%"
            >
              <el-option
                v-for="item in data.resGroupList"
                :key="item.value"
                :label="item.resName"
                :value="item.resGroup"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="需求描述">
            <el-input
              v-model="formData.requireDesc"
              autosize
              type="textarea"
              placeholder="请输入需求描述"
            />
          </el-form-item>

          <div class="bottom-btn">
            <el-button
              :loading="loading"
              size="large"
              type="primary"
              @click.prevent="SubmitEvent"
            >
              提交
            </el-button>

            <el-button @click.prevent="goBack" size="large"> 返回 </el-button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { AuthAdd } from "@/api/login";
import { ElMessage } from "element-plus";

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
  },
  formData: {
    type: Object,
  },
});

const dialog = ref(props.dialogVisible);
const emits = defineEmits(["setData", "handLogin"]);
const loading = ref(false);

import { useRouter } from "vue-router";
import { getDtresAndQuota } from "@/api/login";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

console.log("用户信息", userInfo);

const router = useRouter();

const data = reactive({
  title: "需求申请",
  resGroupList: [],
});

const formData = reactive({
  requireName: "", //需求名称
  enterpriseName: "", //需求申请机构名称
  resGroup: "", //资源编码分类,多个以","隔开
  contactName: "", //联系人姓名
  contactPhone: "", //联系人电话
  requireDesc: "", //需求描述
  socialCode: "",
});

formData.enterpriseName = userInfo.enterpriseName;
formData.socialCode = userInfo.socialCode;

if (props.formData) {
  for (const key in formData) {
    formData[key] = props.formData[key];
  }

  delete formData.licenseImage;
  formData["showUrl"] = props.formData["licenseImage"];
  formData["id"] = props.formData["id"];
}

const SubmitEvent = async function () {
  let resData = await AuthAdd(formData);

  emits("setData", {
    key: "enterpriseAuthDialogVisible",
    value: false,
  });

  console.log(formData, "11111111", resData);

  ElMessage({
    type: "success",
    message: "提交成功，请等待审核",
  });
};

//关闭弹框
const dialogClose = function () {
  emits("setData", {
    key: "dialogVisible",
    value: false,
  });
};

const getDtresAndQuotaList = async function () {
  let resData = await getDtresAndQuota();
  data.resGroupList = resData;
  console.log(resData, "资源信息");
};

getDtresAndQuotaList();

onMounted(() => {});

const goBack = function () {};
</script>

<style lang="scss">
.dialog-login-box {
  .el-dialog__body {
    padding: 0 !important;
  }
}
</style>

<style lang="scss" scoped>
.login-box {
  display: flex;
  margin-top: -30px;

  .login-img {
    width: 400px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .container {
    width: 100%;

    .login-title {
      text-align: center;
      font-size: 28px;
      color: #2477ef;
      padding-top: 30px;
      font-weight: 600;
    }

    .login-btn-box {
      display: flex;
      flex-direction: column;

      padding: 30px 30px 40px 5px;

      :deep(.el-form-item__label) {
        width: 150px;
      }

      .upload-box {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);

        :deep(.el-upload) {
          width: 150px;
          height: 150px;
        }
      }
      .upload-img {
        width: 150px;
        height: 150px;
      }

      .bottom-btn {
        display: flex;
        justify-content: center;

        :deep(.el-button) {
          width: 100px !important;
        }
      }
    }
  }
}
</style>
