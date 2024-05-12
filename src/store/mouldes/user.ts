import { defineStore } from 'pinia'
import { usePromise } from '@utils/usePromise'
import { login, notfind,mistake } from '@http/user'
import type { LoginForm } from '@model/user'

export const useUserInfoStore = defineStore('user-info', () => {
  //  使用 usePromise 自定义 hook 来处理异步操作
  // 函数接收一个 form 参数，如果 form 存在，则调用 login 函数进行登录操作，否则返回 null
  const { result: userInfo, isLoading, refresh: Login } = usePromise((form: LoginForm) => form ? login(form) : null)
  const { result: userNotFound, refresh: getError } = usePromise<any>(() => notfind())
  const { result: usermistake, refresh: getmistake } = usePromise<any>(() => mistake())

  const token = computed(() => userInfo.value?.token)
  return {
    userInfo,
    isLoading,
    Login,
    token,
    userNotFound,
    getError,
    usermistake,
    getmistake,
  }
}, {
  persist: true,
})
