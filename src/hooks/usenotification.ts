import { ElNotification } from 'element-plus'
import type { NotificationOptions } from 'element-plus'

export function useNotification() {
  const notify = (options: NotificationOptions): void => {
    ElNotification(options)
  }

  return { notify }
}
