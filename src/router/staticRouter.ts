import { HOME_URL, LOGIN_URL, REGISTER_URL } from "@/config";

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
    redirect: HOME_URL,
    children: [
      {
        path: HOME_URL,
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页"
        }
      }
    ]
  },
  {
    path: LOGIN_URL,
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: REGISTER_URL,
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
