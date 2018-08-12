            <template>
                <div>
                    <el-row>
                        <el-col :span="24">
                      <el-input  placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:22%;float:left">
                      </el-input>
                      <div style="margin-left:5px;display:inline-block;width:140px">
                      <el-select placeholder="狀態" v-model="searchAccount" @change="handleCondition('acc')" clearable>
                            <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v.account" :value="v.account"></el-option>
                        </el-select>
                    </div>
                    <!-- <div style="display:inline-block;width:140px">
                      <el-select  placeholder="國家" v-model="searchCountry"  @change="handleCondition('cou')" clearable>
                            <el-option v-for="(v,i) in searchCountryOption" :key="'country'+i" :label="v.countryCode" :value="v.countryName" >
                              <span style="float: left">{{ v.countryCode }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryName }}</span>
                            </el-option>
                        </el-select>
                    </div> -->
                    <div  style="cursor:pointer;display: inline-block;width: 14px;height: 35px;text-align: center;border: 1px solid #dcdfe6;border-radius: 4px;line-height: 35px;"  @click="handleSearch" class="el-input-group__append"><i class="el-icon-search"></i></div>
                      <el-button style="float:right" @click="handleAdd"  type="primary" >新增補/重發</el-button> 
                    </el-col>    
                    <br>
                    <br>
                    <br>
                    <el-col>
                          <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">   
                            <!-- <el-table-column min-width="110" label="最後更新時間" prop="lastUpdatedTime" sortable="custom"></el-table-column> -->
                            <el-table-column min-width="150" label="Wowcher Code" prop="wowcherCode"></el-table-column>
                            <el-table-column min-width="110" label="建單時間" prop="addedTime" sortable="custom"></el-table-column>
                            <el-table-column min-width="110" label="物流單時間" prop="shipmentCreatedTime"></el-table-column>
                            <el-table-column min-width="110" label="發貨時間" prop="shipoutTime" sortable="custom"></el-table-column>
                            <el-table-column min-width="70" label="手動" prop="Manual"></el-table-column>
                            <el-table-column min-width="100" label="備註" prop="note"></el-table-column>
                            <!-- <el-table-column min-width="70" label="貨代" prop="agent" sortable="custom"></el-table-column> -->
                            <!-- <el-table-column min-width="110" label="貨代單號" prop="agentOrderId"></el-table-column> -->
                            <el-table-column min-width="140" label="物流單號" prop="trackingNumber"></el-table-column>
                            <el-table-column min-width="100" label="發貨方式" prop="shippingMethod" sortable="custom"></el-table-column>
                            <!-- <el-table-column min-width="90" label="原單發貨品名" prop="originProductName" sortable="custom"></el-table-column> -->
                            <el-table-column min-width="140" label="實際發貨品名" prop="shipmentProductName"></el-table-column>
                            <el-table-column width="80" label="動作" fixed="right">
                            <template slot-scope="scope">
                              <el-button type="text" title="編輯" icon="el-icon-won-1" @click="handleEdit(scope.row)"></el-button>
                        <el-button type="text" title="删除" icon="el-icon-won-22" @click="handleDelete(scope.row)"></el-button>
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
            import wonTableContainer from "../../common/wonTableContainer";
            export default {
              extends:wonTableContainer,
              data() {
                return {   
                  tableData: [], 
                  condition: [],
                  searchAccount:'',
                  searchAccountOption:[],
                  searchCountry:'',
                  searchCountryOption:[],
                  searchOrderstatus:"",
                  searchOrderstatusOption:[],
                  searchOrdertype:'',
                  searchOrdertypeOption:[],
                  maxHeight: 450,
                  isTableLoading: false,
                  fetchCondition: {
                    skip: 0,
                    limit: 10,
                  },
                  fetchOption: {
                    url: "/wowcher/rpm/search",
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

                Promise.all([account, country]).then(
                  ([account,country]) => {
                    this.searchAccountOption = _.cloneDeep(account.data);
                    this.searchCountryOption = _.cloneDeep(country.data);
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
          handleSearch:_.debounce(function(){
            this.isTableLoading = true;
            let data = {
            where: this.fetchOption.where,
            token: this.token,
            skip: this.fetchCondition.skip,
            limit: this.fetchCondition.limit,
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
                    }).then(({data,count}) => {
                    this.isTableLoading = false;
                    this.tableData = _.cloneDeep(data);
                    this.total = count;
                  });
                  },500),
                //   handleEdit(val) {
                //    this.$router.push({
                //    name: "wowcherDealEdit",
                //  query: { data: JSON.stringify(val) }
                //   });
                //    },
                //     handleAdd() {
                //    this.$router.push("/wowcherDealAdd");
                //    },
                  handleCheck(val){
                    this.$router.push({
                    name: "wowcherRpmList",
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
