import type { DirectiveBinding } from 'vue'

// const ClickOutsideDirective = {
//   beforeMount(el: HTMLElement, binding: DirectiveBinding) {
//     // 点击目标元素外的处理函数
//     const handleClickOutside = (event: MouseEvent) => {
//       if (!el.contains(event.target as Node))
//         binding.value(event)
//     }
//     // 添加事件监听器
//     document.addEventListener('click', handleClickOutside)
//   },
// }
// export default ClickOutsideDirective
// 扩展 HTMLElement 以包含 __clickOutsideHandler__ 属性
type ClickOutsideElement = HTMLElement & {
  // 可选属性，用于存储点击外部处理函数
  __clickOutsideHandler__?: (event: MouseEvent) => void
}

// 创建一个处理点击外部事件的函数
const handleClickOutside = (el: ClickOutsideElement, binding: DirectiveBinding) => {
  return (event: MouseEvent) => {
    // 如果点击事件发生在绑定元素之外，则调用绑定的回调函数
    if (!el.contains(event.target as Node))
      binding.value(event)
  }
}

const clickOutsideDirective = {
  // 当指令绑定到元素上时调用
  mounted(el: ClickOutsideElement, binding: DirectiveBinding) {
    // 获取处理点击外部事件的函数
    const handler = handleClickOutside(el, binding)
    // 将处理函数保存到元素上，以便在 unmount 时移除事件监听
    el.__clickOutsideHandler__ = handler
    // 添加全局点击事件监听器
    document.addEventListener('click', handler)
  },
  // 当指令从元素上移除时调用
  unmounted(el: ClickOutsideElement) {
    // 如果存在处理函数，则移除全局点击事件监听器
    if (el.__clickOutsideHandler__) {
      document.removeEventListener('click', el.__clickOutsideHandler__)
      // 删除保存的处理函数
      delete el.__clickOutsideHandler__
    }
  },
}

export default clickOutsideDirective
