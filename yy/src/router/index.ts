import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "主页",
    component: () => import("@/views/Home.vue"),
    children: [
      {
        path: "/assets",
        name: "资源",
        component: () => import("@/views/Assets.vue"),
      },
      {
        path: "/generate",
        name: "生成",
        component: () => import("@/views/Generate.vue"),
      },
      {
        path: "/about",
        name: "关于",
        component: () => import("@/views/About.vue"),
      }
    ]
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});