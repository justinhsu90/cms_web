<template>
  <div>
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-position="top"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item
            label="Voucher Code："
            prop="voucherCode"
          >
            <el-input v-model="form.voucherCode"></el-input>
          </el-form-item>
          <el-form-item
            label="Account："
            prop="account"
          >
            <el-select v-model="form.account">
              <el-option
                v-for="(v) in accounts"
                :key="v"
                :value="v"
              ></el-option>
            </el-select>
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
import showDialog from "@/won-service/component/won-dialog/dialog";
export default {
  data() {
    return {
      btnLoading: false,
      accounts: ["MagicTrend", "BuySomething", "VendinPlus"],
      form: {
        voucherCode: "",
        account: ""
      }
    };
  },
  created() {
    this.rules = {
      voucherCode: {
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
            url: "/wowcher/generate/mappingId",
            method: "get",
            params: this.getValue()
          })
            .then(
              res => {
                showDialog(
                  {
                    render(h) {
                      return h("div", res);
                    }
                  },
                  {
                    width: "400px",
                    title: ""
                  },
                  {}
                );
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
