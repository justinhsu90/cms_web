<template>
    <div id="edit">
        <div style="padding:20px">
            <div class="heade">
                <i class="el-icon-arrow-left"></i>
                <a href="javascript:void(0)" @click="goBack">返回</a>
            </div>
            <br>
            <h2 class="clearfix">
                <div class="f-l"> 新增採購需求單 </div>
            </h2>
            <br>
            <el-form ref="form" :model="formData" v-loading="loading" label-position="top">
                <el-row :gutter="20">
                    <el-col :span="2">
                        <el-form-item label="已購買">
                            <el-switch v-model="formData.isPurchased"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="採購類型">
                            <el-select v-model="formData.purchaseType" placeholder="類型" clearable>
                                <el-option v-for="(v,i) in purchaseOption" :key="i" :label="v" :value="v"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="詢價帳號">
                            <el-select v-model="formData.queryAccount">
                                <el-option v-for="(value,i) in purchaseAccount" :label="value" :value="value" :key="i"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="13">
                        <el-form-item label="購買連結">
                            <el-input v-model="formData.purchaseLink"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <br>
                <el-card class="box-card" v-for="(v,i) in formData.data" :key="i" style="margin-bottom:10px">

                    <el-row :gutter="10">
                        <el-button :disabled="formData.data.length <= 1" style="float: right; padding: 0px 0" type="text" icon="el-icon-close" @click="handleDelete(i)"></el-button>
                        <el-col :span="1">
                            <el-form-item label="序號">
                                <span>{{i+1}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">
                            <el-form-item label="數量">
                                <el-input v-model="v.queryQuantity"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">
                            <el-form-item label="賣家型號">
                                <el-input v-model="v.merchantModel"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">
                            <el-form-item label="目標價格">
                                <el-input v-model="v.targetPrice"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="幣別">
                                <el-select v-model="v.targetPriceCurrency">
                                    <el-option v-for="(v,i) in curreny" :key="i" :label="v" :value="v"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="SKU">
                                <el-input v-model="v.sku"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="產品名稱">
                                <el-input v-model="v.productName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="產品規格">
                                <el-input v-model="v.productSpec"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="備註">
                                <el-input v-model="v.note" type="textarea" rows="2"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
                <el-button @click="submit" size="large" :loading="submitLoading" type="primary">新增</el-button>
                <el-button class="f-r" type="success" size="small" @click="handleAdd">新增產品</el-button>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      submitLoading: false,
      loading: false,
      purchaseOption: [],
      curreny: [],
      purchaseAccount: [],
      formData: {
        queryAccount: "",
        purchaseLink: "",
        purchaseType: "",
        isPurchased: false,
        data: [
          {
            sku: "",
            productName: "",
            productSpec: "",
            queryQuantity: "",
            note: "",
            targetPrice: "",
            targetPriceCurrency: "",
            merchantModel: "",
            purchaseId: ""
          }
        ]
      }
    };
  },
  created() {
    if (this.$route.query.copy == "copy") {
      let data = JSON.parse(this.$route.query.data);
      this.formData.queryAccount = data.queryAccount;
      this.formData.purchaseLink = data.purchaseLink;
      this.formData.purchaseType = data.purchaseType;
      this.formData.isPurchased = data.isPurchased;
      this.formData.data[0].sku = data.sku;
      this.formData.data[0].productName = data.productName;
      this.formData.data[0].productSpec = data.productSpec;
      this.formData.data[0].queryQuantity = data.queryQuantity;
      this.formData.data[0].note = data.note;
      this.formData.data[0].targetPrice = data.targetPrice;
      this.formData.data[0].targetPriceCurrency = data.targetPriceCurrency;
      this.formData.data[0].merchantModel = data.merchantModel;
      this.formData.data[0].purchaseId = data.purchaseId;
    }
    axios({
      url: "/erp/purchasequery/value/purchasetype",
      method: "post",
      data: {
        token: this.token
      }
    }).then(res => {
      this.purchaseOption = res.data;
    });
    axios({
      url: "/erp/value/purchaseAccount",
      method: "post",
      data: {
        token: this.token
      }
    }).then(res => {
      this.purchaseAccount = _.cloneDeep(res);
    });
    axios({
      url: "/erp/value/currency",
      method: "post",
      data: {
        token: this.token
      }
    }).then(res => {
      this.curreny = res;
    });
  },
  methods: {
    goBack() {
      this.$router.push("/purchaRequire");
    },
    handleAdd() {
      let obj = {
        sku: "",
        productName: "",
        productSpec: "",
        queryQuantity: "",
        note: "",
        targetPrice: "",
        targetPriceCurrency: "",
        merchantModel: "",
        purchaseId: ""
      };
      this.formData.data.push(obj);
    },
    handleDelete(index) {
      this.formData.data.splice(index, 1);
    },
    getValue() {
      let data = _.cloneDeep(this.formData.data);
      _.each(data, v => {
        v.queryAccount = this.formData.queryAccount;
        v.purchaseLink = this.formData.purchaseLink;
        v.purchaseType = this.formData.purchaseType;
        v.isPurchased = this.formData.isPurchased;
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
            url: "/erp/purchasequery/add",
            method: "post",
            data: {
              value: this.getValue(),
              token: this.token
            }
          }).then(() => {
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
/deep/ .el-form-item__label {
  padding: 0px;
}
/deep/ .el-card__body {
  padding: 5px;
}
</style>
