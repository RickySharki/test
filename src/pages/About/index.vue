<template>
  <h1>about</h1>
  <el-button @click="toError">
    to404
  </el-button>
</template>

<script lang="ts" setup>
import { useUserInfoStore } from '@store/mouldes/user'
import { useRoute } from 'vue-router'
const toError = async () => {
  await useUserInfoStore().getError()
}
const $route = useRoute()
console.log($route.matched)
</script>

<style lang="scss"></style>
