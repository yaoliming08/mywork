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
          <el-form-item label="需求名称" required>
            <el-input v-model="formData.requireName" />
          </el-form-item>
          <el-form-item label="机构名称" required>
            <el-input v-model="formData.enterpriseName" disabled />
          </el-form-item>
          <el-form-item label="联系人" required>
            <el-input v-model="formData.contactName" />
          </el-form-item>
          <el-form-item label="联系电话" required>
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

          <el-form-item label="文件资料">
            <el-upload
              list-type="picture-card"
              v-model:file-list="fileList"
              :http-request="(e) => uploadRequest(e, item)"
            >
              <el-icon><Plus /></el-icon>

              <template #file="{ file }">
                <div>
                  <img
                    v-if="file.raw.name.includes('jpeg')  || file.raw.name.includes('png')"
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  />
                  <img
                   v-else
                    class="el-upload-list__item-thumbnail"
                    :src="`src/assets/img/file/${getImgUrl(file)}.png`"
                    alt=""
                  />
   
                  <span class="el-upload-list__item-actions">
                    <!-- <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <el-icon><zoom-in /></el-icon>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <el-icon><Download /></el-icon>
                    </span> -->
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <el-icon><Delete /></el-icon>
                    </span>
                  </span>
                </div>
              </template>
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
import { AuthAdd, uploadFileApi } from "@/api/login";
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

const fileList = ref([])

const dialog = ref(props.dialogVisible);

const emits = defineEmits(["setData", "searchData"]);
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
  demandUrl: "",
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

  console.log(fileList.value,3333333333)


  formData.demandUrl = fileList.value.map(item => item.raw.uploadUlr).join(',');
  if (
    !formData.requireName ||
    !formData.enterpriseName ||
    !formData.contactName ||
    !formData.contactPhone
  ) {
    ElMessage({
      type: "error",
      message: "请先填写完成申请信息",
    });
    return;
  }

  let resData = await AuthAdd(formData);

  emits("searchData");

  emits("setData", {
    key: "enterpriseAuthDialogVisible",
    value: false,
  });

  console.log(formData, "11111111", resData);

  ElMessage({
    type: "success",
    message: "提交成功，请等待审核",
  });
  dialogClose();
};


const getImgUrl = function(file){
  console.log(3333333,file)

  const whiteList = [
    "txt",
    "docx",
    "doc",
    "xls",
    "xlsx",
    "pdf",
    "jpg",
    "jpeg",
    "png",
    "html",
    "zip",
    "rar",
  ];
  const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);

  return fileSuffix

}

const onUpload = function (file) {
  console.log("sdfsd1111112", file);
  const whiteList = [
    "txt",
    "docx",
    "doc",
    "xls",
    "xlsx",
    "pdf",
    "jpg",
    "jpeg",
    "png",
    "html",
    "zip",
    "rar",
  ];
  const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
  if (whiteList.indexOf(fileSuffix) === -1) {
    ElMessage({
      type: "error",
      message:
        "上传文件只能是txt,docx,doc,xls,xlsx,pdf,jpg,jpeg,png,html,zip,rar格式",
    });

    return false;
  } else {
    if (fileSuffix === "png" || fileSuffix === "jpg" || fileSuffix === "jpeg") {
      file.showUrl = file.url;
    } else {
      // let urlStr = `/assets/img/file/${fileSuffix}.png`
      // let urlStr = '@/assets/img/flow/flow4.png'

      // file.showUrl =  new URL(urlStr, import.meta.url).href

      file.showUrl = new URL(
        "@/assets/img/flow/flow4.png",
        import.meta.url
      ).href;
      console.log(urlStr, 766);
    }
  }
  console.log(
    fileSuffix,
    `@/assets/file/${fileSuffix}.png`,
    222222222,
    file.showUrl
  );
  file.fileType = fileSuffix;

  console.log(file, 3333333333);
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

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);

const handleRemove = (file) => {
  console.log(file,fileList.value,223333333333);


   fileList.value = fileList.value.filter((item)=>{ item.name !== file.name})



      // this.successData.splice(idx, 1)



};

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = false;
  dialogVisible.value = true;
};

const handleDownload = (file) => {
  console.log(file, "上传得文件");
};

const uploadRequest = (fileObj) => {
  console.log(fileObj, "上传");

  let file = fileObj.file;
  const isLt5M = file.size / 1024 / 1024 < 5;
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


    file.uploadUlr = res.uploadUrl


    console.log(res, "11111111");
  });
};

onMounted(() => {});
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
  padding-left: 20px;

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
  :deep(.el-form-item__label) {
    width: 100px !important;
    justify-content: flex-end;
    color: #999999;
  }
}
</style>
