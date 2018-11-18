<template>
  <div>
    <div class="p20">
      <div class="heade">
        <i class="el-icon-arrow-left"></i>
        <a href="javascript:void(0)" @click="goBack">返回</a>
      </div>
      <br>
      <h2>
        新增入库單
        <el-button  style="float:right" type="success" size="small" @click="handleAdd">新增產品</el-button>
      </h2>
      <br>
      <el-form ref="form" :model="formData" v-loading="loading" label-position="top">
        <el-card class="box-card" v-for="(v,i) in formData.data" :key="i" style="margin-bottom:20px">
          <el-row :gutter="20">
              <el-button :disabled="formData.data.length <= 1" style="float: right; padding: 3px 0" type="text" icon="el-icon-close" @click="handleDelete(i)"></el-button>
            
             <!-- <el-col :span="3">
              <el-form-item label="入庫單號">
                <el-input v-model="v.warehouseReceiveId"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="2">
              <el-form-item label="序號">
                <span>{{i+1}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="SKU">
                <el-input v-model="v.sku"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="快遞/物流">
                <el-input v-model="v.agent"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="產品名稱">
                <el-input v-model="v.productName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="數量">
                <el-input v-model="v.quantity"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="物流單號">
                <el-input v-model="v.trackingNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="庫存狀態">
                <el-input v-model="v.stockCondition"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="入庫時間">
                <el-date-picker clearable class="w100" value-format="yyyy-MM-dd HH:mm:ss"  v-model="v.receivedDate"  type="datetime" placeholder="選擇時間日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="質檢人">
                <el-input v-model="v.inspectionBy"></el-input>
              </el-form-item>
            </el-col>
           
            <el-col :span="3">
              <el-form-item label="採購單號">
                <el-input v-model="v.purchaseId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="備註">
                <el-input v-model="v.note" type="textarea" rows="2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <br>
        <el-button @click="submit" :loading="submitLoading" type="primary" size="large">添加</el-button>
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
                        addBy: "",
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
    computed:{
          disabled() {
            return this.formData.data.length <= 1;
        },
    },
    methods: {
      handleChange(val){
      },
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
        handleDelete(index) {
            this.formData.data.splice(index, 1);
        },
        getValue() {
            let data = _.cloneDeep(this.formData.data);
            data.paymentTime = this.moment(data.paymentTime).format(
                "YYYY-MM-DD HH:mm:ss"
            );
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
</style>


