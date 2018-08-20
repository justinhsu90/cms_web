          <template>
              <div>
                  <el-row>
                      <el-col :span="24">
                    <el-input  placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:22%;float:left">
                    </el-input>
                  <div  style="cursor:pointer;display: inline-block;width: 14px;height: 35px;text-align: center;border: 1px solid #dcdfe6;border-radius: 4px;line-height: 35px;"  @click="handleSearch" class="el-input-group__append"><i class="el-icon-search"></i></div>
                  <div style="margin-left:25px;display:inline-block;width:140px">
                    <p> 剩餘UPC 數量:</p>
                  </div>
                  <el-button style="float:right" @click="handleAdd" type="primary" >指派 UPC</el-button> 
                  </el-col>    
                  <el-col>
                        <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">   
                          <el-table-column min-width="90" label="更新時間" prop="lastUpdatedTime" sortable="custom"></el-table-column>
                          <el-table-column min-width="110" label="UPC/EAN" prop="upc" sortable="custom"></el-table-column>
                          <el-table-column min-width="130" label="對應SKU" prop="sku" sortable="custom"></el-table-column>
                          <el-table-column min-width="110" label="對應ASIN" prop="asin" sortable="custom"></el-table-column>
                          <!-- <el-table-column min-width="150" label="產品名稱" prop="productName" sortable="custom"></el-table-column> -->
                          <el-table-column min-width="70" label="平台" prop="platform" sortable="custom"></el-table-column>
                          <el-table-column min-width="70" label="國家" prop="country" sortable="custom"></el-table-column>
                          <el-table-column min-width="90" label="帳號" prop="account" sortable="custom"></el-table-column>
                          <el-table-column min-width="110" label="備註" prop="note"></el-table-column>
                          <el-table-column width="70" label="動作" fixed="right">
                          <template slot-scope="scope">
                            <el-button type="text" title="編輯" icon="el-icon-won-1" @click="handleEdit(scope.row)"></el-button>
                          </template>
                    </el-table-column> 
              </el-table> 
              </el-col>
                <div style="float:right">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total='total'
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :layout="layout"
            >
          </el-pagination>
          </div> 
              </el-row>
              <br>
              <br>
          
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
        limit: 10,
        order: "-lastUpdatedTime"

      },
      fetchOption: {
        url: "/upc/search",
        where: "",
        method: "post"
      }
    };
  },
  created() {
    // let account = axios({
    //   url: "/wowcher/value/account",
    //   method: "post",
    //   data: {
    //     token: this.token
    //   }
    // });
    // let country = axios({
    //   url: "/wowcher/value/country",
    //   method: "post",
    //   data: {
    //     token: this.token
    //   }
    // });

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
        name: "upcEdit",
        query: { data: JSON.stringify(val) }
      });
    },
    handleAdd() {
      this.$router.push("/upcAdd");
    },
    handleCheck(val) {
      this.$router.push({
        name: "/upcList",
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
