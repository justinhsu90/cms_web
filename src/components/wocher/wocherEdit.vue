<template>
<div id="edit">
    <div  style="padding:20px"> 
    <div class="heade">
      <i class="el-icon-arrow-left"></i>
      <a href="javascript:void(0)" @click="goBack">返回</a>
    </div>
    <br>
    <h2>查看</h2>
      <el-form :model="data" label-position="left" label-width="150px">
          <el-row :gutter="20">
             <el-col :span="8">
          <el-form-item label="wowcherCode:">    
                <el-input disabled v-model="data.wowcherCode"></el-input>
          </el-form-item>
          <el-form-item label="redeemedAt:">    
                <el-input disabled v-model="data.redeemedAt"></el-input>
          </el-form-item>
          <el-form-item label="orderStatus:">    
                <el-input disabled v-model="data.orderStatus"></el-input>
          </el-form-item>
          <el-form-item label="orderType:">    
                <el-input disabled v-model="data.orderType"></el-input>
          </el-form-item>
          <el-form-item label="productName:">    
                <el-input disabled v-model="data.productName"></el-input>
          </el-form-item>
          <el-form-item label="customerName:">    
                <el-input disabled v-model="data.customerName"></el-input>
          </el-form-item>
          <el-form-item label="shipoutTime:">    
                <el-input disabled v-model="data.shipoutTime"></el-input>
          </el-form-item>  
          <el-form-item label="trackingNo:">    
                <el-input disabled v-model="data.trackingNo"></el-input>
          </el-form-item>
          <el-form-item label="agent:">    
                <el-input disabled v-model="data.agent"></el-input>
          </el-form-item>  
          <el-form-item label="birthday:">    
                <el-input disabled v-model="data.birthday"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="8">  
          <el-form-item label="city:">    
                <el-input disabled v-model="data.city"></el-input>
          </el-form-item>  
          <el-form-item label="colour:">    
                <el-input disabled v-model="data.colour"></el-input>
          </el-form-item>  
          <el-form-item label="country:">    
                <el-input disabled v-model="data.country"></el-input>
          </el-form-item>  
          <el-form-item label="customField:">    
                <el-input disabled v-model="data.customField"></el-input>
          </el-form-item>  
          <el-form-item label="dealId:">    
                <el-input disabled v-model="data.dealId"></el-input>
          </el-form-item>  
          <el-form-item label="dealTitle:">    
                <el-input disabled v-model="data.dealTitle"></el-input>
          </el-form-item>  
          <el-form-item label="email:">    
                <el-input disabled v-model="data.email"></el-input>
          </el-form-item>
          <el-form-item label="houseNumber:">    
                <el-input disabled v-model="data.houseNumber"></el-input>
          </el-form-item>  
          <el-form-item label="logistic:">    
                <el-input disabled v-model="data.logistic"></el-input>
          </el-form-item>  
          <el-form-item label="phone:">    
                <el-input disabled v-model="data.phone"></el-input>
          </el-form-item>  
          </el-col>  
          <el-col :span="8">  
          <el-form-item label="platformOrderId:">    
                <el-input disabled v-model="data.platformOrderId"></el-input>
          </el-form-item>  
          <el-form-item label="postcode:">    
                <el-input disabled v-model="data.postcode"></el-input>
          </el-form-item>  
          <el-form-item label="price:">    
                <el-input disabled v-model="data.price"></el-input>
          </el-form-item>  
          <el-form-item label="postcode:">    
                <el-input disabled v-model="data.postcode"></el-input>
          </el-form-item>  
          <el-form-item label="productOptoins:">    
                <el-input disabled v-model="data.productOptoins"></el-input>
          </el-form-item>  
          <el-form-item label="quantity:">    
                <el-input disabled v-model="data.quantity"></el-input>
          </el-form-item>  
          <el-form-item label="shippingMethod:">    
                <el-input disabled v-model="data.shippingMethod"></el-input>
          </el-form-item>  
          <el-form-item label="sku:">    
                <el-input disabled v-model="data.sku"></el-input>
          </el-form-item>  
          <el-form-item label="spec:">    
                <el-input disabled v-model="data.spec"></el-input>
          </el-form-item>
          </el-col>  
          </el-row>
      </el-form>  
    </div>       
 </div>  
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      data: {
        wowcherCode: "",
        redeemedAt: "",
        orderStatus: "",
        orderType: "",
        productName: "",
        customerName: "",
        shipoutTime: "",
        trackingNo: "",
        agent: "",
        birthday: "",
        city: "",
        colour: "",
        country: "",
        currency: "",
        customField: "",
        dealId: "",
        dealTitle: "",
        email: "",
        houseNumber: "",
        logistic: "",
        phone: "",
        platformOrderId: "",
        postcode: "",
        price: "",
        productOptoins: "",
        quantity: "",
        shippingMethod: "",
        sku: "",
        spec: ""
      }
    };
  },
  created() {
    let oldData = JSON.parse(this.$route.query.data);
    this.data = _.extend({},this.data,oldData);
  },
  methods: {
    goBack() {
      this.$router.push("/wocher");
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
  .w50 {
    width: 50%;
  }
  .w20 {
    width: 20%;
  }
  .p10 {
    padding: 10px !important;
  }
  hr {
    border: none;
    border-top: 1px solid #dfe4ec;
  }
  .imgcontainer {
    padding: 5px 5px 5px 5px;
    border: 1px dashed #dfe4ec;
    position: relative;
    text-align: center;
    height: 240px;
    & div {
      margin-top: 15px;
    }
    & div:after {
      content: "";
      display: block;
      clear: both;
    }
  }
  .icon {
    float: right;
    cursor: pointer;
  }
  .name {
    float: left;
    font-size: 14px;
  }
  .label {
    .el-form-item__label {
      width: 100%;
    }
  }
  .el-form-left {
    & div:nth-child(1) {
      float: left;
      margin-right: 10px;
    }
    .el-form-item__content {
      overflow: hidden;
    }
  }
}
</style>


