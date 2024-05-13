import { defaults } from 'lodash-es'
import type { Ref, UnwrapRef } from 'vue'
import { onMounted, onUnmounted, ref } from 'vue'

function usePromise<T, TArgs extends any[] = []>(
  // 接受一个参数数组 TArgs 并返回一个 Promise 或 T 类型的结果
  func: (...args: TArgs) => Promise<T> | T,
  // 初始化异步操作的结果
  start: T,
  // 可选的配置项
  option?: { immediate?: boolean; clearOnRefresh?: boolean },
): {
  result: Ref<T>
  error: Ref<unknown>
  isLoading: Ref<boolean>
  refresh: (...args: TArgs) => Promise<T>
  onReceive: (callback: (response: T) => void) => void
  onError: (callback: (err: unknown) => void) => void
}
function usePromise<T, TArgs extends any[] = []>(
  func: (...args: TArgs) => Promise<T> | T,
  start?: null,
  option?: { immediate?: boolean; clearOnRefresh?: boolean },
): {
  result: Ref<UnwrapRef<T> | null>
  error: Ref<unknown>
  isLoading: Ref<boolean>
  refresh: (...args: TArgs) => Promise<T>
  onReceive: (callback: (response: T) => void) => void
  onError: (callback: (err: unknown) => void) => void
}
function usePromise<T, TArgs extends any[] = []>(
  func: (...args: TArgs) => Promise<T> | T,
  start: T | null = null,
  option?: { immediate?: boolean; clearOnRefresh?: boolean },
): {
    result: Ref<UnwrapRef<T> | null>
    error: Ref<unknown>
    isLoading: Ref<boolean>
    refresh: (...args: TArgs) => Promise<T>
    onReceive: (callback: (response: T) => void) => void
    onError: (callback: (err: unknown) => void) => void
  } {
  const innerOption = defaults(option, {
    immediate: true,
    clearOnRefresh: false,
  })

  const result = ref<T | null>(start)
  const error = ref<unknown>(null)
  const isLoading = ref(innerOption.immediate)
  const receiveCallbacks: Array<(response: T) => void> = []
  const onReceive = (callback: (response: T) => void) => {
    receiveCallbacks.push(callback)
  }

  const errorCallbacks: Array<(err: unknown) => void> = []
  const onError = (callback: (err: unknown) => void) => {
    errorCallbacks.push(callback)
  }

  onUnmounted(() => {
    receiveCallbacks.length = 0
    errorCallbacks.length = 0
  })

  const refresh = (...args: TArgs) => {
    // login(form)
    return new Promise<T>((resolve, reject) => {
      isLoading.value = true
      if (option?.clearOnRefresh)
        result.value = start as UnwrapRef<T> | null
      // () => notfind()
      Promise.resolve(func(...args))
        .then((r) => {
          result.value = r as any
          if (receiveCallbacks.length > 0)
            receiveCallbacks.forEach(callback => callback(r))
          resolve(r)
        })
        .catch((err) => {
          error.value = err
          if (receiveCallbacks.length > 0)
            receiveCallbacks.forEach(callback => callback(err))
          reject(err)
        })
        .finally(() => {
          isLoading.value = false
        })
    })
  }

  if (innerOption.immediate)
    onMounted(refresh)

  return { result, error, isLoading, refresh, onReceive, onError }
}

export { usePromise }
