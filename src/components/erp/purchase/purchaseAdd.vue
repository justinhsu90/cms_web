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
      <el-button type="success" size="small" @click="handleAdd">新增產品</el-button>
      <br>
      <br>
      <el-form ref="form" :model="formData" v-loading="loading" label-position="top">
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
                  <el-button type="text" @click="handleCheckSku(v.sku,v)">检查</el-button>
                </template>
                <el-input @blur="handleCheckSku(v.sku,v)"  v-model.trim="v.sku"></el-input>
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
        <el-button @click="submit" :loading="submitLoading" type="primary" style="width:150px;height:60px;font-size:18px;display:inline-block">新增</el-button>
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
            purchasePlatform: [],
            purchaseType: [],
            purchaseAccount: [],
            currency: [],
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
    methods: {
        goBack() {
            this.$router.push("/erpPurchase");
        },
        // handleCheckSku:_.debounce((value,row)=>{
        //   axios({
        //     url: "/erp/check/sku",
        //     method: "post",
        //     data: {
        //         token: this.token,
        //         sku:value
        //     }
        // }).then((res)=>{
        //     if(!res){
        //       this.$message.success('SKU检测成功')
        //     }else{
        //       this.$message.error('SKU重复,请重新输入')
        //     }
        //   })
        //   },500),
      handleCheckSku(value,row){
          if(!value){
            return;
          }
          axios({
            url: "/erp/check/sku",
            method: "post",
            data: {
                token: this.token,
                sku:value
            }
        }).then((res)=>{
            if(!res.message){
              this.$message.success('SKU检测成功');
              row.productName = res.productName;  
            }else{
              this.$message.error('SKU重复,请重新输入');
              row.sku = "";
              row.productName = "";  
            }
          })
        },
        handleAdd() {
            let obj = {
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
            };
            this.formData.data.push(obj);
        },
        handleDelete(index) {
            this.formData.data.splice(index, 1);
        },
        getValue() {
            let data = _.cloneDeep(this.formData.data);
            _.each(data,(v)=>{
                 v.purchasedTime = this.moment(v.purchasedTime).format('YYYY-MM-DD HH:mm:ss');
            })            
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


