<template>
    <div id="sale">
        <div style="padding:20px">
            <div class="heade">
                <i class="el-icon-arrow-left"></i>
                <a href="javascript:void(0)" @click="goBack">返回</a>
            </div>
            <br>
            <h2>新增銷貨單
            </h2>
            <br>
            <el-form ref="form" :model="formData" :rules="rules">
                <el-row :gutter="10">
                    <el-col :span="4">
                        <el-form-item label="銷貨平台：" prop="salePlatform">
                            <el-select v-model="formData.salePlatform">
                                <el-option v-for="(value,i) in searchPlatformOption" :label="value" :value="value" :key="i"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="銷貨帳號：" prop="saleAccount">
                            <el-select v-model="formData.saleAccount">
                                <el-option v-for="(value,i) in searchAccountOption" :label="value" :value="value" :key="i"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="銷貨國家：" prop="saleCountry">
                            <el-select v-model="formData.saleCountry">
                                <el-option v-for="(value,i) in searchCountryOption" :label="value" :value="value" :key="i"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="幣別：" prop="currency">
                            <el-select v-model="formData.currency">
                                <el-option v-for="(value,i) in searchCurrecyOption" :label="value" :value="value" :key="i"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="銷貨時間：" prop="saleTime">
                            <el-date-picker value-format="yyyy-MM-dd" style="width:100%" v-model="formData.saleTime" type="date" placeholder="選擇日期"> </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <br>
                <div id="table">
                    <table cellspacing="0" cellpadding="0">
                        <colgroup>
                            <col width="30">
                            <col width="90">
                            <col width="250">
                            <col width="70">
                            <col width="60">
                            <col width="80">
                            <col width="50">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>序號</th>
                                <th>SKU </th>
                                <th>產品名稱</th>
                                <th>銷貨金額/個</th>
                                <th>銷貨數量</th>
                                <th>銷貨總金額</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(v,i) in formData.data" :key="i">
                                <td>{{i+1}}</td>
                                <td>
                                    <el-form-item label="" :prop="'data.'+i+'.sku'" :rules="requredRule">
                                        <el-input ref="input" v-model="v.sku" @blur="handleCheckSku(v.sku,v)"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" :prop="'data.'+i+'.productName'" :rules="requredRule">
                                        <el-input v-model="v.productName"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" :prop="'data.'+i+'.saleTotalAmount'" :rules="requredRule">
                                        <el-input v-model.number="v.saleTotalAmount"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" :prop="'data.'+i+'.saleQuantity'" :rules="requredRule">
                                        <el-input v-model.number="v.saleQuantity"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <span>{{v.saleQuantity*v.saleTotalAmount | formatToMoney}}</span>
                                </td>
                                <td>
                                    <el-button v-if="i!=0" class="btnh" style="color:#409EFF" type="text" @click="handleDelete(i)">删除</el-button>
                                    <el-button class="btnh" style="color:#409EFF" type="text" @click="handleQuerySku(i)">查詢</el-button>
                                </td>
                            </tr>
                            <tr class="total">
                                <td>
                                    總計
                                </td>
                                <td></td>
                                <td></td>
                                <td>
                                    {{totalAmount | formatToMoney}}
                                </td>
                                <td>
                                    {{totalQuantity | formatToMoney}}
                                </td>
                                <td>
                                    {{totalMoney | formatToMoney}}
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br>
                <el-popover placement="top" width="160" v-model="popoverVisible">
                <p>是否要提交？</p>
                <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="popoverVisible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="submit">確定</el-button>
                </div>
                <el-button slot="reference" @click="popoverVisible = true" :loading="submitLoading" type="primary" size="large">添加</el-button>
            </el-popover>
            <el-button :disabled="disabled" class="fr" type="success" size="small" @click="handleAdd">加入產品</el-button>
            </el-form>
        </div>
        <querySku name="slaeAdd" ref="querySku"></querySku>
    </div>

</template>
<script>
import querySku from "@/common/querySku";
import { format } from "@/common/until/format";
export default {
  name: "slaeAdd",
  components: {
    querySku
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
          message: "此项必填"
        }
      },
      formData: {
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
            saleTotalAmount: "",
            saleQuantity: "",
            productSpec: ""
          }
        ]
      }
    };
  },
  created() {
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
        this.searchAccountOption = _.cloneDeep(account);
        this.searchPlatformOption = _.cloneDeep(platform);
        this.searchCountryOption = _.cloneDeep(country);
        this.searchCurrecyOption = _.cloneDeep(currency);
      }
    );
  },
  filters: {
    ...format
  },
  computed: {
    totalMoney() {
      let total = 0;
      _.each(this.formData.data, v => {
        total += Number(v.saleQuantity) * Number(v.saleTotalAmount);
      });
      if (total == 0) {
        return "";
      } else {
        return total;
      }
    },
    disabled() {
      let disabled = false;
      _.each(this.formData.data, v => {
        if (!v.sku) {
          disabled = true;
        }
      });
      return disabled;
    },
    totalQuantity() {
      let total = 0;
      _.each(this.formData.data, v => {
        total += Number(v.saleQuantity);
      });
      if (total == 0) {
        return 0;
      } else {
        return total.toFixed(2);
      }
    },
    totalAmount() {
      let total = 0;
      _.each(this.formData.data, v => {
        total += Number(v.saleTotalAmount);
      });
      if (total == 0) {
        return 0;
      } else {
        return total.toFixed(2);
      }
    }
  },
  mounted() {
    this.$on("selectSku", this.handleSku);
  },
  methods: {
    goBack() {
      this.$router.push("/erpSale");
    },
    handleQuerySku(index) {
      this.$refs["querySku"].$findChild("wonDialog", "visible", index);
    },
    handleSku(val) {
      _.each(this.formData.data, (v, i) => {
        if (i == val[1]) {
          v.sku = val[0].sku;
          v.productName = val[0].productName;
        }
      });
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
        saleTotalAmount: "",
        saleQuantity: "",
        productSpec: ""
      };
      this.formData.data.push(obj);
      this.$nextTick(() => {
        this.$refs["input"]
          .slice(-1)[0]
          .$el.querySelector("input")
          .focus();
      });
    },
    handleDelete(index) {
      this.formData.data.splice(index, 1);
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
            url: "/erp/sale/add",
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
  .total {
    height: 35px;
    background: #f0f9eb;
    td {
      background: transparent !important;
    }
  }
  #table {
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
}
</style>
