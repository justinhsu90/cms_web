<template>
  <div id="edit">
    <div style="padding:20px">
      <div class="heade">
        <i class="el-icon-arrow-left"></i>
        <a href="javascript:void(0)" @click="goBack">返回</a>
      </div>
      <br>
      <h2>
        <span>出貨清單內容</span>
      </h2>
      <br>
      <el-form ref="form" :model="data" v-loading="loading" label-position="top">
        <h3>基本資料</h3>
        <el-row :gutter="24">
          <el-col :span="3">
            <el-form-item label="貨代">
              <el-input v-model="data.agent"  ></el-input>
            </el-form-item>
          </el-col>
           
          <el-col :span="6">
            <el-form-item label="貨代單號">
              <el-input v-model="data.orderId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="訂單狀態">
              <el-input v-model="data.orderStatus"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="做單時間">
           <el-input v-model="data.orderTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">

          <el-col :span="3">
            <el-form-item label="平台">
              <el-input v-model="data.platform"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="平台單號">
              <el-input  v-model="data.platformOrderId"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <h3>出貨狀態</h3>
        <el-row :gutter="24">
          <el-col :span="4">
            <el-form-item label="發貨時間">
              <el-input v-model="data.shipoutTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="運費">
              <el-input v-model="data.shippingFee"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="運費幣別">
              <el-input  v-model="data.shippingFeeCurrency"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="3">
            <el-form-item label="出貨重量">
              <el-input  v-model="data.parcelWeight"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="3">
            <el-form-item label="出貨重量單位">
              <el-input  v-model="data.parcelWeightUnit"></el-input>
            </el-form-item>
          </el-col>
          </el-row>
        <h3>物流訊息</h3>
        <el-row :gutter="24">
          <el-col :span="4">
            <el-form-item label="物流單號">
              <el-input v-model="data.trackingNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="發貨方式">
              <el-input v-model="data.shippingMethod"></el-input>
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
      searchAgent: "",
      searchAgentOption: [],
      searchShippingMethod: "",
      searchShippingMethodOption: [],
      searchOrderstatus: "",
      searchOrderstatusOption: [],
      data: {
        agent: "",
        lastUpdatedTime: "",
        orderId: "",
        orderStatus: "",
        orderTime: "",
        platform: "",
        platformOrderId: "",
        productName: "",
        shipoutTime: "",
        parcelWeight: "",
        parcelWeightUnit: "",
        shippingFee: "",
        shippingFeeCurrency: "",
        shippingMethod: "",
        trackingNumber: ""
      }
    };
  },
  created() {
    let oldData = JSON.parse(this.$route.query.data);
    this.data = _.extend({}, this.data, oldData);
    let agent = axios({
      url: "/shippingagent/value/agent",
      method: "post",
      data: {
        token: this.token
      }
    });
    let shippingMethod = axios({
      url: "/shippingagent/value/shippingMethod",
      method: "post",
      data: {
        token: this.token
      }
    });
    let orderstatus = axios({
      url: "/shippingagent/value/orderStatus",
      method: "post",
      data: {
        token: this.token
      }
    });
    Promise.all([agent, shippingMethod, orderstatus]).then(
      ([agent, shippingMethod, orderstatus]) => {
        this.searchAgentOption = _.cloneDeep(agent);
        this.searchShippingMethodOption = _.cloneDeep(shippingMethod);
        this.searchOrderstatusOption = _.cloneDeep(orderstatus);
      }
    );
  },
  methods: {
    goBack() {
      this.$router.go("-1");
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
  h3 {
    position: relative;
  }
  .title-img {
    position: absolute;
    right: 15%;
    top: 10%;
    z-index: 999;
    width: 250px;
  }
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
