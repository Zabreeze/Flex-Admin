import { createRouter, createWebHashHistory } from "vue-router";
import { staticRouter, errorRouter } from "@/router/modules/staticRouter";
import { setupRouterGuards } from "./permission"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRouter, ...errorRouter],
  scrollBehavior: ()=> ({left: 0,top: 0})
});

setupRouterGuards(router);

export default router;
