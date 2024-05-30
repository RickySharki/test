// src/hooks/useNotification.ts
import { ElNotification } from 'element-plus'

type NotificationType = 'success' | 'warning' | 'info' | 'error'
export interface NotificationOptions {
  title?: string
  message: string
  type?: NotificationType
  duration?: number // in milliseconds
}
export const Notification = () => {
  const notify = ({ title = '', message, type = 'info', duration = 3000 }: NotificationOptions) => {
    ElNotification({
      title,
      message,
      type,
      duration,
    })
  }
  return {
    notify,
  }
}
