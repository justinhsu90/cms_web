import Vue from "vue";
import { Dialog, Button } from "element-ui";
export default (dialogContent, prop, options) => {
  let ele = document.createElement("div");
  document.body.appendChild(ele);
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
        if (this.$refs["dialog-content"].validate) {
          if (!this.$refs["dialog-content"].validate()) return;
        }
        if (this.$refs["dialog-content"].submit) {
          this.$refs["dialog-content"].submit().then(res => {
            options.submit && options.submit(res);
            this.visible = false;
          });
        } else {
          options.submit && options.submit();
          this.visible = false;
        }
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
      let footer = [];
      if (!prop.hideConfirm) {
        footer.push(
          h("elButton", {
            domProps: {
              innerText: "Confirm"
            },
            props: {
              type: "primary"
            },
            on: {
              click: this.dialogSure
            }
          })
        );
      }
      if (!prop.hideCancel) {
        footer.push(
          h("elButton", {
            domProps: {
              innerText: "Cancel"
            },
            on: {
              click: this.dialogHide
            }
          })
        );
      }
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
            props,
            ref: "dialog-content"
          }),
          h(
            "div",
            {
              slot: "footer"
            },
            footer
          )
        ]
      );
    }
  });
  new extend({ el: ele });
};
