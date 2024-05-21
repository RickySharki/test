import { defineStore } from 'pinia'
import { useUserInfoStore } from '@store/mouldes/user'
import { router } from 'src/router'
import { asyncRoutes } from 'src/router/routes'
import { cloneDeep } from 'lodash-es'

function filterAsyncRoute(asnycRoute: any, role: any) {
  return asnycRoute.filter((item: any) => {
    if (item.meta && Array.isArray(item.meta.roles) && item.meta.roles.includes(role)) {
      if (item.children && item.children.length > 0)
        item.children = filterAsyncRoute(item.children, role)
      return true
    }
    return false
  })
}
export const useAuthStore = defineStore('auth', () => {
  const userInfoStore = useUserInfoStore()

  const loadAdminRoutes = () => {
    const role = userInfoStore.userInfo?.role
    if (role) {
      const adminRoutes = filterAsyncRoute(cloneDeep(asyncRoutes), role)
      adminRoutes.forEach((route) => {
        router.addRoute(route)
      })
      userInfoStore.setAdminRoutes(adminRoutes)
    }
  }

  return {
    loadAdminRoutes,
  }
})
