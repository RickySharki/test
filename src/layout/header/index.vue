<template>
  <div class="header">
    <div class="header-content">
      <p>Welcome</p>
      <div class="avatar">
        <img src="src/assets/头像.png" alt="User Avatar">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ store.userInfo?.userName }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUserInfoStore } from '@store/mouldes/user'
const store = useUserInfoStore()
const logout = () => {
  store.clearUserInfo()
  // 重定向到首页
  window.location.href = '/login'
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  padding: 20px;
  height:50px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000; /* Ensure it's on top */
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

.avatar {
  display: flex;
  margin-left:500px ;
}

.avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.el-dropdown-link{
  p{
    top: 30px;
  }
}
</style>
