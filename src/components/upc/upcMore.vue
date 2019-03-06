<template>
  <div>
    <el-form ref="form" :model="form" label-position="top" :rules="rules">
          <el-form-item label="Skus：">
              <el-input v-model="form.skus" type="textarea" rows="2"></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="平台" prop="platform">
                  <el-select v-model="form.platform">
                    <el-option v-for="(v,i) in upcPlatform" :key="i" :label="v.platform" :value="v.platform"></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="帳號" prop="account">
                  <el-select v-model="form.account">
                    <el-option v-for="(v,i) in upcAccount" :key="i" :label="v.account" :value="v.account"></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="國家" prop="country">
                  <el-select v-model="form.country">
                    <el-option v-for="(v,i) in upcCountry" :key="i"  :value="v.countryNameChinese">
                      <span style="float: left">{{ v.countryCode }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryNameChinese }}</span>
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-col>
          </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        country: {
          required: true,
          message: "此項必填"
        },
        skus: {
          required: true,
          message: "此項必填"
        },
        account: {
          required: true,
          message: "此項必填"
        },
        platform: {
          required: true,
          message: "此項必填"
        }
      },
      upcPlatform: [],
      upcAccount: [],
      upcCountry: [],
      form: {
        token: this.token,
        skus: "",
        country: "",
        account: "",
        platform: ""
      }
    };
  },
  methods: {
    getValue() {
      return this.form;
    },
    validate() {
      let val = false;
      this.$refs["form"].validate(valid => {
        val = valid;
      });
      return val;
    },
    submit() {
      return axios({
        url: "upc/add/batch",
        method: "post",
        data: this.getValue()
      })
        .then(() => {
          this.Bus.$emit("refresh");
          this.$message.success("添加成功");
        })
        .catch(() => {
          this.$message.error("添加失敗");
        });
    }
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
  }
};
</script>

<style scoped lang="scss">
/deep/ .el-form-item {
  margin-bottom: 5px;
}
</style>
