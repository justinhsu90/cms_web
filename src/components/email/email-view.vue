<template>
  <div>
    <!-- <el-button type="success" size="small">發送</el-button> -->
    <div class="email-receive mt20">
      <div class="email-receive__name ibbox">
        <span>訂單號：</span>
      </div>
      <!-- <input
        class="email-receive__text"
        type="text"
        placeholder="輸入對方手機號"
      > -->
      <el-select
        class="email-receive__text"
        v-model="value9"
        allow-create
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <el-option
          v-for="item in options4"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
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
      <!-- <tinymce :config='{height:300,theme: "modern"}'></tinymce> -->
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
    <br>
    <el-button
      type="success"
      size="small"
    >發送</el-button>
  </div>
</template>

<script>
// import tinymce from "@/common/tinymce";
export default {
  components: {
    // tinymce
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
  methods: {
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options4 = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options4 = [];
      }
    }
  },
  data: () => ({
    content: "",
    options4: [],
    value9: [],
    list: [],
    loading: false,
    states: [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming"
    ]
  })
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
  width: calc(100% - 100px);
  /deep/ input {
    border: none !important;
    outline: none !important;
    font-size: 14px;
    height: 20px !important;
  }
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
  width: calc(100% - 100px);
  padding-left: 15px;
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
