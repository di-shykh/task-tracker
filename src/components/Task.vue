<template>
  <div class="task" :style="tasksBgColor">
    <div class="right-icons-block" @click="isDropDownShown = false">
      <div v-if="!task.completed">
        <span v-show="!isTaskPriorityIsMedium">
          <i class="material-icons">{{ priorityIcon }}</i>
          <span>{{ task.priority }} Priority</span>
        </span>
        <span class="date-block">
          <i class="material-icons">watch_later</i>
          <span>{{ getDate(task.creationDate) }}</span>
        </span>
      </div>
      <div v-else class="completed">
        <span>
          <i class="material-icons">check_circle</i>
          <span>Completed</span>
        </span>
      </div>
    </div>
    <div class="block-full-width">
      <div class="block">
        <div class="icon">
          <p :style="{ background: task.color }">
            {{ task.title.charAt(0).toUpperCase() }}
          </p>
        </div>
        <div class="wrapper">
          <div class="task-header">{{ task.title }}</div>
          <div class="descr">
            {{ task.description }}
          </div>
        </div>
      </div>
      <div class="dropdown">
        <!--работает но криво-->
        <div
          class="float-right"
          @click="isDropDownShown = !isDropDownShown"
          data-toggle="dropdown"
          aria-labelledby="id"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span>
            <i class="material-icons">more_vert</i>
          </span>
        </div>
        <transition name="fade">
          <div class="dropDownMenu" v-show="isDropDownShown" :id="id">
            <ul>
              <li class="dropdown-item" @click="showFormForEdit()">
                Edit
              </li>
              <li class="dropdown-item" @click="deleteTask()">
                Delete
              </li>
              <li
                class="dropdown-item"
                v-if="!task.completed"
                @click="changeTaskStatus()"
              >
                Mark As Completed
              </li>
              <li v-else @click="changeTaskStatus()">Send To ToDo List</li>
            </ul>
          </div>
        </transition>
      </div>

      <!--<div class="btn-group">
        <button
          type="button"
          class="btn btn-secondary dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Right-aligned menu
        </button>
        <div class="dropdown-menu dropdown-menu-right">
          <button class="dropdown-item" type="button">Action</button>
          <button class="dropdown-item" type="button">Another action</button>
          <button class="dropdown-item" type="button">
            Something else here
          </button>
        </div>
      </div> почему-то не работает-->

      <div class="dropdown">
        <!--работает но криво-->
        <transition name="fade">
          <div v-show="isFormEditTaskShown" class="dropDownMenu">
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
                  @click.prevent="editTask()"
                >
                  Edit
                </button>
                <button class="btn btn-danger" @click.prevent="closeForm()">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isDropDownShown: false,
      isFormEditTaskShown: false,
      title: "",
      description: "",
      priority: "Medium",
      color: "#49A4C6"
    };
  },
  computed: {
    task() {
      return this.taskObj.task;
    },
    id() {
      return this.taskObj.key;
    },
    priorityIcon() {
      if (this.task.priority === "Hight") return "arrow_upward";
      else if (this.task.priority === "Low") return "arrow_downward";
      else return "";
    },
    isTaskPriorityIsMedium() {
      if (this.task.priority === "Medium") return true;
      else return false;
    },
    tasksBgColor() {
      if (this.$store.getters["settings/settings"])
        return {
          backgroundColor: this.$store.getters["settings/settings"].tasksBgColor
        };
      else
        return {
          backgroundColor: "#FFFFFF"
        };
    }
  },
  props: {
    taskObj: Object
  },
  methods: {
    getDate(str) {
      if (str) {
        const date =
          new Date(str).toDateString() +
          " " +
          new Date(str).getHours() +
          ":" +
          new Date(str).getMinutes();
        return date
          .split(" ")
          .slice(1, 5)
          .join(" ");
      }
    },
    showFormForEdit() {
      this.isFormEditTaskShown = true;
      this.title = this.task.title;
      this.description = this.task.description;
      this.priority = this.task.priority;
      this.color = this.task.color;
    },
    editTask() {
      const task = {
        title: this.title,
        description: this.description,
        priority: this.priority,
        creationDate: this.task.creationDate,
        completed: this.task.completed,
        color: this.color
      };
      const data = {
        task: task,
        key: this.id
      };
      this.$store.dispatch("tasks/editTask", data);
      this.isFormEditTaskShown = false;
      this.clearForm();
      this.isDropDownShown = false;
    },
    clearForm() {
      this.title = "";
      this.description = "";
      this.priority = "Medium";
      this.color = "#49A4C6";
    },
    closeForm() {
      this.isFormEditTaskShown = false;
      this.clearForm();
      this.isDropDownShown = false;
    },
    deleteTask() {
      this.isDropDownShown = false;
      this.$store.dispatch("tasks/deleteTask", this.id);
    },
    changeTaskStatus() {
      this.isDropDownShown = false;
      this.task.completed = !this.task.completed;
      const data = {
        key: this.id,
        completed: this.task.completed
      };
      this.$store.dispatch("tasks/changeTaskStatus", data);
    }
  }
};
</script>
<style lang="less" scoped>
.task {
  background: white;
  padding: 20px;
  border: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  .block {
    display: flex;
    align-items: center;
    width: 98%;
  }
  .dropdown {
    display: flex;
    align-items: center;
  }
  .icon {
    height: 60px;
    > p {
      background: pink;
      padding: 1em;
      font-size: 1.5em;
      width: 60px;
      height: 60px;
      color: white;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;
    }
  }
  .block-full-width {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-around;
  }
  .wrapper {
    margin: 0 20px;
  }
  .task-header {
    font-weight: bold;
  }
  .date-block {
    color: lightgrey;
  }
  .right-icon {
    color: grey;
  }
  .right-icons-block {
    padding-right: 1em;
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
  .completed {
    color: lightgreen;
  }
}
.dropDownMenu {
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  position: absolute;
  background: white;
  z-index: 1;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    padding: 10px;
    border-bottom: 1px solid gray;
    :hover {
      background: rgb(240, 238, 238);
    }
    :last-child {
      border-bottom: none;
    }
  }
  form {
    padding: 20px;
  }
}
.form-buttons {
  display: flex;
  justify-content: center;
  button {
    margin: 5px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@media (max-width: 500px) {
  .icon > p {
    font-size: 1em;
  }
  .descr {
    font-size: 0.9em;
  }
}
</style>
