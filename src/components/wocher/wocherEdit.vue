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
                <span>{{data.wowcherCode}}</span>
          </el-form-item>
          <el-form-item label="redeemedAt:">    
                <span>{{data.redeemedAt}}</span>
          </el-form-item>
          <el-form-item label="orderStatus:">    
                <span>{{data.orderStatus}}</span>
          </el-form-item>
          <el-form-item label="orderType:">    
                <span>{{data.orderType}}</span>
          </el-form-item>
          <el-form-item label="productName:">    
                <span>{{data.productName}}</span>
          </el-form-item>
          <el-form-item label="customerName:">    
                <span>{{data.customerName}}</span>
          </el-form-item>
          <el-form-item label="shipoutTime:">    
                <span>{{data.shipoutTime}}</span>
          </el-form-item>  
          <el-form-item label="trackingNo:">    
                <span>{{data.trackingNo}}</span>
          </el-form-item>
          <el-form-item label="agent:">    
                <span>{{data.agent}}</span>
          </el-form-item>  
          <el-form-item label="birthday:">    
                <span>{{data.birthday}}</span>
          </el-form-item>
          </el-col>
          <el-col :span="8">  
          <el-form-item label="city:">    
                <span>{{data.city}}</span>
          </el-form-item>  
          <el-form-item label="colour:">    
                <span>{{data.colour}}</span>
          </el-form-item>  
          <el-form-item label="country:">    
                <span>{{data.country}}</span>
          </el-form-item>  
          <el-form-item label="customField:">    
                <span>{{data.customField}}</span>
          </el-form-item>  
          <el-form-item label="dealId:">    
                <span>{{data.dealId}}</span>
          </el-form-item>  
          <el-form-item label="dealTitle:">    
                <span>{{data.dealTitle}}</span>
          </el-form-item>  
          <el-form-item label="email:">    
                <span>{{data.email}}</span>
          </el-form-item>
          <el-form-item label="houseNumber:">    
                <span>{{data.houseNumber}}</span>
          </el-form-item>  
          <el-form-item label="logistic:">    
                <span>{{data.logistic}}</span>
          </el-form-item>  
          <el-form-item label="phone:">    
                <span>{{data.phone}}</span>
          </el-form-item>  
          </el-col>  
          <el-col :span="8">  
          <el-form-item label="platformOrderId:">    
                <span>{{data.platformOrderId}}</span>
          </el-form-item>  
          <el-form-item label="postcode:">    
                <span>{{data.postcode}}</span>
          </el-form-item>  
          <el-form-item label="price:">    
                <span>{{data.price}}</span>
          </el-form-item>  
          <el-form-item label="postcode:">    
                <span>{{data.postcode}}</span>
          </el-form-item>  
          <el-form-item label="productOptoins:">    
                <span>{{data.productOptoins}}</span>
          </el-form-item>  
          <el-form-item label="quantity:">    
                <span>{{data.quantity}}</span>
          </el-form-item>  
          <el-form-item label="shippingMethod:">    
                <span>{{data.shippingMethod}}</span>
          </el-form-item>  
          <el-form-item label="sku:">    
                <span>{{data.sku}}</span>
          </el-form-item>  
          <el-form-item label="spec:">    
                <span>{{data.spec}}</span>
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


