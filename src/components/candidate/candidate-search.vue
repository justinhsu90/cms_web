<template>
  <el-form
    ref="form"
    :model="form"
    label-position="left"
    label-width="120px"
  >
    <el-row>
      <el-col :span="14">
        <el-form-item
          label="型号"
          prop="tel"
        >
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  data: () => ({
    form: { tel: "" }
  }),
  methods: {
    validate() {
      return true;
    },
    submit() {
      return Promise.resolve(this.form);
    }
  }
};
</script>

<style>
</style>
