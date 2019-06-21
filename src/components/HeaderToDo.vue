<template>
  <div class="header-todo">
    <p>
      ToDo <span>({{ numToDo }})</span>
    </p>
    <div class="header-icons">
      <span @click="changeTasksView(false)" title="Model view">
        <i class="material-icons">view_module</i>
      </span>
      <span @click="changeTasksView(true)" title="List view">
        <i class="material-icons">view_list</i>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    numToDo: Number
  },
  computed: {
    tasks() {
      return this.$store.getters["tasks/tasks"];
    },
    viewList() {
      return this.$store.getters["tasks/viewList"];
    }
  },
  watch: {
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
    changeTasksView(bool) {
      if (bool && !this.viewList)
        this.$store.dispatch("tasks/changeViewOfTasks");
      else if (!bool && this.viewList)
        this.$store.dispatch("tasks/changeViewOfTasks");
    }
  }
};
</script>

<style scoped>
.header-todo {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
.header-todo p {
  font-size: 1.2em;
  font-weight: bold;
}
.header-todo > p > span {
  color: grey;
}
</style>
