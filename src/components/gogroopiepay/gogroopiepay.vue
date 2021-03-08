<template>
  <div>
    <h2>
      Gogroopie標記付款
    </h2>
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      class="pl15 pt15"
    >
      <el-row>
        <el-col :span="4">
          <el-form-item
            label="物流："
            prop="date"
          >
            <el-date-picker
              style="width:100%"
              v-model="form.date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="選擇日期時間"
            > </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14">
          <el-form-item
            label="單號："
            prop="voucherCodeList"
          >
            <template slot="label">
              <span>
                單號：
              </span>
              <span class="label-tips">
                只接受OrderId. 每個單號需用(換行, 逗號) 其中一個分開
              </span>
            </template>
            <el-input
              rows="6"
              type="textarea"
              v-model="form.voucherCodeList"
            ></el-input>
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
          發送
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
        date: "",
        voucherCodeList: ""
      }
    };
  },
  created() {
    this.rules = {
      voucherCodeList: {
        required: true,
        message: "此項必填"
      },
      date: {
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
            url: "/gogroopie/markpaid",
            method: "post",
            data: this.getValue()
          })
            .then(
              () => {
                this.$message.success("提交成功");
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
