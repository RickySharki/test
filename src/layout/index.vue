<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="layout-menu">
        <Menu />
      </el-aside>
      <el-container>
        <el-header class="layout-header">
          <Header />
        </el-header>
        <el-main class="layout-main">
          <Main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Header from './header/index.vue'
</script>

<style scoped lang="scss">
.common-layout{
  .el-header{
      padding: 0 !important;
    }
  .layout-menu{
    border-right: 1px solid #E4E7ED;
    width: 250px ;
    height: 100vh;
    background-color: rgb(48, 65, 86);
  }
  .layout-header{
    color: white;
    height: 50px;
  }
  .layout-main{
    color: black;
    height: 50px;
    background-color: white;
  }

}
</style>
