<template>
  <div id="edit">
    <div style="padding:20px">
      <div class="heade">
        <i class="el-icon-arrow-left"></i>
        <a href="javascript:void(0)" @click="goBack">返回</a>
      </div>
      <br>
      <h2>新增 Replacement</h2>
      <br>
      <el-form ref="form" :model="formData" v-loading="loading" label-position="top">
        <el-card class="box-card" v-for="(v,i) in formData.data" :key="i" style="margin-bottom:20px">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="Wowcher Code">
                <el-input v-model="v.wowcherCode" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="最後更新時間">
                <el-input v-model="v.lastUpdatedTime" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="最後更新">
                <el-input v-model="v.lastModifiedBy" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="建立時間">
                <el-input v-model="v.AddedTime" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="最後更新">
                <el-input v-model="v.addedBy" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="3">
              <el-form-item label="手動發貨">
                <el-input v-model="v.isManual" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="物流單建立時間">
                <el-input v-model="v.ShipmentCreatedTime" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="發貨時間">
                <el-input v-model="v.shipoutTime" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="貨代">
                <el-input v-model="v.agent" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="發貨方式">
                <el-input v-model="v.shippingMethod" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="物流單號">
                <el-input v-model="v.trackingNumber" disabled></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="需發貨物品名稱">
                <el-input v-model="v.ShipmentProductName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="備註">
                <el-input v-model="v.Note" disabled></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="收件人">
                <el-input v-model="v.receiverName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="電話">
                <el-input v-model="v.phone" disabled></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="地址1">
                <el-input v-model="v.address1" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地址2">
                <el-input v-model="v.address2" disabled></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="城市">
                <el-input v-model="v.city" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="省/州">
                <el-input v-model="v.county" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="郵編">
                <el-input v-model="v.postcode" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="國家">
                <el-input v-model="v.country" disabled></el-input>
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
                        OriginProductName: "",
                        ShipmentProductName: "",
                        AgentOrderId: "",
                        trackingNumber: "",
                        ShippingMethod: "",
                        currency: "",
                        ShipmentCreatedTime: "",
                        shipoutTime: "",
                        AddedTime: "",
                        Agent: "",
                        Note: "",
                        isManual: "",
                        wowcherCode: ""
                    }
                ]
            }
        };
    },
    created() {
        let data = JSON.parse(this.$route.query.data);
        this.formData.data[0].OriginProductName = data.originProductName;
        this.formData.data[0].ShipmentProductName = data.shipmentProductName;
        this.formData.data[0].AgentOrderId = data.agentOrderId;
        this.formData.data[0].trackingNumber = data.trackingNumber;
        this.formData.data[0].ShippingMethod = data.shippingMethod;
        this.formData.data[0].currency = data.currency;
        this.formData.data[0].ShipmentCreatedTime = data.shipmentCreatedTime;
        this.formData.data[0].shipoutTime = data.shipoutTime;
        this.formData.data[0].AddedTime = data.addedTime;
        this.formData.data[0].Agent = data.agent;
        this.formData.data[0].Note = data.note;
        this.formData.data[0].isManual = data.isManual;
        this.formData.data[0].wowcherCode = data.wowcherCode;
        this.formData.data[0].purchasedQuantity = data.purchasedQuantity;
    },
    methods: {
        goBack() {
            this.$router.push("/replacement");
        },
        handleAdd() {
            let obj = {
                OriginProductName: "",
                ShipmentProductName: "",
                AgentOrderId: "",
                trackingNumber: "",
                ShippingMethod: "",
                currency: "",
                ShipmentCreatedTime: "",
                shipoutTime: "",
                AddedTime: "",
                Agent: "",
                Note: "",
                isManual: "",
                wowcherCode: ""
            };
            this.formData.data.push(obj);
        },
        handleDelete(index) {
            this.formData.data.splice(index, 1);
        },
        getValue() {
            let data = _.cloneDeep(this.formData.data);
            data.ShipmentCreatedTime = this.moment(
                data.ShipmentCreatedTime
            ).format('"YYYY-MM-DD HH:mm:ss"');
            data.shipoutTime = this.moment(data.shipoutTime).format(
                '"YYYY-MM-DD HH:mm:ss"'
            );
            data.AddedTime = this.moment(data.AddedTime).format(
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
                        url: "wowcher/rpm/update",
                        method: "post",
                        data: {
                            value: this.getValue(),
                            token: this.token
                        }
                    }).then(res => {
                        this.submitLoading = true;
                        this.Bus.$emit("refresh");
                        this.$router.push("/replacement");
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


