import mitt, { type Emitter } from 'mitt'
import type { NotificationOptions } from 'element-plus'

// 定义事件类型
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Events = {
  'info': NotificationOptions
}
// 创建并导出 mitt 实例
const emitter: Emitter<Events> = mitt<Events>()

export default emitter
