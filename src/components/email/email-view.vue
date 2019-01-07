<template>
  <div>
      <el-button type="success" size="small">發送</el-button>
      <div class="email-receive mt20">
        <div class="email-receive__name ibbox">
            <span>收件人：</span> 
        </div>
        <input class="email-receive__text" type="text" placeholder="輸入對方手機號">
      </div>
      <div class="email-style mt20">
        <div class="email-style__name ibbox">
            <span>主題：</span> 
        </div>
        <input class="email-style__text" type="text">
      </div>
      <div class="mt20">
        <tinymce :config='{height:300,theme: "modern"}'></tinymce>
      </div>
      <div class="email-send mt20">
          <div class="email-send__name ibbox">
            <span>發件人：</span> 
        </div>
      </div>
      <br>
      <el-button type="success" size="small">發送</el-button>
  </div>
</template>

<script>
import tinymce from "@/common/tinymce";
export default {
  components: {
    tinymce
  }
};
</script>

<style lang="scss" scoped>
.email-receive {
  border-bottom: 1px solid #ebeef5;
  height: 27px;
}
.email-receive__name {
  color: #606266;
  font-size: 15px;
  width: 60px;
}
.email-receive__text {
  border: none;
  outline: none;
  font-size: 14px;
}
.email-style {
  border-bottom: 1px solid #ebeef5;
  height: 27px;
}
.email-style__name {
  width: 60px;
  color: #606266;
  font-size: 15px;
}
.email-style__text {
  border: none;
  outline: none;
  font-size: 14px;
}
.email-send {
  height: 27px;
}
.email-send__name {
  width: 60px;
  color: #606266;
  font-size: 15px;
}
.email-send__text {
  border: none;
  outline: none;
  font-size: 14px;
}
</style>
