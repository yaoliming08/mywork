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
          <el-form-item label="企业类别">
            <el-radio-group v-model="formData.enterpriseType">
              <el-radio label="1">法人企业</el-radio>
              <el-radio label="2">个体工商</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="企业名称" required>
            <el-input v-model="formData.enterpriseName" />
          </el-form-item>
          <el-form-item label="信用代码" required>
            <el-input v-model="formData.socialCode" />
          </el-form-item>
          <el-form-item label="法定代表人/负责人" required>
            <el-input v-model="formData.legalMan" />
          </el-form-item>
          <el-form-item label="联系电话" required>
            <el-input v-model="formData.phoneNumber" />
          </el-form-item>

          <el-form-item label="详细地址">
            <el-input v-model="formData.registerAddress" />
          </el-form-item>

          <el-form-item label="营业执照照片" required>
            <el-upload
              class="upload-box"
              :show-file-list="false"
              accept=".png,.jpg"
              :http-request="(e) => uploadRequest(e, item)"
            >
              <img
                v-if="formData.showUrl"
                :src="formData.showUrl"
                class="upload-img"
              />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
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

            <el-button @click.prevent="dialogClose" size="large">
              返回
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { submit, uploadFileApi } from "@/api/login";
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

const router = useRouter();

const data = reactive({
  title: "企业用户认证",
});

const formData = reactive({
  enterpriseType: "1", //企业类别
  socialCode: "", //信用编码
  enterpriseName: "", //企业名称
  registerAddress: "", //详细地址
  phoneNumber: "", //联系电话
  licenseImage: "", //企业营业执照图片路径
  showUrl: "", //企业营业执照图片
  legalMan: "",
});

if (props.formData) {
  for (const key in formData) {
    formData[key] = props.formData[key];
  }

  delete formData.licenseImage;
  formData["showUrl"] = props.formData["licenseImage"];
  formData["id"] = props.formData["id"];
}

const SubmitEvent = async function () {
  if (!formData.enterpriseName) {
    ElMessage({
      message: "请先输入企业名称",
      type: "warning",
    });
    return
  }

  if (!formData.socialCode) {
    ElMessage({
      message: "请先输入企业信用代码",
      type: "warning",
    });
    return
  }

  
  if (!formData.legalMan) {
    ElMessage({
      message: "请先输入法定代表人/负责人",
      type: "warning",
    });
    return
  }

  if (!formData.phoneNumber) {
    ElMessage({
      message: "请先输入联系电话",
      type: "warning",
    });
    return
  }

  if (!formData.licenseImage) {
    ElMessage({
      message: "请先上传营业执照照片",
      type: "warning",
    });
    return
  }

  let resData = await submit(formData);

  if (resData) {
    emits("setData", {
      key: "enterpriseAuthDialogVisible",
      value: false,
    });

    console.log(formData, "11111111", resData);

    ElMessage({
      type: "success",
      message: "提交成功，请等待审核",
    });
  }
};

const uploadRequest = (fileObj) => {
  let file = fileObj.file;
  const isLt5M = file.size / 1024 / 1024 < 5;
  // console.log(isLt5M, '上传文件大小', file.size / 1024 / 1024)
  if (!isLt5M) {
    ElMessage({
      type: "error",
      message: "上传文件大小不能超过 50MB!",
    });
    // fileList.splice(-1,1) //移除当前超出大小的文件
    return false;
  }
  uploadFileApi({
    file,
  }).then((res) => {
    formData.showUrl = res.showUrl;
    formData.licenseImage = res.uploadUrl;

    console.log(res, "11111111");
  });
};

//关闭弹框
const dialogClose = function () {
  console.log("关闭");
  emits("setData", {
    key: "enterpriseAuthDialogVisible",
    value: false,
  });
};

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
