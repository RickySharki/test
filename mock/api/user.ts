import type { MockMethod } from 'vite-plugin-mock'
// import { Random, mock } from 'mockjs'
import { resultSuccess } from '../util'

const userInfo = ['tom', 'jerry', 'Ricky']
const tokenInfo = {
  token: '1234567890',
  userName: 'Ricky',
  userId: '1',
}
export default [
  {
    url: '/api/getUsers',
    method: 'get',
    response: () => resultSuccess(userInfo),
  },
  {
    url: '/api/login',
    method: 'post',
    response: () => resultSuccess(tokenInfo),
  },
  // 添加一个接口，故意报错404  resultError('404 NOT FOUND',{code:404,{success:false}})
] as MockMethod[]
