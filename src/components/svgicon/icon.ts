import * as Icons from '@element-plus/icons'
import App from './App.vue'
// 统一注册图标，key: i+图标名字
export function loadIcon() {
  // 注册ElementIcon
  for (const [key, component] of Object.entries(Icons))
    App.component(key, component)
}
