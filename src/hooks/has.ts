import type { App } from 'vue'

export const hasbutton = (app: App) => {
  app.directive('has', {
    mounted(el: any, binding: any) {
      const arr = ['admin', 'role']
      if (!arr.includes(binding.value))
        el.parentNode?.removeChild(el)
    },
  },
  )
}
