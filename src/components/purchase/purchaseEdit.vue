<template>
<div id="edit" style="padding:20px"> 
    <div class="heade">
      <i class="el-icon-arrow-left"></i>
      <a href="javascript:void(0)" @click="goBack">返回</a>
    </div>
    <br>
    <h3>{{formData?'編輯採購單':'建立採購單'}}</h3>
    <br>
    <div style="padding-left:20px" v-loading="loading">
      <el-form ref="form" :model="purchaseData" label-position="top" :rules="rules">
        <el-row :gutter="12" :key="i" v-for="(v,i) of purchaseData.firstPartData" style="position:relative;padding:20px">
          <el-card>
        <span style="color:#606266;position:absolute;left:30px;top:24px;font-size:20px" >{{i+1}}.</span>  
        <i  v-if="!formData" class="el-icon-close" style="position:absolute;right:25px;top:24px;font-size:16px" @click="handleClose(i)"></i>
        <el-col :span="12">
        <el-form-item label="產品SKU" >
          <el-input  style="width:75%" v-model="v.productSKU"></el-input>
          <el-button  type="primary" size="small" @click="autoProductName(v)">取得產品名稱</el-button>
        </el-form-item>
        <el-form-item label="產品名稱"  :word-limit="2"  :prop="'firstPartData.' + i + '.productName'" :rules="validateProductName">
          <el-input v-model="v.productName" ></el-input>
        </el-form-item>
        <el-form-item label="需採購數量" :prop="'firstPartData.' + i + '.quantity'"  :rules="validateQuantity">
          <el-input v-model="v.quantity"></el-input>
        </el-form-item>
        </el-col>

        <template v-if="purchaseSwitch">
        <el-col :span="12">
          <el-form-item label="貨幣">
            <el-select style="width:50%" v-model="v.currency">
                  <el-option
      v-for="item in searchCurrencyOption"
      :key="item.currency"
      :label="item.currency"
      :value="item.currency">
    </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="採購總金額">
          <el-input v-model="v.purchasedAmount"></el-input>
        </el-form-item>
          <el-form-item label="採購數量">
            <el-input v-model="v.purchasedQuantity"></el-input>
        </el-form-item>
        </el-col>
        </template>
        </el-card>
        </el-row>
        <br>
        <el-form-item label="">
            <el-button type="primary" @click="handleAdd" v-if="!formData">新增產品</el-button>
        </el-form-item>
  <el-row :gutter="12">
          <el-col :span="8">
        <el-form-item label="採購單開關">
          <el-switch v-model="purchaseSwitch"></el-switch>
        </el-form-item>
        </el-col>
        </el-row>
        <template v-if="purchaseSwitch">
        <el-row :gutter="12">
          <el-col :span="24">
            <el-form-item label="採購時間" prop="purchasedTime">
          <el-date-picker    
     v-model="purchaseData.purchasedTime"
      type="datetime"
      placeholder="選擇日期時間"
      start-placeholder="選擇日期"
      end-placeholder="選擇時間"
      >
    </el-date-picker>
      </el-form-item>
          </el-col>
        <el-col :span="12">
        <el-form-item label="採購平台單號" prop="purchaseOrderId">
            <el-input v-model="purchaseData.purchaseOrderId"></el-input>
        </el-form-item>
        <el-form-item label="運費">
            <el-input v-model="purchaseData.shippingCost"></el-input>
        </el-form-item>
    
        </el-col>  
        <el-col :span="12">
        
        <el-form-item label="採購帳號" prop="purchasedAccount">
                 <el-select style="width:50%" v-model="purchaseData.purchasedAccount"  allow-create
    default-first-option
    filterable placeholder="請選擇">
                  <el-option
      v-for="item in searchAccountOption"
       allow-create
    default-first-option
      :key="item"
      :label="item"
      :value="item">
      </el-option>
      </el-select>
        </el-form-item>
            <el-form-item label="採購平台" prop="purchasedPlatform">
            <el-select style="width:50%" v-model="purchaseData.purchasedPlatform" allow-create
    default-first-option
    filterable placeholder="請選擇">
                  <el-option
      v-for="item in searchPlatformOption"
      
      :key="item"
      :label="item"
      :value="item">
      </el-option>
      </el-select>
        </el-form-item>
        </el-col>
        </el-row>
        </template>
       
      <el-row :gutter="12">
        <el-col :span="8">
        <el-form-item label="編輯財務">
          <el-switch v-model="treasureSwitch"></el-switch>
        </el-form-item>
        </el-col>
 
        </el-row>
        <template  v-if="treasureSwitch">
          <el-row :gutter="12">
            <el-col :span="12">
        <el-form-item label="付款時間">
             <el-date-picker
      
      v-model="purchaseData.paymentTime"
      type="datetime"
      placeholder="選擇日期時間">
    </el-date-picker>
        </el-form-item>
        </el-col>
        </el-row>
          </template>

      <el-row :gutter="12">
        <el-col :span="2">
        <el-form-item label="編輯物流">
          <el-switch v-model="logisticsSwitch"></el-switch>
        </el-form-item>
        </el-col>
          <template  v-if="logisticsSwitch">
          <el-col :span="11">
        <el-form-item label="物流">
           <el-input v-model="purchaseData.Logistic"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="11">
         <el-form-item label="物流單號">
           <el-input v-model="purchaseData.trackingNumber"></el-input>
        </el-form-item>
        </el-col>
        </template>
        </el-row>
      

        <el-form-item label="備註">
            <el-input type="textarea" :rows="4" v-model="purchaseData.note"></el-input>
        </el-form-item>
      </el-form>
      <div>
      <el-button @click="submit"  :loading="submitLoading" type="primary" style="width:150px;height:60px;font-size:18px;">{{formData?'編輯':'新增'}}</el-button>
      </div>
      </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      formData: "",
      loading: false,
      searchCurrencyOption: [],
      searchPlatformOption: [],
      searchAccountOption: [],
      submitLoading: false,
      purchaseSwitch: false,
      treasureSwitch: false,
      logisticsSwitch: false,
      validateProductName: {
        required: true,
        message: "必須輸入產品名稱"
      },
      validateQuantity: {
        required: true,
        message: "必須輸入需採購數量"
      },
      rules: {
        purchasedTime: {
          required: true
        },
        purchasedTime: {
          required: true,
          message: " 必須輸入採購時間"
        },
        purchaseOrderId: {
          required: true,
          message: "必須輸入採購平台單號"
        },
        purchasedPlatform: {
          required: true
        },
        purchasedAccount: {
          required: true
        }
      },
      purchaseData: {
        firstPartData: [
          {
            productSKU: "",
            productName: "",
            quantity: "",
            purchasedAmount: "",
            purchasedQuantity: "",
            currency: "RMB"
          }
        ],
        purchaseOrderId: "",
        purchasedTime: "",
        purchasedPlatform: "",
        purchasedAccount: "",
        shippingCost: "",
        paymentTime: "",
        Logistic: "",
        trackingNumber: "",
        note: ""
      }
    };
  },
  mounted() {
    if (this.$route.params.id == "edit") {
      this.formData = JSON.parse(this.$route.query.data);
      this.purchaseData.firstPartData[0].productSKU = this.formData.productSKU;
      this.purchaseData.firstPartData[0].productName = this.formData.productName;
      this.purchaseData.firstPartData[0].quantity = this.formData.quantity;
      this.purchaseData.note = this.formData.note;
      this.purchaseId = this.formData.purchaseId;
      if (
        this.formData.purchasedAmount ||
        this.formData.purchasedQuantity ||
        this.formData.currencythis ||
        this.formData.purchasedTime ||
        this.formData.purchaseOrderId ||
        this.formData.purchasedPlatform ||
        this.formData.purchasedAccount ||
        this.formData.shippingCost
      ) {
        this.purchaseSwitch = true;
        this.purchaseData.firstPartData[0].purchasedAmount = this.formData.purchasedAmount;
        this.purchaseData.firstPartData[0].purchasedQuantity = this.formData.purchasedQuantity;
        this.purchaseData.firstPartData[0].currency = this.formData.currency;
        this.purchaseData.purchasedTime = new Date(
          this.formData.purchasedTime
        ).getTime();
        this.purchaseData.purchaseOrderId = this.formData.purchaseOrderId;
        this.purchaseData.purchasedPlatform = this.formData.purchasedPlatform;
        this.purchaseData.purchasedAccount = this.formData.purchasedAccount;
        this.purchaseData.shippingCost = this.formData.shippingCost;
      }
      if (this.formData.paymentTime) {
        this.treasureSwitch = true;
        this.purchaseData.paymentTime = new Date(
          this.formData.paymentTime
        ).getTime();
      }

      if (this.formData.Logistic || this.formData.trackingNumber) {
        this.logisticsSwitch = true;
        this.purchaseData.Logistic = this.formData.Logistic;
        this.purchaseData.trackingNumber = this.formData.trackingNumber;
      }
    }

    this.loading = true;
    let promiseOne = axios({
      url: "http://60.251.57.138:8000/data-server/purchase/data/account",
      method: "post",
      data: {
        token: this.token
      }
    });

    let promiseTwo = axios({
      url: `http://60.251.57.138:8000/data-server/purchase/data/platform`,
      method: "POST",
      data: {
        token: this.token
      }
    });

    let promiseThree = axios({
      url: "http://60.251.57.138:8000/data-server/purchase/currencies",
      method: "post",
      data: {
        token: this.token,
        type: "purchase"
      }
    });

    Promise.all([promiseOne, promiseTwo, promiseThree]).then(res => {
      this.searchPlatformOption = res[1];
      this.searchAccountOption = res[0];
      this.searchCurrencyOption = res[2];
      this.loading = false;
    });
  },
  watch: {},
  methods: {
    autoProductName(obj) {
      axios({
        url: "http://60.251.57.138:8000/data-server/sku/info",
        method: "post",
        data: {
          value: obj.productSKU,
          type: "productName",
          token: this.token
        }
      }).then(res => {
        obj.productName = res[0];
      });
    },
    getValue() {
      let data = [];

      let obj = {};
      _.each(this.purchaseData.firstPartData, (v, i) => {
        if (this.purchaseSwitch) {
          obj = {
            productSKU: v.productSKU,
            productName: v.productName,
            quantity: v.quantity,
            purchasedAmount: v.purchasedAmount,
            purchasedQuantity: v.purchasedQuantity,
            currency: v.currency,
            purchasedTime: this.moment(this.purchaseData.purchasedTime).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            purchaseOrderId: this.purchaseData.purchaseOrderId,
            purchasedPlatform: this.purchaseData.purchasedPlatform,
            purchasedAccount: this.purchaseData.purchasedAccount,
            shippingCost: this.purchaseData.shippingCost,
            note: this.purchaseData.note
          };
        } else {
          obj = {
            productSKU: v.productSKU,
            productName: v.productName,
            quantity: v.quantity,
            note: this.purchaseData.note
          };
        }
        if (this.treasureSwitch) {
          obj.paymentTime = this.moment(this.purchaseData.paymentTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }

        if (this.logisticsSwitch) {
          obj.Logistic = this.purchaseData.Logistic;
          obj.trackingNumber = this.purchaseData.trackingNumber;
        }
        data.push(obj);
      });

      if (this.$route.params.id == "edit") {
        data[0].purchaseId = this.purchaseId;
      }
      return { data };
    },
    submit() {
      this.$refs["form"].validate(action => {
        if (action) {
          let url = "http://60.251.57.138:8000/data-server/purchase/add";
          let data = {
            value: JSON.stringify(this.getValue()),
            token: this.token
          };
          if (this.$route.params.id == "edit") {
            url = "http://60.251.57.138:8000/data-server/purchase/update";
            data.type = "purchase";
          }

          this.submitLoading = true;
          axios({
            url,
            method: "post",
            data
          })
            .then(res => {
              this.Bus.$emit("refresh");
              if (this.$route.params.id == "edit") {
                this.$message.success("編輯成功");
              } else {
                this.$message.success("新增成功");
              }
              this.$router.push("/purchase");
              this.submitLoading = false;
            })
            .catch(res => {
              this.submitLoading = false;
              if (this.$route.params.id == "edit") {
                this.$message.error("編輯失敗");
              } else {
                this.$message.success("新增失敗");
              }
            });
        } else {
          this.$message.error("請填寫必填項目");
        }
      });
    },
    handleClose(index) {
      if (this.purchaseData.firstPartData.length == 1) return;
      this.purchaseData.firstPartData.splice(index, 1);
    },
    handleAdd() {
      this.purchaseData.firstPartData.push({
        productSKU: "",
        productName: "",
        quantity: "",
        purchasedAmount: "",
        purchasedQuantity: "",
        currency: "RMB"
      });
    },
    goBack() {
      this.$router.push("/purchase");
    }
  }
};
</script>
<style>
#edit .heade {
  font-size: 16px;
  color: #45a2ff;
}
#edit .heade a {
  color: #45a2ff;
}
#edit .el-row {
  transition: all 0.5s;
}
#edit .tip .el-row:hover {
  box-shadow: 0px 0px 20px 3px gray;
}
#edit h3 {
  color: #606266;
}
</style>


