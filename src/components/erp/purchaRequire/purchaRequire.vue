<template>
    <div>
        <el-row>
        <el-col :span="22">
        <el-input  placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:20%;float:left">
        </el-input>
         <div style="margin-left:5px;display:inline-block;width:140px">
          <el-select placeholder="樣品" v-model="searchAccount" @change="handleCondition('acc')" clearable>
                <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v.account" :value="v.account"></el-option>
            </el-select>
         </div>
          <div style="display:inline-block;width:140px">
          <el-select  placeholder="採購" v-model="searchPlatform" @change="handleCondition('plat')" clearable>
                <el-option v-for="(v,i) in searchPlatformOption" :key="'plat'+i" :label="v.platform" :value="v.platform"></el-option>
            </el-select>
         </div>
         <div style="display:inline-block;width:140px">
          <el-select  placeholder="耗材" v-model="searchCountry"  @change="handleCondition('cou')" clearable>
                <el-option v-for="(v,i) in searchCountryOption" :key="'country'+i" :label="v.countryCode" :value="v.countryNameChinese" >
                   <span style="float: left">{{ v.countryCode }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryNameChinese }}</span>
                </el-option>
            </el-select>
         </div>
         <div style="display:inline-block;width:140px">
          <el-select  placeholder="购买" v-model="searchLanguage"  @change="handleCondition('lang')" clearable>
                <el-option v-for="(v,i) in searchLanguageOption" :key="'country'+i" :label="v.countryCode" :value="v.countryNameChinese" >
                </el-option>
            </el-select>
         </div> 
         <div  style="cursor:pointer;display: inline-block;width: 14px;height: 35px;text-align: center;border: 1px solid #dcdfe6;border-radius: 4px;line-height: 35px;"  @click="handleSearch" class="el-input-group__append"><i class="el-icon-search"></i></div>
        </el-col>
        <el-col :span="2">
            <el-button style="float:right" @click="handleAdd"  type="primary" >新增採購需求單</el-button>
        </el-col>
        <br>
        <br>
        <br>
        <el-col>
               <el-table   ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">   
                 <el-table-column  min-width="75" label="更新時間" prop="lastUpdatedTime" sortable="custom"></el-table-column>
                 <el-table-column min-width="75" label="queryTime" prop="queryTime"></el-table-column>
                 <el-table-column min-width="75" label="purchaseQueryId" prop="purchaseQueryId" ></el-table-column>
                 <el-table-column min-width="75" label="purchaseId" prop="purchaseId"></el-table-column>
                 <el-table-column min-width="60" label="purchaseType" prop="purchaseType"></el-table-column>
                 <el-table-column min-width="90" label="queryQuantity" prop="queryQuantity"></el-table-column>
                  <el-table-column min-width="75" label="SKU" prop="sku"></el-table-column>
                  <el-table-column min-width="75" label="productName" prop="productName"></el-table-column>
                  <el-table-column min-width="75" label="productSpec" prop="productSpec"></el-table-column>
                  <el-table-column min-width="75" label="addedBy" prop="addedBy"></el-table-column>
                  <el-table-column min-width="90" label="lastModifiedBy" prop="lastModifiedBy"></el-table-column>
                  <el-table-column min-width="120" label="note" prop="note"></el-table-column>
                  <el-table-column min-width="60" label="啟用" prop="enable">
                      <template slot-scope="scope">
                            <el-tag  v-if="scope.row.isPurchased" type="success">true</el-tag>
                            <el-tag  v-else type="info">false</el-tag>
                      </template>
                  </el-table-column>
                  <el-table-column width="80" label="動作" align="center">
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
      maxHeight: 450,
      condition:[],
      isTableLoading: false,
      searchAccount:'',
      searchAccountOption:[],
      searchPlatform:'',
      searchPlatformOption:[],
      searchCountry:'',
      searchCountryOption:[],
      searchLanguage:'',
      searchLanguageOption:[{countryCode:'是',countryNameChinese:true},{countryCode:'否',countryNameChinese:false}],
      fetchCondition: {
        skip: 0,
        limit: 10,
        order: "-lastUpdatedTime"
      },
      fetchOption: {
        url: "/purchasequery/search",
        method: "post",
        where:""
      },
    };
  },
  created() {
    let account = axios({
      url:'/content/value/account',
      method:'post',
      data:{
        token:this.token
      }  
    })
    let platform = axios({
      url:'/content/value/platform',
      method:'post',
      data:{
        token:this.token
      }  
    })
    let country = axios({
      url:'/content/value/country',
      method:'post',
      data:{
        token:this.token
      }  
    })
    Promise.all([account,platform,country]).then(([account,platform,country])=>{
        this.searchAccountOption = _.cloneDeep(account.data);
        this.searchPlatformOption = _.cloneDeep(platform.data);
        this.searchCountryOption = _.cloneDeep(country.data);
    })
    this.handleSearch();
    this.Bus.$on('refresh',this.handleSearch);
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
        }
      if(this.condition.includes('1')){
        data.purchaseType = this.searchAccount;
      }
      if(this.condition.includes('2')){
         data.purchaseType = this.searchPlatform;
        
      }
      if(this.condition.includes('4')){
        data.isPaid = this.searchLanguage;
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
        query: { data: JSON.stringify(val) },
      });
    },
    handleAdd(){
        this.$router.push('/purchaAdd');
    },
    handleCondition(sign){
      if(sign == "acc"){
        if(!this.searchAccount){
          _.pull(this.condition, '1');
        }else{
          this.condition.push('1');
        }
      }
      if(sign == "plat"){
        if(!this.searchPlatform){
          _.pull(this.condition, '2');
        }else{
          this.condition.push('2');
        }
      }
      if(sign == "cou"){
        if(!this.searchCountry){
          _.pull(this.condition, '3'); 
        }else{
          this.condition.push('3');
        }
      }
      if(sign == "lang"){
        if(!this.searchLanguage){
          _.pull(this.condition, '4');   
        }else{
          this.condition.push('4');
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
