import useAuthStore from '@/store/modules/auth.ts'
import { PageEnum } from '@/enums/pageEnum'
import router, { resetRouter } from '@/router/index'
import type { AppRouteRecordRaw } from '@/store/interfaces'
import type { RouteRecordRaw } from 'vue-router'
import { toRaw } from 'vue'

const initDynamicRouter = async () => {
  const authStore = useAuthStore()
  try {
    console.log(authStore.routeList.length)
    // 获取路由列表
    if (!authStore.routeList?.length) {
      console.log('获取路由列表')
      await authStore.listRouters()
    }

    const routeList = toRaw(authStore.getRouteList)

    if (routeList == null || routeList.length == 0) {
      authStore.resetState()
      router.replace(PageEnum.BASE_LOGIN)
      return
    }
    console.log('获取到的路由列表：', authStore.getRouteList)
    // 添加路由前先清空历史路由
    resetRouter()

    routeList.forEach((route: AppRouteRecordRaw) => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })

    ensureNotFoundRoute()
    authStore.setDynamicAddedRoute(true)
    console.log('[路由] 动态路由初始化完成', router.getRoutes())
  } catch (error) {
    console.error('初始化动态路由失败:', error)
    return Promise.reject(error)
  }
}

// 确保404路由存在
function ensureNotFoundRoute() {
  if (!router.hasRoute('404')) {
    router.addRoute({
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/components/ErrorMessage/404.vue'),
      meta: {
        isStatic: true,
        hidden: true,
      },
    })
    console.log('[路由] 添加404路由')
  }
}

export default initDynamicRouter
