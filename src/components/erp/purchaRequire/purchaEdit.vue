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
            <el-form ref="form" :model="formData" v-loading="loading" label-position="top">
                <el-row :gutter="20">
                    <el-col :span="3">
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
                    <el-col :span="10">
                        <el-form-item label="購買連結">
                            <el-input v-model="formData.purchaseLink"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <br>
                <el-card class="box-card" v-for="(v,i) in formData.data" :key="i" style="margin-bottom:20px">
                    <el-row :gutter="15">
                        <el-col :span="3">
                            <el-form-item label="新增時間">
                                <el-input :value="v.queryTime | formatToTime" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="採購需求單號">
                                <el-input disabeld v-model="v.purchaseQueryId" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="對應採購單號">
                                <el-input v-model="v.purchaseId" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="採購數量">
                                <el-input v-model="v.queryQuantity"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="SKU">
                                <el-input v-model="v.sku"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="產品規格">
                                <el-input v-model="v.productSpec"></el-input>
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
                    <el-col :span="4">
                        <el-form-item label="賣家型號">
                            <el-input v-model="v.merchantModel"></el-input>
                        </el-form-item>
                    </el-col>
                        <el-col :span="8">
                            <el-form-item label="產品名稱">
                                <el-input v-model="v.productName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="備註">
                                <el-input v-model="v.note" type="textarea" rows="2"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
                <br>
                <el-button @click="submit" size="large" :loading="submitLoading" type="primary">編輯</el-button>
            </el-form>
        </div>
    </div>
</template>
<script>
import { format } from "@/common/until/format";
export default {
  data() {
    return {
      submitLoading: false,
      loading: false,
      curreny: [],
      purchaseOption: [],
      purchaseAccount: [],
      formData: {
        queryAccount: "",
        purchaseLink: "",
        purchaseType: "",
        // isPurchased: false,
        data: [
          {
            sku: "",
            isPurchased: false,
            purchaseId: "",
            purchaseQueryId: "",
            productName: "",
            productSpec: "",
            queryQuantity: "",
            note: "",
            queryTime: "",
            targetPrice: "",
            targetPriceCurrency: "",
            queryAccount: "",
            merchantModel: ""
          }
        ]
      }
    };
  },
  created() {
    let data = JSON.parse(this.$route.query.data);
    this.formData.data[0].sku = data.sku;
    this.formData.data[0].productName = data.productName;
    this.formData.data[0].productSpec = data.productSpec;
    this.formData.data[0].queryQuantity = data.queryQuantity;
    this.formData.data[0].note = data.note;
    this.formData.data[0].purchaseId = data.purchaseId;
    this.formData.data[0].purchaseQueryId = data.purchaseQueryId;
    this.formData.data[0].queryTime = data.queryTime;
    this.formData.data[0].targetPrice = data.targetPrice;
    this.formData.data[0].targetPriceCurrency = data.targetPriceCurrency;
    this.formData.data[0].merchantModel == data.merchantModel;
    this.formData.data[0].purchaseId = data.purchaseId;
    this.formData.purchaseType = data.purchaseType;
    this.formData.queryAccount = data.queryAccount;
    this.formData.purchaseLink = data.purchaseLink;
    this.formData.data[0].isPurchased = data.isPurchased;
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
      url: "/erp/value/currency",
      method: "post",
      data: {
        token: this.token
      }
    }).then(res => {
      this.curreny = res;
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
  },
  filters: {
    ...format
  },
  methods: {
    goBack() {
      this.$router.push("/purchaRequire");
    },
    getValue() {
      let data = _.cloneDeep(this.formData.data);
      data.purchaseType = this.formData.purchaseType;
      data.queryAccount = this.formData.queryAccount;
      data.purchaseLink = this.formData.purchaseLink;
      // data.isPurchased = this.formData.isPurchased;
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
            url: "/erp/purchasequery/edit",
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
