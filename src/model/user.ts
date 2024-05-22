import type { Component } from 'vue'
export interface LoginForm {
  userName: string
  passWord: string
}

export interface UserInfo {
  userName: string
  userId: number
  token: string
  role: string
}
export interface RouteMeta {
  title?: string
  roles?: string[]
}

export interface Route {
  path: string
  redirect?: string
  component: Component
  name?: string
  meta?: RouteMeta
  children?: Route[]
}
