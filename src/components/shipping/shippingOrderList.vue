<template>
  <div>
    <el-row>
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
      >
        <el-form-item label="還原訂單">
          <el-switch v-model="form.resetOrderToEmpty"></el-switch>
        </el-form-item>
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
        <el-form-item>
          <el-button
            @click="handleBtnDelete"
            :loading="btnLoading"
            type="success"
            size="small"
          >
            發送
          </el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <!-- 流水號, agent, orderId, trackingNumber, deleteSuccess, (resetEmpty) -->
    <!-- agent: "Yun Express"
    deleteSuccess: true
    orderId: "234243242342"
    oversea: false
    platformOrderId: "WOWMT2304928430"
    resetEmpty: true
    trackingNumber: "TR2382034223GB"
    voucherCode: ["GEDOSE-308SCF"]
    0: "GEDOSE-308SCF" -->
    <!-- 流水號, agent, orderId, trackingNumber, deleteSuccess, (resetEmpty) -->
    <el-row v-if="!!tableData.length">
      <el-table :data="tableData">
        <el-table-column
          width="100"
          label="流水號"
          prop="orderId"
          align="center"
        >
          <template slot-scope="scope">
            {{++scope.$index}}
          </template>
        </el-table-column>
        <el-table-column
          min-width="100"
          label="貨代"
          prop="agent"
          :formatter="formatEmptyText"
        >
        </el-table-column>
        <el-table-column
          min-width="100"
          label="订单ID"
          prop="orderId"
          :formatter="formatEmptyText"
        >
        </el-table-column>
        <el-table-column
          min-width="100"
          label="物流單號"
          prop="trackingNumber"
          :formatter="formatEmptyText"
        >
        </el-table-column>
        <el-table-column
          width="120"
          label="是否删除成功"
          prop="deleteSuccess"
        >
          <template slot-scope="{ row }">
            <el-tag
              v-if="row.deleteSuccess"
              type="success"
            >成功</el-tag>
            <el-tag
              v-else
              type="warning"
            >失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="是否重置为空"
          prop="resetEmpty"
        >
          <template slot-scope="{ row }">
            <el-tag
              v-if="row.resetEmpty"
              type="success"
            >是</el-tag>
            <el-tag
              v-else
              type="warning"
            >否</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
export default {
  extends: wonTableContainer,
  data() {
    return {
      tableData: [],
      form: {
        orderIdList: "",
        resetOrderToEmpty: false
      },
      btnLoading: false
    };
  },
  created() {
    this.rules = {
      orderIdList: {
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
    handleBtnDelete() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          this.tableData = [];
          axios({
            url: "/order/shipment/reset",
            method: "post",
            data: this.getValue()
          })
            .then(
              res => {
                this.tableData = res;
              },
              () => {
                this.$message.error("請求失败");
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

<style scoped lang="scss">
/deep/ .el-table th {
  color: #62717e;
  background: rgb(237, 241, 245);
  text-align: center;
}
</style>
