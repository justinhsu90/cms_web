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
        <h2>新增清單</h2>
        <br>
        <el-form
            ref="form"
            :model="form"
        >
            <el-row :gutter="20" class="mb10">
                <el-col :span="6">
                    <el-form-item
                        label="庫存異動類型"
                        :rules='rules'
                        prop="inventoryType"
                    >
                        <el-select
                            placeholder="類型"
                            v-model="form.inventoryType"
                            clearable
                            class="w100"
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
                <el-col :span="6">
                    <el-form-item
                        label="時間"
                        :rules='rules'
                        prop="datetime"
                    >
                        <el-date-picker
                            clearable
                            v-model="form.datetime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="選擇日期"
                            class="w100"
                        >
                        </el-date-picker>
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
                        <col v-if="showColumnTwo.includes(form.inventoryType)" width="100">
                        <col v-if="showColumnTwo.includes(form.inventoryType)" width="100">
                        <col v-if="showColumnOne.includes(form.inventoryType) || showColumnThree.includes(form.inventoryType) || showColumnTwo.includes(form.inventoryType)" width="100">
                        <col v-if="showColumnOne.includes(form.inventoryType) || showColumnThree.includes(form.inventoryType) || showColumnTwo.includes(form.inventoryType)" width="100">
                        <col v-if="showColumnThree.includes(form.inventoryType) || showColumnFive.includes(form.inventoryType)" width="200">
                        <col v-if="showColumnOne.includes(form.inventoryType) || showColumnThree.includes(form.inventoryType)" width="100">
                        <col v-if="showColumnFour.includes(form.inventoryType)" width="200">
                        <col v-if="showColumnFour.includes(form.inventoryType)" width="200">
                        <col v-if="showColumnFive.includes(form.inventoryType)" width="200">
                        <col width="60">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>SKU </th>
                            <th>數量 </th>
                            <th v-if="showColumnTwo.includes(form.inventoryType)">轉入倉庫</th>
                            <th v-if="showColumnTwo.includes(form.inventoryType)">轉出倉庫</th>
                            <th v-if="showColumnFive.includes(form.inventoryType)">物流單號</th>    
                            <th v-if="showColumnOne.includes(form.inventoryType) || showColumnThree.includes(form.inventoryType) || showColumnTwo.includes(form.inventoryType)">平台</th>
                            <th v-if="showColumnOne.includes(form.inventoryType) || showColumnThree.includes(form.inventoryType) || showColumnTwo.includes(form.inventoryType)">賬號</th>
                            <th v-if="showColumnThree.includes(form.inventoryType) || showColumnFive.includes(form.inventoryType)">收樣方</th>
                            <th v-if="showColumnOne.includes(form.inventoryType) || showColumnThree.includes(form.inventoryType)">倉庫</th>
                            <th v-if="showColumnFour.includes(form.inventoryType)">退貨金額</th>
                            <th v-if="showColumnFour.includes(form.inventoryType)">採購單號</th>    
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(v,i) in form.data"
                            :key="i"
                        >
                            <td>
                                <el-form-item
                                    label=""
                                    :prop="'data.'+i+'.sku'"
                                    :rules='rules'
                                >
                                    <el-input v-model="v.sku" @blur="handleCheckSku(v.sku,v)"></el-input>
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
                                <el-form-item
                                >
                                    <el-input v-model="v.moveTo">
                                    </el-input>
                                </el-form-item>
                            </td>
                            <td v-if="showColumnTwo.includes(form.inventoryType)">
                                <el-form-item
                                >
                                    <el-input v-model="v.moveFrom">
                                    </el-input>
                                </el-form-item>
                            </td>
                            <td v-if="showColumnOne.includes(form.inventoryType) || showColumnThree.includes(form.inventoryType) || showColumnTwo.includes(form.inventoryType)">
                                <el-form-item
                                >
                                    <el-input v-model="v.platform">
                                    </el-input>
                                </el-form-item>
                            </td>
                            <td v-if="showColumnOne.includes(form.inventoryType) || showColumnThree.includes(form.inventoryType) || showColumnTwo.includes(form.inventoryType)">
                                <el-form-item
                                >
                                    <el-input v-model="v.account">
                                    </el-input>
                                </el-form-item>
                            </td>
                            <td v-if="showColumnFour.includes(form.inventoryType)">
                                <el-form-item
                                >
                                    <el-input v-model="v.amount">
                                    </el-input>
                                </el-form-item>
                            </td>
                            <td v-if="showColumnFour.includes(form.inventoryType)">
                                <el-form-item
                                >
                                    <el-input v-model="v.purchaseId">
                                    </el-input>
                                </el-form-item>
                            </td>
                            <td v-if="showColumnFive.includes(form.inventoryType)">
                                <el-form-item
                                >
                                    <el-input v-model="v.trackingNumber">
                                    </el-input>
                                </el-form-item>
                            </td>
                            <td v-if="showColumnThree.includes(form.inventoryType) || showColumnFive.includes(form.inventoryType)">
                                <el-form-item
                                >
                                    <el-select
                                        placeholder="收樣方"
                                        v-model="v.sampleTo"
                                        clearable
                                        class="w100"
                                    >
                                        <el-option
                                            v-for="(v,i) in sampleToOption"
                                            :key="'smaple'+i"
                                            :value="v.managerName"
                                        >
                                            <div class="flex-s-a">
                                                <div class="w33">
                                                    <span>賬號:{{ v.account }}</span>
                                                </div>
                                                <div class="w33">
                                                    <span>平台:{{ v.platform }}</span>
                                                </div>
                                                <div class="w33">
                                                    <span>管理名稱:{{v.managerName}}</span>
                                                </div>
                                            </div>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                            <td v-if="showColumnOne.includes(form.inventoryType) || showColumnThree.includes(form.inventoryType)">
                                <el-form-item
                                >
                                    <el-select
                                        placeholder="倉庫"
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
                            <td>
                                    <el-button v-if="i!=0" class="btnh" style="color:#409EFF" type="text" @click="handleRemove(i)">删除</el-button>
                                    <el-button class="btnh" style="color:#409EFF" type="text" @click="handleQuerySku(i)">查詢</el-button>
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
                >新增產品</el-button>
            </el-form-item>
            <el-form-item>
                <el-button
                    @click="submit"
                    :loading="submitLoading"
                    type="primary"
                    size="mediumn"
                >新增</el-button>
            </el-form-item>
        </el-form>
        <querySku name="inventoryAdd" ref="inventoryAdd"></querySku>
    </div>
</template>

<script>
import querySku from "@/common/querySku";
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
        purchaseId: ""
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
    Promise.all([type, warehouse, sampleTo]).then(
      ([type, warehouse, sampleTo]) => {
        this.sampleToOption = sampleTo;
        this.warehouseOption = _.cloneDeep(warehouse);
        this.inventoryTypeOption = _.cloneDeep(type);
        let inventoryData = this.inventoryTypeOption.slice(0, 3);
        inventoryData.push(this.inventoryTypeOption.slice(-1)[0]);
        inventoryData.push(...this.inventoryTypeOption.slice(6, 8));
        this.inventoryTypeOption = inventoryData;
      }
    );
  },
  data() {
    return {
      rules: {
        required: true,
        message: "此項必填"
      },
      showColumnOne: ["INVENTORY_SHORTAGE", "INVENTORY_OVERAGE"],
      showColumnTwo: ["TRANSFER"],
      showColumnThree: ["INVENTORY_OVERAGE"],
      showColumnFour: ["RETURN_REFUND"],
      showColumnFive: ["SAMPLE_OUT"],
      inventoryTypeOption: [],
      warehouseOption: [],
      sampleToOption: [],
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
      form: {
        inventoryType: "INVENTORY_SHORTAGE",
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
            purchaseId: ""
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
  }
}
</style>
