<template>
<div id="edit">
    <div style="padding:20px"> 
    <div class="heade">
      <i class="el-icon-arrow-left"></i>
      <a href="javascript:void(0)" @click="goBack">返回</a>
    </div>
    <br>
    <h2>新增 UPC</h2>
    <br> 
    <el-form ref="form" :model="formData"   v-loading="loading" label-position="top">
      <el-card class="box-card" v-for="(v,i) in formData.data" :key="i" style="margin-bottom:20px">
        <el-row :gutter="20">
             <el-col :span="5">
              <el-form-item label="帳號">
              <el-input v-model="v.account"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="4">
              <el-form-item label="國家">
              <el-input v-model="v.country"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="5">
              <el-form-item label="Deal ID">
              <el-input v-model="v.dealId"></el-input>
              </el-form-item>
            </el-col>
           
             <el-col :span="5">
              <el-form-item label="Product ID">
              <el-input v-model="v.productId"></el-input>
              </el-form-item>
            </el-col>

              <el-col :span="5">
              <el-form-item label="開始日期">
              <el-input v-model="v.startDate"></el-input>
              </el-form-item>
            </el-col>

             <el-col :span="16">
              <el-form-item label="產品名稱">
              <el-input v-model="v.productName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="產品規格">
              <el-input v-model="v.productSpec"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="10">
              <el-form-item label="產品中文申報名稱">
              <el-input v-model="v.declareNameChinese"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="14">
              <el-form-item label="產品英文申報名稱">
              <el-input v-model="v.declareNameEnglish"></el-input>
              </el-form-item>
            </el-col>

           
           <el-col :span="3">
              <el-form-item label="Wowcher 售價">
              <el-input v-model="v.salePrice" ></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="3">
              <el-form-item label="Wowcher 運費">
              <el-input v-model="v.shippingCost" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="Final Price">
              <el-input v-model="v.finalPrice" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="幣別">
              <el-input v-model="v.currency" ></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="4">
              <el-form-item label="產品成本">
              <el-input v-model="v.productCost" ></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="4">
              <el-form-item label="產品成本幣別">
              <el-input v-model="v.productCostCurrency" ></el-input>
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
       <el-button @click="submit"  :loading="submitLoading" type="primary" style="width:150px;height:60px;font-size:18px;display:inline-block">新增</el-button> 
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
             dealId: "",
        productId: "",
        productName: "",
        productSpec: "",
        currency: "",
        productCostCurrency: "",
        productCost: "",
        finalPrice: "",
        salePrice: "",
        declareNameChinese: "",
        declareNameEnglish: "",
        country: "",
        account: "",
        startDate: "",
        note: ""
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    goBack() {
      this.$router.push("/wowcherDealList");
    },
    handleAdd() {
      let obj = {
        dealId: "",
        productId: "",
        productName: "",
        productSpec: "",
        currency: "",
        productCostCurrency: "",
        productCost: "",
        finalPrice: "",
        salePrice: "",
        declareNameChinese: "",
        declareNameEnglish: "",
        country: "",
        account: "",
        startDate: "",
        note: ""
      };
      this.formData.data.push(obj)
    },
    handleDelete(index) {
      this.formData.data.splice(index,1);
    },
    getValue(){
    let data = _.cloneDeep(this.formData.data);
    let obj = {
      data
    }
    return JSON.stringify(obj);
    },
    submit() {
      this.$refs["form"].validate(action => {
        if (action) {
          this.getValue();
          this.submitLoading = true;
          axios({
            url: "/wowcher/deal/add",
            method: "post",
            data: {
              value: this.getValue(),
              token: this.token
            }
          }).then(res => {
            this.submitLoading = true;
            this.Bus.$emit("refresh");
            this.$router.push("/wowcherDealList");
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


