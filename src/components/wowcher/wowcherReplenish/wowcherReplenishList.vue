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
        >
          <el-option
            v-for="(v,i) in searchCountryOption"
            :key="'country'+i"
            :label="v"
            :value="v"
          >
            <!-- <span style="float: left">{{ v.countryCode }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryNameChinese }}</span> -->
          </el-option>
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
            min-width="100"
            label="流水號"
          >  
          <template slot-scope="scope">
              {{scope.$index++}}
          </template>
          </el-table-column>
          <el-table-column
            min-width="100"
            label="國家"
            prop="country"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="100"
            label="帳號"
            prop="account"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="100"
            label="SKU"
            prop="sku"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="100"
            label="品名"
            prop="productName"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="120"
            label="目前可售庫存"
            prop="currentStock"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="120"
            label="建議補貨數量"
            prop="restockQuantity"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="100"
            label="7天銷量"
            prop="sold7days"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="100"
            label="15天銷量"
            prop="sold15days"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="100"
            label="30天銷量"
            prop="sold30days"
            sortable="custom"
          ></el-table-column>
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
      condition: ["1", "3"],
      searchAccount: "DalTech",
      searchAccountOption: ["DalTech"],
      searchCountry: "CA",
      searchCountryOption: ["CA"],
      isTableLoading: false,
      fetchCondition: {
        skip: 0,
        limit: 15
      },
      fetchOption: {
        url: "amazon/restock/count",
        where: "",
        method: "post"
      }
    };
  },
  created() {
    let account = axios({
        url: "/amazon/value/account",
        method: "post",
        data: {
            token: this.token
        }
    });
    let country = axios({
        url: "/amazon/value/country",
        method: "post",
        data: {
            token: this.token
        }
    });

    Promise.all([account, country]).then(([account, country]) => {
        this.searchAccountOption = account;
        this.searchCountryOption = country;
    });
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
        limit: this.fetchCondition.limit
      };
      if (this.condition.includes("1")) {
        data.account = this.searchAccount;
      }

      if (this.condition.includes("3")) {
        data.country = this.searchCountry;
      }
      this.fetchTableData(data);
    }, 500),
    handleEdit(val) {
      this.$router.push({
        name: "wowcherDealEdit",
        query: { data: JSON.stringify(val) }
      });
    },
    handleAdd() {
      this.$router.push("/wowcherDealAdd");
    },
    handleCheck(val) {
      this.$router.push({
        name: "wowcherDealList",
        query: { data: JSON.stringify(val) }
      });
    }
  }
};
</script>
<style scoped>
.el-table th {
  color: #62717e;
  background: rgb(237, 241, 245);
  text-align: center;
}
</style>
