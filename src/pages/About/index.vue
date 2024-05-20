<template>
  <h1>about</h1>
  <el-button @click="toError">
    to404
  </el-button>
</template>

<script lang="ts" setup>
import { useUserInfoStore } from '@store/mouldes/user'
const toError = async () => {
  await useUserInfoStore().getError()
}
</script>

  <style lang="scss"></style>
