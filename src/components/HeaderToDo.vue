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

<style lang="less" scoped>
.header-todo {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  p {
    font-size: 1.2em;
    font-weight: bold;
    > span {
      color: grey;
    }
  }
}
</style>
