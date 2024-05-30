<template>
  <div class="data">
    <el-config-provider :locale="lang">
      <RouterView />
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { useLocalesStore } from '@store/mouldes/locales' // 修正路径
import { Notification } from './hooks/usenotification'
import type { NotificationOptions } from './hooks/usenotification'
import emitter from './utils/mitt'
const { lang } = toRefs(useLocalesStore())
const notify = Notification().notify // 修正变量名
const open = (list: NotificationOptions) => {
  notify(list) // 修正函数调用
}
emitter.on('info', (list: NotificationOptions) => {
  open(list)
})
</script>

<style scoped>
.data {
  height: 100vh;
  width: 100%;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
