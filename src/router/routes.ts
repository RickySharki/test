import type { RouteRecordRaw } from 'vue-router'
import { vueRouters } from './glob'

export const basicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/Layout',
    component: () => import('../layout/index.vue'),
  },
  ...vueRouters(),
]
