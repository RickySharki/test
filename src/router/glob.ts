import type { RouteComponent, RouteMeta, RouteRecordRaw } from 'vue-router'

// 自动注册路由
// global.ts
function getRouterMeta() {
  // 读取路由元数据meta.ts命名路由
  const routerMeta = import.meta.glob('../pages/**/meta.ts', {
    eager: true,
    import: 'default',
  })
  return routerMeta
}
// 读取vue组件路径
const getComponents = import.meta.glob('../pages/**/*.vue', { eager: true, import: 'default' })
console.log('🚀 ~ file: glob.ts:12 ~ getComponents:', getComponents)
// 自动注册路由
export const vueRouters = function (): Array<RouteRecordRaw> {
  debugger
  // const routerList: Array<RouteRecordRaw> = []
  const pageMeta = getRouterMeta()
  // Object.entries(pageMeta) 将 pageMeta 对象转换为一个数组
  const routerList: Array<RouteRecordRaw> = Object.entries(pageMeta).map(([pagePath, config]): RouteRecordRaw => {
    const path = pagePath.replace('../pages', '').replace('/meta.ts', '')
    const name = path.split('/').filter(Boolean).join('-')
    const component = pagePath.replace('meta.ts', 'index.vue')
    console.log(component)
    // console.log('modules[key]', modules[key])
    // 首字母转小写 letterToLowerCase 首字母转大写 letterToUpperCase
    return {
      path,
      name,
      component: getComponents[component] as RouteComponent,
      meta: config as RouteMeta,
    }
  })
  return routerList
}
