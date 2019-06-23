<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <h1 class="col-10 col-md-auto">Welcome To Task Tracker App</h1>
    </div>

    <div class="row justify-content-center">
      <div class="col-10 col-md-auto header">
        In order to try to use the application please pass authentication
      </div>
    </div>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import auth from "@/auth";

export default {
  name: "auth",
  mounted() {
    auth.authForm("#firebaseui-auth-container");
  }
};
</script>

<style>
@import "../../node_modules/firebaseui/dist/firebaseui.css";
.header {
  font-size: 1.5em;
}
</style>
