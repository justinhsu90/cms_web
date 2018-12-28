import Vue from "vue";
import { Dialog, Button } from "element-ui";
export default (dialogContent, prop) => {
  let ele = document.createElement("div");
  document.scrollingElement.appendChild(ele);
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
      },
      update(e) {
        this.visible = e;
      },
      close() {
        setTimeout(() => {
          this.$el.remove();
        }, 0);
      }
    },
    render(h) {
      let props = {
        ...prop,
        visible: this.visible
      };
      return h(
        "elDialog",
        {
          props,
          on: {
            "update:visible": this.update,
            close: this.close
          }
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
  new extend({ el: ele });
};
