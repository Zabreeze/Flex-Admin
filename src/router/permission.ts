// permission.js
export function setupRouterGuards(router) {
    // 前置守卫
    router.beforeEach((to, from, next) => {
      // 鉴权逻辑
      next()
    });
    // 后置守卫
    router.afterEach((to, from) => {
      // 鉴权逻辑
    });
  }
  