import Vue from "vue";
import router from "@/router";
import App from "./App";
import i18n from "./core/i18n";
import "./won-service/init";
import "./won-service/initRouter";

new Vue({
  el: "#app",
  router,
  i18n,
  components: {
    App
  },
  template: "<App/>"
});
