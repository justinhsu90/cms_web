<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-input class="ibbox w-max200" placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch">
                </el-input>
                <el-date-picker class="w-max180" clearable  @change="handleCondition('date')" value-format="yyyy-MM-dd" v-model="date" type="daterange" align="right" unlink-panels range-separator="~" start-placeholder="開始日期" end-placeholder="結束日期" :picker-options="pickerOptions">
                </el-date-picker>
                <div @click="handleSearch" class="el-input-group__append search">
                    <i class="el-icon-search"></i>
                </div>
                <!-- <el-button class="fr" @click="handleAdd" type="primary">新增異動</el-button> -->
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                  <el-table-column width="70" label="ID" prop="id"></el-table-column>
                  <el-table-column min-width="70" max-width="100" label="Sku" prop="sku"></el-table-column>
                    <el-table-column width="70" label="添加人" prop="addedBy"></el-table-column>
                    <el-table-column width="60" label="數量" prop="quantity"></el-table-column>
                    <el-table-column width="190" label="時間" prop="takeTime" :formatter="formatToDate"></el-table-column>
                </el-table>
            </el-col>
            <won-pagination v-bind="paginationProps" v-on="paginationListeners">
            </won-pagination>
        </el-row>
    </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
export default {
  extends: wonTableContainer,
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      date: [],
      condition: [],
      isTableLoading: false,
      warehouse: "",
      warehouseOption: [],
      inventoryType: "",
      inventoryTypeOption: [],
      fetchCondition: {
        skip: 0,
        limit: 15
      },
      fetchOption: {
        url: "erp/inventoryTakeStock/search",
        method: "post",
        where: ""
      }
    };
  },
  created() {
    this.Bus.$on("refresh", this.handleSearch);
  },
  methods: {
    handleCondition(sign) {
      if (sign == "date") {
        if (_.isEmpty(this.date)) {
          _.pull(this.condition, "3");
        } else {
          if (!this.condition.includes("3")) {
            this.condition.push("3");
          }
        }
      }
      this.handleSearch();
    },
    handleSearch: _.debounce(function() {
      this.isTableLoading = true;
      let data = {
        where: this.fetchOption.where,
        token: this.token,
        skip: this.fetchCondition.skip,
        limit: this.fetchCondition.limit
      };
      if (this.condition.includes("3")) {
        data.startDate = this.date[0];
        data.endDate = this.date[1];
      }
      this.fetchTableData(data);
    }, 500),
    handleAdd() {
      this.$router.push("/inventoryAdd");
    },
    handleEdit(row) {
      this.$router.push({
        name: "inventoryEdit",
        query: {
          value: JSON.stringify(row)
        }
      });
    }
  }
};
</script>
