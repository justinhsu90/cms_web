<template>
  <div v-loading="isTableLoading">
    <el-row>
      <el-col :span="22">
        <el-input
          class="w-max200"
          placeholder="搜索"
          v-model="fetchOption.where"
          @keyup.enter.native="handleSearch"
        >
        </el-input>
        <div
          @click="handleClick"
          class="el-input-group__append search"
        >
          <i class="el-icon-search"></i>
        </div>
      </el-col>
    </el-row>
    <el-form
      :mode="form"
      label-width="100px"
      class="mt5"
    >
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="物流單號：">
            <el-input
              v-model="form.trackingNumber"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="貨代單號：">
            <el-input
              v-model="form.orderId"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="平台單號：">
            <el-input
              v-model="form.platformOrderId"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="運輸狀態：">
            <el-input
              v-model="form.shipmentStatus"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="目的國：">
            <el-input
              v-model="form.country"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="貨代：">
            <el-input
              v-model="form.agent"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="發貨方式：">
            <el-input
              v-model="form.shippingMethod"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-card class="mt5">
      <h4>廣州倉庫處理狀態</h4>
      <br>
      <el-table
        :max-height="maxHeight"
        :data="warehouseStatusList"
        v-loading="isTableLoading"
      >
        <el-table-column
          min-width="30"
          label="流水號"
          prop="index"
        ></el-table-column>
        <el-table-column
          min-width="80"
          label="時間"
          prop="time"
          :formatter="formatToTime"
        >
        </el-table-column>
        <el-table-column
          min-width="80"
          label="地點"
          prop="location"
        ></el-table-column>
        <el-table-column
          min-width="100"
          label="物流狀態"
          prop="trackingStatus"
        ></el-table-column>
        <el-table-column
          min-width="160"
          label="內容"
          prop="message"
        ></el-table-column>

      </el-table>
    </el-card>
    <el-card class="mt5">
      <h4>貨代物流訊息</h4>
      <br>
      <el-table
        :max-height="maxHeight"
        :data="trackingStatusList"
      >
        <el-table-column
          min-width="40"
          label="流水號"
          prop="index"
        ></el-table-column>
        <el-table-column
          min-width="80"
          label="時間"
          prop="time"
          :formatter="formatToTime"
        ></el-table-column>
        <el-table-column
          min-width="80"
          label="地點"
          prop="location"
        ></el-table-column>
        <el-table-column
          min-width="100"
          label="物流狀態"
          prop="trackingStatus"
        ></el-table-column>
        <el-table-column
          min-width="160"
          label="內容"
          prop="message"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
export default {
  extends: wonTableContainer,
  data() {
    return {
      date: [],
      fetchCondition: {
        skip: 0,
        limit: 10000
      },
      isTableLoading: false,
      fetchOption: {
        url: "/shipment/tracking",
        method: "post",
        where: ""
      },
      trackingStatusList: [],
      warehouseStatusList: [],
      form: {}
    };
  },
  methods: {
    fetchEnd() {
      this.form = _.cloneDeep(this.originRes);
      this.trackingStatusList = this.originRes.trackingStatusList;
      this.warehouseStatusList = this.originRes.warehouseStatusList;
    },
    handleClick() {
      this.isTableLoading = true;
      let data = {
        where: this.fetchOption.where,
        token: this.token,
        skip: this.fetchCondition.skip,
        limit: this.fetchCondition.limit,
        order: this.fetchCondition.order
      };
      this.fetchTableData(data);
    },
    handleSearch: _.debounce(function() {
      if (!this.hasInt) {
        this.hasInt = true;
        return;
      }
      this.isTableLoading = true;
      let data = {
        where: this.fetchOption.where,
        token: this.token,
        skip: this.fetchCondition.skip,
        limit: this.fetchCondition.limit,
        order: this.fetchCondition.order
      };
      this.fetchTableData(data);
    }, 500)
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-form-item {
  margin-bottom: 4px;
}
</style>
