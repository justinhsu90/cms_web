<template>
  <div>
    <div class="p10">
      <div class="goBack">
        <i class="el-icon-arrow-left"></i>
        <a href="javascript:void(0)" @click="goBack">返回</a>
      </div>
      <br>
      <h2>編輯 Gogroopie Deal</h2>
      <br>
      <el-form ref="form" :model="formData" v-loading="loading" label-position="top">
        <el-card class="box-card" v-for="(v,i) in formData.data" :key="i" style="margin-bottom:20px">
          <el-row :gutter="20">
            <el-col :span="4">
              <!-- <el-form-item label="帳號">
                <el-select placeholder="帳號" v-model="v.account"  clearable>
                  <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v" :value="v"></el-option>
                </el-select>
              </el-form-item> -->
            </el-col>
            <el-col :span="4">
              <el-form-item label="國家">
                <el-select placeholder="國家" v-model="v.country"  clearable>
                  <el-option v-for="(v,i) in searchCountryOption" :key="'country'+i"  :value="v.countryCode">
                        <span style="float: left">{{ v.countryCode }}</span>  
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryNameChinese }}</span>
                  </el-option>     
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="幣別">
                <el-select placeholder="幣別" v-model="v.currency" clearable>
                  <el-option v-for="(v,i) in searchCurrencyOption" :key="'country'+i" :label="v.currency" :value="v.currency">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Deal ID">
                <el-input v-model="v.dealId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Product ID">
                <el-input v-model="v.productId"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="5">
              <el-form-item label="開始日期">
                <el-date-picker style="width:100%" v-model="v.startDate" type="date" placeholder="選擇日期時間"> </el-date-picker>
              </el-form-item>
            </el-col> -->
            <el-col :span="16">
              <el-form-item label="產品名稱">
                <el-input v-model="v.productName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="產品規格">
                <el-input v-model="v.productSpec" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="SKU">
                <el-input v-model="v.sku"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="Gogroopie 售價">
                <el-input v-model="v.salePrice"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="Gogroopie 運費">
                <el-input v-model="v.shippingCost"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="Final Price">
                <el-input v-model="v.finalPrice"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="產品成本">
                <el-input v-model="v.productCost"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="產品成本幣別">
                <el-input v-model="v.productCostCurrency"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="最後更新時間">
                <el-date-picker  disabled style="width:100%" v-model="v.lastUpdatedTime" type="date" placeholder="最後更新時間"> </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="最後更新人員">
                <el-input v-model="v.lastModifiedBy" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="新增時間">
                <el-date-picker  disabled style="width:100%" v-model="v.addedTime" type="date" placeholder="新增時間"> </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="新增人員">
                <el-input v-model="v.addedBy" disabled></el-input>
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
        <el-button @click="submit" :loading="submitLoading" type="primary" size="large">編輯</el-button>
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
      searchAccountOption: [],
      searchCountryOption: [],
      searchCurrencyOption: [],
      formData: {
        data: [
          {
            dealId: "",
            productId: "",
            sku: "",
            productName: "",
            productSpec: "",
            currency: "",
            productCostCurrency: "",
            productCost: "",
            finalPrice: "",
            salePrice: "",
            country: "",
            // account: "",
            startDate: "",
            note: ""
          }
        ]
      }
    };
  },
  created() {
    // let account = axios({
    //   url: "/gogroopie/deal/value/account",
    //   method: "post",
    //   data: {
    //     token: this.token
    //   }
    // });
    let country = axios({
      url: "/wowcher/deal/value/country",
      method: "post",
      data: {
        token: this.token
      }
    });
    let currency = axios({
      url: "/wowcher/deal/value/currency",
      method: "post",
      data: {
        token: this.token
      }
    });

    // Promise.all([account, country, currency]).then(
    //   ([account, country, currency]) => {
    //     this.searchAccountOption = _.cloneDeep(account);
    //     this.searchCountryOption = _.cloneDeep(country.data);
    //     this.searchCurrencyOption = _.cloneDeep(currency);
    //   }
    // );
    Promise.all([country, currency]).then(([country, currency]) => {
      this.searchCountryOption = _.cloneDeep(country.data);
      this.searchCurrencyOption = _.cloneDeep(currency);
    });
    let data = JSON.parse(this.$route.query.data);
    this.formData.data[0].country = data.country;
    this.formData.data[0].account = data.account;
    this.formData.data[0].productId = data.productId;
    this.formData.data[0].sku = data.sku;
    this.formData.data[0].dealId = data.dealId;
    this.formData.data[0].productName = data.productName;
    this.formData.data[0].productSpec = data.productSpec;
    this.formData.data[0].startDate = data.startDate;
    this.formData.data[0].shippingCost = data.shippingCost;
    this.formData.data[0].finalPrice = data.finalPrice;
    this.formData.data[0].shippingCost = data.shippingCost;
    this.formData.data[0].salePrice = data.salePrice;
    this.formData.data[0].productCost = data.productCost;
    this.formData.data[0].productCostCurrency = data.productCostCurrency;
    this.formData.data[0].currency = data.currency;
    this.formData.data[0].note = data.note;
    this.formData.data[0].lastModifiedBy = data.lastModifiedBy;
    this.formData.data[0].addedBy = data.addedBy;
    this.formData.data[0].addedTime = data.addedTime;
    this.formData.data[0].lastUpdatedTime = data.lastUpdatedTime;
  },
  methods: {
    goBack() {
      this.$router.push("/gogroopieDealList");
    },
    getValue() {
      let data = _.cloneDeep(this.formData.data);
      _.each(data, v => {
        v.startDate = this.moment(v.startDate).format("YYYY-MM-DD");
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
            url: "/gogroopie/deal/update",
            method: "post",
            data: {
              value: this.getValue(),
              token: this.token
            }
          }).then(() => {
            this.submitLoading = true;
            this.Bus.$emit("refresh");
            this.goBack();
          });
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
/deep/ .el-form-item {
  margin-bottom: 5px;
}
</style>
