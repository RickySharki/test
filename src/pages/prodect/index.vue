<template>
  <h1>{{ t('hello.hi') }}</h1>
  <RouterView />
</template>

<script lang="ts" setup>
import { useLocalesStore } from '@store/mouldes/locales'
import { useI18n } from 'vue-i18n'
import { useUserInfoStore } from '@store/mouldes/user'
import { ElMessage } from 'element-plus'
import comp from './components/index.vue'

const store = useUserInfoStore()
const router = useRouter()
const mistake = async () => {
  try {
    const res = await store.getmistake()
    console.log(res)
    if (res.code === 500) {
      ElMessage({
        message: '这是一个错误访问',
        type: 'error',
      })
    }
  }
  catch (error) {
    // 处理请求失败的情况
    console.error('请求失败:', error)
  }
}

const { lang } = toRefs(useLocalesStore())
const { t } = useI18n()
const options = [
  {
    value: 'zh-EN',
    label: '英语',
    key: 0,
  }, {
    value: 'zh-CN',
    label: '家乡话',
    key: 1,
  },
]
</script>
