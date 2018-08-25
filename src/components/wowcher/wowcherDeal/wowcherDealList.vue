<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-input placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:22%;float:left">
        </el-input>
        <div style="margin-left:5px;display:inline-block;width:140px">
          <el-select placeholder="帳號" v-model="searchAccount" @change="handleCondition('acc')" clearable>
            <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v.account" :value="v.account"></el-option>
          </el-select>
        </div>
        <div style="display:inline-block;width:140px">
          <el-select placeholder="國家" v-model="searchCountry" @change="handleCondition('cou')" clearable>
            <el-option v-for="(v,i) in searchCountryOption" :key="'country'+i" :label="v.countryCode" :value="v.countryName">
              <span style="float: left">{{ v.countryCode }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryName }}</span>
            </el-option>
          </el-select>
        </div>
        <div style="cursor:pointer;display: inline-block;width: 14px;height: 35px;text-align: center;border: 1px solid #dcdfe6;border-radius: 4px;line-height: 35px;" @click="handleSearch" class="el-input-group__append">
          <i class="el-icon-search"></i>
        </div>
        <el-button style="float:right" @click="handleAdd" type="primary">新增 Deal</el-button>
      </el-col>
      <el-col class="mt5">
        <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
          <el-table-column min-width="100" label="Deal ID" prop="dealId" sortable="custom"></el-table-column>
          <el-table-column min-width="110" label="Product ID" prop="productId" sortable="custom"></el-table-column>
          <el-table-column min-width="70" label="帳號" prop="account" sortable="custom"></el-table-column>
          <el-table-column min-width="70" label="國家" prop="country" sortable="custom"></el-table-column>
          <el-table-column min-width="250" label="產品名稱" prop="productName" sortable="custom"></el-table-column>
          <el-table-column min-width="110" label="Final Price" prop="finalPrice" sortable="custom">
            <template slot-scope="scope">
              {{scope.row.finalPrice | formatToYuan}}&nbsp;{{scope.row.currency}}
            </template>
          </el-table-column>
          <el-table-column min-width="70" label="售價" prop="salePrice" sortable="custom"></el-table-column>
          <el-table-column min-width="90" label="開始日期" prop="startDate" sortable="custom"></el-table-column>
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
                limit: 15,
                order: "-lastUpdatedTime"
            },
            fetchOption: {
                url: "/wowcher/deal/search",
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

        Promise.all([account, country]).then(([account, country]) => {
            this.searchAccountOption = _.cloneDeep(account.data);
            this.searchCountryOption = _.cloneDeep(country.data);
        });
        this.handleSearch();
    },
    methods: {
        handleCondition(sign) {
            if (sign == "acc") {
                if (!this.searchAccount) {
                    _.pull(this.condition, "1");
                } else {
                    this.condition.push("1");
                }
            }
            if (sign == "cou") {
                if (!this.searchCountry) {
                    _.pull(this.condition, "3");
                } else {
                    this.condition.push("3");
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
