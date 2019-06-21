<template>
  <div id="header">
    <div class="menu" @click="hideSidebar()">
      <span
        @click="hideOrShowSidebar()"
        :title="isSidebarShown ? 'Hide sidebar' : 'Show sidebar'"
      >
        <i class="material-icons">menu</i>
      </span>
    </div>
    <div class="right-block">
      <span
        @click="isFilterFormShown = !isFilterFormShown"
        title="Filter tasks"
      >
        <i class="material-icons">filter_list</i>
      </span>
      <span
        @click="changeSortDirection()"
        :title="
          sortDirection != 'Desc'
            ? 'Sort tasks by descending'
            : 'Sort tasks by ascending'
        "
      >
        <i class="material-icons">sort_by_alpha</i>
      </span>
      <button
        class="btn btn-primary btn-round"
        @click="isFormAddTaskShown = !isFormAddTaskShown"
        title="Add new task"
      >
        + Add ToDo
      </button>
      <span>
        <i class="material-icons">sentiment_satisfied_alt</i>
      </span>
      <span @click="isDropDownShown = !isDropDownShown" title="Log out">
        <i class="material-icons">arrow_drop_down</i>
      </span>
      <transition name="fade">
        <div v-show="isFilterFormShown" class="dropDownMenu">
          <form>
            <div class="form-group">
              <label for="priority"
                >Select priority of the task for filter</label
              >
              <select
                class="form-control"
                id="priority"
                v-model="priorityForFilter"
              >
                <option selected>All Tasks</option>
                <option>Hight</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div class="form-buttons">
              <button
                type="submit"
                class="btn btn-success"
                @click.prevent="filterTasks()"
              >
                Filter
              </button>
              <button
                class="btn btn-danger"
                @click.prevent="isFilterFormShown = false"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </transition>
      <transition name="fade">
        <div v-show="isFormAddTaskShown" class="dropDownMenu">
          <form>
            <div class="form-group">
              <label for="title">Title</label>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="Enter title"
                required
                v-model="title"
              />
            </div>
            <div class="form-group">
              <label for="priority">Select priority of the task</label>
              <select class="form-control" id="priority" v-model="priority">
                <option>Hight</option>
                <option selected>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                class="form-control"
                id="description"
                rows="5"
                required
                v-model="description"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="color">Select color for the task</label>
              <input
                type="color"
                class="form-control"
                id="color"
                required
                v-model="color"
              />
            </div>
            <div class="form-buttons">
              <button
                type="submit"
                class="btn btn-success"
                @click.prevent="addNewTask()"
              >
                Add
              </button>
              <button
                class="btn btn-danger"
                @click.prevent="isFormAddTaskShown = false"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </transition>
      <transition name="fade">
        <div v-show="isDropDownShown" class="dropDownMenu">
          <ul>
            <li>
              {{ user.displayName }}<br />
              {{ user.email }}
            </li>
            <li v-on:click="logOut()">
              Log out
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import auth from "@/auth";

export default {
  data() {
    return {
      isDropDownShown: false,
      isFormAddTaskShown: false,
      isFilterFormShown: false,
      title: "",
      description: "",
      priority: "Medium",
      creationDate: "",
      color: "#49A4C6",
      priorityForFilter: "All Tasks",
      sortDirection: "Desc"
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
    isSidebarShown() {
      return this.$store.getters["settings/isSidebarShown"];
    }
  },
  methods: {
    logOut() {
      auth.logout();
      this.$router.go(0);
    },
    hideSidebar() {},
    addNewTask() {
      this.title = this.title.trim();
      this.description = this.description.trim();
      if (this.title && this.description) {
        const task = {
          title: this.title,
          description: this.description,
          priority: this.priority,
          creationDate: new Date(),
          completed: false,
          color: this.color
        };
        this.$store.dispatch("tasks/saveNewTask", task);
        this.isFormAddTaskShown = false;
        this.clearForm();
      }
    },
    clearForm() {
      this.title = "";
      this.description = "";
      this.priority = "Medium";
      this.creationDate = "";
      this.color = "#49A4C6";
    },
    filterTasks() {
      this.isFilterFormShown = false;
      this.$store.dispatch("tasks/filterTasks", this.priorityForFilter);
    },
    changeSortDirection() {
      if (this.sortDirection === "Desc") this.sortDirection = "Asc";
      else this.sortDirection = "Desc";
      this.$store.dispatch("tasks/changeSortDirection", this.sortDirection);
    },
    hideOrShowSidebar() {
      this.$store.dispatch("settings/hideOrShowSidebar");
    }
  }
};
</script>

<style scoped>
#header {
  width: 100%;
  background: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
.btn-round {
  border-top-left-radius: 20px !important;
  border-top-right-radius: 20px !important;
  border-bottom-right-radius: 20px !important;
  border-bottom-left-radius: 20px !important;
}
.menu {
  justify-content: flex-start;
}
.right-block span {
  padding: 10px;
}
.right-block span:last-child {
  padding-left: 0;
}
.dropDownMenu {
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  position: absolute;
  background: white;
}
.dropDownMenu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.dropDownMenu li {
  padding: 10px;
}
.dropDownMenu li:first-child {
  border-bottom: 1px solid gray;
}
form {
  padding: 20px;
}
.form-buttons button {
  margin: 5px;
}
.form-buttons {
  display: flex;
  justify-content: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
