<template>
  <div class="form-container">
    <el-form
      ref="formRef"
      :model="loginForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="userName"
        prop="userName"
        :rules="[
          { required: true, message: 'userName is required' },
        ]"
      >
        <el-input
          v-model.number="loginForm.userName"
          type="text"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="passWord"
        prop="passWord"
        :rules="[
          { required: true, message: 'passWord is required' },
        ]"
      >
        <el-input
          v-model.number="loginForm.passWord"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">
          Submit
        </el-button>
        <el-button @click="resetForm(formRef)">
          Reset
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import type { LoginForm } from '@model/user'
import type { FormInstance } from 'element-plus'
import { useUserInfoStore } from '@store/mouldes/user'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@store/mouldes/auth'

const authStore = useAuthStore()
const router = useRouter()
const store = useUserInfoStore()
const formRef = ref<FormInstance>()
const loginForm = reactive<LoginForm>({
  userName: '',
  passWord: '',
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl)
    return
  formEl.validate(async (valid) => {
    if (valid) {
      const url = loginForm.userName === 'admin' ? '/login/admin' : '/login/user'
      const res = await store.Login(url, loginForm)
      if (res?.token)
        // authStore.loadAdminRoutes()
        // localStorage.setItem('token', res.token)
        router.push('/layout')
    }
    else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl)
    return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height */
}

.el-form {
  width: 400px; /* Set a fixed width */
  padding: 20px;
  background-color: #fff; /* Background color */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); /* Shadow for the form */
}
</style>
