<template>
  <div id="edit">
    <div style="padding:20px">
      <div class="heade">
        <i class="el-icon-arrow-left"></i>
        <a href="javascript:void(0)" @click="goBack">返回</a>
      </div>
      <br>
      <h2>Wowcher 訂單內容</h2>
      <br>
      <el-form ref="form" :model="data" v-loading="loading" label-position="top">
        <el-row :gutter="24">
          <h3>基本資料</h3>
          <el-col :span="5">
            <el-form-item label="所屬帳號">
              <el-input disabled v-model="data.account"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="Wowcher Code">
              <el-input disabled v-model="data.wowcherCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="下單時間">
              <el-input disabled v-model="data.redeemedAt"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="Deal ID:">
              <el-input disabled v-model="data.dealId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="Product ID:">
              <el-input disabled v-model="data.productId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>訂單狀態</h3>
        <el-row :gutter="24">
          <el-col :span="4">
            <el-form-item label="出貨狀態">
              <el-input disabled v-model="data.orderStatus"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="訂單狀態">
              <el-select  :value="data.orderType" @input="handleChange">
                <el-option v-for="(v,i) in searchStatusOption" :label="v.orderType" :value="v.orderType" :key="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <h3>出貨狀態</h3>
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="發貨時間">
              <el-input disabled v-model="data.shipoutTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="物流單號">
              <el-input disabled v-model="data.trackingNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="發貨方式">
              <el-input disabled v-model="data.shippingMethod"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="貨代">
              <el-input  disabled v-model="data.agent"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="貨代平台單號">
              <el-input disabled v-model="data.platformOrderId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <h3>產品內容</h3>
          <el-col :span="10">
            <el-form-item label="產品名稱">
              <el-input disabled v-model="data.productName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="顏色">
              <el-input disabled v-model="data.colour"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="尺寸">
              <el-input disabled v-model="data.size"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Product Options">
              <el-input disabled v-model="data.productOptions"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <h3>客戶資料</h3>
          <el-col :span="6">
            <el-form-item label="客戶名稱">
              <el-input disabled v-model="data.customerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地址1">
              <el-input disabled v-model="data.addressLine1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地址2">
              <el-input disabled v-model="data.addressLine2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="城市">
              <el-input disabled v-model="data.city"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="省/州">
              <el-input  disabled v-model="data.county"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="郵編:">
              <el-input disabled v-model="data.postcode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="國家">
              <el-input disabled v-model="data.country"></el-input>
            </el-form-item>
          </el-col>
          <!-- </el-row>
          <el-row :gutter="24"> -->
          <el-col :span="4">
            <el-form-item label="電話:">
              <el-input disabled v-model="data.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Email:">
              <el-input disabled v-model="data.email"></el-input>
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
        axios({
            url: "wowcher/value/orderType",
            method: "post",
            data: {
                token: this.token
            }
        }).then(res => {
            this.searchStatusOption = _.cloneDeep(res);
        });
    },
    methods: {
        goBack() {
            this.$router.push("/wowcherOrderList");
        },
        handleChange(v) {
          let that= this;
            this.$confirm("是否修改订单状态", "提示", {
                type: "info",
                beforeClose(action,instantce, done) {
                    if (action == "confirm") {
                       that.data.orderType = v;
                       axios({
                         url:'/wowcher/update',
                         method:'post',
                         data:{
                           token:this.token,
                           wowchercode:that.data.wowcherCode,
                           orderType:v
                         }
                       })
                        done();
                    } else {
                        done();
                    }
                }
            })
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


