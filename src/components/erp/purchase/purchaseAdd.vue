<template>
  <div>
    <div style="padding:20px">
      <div class="heade">
        <i class="el-icon-arrow-left"></i>
        <a
          href="javascript:void(0)"
          @click="goBack"
        >返回</a>
      </div>
      <br>
      <h2>新增採購單
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
              label="採購類型"
              prop="purchaseType"
              :rules="rules"
            >
              <el-select v-model="formData.purchaseType">
                <el-option
                  v-for="(value,i) in purchaseType"
                  :label="value"
                  :value="value"
                  :key="i"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item
              label="採購平台"
              prop="purchasedPlatform"
              :rules="rules"
            >
              <el-select v-model="formData.purchasedPlatform">
                <el-option
                  v-for="(value,i) in purchasePlatform"
                  :label="value"
                  :value="value"
                  :key="i"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item
              label="採購帳號"
              prop="purchasedAccount"
              :rules="rules"
            >
              <el-select v-model="formData.purchasedAccount">
                <el-option
                  v-for="(value,i) in purchaseAccount"
                  :label="value"
                  :value="value"
                  :key="i"
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
                  v-for="(value,i) in currency"
                  :label="value"
                  :value="value"
                  :key="i"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="購買人員">
              <el-input v-model="formData.purchasedBy"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item
              label="採購平台單號"
              prop="purchaseOrderId"
              :rules="rules"
            >
              <el-input v-model="formData.purchaseOrderId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              label="採購時間"
              prop="purchasedTime"
              :rules="rules"
            >
              <el-date-picker
                style="width:100%"
                v-model="formData.purchasedTime"
                type="date"
                placeholder="選擇日期時間"
              > </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <br>
        <div id="table">
          <table
            cellspacing="0"
            cellpadding="0"
          >
            <colgroup>
              <col width="40">
              <col width="100">
              <col width="250">
              <col width="80">
              <col width="80">
              <col width="80">
              <col width="80">
              <col width="150">
              <col width="70">
            </colgroup>
            <thead>
              <tr>
                <th>序號</th>
                <th>SKU </th>
                <th>產品名稱</th>
                <th>單品金額</th>
                <th>採購數量</th>
                <th>該品總運費</th>
                <th>付款比例（%）</th>
                <th>總金額（包含運費）</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(v,i) in formData.data"
                :key="i"
              >
                <td>{{i+1}}</td>
                <td>
                  <el-form-item
                    label=""
                    :prop="'data.'+i+'.sku'"
                    :rules="requredRule"
                  >
                    <el-input
                      :class="{
                        discontinued: v.discontinued
                      }"
                      ref="input"
                      v-model="v.sku"
                      @blur="handleCheckSku(v.sku,v)"
                    ></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    :prop="'data.'+i+'.productName'"
                    :rules="requredRule"
                  >
                    <el-input v-model="v.productName"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    :prop="'data.'+i+'.productCost'"
                    :rules="requredRuleFloat"
                  >
                    <el-input v-model.number="v.productCost"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    :prop="'data.'+i+'.purchasedQuantity'"
                    :rules="requredRule"
                  >
                    <el-input v-model.number="v.purchasedQuantity"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    :prop="'data.'+i+'.shippingCost'"
                    :rules="requredRule"
                  >
                    <el-input v-model.number="v.shippingCost"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    :prop="'data.'+i+'.paymentPercentage'"
                    :rules="requredRule"
                  >
                    <el-input v-model.number="v.paymentPercentage"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <span>{{ (v.productCost * v.purchasedQuantity * v.paymentPercentage / 100 + v.shippingCost) | formatToMoney}}</span>
                </td>
                <td>
                  <el-button
                    v-if="i!=0"
                    class="btnh"
                    style="color:#409EFF"
                    type="text"
                    @click="handleDelete(i)"
                  >删除</el-button>
                  <el-button
                    class="btnh"
                    style="color:#409EFF"
                    type="text"
                    @click="handleQuerySku(i)"
                  >查詢</el-button>
                </td>
              </tr>
              <tr class="total">
                <td>
                  總計
                </td>
                <td></td>
                <td></td>
                <td>
                  {{totalPurchasedAmount | formatToMoney}}
                </td>
                <td>
                  {{totalPurchasedQuantity}}
                </td>
                <td>
                  {{totalShippingCost | formatToMoney}}
                </td>
                <td></td>
                <td>
                  {{ totalMoney  | formatToMoney}}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <br>
        <el-popover
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
          >添加</el-button>
        </el-popover>
        <el-button
          :disabled="disabled"
          class="fr"
          type="success"
          size="small"
          @click="handleAdd"
        >新增產品</el-button>
      </el-form>
    </div>
    <querySku
      name="purchaseAdd"
      ref="querySku"
    ></querySku>
  </div>
</template>
<script>
import querySku from "@/common/querySku";
import { format } from "@/common/until/format";
import U from "@/common/until/U";
import { float } from "@/common/validate";
export default {
  name: "purchaseAdd",
  components: {
    querySku
  },
  data() {
    let purchasedBy;
    document.cookie.split(";").forEach(v => {
      let str = v.split("=")[0].trim();
      if (str == "name") {
        purchasedBy = v.split("=")[1];
      }
    });

    return {
      popoverVisible: false,
      Mul: U.Math.Mul,
      submitLoading: false,
      loading: false,
      purchasePlatform: [],
      purchaseType: [],
      purchaseAccount: [],
      currency: [],
      purchasedBy,
      requredRule: {
        required: true
      },
      requredRuleFloat: _.extend({}, float),
      rules: {
        required: true,
        message: "此項目必填"
      },
      formData: {
        purchasedTime: Date.now(),
        purchaseType: "採購",
        purchasedPlatform: "1688",
        purchasedAccount: "flybuddyltd",
        purchaseOrderId: "",
        purchasedBy,
        currency: "RMB",
        data: [
          {
            sku: "",
            productName: "",
            productSpec: "",
            purchasedQuantity: "",
            productCost: "",
            note: "",
            shippingCost: 0,
            paymentPercentage: 100
          }
        ]
      }
    };
  },
  created() {
    this.isTransfer = !!this.$route.query.transfer;
    if (this.isTransfer) {
      let data = JSON.parse(this.$route.query.data);
      this.formData.purchaseType = data.purchaseType;
      this.formData.currency = data.targetPriceCurrency;
      this.formData.data[0].productName = data.productName;
      this.purchaseQueryId = data.purchaseQueryId;
      this.formData.data[0].sku = data.sku;
      this.formData.purchasedTime = data.queryTime;
      this.formData.data[0].purchasedQuantity = data.queryQuantity;
    }
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
  computed: {
    disabled() {
      let disabled = false;
      _.each(this.formData.data, v => {
        if (!v.sku) {
          disabled = true;
        }
      });
      return disabled;
    },
    totalMoney() {
      let total = 0;
      _.each(this.formData.data, v => {
        total +=
          (Number(v.productCost) *
            Number(v.purchasedQuantity) *
            Number(v.paymentPercentage)) /
            100 +
          Number(v.shippingCost);
      });
      if (total == 0) {
        return "";
      } else {
        return total;
      }
    },
    totalShippingCost() {
      let total = 0;
      _.each(this.formData.data, v => {
        total += Number(v.shippingCost);
      });
      if (total == 0) {
        return "";
      } else {
        return total;
      }
    },
    totalPurchasedAmount() {
      let total = 0;
      _.each(this.formData.data, v => {
        total += Number(v.productCost);
      });
      if (total == 0) {
        return "";
      } else {
        return total;
      }
    },
    totalPurchasedQuantity() {
      let total = 0;
      _.each(this.formData.data, v => {
        total += Number(v.purchasedQuantity);
      });
      if (total == 0) {
        return "";
      } else {
        return total;
      }
    }
  },
  mounted() {
    this.$on("selectSku", this.handleSku);
  },
  filters: {
    ...format
  },
  methods: {
    goBack() {
      this.$router.push("/erpPurchase");
    },
    handleSku(val) {
      _.each(this.formData.data, (v, i) => {
        if (i == val[1]) {
          v.sku = val[0].sku;
          v.productName = val[0].productName;
        }
      });
    },
    handleQuerySku(index) {
      this.$refs["querySku"].$findChild("wonDialog", "visible", index);
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
          if (res.discontinued) {
            this.$confirm(`${res.sku} 已經預計停售, 請斟酌採購`, "提示", {
              type: "info",
              beforeClose: (action, instance, done) => {
                if (action == "confirm") {
                  this.$message.success("SKU檢查成功");
                  row.productName = res.productName;
                  row.discontinued = true;
                  done();
                } else {
                  done();
                }
              }
            }).catch(() => {});
          } else {
            this.$message.success("SKU檢查成功");
            row.productName = res.productName;
          }
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
        productCost: "",
        note: "",
        shippingCost: ""
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
      let data = _.cloneDeep(this.formData.data);
      _.each(data, v => {
        v.purchasedTime = this.moment(this.formData.purchasedTime).format(
          "YYYY-MM-DD"
        );
        v.purchaseType = this.formData.purchaseType;
        v.purchasedPlatform = this.formData.purchasedPlatform;
        v.purchasedAccount = this.formData.purchasedAccount;
        v.purchasedTotalAmount = this.Mul(v.productCost, v.purchasedQuantity);
        v.purchaseOrderId = this.formData.purchaseOrderId;
        v.purchasedBy = this.formData.purchasedBy;
        v.currency = this.formData.currency;
        // delete v.productCost;
      });
      let obj = {
        data
      };
      return JSON.stringify(obj);
    },
    submit() {
      this.$refs["form"].validate(action => {
        if (action) {
          this.popoverVisible = false;
          this.submitLoading = true;
          let data = {
            value: this.getValue(),
            token: this.token
          };
          if (this.isTransfer) {
            data.purchaseQueryId = this.purchaseQueryId;
          }
          axios({
            url: "/erp/purchase/add",
            method: "post",
            data
          }).then(() => {
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
<style lang="scss" scoped>
.heade {
  font-size: 16px;
  color: #45a2ff;
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
    /deep/ .el-form-item {
      overflow: hidden;
      margin: 0px;
    }
    /deep/ .el-form-item__content {
      line-height: 0px;
    }
    /deep/ .is-error input {
      background: #f56c6c;
      border-radius: 0%;
    }
    /deep/ .el-input__inner {
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

    /deep/ .discontinued {
      .el-input__inner {
        background: yellow;
      }
    }
  }
}
</style>
