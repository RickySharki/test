<template>
  <div>
    <button v-permission="'admin'" style="background-color: aqua; margin-right: 50px">
      Admin Button
    </button>
    <button v-permission="'user'" style="background-color: aqua; margin-right: 50px" @click="toEmit">
      User Button
    </button>
    <button v-permission="['admin', 'user']" v-clickOutside="closeMessage" style="background-color: aqua; margin-right: 50px" @click="debouncedShowMsg">
      All Role Button
    </button>
    <button style="background-color: aqua; margin-right: 50px" @click="openDialog">
      openDialog
    </button>
    <!-- <ElDialog>.....</ElDialog> -->
  </div>
  <div style="margin-top: 20px;">
    <span>当前时间{{ now }}</span>
  </div>
  <div class="clock">
    <button class="clock-button" @click="pause">
      暂停
    </button>
    <button class="clock-button" @click="resume">
      继续
    </button>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑
import { useUserInfoStore } from '@store/mouldes/user'
import { ElDialog, type NotificationOptions } from 'element-plus'
import { useDialog } from '@hooks/useDialog'
import Pic from '@pages/picture/index.vue'
import { useTimeNow } from '@hooks/useTimeNow'
import emitter from '../../../utils/mitt'
const { openDialog } = useDialog(Pic, {
  dialogSlots: {
    header: () => 'this is header',
    footer: () => 'this is footer',
  },
})
const num = ref(0)
const toShowMsg = () => {
  ElMessage.info(`这是第${num.value++}次`)
}
// modelValue 父组件传入的值 props.value
// @updateValue 更新父组件传入的值 emit('update:value',val)
function debounce(fn: any, time: number) {
  let timeout: any
  return function (...args: any) {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), time)
  }
}
const debouncedShowMsg = debounce(toShowMsg, 500)
const closeMessage = () => {
  ElMessage.closeAll()
}
const role = useUserInfoStore().userInfo?.role

const toEmit = () => {
  const list = {
    title: 'Notification Title',
    message: `this is ${role}`,
    type: 'success',
    duration: 3000,
  }
  emitter.emit('info', list as NotificationOptions)
}
const { now, pause, resume } = useTimeNow()
</script>

<style scoped>
.clock{
  display: flex;
  justify-content: flex-start;
}
.clock-button {
  width: 40px;
  background-color: rgb(64, 211, 231);
  margin-right: 10px; /* 设置按钮之间的间隔 */
}
</style>
