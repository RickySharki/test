<template>
  <div class="header-content">
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">
        首页
      </el-menu-item>
      <el-menu-item index="2">
        文档
      </el-menu-item>
      <el-menu-item index="3">
        关于
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const activeIndex = ref('1')
</script>

<style scoped lang="scss">
.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

.el-menu-demo {
  display: flex;
  justify-content: space-between ; /* 或者使用 space-between */
  width: 100%;
  border: none; /* 去除边框 */
}

.el-menu-item {
  flex: 1;
  text-align: center;
}
</style>
