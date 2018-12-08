import Vue from 'vue';
import {
  Dialog
} from 'element-ui';
Vue.extend({
  components: {
    [Dialog.name]: Dialog
  },
  render(h) {
    return h(dialog)
  }
})
