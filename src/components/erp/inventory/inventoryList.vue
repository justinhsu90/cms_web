<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-input class="ibbox w-max200" placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch">
                </el-input>
                <el-select class="w-max150" placeholder="類型" v-model="inventoryType" @change="handleCondition('type')" clearable>
                    <el-option v-for="(v,i) in inventoryTypeOption" :key="i" :label="v.inventoryTypeName" :value="v.inventoryType"></el-option>
                </el-select>
                <el-select class="w-max150" placeholder="商品" v-model="warehouse" @change="handleCondition('warehouse')" clearable>
                    <el-option v-for="(v,i) in warehouseOption" :key="'merge'+i" :label="v.inventoryTypeName" :value="v.inventoryType"></el-option>
                </el-select>
                <el-date-picker class="w-max180" clearable  @change="handleCondition('date')" value-format="yyyy-MM-dd" v-model="date" type="daterange" align="right" unlink-panels range-separator="~" start-placeholder="開始日期" end-placeholder="結束日期" :picker-options="pickerOptions">
                </el-date-picker>
                <div @click="handleSearch" class="el-input-group__append search">
                    <i class="el-icon-search"></i>
                </div>
                <el-button style="float:right" @click="handleAdd" type="primary">新增異動</el-button>
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                    <el-table-column width="60" label="單號" prop="inventoryChangeId"></el-table-column>
                    <el-table-column width="90" label="類型" prop="inventoryTypeName"></el-table-column>
                    <el-table-column min-width="110" label="SKU" prop="sku"></el-table-column>
                    <el-table-column min-width="50" max-width="100" label=" 所屬倉庫" prop="warehouse"></el-table-column>
                    <el-table-column width="60" label="數量" prop="quantity"></el-table-column>
                    <el-table-column width="700" label="產品名稱" prop="productName"></el-table-column>
                    <el-table-column width="80" label="帳號" prop="account"></el-table-column>
                    <el-table-column width="80" label="平台" prop="platform"></el-table-column>
                    <!-- <el-table-column width="80" label="新增" prop="addedBy"></el-table-column> -->
                    <!-- <el-table-column width="80" label="新增時間" prop="addedTime" sortable="custom" :formatter="formatToTime" ></el-table-column> -->
                    <el-table-column width="90" label="異動時間" prop="datetime" :formatter="formatToDate"></el-table-column>
                    <!-- <el-table-column width="80" label="最後更新" prop="lastModifiedBy" sortable="custom"></el-table-column> -->
                    <el-table-column width="80" label="轉出倉庫" prop="moveFrom"></el-table-column>
                    <el-table-column width="80" label="轉入倉庫" prop="moveTo"></el-table-column>
                    <!-- <el-table-column min-width="130" label="snapshotUrl" prop="snapshotUrl"></el-table-column> -->
                    <el-table-column width="80" label="動作" fixed="right">
                        <template slot-scope="scope">
                            <el-button class="btnh" type="text" title="刪除" icon="el-icon-won-22" @click="handleDelete(scope.row)"></el-button>
                        </template>
                    </el-table-column>
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
        url: "/erp/inventoryChange/search",
        method: "post",
        where: ""
      }
    };
  },
  created() {
    this.Bus.$on("refresh", this.handleSearch);
    let type = axios({
      url: "/erp/inventoryChange/value/inventoryType",
      method: "post",
      data: {
        token: this.token
      }
    });
    let warehouse = axios({
      url: "/erp/inventoryChange/value/warehouse",
      method: "post",
      data: {
        token: this.token
      }
    });
    Promise.all([type, warehouse]).then(([type, warehouse]) => {
      this.warehouseOption = _.cloneDeep(warehouse);
      this.inventoryTypeOption = _.cloneDeep(type);
    });
  },
  methods: {
    handleCondition(sign) {
      if (sign == "type") {
        if (!this.inventoryType) {
          _.pull(this.condition, "1");
        } else {
          if (!this.condition.includes("1")) {
            this.condition.push("1");
          }
        }
      }

      if (sign == "warehouse") {
        if (!this.warehouse) {
          _.pull(this.condition, "2");
        } else {
          if (!this.condition.includes("2")) {
            this.condition.push("2");
          }
        }
      }
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
      if (this.condition.includes("1")) {
        data.inventoryType = this.inventoryType;
      }
      if (this.condition.includes("2")) {
        data.warehouse = this.warehouse;
      }
      if (this.condition.includes("3")) {
        data.startDate = this.date[0];
        data.endDate = this.date[1];
      }
      this.fetchTableData(data);
    }, 2000),
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
    },
    handleDelete(row) {
      let _this = this;
      this.$confirm("確定要刪除", "提示", {
        type: "warning",
        beforeClose(action, instance, done) {
          if (action == "confirm") {
            axios({
              url: "/erp/inventoryChange/remove",
              method: "post",
              data: {
                token: this.token,
                inventoryChangeId: row.inventoryChangeId
              }
            })
              .then(() => {
                _this.$message.success("刪除成功");
                _this.handleSearch();
                done();
              })
              .catch(() => {
                _this.$message.success("刪除失敗");
                done();
              });
          } else {
            done();
          }
        }
      }).catch(() => {});
    }
  }
};
</script>
