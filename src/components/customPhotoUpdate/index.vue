<template>
  <el-row>
    <el-col :span="8">
      <el-form
        ref="form"
        :model="form"
        :rules="formRules"
        label-position="top"
      >
        <el-form-item
          label="wowcher code"
          prop="wowcherCode"
        >
          <el-input v-model="form.wowcherCode"></el-input>
        </el-form-item>
        <el-form-item
          label="上傳圖片"
          prop="fileSrc"
        >
          <el-button
            @click="handleUpload"
            size="small"
            type="success"
          >點擊上傳</el-button>
          <span class="img-name">
            {{ fileName }}
          </span>
        </el-form-item>
        <el-button
          @click="submit"
          :loading="submitLoading"
          type="primary"
          size="medium"
        >提交</el-button>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data: () => ({
    submitLoading: false,
    formRules: Object.freeze({
      wowcherCode: {
        required: true,
        message: "required"
      },
      fileSrc: {
        required: true,
        message: "required"
      }
    }),
    fileName: "",
    form: {
      wowcherCode: "",
      fileSrc: ""
    }
  }),
  methods:{
    handleUpload() {
      let input = document.createElement("input");
      input.type = "file";
      input.addEventListener("change", () => {
        this.form.fileSrc = input.files[0];
        if(this.form.fileSrc){
            this.$refs['form'].validateField("fileSrc");
            this.fileName = this.form.fileSrc.name;
        }
        input.remove();
      });
      input.click();
    },
     toBlob: dataurl => {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    submit() {
      this.$refs["form"].validate(action => {
        if (action) {
          this.submitLoading = true;
          let formData = new FormData();
          formData.append("orderId", this.form.wowcherCode);
          formData.append("uploadfile", this.form.fileSrc);
          formData.append("token", this.token);
          axios({
            url: "/wowcher/customized/updateImage",
            method: "post",
            data: formData,
            headers: {
            "Content-type": "multipart/form-data"
            },
            isFormData: true
          }).then(() => {
            this.submitLoading = false;
            this.$message.success("提交成功")
          }).catch(() => {
              this.submitLoading = false;
              this.$message.warning("提交失敗");
          });
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
.img-name {
  color: #bbb;
  margin-left: 10px;
}
</style>
