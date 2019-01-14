<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-input class="w-max200 ibbox" placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch" >
                </el-input>
                    <el-select class="w-max150" placeholder="帳號" v-model="searchAccount" @change="handleCondition('acc')" clearable>
                        <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v" :value="v"></el-option>
                    </el-select>
                    <el-select class="w-max150" placeholder="國家" v-model="searchCountry" @change="handleCondition('cou')" clearable>
                        <el-option v-for="(v,i) in searchCountryOption" :key="'country'+i" :label="v.countryNameChinese"  :value="v.countryCode">
                            <span style="float: left">{{ v.countryCode }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryNameChinese }}</span>
                        </el-option>
                    </el-select>
                    <el-select class="w-max150" placeholder="更新状态" v-model="searchStatus" @change="handleCondition('status')" clearable>
                        <el-option v-for="(v,i) in searchStatusOption" :key="'status'+i" :label="v" :value="v">
                        </el-option>
                    </el-select>
                <div  @click="handleSearch" class="el-input-group__append search">
                    <i class="el-icon-search"></i>
                </div>
                <el-button style="float:right" @click="handleAdd" type="primary">新增 Deal</el-button>
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                    <el-table-column min-width="110" label="Deal ID" prop="dealId" sortable="custom"></el-table-column>
                    <el-table-column min-width="120" label="Product ID" prop="productId" sortable="custom"></el-table-column>
                    <el-table-column min-width="100" label="帳號" prop="account" sortable="custom"></el-table-column>
                    <el-table-column min-width="80" label="國家" prop="country" sortable="custom"></el-table-column>
                    <el-table-column min-width="100" label="SKU" prop="sku" sortable="custom"></el-table-column>
                    <el-table-column min-width="250" label="產品名稱" prop="productName" sortable="custom"></el-table-column>
                    <el-table-column min-width="250" label="產品規格" prop="productSpec" sortable="custom"></el-table-column>
                    <el-table-column min-width="100" label="開始日期" prop="startDate" sortable="custom"></el-table-column>
                    <el-table-column width="80" label="動作" fixed="right">
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
export default {
  extends: wonTableContainer,
  data() {
    return {
      tableData: [],
      condition: [],
      searchStatusOption: ["未更新"],
      searchStatus: "",
      searchAccount: "",
      sku: "",
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
        limit: 15,
        order: "-StartDate"
      },
      fetchOption: {
        url: "/gogroopie/deal/search",
        where: "",
        method: "post"
      }
    };
  },
  created() {
    let account = axios({
      url: "/wowcher/deal/value/account",
      method: "post",
      data: {
        token: this.token
      }
    });
    let country = axios({
      url: "/wowcher/deal/value/country",
      method: "post",
      data: {
        token: this.token
      }
    });

    Promise.all([account, country]).then(([account, country]) => {
      this.searchAccountOption = _.cloneDeep(account);
      this.searchCountryOption = _.cloneDeep(country.data);
    });
    this.handleSearch();
    this.Bus.$on("refresh", this.handleSearch);
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
        if (!this.searchStatus) {
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
        data.filed = "y";
      }
      if (this.condition.includes("3")) {
        data.country = this.searchCountry;
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
    handleEdit(val) {
      this.$router.push({
        name: "gogroopieDealEdit",
        query: { data: JSON.stringify(val) }
      });
    },
    handleAdd() {
      this.$router.push("/gogroopieDealAdd");
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
