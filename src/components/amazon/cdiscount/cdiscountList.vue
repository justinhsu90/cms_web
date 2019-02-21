<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-input
          class="w-max200 ibbox"
          placeholder="搜索"
          v-model="fetchOption.where"
          @keyup.enter.native="handleSearch"
        >
        </el-input>
        <el-select
          class="w-max150"
          placeholder="訂單狀態"
          v-model="searchOrderStatus"
          @change="handleCondition('status')"
          clearable
        >
          <el-option
            v-for="(v,i) in searchOrderStatusOption"
            :key="'acc'+i"
            :label="v"
            :value="v"
          ></el-option>
        </el-select>
        <el-select
          class="w-max150"
          placeholder="訂單類型"
          v-model="searchOrderType"
          @change="handleCondition('orderType')"
          clearable
        >
          <el-option
            v-for="(v,i) in searchOrderTypeOption"
            :key="'country'+i"
            :label="v"
            :value="v"
          >
          </el-option>
        </el-select>
        <el-select
          class="w-max150"
          placeholder="出貨方式"
          v-model="searchShippingMode"
          @change="handleCondition('shippingMode')"
          clearable
        >
          <el-option
            v-for="(v,i) in searchShippingModeOption"
            :key="'plat'+i"
            :label="v"
            :value="v"
          ></el-option>
        </el-select>
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
            min-width="60"
            label="單號"
            prop="orderId"
          >
          </el-table-column>
         
          <el-table-column
            min-width="60"
            label="訂單狀態"
            prop="orderStatus"
          >
          </el-table-column>
          <el-table-column
            min-width="60"
            label="訂單類型"
            prop="orderType"
          >
          </el-table-column>
          <el-table-column
            min-width="60"
            label="發貨方式"
            prop="shippingMode"
          >
          </el-table-column>

           <el-table-column
            min-width="150"
            label="產品名稱"
            prop="productName"
          >
          </el-table-column>
          <el-table-column
            min-width="60"
            label="SKU"
            prop="subSku"
          >
          </el-table-column>
          <el-table-column
            min-width="60"
            label="售價"
            prop="unitPrice"
          >
          </el-table-column>
          <el-table-column
            min-width="60"
            label="運費"
            prop="shippingFee"
          >
          </el-table-column>
          <el-table-column
            width="50"
            label="動作"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                class="btnh"
                type="text"
                title="查看"
                icon="el-icon-won-40"
                @click="handleCheck(scope.row)"
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
      tableData: [],
      condition: [],
      searchOrderStatus: "",
      searchOrderStatusOption: [],
      searchOrderType: "",
      searchOrderTypeOption: [],
      searchShippingMode: "",
      searchShippingModeOption: [],
      isTableLoading: false,
      fetchCondition: {
        skip: 0,
        limit: 20,
        order: ""
      },
      fetchOption: {
        url: "/cdiscount/search",
        where: "",
        method: "post"
      }
    };
  },
  created() {
    let orderStatus = axios({
      url: "/cdiscount/value/orderStatus",
      method: "post",
      data: {
        token: this.token
      }
    });
    let orderType = axios({
      url: "/cdiscount/value/orderType",
      method: "post",
      data: {
        token: this.token
      }
    });
    let shippingMode = axios({
      url: "/cdiscount/value/shippingMode",
      method: "post",
      data: {
        token: this.token
      }
    });

    Promise.all([orderStatus, orderType, shippingMode]).then(
      ([orderStatus, orderType, shippingMode]) => {
        this.searchOrderStatusOption = _.cloneDeep(orderStatus);
        this.searchOrderTypeOption = _.cloneDeep(orderType);
        this.searchShippingModeOption = _.cloneDeep(shippingMode);
      }
    );
    this.handleSearch();
  },
  methods: {
    handleCondition(sign) {
      if (sign == "status") {
        if (!this.searchOrderStatus) {
          _.pull(this.condition, "1");
        } else {
          if (!this.condition.includes("1")) {
            this.condition.push("1");
          }
        }
      }
      if (sign == "shippingMode") {
        if (!this.searchShippingMode) {
          _.pull(this.condition, "2");
        } else {
          if (!this.condition.includes("2")) {
            this.condition.push("2");
          }
        }
      }
      if (sign == "orderType") {
        if (!this.searchOrderType) {
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
        limit: this.fetchCondition.limit,
        order: this.fetchCondition.order
      };
      if (this.condition.includes("1")) {
        data.orderStatus = this.searchOrderStatus;
      }
      if (this.condition.includes("2")) {
        data.shippingMode = this.searchShippingMode;
      }
      if (this.condition.includes("3")) {
        data.orderType = this.searchOrderType;
      }
      this.fetchTableData(data);
    }, 2000)
  }
};
</script>
