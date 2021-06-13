<template>
  <div>
    <h2>
      批量作業
    </h2>
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      class="pl15 pt15"
    >
      <el-row>
        <el-col>
          <!-- orderType: "已取消 (Wowcher確認)"
          orderTypeCode: "CANCELLED"
          orderTypeMsg: "Wowcher確認的退貨退款" -->
          <el-form-item
            label="取消類型："
            prop="cancelType"
          >
            <!-- orderType: "已取消 (Wowcher確認)"
        orderTypeCode: "CANCELLED"
        orderTypeMsg -->
            <el-select v-model="form.cancelType">
              <el-option
                v-for="(item, value) in cancelTypeList"
                :key="value"
                :label="item.orderTypeCode"
                :value="item.orderTypeCode"
                style="width: 425px"
              >
                <span style="float: left">{{ item.orderType }}</span>
                <span style="float: right; color: #8492a6; font-size: 12px;">{{ item.orderTypeMsg }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item
            label="取消原因："
            prop="cancelReason"
          >
            <el-select v-model="form.cancelReason">
              <el-option
                v-for="(item,value) in cancelReasonList"
                :key="value"
                :label="item.orderCancelledReasonName"
                :value="item.orderCancelledReasonNameCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item
            label="單號："
            prop="orderIdList"
          >
            <template slot="label">
              <span>
                單號：
              </span>
              <span class="label-tips">
                只接受OrderId. 每個單號需用(換行, 逗號) 其中一個分開
              </span>
            </template>
            <el-input
              rows="6"
              type="textarea"
              v-model="form.orderIdList"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button
          @click="submit"
          :loading="btnLoading"
          type="success"
          size="small"
        >
          發送
        </el-button>
      </el-form-item>
    </el-form>
    <el-row v-if="tableData.length > 0">
      <el-col :span="14">
        <el-table :data="tableData">
          <el-table-column
            min-width="230"
            label="voucher Code"
            prop="voucherCode"
            align="center"
          ></el-table-column>
          <el-table-column
            width="230"
            label="Cancel Type"
            prop="cancelType"
            align="center"
          ></el-table-column>
          <el-table-column
            width="230"
            label="Cancel Reason"
            prop="cancelReason"
            align="center"
          ></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnLoading: false,
      searchAccountOption: ["4PX", "Yun Express", "HuaHan", "Winit", "SFC"],
      cancelTypeList: [],
      cancelReasonList: [],
      tableData: [
        // {
        //   voucherCode: "11",
        //   cancelType: "11",
        //   cancelReason: "11"
        // }
      ],
      form: {
        cancelType: "",
        cancelReason: "",
        orderIdList: ""
      }
    };
  },
  created() {
    axios({
      url: "wowcher/value/orderType",
      method: "post",
      data: {}
    }).then(res => {
      this.cancelTypeList = res || [];
    });

    axios({
      url: "order/value/cancelType",
      method: "post",
      data: {}
    }).then(res => {
      this.cancelReasonList = res.data || [];
    });
    this.rules = {
      orderIdList: {
        required: true,
        message: "此項必填"
      },
      cancelType: {
        required: true,
        message: "此項必填"
      },
      cancelReason: {
        required: true,
        message: "此項必填"
      }
    };
  },
  methods: {
    getValue() {
      return {
        ...this.form
      };
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          axios({
            url: "/order/setcancelreason",
            method: "post",
            data: this.getValue()
          })
            .then(
              () => {
                this.$message.success("提交成功");
              },
              () => {
                this.$message.error("提交失败");
              }
            )
            .finally(() => {
              this.btnLoading = false;
            });
        }
      });
    }
  }
};
</script>

<style>
</style>
