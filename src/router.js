import Vue from "vue";
import Router from "vue-router";
//import Home from "./components/Home.vue";
import Auth from "./components/Auth.vue";
import Tracker from "./components/Tracker.vue";
import Settings from "./components/Settings.vue";
import Tasks from "./components/Tasks.vue";
import auth from "./auth";

Vue.use(Router);

const routes = [
  //{ path: "", name: "home", component: Home },
  { path: "", name: "auth", component: Auth, meta: { guestOnly: true } },
  { path: "/auth", name: "auth", component: Auth, meta: { guestOnly: true } },
  {
    path: "/tracker",
    name: "tracker",
    component: Tracker,
    meta: { requireAuth: true },
    children: [
      {
        path: "tasks",
        name: "tasks",
        component: Tasks
      },
      {
        path: "settings",
        name: "settings",
        component: Settings
      }
    ]
  },

  { path: "*", redirect: "/auth" }
  //{ path: "*", redirect: "home" }
];

export const router = new Router({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  let currentUser = auth.user();
  let requireAuth = to.matched.some(record => record.meta.requireAuth);
  let guestOnly = to.matched.some(record => record.meta.guestOnly);

  if (requireAuth && !currentUser) next("auth");
  else if (guestOnly && currentUser) next("tracker");
  else next();
});
