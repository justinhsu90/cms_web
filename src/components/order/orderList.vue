<template>
  <div>
    <el-row>
      <el-col :span="24">
              <el-input class="w-max200 ibbox" placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch">
              </el-input>
                <el-select class="w-max150" placeholder="帳號" v-model="searchAccount" @change="handleCondition('acc')" clearable>
                  <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v.account" :value="v.account"></el-option>
                </el-select>
                <el-select class="w-max150" placeholder="國家" v-model="searchCountry" @change="handleCondition('cou')" clearable>
                  <el-option v-for="(v,i) in searchCountryOption" :key="'country'+i" :label="v.countryCode" :value="v.countryName">
                    <span style="float: left">{{ v.countryCode }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryName }}</span>
                  </el-option>
                </el-select>
                <el-select class="w-max150" placeholder="出貨狀態" v-model="searchOrderstatus" @change="handleCondition('status')" clearable>
                  <el-option v-for="(v,i) in searchOrderstatusOption" :key="'plat'+i" :label="v.name" :value="v.name"></el-option>
                </el-select>
                <el-select class="w-max150" placeholder="訂單狀態" v-model="searchOrdertype" @change="handleCondition('type')" clearable>
                  <el-option v-for="(v,i) in searchOrdertypeOption" :key="'languate'+i" :value="v.name">
                  </el-option>
                </el-select>
                <div  @click="handleSearch" class="el-input-group__append search">
                  <i class="el-icon-search"></i>
                </div>
              <el-button type="success" class="f-r" @click="handleShow" size="medium">清除出貨紀錄</el-button>
      </el-col>
      <el-col class="mt5">
        <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
          <el-table-column min-width="60" label="訂單號" prop="wowcherCode"></el-table-column>
          <el-table-column min-width="60" label="SKU" prop="sku"></el-table-column>
          <el-table-column min-width="70" label="下單時間" prop="redeemedAt" sortable="custom"></el-table-column>
          <el-table-column min-width="50" label="發貨狀態" prop="orderStatus"></el-table-column>
          <el-table-column min-width="50" label="訂單狀態" prop="orderType"></el-table-column>
          <el-table-column min-width="180" label="產品名稱" prop="productName"></el-table-column>
          <el-table-column min-width="120" label="客戶名稱" prop="customerName"></el-table-column>
          <el-table-column min-width="120" label="客戶email" prop="email"></el-table-column>
          <el-table-column min-width="120" label="單號" prop="trackingNo" sortable="custom">
          </el-table-column>
          <el-table-column width="50" label="動作" fixed="right">
            <template slot-scope="scope">
              <el-button class="btnh" type="text" title="查看" icon="el-icon-won-40" @click="handleCheck(scope.row)"></el-button>
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
import showDialog from "won-service/component/won-dialog/dialog";
import orderClear from "./orderClear";
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
      searchOrdertype: "",
      searchOrdertypeOption: [],
      maxHeight: 450,
      isTableLoading: false,
      fetchCondition: {
        skip: 0,
        order: "-redeemedAt",
        limit: 20
      },
      fetchOption: {
        url: "/wowcher/order/search",
        where: "",
        method: "post"
      }
    };
  },
  created() {
    let account = axios({
      url: "/wowcher/value/account",
      method: "post",
      data: {
        token: this.token
      }
    });
    let country = axios({
      url: "/wowcher/value/country",
      method: "post",
      data: {
        token: this.token
      }
    });
    let orderstatus = axios({
      url: "/wowcher/value/orderstatus",
      method: "post",
      data: {
        token: this.token
      }
    });
    let ordertype = axios({
      url: "/wowcher/value/ordertype",
      method: "post",
      data: {
        token: this.token
      }
    });
    Promise.all([account, country, orderstatus, ordertype]).then(
      ([account, country, orderstatus, ordertype]) => {
        this.searchAccountOption = _.cloneDeep(account.data);
        this.searchCountryOption = _.cloneDeep(country.data);
        this.searchOrderstatusOption = _.cloneDeep(orderstatus.data);
        this.searchOrdertypeOption = _.cloneDeep(ordertype.data);
      }
    );
    this.Bus.$on("refresh", this.handleSearch);
    this.handleSearch();
  },
  methods: {
    handleShow() {
      showDialog(orderClear, {
        title: "清除出貨紀錄",
        width: "40%"
      });
    },
    handleLook(val) {
      this.$router.push({
        name: "trackingStatus",
        query: {
          id: val
        }
      });
    },
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
      if (sign == "type") {
        if (!this.searchOrdertype) {
          _.pull(this.condition, "4");
        } else {
          if (!this.condition.includes("4")) {
            this.condition.push("4");
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
      if (this.condition.includes("4")) {
        data.ordertype = this.searchOrdertype;
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
    handleCheck(val) {
      this.$router.push({
        name: "orderView",
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
