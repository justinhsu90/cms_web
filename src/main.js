import Vue from "vue";
import router from "@/router";
import App from "./App";
import "./won-service/init";
import "./won-service/initRouter";
new Vue({
  el: "#app",
  router,
  components: {
    App
  },
  template: "<App/>"
});
