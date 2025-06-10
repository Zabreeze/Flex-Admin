import type { Router } from 'vue-router'
export default (router: Router) => {
  router.beforeEach((to) => {
    to.matched.some((item) => {
      if (!item.meta.title) return ''
      const appTitle = import.meta.env.VITE_APP_TITLE
      document.title = to.meta.title ? `${to.meta.title} - ${appTitle}` : appTitle
    })
  })
}
