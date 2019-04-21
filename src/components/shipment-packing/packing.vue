<template>
  <div>
    <el-row>
      <el-col :span="22">
        <el-input
          class="w-max200 ibbox"
          placeholder="搜索"
          v-model="fetchOption.where"
          @keyup.enter.native="handleSearch"
        >
        </el-input>
        <el-select
          class="w-max150"
          placeholder="國家"
          v-model="searchCountry"
          @change="handleCondition('type')"
          clearable
        >
          <el-option
            v-for="(v,i) in searchCountryOption"
            :key="'type'+i"
            :label="v"
            :value="v"
          ></el-option>
        </el-select>
        <el-select
          class="w-max150"
          placeholder="平台"
          v-model="searchPlatform"
          @change="handleCondition('plat')"
          clearable
        >
          <el-option
            v-for="(v,i) in searchPlatformOption"
            :key="'plat'+i"
            :label="v"
            :value="v"
          ></el-option>
        </el-select>
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
          placeholder="運送方式"
          v-model="searchMethod"
          @change="handleCondition('method')"
          clearable
        >
          <el-option
            v-for="(v,i) in searchShippingMethodOption"
            :key="'method'+i"
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
    </el-row>
    <el-row class="mt5">
      <el-col>
        <el-table
          ref="wonTable"
          :max-height="maxHeight"
          :data="tableData"
          v-loading="isTableLoading"
          @sort-change="handleSortChange"
        >

          <el-table-column
            label="shipmentId"
            prop="shipmentId"
            min-width="100"
          >

          </el-table-column>
          <el-table-column
            label="賬戶"
            prop="account"
            min-width="100"
          >

          </el-table-column>
          <el-table-column
            label="國家"
            prop="country"
            min-width="100"
          >

          </el-table-column>
          <el-table-column
            label="平台"
            prop="platform"
            min-width="100"
          >

          </el-table-column>
          <el-table-column
            label="完成裝貨時間"
            prop="packingDoneDateTime"
            :formatter="formatToTime"
            min-width="140"
          >

          </el-table-column>
          <el-table-column
            label="已發貨時間"
            prop="shipoutFromWarehouseDateTime"
            :formatter="formatToTime"
            min-width="140"
          >

          </el-table-column>
          <el-table-column
            label="採購尚未到時間"
            prop="waitForStockDateTime"
            :formatter="formatToTime"
            min-width="140"
          >

          </el-table-column>
          <el-table-column
            label="運送方式"
            prop="shippingMethod"
            min-width="140"
          >

          </el-table-column>

          <el-table-column
            label="動作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button
                class="btnh"
                type="text"
                title="編輯"
                icon="el-icon-won-1"
                @click="handleEdit(scope.row.shipmentId)"
              ></el-button>
              <el-button
                class="btnh"
                type="text"
                title="删除"
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
import { format } from "@/common/until/format";
export default {
  extends: wonTableContainer,
  data() {
    return {
      condition: [],
      searchAccount: "",
      searchPlatform: "",
      searchCountry: "",
      searchMethod: "",
      searchAccountOption: [],
      searchPlatformOption: [],
      searchCountryOption: [],
      searchShippingMethodOption: [],
      fetchCondition: {
        skip: 0,
        limit: 20
      },
      fetchOption: {
        url: "/shipmentPacking/search",
        method: "post",
        where: ""
      }
    };
  },
  created() {
    let purchasePlatform = axios({
      url: "/shipmentPacking/value/platform",
      method: "post",
      data: {
        token: this.token
      }
    });
    let purchaseCountry = axios({
      url: "/shipmentPacking/value/country",
      method: "post",
      data: {
        token: this.token
      }
    });
    let purchaseAccount = axios({
      url: "/shipmentPacking/value/account",
      method: "post",
      data: {
        token: this.token
      }
    });

    let shippingMethod = axios({
      url: "/shipmentPacking/value/shippingMethod",
      method: "post",
      data: {
        token: this.token
      }
    });

    axios({
      url: "/shipmentPacking/shipment",
      method: "post",
      data: {
        token: this.token
      }
    });

    Promise.all([
      purchasePlatform,
      purchaseCountry,
      purchaseAccount,
      shippingMethod
    ]).then(([platform, country, account, shippingMethod]) => {
      this.searchAccountOption = _.cloneDeep(account);
      this.searchPlatformOption = _.cloneDeep(platform);
      this.searchCountryOption = _.cloneDeep(country);
      this.searchShippingMethodOption = _.cloneDeep(shippingMethod);
    });
    this.handleSearch();
    this.Bus.$on("refresh", this.handleSearch);
  },
  filters: {
    ...format
  },
  methods: {
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
        data.platform = this.searchPlatform;
      }
      if (this.condition.includes("2")) {
        data.country = this.searchCountry;
      }
      if (this.condition.includes("3")) {
        data.account = this.searchAccount;
      }
      if (this.condition.includes("4")) {
        data.shippipngMethod = this.searchMethod;
      }

      axios({
        url: this.fetchOption.url,
        method: this.fetchOption.method,
        data
      }).then(({ data, count }) => {
        this.isTableLoading = false;
        this.tableData = _.cloneDeep(data);
        this.total = count;
      });
    }, 2000),
    handleDelete(val) {
      this.$confirm("是否删除", "提示", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            url: "/shipmentPacking/update/delete",
            method: "post",
            data: {
              shipmentId: val.shipmentId,
              token: this.token
            }
          }).then(() => {
            this.handleSearch();
            this.$message.success("删除成功");
          });
        })
        .catch(() => {});
    },
    handleEdit(val) {
      this.$router.push({
        name: "shipmentpackingEdit",
        query: { id: val }
      });
    },
    handleCondition(sign) {
      if (sign == "plat") {
        if (!this.searchPlatform) {
          _.pull(this.condition, "1");
        } else {
          if (!this.condition.includes("1")) {
            this.condition.push("1");
          }
        }
      }
      if (sign == "type") {
        if (!this.searchCountry) {
          _.pull(this.condition, "2");
        } else {
          if (!this.condition.includes("2")) {
            this.condition.push("2");
          }
        }
      }
      if (sign == "acc") {
        if (!this.searchAccount) {
          _.pull(this.condition, "3");
        } else {
          if (!this.condition.includes("3")) {
            this.condition.push("3");
          }
        }
      }
      if (sign == "method") {
        if (!this.searchMethod) {
          _.pull(this.condition, "4");
        } else {
          if (!this.condition.includes("4")) {
            this.condition.push("4");
          }
        }
      }
      this.handleSearch();
    }
  }
};
</script>
