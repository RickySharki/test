import { defineStore } from 'pinia'
import { computed } from 'vue'
import { usePromise } from '@utils/usePromise'
import { login, mistake, notfind } from '@http/user'
import type { LoginForm } from '@model/user'

export const useUserInfoStore = defineStore('user-info', () => {
  const { result: userInfo, isLoading, refresh: Login } = usePromise((url: string, form: LoginForm) => form ? login(url, form) : null)
  const { result: userNotFound, refresh: getError } = usePromise<any>(() => notfind())
  const { result: usermistake, refresh: getmistake } = usePromise<any>(() => mistake())

  const token = computed(() => userInfo.value?.token)
  const role = computed(() => userInfo.value?.role)
  const adminRoutes = ref([])
  const setAdminRoutes = (routes) => {
    adminRoutes.value = routes
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
  }
}, {
  persist: true,
})
