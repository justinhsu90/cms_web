<template>
  <div>
    <el-form
      :model="form"
      label-suffix="："
      label-position="left"
      label-width="80px"
    >
      <el-form-item label="名稱">
        <span>名稱</span>
      </el-form-item>
      <el-form-item label="Email">
        <span>Email</span>
      </el-form-item>
      <el-form-item label="公司">
        <span>公司</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        company: ""
      }
    };
  }
};
</script>

<style>
</style>
