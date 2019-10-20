<template>
  <div>
    <!-- <el-button type="success" size="small">發送</el-button> -->
    <div class="mt20">
      <div class="ibbox mt20  mb10">
        <span>訂單號：</span>
      </div>
      <el-input
        v-model="orderId"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 6 }"
      >

      </el-input>
    </div>
    <div class="email-style mt20">
      <div class="email-style__name ibbox">
        <span>主題：</span>
      </div>
      <input
        class="email-style__text"
        type="text"
      >
    </div>
    <div class="mt20">
      <el-input
        type="textarea"
        :autosize="{ minRows: 10, maxRows: 12}"
        placeholder="请输入内容"
        v-model="content"
      >
      </el-input>
    </div>
    <div class="email-send mt20">
      <div class="email-send__name ibbox">
        <span>發件人：</span>
      </div>
    </div>
    <div class="mt20">
      <el-checkbox-group v-model="checkList">
        <el-checkbox :label="1">訂單號</el-checkbox>
        <el-checkbox :label="2">客戶姓名</el-checkbox>
        <el-checkbox :label="3">產品名稱</el-checkbox>
        <el-checkbox :label="4">物流單號</el-checkbox>
      </el-checkbox-group>
    </div>
    <!-- <div class="mt20">
      <el-select v-model="selectMail">
        <el-option></el-option>
      </el-select>
    </div> -->
    <br>
    <el-button
      type="success"
      size="small"
    >發送</el-button>
  </div>
</template>

<script>
export default {
  methods: {},
  data: () => ({
    selectMail: "",
    checkList: [],
    content: "",
    list: [],
    loading: false,
    orderId: ""
  }),
  created() {
    axios({
      url: "mail/value/account",
      method: "post",
      data: {
        token: this.token
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.email-receive {
  border-bottom: 1px solid #ebeef5;
  min-height: 35px;
  padding-bottom: 10px;
}
.email-receive__name {
  color: #606266;
  font-size: 15px;
  width: 60px;
}
.email-receive__text {
  width: calc(100% - 100px);
  min-height: 30px;
  border: none !important;
  outline: none !important;
  font-size: 14px;
  resize: none;
}
/deep/ .el-select__tags > span {
  display: contents;
}
.email-style {
  border-bottom: 1px solid #ebeef5;
  height: 27px;
  padding-bottom: 10px;
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
  width: calc(100% - 100px);
  min-height: 30px;
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
