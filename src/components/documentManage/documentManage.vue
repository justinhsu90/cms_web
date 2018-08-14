<template>
    <div>
        <el-row>
        <el-col :span="24">
        <el-input  placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:22%;float:left">
        </el-input>
         <div style="margin-left:5px;display:inline-block;width:140px">
          <el-select placeholder="帳號" v-model="searchAccount" @change="handleCondition('acc')" clearable>
                <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v.account" :value="v.account"></el-option>
            </el-select>
         </div>
          <div style="display:inline-block;width:140px">
          <el-select  placeholder="平台" v-model="searchPlatform" @change="handleCondition('plat')" clearable>
                <el-option v-for="(v,i) in searchPlatformOption" :key="'plat'+i" :label="v.platform" :value="v.platform"></el-option>
            </el-select>
         </div>
         <div style="display:inline-block;width:140px">
          <el-select  placeholder="國家" v-model="searchCountry"  @change="handleCondition('cou')" clearable>
                <el-option v-for="(v,i) in searchCountryOption" :key="'country'+i" :label="v.countryCode" :value="v.countryNameChinese" >
                   <span style="float: left">{{ v.countryCode }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryNameChinese }}</span>
                </el-option>
            </el-select>
         </div>
         <div style="display:inline-block;width:140px">
          <el-select placeholder="語言"  v-model="searchLanguage" @change="handleCondition('lang')" clearable> 
                <el-option v-for="(v,i) in searchLanguageOption" :key="'languate'+i" :value="v.languageName">
                  <span style="float: left">{{ v.languageCode }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ v.languageName }}</span>
                </el-option>
            </el-select>
         </div>   
         <div  style="cursor:pointer;display: inline-block;width: 14px;height: 35px;text-align: center;border: 1px solid #dcdfe6;border-radius: 4px;line-height: 35px;"  @click="handleSearch" class="el-input-group__append"><i class="el-icon-search"></i></div>
         <el-button style="float:right" @click="handleAdd"  type="primary" >新增文案</el-button>
        </el-col>
        <br>
        <br>
        <br>
        <el-col>
               <el-table   ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">   
                 <el-table-column  min-width="80" label="更新時間" prop="lastUpdatedTime" sortable="custom"></el-table-column>
                 <el-table-column min-width="120" label="Content ID" prop="contentId" sortable="custom"></el-table-column>
                 <el-table-column min-width="75" label="平台" prop="platform" sortable="custom"></el-table-column>
                 <el-table-column min-width="75" label="語言" prop="language" sortable="custom"></el-table-column>
                 <!-- <el-table-column min-width="60" label="國家" prop="country" sortable="custom"></el-table-column> -->
                 <!-- <el-table-column min-width="90" label="帳號" prop="account" sortable="custom"></el-table-column> -->
                  <el-table-column min-width="80" label="SKU" prop="sku" sortable="custom"></el-table-column>
                  <el-table-column min-width="200" label="產品標題" prop="title"></el-table-column>
                  <!-- <el-table-column min-width="50" label="啟用" prop="enable">
                      <template slot-scope="scope">
                            <el-tag  v-if="scope.row.enable" type="success">true</el-tag>
                            <el-tag  v-else type="info">false</el-tag>
                      </template>
                  </el-table-column> -->
                  <el-table-column width="100" label="動作" align="center">
                    <template slot-scope="scope">
                       <el-button type="text" title="編輯" icon="el-icon-won-1" @click="handleEdit(scope.row)"></el-button>
                       <el-button type="text" title="複製" icon="el-icon-won-124" @click="handleCopy(scope.row)"></el-button>
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
  extends: wonTableContainer,
  data() {
    return {
      tableData: [],
      maxHeight: 450,
      condition: [],
      isTableLoading: false,
      searchAccount: "",
      searchAccountOption: [],
      searchPlatform: "",
      searchPlatformOption: [],
      searchCountry: "",
      searchCountryOption: [],
      searchLanguage: "",
      searchLanguageOption: [],
      fetchCondition: {
        skip: 0,
        limit: 10,
        order: "-lastUpdatedTime"
      },
      fetchOption: {
        url: "/content/search",
        method: "post",
        where: ""
      }
    };
  },
  created() {
    let account = axios({
      url: "/content/value/account",
      method: "post",
      data: {
        token: this.token
      }
    });
    let platform = axios({
      url: "/content/value/platform",
      method: "post",
      data: {
        token: this.token
      }
    });
    let country = axios({
      url: "/content/value/country",
      method: "post",
      data: {
        token: this.token
      }
    });
    let language = axios({
      url: "/content/value/language",
      method: "post",
      data: {
        token: this.token
      }
    });
    Promise.all([account, platform, country, language]).then(
      ([account, platform, country, language]) => {
        this.searchAccountOption = _.cloneDeep(account.data);
        this.searchPlatformOption = _.cloneDeep(platform.data);
        this.searchCountryOption = _.cloneDeep(country.data);
        this.searchLanguageOption = _.cloneDeep(language.data);
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
        data.account = this.searchAccount;
      }
      if (this.condition.includes("2")) {
        data.platform = this.searchPlatform;
      }
      if (this.condition.includes("3")) {
        data.country = this.searchCountry;
      }
      if (this.condition.includes("4")) {
        data.language = this.searchLanguage;
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
        name: "documentEdit",
        query: { data: JSON.stringify(val) }
      });
    },
    handleDelete(val) {
      this.$confirm("是否删除", "提示", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            url: "/content/remove",
            method: "post",
            data: {
              value:val.contentId,
              token: this.token
            }
          }).then(()=>{
            this.handleSearch();
            this.$message.success('删除成功');
          })
        })
        .catch(() => {});
    },
    handleCopy(val) {
      this.$router.push({
        name: "documentEdit",
        query: { data: JSON.stringify(val), type: "copy" }
      });
    },
    handleAdd() {
      this.$router.push("/documentAdd");
    },
    handleCondition(sign) {
      if (sign == "acc") {
        if (!this.searchAccount) {
          _.pull(this.condition, "1");
        } else {
          this.condition.push("1");
        }
      }
      if (sign == "plat") {
        if (!this.searchPlatform) {
          _.pull(this.condition, "2");
        } else {
          this.condition.push("2");
        }
      }
      if (sign == "cou") {
        if (!this.searchCountry) {
          _.pull(this.condition, "3");
        } else {
          this.condition.push("3");
        }
      }
      if (sign == "lang") {
        if (!this.searchLanguage) {
          _.pull(this.condition, "4");
        } else {
          this.condition.push("4");
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
