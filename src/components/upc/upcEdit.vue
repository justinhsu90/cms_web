<template>
  <div id="edit">
    <div style="padding:20px">
      <div class="heade">
        <i class="el-icon-arrow-left"></i>
        <a href="javascript:void(0)" @click="goBack">返回</a>
      </div>
      <br>
      <h2>編輯 UPC</h2>
      <br>
      <el-form ref="form" :model="formData" v-loading="loading" label-position="top">
        <el-card class="box-card" v-for="(v,i) in formData.data" :key="i" style="margin-bottom:20px">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="EAN/UPC (EAN:13碼, UPC:12碼)">
                <el-input v-model="v.ean"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="使用 SKU" :prop="'data.'+i+'.subSku'" :rules="{required:true}">
                <el-input v-model="v.subSku"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="ASIN">
                <el-input v-model="v.asin"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="產品名稱">
                <el-input v-model="v.productName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item label="平台" :prop="'data.' + i + '.platform'" :rules="{required:true}">
                <el-select v-model="v.platform">
                  <el-option v-for="(v,i) in upcPlatform" :key="i" :label="v.platform" :value="v.platform"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="帳號" :prop="'data.' + i + '.account'" :rules="{required:true}">
                <el-select v-model="v.account">
                  <el-option v-for="(v,i) in upcAccount" :key="i" :label="v.account" :value="v.account"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="國家" :prop="'data.'+i+'.country'" :rules="{required:true}">
                <el-select v-model="v.country">
                  <el-option v-for="(v,i) in upcCountry" :key="i" :value="v.countryNameChinese">
                    <span style="float: left">{{ v.countryCode }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryNameChinese }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="最後更新時間">
                <el-input v-model="v.lastUpdatedTime" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="更新者">
                <el-input v-model="v.lastModifiedBy" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="配對時間">
                <el-input v-model="v.addedTime" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="配對者">
                <el-input v-model="v.addedBy" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="備註">
                <el-input v-model="v.note" type="textarea" rows="1"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <br>
        <el-button @click="submit" :loading="submitLoading" type="primary" size="large">編輯</el-button>
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
            upcCountry: [],
            upcPlatform: [],
            upcAccount: [],
            formData: {
                data: [
                    {
                        subSku: "",
                        ean: "",
                        productName: "",
                        asin: "",
                        country: "",
                        account: "",
                        platform: "",
                        note: ""
                    }
                ]
            }
        };
    },
    created() {
        let upcCountry = axios({
            url: "/upc/value/country",
            method: "post",
            data: {
                token: this.token
            }
        });
        let upcPlatform = axios({
            url: "/upc/value/platform",
            method: "post",
            data: {
                token: this.token
            }
        });
        let upcAccount = axios({
            url: "/upc/value/account",
            method: "post",
            data: {
                token: this.token
            }
        });
        Promise.all([upcPlatform, upcCountry, upcAccount]).then(
            ([resOne, resTwo, resThree]) => {
                this.upcCountry = _.cloneDeep(resTwo.data);
                this.upcAccount = _.cloneDeep(resThree.data);
                this.upcPlatform = _.cloneDeep(resOne.data);
            }
        );
        let data = JSON.parse(this.$route.query.data);
        this.formData.data[0].country = data.country;
        this.formData.data[0].account = data.account;
        this.formData.data[0].ean = data.ean;
        this.formData.data[0].subSku = data.subSku;
        this.formData.data[0].productName = data.productName;
        this.formData.data[0].asin = data.asin;
        this.formData.data[0].platform = data.platform;
        this.formData.data[0].note = data.note;
        this.formData.data[0].lastModifiedBy = data.lastModifiedBy;
        this.formData.data[0].addedBy = data.addedBy;
        this.formData.data[0].addedTime = data.addedTime;
        this.formData.data[0].lastUpdatedTime = data.lastUpdatedTime;
        this.formData.data[0].id = data.id;
    },
    methods: {
        goBack() {
            this.$router.push("/upc");
        },
        getValue() {
            let data = _.cloneDeep(this.formData.data);
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
                        url: "/upc/update",
                        method: "post",
                        data: {
                            value: this.getValue(),
                            token: this.token
                        }
                    }).then(res => {
                        this.submitLoading = true;
                        this.Bus.$emit("refresh");
                        this.$router.push("/upc");
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


