<template>
  <div class="container-fluid tasks">
    <div class="todo">
      <app-header-to-do :numToDo="toDoTasks.length" />
      <div class="containerForDragElements">
        <transition-group name="list" tag="div">
          <app-task
            class="task"
            v-for="task in toDoTasks"
            :taskObj="task"
            :key="task.key"
            draggable="true"
            @dragstart="dragstart($event, task.key)"
            @drag="drag($event)"
          />
        </transition-group>
      </div>
    </div>
    <div class="completed">
      <app-header-completed :numCompleted="completedTasks.length" />
      <div
        class="containerForDragElements"
        @dragover.prevent
        @drop.prevent="drop($event)"
      >
        <transition-group name="list" tag="div" class="flex">
          <app-task
            class="task"
            v-for="task in completedTasks"
            :taskObj="task"
            :key="task.key"
            draggable="true"
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
    }
  },
  methods: {
    dragstart(event, key) {
      event.dataTransfer.setData("text", key);
    },
    drop(event) {
      const key = event.dataTranfer.getData("text");
      console.log(key);
    }
  }
};
</script>
<style scoped>
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
