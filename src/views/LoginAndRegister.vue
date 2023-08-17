<template>
  <div>
    <Dialog
      :show="dialogConfig.show"
      :title="dialogConfig.title"
      :buttons="dialogConfig.buttons"
      width="400px"
      :showCancel="false"
      @close="dialogConfig.show = false"
    >
      <el-form
        class="login-register"
        :model="formData"
        ref="formDataRef"
        :rules="rules"
      >
        <el-form-item prop="email">
          <el-input
            v-model="formData.email"
            size="large"
            clearable
            placeholder="请输入邮箱"
            maxLength="150"
          >
            <template #prefix>
              <span class="iconfont icon-account"></span>
            </template>
          </el-input>
        </el-form-item>
        <!-- 登录密码-->
        <el-form-item prop="password" v-if="opType === 1">
          <el-input
            v-model="formData.password"
            size="large"
            placeholder="请输入密码"
            :type="passwordEyeType.passwordEyeOpen ? 'text' : 'password'"
          >
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
            <template #suffix>
              <span
                @click="eyeChange('passwordEyeOpen')"
                :class="[
                  'iconfont',
                  passwordEyeType.passwordEyeOpen
                    ? 'icon-eye'
                    : 'icon-close-eye',
                ]"
              ></span>
            </template>
          </el-input>
        </el-form-item>
        <!-- 注册 -->
        <div v-if="opType === 0 || opType === 2">
          <el-form-item prop="emailCode">
            <div class="send-email-panel">
              <el-input
                v-model="formData.emailCode"
                size="large"
                clearable
                placeholder="请输入邮箱验证码"
              >
                <template #prefix>
                  <span class="iconfont icon-checkcode"></span>
                </template>
              </el-input>
              <el-button
                class="send-email-btn"
                type="primary"
                size="large"
                @click="getEmailCode"
                >获取验证码</el-button
              >
            </div>
            <el-popover placement="left" :width="500" trigger="click">
              <div>
                <p>1、在垃圾想中查找邮箱验证码</p>
                <p>2、在邮箱中设置白名单（微信登录与qq登录方法不尽相同）</p>
                <p>3、将【1264625373@qq.com】添加到白名单</p>
              </div>
              <template #reference>
                <span class="a-link" style="font-size: 14px"
                  >未收到邮箱验证码?</span
                >
              </template>
            </el-popover>
          </el-form-item>
          <el-form-item prop="nickName" v-if="opType === 0">
            <el-input
              v-model="formData.nickName"
              size="large"
              clearable
              placeholder="请输入昵称"
              maxLength="20"
            >
              <template #prefix>
                <span class="iconfont icon-account"></span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="registerPassword">
            <el-input
              v-model="formData.registerPassword"
              size="large"
              placeholder="请输入密码"
              :type="
                passwordEyeType.registerPasswordEyeOpen ? 'text' : 'password'
              "
            >
              <template #prefix>
                <span class="iconfont icon-password"></span>
              </template>
              <template #suffix>
                <span
                  @click="eyeChange('registerPasswordEyeOpen')"
                  :class="[
                    'iconfont',
                    passwordEyeType.registerPasswordEyeOpen
                      ? 'icon-eye'
                      : 'icon-close-eye',
                  ]"
                ></span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="reRegisterPassword">
            <el-input
              v-model="formData.reRegisterPassword"
              size="large"
              placeholder="请再次输入密码"
              :type="
                passwordEyeType.reRegisterPasswordEyeOpen ? 'text' : 'password'
              "
            >
              <template #prefix>
                <span class="iconfont icon-password"></span>
              </template>
              <template #suffix>
                <span
                  @click="eyeChange('reRegisterPasswordEyeOpen')"
                  :class="[
                    'iconfont',
                    passwordEyeType.reRegisterPasswordEyeOpen
                      ? 'icon-eye'
                      : 'icon-close-eye',
                  ]"
                ></span>
              </template>
            </el-input>
          </el-form-item>
        </div>
        <el-form-item prop="checkCode">
          <div class="check-code-panel">
            <el-input
              v-model="formData.checkCode"
              size="large"
              clearable
              placeholder="请输入验证码"
            >
              <template #prefix>
                <span class="iconfont icon-checkcode"></span>
              </template>
            </el-input>
            <img
              :src="checkCodeUrl"
              alt=""
              class="check-code"
              @click="changeCheckCode(0)"
            />
          </div>
        </el-form-item>
        <el-form-item v-if="opType === 1">
          <div class="rememberme-panel">
            <el-checkbox v-model="formData.rememberMe" :label="true"
              >记住我</el-checkbox
            >
          </div>
          <div class="no-account">
            <a href="javascript:void(0)" class="a-link" @click="showPanel(2)"
              >忘记密码</a
            >
            <a href="javascript:void(0)" class="a-link" @click="showPanel(0)"
              >没有账号?</a
            >
          </div>
        </el-form-item>
        <el-form-item v-if="opType === 0">
          <a href="javascript:void(0)" class="a-link" @click="showPanel(1)"
            >已有账号?</a
          >
        </el-form-item>
        <el-form-item v-if="opType === 2">
          <a href="javascript:void(0)" class="a-link" @click="showPanel(1)"
            >去登录?</a
          >
        </el-form-item>
        <el-form-item>
          <el-button class="opt-button" type="primary" size="default" @click="doSumit">
            <span v-if="opType === 0">注册</span>
            <span v-if="opType === 1">登录</span>
            <span v-if="opType === 2">重置密码</span>
          </el-button>
        </el-form-item>
      </el-form>
    </Dialog>
    <!-- 发送邮箱验证码 -->
    <Dialog
      :show="dialogConfig4SendemailCode.show"
      :title="dialogConfig4SendemailCode.title"
      :buttons="dialogConfig4SendemailCode.buttons"
      width="500px"
      :showCancel="false"
      @close="dialogConfig4SendemailCode.show = false"
    >
      <el-form
        :model="formData4SendMailCode"
        ref="formData4SendMailCodeRef"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="邮箱"> {{ formData.email }} </el-form-item>
        <el-form-item prop="checkCode" label="验证码">
          <div class="check-code-panel">
            <el-input
              v-model="formData4SendMailCode.checkCode"
              size="large"
              placeholder="请输入验证码"
            >
              <template #prefix>
                <span class="iconfont icon-checkcode"></span>
              </template>
            </el-input>
            <img
              :src="checkCodeUrl4SendMailCode"
              alt=""
              class="check-code"
              @click="changeCheckCode(1)"
            />
          </div>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const { proxy } = getCurrentInstance()
const api = {
  checkCode: '/api/checkCode',
  sendMailCode: '/sendEmailCode',
  register: '/register',
  login: '/login',
  resetPwd: '/resetPwd'
}
// 登录注册弹窗
const dialogConfig = reactive({
  show: false,
  title: '标题',
})

const formData4SendMailCode = ref({})
const formData4SendMailCodeRef = ref()
// 发送邮箱验证码弹窗
const dialogConfig4SendemailCode = reactive({
  show: false,
  title: '发送邮箱验证码',
  buttons:[
    {
      type:"primary",
      text:"发送验证码",
      click:()=>{
        sendEmailCode()
      }
    }
  ]
})

// 获取邮箱验证码
const getEmailCode = () => {
  formDataRef.value.validateField("email",(valid) => {
    if(!valid){
      return
    }
    dialogConfig4SendemailCode.show = true
    nextTick(()=>{
      changeCheckCode(1)
      formData4SendMailCodeRef.value.resetFields()
      formData4SendMailCode.value = {
        email:formData.value.email
      }
    })
  })
}

//发送验证码 
const sendEmailCode = () => {
  formData4SendMailCodeRef.value.validate(async (valid) => {
    if(!valid){
      return
    }
    const params = Object.assign({},formData4SendMailCode.value) 
    params.type = opType.value === 0 ? 0 : 1;
    let result = await proxy.request({
       url:api.sendMailCode,
       params:params,
       errorCallback: () => {
        changeCheckCode(1)
       }
    })
    if(!result){
      return null
    }
    proxy.Message.success("验证码发送成功，登录邮箱查看")
    dialogConfig4SendemailCode.show =  false
  })
}

//检查两次输入密码是否一致
const checkRePassword = (rule, value, callback) => {
  if (value !== formData.value.registerPassword) {
    callback(new Error(rule.message))
  } else {
    callback()
  }
}

// 0是注册，1是登录，2是找回密码
const opType = ref()
const showPanel = (type) => {
  opType.value = type
  resetForm()
}
//验证码
const checkCodeUrl = ref(api.checkCode)
const checkCodeUrl4SendMailCode = ref(api.checkCode)
const changeCheckCode = (type) => {
  if (type === 0) {
    checkCodeUrl.value =
      api.checkCode + '?type=' + type + '&time=' + new Date().getTime()
  } else {
    checkCodeUrl4SendMailCode.value =
      api.checkCode + '?type=' + type + '&time=' + new Date().getTime()
  }
}

//显示密码和隐藏操作
const passwordEyeType = reactive({
  passwordEyeOpen: false,
  registerPasswordEyeOpen: false,
  reRegisterPasswordEyeOpen: false,
})
const eyeChange = (type) => {
  passwordEyeType[type] = !passwordEyeType[type]
}

const formData = ref({})
const formDataRef = ref()
const rules = {
  email: [
    { required: true, message: '请输入邮箱' },
    { max: 20, message: '邮箱过长' },
    { validator: proxy.Verify.email, message: '请输入正确的邮箱' },
  ],
  password: [{ required: true, message: '请输入密码' }],
  emailCode: [{ required: true, message: '请输入邮箱验证码' }],
  nickName: [{ required: true, message: '请输入昵称' }],
  registerPassword: [
    { required: true, message: '请输入密码' },
    {
      validator: proxy.Verify.password,
      message: '密码只能是数字、字母、特殊字符 8-18位',
    },
  ],
  reRegisterPassword: [
    { required: true, message: '请输入密码' },
    { validator: checkRePassword, message: '两次输入的密码不一致' },
  ],
  checkCode: [{ required: true, message: '请输入图片验证码' }],
}

//重置表单
const resetForm = () => {
  dialogConfig.show = true
  if (opType.value === 0) {
    dialogConfig.title = '注册'
  } else if (opType.value === 1) {
    dialogConfig.title = '登录'
  } else if (opType.value === 2) {
    dialogConfig.title = '重置密码'
  }
  //将form表单重置 - 刷新表单数据
  nextTick(() => {
    changeCheckCode(0);
    formDataRef.value.resetFields();
  })
}

// 登录、注册、重置密码、提交表单
const doSumit = () => {
  console.log(formData.value);
  formDataRef.value.validate(async (valid) => {
    if(!valid){
      return;
    }
    let params = {}
    Object.assign(params,formData.value)
    console.log('params:',params);
    // 注册
    if(opType.value === 0 || opType.value === 2){
      params.password = params.registerPassword;
      delete params.registerPassword;
      delete params.reRegisterPassword;
    }
    let url = null;
    if(opType.value === 0){
      url = api.register;
    }else if(opType.value === 1){
      url = api.login;
    }else if(opType.value === 2){
      url = api.resetPwd
    }

    let result = await proxy.request({
      url:url,
      params:params,
      errorCallback:() => {
        changeCheckCode(0)
      }
    })
    if(!result){
      return null
    }
    // opType 0是注册，1是登录，2是找回密码
    if(opType.value === 0){
      proxy.Message.success("注册成功，请登录")
      showPanel(1)
    }else if(opType.value === 1){ 

    }else if(opType.value === 2){
      proxy.Message.success("重置密码成功，请登录")
      showPanel(1);
    }
  })
}


defineExpose({ showPanel })
</script>

<style lang="scss" scoped>
.check-code-panel {
  display: flex;
  .check-code {
    margin-left: 5px;
    cursor: pointer;
  }
}
.login-register {
  .send-email-panel {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .send-email-btn {
      margin-left: 5px;
    }
  }

  .rememberme-panel {
    width: 100%;
  }

  .no-account {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .opt-button {
    width: 100%;
  }
}
</style>
