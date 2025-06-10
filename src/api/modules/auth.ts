import { AUTHPORT } from '@/configs'
import http from '@/api'
import type { Login } from '@/interfaces'

/**
 * @name 登录模块
 */
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post(`${AUTHPORT}/login`, params)
}

/**
 * @name 退出登录模块
 */
export const logoutApi = () => {
  return http.post(`${AUTHPORT}/logout`)
}

/**
 * @name 获取动态路由模块
 */
export const dynamicRouteApi = () => {
  return http.post(`${AUTHPORT}/getDynamicRoutes`)
}
