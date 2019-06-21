<template>
  <div class="container-fluid ">
    <div class="row col-12 justify-content-center">
      <h3>Your settings:</h3>
      <div class="w-100"></div>
    </div>
    <div class="row col-12 justify-content-center">
      <form v-on:submit.prevent>
        <div class="form-group">
          <label for="sidebarColor">Select background color for sidebar</label>
          <input
            type="color"
            class="form-control"
            id="sidebarColor"
            required
            v-model="sidebarColor"
            @change="changeSidebarColor()"
          />
        </div>
        <div class="form-group">
          <label for="sidebarFontColor">Select color for sidebar font</label>
          <input
            type="color"
            class="form-control"
            id="sidebarFontColor"
            required
            v-model="sidebarFontColor"
            @change="changeSidebarFontColor()"
          />
        </div>
        <div class="form-group">
          <label for="bgColor">Select background color</label>
          <input
            type="color"
            class="form-control"
            id="bgColor"
            required
            v-model="bgColor"
            @change="changeBgColor()"
          />
        </div>
        <div class="form-group">
          <label for="fontColor">Select font color</label>
          <input
            type="color"
            class="form-control"
            id="fontColor"
            required
            v-model="fontColor"
            @change="changeFontColor()"
          />
        </div>
        <div class="form-group">
          <label for="tasksBgColor">Select background color for tasks</label>
          <input
            type="color"
            class="form-control"
            id="tasksBgColor"
            required
            v-model="tasksBgColor"
            @change="changeTasksBgColor()"
          />
        </div>
        <div class="form-buttons">
          <button
            type="submit"
            class="btn btn-success"
            @click.prevent="saveSettings()"
          >
            Save
          </button>
          <button class="btn btn-primary" @click.prevent="setDefaultSettings()">
            Set default settings
          </button>
          <button class="btn btn-danger" @click.prevent="cancel()">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sidebarColor: "#2828a0",
      sidebarFontColor: "	#FFFFFF",
      bgColor: "#f1f1f1",
      fontColor: "#000000",
      tasksBgColor: "#FFFFFF"
    };
  },
  computed: {
    userSettings() {
      return this.$store.getters["settings/settings"];
    },
    bgColor() {
      return this.userSettings.bgColor;
    },
    sidebarColor() {
      return this.userSettings.sidebarColor;
    },
    sidebarFontColor() {
      return this.userSettings.sidebarFontColor;
    },
    fontColor() {
      return this.userSettings.fontColor;
    },
    tasksBgColor() {
      return this.userSettings.tasksBgColor;
    }
  },
  methods: {
    changeBgColor() {
      this.$store.dispatch("settings/setBgColor", this.bgColor);
    },
    changeFontColor() {
      this.$store.dispatch("settings/setFontColor", this.fontColor);
    },
    changeSidebarColor() {
      this.$store.dispatch("settings/setSidebarColor", this.sidebarColor);
    },
    changeSidebarFontColor() {
      this.$store.dispatch(
        "settings/setSidebarFontColor",
        this.sidebarFontColor
      );
    },
    changeTasksBgColor() {
      this.$store.dispatch("settings/setTasksBgColor", this.tasksBgColor);
    },
    setDefaultSettings() {
      this.$store.dispatch("settings/setDefaultSettings");
    },
    cancel() {
      this.$store.dispatch("settings/setUserSettings");
    },
    saveSettings() {
      this.$store.dispatch("settings/saveUserSettings");
    }
  }
};
</script>
<style lang="less" scoped>
form {
  padding: 20px;
}
.form-buttons {
  display: flex;
  justify-content: center;
  button {
    margin: 5px;
  }
}
h3 {
  padding-top: 20px;
}
</style>
