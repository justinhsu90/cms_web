<template>
  <el-form :model="form" label-width="80px" label-position="left" :inline="true">
      <el-form-item label="類型：">
          <el-select v-model="form.select">
              <el-option v-for="(v,i) in searchOption" :key="i" :value="v" :label="v"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="訂單號：">
          <el-input class="w-max200" v-model="form.value"></el-input>
      </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        select: "",
        value: ""
      },
      searchOption: ["wowcherCode", "trackingNumber", "orderID"]
    };
  },
  methods: {
    validate() {
      return true;
    },
    submit() {
      return axios({
        url: "order/shipment/cancel",
        method: "post",
        data: {
          token: this.token,
          value: this.form.value,
          type: this.form.select
        }
      }).then(() => {
        this.$message.success("修改成功");
      });
    }
  }
};
</script>

<style>
</style>
