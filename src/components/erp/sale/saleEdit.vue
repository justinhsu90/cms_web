<template>
  <div id="sale">
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
        {{ look ? '查看' : '編輯'}}
        銷貨單 <span>&nbsp;&nbsp;訂單ID:&nbsp;{{formData.saleId}}</span>
      </h2>
      <br>
      <el-form
        ref="form"
        :model="formData"
        :rules="rules"
        label-position="top"
      >
        <el-row :gutter="10">
          <el-col :span="2">
            <el-form-item
              label="銷貨平台"
              prop="salePlatform"
            >
              <el-select v-model="formData.salePlatform">
                <el-option
                  v-for="(value,i) in searchPlatformOption"
                  :label="value"
                  :value="value"
                  :key="i"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item
              label="銷貨帳號"
              prop="saleAccount"
            >
              <el-select v-model="formData.saleAccount">
                <el-option
                  v-for="(value,i) in searchAccountOption"
                  :label="value"
                  :value="value"
                  :key="i"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item
              label="銷貨國家"
              prop="saleCountry"
            >
              <el-select v-model="formData.saleCountry">
                <el-option
                  v-for="(value,i) in searchCountryOption"
                  :label="value"
                  :value="value"
                  :key="i"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item
              label="幣別"
              prop="currency"
            >
              <el-select v-model="formData.currency">
                <el-option
                  v-for="(value,i) in searchCurrecyOption"
                  :label="value"
                  :value="value"
                  :key="i"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              label="銷貨時間"
              prop="saleTime"
            >
              <el-date-picker
                value-format="yyyy-MM-dd"
                style="width:100%"
                v-model="formData.saleTime"
                type="date"
                placeholder="選擇日期時間"
              > </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <br>
        <div>
          <table
            cellspacing="0"
            cellpadding="0"
          >
            <colgroup>
              <col width="100">
              <col width="250">
              <col width="80">
              <col width="80">
              <col width="80">
            </colgroup>
            <thead>
              <tr>
                <th>SKU</th>
                <th>產品名稱</th>
                <th>銷貨金額/個</th>
                <th>銷貨數量</th>
                <th>銷貨總金額</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(v,i) in formData.data"
                :key="i"
              >
                <td>
                  <el-form-item
                    :prop="'data.'+i+'.sku'"
                    :rules="requredRule"
                  >
                    <el-input
                      v-model="v.sku"
                      @blur="handleCheckSku(v.sku,v)"
                    ></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    :prop="'data.'+i+'.productName'"
                    :rules="requredRule"
                  >
                    <el-input v-model="v.productName"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    :prop="'data.'+i+'.saleUnitPrice'"
                    :rules="requredRule"
                  >
                    <el-input v-model.number="v.saleUnitPrice"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    :prop="'data.'+i+'.saleQuantity'"
                    :rules="requredRule"
                  >
                    <el-input v-model.number="v.saleQuantity"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <span>{{v.saleQuantity*v.saleUnitPrice ? (v.saleQuantity*v.saleUnitPrice).toFixed(2) : ""}}</span>
                </td>
              </tr>
              <tr style="height:35px">
                <td>
                  總計
                </td>
                <td></td>
                <td>
                  {{totalAmount}}
                </td>
                <td>
                  {{totalQuantity}}
                </td>
                <td>
                  {{totalMoney | formatToMoney}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
      </el-form>
    </div>

  </div>

</template>
<script>
import { format } from "@/common/until/format";
export default {
  filters: {
    ...format
  },
  data() {
    return {
      popoverVisible: false,
      submitLoading: false,
      loading: false,
      searchAccountOption: [],
      searchPlatformOption: [],
      searchCountryOption: [],
      searchCurrecyOption: [],
      requredRule: {
        required: true
      },
      rules: {
        currency: {
          required: true,
          message: "此項必填"
        }
      },
      formData: {
        saleId: "",
        currency: "",
        saleTime: "",
        salePlatform: "",
        saleAccount: "",
        saleCountry: "",
        note: "",
        data: [
          {
            sku: "",
            productName: "",
            saleUnitPrice: "",
            saleQuantity: "",
            productSpec: ""
          }
        ]
      }
    };
  },
  created() {
    this.look = this.$route.query.type == "look";
    let saleCurrency = axios({
      url: "/erp/value/currency",
      method: "post",
      data: {
        token: this.token
      }
    });
    let salePlatform = axios({
      url: "/erp/value/salePlatform",
      method: "post",
      data: {
        token: this.token
      }
    });
    let saleCountry = axios({
      url: "/erp/value/saleCountry",
      method: "post",
      data: {
        token: this.token
      }
    });
    let saleAccount = axios({
      url: "/erp/value/saleAccount",
      method: "post",
      data: {
        token: this.token
      }
    });
    Promise.all([salePlatform, saleCountry, saleAccount, saleCurrency]).then(
      ([platform, country, account, currency]) => {
        let data = JSON.parse(this.$route.query.data);
        this.formData.currency = data.currency;
        this.formData.saleTime = data.saleTime;
        this.formData.salePlatform = data.salePlatform;
        this.formData.saleAccount = data.saleAccount;
        this.formData.saleCountry = data.saleCountry;
        this.formData.saleId = data.saleId;
        this.formData.data[0].sku = data.sku;
        this.formData.data[0].productName = data.productName;
        this.formData.data[0].saleUnitPrice = data.saleUnitPrice;
        this.formData.data[0].saleQuantity = data.saleQuantity;
        this.formData.data[0].productSpec = data.productSpec;
        this.searchAccountOption = _.cloneDeep(account);
        this.searchPlatformOption = _.cloneDeep(platform);
        this.searchCountryOption = _.cloneDeep(country);
        this.searchCurrecyOption = _.cloneDeep(currency);
      }
    );
  },
  computed: {
    totalMoney() {
      let total = 0;
      _.each(this.formData.data, v => {
        total += Number(v.saleQuantity) * Number(v.saleUnitPrice);
      });
      if (total == 0) {
        return "";
      } else {
        return total;
      }
    },
    totalQuantity() {
      let total = 0;
      _.each(this.formData.data, v => {
        total += Number(v.saleQuantity);
      });
      if (total == 0) {
        return "";
      } else {
        return total.toFixed(2);
      }
    },
    totalAmount() {
      let total = 0;
      _.each(this.formData.data, v => {
        total += Number(v.saleUnitPrice);
      });
      if (total == 0) {
        return "";
      } else {
        return total.toFixed(2);
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push("/erpSale");
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
    getValue() {
      let data = [];
      _.each(this.formData.data, v => {
        let obj = _.cloneDeep(v);
        obj.currency = this.formData.currency;
        obj.saleTime = this.formData.saleTime;
        obj.salePlatform = this.formData.salePlatform;
        obj.saleAccount = this.formData.saleAccount;
        obj.saleCountry = this.formData.saleCountry;
        data.push(obj);
      });
      return JSON.stringify(data);
    },
    submit() {
      this.$refs["form"].validate(action => {
        if (action) {
          this.popoverVisible = false;
          this.submitLoading = true;
          axios({
            url: "/erp/sale/update",
            method: "post",
            data: {
              value: this.getValue(),
              token: this.token
            }
          }).then(() => {
            this.submitLoading = true;
            this.Bus.$emit("refresh");
            this.$router.push("/erpSale");
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
#sale {
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
  table {
    table-layout: fixed;
    width: 100%;
    border-top: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    .btnh {
      padding: 4px 0px;
      color: #62717e;
    }
    .cell {
      padding: 0px;
    }
    .el-form-item {
      overflow: hidden;
      margin: 0px;
    }
    .el-form-item__content {
      line-height: 0px;
    }
    .is-error input {
      background: #f56c6c;
      border-radius: 0%;
    }
    .el-input__inner {
      border: none;
      height: 35px;
      text-align: center;
      color: #62717e;
      font-size: 14px;
    }
    th {
      padding: 4px;
      background: #edf1f5;
      text-align: center;
      color: #62717e;
      // border-right: 1px solid #ebeef5;
    }
    td {
      padding: 0px;
      border-top: 1px solid #ebeef5;
      border-right: 1px solid #ebeef5;
      text-align: center;
      background: white;
      color: #62717e;
      font-size: 14px;
    }
  }
}
</style>
