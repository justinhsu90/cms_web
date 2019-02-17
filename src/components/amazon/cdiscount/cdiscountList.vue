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
          placeholder="帳號"
          v-model="searchAccount"
          @change="handleCondition('acc')"
          clearable
        >
          <el-option
            v-for="(v,i) in searchAccountOption"
            :key="'acc'+i"
            :label="v"
            :value="v"
          ></el-option>
        </el-select>
        <el-select
          class="w-max150"
          placeholder="國家"
          v-model="searchCountry"
          @change="handleCondition('cou')"
          clearable
        >
          <el-option
            v-for="(v,i) in searchCountryOption"
            :key="'country'+i"
            :label="v"
            :value="v"
          >
          </el-option>
        </el-select>
        <el-select
          class="w-max150"
          placeholder="出貨狀態"
          v-model="searchOrderstatus"
          @change="handleCondition('status')"
          clearable
        >
          <el-option
            v-for="(v,i) in searchOrderstatusOption"
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
            label="訂單號"
            prop="wowcherCode"
          >
          </el-table-column>
          <el-table-column
            min-width="70"
            label="下單時間"
            prop="redeemedAt"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="50"
            label="發貨狀態"
            prop="orderStatus"
          ></el-table-column>
          <el-table-column
            min-width="50"
            label="訂單狀態"
            prop="orderType"
          ></el-table-column>
          <el-table-column
            min-width="180"
            label="產品名稱"
            prop="productName"
          ></el-table-column>
          <el-table-column
            min-width="120"
            label="客戶名稱"
            prop="customerName"
          ></el-table-column>
          <el-table-column
            min-width="120"
            label="客戶email"
            prop="email"
          ></el-table-column>
          <el-table-column
            min-width="120"
            label="單號"
            prop="trackingNo"
            sortable="custom"
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
      searchAccount: "",
      searchAccountOption: [],
      searchCountry: "",
      searchCountryOption: [],
      searchOrderstatus: "",
      searchOrderstatusOption: [],
      isTableLoading: false,
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
        this.searchAccountOption = _.cloneDeep(orderStatus);
        this.searchCountryOption = _.cloneDeep(orderType);
        this.searchOrderstatusOption = _.cloneDeep(shippingMode);
      }
    );
    this.handleSearch();
  },
  methods: {
    handleCondition(sign) {
      if (sign == "acc") {
        if (!this.searchAccount) {
          _.pull(this.condition, "1");
        } else {
          if (!this.condition.includes("1")) {
            this.condition.push("1");
          }
        }
      }
      if (sign == "status") {
        if (!this.searchOrderstatus) {
          _.pull(this.condition, "2");
        } else {
          if (!this.condition.includes("2")) {
            this.condition.push("2");
          }
        }
      }
      if (sign == "cou") {
        if (!this.searchCountry) {
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
        data.account = this.searchAccount;
      }
      if (this.condition.includes("2")) {
        data.orderstatus = this.searchOrderstatus;
      }
      if (this.condition.includes("3")) {
        data.country = this.searchCountry;
      }
      this.fetchTableData(data);
    }, 2000)
  }
};
</script>
