<template>
  <div class="box">
    <img src="../../assets/404.png" alt="">
    <button class="home-button" @click="gohome()">
      首页
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const $router = useRouter()
const gohome = () => {
  $router.push('/layout/home')
}
</script>

<style scoped lang="scss">
.box {
  position: relative; /* 将父元素设置为相对定位 */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .home-button {
    position: absolute; /* 将按钮设置为绝对定位 */
    top: 10px; /* 调整按钮在父元素中的垂直位置 */
    left: 20%; /* 水平居中 */
    width: 50px;
    height: 50px;
    background-color: aqua;
  }
}
</style>
