<template>
  <div>
    <div class="p20">
      <div class="heade">
        <i class="el-icon-arrow-left"></i>
        <a href="javascript:void(0)" @click="goBack">返回</a>
      </div>
      <br>
      <h2>
        编辑入库單
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
        <el-card class="box-card" v-for="(v,i) in formData.data" :key="i" style="margin-bottom:20px">
          <el-row>
            <table cellspacing="0" cellpadding="0">
              <colgroup>
                <col width="40">
                <col width="100">
                <col width="250">
                <col width="80">
                <col width="80">
                <col width="80">
                <col width="80">
                <col width="70">
              </colgroup>
              <thead>
                <tr>
                  <th>採購ID </th>
                  <th>SKU </th>
                  <th>產品名稱</th>
                  <th>數量</th>
                  <th>庫存狀態</th>
                  <th>入庫單號</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(v,i) in formData.data" :key="i">
                  <td>
                    <el-form-item>
                      <el-input v-model="v.purchaseId"></el-input>
                    </el-form-item>
                  </td>
                  <el-form-item>
                    <el-input v-model="v.sku"></el-input>
                  </el-form-item>
                  <td>
                    <el-form-item>
                      <el-input v-model="v.productName"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item>
                      <el-input v-model="v.quantity"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item>
                      <el-input v-model="v.stockCondition"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item>
                      <el-input v-model="v.warehouseReceiveId"></el-input>
                    </el-form-item>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-row>
        </el-card>
        <br>
        <el-button @click="submit" :loading="submitLoading" type="primary" size="large">编辑</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            submitLoading: false,
            loading: false,
            formData: {
                receivedDate:'',
                inspectionBy:'',
                trackingNumber:'',
                agent: "",
                data: [
                    {
                        sku: "",
                        productName: "",
                        quantity: "",
                        stockCondition: "",
                        purchaseId: "",
                        warehouseReceiveId: "",
                    }
                ]
            }
        };
    },
    created() {
        let data = JSON.parse(this.$route.query.data);
        this.formData.data[0].sku = data.sku;
        this.formData.data[0].productName = data.productName;
        this.formData.data[0].quantity = data.quantity;
        this.formData.data[0].stockCondition = data.stockCondition;
        this.formData.data[0].purchaseId = data.purchaseId;
        this.formData.data[0].warehouseReceiveId = data.warehouseReceiveId;
        this.formData.data[0].note = data.note;

        this.formData.agent = data.agent;
        this.formData.inspectionBy = data.inspectionBy;
        this.formData.receivedDate = data.receivedDate;  
        this.formData.trackingNumber = data.trackingNumber;      
    },
    methods: {
        goBack() {
            this.$router.push("/put-storage");
        },
        getValue() {
            let data = _.cloneDeep(this.formData.data);
            data.agent = this.formData.agent;
            data.inspectionBy = this.formData.inspectionBy;
            data.receivedDate = this.formData.receivedDate;  
            data.trackingNumber = this.formData.trackingNumber;
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
                        url: "/erp/warehouse/receive/edit",
                        method: "post",
                        data: {
                            value: this.getValue(),
                            token: this.token
                        }
                    }).then(res => {
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


