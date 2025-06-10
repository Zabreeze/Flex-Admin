import type { Router } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'
import useAuthStore from '@/store/modules/auth'
import initDynamicRouter from '@/router/modules/dynamicRoute'
const whitePathList: PageEnum[] = [PageEnum.BASE_LOGIN]
export default (router: Router) => {
  // 前置守卫
  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()
    const token = authStore.getToken
    // 判断是否访问白名单
    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === PageEnum.BASE_LOGIN && token) {
        return next(from.fullPath)
      }
      return next()
    }

    // 判断是否访问注册页面
    if (to.path.toLowerCase() === PageEnum.BASE_REGISTER.toLowerCase()) {
      return next()
    }

    // 如果没有 token，重定向到登录页面
    if (!token) {
      return next({ path: PageEnum.BASE_LOGIN, replace: true })
    }

    console.log('[PermissGuard] to路径:', to.path, 'from路径', from.path)
    // 检查动态路由是否已初始化
    if (!authStore.getIsDynamicAddedRoute) {
      console.log('initDynamicRouter执行前', router.getRoutes())
      await initDynamicRouter()
      console.log('initDynamicRouter执行后', router.getRoutes())
      // // 获取原始目标路由
      // const targetRoute = router.resolve(from.fullPath);
      // console.log(targetRoute)
      // // 确保路由已存在
      // if (targetRoute.matched.length > 0) {
      //   return next(from.fullPath);
      // }
      next({ path: to.fullPath, replace: true, query: to.query })
      return
    }

    if (to.name === null) {
      // 如果路由名称为空，说明是新添加的路由，重新跳转
      next({ path: to.fullPath, replace: true, query: to.query })
    }
    next()
  })

  // 后置守卫
  router.afterEach((to, from) => {
    // 鉴权逻辑
  })
}
