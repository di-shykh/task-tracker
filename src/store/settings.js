import Vue from "vue";
import auth from "@/auth";
import firebase from "firebase";

const DEFAULT_SETTINGS = {
  sidebarColor: "#2828a0",
  sidebarFontColor: "	#FFFFFF",
  bgColor: "#f1f1f1",
  fontColor: "#000000",
  tasksBgColor: "#FFFFFF"
};

const state = {
  isSidebarShown: true,
  settings: null
};

const getters = {
  isSidebarShown: state => state.isSidebarShown,
  settings: state => state.settings
};

const mutations = {
  hideOrShowSidebar: state => {
    state.isSidebarShown = !state.isSidebarShown;
  },
  setUserSettings: state => {
    const db = firebase.database();
    const id = auth.user().uid;
    const userDb = db.ref(id);
    const settingsFromDB = userDb.child("settings");

    settingsFromDB.on(
      "value",
      function(data) {
        if (!data.exists()) {
          settingsFromDB.set(DEFAULT_SETTINGS);
          state.settings = DEFAULT_SETTINGS;
        } else {
          let settings = {};
          data.forEach(function(data) {
            settings[data.key] = data.val();
          });
          state.settings = settings;
        }
      },
      function(error) {
        console.log("Error: " + error.code);
      }
    );
  },
  setDefaultSettings: state => {
    const db = firebase.database();
    const id = auth.user().uid;
    const userDb = db.ref(id);
    const settings = userDb.child("settings");

    settings.set(DEFAULT_SETTINGS);
    state.settings = DEFAULT_SETTINGS;
  },
  setSidebarColor: (state, data) => {
    state.settings.sidebarColor = data;
  },
  setBgColor: (state, data) => {
    state.settings.bgColor = data;
  },
  setSidebarFontColor: (state, data) => {
    state.settings.sidebarFontColor = data;
  },
  setFontColor: (state, data) => {
    state.settings.fontColor = data;
  },
  setTasksBgColor: (state, data) => {
    state.settings.tasksBgColor = data;
  },
  saveUserSettings: state => {
    const db = firebase.database();
    const id = auth.user().uid;
    const userDb = db.ref(id);
    const settings = userDb.child("settings");
    settings.set(state.settings);
  }
};

const actions = {
  hideOrShowSidebar: ({ commit }) => {
    commit("hideOrShowSidebar");
  },
  setUserSettings: ({ commit, state }) => {
    commit("setUserSettings");
  },
  setBgColor: ({ commit, state }, data) => {
    commit("setBgColor", data);
  },
  setSidebarFontColor: ({ commit, state }, data) => {
    commit("setSidebarFontColor", data);
  },
  setSidebarColor: ({ commit, state }, data) => {
    commit("setSidebarColor", data);
  },
  setFontColor: ({ commit, state }, data) => {
    commit("setFontColor", data);
  },
  setTasksBgColor: ({ commit, state }, data) => {
    commit("setTasksBgColor", data);
  },
  setDefaultSettings: ({ commit, state }) => {
    commit("setDefaultSettings");
  },
  saveUserSettings: ({ commit, state }) => {
    commit("saveUserSettings");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
