<template>
  <div id="receivableEdit">
    <div style="padding:20px">
      <div class="heade">
        <i class="el-icon-arrow-left"></i>
        <a
          href="javascript:void(0)"
          @click="goBack"
        >返回</a>
      </div>
      <br>
      <h2>
        {{ look ? '查看' : '编辑'}}應收帳款
      </h2>
      <br>
      <el-form
        ref="form"
        :model="formData"
        v-loading="loading"
        label-position="top"
      >
        <el-row :gutter="10">
          <el-col :span="3">
            <el-form-item
              label="平台"
              prop="platform"
              :rules="rules"
            >
              <el-select
                placeholder="請選擇"
                v-model="formData.platform"
                clearable
              >
                <el-option
                  v-for="(v,i) in searchPlatformOption"
                  :key="'plat'+i"
                  :label="v"
                  :value="v"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item
              label="帳號"
              prop="account"
              :rules="rules"
            >
              <el-select
                placeholder="請選擇"
                v-model="formData.account"
                clearable
              >
                <el-option
                  v-for="(v,i) in searchAccountOption"
                  :key="'acc'+i"
                  :label="v"
                  :value="v"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item
              label="幣別"
              prop="currency"
              :rules="rules"
            >
              <el-select v-model="formData.currency">
                <el-option
                  v-for="(value,i) in searchCurrencyOption"
                  :label="value.currency"
                  :value="value.currency"
                  :key="i"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item
              label="國家"
              prop="country"
              :rules="rules"
            >
              <el-select
                placeholder="請選擇"
                v-model="formData.country"
                clearable
              >
                <el-option
                  v-for="(v,i) in searchCountryOption"
                  :key="'type'+i"
                  :value="v.countryNameChinese"
                >
                  <span style="float: left">{{ v.countryCode }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryNameChinese }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="時間"
              prop="date"
              :rules="rules"
            >
              <el-date-picker
                clearable
                style="width:100%"
                value-format="yyyy-MM-dd"
                v-model="formData.date"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <br>
        <el-card
          class="box-card"
          v-for="(v,i) in formData.data"
          :key="i"
          style="margin-bottom:10px;width:50%"
        >
          <el-row :gutter="10">
            <el-button
              :disabled="formData.data.length <= 1"
              style="float: right; padding: 3px 0"
              type="text"
              icon="el-icon-close"
              @click="handleDelete(i)"
            ></el-button>
            <!-- <el-col :span="2">
                            <el-form-item label="ID">
                                <span>{{id}}</span>
                            </el-form-item>
                        </el-col> -->
            <el-col :span="12">
              <el-form-item
                label="費用類型"
                :prop="'data.'+ i +'.financialSpendType'"
                :rules="rules"
              >
                <el-select
                  placeholder="請選擇"
                  v-model="v.financialSpendType"
                  clearable
                >
                  <el-option
                    v-for="(v,i) in searchTypeOption"
                    :key="'type'+i"
                    :label="v.financialSpendType"
                    :value="v.financialSpendType"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item
                label="金額"
                :rules="rules"
              >
                <el-input v-model="v.amount"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
        </el-card>
      </el-form>
      <br>
      <el-popover
        v-if="!look"
        placement="top"
        width="160"
        v-model="popoverVisible"
      >
        <p>是否要提交？</p>
        <div style="text-align: right; margin: 0">
          <el-button
            size="mini"
            type="text"
            @click="popoverVisible = false"
          >取消</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="submit"
          >確定</el-button>
        </div>
        <el-button
          slot="reference"
          @click="popoverVisible = true"
          :loading="submitLoading"
          type="primary"
          size="large"
        >更新</el-button>
      </el-popover>
    </div>
  </div>
</template>
<script>
import { format } from "@/common/until/format";
export default {
  name: "receivableEdit",
  data() {
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
      id: "",
      submitLoading: false,
      loading: false,
      searchAccountOption: [],
      searchPlatformOption: [],
      searchTypeOption: [],
      searchCountryOption: [],
      searchCurrencyOption: [],
      requredRule: {
        required: true
      },
      rules: {
        required: true,
        message: "此項目必填"
      },
      formData: {
        date: "",
        country: "",
        account: "",
        platform: "",
        periodStartDate: "",
        periodEndDate: "",
        data: [
          {
            financialSpendType: "",
            currency: "",
            amount: ""
          }
        ]
      }
    };
  },
  created() {
    this.look = this.$route.query.type == "look";
    let receivablePlatform = axios({
      url: "/erp/accountreceivable/value/platform",
      method: "post",
      data: {
        token: this.token
      }
    });
    let receivableType = axios({
      url: "/erp/accountreceivable/value/financialSpendType ",
      method: "post",
      data: {
        token: this.token
      }
    });
    let receivableAccount = axios({
      url: "/erp/accountreceivable/value/account",
      method: "post",
      data: {
        token: this.token
      }
    });

    let receivableCurrencies = axios({
      url: "/erp/accountreceivable/value/currencies",
      method: "post",
      data: {
        token: this.token
      }
    });
    let receivableCountry = axios({
      url: "/erp/accountreceivable/value/country",
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
      this.searchTypeOption = _.cloneDeep(type.data);
      this.searchCountryOption = _.cloneDeep(country.data);
      this.searchCurrencyOption = _.cloneDeep(currencies);

      let data = JSON.parse(this.$route.query.data);
      this.id = data.id;
      this.formData.country = data.country;
      this.formData.account = data.account;
      this.formData.platform = data.platform;
      this.formData.currency = data.currency;
      this.formData.data[0].financialSpendType = data.financialSpendType;
      this.formData.data[0].amount = data.amount;
      this.formData.date = [data.periodStartDate, data.periodEndDate];
    });
  },
  filters: {
    ...format
  },
  methods: {
    goBack() {
      this.$router.push("/receivable");
    },
    handleDelete(index) {
      this.formData.data.splice(index, 1);
    },
    getValue() {
      let data = _.cloneDeep(this.formData.data);
      _.each(data, v => {
        v.id = this.id;
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
        delete v.date;
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
          this.popoverVisible = false;
          this.submitLoading = true;
          axios({
            url: "/erp/accountreceivable/update",
            method: "post",
            data: {
              value: this.getValue(),
              token: this.token
            }
          }).then(() => {
            this.submitLoading = true;
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
#receivableEdit {
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
.heade a {
  color: #45a2ff;
}
/deep/ .el-card__body {
  padding: 10px;
}
</style>
