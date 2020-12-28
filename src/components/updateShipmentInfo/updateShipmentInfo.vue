<template>
  <div>
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item
            label="orderId/trackingNumber："
            prop="value"
          >
            <el-input v-model="form.value"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button
          @click="submit"
          :loading="btnLoading"
          type="success"
          size="small"
        >
          Submit
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnLoading: false,
      form: {
        value: ""
      }
    };
  },
  created() {
    this.rules = {
      value: {
        required: true,
        message: "此項必填"
      }
    };
  },
  methods: {
    getValue() {
      return {
        ...this.form
      };
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          axios({
            url: "/shipment/update/shipmentstatus",
            method: "post",
            data: this.getValue()
          })
            .then(
              res => {
                if (res) {
                  this.$message.success("提交成功");
                }
              },
              () => {
                this.$message.error("提交失败");
              }
            )
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
