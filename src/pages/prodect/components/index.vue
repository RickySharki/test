<template>
  <div>
    <button v-permission="'admin'" style="background-color: aqua; margin-right: 50px">
      Admin Button
    </button>
    <button v-permission="'user'" style="background-color: aqua; margin-right: 50px">
      User Button
    </button>
    <button v-permission="['admin', 'user']" v-clickOutside="closeMessage" style="background-color: aqua; margin-right: 50px" @click="debouncedShowMsg">
      All Role Button
    </button>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑
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
    timeout = setTimeout(() => fn.apply(this, args), time)
  }
}
const debouncedShowMsg = debounce(toShowMsg, 500)
const closeMessage = () => {
  ElMessage.closeAll()
}
</script>

<style scoped>
/* 你的样式 */
</style>
