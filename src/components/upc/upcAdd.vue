<template>
  <div id="edit">
    <div style="padding:20px">
      <div class="heade">
        <i class="el-icon-arrow-left"></i>
        <a href="javascript:void(0)" @click="goBack">返回</a>
      </div>
      <br>
      <h2>指派 UPC</h2>
      <br>
      <el-form ref="form" :model="formData" v-loading="loading" label-position="top">
        <el-card class="box-card" v-for="(v,i) in formData.data" :key="i" style="margin-bottom:20px">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="EAN:13碼 / UPC:12碼 (手動輸入)">
                <el-input v-model="v.ean"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="使用 SKU" :prop="'data.'+ i +'.subSku'" :rules="{required:true}">
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
                  <el-option v-for="(v,i) in upcCountry" :key="i"  :value="v.countryNameChinese">
                    <span style="float: left">{{ v.countryCode }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryNameChinese }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="備註">
                <el-input v-model="v.note" type="textarea" rows="1"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <br>
        <el-button @click="submit" :loading="submitLoading" type="primary" size="large">新增</el-button>
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
  },
  methods: {
    goBack() {
      this.$router.push("/upc");
    },
    handleAdd() {
      let obj = {
        subSku: "",
        ean: "",
        productName: "",
        asin: "",
        country: "",
        account: "",
        platform: "",
        note: ""
      };
      this.formData.data.push(obj);
    },
    handleDelete(index) {
      this.formData.data.splice(index, 1);
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
            url: "/upc/add",
            method: "post",
            data: {
              value: this.getValue(),
              token: this.token
            }
          }).then(() => {
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
