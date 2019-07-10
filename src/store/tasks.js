import Vue from "vue";
import auth from "@/auth";
//import "es6-promise/auto";
import firebase from "firebase";

const state = {
  tasks: [],
  viewList: true,
  filter: "All Tasks",
  sortDirection: "Desc",
  dragKey: ""
};

const getters = {
  tasks: state => state.tasks,
  viewList: state => state.viewList,
  filter: state => state.filter,
  sortDirection: state => state.sortDirection,
  dragKey: state => state.dragKey
};

const mutations = {
  setTasks: (state, tasks) => {
    state.tasks = tasks;
  },
  changeViewOfTasks: state => {
    state.viewList = !state.viewList;
  },
  filterTasks: (state, data) => {
    state.filter = data;
  },
  changeSortDirection: (state, data) => {
    state.sortDirection = data;
  },
  resetDragKey: state => {
    state.dragKey = "";
  },
  setDragKey: (state, data) => {
    state.dragKey = data;
  }
};

const actions = {
  setTasks: ({ commit, state }) => {
    const db = firebase.database();
    const id = auth.user().uid;
    const userDb = db.ref(id);
    const tasks = userDb.child("tasks");
    tasks.on(
      "value",
      function(data) {
        const tasks = [];
        data.forEach(function(data) {
          let task = {
            key: data.key,
            task: data.val().task
          };
          tasks.push(task);
          commit("setTasks", tasks);
        });
      },
      function(error) {
        console.log("Error: " + error.code);
      }
    );
  },
  saveNewTask: ({ commit, state }, data) => {
    const db = firebase.database();
    const id = auth.user().uid;
    const userDb = db.ref(id);

    const task = {
      title: data.title,
      description: data.description,
      priority: data.priority,
      creationDate: firebase.database.ServerValue.TIMESTAMP,
      completed: data.completed,
      color: data.color
    };
    userDb.child("tasks").push({ task });
  },
  editTask: ({ commit, state }, data) => {
    const db = firebase.database();
    const id = auth.user().uid;
    const userDb = db.ref(id);

    const taskRef = userDb.child("tasks/" + data.key);
    const task = data.task;
    taskRef.set({ task });
    //commit("editTask", task);
  },
  deleteTask: ({ commit, state }, key) => {
    const db = firebase.database();
    const id = auth.user().uid;
    const userDb = db.ref(id);

    const taskRef = userDb.child("tasks/" + key);
    taskRef.remove();
  },
  changeTaskStatus: ({ commit, state }, data) => {
    const db = firebase.database();
    const id = auth.user().uid;
    const userDb = db.ref(id);

    const taskStatusRef = userDb.child("tasks/" + data.key + "/task/completed");
    taskStatusRef.set(data.completed);
  },
  filterTasks: ({ commit, state }, data) => {
    commit("filterTasks", data);
  },
  changeSortDirection: ({ commit, state }, data) => {
    commit("changeSortDirection", data);
  },
  changeViewOfTasks: ({ commit, state }) => {
    commit("changeViewOfTasks");
  },
  resetDragKey: ({ commit, state }) => {
    commit("resetDragKey");
  },
  setDragKey: ({ commit, state }, data) => {
    commit("setDragKey", data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
