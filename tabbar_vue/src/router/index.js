import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/Home.vue";


Vue.use(VueRouter);
const originalPush = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: "",
    redirect: '/home'
  },
  {
    path: "/home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Home
  },
  {
    path: "/class",
    name: "/Class",
    component: () =>
      import("@/views/Categories/Class.vue")
  },
  {
    path: "/collect",
    name: "/Collect",
    component: () =>
      import("@/views/ShoppingCar/Collect.vue")
  },
  {
    path: "/personal",
    name: "/Personal",
    component: () =>
      import("@/views/User/Personal.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
