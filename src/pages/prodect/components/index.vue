<template>
  <div>
    <button v-has="'admin'" style="background-color: aqua; margin-right: 50px">
      Admin Button
    </button>
    <button v-has="'admin'" style="background-color: aqua; margin-right: 50px">
      User Button
    </button>
    <button v-has="'role'" style="background-color: aqua; margin-right: 50px">
      Role Button
    </button>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑
</script>

<style scoped>
/* 你的样式 */
</style>
