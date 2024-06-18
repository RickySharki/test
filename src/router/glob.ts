// import type { RouteComponent, RouteMeta, RouteRecordRaw } from 'vue-router'

// // 导入 layout 组件
// import MainLayout from '../layout/index.vue'

// function getRouterMeta() {
//   const routerMeta = import.meta.glob('../pages/**/meta.ts', {
//     eager: true,
//     import: 'default',
//   })
//   return routerMeta
// }

// const getComponents = import.meta.glob('../pages/**/*.vue', { eager: true, import: 'default' })
// console.log('🚀 ~ file: glob.ts:12 ~ getComponents:', getComponents)
// // 读取meta的数据，判断是否是layout的children
// // 自动注册路由
// export const vueRouters = function (): Array<RouteRecordRaw> {
//   const pageMeta = getRouterMeta()
//   const routes: Array<RouteRecordRaw> = []
//   const layoutRoutes: RouteRecordRaw = {
//     path: '/',
//     component: MainLayout,
//     children: [],
//   }

//   const processRoute = (path: string, name: string, componentPath: string, config: RouteMeta): RouteRecordRaw => {
//     return {
//       path,
//       name,
//       component: getComponents[componentPath] as RouteComponent,
//       meta: config,
//       children: getChildrenRoutes(path),
//     }
//   }

//   const getChildrenRoutes = (parentPath: string): RouteRecordRaw[] => {
//     const childrenRoutes: RouteRecordRaw[] = []
//     Object.entries(pageMeta).forEach(([childPath, childConfig]) => {
//       const childMetaPath = childPath.replace('../pages', '').replace('/meta.ts', '')
//       if (childMetaPath.startsWith(`${parentPath}/`)) {
//         const childName = childMetaPath.split('/').filter(Boolean).join('-')
//         const childComponentPath = childPath.replace('meta.ts', 'index.vue')
//         childrenRoutes.push(processRoute(childMetaPath, childName, childComponentPath, childConfig as RouteMeta))
//       }
//     })
//     return childrenRoutes
//   }

//   Object.entries(pageMeta).forEach(([pagePath, config]): void => {
//     const path = pagePath.replace('../pages', '').replace('/meta.ts', '')
//     const name = path.split('/').filter(Boolean).join('-')
//     const componentPath = pagePath.replace('meta.ts', 'index.vue')

//     if ((config as RouteMeta).isChild)
//       layoutRoutes.children?.push(processRoute(path, name, componentPath, config as RouteMeta))
//     else
//       routes.push(processRoute(path, name, componentPath, config as RouteMeta))
//   })

//   // 添加 layout 路由（即使没有子路由）
//   routes.push(layoutRoutes)
//   console.log(routes)

//   return routes
// }
