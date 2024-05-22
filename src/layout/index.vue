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
  .layout-menu{
    color: red;
    border-right: 1px solid #E4E7ED;
    width: 250px ;
    height: 100vh;
    background-color:#9e7817 ;
  }
  .layout-header{
    color: white;
    height: 50px;
    background-color: cadetblue ;
  }
  .layout-main{
    color: black;
    height: 50px;
    background-color: white;
  }

}
</style>
