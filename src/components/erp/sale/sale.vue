<template>
    <div>
        <el-row>
        <el-col :span="22">
        <el-input  placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:15%;float:left">
        </el-input>
         <div style="margin-left:5px;display:inline-block;width:140px">
          <el-select placeholder="銷貨國家" v-model="searchAccount" @change="handleCondition('acc')" clearable>
                <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v" :value="v"></el-option>
            </el-select>
         </div>
         <div style="margin-left:5px;display:inline-block;width:140px">
          <el-select placeholder="銷貨平台" v-model="searchAccount" @change="handleCondition('acc')" clearable>
                <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v" :value="v"></el-option>
            </el-select>
         </div>
         <div style="margin-left:5px;display:inline-block;width:140px">
          <el-select placeholder="銷貨帳號" v-model="searchAccount" @change="handleCondition('acc')" clearable>
                <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v" :value="v"></el-option>
            </el-select>
         </div>
         <div style="margin-left:5px;display:inline-block;width:140px">
          <el-select placeholder="開始日期" v-model="searchAccount" @change="handleCondition('acc')" clearable>
                <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v" :value="v"></el-option>
            </el-select>
         </div>
          <div style="margin-left:5px;display:inline-block;width:140px">
          <el-select placeholder="結束日期" v-model="searchAccount" @change="handleCondition('acc')" clearable>
                <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v" :value="v"></el-option>
            </el-select>
         </div>
         <div  style="cursor:pointer;display: inline-block;width: 14px;height: 35px;text-align: center;border: 1px solid #dcdfe6;border-radius: 4px;line-height: 35px;"  @click="handleSearch" class="el-input-group__append"><i class="el-icon-search"></i></div>
        </el-col>
        <el-col :span="2">
            <el-button style="float:right" @click="handleAdd"  type="primary" >新增採購</el-button>
        </el-col>
        <el-col class="mt5">
               <el-table   ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">   
                 <el-table-column min-width="60" label="銷貨單號" prop="saleId" sortable="custom"></el-table-column>
                 <el-table-column min-width="55" label="銷貨時間" prop="saleTime" sortable="custom"></el-table-column>
                 <!-- <el-table-column min-width="40" label="銷貨類型" prop="saleType"></el-table-column> -->
                 <el-table-column min-width="35" label="數量" prop="saleQuantity"></el-table-column>
                 <el-table-column min-width="70" label="SKU" prop="sku"></el-table-column>
                  <el-table-column min-width="110" label="產品名稱" prop="productName" ></el-table-column>
                  <el-table-column min-width="40" label="銷貨平台" prop="salePlatform"></el-table-column>
                  <el-table-column min-width="40" label="銷貨帳號" prop="saleAccount"></el-table-column>
                  <el-table-column min-width="55" label="出貨倉庫" prop="saleWarehouse"></el-table-column>
                  <el-table-column min-width="40" label="幣別" prop="currency"></el-table-column>
                  <el-table-column min-width="55" label="總金額" prop="saleTotalAmount">
                         <template slot-scope="scope">
              {{scope.row.purchasedTotalAmount | formatToYuan}}&nbsp;{{scope.row.currency}}
                          </template>
                  </el-table-column>
                  <el-table-column width="50" label="動作" align="center">
                    <template slot-scope="scope">
                       <el-button class="btnh" type="text" title="編輯" icon="el-icon-won-1" @click="handleEdit(scope.row)"></el-button>
                    </template>
                  </el-table-column>
        </el-table> 
        </el-col>
           <div style="float:right;margin-top:5px">
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
      searchLanguage:'',
      searchLanguageOption:[{countryCode:'是',countryNameChinese:true},{countryCode:'否',countryNameChinese:false}],
      fetchCondition: {
        skip: 0,
        limit: 15,
        order: "-lastUpdatedTime"
      },
      fetchOption: {
        url: "/purchase/search",
        method: "post",
        where:""
      },
    };
  },
  created() {
    let account = axios({
      url:'/purchasequery/value/purchasetype',
      method:'post',
      data:{
        token:this.token
      }  
    })
    Promise.all([account]).then(([account])=>{
        this.searchAccountOption = _.cloneDeep(account.data);
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
        data.purchasetype = this.searchAccount;
      }
      if(this.condition.includes('2')){
        data.isPurchased  = this.searchLanguage;
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
        name: "erpPurchaseEdit",
        query: { data: JSON.stringify(val) },
      });
    },
    handleAdd(){
        this.$router.push('/erpPurchaseAdd');
    },
    handleCondition(sign){
      if(sign == "acc"){
        if(!this.searchAccount){
          _.pull(this.condition, '1');
        }else{
          this.condition.push('1');
        }
      }
      if(sign == "lang"){
        if(!this.searchLanguage){
          _.pull(this.condition, '2');   
        }else{
          this.condition.push('2');
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
