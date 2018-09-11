<template>
  <div id="purchaseAdd">
    <div style="padding:20px">
      <div class="heade">
        <i class="el-icon-arrow-left"></i>
        <a href="javascript:void(0)" @click="goBack">返回</a>
      </div>
      <br>
      <h2>新增採購單
        <el-button :disabled="disabled" style="float:right" type="success" size="small" @click="handleAdd">新增產品</el-button>
      </h2>
      <br>
      <el-form ref="form" :model="formData" v-loading="loading" label-position="top">
        <el-row :gutter="10">
          <el-col :span="2">
            <el-form-item label="採購類型" prop="purchaseType" :rules="rules">
              <el-select v-model="formData.purchaseType">
                <el-option v-for="(value,i) in purchaseType" :label="value" :value="value" :key="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>          
          <el-col :span="2">
            <el-form-item label="採購平台" prop="purchasedPlatform" :rules="rules">
              <el-select v-model="formData.purchasedPlatform">
                <el-option v-for="(value,i) in purchasePlatform" :label="value" :value="value" :key="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="採購帳號" prop="purchasedAccount" :rules="rules">
              <el-select v-model="formData.purchasedAccount">
                <el-option v-for="(value,i) in purchaseAccount" :label="value" :value="value" :key="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
           <el-col :span="2">
              <el-form-item label="幣別" prop="currency" :rules="rules">
                <el-select v-model="formData.currency">
                  <el-option v-for="(value,i) in currency" :label="value" :value="value" :key="i"></el-option>
                </el-select> 
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="運費總金額">
                 <el-input disabled :value="totalPurchasedAmount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="產品總金額">
                 <el-input disabled :value="totalShippingCost"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="總金額">
                 <el-input disabled :value=" (totalShippingCost + totalPurchasedAmount).toFixed(2) "></el-input>
              </el-form-item>
            </el-col>
          <el-col :span="2">
            <el-form-item label="購買人員">
              <el-input v-model="formData.purchasedBy"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="採購平台單號" prop="purchaseOrderId" :rules="rules">
              <el-input v-model="formData.purchaseOrderId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="採購時間" prop="purchasedTime" :rules="rules">
              <el-date-picker style="width:100%" v-model="formData.purchasedTime" type="date" placeholder="選擇日期時間"> </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <br>
         <el-card class="box-card" v-for="(v,i) in formData.data" :key="i" style="margin-bottom:20px">
          <el-row :gutter="5">
            <el-button :disabled="formData.data.length <= 1" style="float: right; padding: 3px 0" type="text" icon="el-icon-close" @click="handleDelete(i)"></el-button>
            <el-col :span="1">
              <el-form-item label="序號">
                <span>{{i+1}}</span>
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
                  <el-button type="text" @click="handleCheckSku(v.sku,v)">檢查</el-button>
                  <el-button class="ml0"  type="text" @click="handleQuerySku">查询</el-button>
                </template>
                <el-input @blur="handleCheckSku(v.sku,v)" v-model.trim="v.sku"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="產品名稱">
                <el-input v-model="v.productName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="該品總金額" :prop="'data.'+i+'.purchasedTotalAmount'" :rules="rules">
                <el-input v-model="v.purchasedTotalAmount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="該品運費" :prop="'data.'+i+'.shippingCost'" :rules="rules">
                <el-input v-model.number="v.shippingCost"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="該品總金額">
                <el-input :disabled="true" :value="(v.shippingCost + v.purchasedTotalAmount) ? (v.shippingCost + v.purchasedTotalAmount).toFixed(2) : ''"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <br>
        <el-button @click="submit" :loading="submitLoading" type="primary" style="width:150px;height:60px;font-size:18px;display:inline-block">新增</el-button>
      </el-form>
    </div>
    <querySku ref="querySku"></querySku>
  </div>
</template>
<script>
import querySku from "@/common/querySku"
export default {
    components:{
        querySku
    },
    data() {
      let purchasedBy;
      document.cookie.split(";").forEach((v, i) => {
            let str = v.split("=")[0].trim();
            if (str == "name") {
                purchasedBy = v.split("=")[1];
            }
        });
      
        return {
            showQuerySku:false,
            submitLoading: false,
            loading: false,
            purchasePlatform: [],
            purchaseType: [],
            purchaseAccount: [],
            currency: [],
            purchasedBy,
            rules: {
                required: true,
                message: "此項目必填"
            },
            formData: {
                purchasedTime: "",
                purchaseType: "",
                purchasedPlatform: "",
                purchasedAccount: "",
                purchaseOrderId: "",
                purchasedBy,
                currency: "",
                data: [
                    {
                        sku: "",
                        productName: "",
                        productSpec: "",
                        purchasedQuantity: "",
                        purchasedTotalAmount: "",
                        note: "",
                        shippingCost: ""
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
        Promise.all([
            purchasePlatform,
            purchaseType,
            purchaseAccount,
            currency
        ]).then(([resOne, resTwo, resThree, resFour]) => {
            this.purchaseType = _.cloneDeep(resTwo);
            this.purchaseAccount = _.cloneDeep(resThree);
            this.currency = _.cloneDeep(resFour);
            this.purchasePlatform = _.cloneDeep(resOne);
        });
    },
    computed:{
      disabled(){
        let disabled = false;
          _.each(this.formData.data,(v)=>{
            if(!v.sku){  
                disabled = true;
            }
          })
          return disabled;
      },
       totalShippingCost(){
             let total = 0;
            _.each(this.formData.data,(v)=>{
                 total += Number(v.shippingCost);
            })
            if(total == 0){
                return 0;
            }else{
                return total.toFixed(2);
            }
        },
        totalPurchasedAmount(){
            let total = 0;
            _.each(this.formData.data,(v)=>{
                 total += Number(v.purchasedTotalAmount);
            })
            if(total == 0){
                return 0;
            }else{
                return total.toFixed(2);
            }
        }
    },
    methods: {
        goBack() {
            this.$router.push("/erpPurchase");
        },
        handleQuerySku(){
            this.$refs['querySku'].$findChild('wonDialog','visible',true);
        },
        handleCheckSku(value, row) {
            if (!value) {
                return;
            }
            axios({
                url: "/erp/check/sku",
                method: "post",
                data: {
                    token: this.token,
                    sku: value
                }
            }).then(res => {
                if (!res.message) {
                    this.$message.success("SKU檢查成功");
                    row.productName = res.productName;
                } else {
                    this.$message.error("SKU不存在");
                    row.sku = "";
                    row.productName = "";
                }
            });
        },
        handleAdd() {
            let obj = {
                sku: "",
                productName: "",
                productSpec: "",
                purchasedQuantity: "",
                purchasedTotalAmount: "",
                note: "",
                shippingCost: ""
            };
            this.formData.data.push(obj);
        },
        handleDelete(index) {
            this.formData.data.splice(index, 1);
        },
        getValue() {
            let data = _.cloneDeep(this.formData.data);
            _.each(data, v => {
                v.purchasedTime = this.moment(this.formData.purchasedTime).format(
                    "YYYY-MM-DD"    
                );
                v.purchaseType = this.formData.purchaseType;
                v.purchasedPlatform = this.formData.purchasedPlatform;
                v.purchasedAccount = this.formData.purchasedAccount;
                v.purchaseOrderId = this.formData.purchaseOrderId;
                v.purchasedBy = this.formData.purchasedBy;
                v.currency = this.formData.currency;
            });
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
#purchaseAdd {
    .heade {
        font-size: 16px;
        color: #45a2ff;
    }
    .el-form-item {
        margin-bottom: 0px;
    }
    .el-form-item__label {
        padding: 0px !important;
    }
    .heade a {
        color: #45a2ff;
    }
    .ml0{
        margin-left: 0px;
    }
}
</style>


