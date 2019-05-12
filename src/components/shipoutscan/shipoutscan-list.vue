<template>
  <div>
    <el-row>
      <el-col :span="22">
        <el-input
          class="w-max200"
          placeholder="搜索"
          v-model="fetchOption.where"
          @keyup.enter.native="handleSearch"
        >
        </el-input>
        <el-date-picker
          class="w-max220"
          clearable
          @change="handleChange"
          value-format="yyyy-MM-dd"
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="~"
          start-placeholder="開始日期"
          end-placeholder="結束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
        <div
          @click="handleSearch"
          class="el-input-group__append search"
        >
          <i class="el-icon-search"></i>
        </div>
      </el-col>
      <el-col class="mt5">
        <el-table
          ref="wonTable"
          :max-height="maxHeight"
          :data="tableData"
          v-loading="isTableLoading"
          @sort-change="handleSortChange"
        >
          <el-table-column
            width="200"
            label="貨代Order ID"
            prop="orderId"
            sortable="custom"
          ></el-table-column>
          <!-- <el-table-column
            min-width="100"
            label="掃描狀態"
            prop="scanStatus"
          ></el-table-column> -->
          <el-table-column
            width="200"
            label="物流單號"
            prop="trackingNumber"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            min-width="200"
            label="掃描日期"
            prop="scannedDate"
            sortable="custom"
          ></el-table-column>

        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
export default {
  extends: wonTableContainer,
  data() {
    return {
      date: [],
      showImg: true,
      condition: [],
      isTableLoading: false,
      fetchCondition: {
        order: ""
      },
      fetchOption: {
        url: "/erp/shipoutscan/search",
        method: "post",
        where: ""
      }
    };
  },
  created() {
    this.handleSearch();
    this.Bus.$on("refresh", this.handleSearch);
  },
  methods: {
    handleSortChange(row) {
      if (row.order == "ascending") {
        this.tableData = _.orderBy(this.tableData, [`${row.prop}`], ["asc"]);
      }
      if (row.order == "descending") {
        this.tableData = _.orderBy(this.tableData, [`${row.prop}`], ["desc"]);
      }
    },
    handleChange() {
      this.handleSearch();
    },
    handleSearch: _.debounce(function() {
      this.isTableLoading = true;
      let data = {
        where: this.fetchOption.where,
        token: this.token,
        skip: this.fetchCondition.skip,
        limit: this.fetchCondition.limit
        // order: this.fetchCondition.order
      };
      if (!_.isEmpty(this.date)) {
        data.startDate = this.date[0];
        data.endDate = this.date[1];
      }
      this.fetchTableData(data);
    }, 2000)
  }
};
</script>
<style lang="scss" scoped>
// /deep/ .el-table {
//   width: 600px !important;
// }
</style>
