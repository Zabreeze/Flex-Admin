import type { RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export interface RouteMeta {
  title: string
  enName: string
  icon: string
  isHide: boolean
  isKeepAlive: boolean
  isFull: boolean
  isAffix: boolean
  isLink?: string
  activeMenu?: string
}

// 定义路由记录类型
export interface AppRouteRecordRaw {
  path: string
  name: string
  component?: Component | string
  redirect?: string
  meta: RouteMeta
  children?: AppRouteRecordRaw[]
}

export interface AuthStateInterface {
  token: string | undefined
  isDynamicAddedRoute: boolean
  routeList: AppRouteRecordRaw[]
}
