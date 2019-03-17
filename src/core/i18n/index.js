import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "./lang/en";
import zh from "./lang/zh";
import elemetEn from "../../../static/lib/ele/lange/en";
import elemetZh from "../../../static/lib/ele/lange/zh-cn";
Vue.use(VueI18n);
export default new VueI18n({
  locale: "zh",
  messages: {
    en: {
      ...en,
      ...elemetEn
    },
    zh: {
      ...zh,
      ...elemetZh
    }
  }
});
