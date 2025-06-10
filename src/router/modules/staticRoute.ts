import { PageEnum } from '@/enums/pageEnum'

/**
 * staticRouter (静态路由)
 */
export const staticRoute = [
  {
    path: '/',
    component: () => import('@/layouts/index.vue'),
    name: 'layout',
    meta: {
      title: '',
      isStatic: true,
    },
    redirect: PageEnum.BASE_HOME,
    children: [
      {
        path: PageEnum.BASE_HOME,
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          isStatic: true,
        },
      },
    ],
  },
  {
    path: PageEnum.BASE_LOGIN,
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      isStatic: true,
    },
  },
  {
    path: PageEnum.BASE_REGISTER,
    name: 'register',
    component: () => import('@/views/register/index.vue'),
    meta: {
      title: '注册',
      isStatic: true,
    },
  },
]

/**
 * errorRouter (错误页面路由)
 */
export const errorRoute = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/components/ErrorMessage/403.vue'),
    meta: {
      title: '403页面',
    },
  },
  {
    path: PageEnum.BASE_NOT_FOUND,
    name: '404',
    component: () => import('@/components/ErrorMessage/404.vue'),
    meta: {
      title: '404页面',
    },
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/components/ErrorMessage/500.vue'),
    meta: {
      title: '500页面',
    },
  },
  // Resolve refresh page, route warnings
  {
    path: '/:pathMatch(.*)*',
    redirect: PageEnum.BASE_NOT_FOUND,
  },
]
