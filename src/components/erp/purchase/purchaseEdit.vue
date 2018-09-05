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
          <el-row :gutter="10">
            <el-button :disabled="formData.data.length <= 1" style="float: right; padding: 3px 0" type="text" icon="el-icon-close" @click="handleDelete(i)"></el-button>
            <el-col :span="2">
              <el-form-item label="序號">
                <span>{{i+1}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="採購類型" :prop="'data.'+i+'.purchaseType'" :rules="rules">
                <el-select v-model="v.purchaseType">
                  <el-option v-for="(value,i) in purchaseType" :label="value" :value="value" :key="i"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="採購數量" :prop="'data.'+i+'.purchasedQuantity'" :rules="rules">
                <el-input v-model.number="v.purchasedQuantity"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="SKU" :prop="'data.'+i+'.sku'" :rules="rules">
                <template slot="label">
                  <span>SKU</span>
                </template>
                <el-input  v-model.trim="v.sku"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="產品名稱">
                <el-input v-model="v.productName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="產品規格">
                <el-input v-model="v.productSpec"></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="3">
              <el-form-item label="採購總金額" :prop="'data.'+i+'.purchasedTotalAmount'" :rules="rules">
                <el-input v-model="v.purchasedTotalAmount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="運費">
                <el-input v-model="v.shippingCost"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="幣別"  :prop="'data.'+i+'.currency'"  :rules="rules">
                <el-select v-model="v.currency">
                  <el-option v-for="(value,i) in currency" :label="value" :value="value" :key="i"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="採購時間" :prop="'data.'+i+'.purchasedTime'" :rules="rules">
                <el-date-picker style="width:100%" v-model="v.purchasedTime" type="datetime" placeholder="选择日期时间"> </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="採購平台"  :prop="'data.'+i+'.purchasedPlatform'" :rules="rules">
                <el-select v-model="v.purchasedPlatform">
                  <el-option v-for="(value,i) in purchasePlatform" :label="value" :value="value" :key="i"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="採購帳號" :prop="'data.'+i+'.purchasedAccount'" :rules="rules">
                <el-select v-model="v.purchasedAccount">
                  <el-option v-for="(value,i) in purchaseAccount" :label="value" :value="value" :key="i"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="採購平台單號" :prop="'data.'+i+'.purchaseOrderId'" :rules="rules"> 
                <el-input v-model="v.purchaseOrderId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="購買人員">
                <el-input v-model="v.purchasedBy"></el-input>
              </el-form-item>
            </el-col>
           </el-row> 
           <el-row>
            <el-col :span="24">
              <el-form-item label="備註">
                <el-input v-model="v.note" type="textarea" rows="1"></el-input>
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
      purchasePlatform:[],
      purchaseType:[],
      purchaseAccount:[],
      currency:[],
      rules:{
              required:true,
              message:'此项必填'
            },
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
  created() {
      let purchasePlatform = axios({
      url: "/erp/value/purchasePlatform",
      method: "post",
      data: {
        token: this.token
      }
    });
    let purchaseType = axios({
      url: "/erp/value/purchaseType",
      method: "post",
      data: {
        token: this.token
      }
    });
    let purchaseAccount = axios({
      url: "/erp/value/purchaseAccount",
      method: "post",
      data: {
        token: this.token
      }
    });
    let currency = axios({ 
      url: "/erp/value/currency",
      method: "post",
      data: {
        token: this.token
      }
    });
  Promise.all([purchasePlatform,purchaseType,purchaseAccount,currency]).then(([resOne,resTwo,resThree,resFour])=>{
      this.purchaseType = _.cloneDeep(resTwo);
      this.purchaseAccount = _.cloneDeep(resThree);
      this.currency = _.cloneDeep(resFour);
      this.purchasePlatform = _.cloneDeep(resOne);
  })
    
    let data = JSON.parse(this.$route.query.data);
    this.formData.data[0].sku = data.sku; 
    this.formData.data[0].shippingCost = data.shippingCost;
    this.formData.data[0].purchasedTotalAmount = data.purchasedTotalAmount;
    this.formData.data[0].purchasedTime = new Date(data.purchasedTime);
    this.formData.data[0].purchasedQuantity = data.purchasedQuantity;
    this.formData.data[0].purchasedPlatform = data.purchasedPlatform;
    this.formData.data[0].purchasedBy = data.purchasedBy;
    this.formData.data[0].purchasedAccount = data.purchasedAccount;
    this.formData.data[0].purchaseType = data.purchaseType;
    this.formData.data[0].purchaseOrderId = data.purchaseOrderId;
    this.formData.data[0].purchaseId = data.purchaseId;
    this.formData.data[0].productSpec = data.productSpec;
    this.formData.data[0].productName = data.productName;
    this.formData.data[0].lastModifiedBy = data.lastModifiedBy;
    this.formData.data[0].currency= data.currency;
    this.formData.data[0].note = data.note;
  },
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
            url: "/purchase/update",
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
#edit {
    .heade {
        font-size: 16px;
        color: #45a2ff;
    }
    .el-form-item {
        margin-bottom: 6px;
    }
    .el-form-item__label {
        padding: 0px !important;
    }
    .heade a {
        color: #45a2ff;
    }
}
</style>


