<template>
<div>
    <div style="padding:20px"> 
    <div class="heade">
      <i class="el-icon-arrow-left"></i>
      <a href="javascript:void(0)" @click="goBack">返回</a>
    </div>
    <br>
    <h2>編輯採購需求單</h2>
    <br> 
    <el-form ref="form" :model="formData"   v-loading="loading" label-position="top">
      <el-card class="box-card" v-for="(v,i) in formData.data" :key="i" style="margin-bottom:20px">

        <el-row :gutter="20">
             <el-col :span="2">
              <el-form-item label="已購買">
              <el-switch v-model="v.isPurchased"></el-switch>
              </el-form-item>
            </el-col>
             <el-col :span="5">
              <el-form-item label="採購需求單號">
              <el-input v-model="v.purchaseQueryId" disabled></el-input>
              </el-form-item>
            </el-col>
           
             <el-col :span="3">
              <el-form-item label="需採購數量">
              <el-input v-model="v.queryQuantity"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="5">
              <el-form-item label="SKU">
              <el-input v-model="v.SKU"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
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
            <el-col :span="6">
              <el-form-item label="採購單號">
              <el-input v-model="v.purchaseId" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="新增時間">
              <el-input v-model="v.queryTime" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="採購類型">
              <el-input v-model="v.purchaseType" disabled></el-input>
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
       <el-button @click="submit"  :loading="submitLoading" type="primary" style="width:150px;height:60px;font-size:18px;display:inline-block">編輯</el-button> 
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
                        purchaseId: "",
                        purchaseQueryId: "",
                        productName: "",
                        productSpec: "",
                        queryQuantity: "",
                        note: "",
                        queryTime: "",
                        purchaseType: "",
                        purchaseLink: "",
                        targetPrice: "",
                        targetPriceCurrency: "",
                        queryAccount: ""
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
        this.formData.data[0].purchaseLink = data.purchaseLink;
        this.formData.data[0].targetPrice = data.targetPrice;
        this.formData.data[0].targetPriceCurrency = data.targetPriceCurrency;
        this.formData.data[0].queryAccount = data.queryAccount;
    },
    methods: {
        goBack() {
            this.$router.push("/purchaRequire");
        },
        getValue() {
            let data = _.cloneDeep(this.formData.data);
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
/deep/ .el-form-item {
    margin-bottom: 5px;
}
/deep/ .el-form-item__label{
  padding: 0px;
}
</style>


