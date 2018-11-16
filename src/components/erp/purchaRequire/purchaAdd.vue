<template>
<div id="edit">
    <div style="padding:20px"> 
    <div class="heade">
      <i class="el-icon-arrow-left"></i>
      <a href="javascript:void(0)" @click="goBack">返回</a>
    </div>
    <br>
    <h2>新增採購需求單</h2>      
    <br>
       <el-button type="success" size="small" @click="handleAdd" >新增產品</el-button>
    <br> 
    <br> 
    <el-form ref="form" :model="formData"   v-loading="loading" label-position="top">
      <el-card class="box-card" v-for="(v,i) in formData.data" :key="i" style="margin-bottom:10px">

        <el-row :gutter="20">
                  <el-button :disabled="formData.data.length <= 1" style="float: right; padding: 3px 0" type="text" icon="el-icon-close" @click="handleDelete(i)"></el-button>
           <el-col :span="2">
              <el-form-item label="序號">
                <span>{{i+1}}</span>
              </el-form-item>
            </el-col>
          
             <el-col :span="3">
              <el-form-item label="需採購數量">
              <el-input v-model="v.queryQuantity"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="採購類型">
              <el-select v-model="v.purchasetype" placeholder="類型"  clearable>
                  <el-option v-for="(v,i) in purchaseOption" :key="i" :label="v" :value="v"></el-option>
            </el-select>
            </el-form-item>
            </el-col>
             <el-col :span="5">
              <el-form-item label="SKU">
              <el-input v-model="v.SKU"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="產品名稱">
              <el-input v-model="v.productName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="購買連結">
              <el-input v-model="v.purchaseLink"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="目標價格">
              <el-input v-model="v.targetPrice"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="目標價格幣別">
              <el-input v-model="v.targetPriceCurrency"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="詢價帳號">
              <el-input v-model="v.queryAccount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="產品規格">
              <el-input v-model="v.productSpec"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="備註">
              <el-input v-model="v.note" type="textarea" rows="1"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="2">
              <el-form-item label="已購買">
              <el-switch v-model="v.isPurchased"></el-switch>
              </el-form-item>
            </el-col>
        </el-row>
      </el-card>
   
       <el-button @click="submit"  size="large" :loading="submitLoading" type="primary" >新增</el-button> 
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
      purchaseOption:[],
      formData: {
        data: [
          {
            SKU: "",
            isPurchased: false,
            sku: "",
            productName: "",
            productSpec: "",
            queryQuantity:"",
            note: "",
            purchaseLink:"",
            targetPrice:"",
            targetPriceCurrency:"",
            queryAccount:"" 
          }
        ]
      }
    };
  },
  created() {
  let purchasetype = axios({
      url: "/purchasequery/value/purchasetype",
      method: "post",
      data: {
        token: this.token
      }
    }).then((res)=>{
        this.purchaseOption = res.data;
    })
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
        note: "",
        purchaseLink:"",
        targetPrice:"",
        targetPriceCurrency:"",
        queryAccount:""
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
<style lang="scss" scoped>
.heade {
  font-size: 16px;
  color: #45a2ff;
}
.heade a {
  color: #45a2ff;
}
/deep/ .el-button--text {
  color: #606266;
}
/deep/ .el-form-item{
  margin-bottom: 5px;
}
/deep/ .el-form-item__label{
  padding: 0px;
}
</style>


