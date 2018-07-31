<template>
<div id="edit">
    <div style="padding:20px"> 
    <div class="heade">
      <i class="el-icon-arrow-left"></i>
      <a href="javascript:void(0)" @click="goBack">返回</a>
    </div>
    <br>
    <h2>新增採購單</h2>
    <br>
        <el-button type="success" size="small" @click="handleAdd" >新增產品</el-button>
      <br>
    <br> 
    <el-form ref="form" :model="formData"   v-loading="loading" label-position="top">
      <el-card class="box-card" v-for="(v,i) in formData.data" :key="i" style="margin-bottom:20px">
        <el-row :gutter="10">
                  <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" @click="handleDelete(i)"></el-button>

            <el-col :span="2">
              <el-form-item label="序號">
                <span>{{i+1}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="採購類型">
              <el-input v-model="v.purchaseType"></el-input>
              </el-form-item>
            </el-col> <el-col :span="2">
              <el-form-item label="採購數量">
              <el-input v-model="v.queryQuantity"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="SKU">
              <el-input v-model="v.sku"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="產品名稱">
              <el-input v-model="v.productName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="產品規格">
              <el-input v-model="v.productSpec"></el-input>
              </el-form-item>
            </el-col>
            
            <el-col :span="2">
              <el-form-item label="採購總金額">
              <el-input v-model="v.purchasedTotalAmount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="運費">
              <el-input v-model="v.shippingCost"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="幣別">
              <el-input v-model="v.currency"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="採購時間">
               <el-date-picker v-model="v.purchasedTime" type="datetime" placeholder="选择日期时间"> </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="採購平台">
              <el-input v-model="v.purchasedPlatform"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="採購帳號">
              <el-input v-model="v.purchasedAccount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="採購平台單號">
              <el-input v-model="v.purchaseOrderId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="購買人員">
              <el-input v-model="v.purchasedBy"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="備註" >
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
            sku: "",
            productName: "",
            productSpec: "",
            purchasedQuantity: "",
            purchasedTotalAmount: "",
            currency: "",
            purchasedTime: "",
            purchasedPlatform: "",
            purchasedAccount: "",
            purchasedBy: "",
            note: "",
            shippingCost: "",
            purchaseOrderId: "",
            purchaseType: ""
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    goBack() {
      this.$router.push("/erpPurchase");
    },
    handleAdd() {
      let obj =   {
            sku: "",
            productName: "",
            productSpec: "",
            purchasedQuantity: "",
            purchasedTotalAmount: "",
            currency: "",
            purchasedTime: "",
            purchasedPlatform: "",
            purchasedAccount: "",
            purchasedBy: "",
            note: "",
            shippingCost: "",
            purchaseOrderId: "",
            purchaseType: ""
          }
      this.formData.data.push(obj);
    },
    handleDelete(index) {
      this.formData.data.splice(index, 1);
    },
    getValue() {
      let data = _.cloneDeep(this.formData.data);
      data.purchasedTime = this.moment(data.purchasedTime).format('"YYYY-MM-DD HH:mm:ss"');
      let obj = {
        data
      };
      return JSON.stringify(obj);
    },
    submit() {
      this.$refs["form"].validate(action => {
        if (action) {
          this.getValue();
          this.submitLoading = true;
          axios({
            url: "/purchase/add",
            method: "post",
            data: {
              value: this.getValue(),
              token: this.token
            }
          }).then(res => {
            this.submitLoading = true;
            this.Bus.$emit("refresh");
            this.$router.push("/erpPurchase");
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


