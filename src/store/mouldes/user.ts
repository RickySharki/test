import { defineStore } from 'pinia'
import { computed } from 'vue'
import { usePromise } from '@utils/usePromise'
import { login, mistake, notfind } from '@http/user'
import type { LoginForm, Route } from '@model/user'

export const useUserInfoStore = defineStore('user-info', () => {
  const { result: userInfo, isLoading, refresh: Login } = usePromise((url: string, form: LoginForm) => form ? login(url, form) : null)
  const { result: userNotFound, refresh: getError } = usePromise<any>(() => notfind())
  const { result: usermistake, refresh: getmistake } = usePromise<any>(() => mistake())

  const token = computed(() => userInfo.value?.token)
  const role = computed(() => userInfo.value?.role)
  const adminRoutes = ref<Route[]>([])
  const setAdminRoutes = (routes: Route[]) => {
    adminRoutes.value = routes
  }

  // 清除用户信息方法
  const clearUserInfo = () => {
    userInfo.value = null
    // 可以在这里清除其他用户相关数据
  }

  return {
    adminRoutes,
    setAdminRoutes,
    userInfo,
    isLoading,
    Login,
    token,
    role,
    userNotFound,
    getError,
    usermistake,
    getmistake,
    clearUserInfo, // 添加清除用户信息方法
  }
}, {
  persist: true,
})
