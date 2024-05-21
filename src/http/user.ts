import { get, post } from '@utils/request'
import type { LoginForm, UserInfo } from '@model/user'

export const login = (url: string, data: LoginForm): Promise<UserInfo> => post<UserInfo>(url, data)
export const notfind = () => get('/notfound')
export const mistake = () => get('/error')
