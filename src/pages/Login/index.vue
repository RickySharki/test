<template>
  <div>
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

const router = useRouter()
console.log('🚀 ~ file: index.vue:53 ~ router:', router)
const store = useUserInfoStore()
const formRef = ref<FormInstance>()
const loginForm = reactive<LoginForm>({
  userName: '',
  passWord: '',
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl)
    return
  // validate()用于对表单进行验证
  formEl.validate(async (valid) => {
    // valid为表单验证结果
    if (valid) {
      const res = await store.Login(loginForm)
      console.log(res)
      if (res?.token)
        router.push('/home')
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
  // resetFields()用于重置表单字段，将表单字段的值重置为初始值
  formEl.resetFields()
}
</script>

  <style lang="scss"></style>
