import type { Router } from 'vue-router'
import createLoadingGuard from './loadingGuard'
import createTitleGuard from './titleGuard'
import createPermissionGuard from './permissionGuard'

export const setupRouterGuards = (router: Router) => {
  createLoadingGuard(router)
  createTitleGuard(router)
  createPermissionGuard(router)
}
