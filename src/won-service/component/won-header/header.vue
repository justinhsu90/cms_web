<template>
  <div class="header">
    <i class="el-icon-arrow-left"></i>
    <a
      href="javascript:void(0)"
      @click="goBack"
    >返回</a>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$emit("goBack");
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  font-size: 16px;
  color: #45a2ff;
  margin-bottom: 10px;
}
.header a {
  color: #45a2ff;
}
</style>
