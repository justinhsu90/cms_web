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
            min-width="150"
            label="SKU"
            prop="sku"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="150"
            label="數量"
            prop="quantity"
            sortable="custom"
          ></el-table-column>
        </el-table>
      </el-col>
      <el-col>
        <won-pagination
          v-bind="paginationProps"
          v-on="paginationListeners"
        >
        </won-pagination>
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
      condition: [],
      fetchOption: {
        url: "/wowcher/sales/report/sku/search",
        method: "post",
        where: ""
      }
    };
  },
  methods: {
    handleChange() {
      this.handleSearch();
    },
    handleSearch: _.debounce(function() {
      this.isTableLoading = true;
      let data = {
        where: this.fetchOption.where,
        token: this.token,
        skip: this.fetchCondition.skip,
        limit: this.fetchCondition.limit,
        order: this.fetchCondition.order
      };
      if (!_.isEmpty(this.date)) {
        data.startDate = this.date[0];
        data.endDate = this.date[1];
      }
      this.fetchTableData(data);
    }, 500)
  }
};
</script>
