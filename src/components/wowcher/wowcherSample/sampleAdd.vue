<template>
  <div id="edit">
    <div style="padding:20px">
      <div class="heade">
        <i class="el-icon-arrow-left"></i>
        <a href="javascript:void(0)" @click="goBack">返回</a>
      </div>
      <br>
      <h2>新增樣品發貨單</h2>
      <br>
       <el-button type="success" size="small" @click="handleAdd" >新增樣品</el-button>
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
            <el-col :span="5">
              <el-form-item label="shipoutTime">
                <el-date-picker v-model="v.shipoutTime" type="datetime" placeholder="选择日期时间"> </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="shippingMethod">
                <el-input v-model="v.shippingMethod"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="trackingNumber">
                <el-input v-model="v.trackingNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="agent">
                <el-input v-model="v.agent"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="toWhom">
                <el-input v-model="v.toWhom"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-form-item label="currency">
                <el-input v-model="v.currency"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="shipmentCreatedTime">
                <el-date-picker v-model="v.shipmentCreatedTime" type="datetime" placeholder="选择日期时间"> </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="agentOrderId">
                <el-input v-model="v.agentOrderId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="sampleName">
                <el-input v-model="v.sampleName"></el-input>
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
                        shipoutTime: "",
                        shippingMethod: "",
                        trackingNumber: "",
                        agent: "",
                        toWhom: "",
                        shipmentCreatedTime: "",
                        agentOrderId: "",
                        sampleName: "",
                        note: ""
                    }
                ]
            }
        };
    },
    created() {},
    methods: {
        goBack() {
            this.$router.push("/wowcherSample");
        },
        handleAdd() {
            let obj = {
                shipoutTime: "",
                shippingMethod: "",
                trackingNumber: "",
                agent: "",
                toWhom: "",
                shipmentCreatedTime: "",
                agentOrderId: "",
                sampleName: "",
                note: ""
            };
            this.formData.data.push(obj);
        },
        handleDelete(index) {
            this.formData.data.splice(index, 1);
        },
        getValue() {
            let data = _.cloneDeep(this.formData.data);
            data.shipmentCreatedTime = this.moment(
                data.ShipmentCreatedTime
            ).format('"YYYY-MM-DD HH:mm:ss"');
            data.shipoutTime = this.moment(
                data.shipoutTime
            ).format('"YYYY-MM-DD HH:mm:ss"');
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
                        url: "wowcher/sample/add",
                        method: "post",
                        data: {
                            value: this.getValue(),
                            token: this.token
                        }
                    }).then(res => {
                        this.submitLoading = true;
                        this.Bus.$emit("refresh");
                        this.$router.push("/wowcherSample");
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


