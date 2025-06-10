import { createRouter, createWebHashHistory } from 'vue-router'
import { staticRoute, errorRoute } from '@/router/modules/staticRoute'
import { setupRouterGuards } from './guard'

// 白名单应该包含基本静态路由
const basicRoutes = [...staticRoute, ...errorRoute]
const WHITE_NAME_LIST: string[] = []
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name)
    getRouteNames(item.children || [])
  })
getRouteNames(basicRoutes)
const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
  strict: true,
})

setupRouterGuards(router)

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export default router
