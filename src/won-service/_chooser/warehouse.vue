<template>
  <div>
    <el-row>
      <el-col :span="24">
          <el-input
            class="ibbox w-max200"
            placeholder="搜索"
            v-model="fetchOption.where"
            @keyup.enter.native="handleSearch"
          >
          </el-input>
          <div
            @click="handleSearch"
            class="el-input-group__append search"
          >
            <i class="el-icon-search"></i>
          </div>
        <div class="fr ml10">
          <el-button @click="$emit('select', selection)" type="primary" size="small" :disabled="!selection.length">確認</el-button>
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
          <el-table-column type="selection" width="55" reserve-selection>
          </el-table-column>
          <el-table-column
            min-width="170"
            label="倉庫名稱"
            prop="warehouseName"
            align="center"
          ></el-table-column>
        </el-table>
      </el-col>
      <!-- <won-pagination
        v-bind="paginationProps"
        v-on="paginationListeners"
      >
      </won-pagination> -->
    </el-row>
  </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
import _ from "lodash";
export default {
  extends: wonTableContainer,
  props: ["select"],
  data() {
    let selection = _.cloneDeep(this.select);
    return {
      selection,
      fetchCondition: {
        skip: 0,
        limit: 20
      },
      fetchOption: {
        url: "erp/value/warehouse",
        method: "post",
        where: ""
      }
    };
  },
  mounted() {
    this.$refs["wonTable"].$watch("store.states.selection", v => {
      this.selection = v;
    });
  },
  methods: {
    handleSearch: _.debounce(function() {
      this.isTableLoading = true;
      let data = {
        where: this.fetchOption.where,
        token: this.token,
        skip: this.fetchCondition.skip,
        limit: this.fetchCondition.limit
      };
      this.fetchTableData(data);
    }, 2000),
    fetchEnd() {
      this.tableData = _.cloneDeep(this.originRes);
    }
  }
};
</script>
