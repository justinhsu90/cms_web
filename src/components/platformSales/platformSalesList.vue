<template>
    <div>
        <el-row>
            <el-col :span="22">
                <el-input class="w-max200 ibbox" placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch">
                </el-input>
                <el-select class="w-max150" placeholder="國家" v-model="searchCountry" @change="handleCondition('type')" clearable>
                    <el-option v-for="(v,i) in searchCountryOption" :key="'type'+i" :label="v" :value="v"></el-option>
                </el-select>
                <el-select class="w-max150" placeholder="平台" v-model="searchPlatform" @change="handleCondition('plat')" clearable>
                    <el-option v-for="(v,i) in searchPlatformOption" :key="'plat'+i" :label="v" :value="v"></el-option>
                </el-select>
                <el-select class="w-max150" placeholder="帳號" v-model="searchAccount" @change="handleCondition('acc')" clearable>
                    <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v" :value="v"></el-option>
                </el-select>
                <el-date-picker class="w-max260" clearable style="width:100%" @change="handleChange" value-format="yyyy-MM-dd" v-model="date" type="daterange" align="right" unlink-panels range-separator="~" start-placeholder="開始日期" end-placeholder="結束日期" :picker-options="pickerOptions">
                </el-date-picker>
                <div @click="handleSearch" class="el-input-group__append search">
                    <i class="el-icon-search"></i>
                </div>
            </el-col>
            <el-col :span="2">
                <el-button type="success" size="medium" @click="showImg = !showImg">{{showImg ? '隱藏':'顯示'}}圖片</el-button>
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                    <el-table-column min-width="50" label="SKU" prop="sku" sortable="custom"></el-table-column>
                    <el-table-column min-width="120" label="產品名稱" prop="productName" sortable="custom">
                    </el-table-column>
                    <el-table-column min-width="30" label="總數" prop="total" sortable="custom">
                    </el-table-column>
                    <el-table-column min-width="40" label="Wowcher" prop="wowcher" sortable="custom">
                    </el-table-column>
                    <el-table-column min-width="40" label="Amazon" prop="amazon" sortable="custom">                             
                    </el-table-column>
                    <el-table-column min-width="40" label="Cdiscount" prop="cdiscount" sortable="custom">
                    </el-table-column>
                    <el-table-column min-width="30" label="其他" prop="other" sortable="custom"> 
                    </el-table-column>
                    <el-table-column width="80" label="圖片" v-if="showImg">
                        <template slot-scope="{row}">
                             <img width="50" height="50" style="cursor:pointer" :src="row.imageUrl" @click="handleShowDialog(row.imageUrl)">
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-dialog title="圖片" :modal="false" :visible.sync="dialogVisible" width="30%">
                <img width="100%" :src="imageURL">
        </el-dialog>
    </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
import { format } from "@/common/until/format";
import moment from "moment";
export default {
  extends: wonTableContainer,
  data() {
    let end = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    let start = moment(Date.now() - 7 * 24 * 60 * 60 * 1000).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    console.log(end, start);
    return {
      showImg: false,
      dialogVisible: false,
      imageURL: "",
      date: [start, end],
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
      tableData: [],
      condition: [],
      isTableLoading: false,
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
        url: "/sold/search",
        method: "post",
        where: ""
      }
    };
  },
  created() {
    let purchasePlatform = axios({
      url: "/sold/value/platform",
      method: "post",
      data: {
        token: this.token
      }
    });
    let purchaseCountry = axios({
      url: "/sold/value/country",
      method: "post",
      data: {
        token: this.token
      }
    });
    let purchaseAccount = axios({
      url: "/sold/value/account",
      method: "post",
      data: {
        token: this.token
      }
    });
    Promise.all([purchasePlatform, purchaseCountry, purchaseAccount]).then(
      ([platform, type, account]) => {
        this.searchAccountOption = _.cloneDeep(account);
        this.searchPlatformOption = _.cloneDeep(platform);
        this.searchCountryOption = _.cloneDeep(type);
      }
    );
    this.handleSearch();
    this.Bus.$on("refresh", this.handleSearch);
  },
  filters: {
    ...format
  },
  methods: {
    handleSortChange(row) {
      if (row.order == "ascending") {
        this.tableData = _.orderBy(this.tableData, [`${row.prop}`], ["asc"]);
      }
      if (row.order == "descending") {
        this.tableData = _.orderBy(this.tableData, [`${row.prop}`], ["desc"]);
      }
    },
    handleShowDialog(url) {
      this.dialogVisible = true;
      this.imageURL = url;
    },
    handleSearch: _.debounce(function() {
      this.isTableLoading = true;
      let where = {
        where: this.fetchOption.where,
        token: this.token,
        skip: this.fetchCondition.skip,
        limit: this.fetchCondition.limit
      };
      if (this.condition.includes("1")) {
        where.platform = this.searchPlatform;
      }
      if (this.condition.includes("2")) {
        where.country = this.searchCountry;
      }
      if (this.condition.includes("3")) {
        where.account = this.searchAccount;
      }
      if (!_.isEmpty(this.date)) {
        where.startDate = this.date[0];
        where.endDate = this.date[1];
      }
      this.fetchTableData(where);
    }, 500),
    fetchEnd() {
      _.each(this.originRes, v => {
        v.total = v.wowcher + v.amazon + v.cdiscount + v.other;
      });
      this.tableData = this.originRes;
    },
    handleChange() {
      this.handleSearch();
    },
    handleEdit(val) {
      this.$router.push({
        name: "erpPurchaseEdit",
        query: { data: JSON.stringify(val) }
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
      this.handleSearch();
    }
  }
};
</script>

<style scoped>
</style>
