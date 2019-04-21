<template>
  <div v-loading="loading">
    <div style="padding:20px">
      <won-header @goBack="goBack"></won-header>
      <h2>
        <span>編輯</span>
        <span>ID: {{id}}</span>
      </h2>
      <el-form
        ref="form"
        :model="formData"
        v-loading="loading"
        label-position="top"
        :rules='formRules'
      >
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item
              label="國家"
              prop="country"
            >
              <el-select
                placeholder="國家"
                v-model="formData.country"
                clearable
              >
                <el-option
                  v-for="(v,i) in searchCountryOption"
                  :key="'type'+i"
                  :label="v"
                  :value="v"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              label="平台"
              prop="platform"
            >
              <el-select
                placeholder="平台"
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
          <el-col :span="4">
            <el-form-item
              label="賬號"
              prop="account"
            >
              <el-select
                placeholder="帳號"
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
          <el-col :span="4">
            <el-form-item
              label="運送方式"
              prop="shippingMethod"
            >
              <el-select
                placeholder="運送方式"
                v-model="formData.shippingMethod"
                clearable
              >
                <el-option
                  v-for="(v,i) in searchShippingMethodOption"
                  :key="'method'+i"
                  :label="v"
                  :value="v"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              label="已發貨時間"
              prop="shipoutFromWarehouseDateTime"
            >
              <el-date-picker
                style="width:100%"
                v-model="formData.shipoutFromWarehouseDateTime"
                type="datetime"
                placeholder="選擇日期時間"
                value-format="yyyy-MM-DD HH:mm:ss"
              > </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              label="採購尚未到時間"
              prop="waitForStockDateTime"
            >
              <el-date-picker
                style="width:100%"
                v-model="formData.waitForStockDateTime"
                type="datetime"
                placeholder="選擇日期時間"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-DD HH:mm:ss"
              > </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              label="完成裝箱時間"
              prop="packingDoneDateTime"
            >
              <el-date-picker
                style="width:100%"
                v-model="formData.packingDoneDateTime"
                type="datetime"
                placeholder="選擇日期時間"
                value-format="yyyy-MM-DD HH:mm:ss"
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
              <col width="100">
              <col width="250">
              <col width="250">
              <col width="100">
              <col width="80">
              <col width="80">
              <col width="80">
            </colgroup>
            <thead>
              <tr>
                <th>FNSKU, EAN</th>
                <th>Sku</th>
                <th>平台上SKU</th>
                <th>Shipment ID</th>
                <th>數量</th>
                <th>asin</th>
                <th>ASIN</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(v,i) in formData.itemList"
                :key="i"
              >
                <td>
                  <el-form-item label="">
                    <span>{{v.fnskuOrEan}}</span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="">
                    <span>{{v.sku}}</span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="">
                    <span>{{v.subSku}}</span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="">
                    <span>{{v.shipmentId}}</span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    :prop="'itemList.' + `${i}` + '.quantity'"
                    :rules="{
                      required: true,
                      message:'此項必填',
                      type:'number'
                    }"
                  >
                    <el-input v-model.number="v.quantity"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="">
                    <span>{{v.asin}}</span>
                  </el-form-item>
                </td>
                <td>
                  <el-button
                    type="text"
                    title="删除"
                    icon="el-icon-won-22"
                    @click="handleDelete(i)"
                  ></el-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br>
        <el-form-item>
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
            >保存</el-button>
          </el-popover>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import form from "won-service/_mixins/form";
export default {
  mixins: [form],
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      popoverVisible: false,
      submitLoading: false,
      loading: true,
      searchAccountOption: [],
      searchPlatformOption: [],
      searchCountryOption: [],
      searchShippingMethodOption: [],
      formData: {
        shipmentId: "",
        country: "",
        account: "",
        platform: "",
        shipoutFromWarehouseDateTime: "",
        packingDoneDateTime: "",
        waitForStockDateTime: "",
        shippingMethod: "",
        itemList: [
          {
            fnskuOrEan: "",
            sku: "",
            subSku: "",
            shipmentId: "",
            quantity: "",
            asin: ""
          }
        ]
      }
    };
  },
  created() {
    let platform = axios({
      url: "/shipmentPacking/value/platform",
      method: "post",
      data: {}
    });
    let country = axios({
      url: "/shipmentPacking/value/country",
      method: "post",
      data: {}
    });
    let account = axios({
      url: "/shipmentPacking/value/account",
      method: "post",
      data: {}
    });

    let shippingMethod = axios({
      url: "/shipmentPacking/value/shippingMethod",
      method: "post",
      data: {}
    });

    this.id = this.$route.query.id;
    this.formRules = {
      shipmentId: {
        required: true,
        message: "此項必填"
      },
      country: {
        required: true,
        message: "此項必填"
      },
      account: {
        required: true,
        message: "此項必填"
      },
      platform: {
        required: true,
        message: "此項必填"
      },
      shippingMethod: {
        required: true,
        message: "此項必填"
      }
    };
    let fetchData = axios({
      url: "/shipmentPacking/shipment",
      method: "post",
      data: {
        shipmentId: this.id
      }
    });

    Promise.all([platform, country, account, shippingMethod, fetchData]).then(
      ([platform, country, account, shippingMethod, fetchData]) => {
        this.loading = false;
        this.searchAccountOption = _.cloneDeep(account);
        this.searchPlatformOption = _.cloneDeep(platform);
        this.searchCountryOption = _.cloneDeep(country);
        this.searchShippingMethodOption = _.cloneDeep(shippingMethod);
        this.formData = _.extend({}, this.fetchData, fetchData);
      }
    );
  },
  methods: {
    goBack() {
      this.$router.push("/shipmentpacking");
    },
    handleDelete(index) {
      this.formData.itemList.splice(index, 1);
    },
    getValue() {
      let data = _.cloneDeep(this.formData);
      return JSON.stringify(data);
    },
    submit() {
      this.$refs["form"].validate(action => {
        if (action) {
          this.popoverVisible = false;
          this.submitLoading = true;
          axios({
            url: "/shipmentPacking/update",
            method: "post",
            data: {
              data: this.getValue()
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
  margin-bottom: 6px;
}
/deep/ .el-form-item__label {
  padding: 0px !important;
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
    // max-height: 100px;
    // overflow: auto;
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
      line-height: 25px;
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
  }
}
</style>
