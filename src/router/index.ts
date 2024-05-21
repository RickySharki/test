import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserInfoStore } from '@store/mouldes/user'
import { asyncRoutes, baseRoutes } from './routes'

const ALL_PATH_LIST: string[] = []

const getRoutePaths = (array: RouteRecordRaw[], parentPath = '', isChild = false) =>
  array.forEach((item) => {
    const realPath = isChild ? `/${item.path}` : item.path
    const fullPath = parentPath + realPath
    ALL_PATH_LIST.push(fullPath)
    if (item.children)
      getRoutePaths(item.children, fullPath, true)
  })

getRoutePaths([...baseRoutes, ...asyncRoutes])

// 创建一个可以被 Vue 应用程序使用的路由实例
export const router = createRouter({
  history: createWebHistory(),
  routes: baseRoutes as RouteRecordRaw[], // 初始只加载基础路由
  strict: true,
})

// 重置路由
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !ALL_PATH_LIST.includes(name as string))
      router.hasRoute(name) && router.removeRoute(name)
  })
}

// 路由守卫鉴权
// function filterAsyncRoute(asnycRoute: any, role: any) {
//   return asnycRoute.filter((item: any) => {
//     if (item.meta && Array.isArray(item.meta.roles) && item.meta.roles.includes(role)) {
//       if (item.children && item.children.length > 0)
//         item.children = filterAsyncRoute(item.children, role)
//       return true
//     }
//     return false
//   })
// }

router.beforeEach(async (to, from, next) => {
  console.log(to.path)
  const userInfoStore = useUserInfoStore()
  const token = userInfoStore.userInfo ? userInfoStore.userInfo.token : null
  if (!token && to.path !== '/login') {
    next({ path: '/login' })
  }
  else {
    if (!ALL_PATH_LIST.includes(to.path)) {
      console.log(ALL_PATH_LIST)
      next({ path: '/404' })
    }
    next()
  }
})
// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router)
}
