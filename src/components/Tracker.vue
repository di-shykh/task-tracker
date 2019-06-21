<template>
  <div class="body">
    <app-sidebar
      id="app-sidebar"
      v-show="isSidebarShown"
      :style="sidebarStyle"
    />
    <main>
      <app-header />
      <router-view :style="tasksStyle" />
    </main>
  </div>
</template>

<script>
import auth from "@/auth";
import Sidebar from "./Sidebar";
import Header from "./Header";

//import draggable from "vuedraggable";

export default {
  name: "Tracker",
  components: {
    appHeader: Header,
    appSidebar: Sidebar
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
    isSidebarShown() {
      return this.$store.getters["settings/isSidebarShown"];
    },
    userSettings() {
      return this.$store.getters["settings/settings"];
    },
    sidebarStyle() {
      if (this.userSettings)
        return {
          color: this.userSettings.sidebarFontColor,
          backgroundColor: this.userSettings.sidebarColor
        };
      else
        return {
          sidebarColor: "#2828a0",
          sidebarFontColor: "#ffffff"
        };
    },
    tasksStyle() {
      if (this.userSettings)
        return {
          color: this.userSettings.fontColor,
          backgroundColor: this.userSettings.bgColor
        };
      else
        return {
          bgColor: "#f1f1f1",
          fontColor: "#000000"
        };
    }
  },
  created() {
    this.$store.getters["user/user"];
    this.$store.getters["settings/isSidebarShown"];
    this.$store.dispatch("settings/setUserSettings");
    this.$router.push("/tracker/tasks");
  },
  beforeCreate() {
    this.$store.dispatch("settings/setUserSettings");
  },
  watch: {
    isSidebarShown() {
      if (!this.isSidebarShown) {
        const main = (document.getElementsByTagName("main")[0].style.width =
          "100vw");
      }
    }
  },
  methods: {
    logOut() {
      auth.logout();
    }
  }
};
</script>
<style scoped>
.body {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: stretch;
  font-family: "Lato", sans-serif;
}
main {
  background: rgb(241, 241, 241);
  min-width: 80vw;
  height: 100%;
  overflow: auto;
}
</style>
