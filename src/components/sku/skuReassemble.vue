<template>
  <el-form :model="form" label-position="left" label-width="70px">
      <el-form-item label="新SKU：" prop="newSKU">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-input v-model="form.newSKU"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button size="small" @click="handleNewCheck">檢查</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="舊SKU：" prop="oldSKU">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-input v-model="form.oldSKU"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button size="small" @click="handleOldCheck">檢查</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleReassemble" type="primary" class="ml10" size="small">重編</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        newSKU: "",
        oldSKU: ""
      }
    };
  },
  methods: {
    handleReassemble() {},
    handleNewCheck() {},
    handleOldCheck() {}
  }
};
</script>

<style>
</style>
