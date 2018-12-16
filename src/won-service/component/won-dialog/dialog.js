import Vue from "vue";
import { Dialog, Button } from "element-ui";
let ele = document.createElement("div");
document.scrollingElement.appendChild(ele);
export default (dialogContent, prop) => {
  const extend = Vue.extend({
    components: {
      [Dialog.name]: Dialog,
      [Button.name]: Button
    },
    data: () => ({
      visible: true
    }),
    methods: {
      dialogHide() {
        this.visible = false;
      },
      dialogSure() {
        this.$refs["dialog-content"].submit().then(() => {
          this.visible = false;
        });
      }
    },
    render(h) {
      let props = {
        ...prop,
        visible: this.visible,
        showClose: false
      };
      return h(
        "elDialog",
        {
          props
        },
        [
          h(dialogContent, {
            ref: "dialog-content"
          }),
          h(
            "div",
            {
              slot: "footer"
            },
            [
              h("elButton", {
                domProps: {
                  innerText: "取消"
                },
                on: {
                  click: this.dialogHide
                }
              }),
              h("elButton", {
                domProps: {
                  innerText: "确定"
                },
                props: {
                  type: "primary"
                },
                on: {
                  click: this.dialogSure
                }
              })
            ]
          )
        ]
      );
    }
  });

  new extend().$mount(ele);
  ele = document.querySelector(".el-dialog__wrapper");
};
