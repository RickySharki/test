import qs from 'qs'
/**
 * 新增url参数
 * @param url
 * @param params
 * @param options
 * @returns {string}
 */

export const addUrlParams = (url: string, params?: any, options?: any) => {
  // 查找 URL 中最后一个问号的索引，如果存在，则说明 URL 已经有参数
  const queryIndex = url.lastIndexOf('?')
  // 提取 URL 中的查询字符串部分，如果没有查询字符串，则返回空字符串。
  const queryString = queryIndex > -1 ? url.substring(queryIndex) : ''
  // 提取 URL 的前缀部分，不包括查询字符串
  const urlPrefix = queryIndex > -1 ? url.substring(0, queryIndex) : url
  // 使用 qs.parse 方法解析现有的查询字符串，将其转换为对象
  const old = qs.parse(queryString, { ignoreQueryPrefix: true })
  // 将新的参数与原有参数合并，并使用 qs.stringify 方法将其转换为 URL 编码的查询字符串
  const paramsString = qs.stringify({ ...old, ...params }, options)
  return `${urlPrefix}?${paramsString}`
}
