import { createRouter, createWebHashHistory } from "vue-router";
import { staticRouter, errorRouter } from "@/router/staticRouter";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRouter, ...errorRouter]
});

export default router;
