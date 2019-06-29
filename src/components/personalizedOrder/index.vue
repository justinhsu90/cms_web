<template>
  <el-form
    ref="form"
    :model="form"
    :rules="formRules"
    label-position="right"
    label-width="80px"
  >
    <el-row>
      <el-col :span="10">
        <el-form-item
          label="訂單號："
          prop="order"
        >
          <el-input v-model="form.order"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item
          label="留言："
          prop="remark"
        >
          <el-input
            :rows="4"
            v-model="form.remark"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item>
          <el-button
            type="success"
            size="small"
            :loading="btnLoading"
            @click="submit"
          >
            提交
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      btnLoading: false,
      form: {
        order: "",
        remark: ""
      }
    };
  },
  created() {
    this.formRules = {
      order: {
        type: "string",
        required: true,
        message: "此項必填"
      },
      remark: {
        type: "string",
        required: true,
        message: "此項必填"
      }
    };
  },
  methods: {
    getValue() {
      return {
        voucherCode: this.form.order,
        message: this.form.remark
      };
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          axios({
            url: "/order/customized/gogroopie/edit",
            method: "post",
            data: this.getValue(),
            noToken: true
          })
            .then(res => {
              if (res.hasOwnProperty("success")) {
                this.$message.error(res.msg);
              } else {
                const h = this.$createElement;
                this.$msgbox({
                  title: "提示",
                  message: h("div", null, [
                    h("p", null, "Done !!"),
                    h("p", null, [
                      h("span", null, "Your personalized message："),
                      h(
                        "span",
                        {
                          style: {
                            color: "#e6a23c"
                          }
                        },
                        `${res.message}`
                      )
                    ]),
                    h("p", null, [
                      h("span", null, "Your personalized message："),
                      h(
                        "span",
                        {
                          style: {
                            color: "#e6a23c"
                          }
                        },
                        `${res.voucherCode}`
                      )
                    ])
                  ]),
                  showConfirmButton: false,
                  showCancelButton: true,
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  beforeClose: (action, instance, done) => {
                    done();
                  }
                }).catch(() => {});
              }
            })
            .finally(() => {
              this.btnLoading = false;
            });
        }
      });
    }
  }
};
</script>

<style>
</style>
