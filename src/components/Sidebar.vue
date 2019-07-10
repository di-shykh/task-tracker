<template>
  <nav :style="sidebarFontColor">
    <header>
      <span>
        <i class="material-icons md-48">trip_origin</i>
      </span>
      ToDo
    </header>
    <ul>
      <li
        :class="{ active: isActive }"
        @click="isActive = !isActive"
        :style="sidebarBgColor"
      >
        <span><i class="material-icons">home</i></span>
        <router-link to="/tracker/tasks" tag="a" :style="sidebarFontColor"
          >Home</router-link
        >
      </li>
      <li
        :class="{ active: !isActive }"
        @click="isActive = !isActive"
        :style="sidebarBgColor"
      >
        <span><i class="material-icons">settings</i></span>
        <router-link to="/tracker/settings" tag="a" :style="sidebarFontColor"
          >Settings</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isActive: true
    };
  },
  computed: {
    sidebarFontColor() {
      if (this.$store.getters["settings/settings"])
        return {
          color: this.$store.getters["settings/settings"].sidebarFontColor
        };
      else
        return {
          color: "#FFFFFF"
        };
    },
    sidebarBgColor() {
      if (this.$store.getters["settings/settings"]) {
        return {
          backgroundColor: this.$store.getters["settings/settings"].sidebarColor
        };
      } else {
        return {
          backgroundColor: "#2828a0"
        };
      }
    }
  }
};
</script>

<style lang="less" scoped>
@bgColor: #2828a0;
nav {
  height: 100%;
  background: @bgColor;
  width: 20vw;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  a {
    text-decoration: none;
    color: #ffffff;
    font-size: 1.2em;
    font-weight: bolder;
    :hover {
      color: lightgray;
      text-decoration: none;
    }
  }
  ul {
    padding: 0;
    list-style: none;
  }
  li {
    padding: 10px;
  }
  .active {
    border-left: 4px solid #1b84f0;
    background: lighten(@bgColor, 50%);
  }
  header {
    font-size: 2em;
    font-weight: bold;
    text-align: center;
    padding: 10px;
  }
  i {
    color: #1b84f0;
  }
}
@media (max-width: 500px) {
  nav {
    a {
      font-size: 0.9em;
    }
    header {
      font-size: 1.1em;
    }
  }
}
</style>
