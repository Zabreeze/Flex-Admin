import { PageEnum } from '@/enums/pageEnum';

/**
 * staticRouter (静态路由)
 */
export const staticRouter = [
  {
    path: "/",
    component: () => import("@/layouts/index.vue"),
    name: "layout",
    meta: {
      title: ""
    },
    redirect: PageEnum.BASE_HOME,
    children: [
      {
        path: PageEnum.BASE_HOME,
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页"
        }
      }
    ]
  },
  {
    path: PageEnum.BASE_LOGIN,
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: PageEnum.BASE_REGISTER,
    name: "register",
    component: () => import("@/views/register/index.vue"),
    meta: {
      title: "注册"
    }
  }
];

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [];
