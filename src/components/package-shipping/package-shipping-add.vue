<template>
  <div>
    <div class="p20">
      <div class="heade">
        <i class="el-icon-arrow-left"></i>
        <a href="javascript:void(0)" @click="goBack">返回</a>
      </div>
      <br>
      <h2>
        新增入庫單
      </h2>
      <br>
      <el-form ref="form" :model="formData" v-loading="loading" label-position="top">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="物流單號">
              <el-input v-model="formData.trackingNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="快遞/物流">
              <el-input v-model="formData.agent"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="質檢人">
              <el-input v-model="formData.inspectionBy"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="入庫時間">
              <el-date-picker clearable class="w100" value-format="yyyy-MM-dd HH:mm:ss" v-model="formData.receivedDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="pr6 pl6">
          <table cellspacing="0" cellpadding="0">
            <colgroup>
              <col width="30">
              <col width="80">
              <col width="100">
              <!-- <col width="250"> -->
              <col width="80">
              <col width="80">
              <!-- <col width="80"> -->
              <col width="60">
            </colgroup>
            <thead>
              <tr>
                <th>序號</th>
                <th>對應採購單號</th>
                <th>SKU</th>
                <!-- <th>產品名稱</th> -->
                <th>數量</th>
                <th>庫存狀態</th>
                <!-- <th>入庫單號</th> -->
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(v,i) in formData.data" :key="i">
                <td>
                  {{i+1}}
                </td>
                <td>
                  <el-form-item>
                    <el-input v-model="v.purchaseId"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item>
                    <el-input  ref="input" v-model="v.sku"></el-input>
                  </el-form-item>
                </td>
                <!-- <td>
                  <el-form-item>
                    <el-input v-model="v.productName"></el-input>
                  </el-form-item>
                </td> -->
                <td>
                  <el-form-item>
                    <el-input v-model="v.quantity"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item>
                    <el-select v-model="v.stockCondition">
                        <el-option v-for="(v,i) in stockCondition" :label="v" :value="v" :key="i"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <!-- <td>
                  <el-form-item>
                    <el-input v-model="v.warehouseReceiveId"></el-input>
                  </el-form-item>
                </td> -->
                <td>
                  <el-button v-if="i!=0" class="btnh" style="color:#409EFF" type="text" @click="handleDelete(i)">删除</el-button>
                  <el-button class="btnh" style="color:#409EFF" type="text" @click="handleQuerySku(i)">查詢</el-button>
                </td>
              </tr>
            </tbody>
          </table>
        </el-row>
        <br>
        <el-button @click="submit" :loading="submitLoading" type="primary" size="large">添加</el-button>
        <el-button :disabled="disabled" class="fr" type="success" size="small" @click="handleAdd">新增產品</el-button>
      </el-form>
    </div>
    <querySku name="put-storage-add" ref="querySku"></querySku>
  </div>
</template>
<script>
import querySku from "@/common/querySku";
import moment from "moment";
import C from "js-cookie";
export default {
  name: "put-storage-add",
  components: {
    querySku
  },
  data() {
    let getTime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

    return {
      submitLoading: false,
      loading: false,
      stockCondition: [],
      formData: {
        receivedDate: getTime,
        inspectionBy: C.get("userName"),
        trackingNumber: "",
        agent: "",
        data: [
          {
            sku: "",
            productName: "",
            quantity: "",
            stockCondition: "",
            purchaseId: ""
            // warehouseReceiveId: "",
          }
        ]
      }
    };
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
    }
  },
  created() {
    axios({
      url: "/erp/warehouse/receive/value/stockCondition",
      method: "post",
      data: {
        token: this.token
      }
    }).then(res => {
      this.stockCondition = res;
    });
    this.$on("selectSku", this.handleSku);
  },
  methods: {
    goBack() {
      this.$router.push("/putStorage");
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
    handleAdd() {
      let obj = {
        sku: "",
        productName: "",
        quantity: "",
        stockCondition: "",
        purchaseId: ""
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
        v.agent = this.formData.agent;
        v.inspectionBy = this.formData.inspectionBy;
        v.receivedDate = this.formData.receivedDate;
        v.trackingNumber = this.formData.trackingNumber;
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
            url: "/erp/warehouse/receive/add",
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
</style>
