<template>
  <div>
    <el-row>
      <el-col :span="22">
        <el-input placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:15%;float:left">
        </el-input>
        <div style="margin-left:5px;display:inline-block;width:140px">
          <el-select placeholder="採購類型" v-model="searchType" @change="handleCondition('type')" clearable>
            <el-option v-for="(v,i) in searchTypeOption" :key="'type'+i" :label="v" :value="v"></el-option>
          </el-select>
        </div>
        <div style="margin-left:5px;display:inline-block;width:140px">
          <el-select placeholder="採購平台" v-model="searchPlatform" @change="handleCondition('plat')" clearable>
            <el-option v-for="(v,i) in searchPlatformOption" :key="'plat'+i" :label="v" :value="v"></el-option>
          </el-select>
        </div>
        <div style="margin-left:5px;display:inline-block;width:140px">
          <el-select placeholder="採購帳號" v-model="searchAccount" @change="handleCondition('acc')" clearable>
            <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v" :value="v"></el-option>
          </el-select>
        </div>
        <div style="margin-left:5px;display:inline-block;width:280px">
          <el-date-picker clearable style="width:100%" @change="handleChange" value-format="yyyy-MM-dd" v-model="date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div style="cursor:pointer;display: inline-block;width: 14px;height: 35px;text-align: center;border: 1px solid #dcdfe6;border-radius: 4px;line-height: 35px;" @click="handleSearch" class="el-input-group__append">
          <i class="el-icon-search"></i>
        </div>
      </el-col>
      <el-col :span="2">
        <el-button style="float:right" @click="handleAdd" type="primary">新增採購</el-button>
      </el-col>
      <el-col class="mt5">
        <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
          <el-table-column min-width="50" label="採購單號" prop="purchaseId" sortable="custom"></el-table-column>
          <el-table-column min-width="50" label="採購時間" prop="purchasedTime" sortable="custom"></el-table-column>
          <el-table-column min-width="25" label="類型" prop="purchaseType"></el-table-column>
          <el-table-column min-width="30" label="數量" prop="purchasedQuantity"></el-table-column>
          <el-table-column min-width="50" label="SKU" prop="sku"></el-table-column>
          <el-table-column min-width="120" label="產品名稱" prop="productName"></el-table-column>
          <el-table-column min-width="40" label="採購平台" prop="purchasedPlatform"></el-table-column>

          <!-- <el-table-column min-width="60" label="採購帳號" prop="purchasedAccount"></el-table-column> -->
          <!-- <el-table-column min-width="50" label="單價" prop="productCost">
                <template slot-scope="scope">
              {{scope.row.productCost | formatToMoney}}&nbsp;{{scope.row.currency}}
            </template>
          </el-table-column> -->
          <el-table-column min-width="50" label="總金額" prop="purchasedTotalAmount">
            <template slot-scope="scope">
              {{scope.row.purchasedTotalAmount | formatToMoney}}&nbsp;{{scope.row.currency}}
            </template>
          </el-table-column>
          <el-table-column min-width="30" label="採購人" prop="purchasedBy"></el-table-column>
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
           date:[],
           pickerOptions:{
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
            ]},
            tableData: [],
            maxHeight: 450,
            condition: [],
            isTableLoading: false,
            searchAccount: "",
            searchPlatform: "",
            searchType: "",
            searchAccountOption: [],
            searchPlatformOption: [],
            searchTypeOption: [],
            fetchCondition: {
                skip: 0,
                limit: 15,
                order: "-lastUpdatedTime"
            },
            fetchOption: {
                url: "/purchase/search",
                method: "post",
                where: ""
            }
        };
    },
    created() {
        let purchasePlatform = axios({
            url: "/erp/value/purchasePlatform",
            method: "post",
            data: {
                token: this.token
            }
        });
        let purchaseType = axios({
            url: "/erp/value/purchaseType",
            method: "post",
            data: {
                token: this.token
            }
        });
        let purchaseAccount = axios({
            url: "/erp/value/purchaseAccount",
            method: "post",
            data: {
                token: this.token
            }
        });
        Promise.all([purchasePlatform, purchaseType, purchaseAccount]).then(
            ([platform, type, account]) => {
                this.searchAccountOption = _.cloneDeep(account);
                this.searchPlatformOption = _.cloneDeep(platform);
                this.searchTypeOption = _.cloneDeep(type);
            }
        );
        this.handleSearch();
        this.Bus.$on("refresh", this.handleSearch);
    },
    filters:{
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
                data.purchasePlatform = this.searchPlatform;
            }
            if (this.condition.includes("2")) {
                data.purchaseType = this.searchType;
            }
            if (this.condition.includes("3")) {
                data.purchaseAccount = this.searchAccount;
            }
            if(!_.isEmpty(this.date)){
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
        handleChange(n){
          this.handleSearch();
        },
        handleEdit(val) {
            this.$router.push({
                name: "erpPurchaseEdit",
                query: { data: JSON.stringify(val) }
            });
        },
        handleAdd() {
            this.$router.push("/erpPurchaseAdd");
        },
        handleCondition(sign) {
            if (sign == "plat") {
                if (!this.searchPlatform) {
                    _.pull(this.condition, "1");
                } else {
                    if(!this.condition.includes('1')){
                       this.condition.push("1");
                    }
                }
            }
            if (sign == "type") {
                if (!this.searchType) {
                    _.pull(this.condition, "2");
                } else {
                    if(!this.condition.includes('2')){
                       this.condition.push("2");
                    }
                }
            }
            if (sign == "acc") {
                if (!this.searchAccount) {
                    _.pull(this.condition, "3");
                } else {
                    if(!this.condition.includes('3')){
                       this.condition.push("3");
                    }
                }
            }
            this.handleSearch();
        }
    }
};
</script>

<style scoped>

</style>
