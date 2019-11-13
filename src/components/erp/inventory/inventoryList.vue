<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-input
          class="ibbox w-max200"
          :placeholder="$t('inventory.placeholder.search')"
          v-model="fetchOption.where"
          @keyup.enter.native="handleSearch"
        >
        </el-input>
        <el-select
          class="w-max150"
          :placeholder="$t('inventory.placeholder.type')"
          v-model="inventoryType"
          @change="handleCondition('type')"
          clearable
        >
          <el-option
            v-for="(v,i) in inventoryTypeOption"
            :key="i"
            :label="v.inventoryTypeName"
            :value="v.inventoryType"
          ></el-option>
        </el-select>
        <el-select
          class="w-max150"
          :placeholder="$t('inventory.placeholder.product')"
          v-model="warehouse"
          @change="handleCondition('warehouse')"
          clearable
        >
          <el-option
            v-for="(v,i) in warehouseOption"
            :key="'merge'+i"
            :label="v"
            :value="v"
          ></el-option>
        </el-select>
        <el-date-picker
          class="w-max180"
          clearable
          @change="handleCondition('date')"
          value-format="yyyy-MM-dd"
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="~"
          :start-placeholder="$t('inventory.placeholder.startDate')"
          :end-placeholder="$t('inventory.placeholder.endDate')"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
        <div
          @click="handleSearch"
          class="el-input-group__append search"
        >
          <i class="el-icon-search"></i>
        </div>
        <el-button
          style="float:right"
          @click="handleAdd"
          type="primary"
        >{{$t('inventory.newAddTransaction')}}</el-button>
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
            width="120"
            :label="$t('inventory.table.orderNumber')"
            prop="inventoryChangeId"
          ></el-table-column>
          <el-table-column
            width="90"
            :label="$t('inventory.table.type')"
            prop="inventoryTypeName"
          ></el-table-column>
          <el-table-column
            min-width="110"
            :label="$t('inventory.table.sku')"
            prop="sku"
          ></el-table-column>
          <el-table-column
            min-width="115"
            max-width="100"
            :label="$t('inventory.table.warehouse')"
            prop="warehouse"
          ></el-table-column>
          <el-table-column
            width="110"
            :label="$t('inventory.table.quantity')"
            prop="quantity"
          ></el-table-column>
          <el-table-column
            width="400"
            :label="$t('inventory.table.productName')"
            prop="productName"
          ></el-table-column>
          <el-table-column
            width="110"
            :label="$t('inventory.table.account')"
            prop="account"
          ></el-table-column>
          <el-table-column
            width="110"
            :label="$t('inventory.table.platform')"
            prop="platform"
          ></el-table-column>
          <el-table-column
            width="140"
            :label="$t('inventory.table.moveTime')"
            prop="datetime"
            :formatter="formatToDate"
          ></el-table-column>
          <el-table-column
            width="160"
            :label="$t('inventory.table.moveFormWarehouse')"
            prop="moveFrom"
          ></el-table-column>
          <el-table-column
            width="160"
            :label="$t('inventory.table.moveToWarehouse')"
            prop="moveTo"
          ></el-table-column>
          <el-table-column
            width="80"
            :label="$t('inventory.table.action')"
            fixed="right"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                class="btnh"
                type="text"
                :title="$t('inventory.table.delete')"
                icon="el-icon-won-22"
                @click="handleDelete(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <won-pagination
        v-bind="paginationProps"
        v-on="paginationListeners"
      >
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
        limit: 20
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
