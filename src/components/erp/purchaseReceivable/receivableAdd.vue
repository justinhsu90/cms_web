<template>
    <div id="receivableAdd">
        <div style="padding:20px">
            <div class="heade">
                <i class="el-icon-arrow-left"></i>
                <a href="javascript:void(0)" @click="goBack">返回</a>
            </div>
            <br>
            <h2>新增應收帳款
            </h2>
            <br>
            <el-form ref="form" :model="formData" v-loading="loading" label-position="top">
                <el-row :gutter="10">
                    <el-col :span="4">
                        <el-form-item label="平台" prop="platform" :rules="rules">
                            <el-select placeholder="請選擇" v-model="formData.platform" clearable @change="handleSelect">
                                <el-option v-for="(v,i) in searchPlatformOption" :key="'plat'+i" :label="v" :value="v"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="帳號" prop="account" :rules="rules">
                            <el-select placeholder="請選擇" v-model="formData.account" clearable>
                                <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v" :value="v"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="幣別" prop="currency" :rules="rules">
                            <el-select placeholder="請選擇" v-model="formData.currency">
                                <el-option v-for="(value,i) in searchCurrencyOption" :label="value.currency" :value="value.currency" :key="i"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="国家" prop="country" :rules="rules">
                            <el-select placeholder="請選擇" v-model="formData.country" clearable>
                                <el-option v-for="(v,i) in searchCountryOption" :key="'type'+i" :value="v.countryNameChinese">
                                    <span style="float: left">{{ v.countryCode }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryNameChinese }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="時間" prop="date" :rules="rules">
                            <el-date-picker clearable style="width:100%" value-format="yyyy-MM-dd" v-model="formData.date" type="daterange" align="right" unlink-panels range-separator="~" start-placeholder="開始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <br>
                <el-card class="box-card">
                    <div>
                        <div style="width:49%;float:left;">
                            <h3 style="float:left">收入(含退貨)</h3>
                            <el-button style="float:right" type="success" size="small" @click="handleAdd('income')" :disabled="incomeAdd">新增</el-button>
                        </div>
                        <div style="width:49%;float:right;">
                            <h3 style="float:left">支出</h3>
                            <el-button style="float:right" type="success" size="small" @click="handleAdd()" :disabled="add">新增</el-button>
                        </div>
                    </div>
                    <br>
                    <br>
                    <div style="margin-bottom:10px;width:49%;float:left">
                        <el-card class="box-card mb10" v-for="(v,i) in formData.dataIncome" :key="i">
                            <el-row :gutter="10">
                                <el-button :disabled="disabled" style="float: right; padding: 3px 0" type="text" icon="el-icon-close" @click="handleDelete(i,'income')"></el-button>
                                <el-col :span="12">
                                    <el-form-item class="el-form-item_label" label="費用：" :prop="'dataIncome.'+ i +'.financialSpendType'" :rules="{required: v.required ? true : false,message: '此項目必填'}">
                                        <template slot="label">
                                            <span :style="{paddingLeft: v.required ? '' : '10px'}">費用：</span>
                                        </template>
                                        <el-select style="width:65%" placeholder="請選擇" v-model="v.financialSpendType" clearable>
                                            <el-option v-for="(v,index) in searchTypeOption" :key="'type'+index" :label="v.financialSpendType" :value="v.financialSpendType" :disabled="!!incomedisabled[index]"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">

                                    <el-form-item class="el-form-item_label" label="金額：" :prop="'dataIncome.'+ i +'.amount'" :rules="{required: v.required ? true : false,message: '此項目必填'}">
                                        <template slot="label">
                                            <span :style="{paddingLeft: v.required ? '' : '10px'}">金額：</span>
                                        </template>
                                        <el-input style="width:65%" v-model="v.amount"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-card>
                    </div>
                    <div style="margin-bottom:10px;width:49%;float:right">
                        <el-card class="box-card mb10" v-for="(v,i) in formData.data" :key="i + 'income'">
                            <el-row :gutter="10">
                                <el-button :disabled="disabled" style="float: right; padding: 3px 0" type="text" icon="el-icon-close" @click="handleDelete(i)"></el-button>
                                <el-col :span="12">
                                    <el-form-item class="el-form-item_label" :prop="'data.'+ i +'.financialSpendType'" :rules="{required: v.required ? true : false,message: '此項目必填'}">
                                        <template slot="label">
                                            <span :style="{paddingLeft: v.required ? '' : '10px'}">費用：</span>
                                        </template>
                                        <el-select style="width:65%" placeholder="請選擇" v-model="v.financialSpendType" clearable>
                                            <el-option v-for="(v,index) in searchIncomeTypeOption" :key="'type'+index" :label="v.financialSpendType" :value="v.financialSpendType" :disabled="!!sppendDisabled[index]"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item class="el-form-item_label" label="金額：" :prop="'data.'+ i +'.amount'" :rules="{required: v.required ? true : false,message: '此項目必填'}">
                                        <template slot="label">
                                            <span :style="{paddingLeft: v.required ? '' : '10px'}">金額：</span>
                                        </template>
                                        <el-input style="width:65%" v-model="v.amount"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-card>
                    </div>
                </el-card>
            </el-form>
            <br>
            <el-popover placement="top" width="160" v-model="popoverVisible">
                <p>是否要提交？</p>
                <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="popoverVisible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="submit">確定</el-button>
                </div>
                <el-button slot="reference" @click="popoverVisible = true" :loading="submitLoading" type="primary" size="large">新增</el-button>
            </el-popover>
        </div>
    </div>
</template>
<script>
import { format } from "@/common/until/format";
export default {
  name: "receivableAdd",
  data() {
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let arr = [1, 3, 5, 7, 8, 10, 12];
    let start = new Date(year, month - 1, 1, 0, 0, 0);
    let end;
    if (month == 0) {
      month = 12;
    }
    if (arr.includes(month)) {
      end = new Date(year, month - 1, 31, 0, 0, 0);
    } else {
      end = new Date(year, month - 1, 30, 0, 0, 0);
    }
    return {
      popoverVisible: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      submitLoading: false,
      loading: false,
      searchAccountOption: [],
      searchPlatformOption: [],
      searchTypeOption: [],
      searchIncomeTypeOption: [],
      searchCountryOption: [],
      searchCurrencyOption: [],
      requredRule: {
        required: true
      },
      rules: {
        required: true,
        message: "此項目必填"
      },
      Income: [],
      speed: [],
      formData: {
        date: [start, end],
        country: "",
        account: "",
        platform: "",
        periodStartDate: "",
        periodEndDate: "",
        dataIncome: [
          {
            incomeorspend: "income",
            financialSpendType: "",
            amount: ""
          }
        ],
        data: [
          {
            incomeorspend: "spend",
            financialSpendType: "",
            amount: ""
          }
        ]
      }
    };
  },
  created() {
    let receivablePlatform = axios({
      url: "/accountreceivable/value/platform",
      method: "post",
      data: {
        token: this.token
      }
    });
    let receivableType = axios({
      url: "/accountreceivable/value/financialSpendType ",
      method: "post",
      data: {
        token: this.token
      }
    });
    let receivableAccount = axios({
      url: "/accountreceivable/value/account",
      method: "post",
      data: {
        token: this.token
      }
    });

    let receivableCurrencies = axios({
      url: "/accountreceivable/value/currencies",
      method: "post",
      data: {
        token: this.token
      }
    });
    let receivableCountry = axios({
      url: "/accountreceivable/value/country",
      method: "post",
      data: {
        token: this.token
      }
    });
    Promise.all([
      receivablePlatform,
      receivableAccount,
      receivableCountry,
      receivableCurrencies,
      receivableType
    ]).then(([platform, account, country, currencies, type]) => {
      this.searchAccountOption = _.cloneDeep(account);
      this.searchPlatformOption = _.cloneDeep(platform);
      _.each(type.data, v => {
        if (v.financialspendTerm == "收入") {
          this.searchTypeOption.push(_.cloneDeep(v));
          this.Income.push(v.financialSpendType);
        } else {
          this.speed.push(v.financialSpendType);
          this.searchIncomeTypeOption.push(_.cloneDeep(v));
        }
      });

      this.searchCountryOption = _.cloneDeep(country.data);
      this.searchCurrencyOption = _.cloneDeep(currencies);
    });
  },
  filters: {
    ...format
  },
  computed: {
    incomeAdd() {
      if (this.formData.dataIncome.length >= this.searchTypeOption.length) {
        return true;
      } else {
        return false;
      }
    },
    add() {
      if (this.formData.data.length >= this.searchIncomeTypeOption.length) {
        return true;
      } else {
        return false;
      }
    },
    disabled() {
      let arr = this.formData.data.concat(this.formData.dataIncome);
      return arr.length <= 1;
    },
    incomedisabled() {
      let { dataIncome } = this.formData;
      let data = new Uint16Array(this.searchTypeOption.length);
      _.each(dataIncome, v => {
        _.each(this.searchTypeOption, (value, index) => {
          if (v.financialSpendType == value.financialSpendType) {
            data[index] = true;
          }
        });
      });

      return data;
    },
    sppendDisabled() {
      let { data } = this.formData;
      let sppedData = new Uint16Array(this.searchIncomeTypeOption.length);
      _.each(data, v => {
        _.each(this.searchIncomeTypeOption, (value, index) => {
          if (v.financialSpendType == value.financialSpendType) {
            sppedData[index] = true;
          }
        });
      });
      return sppedData;
    }
  },
  methods: {
    handleSelect(val) {
      axios({
        url: "/accountreceivable/value/platorm/requiredFinancialType",
        method: "post",
        data: {
          platform: val,
          token: this.token
        }
      }).then(res => {
        _.each(res, v => {
          let obj = {
            financialSpendType: "",
            currency: "",
            amount: "",
            required: true
          };
          if (this.Income.includes(v)) {
            obj.incomeorspend = "income";
            obj.financialSpendType = v;
            let oba = _.find(this.formData.dataIncome, [
              "financialSpendType",
              v
            ]);
            _.each(this.formData.dataIncome, value => {
              if (res.includes(value.financialSpendType)) {
                value.required = true;
              } else {
                value.required = false;
              }
            });
            if (oba) {
              return;
            }
            this.formData.dataIncome.push(obj);
          } else {
            obj.incomeorspend = "speed";
            obj.financialSpendType = v;
            let oba = _.find(this.formData.data, ["financialSpendType", v]);
            _.each(this.formData.data, value => {
              if (res.includes(value.financialSpendType)) {
                value.required = true;
              } else {
                value.required = false;
              }
            });
            if (oba) {
              return;
            }
            this.formData.data.push(obj);
          }
        });
      });
    },
    goBack() {
      this.$router.push("/receivable");
    },
    handleAdd(val) {
      let obj = {
        financialSpendType: "",
        currency: "",
        amount: ""
      };
      if (val == "income") {
        if (this.formData.dataIncome.length >= this.searchTypeOption.length) {
          return;
        }
        obj.incomeorspend = "income";
        this.formData.dataIncome.push(obj);
      } else {
        if (this.formData.data.length >= this.searchIncomeTypeOption.length) {
          return;
        }
        obj.incomeorspend = "speed";
        this.formData.data.push(obj);
      }
    },
    handleDelete(index, val) {
      if (val == "income") {
        this.formData.dataIncome.splice(index, 1);
      } else {
        this.formData.data.splice(index, 1);
      }
    },
    getValue() {
      let data = _.cloneDeep(
        this.formData.data.concat(this.formData.dataIncome)
      );
      _.each(data, v => {
        v.country = this.formData.country;
        v.account = this.formData.account;
        v.platform = this.formData.platform;
        v.currency = this.formData.currency;
        v.periodStartDate = this.moment(this.formData.date[0]).format(
          "YYYY-MM-DD"
        );
        v.periodEndDate = this.moment(this.formData.date[1]).format(
          "YYYY-MM-DD"
        );
      });
      delete data.date;
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
            url: "/accountreceivable/add",
            method: "post",
            data: {
              value: this.getValue(),
              token: this.token
            }
          }).then(() => {
            this.submitLoading = true;
            this.popoverVisible = false;
            this.Bus.$emit("refresh");
            this.$router.push("/receivable");
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#receivableAdd {
  .heade {
    font-size: 16px;
    color: #45a2ff;
  }
}
/deep/ .el-form-item {
  margin-bottom: 6px;
}
/deep/ .el-form-item__label {
  padding: 0px !important;
}
/deep/ .el-form-item_label > div:nth-child(1) {
  float: left;
}
.heade a {
  color: #45a2ff;
}
/deep/ .el-card__body {
  padding: 10px;
}
.mb10 {
  margin-bottom: 10px;
}
</style>
