<template>
  <div class="p20">
    <div class="goBack">
      <i class="el-icon-arrow-left"></i>
      <a
        href="javascript:void(0)"
        @click="goBack"
      >返回</a>
    </div>
    <br>
    <h2>{{$t('inventory.form.newAddMoveOrder')}}</h2>
    <br>
    <el-form
      ref="form"
      :model="form"
      label-position="top"
    >
      <el-row
        :gutter="20"
        class="mb10"
      >
        <el-col :span="5">
          <el-form-item
            :label="$t('inventory.form.inventoryMoveType')"
            :rules='rules'
            prop="inventoryType"
          >
            <el-select
              :placeholder="$t('inventory.placeholder.type')"
              v-model="form.inventoryType"
              clearable
              class="w100"
              @change="inventoryTypeChange"
            >
              <el-option
                v-for="(v,i) in inventoryTypeOption"
                :key="i"
                :label="v.inventoryTypeName"
                :value="v.inventoryType"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item
            :label="$t('inventory.form.time')"
            :rules='rules'
            prop="datetime"
          >
            <el-date-picker
              clearable
              v-model="form.datetime"
              type="datetime"
              :placeholder="$t('inventory.placeholder.selectTime')"
              align="right"
              class="w100"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col
          :span="5"
          v-if="form.inventoryType == 'SAMPLE_OUT'"
        >
          <el-form-item :label="$t('inventory.form.batchChangeShipments')">
            <el-select
              v-model="sampleMoveTo"
              clearable
              class="w100"
              placeholder="請選擇"
            >
              <el-option
                v-for="(v,i) in moveOption"
                :key="i"
                :value="v.warehouseCode"
                :label="v.warehouseName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="5"
          v-if="form.inventoryType == 'SAMPLE_OUT'"
        >
          <el-form-item :label="$t('inventory.form.batchChangeCollect')">
            <el-select
              :placeholder="$t('inventory.placeholder.collect')"
              v-model="sampleSampleTo"
              clearable
              class="w100"
            >
              <el-option
                v-for="(v,i) in sampleToOption"
                :key="'smaple'+i"
                :value="v.managerName"
                style="width:450px;"
              >
                <div class="w45 ibbox">
                  {{$t('inventory.form.managerName')}}:{{v.managerName}}
                </div>
                <div class="w30 ibbox">
                  {{$t('inventory.form.account')}}:{{ v.platform }}
                </div>
                <div class="w15 ibbox">
                  {{$t('inventory.form.platform')}}:{{ v.account }}
                </div>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="5"
          v-if="form.inventoryType == 'TRANSFER'"
        >
          <el-form-item :label="$t('inventory.form.batchChangeToWarehouse')">
            <el-select
              v-model="sampleMoveTo"
              clearable
              class="w100"
            >
              <el-option
                v-for="(v,i) in moveOption"
                :key="i"
                :value="v.warehouseCode"
                :label="v.warehouseName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="5"
          v-if="form.inventoryType == 'TRANSFER'"
        >
          <el-form-item :label="$t('inventory.form.batchChangeFormWarehouse')">
            <el-select
              v-model="sampleMoveFrom"
              clearable
              class="w100"
            >
              <el-option
                v-for="(v,i) in moveOption"
                :key="i"
                :value="v.warehouseCode"
                :label="v.warehouseName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="4"
          v-if="form.inventoryType == 'TRANSFER'"
        >
          <el-form-item :label="$t('inventory.form.batchChangeWarehouseStatus')">
            <el-select
              :placeholder="$t('inventory.form.batchChangeWarehouseStatus')"
              v-model="trStockCondition"
              clearable
              class="w100"
            >
              <el-option
                v-for="(v,i) in stockCondition"
                :key="i"
                :label="v.stockCondition"
                :value="v.stockConditionCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div id="table">
        <table
          cellspacing="0"
          cellpadding="0"
        >
          <colgroup>
            <col width="100">
            <col width="100">
            <col width="100">
            <col
              v-if="showColumnTwo.includes(form.inventoryType)"
              width="100"
            >
            <col
              v-if="showColumnTwo.includes(form.inventoryType)"
              width="100"
            >
            <col
              v-if="showColumnOne.includes(form.inventoryType) || showColumnThree.includes(form.inventoryType)"
              width="100"
            >
            <col
              v-if="showColumnOne.includes(form.inventoryType) || showColumnThree.includes(form.inventoryType)"
              width="100"
            >
            <col
              v-if="showColumnThree.includes(form.inventoryType) || showColumnFive.includes(form.inventoryType)"
              width="200"
            >
            <col
              v-if="showColumnOne.includes(form.inventoryType) || showColumnThree.includes(form.inventoryType)"
              width="100"
            >
            <col
              v-if="showColumnFour.includes(form.inventoryType)"
              width="200"
            >
            <col
              v-if="showColumnFour.includes(form.inventoryType)"
              width="200"
            >
            <col
              v-if="showColumnFive.includes(form.inventoryType)"
              width="200"
            >

            <col
              v-if="showColumnFive.includes(form.inventoryType)"
              width="200"
            >

            <col
              v-if="showColumnTwo.includes(form.inventoryType)"
              width="200"
            >
            <col width="70">
          </colgroup>
          <thead>
            <tr>
              <th>{{$t('inventory.form.serialNumber')}}</th>
              <th>SKU </th>
              <th>{{$t('inventory.form.quantity')}}</th>
              <th v-if="showColumnTwo.includes(form.inventoryType)">{{$t('inventory.form.moveToWarehouse')}}</th>
              <th v-if="showColumnFive.includes(form.inventoryType)">{{$t('inventory.form.emitWarehouse')}}</th>
              <th v-if="showColumnTwo.includes(form.inventoryType)">{{$t('inventory.form.moveFormWarehouse')}}</th>
              <th v-if="showColumnFive.includes(form.inventoryType)">{{$t('inventory.form.logisticsOrderNumber')}}</th>
              <th v-if="showColumnOne.includes(form.inventoryType) || showColumnThree.includes(form.inventoryType)">{{$t('inventory.form.platform')}}</th>
              <th v-if="showColumnOne.includes(form.inventoryType) || showColumnThree.includes(form.inventoryType)">{{$t('inventory.form.account')}}</th>
              <th v-if="showColumnThree.includes(form.inventoryType) || showColumnFive.includes(form.inventoryType)">{{$t('inventory.form.control')}}</th>
              <th v-if="showColumnOne.includes(form.inventoryType) || showColumnThree.includes(form.inventoryType)">{{$t('inventory.form.warehouse')}}</th>
              <th v-if="showColumnFour.includes(form.inventoryType)">{{$t('inventory.form.warehouse')}}</th>
              <th v-if="showColumnFour.includes(form.inventoryType)">{{$t('inventory.form.purchaseOrderNumber')}}</th>
              <th v-if="showColumnTwo.includes(form.inventoryType)">{{$t('inventory.form.warehouseStatus')}}</th>
              <th>{{$t('inventory.form.operate')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(v,i) in form.data"
              :key="i"
            >
              <td>
                <span>{{i + 1}}</span>
              </td>
              <td>
                <el-form-item
                  label=""
                  :prop="'data.'+i+'.sku'"
                  :rules='rules'
                >
                  <el-input
                    v-model="v.sku"
                    @blur="handleCheckSku(v.sku,v)"
                  ></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item
                  :rules='rules'
                  :prop="'data.'+ i + '.quantity'"
                >
                  <el-input v-model="v.quantity">
                  </el-input>
                </el-form-item>
              </td>
              <td v-if="showColumnTwo.includes(form.inventoryType)">
                <el-form-item>
                  <el-select v-model="v.moveTo">
                    <el-option
                      v-for="(v,i) in moveOption"
                      :key="i"
                      :value="v.warehouseCode"
                      :label="v.warehouseName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td v-if="showColumnFive.includes(form.inventoryType)">
                <el-form-item>
                  <el-select v-model="v.moveTo">
                    <el-option
                      v-for="(v,i) in moveOption"
                      :key="i"
                      :value="v.warehouseCode"
                      :label="v.warehouseName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td v-if="showColumnTwo.includes(form.inventoryType)">
                <el-form-item>
                  <el-select v-model="v.moveFrom">
                    <el-option
                      v-for="(v,i) in moveOption"
                      :key="i"
                      :value="v.warehouseCode"
                      :label="v.warehouseName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td v-if="showColumnOne.includes(form.inventoryType) || showColumnThree.includes(form.inventoryType)">
                <el-form-item>
                  <el-input v-model="v.platform">
                  </el-input>
                </el-form-item>
              </td>
              <td v-if="showColumnOne.includes(form.inventoryType) || showColumnThree.includes(form.inventoryType)">
                <el-form-item>
                  <el-input v-model="v.account">
                  </el-input>
                </el-form-item>
              </td>
              <td v-if="showColumnFour.includes(form.inventoryType)">
                <el-form-item>
                  <el-input v-model="v.amount">
                  </el-input>
                </el-form-item>
              </td>
              <td v-if="showColumnFour.includes(form.inventoryType)">
                <el-form-item>
                  <el-input v-model="v.purchaseId">
                  </el-input>
                </el-form-item>
              </td>
              <td v-if="showColumnFive.includes(form.inventoryType)">
                <el-form-item>
                  <el-input v-model="v.trackingNumber">
                  </el-input>
                </el-form-item>
              </td>
              <td v-if="showColumnThree.includes(form.inventoryType) || showColumnFive.includes(form.inventoryType)">
                <el-form-item>
                  <el-select
                    :placeholder="$t('inventory.placeholder.collect')"
                    v-model="v.sampleTo"
                    clearable
                    class="w100"
                  >
                    <el-option
                      v-for="(v,i) in sampleToOption"
                      :key="'smaple'+i"
                      :value="v.managerName"
                      style="width:450px;"
                    >
                      <div class="w45 ibbox">
                        {{$t('inventory.form.managerName')}}:{{v.managerName}}
                      </div>
                      <div class="w30 ibbox">
                        {{$t('inventory.form.account')}}:{{ v.platform }}
                      </div>
                      <div class="w15 ibbox">
                        {{$t('inventory.form.platform')}}:{{ v.account }}
                      </div>
                    </el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td v-if="showColumnOne.includes(form.inventoryType) || showColumnThree.includes(form.inventoryType)">
                <el-form-item>
                  <el-select
                    :placeholder="$t('inventory.form.warehouse')"
                    v-model="v.warehouse"
                    clearable
                    class="w100"
                  >
                    <el-option
                      v-for="(v,i) in warehouseOption"
                      :key="i"
                      :label="v"
                      :value="v"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td v-if="showColumnTwo.includes(form.inventoryType)">
                <el-form-item>
                  <el-select
                    :placeholder="$t('inventory.placeholder.warehouseStatus')"
                    v-model="v.stockCondition"
                    clearable
                    class="w100"
                  >
                    <el-option
                      v-for="(v,i) in stockCondition"
                      :key="i"
                      :label="v.stockCondition"
                      :value="v.stockConditionCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td>
                <el-button
                  v-if="i!=0"
                  class="btnh"
                  style="color:#409EFF"
                  type="text"
                  @click="handleRemove(i)"
                >{{$t('inventory.form.delete')}}</el-button>
                <el-button
                  class="btnh"
                  style="color:#409EFF"
                  type="text"
                  @click="handleQuerySku(i)"
                >{{$t('inventory.form.query')}}</el-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br>
      <el-form-item>
        <el-button
          :disabled="disabled"
          @click="handleAdd"
          size="small"
          class="f-r"
          type="success"
        >{{$t('inventory.form.addProduct')}}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="submit"
          :loading="submitLoading"
          type="primary"
          size="mediumn"
        >{{$t('inventory.form.add')}}</el-button>
      </el-form-item>
    </el-form>
    <querySku
      name="inventoryAdd"
      ref="inventoryAdd"
    ></querySku>
  </div>
</template>

<script>
import querySku from "@/common/querySku";
import _ from "lodash";
export default {
  name: "inventoryAdd",
  components: {
    querySku
  },
  computed: {
    disabled() {
      let disabled = false;
      _.each(this.form.data, v => {
        if (!v.sku) {
          disabled = true;
        }
      });
      return disabled;
    }
  },
  methods: {
    inventoryTypeChange() {
      _.each(this.form.data, item => {
        item.moveTo = "";
        item.moveFrom = "";
        item.sampleTo = "";
      });
      this.sampleMoveTo = "";
      this.sampleMoveFrom = "";
      this.sampleSampleTo = "";
      this.trStockCondition = "";
    },
    handleQuerySku(index) {
      this.$refs["inventoryAdd"].$findChild("wonDialog", "visible", index);
    },
    handleSku(val) {
      _.each(this.form.data, (v, i) => {
        if (i == val[1]) {
          v.sku = val[0].sku;
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
    goBack() {
      this.$router.push("inventoryList");
    },
    handleRemove(i) {
      this.form.data.splice(i, 1);
    },
    handleAdd() {
      this.form.data.push({
        sku: "",
        quantity: "",
        moveTo: "",
        moveFrom: "",
        platform: "",
        account: "",
        warehouse: "",
        sampleTo: "",
        amount: "",
        purchaseId: "",
        stockCondition: ""
      });
    },
    getValue() {
      let data = _.cloneDeep(this.form.data);
      _.each(data, v => {
        v.inventoryType = this.form.inventoryType;
        v.datetime = this.form.datetime;
      });
      return {
        token: this.token,
        value: JSON.stringify({ data })
      };
    },
    submit() {
      this.getValue();
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          axios({
            url: "erp/inventoryChange/add",
            method: "post",
            data: this.getValue()
          }).then(() => {
            this.submitLoading = false;
            this.$message.success("添加成功");
            this.goBack();
          });
        }
      });
    }
  },
  mounted() {
    this.$on("selectSku", this.handleSku);
    let type = axios({
      url: "/erp/inventoryChange/value/inventoryType",
      method: "post",
      data: {
        token: this.token
      }
    });
    let warehouse = axios({
      url: "/erp/inventoryChange/value/warehouse",
      method: "post",
      data: {
        token: this.token
      }
    });
    let sampleTo = axios({
      url: "/erp/inventoryChange/value/manager",
      method: "post",
      data: {
        token: this.token
      }
    });

    let move = axios({
      url: "erp/value/warehouse",
      method: "post",
      data: {
        token: this.token
      }
    });

    let stock = axios({
      url: "erp/value/stockCondition",
      method: "post",
      data: {
        token: this.token
      }
    });

    Promise.all([type, warehouse, sampleTo, move, stock]).then(
      ([type, warehouse, sampleTo, move, stock]) => {
        this.sampleToOption = sampleTo;
        this.warehouseOption = _.cloneDeep(warehouse);
        this.inventoryTypeOption = _.cloneDeep(type);
        this.moveOption = _.cloneDeep(move);
        this.stockCondition = _.cloneDeep(stock);
      }
    );
  },
  watch: {
    sampleMoveTo(n) {
      _.each(this.form.data, item => {
        item.moveTo = n;
      });
    },
    sampleMoveFrom(n) {
      _.each(this.form.data, item => {
        item.moveFrom = n;
      });
    },
    sampleSampleTo(n) {
      _.each(this.form.data, item => {
        item.sampleTo = n;
      });
    },
    trStockCondition(n) {
      _.each(this.form.data, item => {
        item.stockCondition = n;
      });
    }
  },
  data() {
    return {
      rules: {
        required: true,
        message: "此項必填"
      },
      // showColumnOne: ["INVENTORY_SHORTAGE", "INVENTORY_OVERAGE"],
      showColumnOne: [],
      showColumnTwo: ["TRANSFER"],
      // showColumnThree: ["INVENTORY_OVERAGE"],
      showColumnThree: [],
      showColumnFour: ["RETURN_REFUND"],
      showColumnFive: ["SAMPLE_OUT"],
      sampleMoveTo: "",
      sampleMoveFrom: "",
      sampleSampleTo: "",
      trStockCondition: "",
      inventoryTypeOption: [],
      warehouseOption: [],
      sampleToOption: [],
      moveOption: [],
      stockCondition: [],
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
      form: {
        inventoryType: "SAMPLE_OUT",
        datetime: "",
        data: [
          {
            sku: "",
            quantity: "",
            moveTo: "",
            moveFrom: "",
            platform: "",
            account: "",
            warehouse: "",
            sampleTo: "",
            amount: "",
            purchaseId: "",
            stockCondition: ""
          }
        ]
      },
      submitLoading: false
    };
  }
};
</script>
<style scoped lang="scss">
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
      height: 30px;
      text-align: center;
      color: #62717e;
      font-size: 14px;
    }
    th {
      padding: 4px;
      background: #edf1f5;
      text-align: center;
      color: #62717e;
    }
    td {
      padding: 0px;
      border: 1px solid #ebeef5;
      border-top: none;
      border-left: none;
      text-align: center;
      background: white;
      color: #62717e;
      font-size: 14px;
      &:first-child {
        border-left: 1px solid #ebeef5;
      }
    }
  }
}
</style>
