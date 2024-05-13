export const openLink = (uri: string) => {
  // 创建了一个 <a> 元素，用于链接到指定的 URL
  const a = document.createElement('a')
  // 设置了 <a> 元素的 href 属性，指定了要打开的链接地址，该地址由参数 uri 提供
  a.href = uri
  // 设置了 <a> 元素的 target 属性为 _blank，这意味着链接将在新的标签页或窗口中打开
  a.target = '_blank'
  // 将创建的 <a> 元素添加到文档的 <body> 元素中
  document.body.appendChild(a)
  a.click()
  a.remove()
}
