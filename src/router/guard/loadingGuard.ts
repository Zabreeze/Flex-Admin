import type { Router } from 'vue-router'
import { start, close } from '@/configs/nprogress'
export default (router: Router) => {
  router.beforeEach(() => {
    start()
  })
  router.afterEach(() => {
    close()
  })
}
