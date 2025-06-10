import Layout from '@/layouts/index.vue'
import { CacheTypeEnum, CacheKeyEnum } from '@/enums/cacheEnum'
import { projectSetting } from '@/configs/setting'
import { Persistent } from '@/utils/cache'
import type { AppRouteRecordRaw } from '@/store/interfaces'

const { permissionCacheType } = projectSetting
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL

/**
 * @description 获取token
 * @returns {String}
 */
export const getTokenCache = <T>(key: CacheKeyEnum) => {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession
  return fn(key) as T
}

/**
 * @description 设置token
 * @param {String} token token值
 */
export const setTokenCache = (key: CacheKeyEnum, value: any) => {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession
  return fn(key, value)
}

/**
 * @description 删除token
 * @returns {String}
 */
export const removeTokenCache = (key: CacheKeyEnum) => {
  const fn = isLocal ? Persistent.removeLocal : Persistent.removeSession
  return fn(key)
}

/**
 * 将后端扁平化路由转换为嵌套路由结构
 * @param menuList 后端返回的菜单列表
 * @returns 生成的路由配置
 */
export function generateDynamicRoutes(menuList: any[]): AppRouteRecordRaw[] {
  // 创建路由映射表，方便通过menuId查找
  const routeMap = new Map<number, AppRouteRecordRaw>()
  // 先转换所有路由项为RouteRecordRaw格式
  menuList.forEach((menu) => {
    routeMap.set(menu.menuId, transformMenuItemToRoute(menu))
  })

  // 构建嵌套路由结构
  const nestedRoutes: AppRouteRecordRaw[] = []

  // 第一遍处理：构建父子关系
  routeMap.forEach((route, menuId) => {
    const menuItem = menuList.find((item) => item.menuId === menuId)!

    // 查找父路由
    if (menuItem.parentId !== 0) {
      const parentRoute = routeMap.get(menuItem.parentId)
      if (parentRoute) {
        parentRoute.children = parentRoute.children || []
        parentRoute.children.push(route)
        return
      }
    }

    // 没有父路由或者是根路由，直接添加到结果中
    nestedRoutes.push(route)
  })

  // 第二遍处理：确保重定向正确
  nestedRoutes.forEach((route) => {
    if (route.meta?.isFull !== true && !route.redirect && route.children?.length) {
      // 默认重定向到第一个子路由
      route.redirect = route.children[0].path
    }
  })
  return nestedRoutes
}

/**
 * 将后端菜单项转换为路由配置
 */
function transformMenuItemToRoute(menu: any): AppRouteRecordRaw {
  const modules = import.meta.glob('@/views/**/*.vue')
  // 解析组件
  let component
  if (menu.component) {
    // 转换组件路径格式，如 sys/sgu -> /src/views/sys/sgu.vue
    const componentPath = `/src/views/${menu.component}.vue`
    component = modules[componentPath]
    if (!component) {
      console.warn(`未找到组件: ${componentPath}`)
    }
  }

  return {
    path: menu.path,
    name: menu.name,
    component: component || (menu.parentId === 0 ? Layout : undefined),
    redirect: menu.redirect || undefined,
    meta: {
      title: menu.menuName,
      enName: menu.enName,
      icon: menu.icon,
      isHide: menu.isHide === '1',
      isKeepAlive: menu.isKeepAlive === '1',
      isFull: menu.isFull === '1',
      isAffix: menu.isAffix === '1',
    },
    children: [],
  }
}
