import { defineStore } from 'pinia'
import { loginApi } from '@/api/modules/auth'
import type { AppRouteRecordRaw, AuthStateInterface } from '../interfaces'
import { getTokenCache, removeTokenCache, setTokenCache, generateDynamicRoutes } from '@/utils/auth'
import authMenu from '@/assets/jsons/authMenu.json'
import { CacheKeyEnum } from '@/enums/cacheEnum'
import { Persistent } from '@/utils/cache'

const useAuthStore = defineStore('Flexi-Auth', {
  state: (): AuthStateInterface => {
    return {
      token: undefined,
      isDynamicAddedRoute: false,
      routeList: [],
    }
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token ? token : ''
      setTokenCache(CacheKeyEnum.TOKEN_KEY, token)
    },
    resetState() {
      this.isDynamicAddedRoute = false
      this.token = ''
      removeTokenCache(CacheKeyEnum.TOKEN_KEY)
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    setDynamicRoute(routeList: AppRouteRecordRaw[]) {
      this.routeList = routeList
      Persistent.setLocal(CacheKeyEnum.DYNAMIC_ROUTES, routeList)
    },
    loadCachedRoutes() {
      const cached = Persistent.getLocal(CacheKeyEnum.DYNAMIC_ROUTES)
      if (cached) {
        this.routeList = cached
        this.isDynamicAddedRoute = true
      }
    },
    async login(loginForm) {
      const result = await loginApi(loginForm)
      if (result.code == 200) {
        this.token = result.data.token as string
        this.setToken(this.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    listRouters() {
      const routeList = generateDynamicRoutes(authMenu.data)
      this.setDynamicRoute(routeList)
    },
    async logout(loginForm) {
      const result = await loginApi(loginForm)
      if (result.code == 200) {
        this.resetState()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
  },
  getters: {
    getToken: (state) => state.token || getTokenCache<string>(CacheKeyEnum.TOKEN_KEY),
    getRouteList: (state) => state.routeList,
    getIsDynamicAddedRoute: (state) => state.isDynamicAddedRoute,
  },
})

export default useAuthStore
