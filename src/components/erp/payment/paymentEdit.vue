<template>
  <div id="edit">
    <div style="padding:20px">
      <div class="heade">
        <i class="el-icon-arrow-left"></i>
        <a href="javascript:void(0)" @click="goBack">返回</a>
      </div>
      <br>
      <h2>编辑Payment
      </h2>
      <br>
      <el-form ref="form" :model="formData" v-loading="loading" label-position="top">
        <el-card class="box-card" v-for="(v,i) in formData.data" :key="i" style="margin-bottom:20px">
          <el-row :gutter="10">
            <el-col :span="2">
              <el-form-item label="序號">
                <span>{{i+1}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="purchaseId">
                <el-input v-model="v.purchaseId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="currency">
                <el-input v-model="v.currency"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="paidBy">
                <el-input v-model="v.paidBy"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="paymentTime">
                <el-date-picker v-model="v.paymentTime" type="datetime" placeholder="选择日期时间"> </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="paymentMethod">
                <el-input v-model="v.paymentMethod"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="paymentAccount">
                <el-input v-model="v.paymentAccount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="purchasedBy">
                <el-input v-model="v.purchasedBy"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="paymentPlatformId">
                <el-input v-model="v.paymentPlatformId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="shippingCost">
                <el-input v-model="v.shippingCost"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="備註">
                <el-input v-model="v.note" type="textarea" rows="1"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <br>
        <el-button @click="submit" :loading="submitLoading" type="primary" style="width:150px;height:60px;font-size:18px;display:inline-block">编辑</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
    watch: {},
    data() {
        return {
            submitLoading: false,
            loading: false,
            formData: {
                data: [
                    {
                        purchaseId: "",
                        currency: "",
                        paymentTime: "",
                        paidBy: "",
                        paymentMethod: "",
                        paymentAccount: "",
                        purchasedBy: "",
                        shippingCost: "",
                        paymentPlatformId: "",
                        note: ""
                    }
                ]
            }
        };
    },
    created() {
        let data = JSON.parse(this.$route.query.data);
        this.formData.data[0].purchaseId = data.purchaseId;
        this.formData.data[0].currenc = data.currenc;
        this.formData.data[0].paymentTime = data.paymentTime;
        this.formData.data[0].paidBy = data.paidBy;
        this.formData.data[0].paymentMethod = data.paymentMethod;
        this.formData.data[0].paymentAccount = data.paymentAccount;
        this.formData.data[0].currency = data.agentOrderId;
        this.formData.data[0].purchasedBy = data.purchasedBy;
        this.formData.data[0].shippingCost = data.shippingCost;
        this.formData.data[0].note = data.note;
        this.formData.data[0].paymentPlatformId = data.paymentPlatformId;
    },
    methods: {
        goBack() {
            this.$router.push("/payment");
        },
        handleAdd() {
            let obj = {
                purchaseId: "",
                currency: "",
                paymentTime: "",
                paidBy: "",
                paymentMethod: "",
                paymentAccount: "",
                purchasedBy: "",
                shippingCost: "",
                paymentPlatformId: "",
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
                '"YYYY-MM-DD HH:mm:ss"'
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
                        url: "payment/update",
                        method: "post",
                        data: {
                            value: this.getValue(),
                            token: this.token
                        }
                    }).then(res => {
                        this.submitLoading = true;
                        this.Bus.$emit("refresh");
                        this.$router.push("/payment");
                    });
                }
            });
        }
    }
};
</script>
<style lang="scss">
#edit .heade {
    font-size: 16px;
    color: #45a2ff;
}
#edit .heade a {
    color: #45a2ff;
}
#edit {
    .el-button--text {
        color: #606266;
    }
}
</style>


