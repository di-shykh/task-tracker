import Vue from "vue";
import Vuex from "vuex";

import user from "./store/user";
import tasks from "./store/tasks";
import settings from "./store/settings";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    tasks,
    settings
  }
});
