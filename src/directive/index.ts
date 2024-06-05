import type { App, DirectiveBinding } from 'vue'
import { useUserInfoStore } from '@store/mouldes/user'
const hasPermission = (value: string | string[], role: string) => {
  if (Array.isArray(value))
    return value.includes(role)
  return value === role
}

export const hasbutton = (app: App) => {
  app.directive('permission', {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      const role = useUserInfoStore().userInfo?.role
      const permission = hasPermission(binding.value, role as string)
      !permission && el.parentNode?.removeChild(el)
    },
  },
  )
}
