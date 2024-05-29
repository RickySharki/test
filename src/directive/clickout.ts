import type { DirectiveBinding } from 'vue'

const ClickOutsideDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    // 点击目标元素外的处理函数
    const handleClickOutside = (event: MouseEvent) => {
      if (!el.contains(event.target as Node))
        binding.value(event)
    }
    // 添加事件监听器
    document.addEventListener('click', handleClickOutside)
  },
}
export default ClickOutsideDirective
