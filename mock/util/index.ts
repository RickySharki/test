// Interface data format used to return a unified format
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = -1,
  TIMEOUT = 401,
  TYPE = 'success',
  NOTFOUND = 404,
}

export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Recordable<T = any> = Record<string, T>
export function resultSuccess<T = Recordable>(
  data: T,
  { message = 'ok' } = {},
) {
  return {
    code: ResultEnum.SUCCESS,
    data,
    message,
    type: 'success',
  }
}

export function resultError(
  message = 'Request failed',
  { code = 0, data = false } = {},
) {
  return {
    code,
    data,
    message,
    type: 'error',
  }
}

export interface requestParams {
  method: string
  body: any
  headers?: { authorization?: string }
  query: any
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */

export function getRequestToken({
  headers,
}: requestParams): string | undefined {
  return headers?.authorization
}
