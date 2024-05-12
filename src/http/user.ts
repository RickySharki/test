import { get, post } from '@utils/request'
import type { LoginForm, UserInfo } from '@model/user'

export const login = (data: LoginForm): Promise<UserInfo> => post<UserInfo>('/login', data)
export const notfind = () => get('/notfound')
export const mistake = () => get('/error')
