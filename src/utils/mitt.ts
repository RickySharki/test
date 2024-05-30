import mitt from 'mitt'
// 定义事件类型
type NotificationType = 'success' | 'warning' | 'info' | 'error'

interface CustomNotificationOptions {
  title?: string
  message: string
  type?: NotificationType
  duration?: number // in milliseconds
}
// 定义事件类型
interface Events {
  info: CustomNotificationOptions
  // 你可以添加其他事件类型
}
// 创建并导出 mitt 实例
const emitter = mitt<Events>()

export default emitter
