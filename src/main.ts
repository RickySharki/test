import { createApp } from 'vue'
// 引入全局样式
import App from './App.vue'
// 引入路由配置
import { setupRouter } from './router'
// 导入 全局ui样式
import 'element-plus/dist/index.css'
// 导入 Windi CSS 样式
import 'virtual:windi.css'
// 引入pinia仓库
import { setupStore } from './store'
// 按需引入elementui组件库
import { setupElementPlus } from './utils/registerElement'
// 引入国际
import { setupI18n } from './locales/index'

// 这里使用函数的方法进行注册，是为了处理一下异步的情况，可以使用async/await
async function init() {
  // 创建 Vue 应用
  const app = createApp(App)
  // 注册 pinia
  setupStore(app)
  // 获取 store 实例
  // const userInfoStore = useUserInfoStore()
  // 设定路由和其他插件
  setupRouter(app)
  setupElementPlus(app)
  setupI18n(app)
  // 检查并加载动态路由
  // if (userInfoStore.userInfo?.role)
  // 挂载应用
  app.mount('#app')
}
init()
