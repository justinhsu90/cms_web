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
              <el-button :disabled="formData.data.length <= 1" style="float: right; padding: 3px 0" type="text" icon="el-icon-close" @click="handleDelete(i)"></el-button>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item label="手動發貨 (Y or N)" prop="isManual" :rules="{required:true}">
                <el-input v-model="v.isManual"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Wowcher Code" prop="wowcherCode" :rules="{required:true}">
                <el-input v-model="v.wowcherCode"></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row :gutter="20">
              <br>
              <p> 如發貨地址, 產品, 收件人需修改, 則填寫對應內容</p>
              <br>
            </el-row>
            <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="需發貨物品名稱">
                <el-input v-model="v.ShipmentProductName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="備註">
                <el-input v-model="v.Note" ></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="收件人">
                <el-input v-model="v.receiverName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="電話">
                <el-input v-model="v.phone"></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="地址1">
                <el-input v-model="v.address1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地址2">
                <el-input v-model="v.address2"></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="城市">
                <el-input v-model="v.city"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="省/州">
                <el-input v-model="v.county"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="郵編">
                <el-input v-model="v.postcode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="國家">
                <el-input v-model="v.country"></el-input>
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
                        isManual: "N",
                        wowcherCode: "",
                        ShipmentProductName: "",
                        Note: "",
                        receiverName: "",
                        phone: "",
                        address1: "",
                        address2: "",
                        city: "",
                        county: "",
                        postcode: "",
                        country: ""
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
                isManual: "",
                wowcherCode: "",
                ShipmentProductName: "",
                Note: "",
                receiverName: "",
                phone: "",
                address1: "",
                address2: "",
                city: "",
                county: "",
                postcode: "",
                country: ""
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


