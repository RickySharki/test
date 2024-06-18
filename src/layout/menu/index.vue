<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    router
  >
    <div class="title">
      后台管理系统
    </div>
    <template v-for="value in menus" :key="value.path">
      <!-- 两层 -->
      <el-sub-menu v-if="value.children" :index="`/layout/${value.path}`">
        <template #title>
          <el-icon>
            <component :is="value.meta.icon" />
          </el-icon>
          <span>{{ value.meta.title }}</span>
        </template>
        <template v-for="item in value.children" :key="item.path">
          <el-menu-item :index="`/layout/${value.path}/${item.path}`">
            <el-icon>
              <component :is="item.meta.icon" />
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </el-menu-item>
        </template>
      </el-sub-menu>
      <!-- 一层 -->
      <el-menu-item v-else :index="`/layout/${value.path}`">
        <el-icon>
          <component :is="value.meta.icon" />
        </el-icon>
        <span>{{ value.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import { useUserInfoStore } from '@store/mouldes/user'
import { asyncRoutes, baseRoutes } from '@router/routes'

// const routeStore = useUserInfoStore()
const layoutRoute = asyncRoutes.find(route => route.path === '/layout')
const menus = ref(layoutRoute ? layoutRoute.children : [])
</script>

<style lang="scss" scoped>
.title{
  color: #f6f6f8;
  height: 30px;
  font-size: 20px;
  text-align: center;
  background-color: rgb(48, 65, 86)
}
.el-menu-item{
  padding-left: 20px;
  color: rgb(191, 203, 217);
  background-color: rgb(48, 65, 86);
}
.icons {
  width: 18px;
  height: 18px;
  margin-right: 4px;
}
.el-menu-vertical-demo {
  width: 100%;
  border-right: none;
  h3 {
    color: #fff;
    text-align: center;
    margin-top: 10px;
  }
}
</style>
