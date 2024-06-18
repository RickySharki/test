import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { defaults } from 'lodash-es'
import { router } from '../router'
const defaultConfig: AxiosRequestConfig = {
  baseURL: '/api',
  // 请求超时时间
  timeout: 10000,
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
}

const instance = axios.create(defaultConfig)
// 添加了一个请求拦截器
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  // 判断headers是否为空
  const headers = config?.headers ?? ({} as Record<string, any>)
  // 储存token
  const token = localStorage.getItem('token')
  if (token)
    // 判断是否纯在，存在就赋值
    headers.accessToken = token
  return config
})

// 添加了一个响应拦截器
instance.interceptors.response.use((res) => {
  if (res.data.code !== 200) {
    ElMessage.error(res.data.message)
    if (res.data.code === 404)
      router.push({ path: '/404' })
    return res.data
  }
  // 同意处理res.code === 404,跳转404页面
  return res.data.data
})

function request<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const token = '123123123123123'
  // 判断headers是否为空
  // 如果 config 对象中存在 headers 属性，则将其赋值给 headers 变量；否则，创建一个空对象作为 headers 的默认值
  const headers = config?.headers ?? ({} as Record<string, any>)
  if (token)
    headers.accessToken = token
  else if (url !== 'authorize/login')
    throw new Error('token is empty')
  // 使用defaults使两个对象合并形成最终的配置对象
  const option = defaults<AxiosRequestConfig, AxiosRequestConfig>(
    // 有配置对象就用config，无就传{}
    config || {},
    {
      url,
      method: 'GET',
      headers,
      timeout: 20 * 1000,
    },
  )
  return instance.request(option)
}

export function get<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  return request(url, config)
}

export function post<T>(
  url: string,
  data: Record<string, any>,
  config?: AxiosRequestConfig,
): Promise<T> {
  return request(url, defaults({ data, method: 'POST' }, config))
}

export function patch<T>(
  url: string,
  data: Record<string, any>,
  config?: AxiosRequestConfig,
): Promise<T> {
  return request(url, defaults({ data, method: 'PATCH' }, config))
}

export function update<T>(
  url: string,
  data: Record<string, any>,
  config?: AxiosRequestConfig,
): Promise<T> {
  return request(url, defaults({ data, method: 'POST' }, config))
}

export function del<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  return request(url, defaults({ method: 'DELETE' }, config))
}
