// src/router/routes.js

import Layout from '../layout/index.vue'
import NotFound from '../pages/404/index.vue'
import Login from '../pages/login/index.vue'
import About from '../pages/about/index.vue'
import ProdectComponents from '../pages/prodect/components/index.vue'
import Prodect from '../pages/prodect/index.vue'
import ProdectSubHome from '../pages/prodect/subHome/index.vue'

export const baseRoutes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    meta: {
      title: '404',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
    },
  },
]

export const asyncRoutes = [
  {
    path: '/layout',
    component: Layout,
    meta: {
      roles: ['admin', 'user'], // 有权限的角色
    },
    children: [
      {
        path: 'about',
        name: 'about',
        component: About,
        meta: {
          title: '关于',
          roles: ['admin', 'user'], // 有权限的角色
        },
      },
      {
        path: 'prodect',
        name: 'prodect',
        component: Prodect,
        meta: {
          title: '产品',
          roles: ['admin'], // 有权限的角色
        },
        children: [
          {
            path: 'subHome',
            name: 'prodect-subHome',
            component: ProdectSubHome,
            meta: {
              title: '一级产品',
              roles: ['admin'], // 有权限的角色
              requireAuth: true,
            },
          },
          {
            path: 'component',
            name: 'prodect-component',
            component: ProdectComponents,
            meta: {
              title: '二级产品',
              roles: ['admin'], // 有权限的角色
            },
          },
        ],
      },
    ],
  },
]
