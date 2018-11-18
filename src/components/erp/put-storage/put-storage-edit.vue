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
        <el-card class="box-card" v-for="(v,i) in formData.data" :key="i" style="margin-bottom:20px">
          <el-row :gutter="20">
            <el-col :span="2">
              <el-form-item label="序號">
                <span>{{i+1}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="sku">
                <el-input v-model="v.sku"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="代理">
                <el-input v-model="v.agent"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="商品名称">
                <el-input v-model="v.productName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="数量">
                <el-input v-model="v.quantity"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="物流單號">
                <el-input v-model="v.trackingNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="stockCondition">
                <el-input v-model="v.stockCondition"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="入庫時間">
                <el-date-picker clearable class="w100" value-format="yyyy-MM-dd HH:mm:ss" v-model="v.receivedDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="inspectionBy">
                <el-input v-model="v.inspectionBy"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="warehouseReceiveId">
                <el-input v-model="v.warehouseReceiveId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="purchaseId">
                <el-input v-model="v.purchaseId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="備註">
                <el-input v-model="v.note" type="textarea" rows="2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
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
                  <th>序號</th>
                  <th>SKU </th>
                  <th>產品名稱</th>
                  <th>單品金額</th>
                  <th>採購數量</th>
                  <th>該品總運費</th>
                  <th>總金額</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(v,i) in formData.data" :key="i">
                  <td>{{i+1}}</td>
                  <td>
                  </td>
                  <td>
                  </td>
                  <td>
                  </td>
                  <td>
                  </td>
                  <td>
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
                data: [
                    {
                        sku: "",
                        agent: "",
                        productName: "",
                        quantity: "",
                        trackingNumber: "",
                        stockCondition: "",
                        receivedDate: [],
                        inspectionBy: "",
                        purchaseId: "",
                        warehouseReceiveId: "",
                        note: ""
                    }
                ]
            }
        };
    },
    created() {
        let data = JSON.parse(this.$route.query.data);
        this.formData.data[0].sku = data.sku;
        this.formData.data[0].agent = data.agent;
        this.formData.data[0].addBy = data.addBy;
        this.formData.data[0].productName = data.productName;
        this.formData.data[0].quantity = data.quantity;
        this.formData.data[0].trackingNumber = data.trackingNumber;
        this.formData.data[0].stockCondition = data.stockCondition;
        this.formData.data[0].receivedDate = data.receivedDate;
        this.formData.data[0].inspectionBy = data.inspectionBy;
        this.formData.data[0].purchaseId = data.purchaseId;
        this.formData.data[0].warehouseReceiveId = data.warehouseReceiveId;
        this.formData.data[0].note = data.note;
    },
    methods: {
        handleChange() {},
        goBack() {
            this.$router.push("/put-storage");
        },
        handleAdd() {
            let obj = {
                sku: "",
                agent: "",
                addBy: "",
                productName: "",
                quantity: "",
                trackingNumber: "",
                stockCondition: "",
                receivedDate: "",
                inspectionBy: "",
                purchaseId: "",
                warehouseReceiveId: "",
                note: ""
            };
            this.formData.data.push(obj);
        },
        getValue() {
            let data = _.cloneDeep(this.formData.data);
            // data.paymentTime = this.moment(data.paymentTime).format(
            //     "YYYY-MM-DD HH:mm:ss"
            // );
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
                        url: "payment/add",
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


