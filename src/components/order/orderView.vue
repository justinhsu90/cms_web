<template>
  <div id="edit">
    <div style="padding:20px">
      <div class="heade">
        <i class="el-icon-arrow-left"></i>
        <a href="javascript:void(0)" @click="goBack">返回</a>
      </div>
      <br>
      <h2><span>訂單內容</span>
      </h2>
      <br>
      <el-form ref="form" :model="data" v-loading="loading" label-position="top">
        <h3>基本資料</h3>
        <el-row :gutter="24">
          <el-col :span="5">
            <el-form-item label="所屬帳號">
              <el-input v-model="data.account"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="訂單號">
              <el-input v-model="data.wowcherCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="下單時間">
              <el-input v-model="data.redeemedAt"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="Deal ID:">
              <el-input v-model="data.dealId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="Product ID:">
              <el-input v-model="data.productId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>訂單狀態</h3>
        <el-row :gutter="24">
          <el-col :span="4">
            <el-form-item label="出貨狀態">
              <el-input v-model="data.orderStatus"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="訂單處理方式">
              <el-select  :value="data.orderTypeCode" @input="handleChange" clearable>
                <el-option v-for="(v,i) in searchStatusOption" :label="v.orderType" :value="v.orderTypeCode" :key="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="取消原因">
              <el-select  clearable :value="data.orderCancelledReasonNameCode"  @input="handleChangeOrder">
                <el-option v-for="(v,i) in searchOrderCancell" :label="v.orderCancelledReasonName" :value="v.orderCancelledReasonNameCode" :key="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>出貨狀態</h3>
        <el-row :gutter="24">
          <el-col :span="5">
            <el-form-item label="廣州倉發貨時間">
              <el-input v-model="data.gzWarehouseShipoutTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="貨代發貨時間">
              <el-input v-model="data.shipoutTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="物流單號">
              <el-input v-model="data.trackingNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="貨代平台單號">
              <el-input v-model="data.platformOrderId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="發貨方式">
              <el-input v-model="data.shippingMethod"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="貨代">
              <el-input v-model="data.agent"></el-input>
            </el-form-item>
          </el-col>

           <el-col :span="5">
            <el-form-item label="出貨重量">
              <el-input v-model="data.parcelWeight"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="5">
            <el-form-item label="運費 (RMB)">
              <el-input v-model="data.shippingCost"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <h3>
            <span>產品內容</span>
            <img class="title-img" :src="data.snapShotUrl" alt="">
          </h3>

           <el-col :span="13">
            <el-form-item label="產品名稱">
              <el-input v-model="data.productName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row :gutter="24">
           <el-col :span="5">
            <el-form-item label="SKU">
              <el-input v-model="data.sku"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="4">
            <el-form-item label="顏色">
              <el-input v-model="data.colour"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="4">
            <el-form-item label="尺寸">
              <el-input v-model="data.size"></el-input>
            </el-form-item>
          </el-col>
          </el-row>
          <el-row :gutter="24">
          <el-col :span="13">
            <el-form-item label="Product Options">
              <el-input v-model="data.productOptions"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <h3>客戶資料</h3>
          <el-col :span="6">
            <el-form-item label="客戶名稱">
              <el-input v-model="data.customerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地址1">
              <el-input v-model="data.addressLine1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地址2">
              <el-input v-model="data.addressLine2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="城市">
              <el-input v-model="data.city"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="省/州">
              <el-input v-model="data.county"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="郵編:">
              <el-input v-model="data.postcode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="國家">
              <el-input v-model="data.country"></el-input>
            </el-form-item>
          </el-col>
          <!-- </el-row>
          <el-row :gutter="24"> -->
          <el-col :span="4">
            <el-form-item label="電話:">
              <el-input v-model="data.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Email:">
              <el-input v-model="data.email"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
          <el-form-item label="productOptoins:">
                <el-input disabled v-model="data.productOptoins"></el-input>
          </el-form-item>
          </el-col> -->
          <!-- <el-col :span="8">
          <el-form-item label="spec:">
                <el-input disabled v-model="data.spec"></el-input>
          </el-form-item>
          </el-col>   -->
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
      searchStatusOption: [],
      searchOrderCancell: [],
      data: {
        orderCancelledReasonNameCode: "",
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
        size: "",
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
    this.data = _.extend({}, this.data, oldData);
    this.data.orderType = oldData.orderTypeCode;
    axios({
      url: "wowcher/value/orderType",
      method: "post",
      data: {
        token: this.token
      }
    }).then(res => {
      this.searchStatusOption = _.cloneDeep(res);
    });
    axios({
      url: "/order/value/cancelType",
      method: "post",
      data: {
        token: this.token
      }
    }).then(res => {
      if (!res.data) {
        return;
      }
      this.searchOrderCancell = _.cloneDeep(res.data);
    });
  },
  methods: {
    goBack() {
      this.$router.push("/orderList");
      this.Bus.$emit("refresh");
    },
    handleChangeOrder(v) {
      let that = this;
      if (!v) {
        this.$confirm(
          `確定要 <strong style="color:red">取消</strong> ？`,
          "提示",
          {
            dangerouslyUseHTMLString: true,
            type: "info",
            beforeClose(action, instantce, done) {
              if (action == "confirm") {
                axios({
                  url: "/wowcher/update/orderType",
                  method: "post",
                  data: {
                    token: that.token,
                    wowchercode: that.data.wowcherCode,
                    cancelType: ""
                  }
                }).then(() => {
                  this.$message.success("修改成功");
                  that.data.orderCancelledReasonNameCode = "";
                });
                done();
              } else {
                done();
              }
            }
          }
        )
          .then(() => {})
          .catch(() => {});
        return;
      }
      let obj = _.find(this.searchOrderCancell, item => {
        return item.orderCancelledReasonNameCode == v;
      });
      this.$confirm(
        `確定要設定取消原因為 <strong style="color:red">${
          obj.orderCancelledReasonName
        }</strong> ？`,
        "提示",
        {
          dangerouslyUseHTMLString: true,
          type: "info",
          beforeClose(action, instantce, done) {
            if (action == "confirm") {
              axios({
                url: "order/cancelReason",
                method: "post",
                data: {
                  token: that.token,
                  cancelType: v,
                  orderId: that.data.wowcherCode
                }
              }).then(() => {
                this.$message.success("修改成功");
                that.data.orderCancelledReasonNameCode = v;
              });
              done();
            } else {
              done();
            }
          }
        }
      ).catch();
    },
    handleChange(v) {
      let that = this;
      if (!v) {
        this.$confirm(
          `確定要 <strong style="color:red">取消</strong> ？`,
          "提示",
          {
            dangerouslyUseHTMLString: true,
            type: "info",
            beforeClose(action, instantce, done) {
              if (action == "confirm") {
                axios({
                  url: "/wowcher/update/orderType",
                  method: "post",
                  data: {
                    token: that.token,
                    wowchercode: that.data.wowcherCode,
                    orderTypeCode: ""
                  }
                }).then(() => {
                  this.$message.success("修改成功");
                  that.data.orderTypeCode = "";
                });
                done();
              } else {
                done();
              }
            }
          }
        )
          .then(() => {})
          .catch(() => {});
        return;
      }
      let obj = _.find(this.searchStatusOption, item => {
        return item.orderTypeCode == v;
      });

      this.$confirm(
        `確定要設定處理方式為 <strong style="color:red">${
          obj.orderType
        }</strong> ？`,
        "提示",
        {
          dangerouslyUseHTMLString: true,
          type: "info",
          beforeClose(action, instantce, done) {
            if (action == "confirm") {
              axios({
                url: "/wowcher/update/orderType",
                method: "post",
                data: {
                  token: that.token,
                  wowchercode: that.data.wowcherCode,
                  orderTypeCode: v
                }
              }).then(() => {
                this.$message.success("修改成功");
                that.data.orderTypeCode = v;
              });
              done();
            } else {
              done();
            }
          }
        }
      )
        .then(() => {})
        .catch(() => {});
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
