<template>
  <div>
    <h2>
      匯入物流單號
    </h2>
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      class="pl15 pt15"
    >
      <el-row>
        <el-col>
          <el-form-item
            label="物流："
            prop="agent"
          >
            <el-select v-model="form.agent">
              <el-option
                v-for="(item,value) in searchAccountOption"
                :key="value"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item
            label="單號："
            prop="orderIdList"
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
              v-model="form.orderIdList"
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
      searchAccountOption: ["4PX", "Yun Express", "HuaHan", "Winit", "SFC"],
      form: {
        agent: "",
        orderIdList: ""
      }
    };
  },
  created() {
    this.rules = {
      orderIdList: {
        required: true,
        message: "此項必填"
      },
      agent: {
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
            url: "/shipment/add",
            method: "post",
            data: this.getValue()
          })
            .then(
              res => {
                console.log(res, 22);
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
