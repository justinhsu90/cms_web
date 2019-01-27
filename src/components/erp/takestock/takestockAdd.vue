<template>
  <el-form
    ref="form"
    :model="form"
    label-width="80px"
    label-position="right"
    :rules="rules"
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="SKU：" prop="sku">
          <el-input v-model="form.sku"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="數量：" prop="quantity">
          <el-input v-model="form.quantity"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="時間：" prop="takeTime">
          <el-date-picker
            v-model="form.takeTime"
            type="datetime"
            placeholder="選擇日期時間"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      rules: {
        sku: {
          required: true,
          message: "此項必填"
        },
        quantity: {
          required: true,
          message: "此項必填"
        },
        takeTime: {
          required: true,
          message: "此項必填"
        }
      },
      form: {
        sku: "",
        quantity: "",
        takeTime: ""
      }
    };
  },
  methods: {
    validate() {
      let v = false;
      this.$refs["form"].validate(valid => {
        if (valid) {
          v = true;
        }
      });
      return v;
    },
    getValue() {
      let form = _.cloneDeep(this.form);
      form.takeTime = moment(form.takeTime).format("YYYY-MM-DD HH:mm:ss");
      let data = {
        token: this.token,
        ...form
      };
      return data;
    },
    submit() {
      return axios({
        url: "erp/inventoryTakeStock/add",
        method: "post",
        data: this.getValue()
      }).then(() => {
        this.Bus.$emit("update:takestockList");
      });
    }
  }
};
</script>

<style>
</style>
