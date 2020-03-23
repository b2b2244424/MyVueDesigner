import Vue from "vue";
import VueRouter from "vue-router";
import Design from "../views/Design.vue";
import Design2 from "../views/Design2.vue";
import ViewPage from "../views/ViewPage.vue";
import UIComponentAdder from "../views/UIComponentAdder.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "/",
    path: "/",
    component: Design2
  },
  {
    name: "design",
    path: "/page/design",
    component: Design
  },
  {
    name: "design2",
    path: "/projects/:id",
    component: Design2
  },
  {
    name: "view",
    path: "/page/preview/:projectId/:pageId",
    component: ViewPage
  },
  {
    name: "addComponent",
    path: "/page/addComponent",
    component: UIComponentAdder
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
