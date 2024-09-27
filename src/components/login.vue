<template>
  <el-dialog
    v-model="dialog"
    
    :lock-scroll="false"
    draggable
    class="dialog-login-box"
    top="22vh"
    @close="dialogClose"
  >
    <div class="login-box">
      <div class="login-img">
        <img src="@/assets/demo/login01.png" alt="" />
      </div>
      <div class="container">
        <div class="login-title">{{ data.title }}</div>
        <div class="check-tab" @click.prevent="checkLogin">
          {{ data.checkTitle }} >
        </div>
        <div style="display: flex; justify-content: center">
          <div class="login-btn-box">
            <el-input
 
              v-if="data.authType == 'sms'"
              v-model="formData.phoneNumber"
              maxlength="11"
              placeholder="11位手机号"
              
            >
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>

            <div class="code-box" v-if="data.authType == 'sms'" style="display: flex;justify-content: space-between;width: 100%;">
              <el-input
                v-model="formData.codeValue"
                size="large"
                auto-complete="off"
                placeholder="验证码"
               style="width: 60%"
              >
                <template #prefix>
                  <el-icon><Tickets /></el-icon>
                </template>
              </el-input>
              <div class="login-code">
                <el-button :disabled="timeData > 0" @click="getCodeValue">
                  {{ timeData > 0 ? timeData + "秒" : "发送验证码" }}
                </el-button>
              </div>
            </div>

            <el-input
              v-if="data.authType == 'password'"
              v-model="formData.username"
              style="width: 350px"
              placeholder="请输入用户名"
            >
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
            <el-input
              v-model="formData.password"
              type="password"
              style="width: 350px; margin-top: 20px"
              v-if="data.authType == 'password'"
              placeholder="请输入密码"
            >
              <template #prefix>
                <el-icon><Unlock /></el-icon>
              </template>
            </el-input>
            <div
              style="width: 350px; margin-top: 20px"
              class="code-box"
              v-if="data.authType == 'password'"
            >
              <el-input
                v-model="formData.codeValue"
                size="large"
                auto-complete="off"
                placeholder="验证码"
                style="width: 63%"
                @keyup.enter="handleLogin"
              >
                <template #prefix>
                  <el-icon><Tickets /></el-icon>
                </template>
              </el-input>
              <div class="login-code" style="margin-left: 20px">
                <img
                  :src="data.codeUrl"
                  @click="initGetCodeImg"
                  class="login-code-img"
                />
              </div>
            </div>

            <div style="width: 350px; margin-top: 20px">
              <el-button
                :loading="loading"
                size="large"
                type="danger"
                style="width: 350px"
                @click.prevent="handleLogin"
              >
                <span v-if="!loading">登 录</span>
                <span v-else>登 录 中...</span>
              </el-button>
              <div class="bottom-btn">
                <div style="cursor: pointer" @click.prevent="handRegister">
                  注册账号
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { login, getCodeImg, getCodeValueData } from "@/api/login";
import { ElMessage } from "element-plus";
const router = useRouter();
const emits = defineEmits(["setData", "handRegister"]);
let timeout = null;

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
  },
});

const timeData = ref(0);

const formData = reactive({
  codeValue: "",
  password: "",
  username: "",
});

const data = reactive({
  title: "账户密码登录",
  checkTitle: "手机号快捷登录",
  authType: "password",
  codeUrl: "",
  codeKey: "",
});

const dialog = ref(props.dialogVisible);

const loading = ref(false);

const initFormData = function () {
  formData.codeValue = "";
  formData.password = "";
  formData.username = "";
};

const getCodeValue = async function () {

  const regex = /^1[3-9]\d{9}$/;
    if( !regex.test(formData.phoneNumber)){
      ElMessage({
        message: "请输入正确手机号",
        type: "warning",
      });
      return;

    }



  if (formData.phoneNumber) {
    if (timeData.value !== 0) {
      return;
    }

    timeData.value = 60;

    timeout = setInterval(() => {
      if (timeData.value == 1 || timeData.value < 1) {
        clearInterval(timeout);
      }
      timeData.value = timeData.value - 1;
    }, 1000);

    let resData = await getCodeValueData({
      phoneNumber: formData.phoneNumber,
    });

    console.log(resData, "验证码信息");
  } else {
    ElMessage({
      message: "请先输入手机号",
      type: "warning",
    });
    return;
  }
};

//验证码图形生成
var show_num = [];
onMounted(() => {});
// 登录

const handleLogin = async function () {
  console.log("登录");

  if (!formData.codeValue) {
    ElMessage({
      message: "请先输入验证码",
      type: "warning",
    });
    return;
  }

  if (formData.codeValue !== "0000" && data.authType == "sms") {
    ElMessage({
      message: "验证码不正确",
      type: "warning",
    });
    return;
  }


  if(data.authType == "sms"){

    const regex = /^1[3-9]\d{9}$/;
    if( !regex.test(formData.phoneNumber)){
      ElMessage({
        message: "请输入正确手机号",
        type: "warning",
      });
      return;

    }
  }

  if (data.authType == "password") {
    if (!formData.username) {
      ElMessage({
        message: "请先输入用户名",
        type: "warning",
      });
      return;
    }

    if (!formData.password) {
      ElMessage({
        message: "请先输入用户密码",
        type: "warning",
      });
      return;
    }

    if (!formData.codeValue) {
      ElMessage({
        message: "请先输入验证码",
        type: "warning",
      });
      return;
    }
  } else {
    if (!formData.phoneNumber) {
      ElMessage({
        message: "请先输入手机号",
        type: "warning",
      });
      return;
    }
  }

  initGetCodeImg();

  let resData = await login({
    ...formData,
    codeKey: data.codeKey,
    authType: data.authType,
  });

  console.log(resData, 222222222222);

  if (resData) {
    ElMessage({
      type: "success",
      message: "登录成功",
    });

    localStorage.setItem("token", resData.token);
    emits("setData", {
      key: "dialogVisible",
      value: false,
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
};

//关闭弹框
const dialogClose = function () {
  emits("setData", {
    key: "dialogVisible",
    value: false,
  });
};

const handRegister = function () {
  console.log("点击注册接口");
  emits("setData", {
    key: "dialogVisible",
    value: false,
  });

  emits("handRegister");
};

const checkLogin = function () {
  console.log("切换");

  initFormData();

  if (data.authType == "sms") {
    data.authType = "password";
    data.title = "账户密码登录";
    data.checkTitle = "手机号快捷登录";
  } else {
    data.authType = "sms";
    data.title = "手机号快捷登录";
    data.checkTitle = "账户密码登录";
  }
};

const initGetCodeImg = async function () {
  let resData = await getCodeImg();
  data.codeUrl = resData.codeValue;
  data.codeKey = resData.codeKey;
};

initGetCodeImg();
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
  height: 450px;

  .login-img {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .container {
    width: 700px;

    .login-title {
      text-align: center;
      font-size: 28px;
      color: #000000;
      padding-top: 10px;
      font-weight: 600;
    }

    .check-tab {
      display: flex;
      justify-content: flex-end;
      color: #609FF4;
      margin-right: 12%;
      margin-top: 5px;
      cursor: pointer;
    }

    .login-btn-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 20px;
      justify-content: center;
    }

    .code-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }

    .bottom-btn {
      display: flex;
      justify-content: flex-end;
      color: #2477ef;
      margin-top: 10px;
    }
  }


}




</style>
