import { getTokenCache } from '@/utils/auth'
import { CacheKeyEnum } from '@/enums/cacheEnum'
/**
 * @description 配置用户标识
 */
export const handleAuth = (config) => {
  if (config.headers && typeof config.headers.set === 'function') {
    config.headers['Authorization'] = getTokenCache(CacheKeyEnum.TOKEN_KEY) || ''
  }
  return config
}

export const handleResponse = (msg) => {
  // 请求超时 && 网络错误单独判断，没有 response
  if (msg.indexOf('timeout') !== -1) console.log('请求超时！请您稍后重试')
  if (msg.indexOf('Network Error') !== -1) console.log('网络错误！请您稍后重试')
}
