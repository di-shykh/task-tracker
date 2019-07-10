<template>
  <div class="container-fluid tasks">
    <div class="todo" @dragover.prevent @drop.stop.prevent="drop($event)">
      <app-header-to-do :numToDo="toDoTasks.length" />
      <div class="containerForDragElements">
        <transition-group name="list" tag="div">
          <app-task
            class="task"
            v-for="task in toDoTasks"
            :taskObj="task"
            :key="task.key"
          />
        </transition-group>
      </div>
    </div>
    <div class="completed" @dragover.prevent @drop.stop.prevent="drop($event)">
      <app-header-completed :numCompleted="completedTasks.length" />
      <div class="containerForDragElements">
        <transition-group name="list" tag="div" class="flex">
          <app-task
            class="task-completed"
            v-for="task in completedTasks"
            :taskObj="task"
            :key="task.key"
          />
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderToDo from "./HeaderToDo";
import HeaderCompleted from "./HeaderCompleted";
import Task from "./Task";

export default {
  components: {
    appHeaderToDo: HeaderToDo,
    appHeaderCompleted: HeaderCompleted,
    appTask: Task
  },
  data() {
    return {
      completedTasks: [],
      toDoTasks: []
    };
  },
  computed: {
    tasks() {
      return this.$store.getters["tasks/tasks"];
    },
    filter() {
      return this.$store.getters["tasks/filter"];
    },
    sortDirection() {
      return this.$store.getters["tasks/sortDirection"];
    },
    toDoTasks() {
      return this.tasks.filter(item => item.task.completed === false);
    },
    completedTasks() {
      return this.tasks.filter(item => item.task.completed === true);
    },
    viewList() {
      return this.$store.getters["tasks/viewList"];
    },
    dragKey() {
      return this.$store.getters["tasks/dragKey"];
    }
  },
  created() {
    this.$store.dispatch("tasks/setTasks");
    this.$store.getters["tasks/filter"];
    this.$store.getters["tasks/sortDirection"];
    this.$store.getters["settings/isSidebarShown"];
    this.$store.getters["tasks/viewList"];
  },
  watch: {
    tasks() {
      if (this.tasks.length > 0) {
        this.completedTasks = this.tasks.filter(
          item => item.task.completed === true
        );
        this.toDoTasks = this.tasks.filter(
          item => item.task.completed === false
        );
      }
    },
    filter() {
      if (this.filter !== "All Tasks") {
        this.toDoTasks = this.tasks.filter(
          item =>
            item.task.completed === false && item.task.priority === this.filter
        );
      } else {
        this.toDoTasks = this.tasks.filter(
          item => item.task.completed === false
        );
      }
    },
    sortDirection() {
      if (this.sortDirection === "Desc") {
        this.toDoTasks = this.toDoTasks.sort(function(a, b) {
          return new Date(b.task.creationDate) - new Date(a.task.creationDate);
        });
      } else {
        this.toDoTasks = this.toDoTasks.sort(function(a, b) {
          return new Date(a.task.creationDate) - new Date(b.task.creationDate);
        });
      }
    },
    viewList() {
      const tasksElements = document.getElementsByClassName("task");
      const nodes = Array.prototype.slice.call(tasksElements, 0);
      const tasksContainers = document.getElementsByClassName(
        "containerForDragElements"
      );
      const containers = Array.prototype.slice.call(tasksContainers, 0);
      if (!this.viewList) {
        nodes.forEach(element => {
          element.style.width = "250px";
        });
        containers.forEach(element => {
          const div = element.querySelector("div");
          div.style.display = "flex";
          div.style.flexWrap = "wrap";
          div.style.justifyContent = "center";
        });
      } else {
        nodes.forEach(element => {
          element.style.width = "inherit";
        });
        containers.forEach(element => {
          const div = element.querySelector("div");
          div.style.display = "block";
          div.style.flexWrap = "no-wrap";
        });
      }
    }
  },
  methods: {
    drop(event) {
      const task = this.tasks.find(item => item.key == this.dragKey);
      if (!task.task.completed && event.target.closest(".completed")) {
        this.changeTaskStatus(task);
      } else if (task.task.completed && event.target.closest(".todo"))
        this.changeTaskStatus(task);
    },
    changeTaskStatus(task) {
      task.task.completed = !task.task.completed;
      const data = {
        key: task.key,
        completed: task.task.completed
      };
      this.$store.dispatch("tasks/changeTaskStatus", data);
    }
  }
};
</script>
<style lang="less" scoped>
.completed .right-icons-block {
  color: lightgreen;
}
.task {
  margin: 10px;
}
.tasks {
  overflow: auto;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
