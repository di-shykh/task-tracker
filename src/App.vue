<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style>
* {
  margin: 0;
  box-sizing: border-box;
}
html {
  height: 100%;
}
body,
#app {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: stretch;
  font-family: "Lato", sans-serif;
}
.material-icons.md-48 {
  font-size: 48px !important;
}
.material-icons {
  vertical-align: text-top;
  cursor: pointer;
}
</style>
