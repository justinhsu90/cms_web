<template>
  <div id="edit">
    <div style="padding:20px">
      <div class="heade">
        <i class="el-icon-arrow-left"></i>
        <a href="javascript:void(0)" @click="goBack">返回</a>
      </div>
      <br>
      <h2>添加Replacement</h2>
      <br>
       <el-button type="success" size="small" @click="handleAdd" >新增產品</el-button>
      <br>
      <br>
      <el-form ref="form" :model="formData" v-loading="loading" label-position="top">
        <el-card class="box-card" v-for="(v,i) in formData.data" :key="i" style="margin-bottom:20px">
          <el-row :gutter="10">
              <el-button :disabled="formData.data.length <= 1" style="float: right; padding: 3px 0" type="text" icon="el-icon-close" @click="handleDelete(i)"></el-button>
            <el-col :span="2">
              <el-form-item label="序號">
                <span>{{i+1}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="OriginProductName">
                <el-input v-model="v.OriginProductName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="ShipmentProductName">
                <el-input v-model="v.ShipmentProductName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="AgentOrderId">
                <el-input v-model="v.AgentOrderId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="trackingNumber">
                <el-input v-model="v.trackingNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="ShippingMethod">
                <el-input v-model="v.ShippingMethod"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-form-item label="currency">
                <el-input v-model="v.currency"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="ShipmentCreatedTime">
                <el-date-picker v-model="v.ShipmentCreatedTime" type="datetime" placeholder="选择日期时间"> </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="shipoutTime">
                <el-date-picker v-model="v.shipoutTime" type="datetime" placeholder="选择日期时间"> </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="AddedTime">
                <el-date-picker v-model="v.AddedTime" type="datetime" placeholder="选择日期时间"> </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="Agent">
                <el-input v-model="v.Agent"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="isManual">
                <el-input v-model="v.isManual"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="wowcherCode">
                <el-input v-model="v.wowcherCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="備註">
                <el-input v-model="v.Note" type="textarea" rows="1"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <br>
        <el-button @click="submit" :loading="submitLoading" type="primary" style="width:150px;height:60px;font-size:18px;display:inline-block">添加</el-button>
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
    created() {},
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
                        url: "/wowcher/rpm/add",
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


