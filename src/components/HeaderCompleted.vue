<template>
  <div class="header-completed">
    <p>
      Completed <span>({{ numCompleted }})</span>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      completedTasks: []
    };
  },
  props: {
    numCompleted: Number
  },
  computed: {
    tasks() {
      return this.$store.getters["tasks/tasks"];
    }
  },
  watch: {
    tasks() {
      if (this.tasks.length > 0) {
        this.completedTasks = this.tasks.filter(
          item => item.completed === true
        );
      }
    }
  }
};
</script>
<style lang="less" scoped>
.header-completed {
  display: flex;
  justify-content: flex-start;
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
