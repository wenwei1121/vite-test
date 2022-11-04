import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "PipiFamily",
    component: () => import("@/views/PipiFamily.vue"),
  },
  {
    path: "/AddPipiFamilyMember",
    name: "AddPipiFamilyMember",
    component: () => import("@/views/AddPipiFamilyMember.vue"),
  },
]

const router = createRouter({
  history: createWebHistory("/"),
  routes,
})

export default router
