<template>
  <div class="data">
    <el-config-provider :locale="lang">
      <RouterView />
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { useLocalesStore } from '@store/mouldes/locales'
const { lang } = toRefs(useLocalesStore())
</script>

<style scoped>
.data{
  height: 100vh;
  width: 100vw;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
