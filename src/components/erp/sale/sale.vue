<template>
    <div>
        <el-row>
            <el-col :span="22">
                <el-input class="w-max200 ibbox" placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch">
                </el-input>
                <el-select class="w-max150" placeholder="銷貨國家" v-model="searchCountry" @change="handleCondition('country')" clearable>
                    <el-option v-for="(v,i) in searchCountryOption" :key="'type'+i" :label="v" :value="v"></el-option>
                </el-select>
                <el-select class="w-max150" placeholder="銷貨平台" v-model="searchPlatform" @change="handleCondition('plat')" clearable>
                    <el-option v-for="(v,i) in searchPlatformOption" :key="'plat'+i" :label="v" :value="v"></el-option>
                </el-select>
                <el-select class="w-max150" placeholder="銷貨帳號" v-model="searchAccount" @change="handleCondition('acc')" clearable>
                    <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v" :value="v"></el-option>
                </el-select>
                <el-date-picker class="w-max260" clearable style="width:100%" @change="handleChange" value-format="yyyy-MM-dd" v-model="date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                </el-date-picker>
                <div @click="handleSearch" class="el-input-group__append search">
                    <i class="el-icon-search"></i>
                </div>
            </el-col>
            <el-col :span="2">
                <el-button style="float:right" @click="handleAdd" type="primary">新增銷貨</el-button>
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                    <el-table-column min-width="60" label="銷貨單號" prop="saleId" sortable="custom"></el-table-column>
                    <el-table-column min-width="65" label="銷貨時間" prop="saleTime" sortable="custom"></el-table-column>
                    <el-table-column min-width="50" label="銷貨類型" prop="saleType"></el-table-column>
                    <el-table-column min-width="35" label="數量" prop="saleQuantity"></el-table-column>
                    <el-table-column min-width="70" label="SKU" prop="sku"></el-table-column>
                    <el-table-column min-width="110" label="產品名稱" prop="productName"></el-table-column>
                    <el-table-column min-width="60" label="銷貨平台" prop="salePlatform"></el-table-column>
                    <!-- <el-table-column min-width="70" label="銷貨帳號" prop="saleAccount"></el-table-column> -->
                    <el-table-column min-width="55" label="出貨倉庫" prop="saleWarehouse"></el-table-column>
                    <el-table-column min-width="60" label="總金額" prop="saleTotalAmount">
                        <template slot-scope="scope">
                            {{scope.row.saleTotalAmount | formatToMoney}}&nbsp;{{scope.row.currency.toUpperCase()}}
                        </template>
                    </el-table-column>
                    <el-table-column width="50" label="動作" align="center">
                        <template slot-scope="scope">
                            <el-button class="btnh" type="text" title="編輯" icon="el-icon-won-1" @click="handleEdit(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <div style="float:right;margin-top:5px">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :total='total' :current-page="currentPage" :page-sizes="pageSizes" :layout="layout">
                </el-pagination>
            </div>
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
      tableData: [],
      maxHeight: 450,
      condition: [],
      isTableLoading: false,
      date: [],
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
      searchAccount: "",
      searchPlatform: "",
      searchCountry: "",
      searchAccountOption: [],
      searchPlatformOption: [],
      searchCountryOption: [],
      fetchCondition: {
        skip: 0,
        limit: 15,
        order: "-lastUpdatedTime"
      },
      fetchOption: {
        url: "/erp/sale/search",
        method: "post",
        where: ""
      }
    };
  },
  filters: {
    ...format
  },
  created() {
    let salePlatform = axios({
      url: "/erp/value/salePlatform",
      method: "post",
      data: {
        token: this.token
      }
    });
    let saleCountry = axios({
      url: "/erp/value/saleCountry",
      method: "post",
      data: {
        token: this.token
      }
    });
    let saleAccount = axios({
      url: "/erp/value/saleAccount",
      method: "post",
      data: {
        token: this.token
      }
    });
    Promise.all([salePlatform, saleCountry, saleAccount]).then(
      ([platform, country, account]) => {
        this.searchAccountOption = _.cloneDeep(account);
        this.searchPlatformOption = _.cloneDeep(platform);
        this.searchCountryOption = _.cloneDeep(country);
      }
    );
    this.handleSearch();
    this.Bus.$on("refresh", this.handleSearch);
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
        data.salePlatform = this.searchPlatform;
      }
      if (this.condition.includes("2")) {
        data.saleCountry = this.searchCountry;
      }
      if (this.condition.includes("3")) {
        data.saleAccount = this.searchAccount;
      }
      if (!_.isEmpty(this.date)) {
        data.startDate = this.date[0];
        data.endDate = this.date[1];
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
    }, 500),
    handleChange() {
      this.handleSearch();
    },
    handleEdit(val) {
      this.$router.push({
        name: "erpSaleEdit",
        query: { data: JSON.stringify(val) }
      });
    },
    handleAdd() {
      this.$router.push("/erpSaleAdd");
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
      if (sign == "country") {
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
      this.handleSearch();
    }
  }
};
</script>

<style>
</style>
