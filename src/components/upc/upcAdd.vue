<template>
<div id="edit">
    <div style="padding:20px"> 
    <div class="heade">
      <i class="el-icon-arrow-left"></i>
      <a href="javascript:void(0)" @click="goBack">返回</a>
    </div>
    <br>
    <h2>指派 UPC</h2>
    <br> 
    <el-form ref="form" :model="formData"   v-loading="loading" label-position="top">
      <el-card class="box-card" v-for="(v,i) in formData.data" :key="i" style="margin-bottom:20px">
        <el-row :gutter="24">
           <el-col :span="6">
              <el-form-item label="UPC (指定輸入)">
              <el-input v-model="v.upc"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="4">
              <el-form-item label="使用 SKU">
              <el-input v-model="v.subSku"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="ASIN">
              <el-input v-model="v.asin"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="產品名稱">
              <el-input v-model="v.productName"></el-input>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item label="平台">
              <el-input v-model="v.platform"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="4">
              <el-form-item label="帳號">
              <el-input v-model="v.account"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="4">
              <el-form-item label="國家">
              <el-input v-model="v.country"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="備註">
              <el-input v-model="v.note" type="textarea" rows="1"></el-input>
              </el-form-item>
            </el-col>
        </el-row>
      </el-card>
      <br>
       <el-button @click="submit"  :loading="submitLoading" type="primary" style="width:150px;height:60px;font-size:18px;display:inline-block">新增</el-button> 
    </el-form> 
    </div>         
 </div>     
</template>
<script>
export default {
  watch: {},
  data() {
    return {
      submitLoading: false,
      loading: false,
      formData: {
        data: [
          {
        subSku: "",
        upc: "",
        productName: "",
        asin: "",
        country: "",
        account: "",
        platform: "",
        note: ""
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    goBack() {
      this.$router.push("/upc");
    },
    handleAdd() {
      let obj = {
        subSku: "",
        upc: "",
        productName: "",
        asin: "",
        country: "",
        account: "",
        platform: "",
        note: ""
      };
      this.formData.data.push(obj)
    },
    handleDelete(index) {
      this.formData.data.splice(index,1);
    },
    getValue(){
    let data = _.cloneDeep(this.formData.data);
    let obj = {
      data
    }
    return JSON.stringify(obj);
    },
    submit() {
      this.$refs["form"].validate(action => {
        if (action) {
          this.getValue();
          this.submitLoading = true;
          axios({
            url: "/upc/add",
            method: "post",
            data: {
              value: this.getValue(),
              token: this.token
            }
          }).then(res => {
            this.submitLoading = true;
            this.Bus.$emit("refresh");
            this.$router.push("/upc");
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
#edit .heade {
  font-size: 16px;
  color: #45a2ff;
}
#edit .heade a {
  color: #45a2ff;
}
#edit {
  .el-button--text {
    color: #606266;
  }
}
</style>


