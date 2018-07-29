<template>
<div id="edit">
    <div style="padding:20px"> 
    <div class="heade">
      <i class="el-icon-arrow-left"></i>
      <a href="javascript:void(0)" @click="goBack">返回</a>
    </div>
    <br>
    <h2>编辑採購需求單</h2>
    <br> 
    <el-form ref="form" :model="formData"   v-loading="loading" label-position="top">
      <el-card class="box-card" v-for="(v,i) in formData.data" :key="i" style="margin-bottom:20px">
      <div slot="header" class="clearfix">
        <span>{{i+1}}</span>
        <el-button disabled style="float: right; padding: 3px 0" type="text" icon="el-icon-close" @click="handleDelete(i)"></el-button>
      </div>
        <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="SKU">
              <el-input v-model="v.SKU"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="sku">
              <el-input v-model="v.sku"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="productName">
              <el-input v-model="v.productName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="productSpec">
              <el-input v-model="v.productSpec"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="queryQuantity">
              <el-input v-model="v.queryQuantity"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="isPurchased">
              <el-switch v-model="v.isPurchased"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="purchaseId">
              <el-input v-model="v.purchaseId" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="purchaseQueryId">
              <el-input v-model="v.purchaseQueryId" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="queryTime">
              <el-input v-model="v.queryTime" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="purchaseType">
              <el-input v-model="v.purchaseType" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="備註">
              <el-input v-model="v.note" type="textarea" rows="4"></el-input>
              </el-form-item>
            </el-col>
        </el-row>
      </el-card>
      <br>
       <el-button @click="submit"  :loading="submitLoading" type="primary" style="width:150px;height:60px;font-size:18px;display:inline-block">编辑</el-button> 
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
            SKU: "",
            isPurchased: false,
            sku: "",
            purchaseId:"",
            purchaseQueryId:"",
            productName: "",
            productSpec: "",
            queryQuantity:"",
            note: "",
            queryTime:"",
            purchaseType:"",
          }
        ]
      }
    };
  },
  created() {
    let data = JSON.parse(this.$route.query.data);
    this.formData.data[0].SKU = data.sku;
    this.formData.data[0].sku = data.sku; 
    this.formData.data[0].isPurchased = data.isPurchased;
    this.formData.data[0].productName = data.productName;
    this.formData.data[0].productSpec = data.productSpec;
    this.formData.data[0].queryQuantity = data.queryQuantity;
    this.formData.data[0].note = data.note;
    this.formData.data[0].purchaseId = data.purchaseId;
    this.formData.data[0].purchaseQueryId = data.purchaseQueryId;
    this.formData.data[0].queryTime = data.queryTime;
    this.formData.data[0].purchaseType = data.purchaseType;
  },
  methods: {
    goBack() {
      this.$router.push("/purchaRequire");
    },
    handleAdd() {
      let obj = {
        SKU: "",
        isPurchased: false,
        sku: "",
        productName: "",
        productSpec: "",
        queryQuantity:"",
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
            url: "/purchasequery/add",
            method: "post",
            data: {
              value: this.getValue(),
              token: this.token
            }
          }).then(res => {
            this.submitLoading = true;
            this.Bus.$emit("refresh");
            this.$router.push("/purchaRequire");
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


