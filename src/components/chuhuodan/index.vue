<template>
  <el-row>
    <el-col :span="12">
      <el-form
        ref="form"
        :model="form"
        :rules="formRules"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="平台订单ID："
              prop="platformorderid"
            >
              <el-input v-model="form.platformorderid"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="貨代："
              prop="agent"
            >
              <el-input v-model="form.agent"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="訂單ID："
              prop="orderId"
            >
              <el-input v-model="form.orderId"></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :span="12"
            style="position:relative"
          >
            <el-form-item
              label="物流單號："
              prop="trackingNumber"
            >
              <el-input v-model="form.trackingNumber"></el-input>
            </el-form-item>
            <el-button
              type="success"
              size="small"
              @click="this.handleProductInfo"
              :loading="productLoading"
              style="position:absolute;right:-100px;top:40px"
            >抓取产品</el-button>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="做單時間："
              prop="dateOne"
            >
              <el-date-picker
                clearable
                style="width:100%"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="form.dateOne"
                type="datetime"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="發貨時間："
              prop="dateTwo"
            >
              <el-date-picker
                clearable
                style="width:100%"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="form.dateTwo"
                type="datetime"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="運費金額："
              prop="money"
            >
              <el-input v-model="form.money"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="幣別："
              prop="type"
            >
              <el-input v-model="form.type"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button
          @click="submit"
          :loading="loading"
          type="primary"
          size="large"
        >提交</el-button>
      </el-form>
    </el-col>
  </el-row>
</template>
<script> 

export default {
  data() {
    return {
      loading: false,
      form: {
        platformorderid: "",
        orderId: "",
        trackingNumber: "",
        agent: "",
        dateOne: "",
        dateTwo: "",
        money: "",
        type: "", 
      },
      productLoading: false,
      formRules: {
        platformorderid: {
          required: true,
          message: '此項必填' 
        },
        agent: { 
          required: true,
          message: '此項必填' 
        },
        dateOne: { 
          required: true,
          message: '此項必填' 
        }
      }
    };
  },
  methods: {
    handleProductInfo(){
      let {
        trackingNumber,
        orderId,
        agent
      } = this.form
      if(!agent){
        this.$message.warning('请填写貨代')
        return
      }

      if(!orderId && !trackingNumber){
        this.$message.warning('请填写订单ID,或者物流单号')
        return
      }
      this.productLoading = true
        axios({
        url: '/shipment/value/orderInfo',
        method: 'post',
        data: {
          agent: this.form.agent,
          trackingNumber: this.form.trackingNumber,
          orderId: this.form.orderId
        }
        }).then((res) => {
          console.log(res, 22);
          let {
            agent,
            currency,
            orderId,
            orderStatus,
            orderTime,
            platformOrderId,
            shipoutTime,
            shippingFee,
            shippingMethod,
            trackingNumber
          } = res
          this.form.platformorderid = platformOrderId || ''
          this.form.orderId = orderId || ''
          this.form.agent = agent || ''
          this.form.dateOne = orderTime || ''
          this.form.dateTwo = shipoutTime || ''
          this.form.type = currency || ''
          this.form.money = shippingFee  || ''
        }).finally(() => {
          this.productLoading = false
        })
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          axios({
            url: "/shipment/value/orderInfo", 
            method: "post",
            data: {
               value: JSON.stringify({
                platformOrderId: this.form.platformorderid,
                orderId: this.form.orderId,
                agent: this.form.agent,
                orderTime: this.form.dateOne,
                shipoutTime: this.form.dateTwo,
                currency: this.form.type,
                shippingFee: this.form.money
               })
            }
          })
            .then(res => {
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
