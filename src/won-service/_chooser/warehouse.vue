<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="fr ml10">
          <el-button
            @click="$emit('select', tableData)"
            type="primary"
            size="small"
          >確認</el-button>
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
            min-width="170"
            label="倉庫名稱"
            prop="warehouseName"
            align="center"
          ></el-table-column>
          <el-table-column
            width="120"
            label="可售"
            prop="showSellable"
            align="center"
          >
            <template slot-scope="{row}">
              <el-checkbox
                :disabled="row.disabled"
                v-model="row.showSellable"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            width="120"
            label="不可售"
            prop="showUnsellable"
            align="center"
          >
            <template slot-scope="{row}">
              <el-checkbox
                :disabled="row.disabled"
                v-model="row.showUnsellable"
              ></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
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
    return {
      selection: [],
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
    this.$nextTick(() => {
      this.selection = _.cloneDeep(this.select);
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
      let data = [];
      _.each(this.originRes, item => {
        let isShowConstraint = ["GZ", "GZ-SHIPMENT-NEED", "GZ-TRANSIT"];
        if (isShowConstraint.includes(item.warehouseCode)) {
          this.$set(item, "showUnsellable", false);
          this.$set(item, "showSellable", true);
          this.$set(item, "disabled", false);
        } else {
          this.$set(item, "showUnsellable", false);
          this.$set(item, "showSellable", false);
          this.$set(item, "disabled", false);
        }

        data.push(item);
      });
      this.tableData = _.cloneDeep(data);
    }
  }
};
</script>
