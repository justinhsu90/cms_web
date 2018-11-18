<template>
  <div>
    <el-row>
      <el-col :span="22">
        <el-input placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:20%;float:left">
        </el-input>
        <div style="margin-left:5px;display:inline-block;width:140px">
          <el-select placeholder="樣品" v-model="searchAccount" @change="handleCondition('acc')" clearable>
            <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v.account" :value="v.account"></el-option>
          </el-select>
        </div>
        <div style="display:inline-block;width:140px">
          <el-select placeholder="購買" v-model="searchLanguage" @change="handleCondition('lang')" clearable>
            <el-option v-for="(v,i) in searchLanguageOption" :key="'country'+i" :label="v.countryCode" :value="v.countryNameChinese">
            </el-option>
          </el-select>
        </div>
        <div @click="handleSearch" class="el-input-group__append search">
          <i class="el-icon-search"></i>
        </div>
      </el-col>
      <el-col :span="2">
        <el-button style="float:right" @click="handleAdd" type="primary">新增採購需求單</el-button>
      </el-col>
      <el-col class="mt5">
        <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
          <!-- <el-table-column min-width="75" label="更新時間" prop="lastUpdatedTime" sortable="custom"></el-table-column> -->
          <el-table-column min-width="75" label="新增時間" prop="queryTime"></el-table-column>
          <el-table-column min-width="80" label="採購需求單號" prop="purchaseQueryId"></el-table-column>
          <el-table-column min-width="75" label="採購單號" prop="purchaseId"></el-table-column>
          <el-table-column min-width="60" label="採購類型" prop="purchaseType"></el-table-column>
          <el-table-column min-width="75" label="需採購數量" prop="queryQuantity"></el-table-column>
          <el-table-column min-width="75" label="SKU" prop="sku"></el-table-column>
          <el-table-column min-width="75" label="產品名稱" prop="productName"></el-table-column>
          <el-table-column min-width="75" label="產品規格" prop="productSpec"></el-table-column>
          <!-- <el-table-column min-width="75" label="新增人" prop="addedBy"></el-table-column> -->
          <!-- <el-table-column min-width="75" label="最後編輯" prop="lastModifiedBy"></el-table-column> -->
          <!-- <el-table-column min-width="60" label="備註" prop="note"></el-table-column> -->
          <el-table-column min-width="60" label="已購買" prop="enable">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.isPurchased" type="success">true</el-tag>
              <el-tag v-else type="info">false</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="90" label="動作" align="center">
            <template slot-scope="scope">
              <el-button class="btnh" type="text" title="編輯" icon="el-icon-won-1" @click="handleEdit(scope.row)"></el-button>
              <el-button class="btnh" type="text" title="轉採購單" icon="el-icon-won-139" @click="handleTransfer(scope.row)"></el-button>
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
            maxHeight: 450,
            condition: [],
            isTableLoading: false,
            searchAccount: "",
            searchAccountOption: [],
            searchLanguage: "",
            searchLanguageOption: [
                { countryCode: "是", countryNameChinese: true },
                { countryCode: "否", countryNameChinese: false }
            ],
            fetchCondition: {
                skip: 0,
                limit: 15,
                order: "-lastUpdatedTime"
            },
            fetchOption: {
                url: "/purchasequery/search",
                method: "post",
                where: ""
            }
        };
    },
    created() {
        let account = axios({
            url: "/purchasequery/value/purchasetype",
            method: "post",
            data: {
                token: this.token
            }
        });
        Promise.all([account]).then(([account]) => {
            this.searchAccountOption = _.cloneDeep(account.data);
        });
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
                limit: this.fetchCondition.limit
            };
            if (this.condition.includes("1")) {
                data.purchaseType = this.searchAccount;
            }
            if (this.condition.includes("2")) {
                data.isPurchased = this.searchLanguage;
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
                name: "purchaEdit",
                query: { data: JSON.stringify(val) }
            });
        },
        handleTransfer(val){
            this.$router.push({
                path: "/erpPurchaseAdd",
                query: { data: JSON.stringify(val), transfer:'transfer'}
            });
        },
        handleAdd() {
            this.$router.push("/purchaAdd");
        },
        handleCondition(sign) {
            if (sign == "acc") {
                if (!this.searchAccount) {
                    _.pull(this.condition, "1");
                } else {
                    if(!this.condition.includes('1')){
                       this.condition.push("1");
                    }
                }
            }
            if (sign == "lang") {
                if (!this.searchLanguage) {
                    _.pull(this.condition, "2");
                } else {
                    if(!this.condition.includes('2')){
                       this.condition.push("2");
                    }
                }
            }
            this.handleSearch();
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
