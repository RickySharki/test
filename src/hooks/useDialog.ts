// 1.使用的时候需要兼容所有组件参数
// 2.可以直接传入一个vue组件渲染
// 3.使用的时候只有两个方法open、close(外部不需要传入一个ref的响应式数据进行维护) const {open,close} = useDialog(options....)/ open(),
// const {open,close} = useDialog(content,options....)
import { ElDialog } from 'element-plus'
import { type Component, h, ref, render } from 'vue'
// <template - >h()(ast语法树) -> render()
// h()解析vue组件或者html标签的函数
// render是挂载组件的函数
type Content = Component | JSX.Element | string
type ElDialogInstance = InstanceType<typeof ElDialog>
type DialogProps = ElDialogInstance['$props']

interface ElDialogSlots {
  header?: (...args: any[]) => Content
  footer?: (...args: any[]) => Content
}

interface Options {
  dialogProps?: DialogProps
  dialogSlots?: ElDialogSlots
  contentProps?: any
}
// <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">xxxxx</el-dialog>

// render(h(Eldialog,{
// modelValue:dialogFormVisible.value,
// title:'Shipping address',
// width:500
// }))

// const {open,close} = useDialog(content,{
// dialogProps:{
//     title:'Shipping address',
//      width:500
//  },
// dialogSlots:{
//     header:()=> 'xxx',
//     footer:()=>'xxx'
// }
// })
// Map<visible:{
//     xxxx,computed,watch
// }>
// <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">xxxxx</el-dialog
// emit(update:modelValue)
// @update:modelValue = (val: boolean) => visible.value = val
export const useDialog = (content: Content, options: Options) => {
  let container: HTMLElement | null = null
  const visible = ref<boolean>(false)
  const closeDialog = () => {
    visible.value = false
    if (container) {
      render(null, container)
      document.body.removeChild(container)
      container = null
    }
  }
  const renderEl = () => {
    visible.value = true
    const el = h(ElDialog, {
      // v-model,手动实现了v-model（v-model="visible"）
      'modelValue': visible.value,
      'onUpdate:modelValue': (val: boolean) => {
        visible.value = val
        if (!val)
          closeDialog()
      },
      ...options.dialogProps,
    },
    {
      default: () => [
        typeof content === 'string'
          ? content
          : h(content as any, {
            ...options.contentProps,
          }),
      ],
      ...options.dialogSlots,
    },
    )
    container && render(el, container)
  }
  const openDialog = () => {
    if (!container) {
      container = document.createElement('div')
      document.body.appendChild(container)
    }
    renderEl()
  }

  return {
    openDialog,
    closeDialog,
  }
}
