<template>
  <el-dialog
    v-model="dialog"
    width="800"
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
        <div class="login-btn-box">
          <el-input
            v-if="data.type == 'loginUser'"
            v-model="formData.phoneNumber"
            style="width: 350px; margin-top: 20px"
            maxlength="11"
            placeholder="11位手机号"
          >
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>

          <div style="width: 350px; margin-top: 20px" class="code-box">
            <el-input
              v-model="formData.codeValue"
              size="large"
              auto-complete="off"
              placeholder="验证码"
              style="width: 220px"
            >
              <template #prefix>
                <el-icon><Tickets /></el-icon>
              </template>
            </el-input>
            <div class="login-code">
              <el-button
                style="width: 120px"
                :disabled="timeData > 0"
                @click="getCodeValue"
              >
                {{ timeData > 0 ? timeData + "秒" : "发送验证码" }}
              </el-button>
            </div>
          </div>

          <el-input
            v-if="data.type == 'loginUser'"
            v-model="formData.username"
            style="width: 350px; margin-top: 20px"
            placeholder="请输入用户名"
          >
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
          <el-input
            v-model="formData.password"
            style="width: 350px; margin-top: 20px"
            v-if="data.type == 'loginUser'"
            type="password"
            placeholder="请输入密码"
          >
            <template #prefix>
              <el-icon><Unlock /></el-icon>
            </template>
          </el-input>
          <el-input
            v-model="formData.confirmPassword"
            style="width: 350px; margin-top: 20px"
            v-if="data.type == 'loginUser'"
            type="password"
            placeholder="确认密码"
          >
            <template #prefix>
              <el-icon><Unlock /></el-icon>
            </template>
          </el-input>

          <el-form-item style="width: 350px; margin-top: 40px">
            <el-button
              :loading="loading"
              size="large"
              type="primary"
              style="width: 100%"
              @click.prevent="handleRegister"
            >
              <span v-if="!loading">注册</span>
              <span v-else>注册 中...</span>
            </el-button>
            <div class="bottom-btn" style="width: 350px">
              <div style="cursor: pointer" @click.prevent="handLogin">
                使用已有账号登录
              </div>
            </div>
          </el-form-item>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { register, getCodeValueData } from "@/api/login";
import { ElMessage } from "element-plus";

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
  },
});

const dialog = ref(props.dialogVisible);
const emits = defineEmits(["setData", "handLogin"]);
const timeData = ref(0);
const loading = ref(false);

import { useRouter } from "vue-router";

const router = useRouter();
let timeout = null;

const data = reactive({
  title: "手机号注册",
  checkTitle: "手机号快捷登录",
  type: "loginUser",
});

const formData = reactive({
  phoneNumber: "",
  codeValue: "",
  confirmPassword: "",
  password: "",
  username: "",
});

//验证码图形生成
var show_num = [];
onMounted(() => {});
// 登录
function login() {
  // 先验证用户输入的验证码
  // router.push("/home");
  // localStorage.setItem("token", 'token');
}

const handleRegister = async function () {
  console.log("注册");

  if (!formData.phoneNumber) {
    ElMessage({
      message: "请先输入用户手机号",
      type: "warning",
    });
    return;
  } else {
    const pattern = /^1[3-9]\d{9}$/;

    if (!pattern.test(formData.phoneNumber)) {
      ElMessage({
        message: "请输入正确的手机号",
        type: "warning",
      });
      return;
    }
  }

  if (!formData.codeValue) {
    ElMessage({
      message: "请先输入验证码",
      type: "warning",
    });
    return;
  }

  if (!formData.username) {
    ElMessage({
      message: "请先输入用户名",
      type: "warning",
    });
    return;
  }

  if (!formData.password) {
    ElMessage({
      message: "请先输入密码",
      type: "warning",
    });
    return;
  }

  if (!formData.confirmPassword) {
    ElMessage({
      message: "请先输入重复密码",
      type: "warning",
    });
    return;
  } else {
    if (formData.confirmPassword !== formData.password) {
      ElMessage({
        message: "密码必须和重复密码一致",
        type: "warning",
      });
      return;
    }
  }

  let resData = await register(formData);

  emits("setData", {
    key: "registerDialogVisible",
    value: false,
  });

  emits("setData", {
    key: "dialogVisible",
    value: true,
  });

  ElMessage({
    type: "success",
    message: "注册成功",
  });

  console.log(formData, "11111111");
};

const getCodeValue = async function () {
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

//关闭弹框
const dialogClose = function () {
  emits("setData", {
    key: "dialogTableVisible",
    value: false,
  });
};

const handLogin = function () {
  console.log("点击登录接口");

  emits("setData", {
    key: "registerDialogVisible",
    value: false,
  });

  emits("handLogin");
};
</script>

<style lang="scss">
.dialog-login-box {
  .el-dialog__body {
    padding: 0 !important;
  }
  .el-dialog__header {
    // display: none;
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
      padding-top: 10px;
      font-weight: 600;
    }

    .check-tab {
      display: flex;
      justify-content: flex-end;
      color: #e28908;
      margin-right: 20px;
      margin-top: 5px;
      cursor: pointer;
    }

    .login-btn-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 20px;
    }

    .code-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
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
