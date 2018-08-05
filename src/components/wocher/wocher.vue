<template>
    <div>
        <el-row>
            <el-col :span="24">
          <el-input v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:22%;float:left">
            <el-button  style="width:100%;margin:0 " @click="handleSearch" slot="append" type="text" icon="el-icon-search"></el-button>
        </el-input>
          <div style="margin-left:5px;display:inline-block;width:140px">
          <el-select placeholder="帳號" v-model="searchAccount" @change="handleCondition('acc')" clearable>
                <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v.account" :value="v.account"></el-option>
            </el-select>
         </div>
          <div style="display:inline-block;width:140px">
          <el-select  placeholder="订单状态" v-model="searchOrderstatus" @change="handleCondition('status')" clearable>
                <el-option v-for="(v,i) in searchOrderstatusOption" :key="'plat'+i" :label="v.name" :value="v.name"></el-option>
            </el-select>
         </div>
         <div style="display:inline-block;width:140px">
          <el-select  placeholder="國家" v-model="searchCountry"  @change="handleCondition('cou')" clearable>
                <el-option v-for="(v,i) in searchCountryOption" :key="'country'+i" :label="v.countryCode" :value="v.countryName" >
                   <span style="float: left">{{ v.countryCode }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryName }}</span>
                </el-option>
            </el-select>
         </div>
         <div style="display:inline-block;width:140px">
          <el-select placeholder="订单类型"  v-model="searchOrdertype" @change="handleCondition('type')" clearable> 
                <el-option v-for="(v,i) in searchOrdertypeOption" :key="'languate'+i" :value="v.name">
                </el-option>
            </el-select>
         </div>
         <div  style="cursor:pointer;display: inline-block;width: 14px;height: 35px;text-align: center;border: 1px solid #dcdfe6;border-radius: 4px;line-height: 35px;"  @click="handleSearch" class="el-input-group__append"><i class="el-icon-search"></i></div>
         </el-col>    
        <br>
        <br>
        <br>
        <el-col>
               <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">   
                 <!-- <el-table-column min-width="80" label="addressLine1" prop="addressLine1"></el-table-column>
                 <el-table-column min-width="80" label="addressLine2" prop="addressLine2"></el-table-column> -->
                 <el-table-column min-width="100" label="wowcherCode" prop="wowcherCode" sortable="custom"></el-table-column>
                 <el-table-column min-width="100" label="redeemedAt" prop="redeemedAt" sortable="custom"></el-table-column>
                  <el-table-column min-width="95" label="orderStatus" prop="orderStatus" sortable="custom"></el-table-column>
                  <el-table-column min-width="80" label="orderType" prop="orderType" sortable="custom"></el-table-column>
                  <el-table-column min-width="100" label="productName" prop="productName"></el-table-column>
                  <el-table-column min-width="80" label="customerName" prop="customerName" sortable="custom"></el-table-column>
                  <el-table-column min-width="80" label="shipoutTime" prop="shipoutTime"></el-table-column>
                  <el-table-column min-width="80" label="trackingNo" prop="trackingNo" sortable="custom"></el-table-column>
                 <el-table-column min-width="60" label="agent" prop="agent" sortable="custom"></el-table-column>
                 <el-table-column width="80" label="動作"   fixed="right">
                   <template slot-scope="scope">
                    <el-button type="text" title="查看" icon="el-icon-won-40" @click="handleCheck(scope.row)"></el-button>
                   </template>
               </el-table-column> 
                 <!-- <el-table-column min-width="80" label="birthday" prop="birthday"></el-table-column>
                 <el-table-column min-width="80" label="city" prop="city"></el-table-column>
                 <el-table-column min-width="80" label="colour" prop="colour"></el-table-column>
                  <el-table-column min-width="80" label="country" prop="country"></el-table-column>
                  <el-table-column min-width="80" label="currency" prop="currency"></el-table-column>
                  <el-table-column min-width="80" label="customField" prop="customField"></el-table-column> -->
                
                  <!-- <el-table-column min-width="80" label="dealId" prop="dealId"></el-table-column>
                  <el-table-column min-width="80" label="dealTitle" prop="dealTitle"></el-table-column>
                  <el-table-column min-width="80" label="email" prop="email"></el-table-column>
                  <el-table-column min-width="80" label="houseNumber" prop="houseNumber"></el-table-column>
                  <el-table-column min-width="80" label="logistic" prop="logistic"></el-table-column>
                  <el-table-column min-width="80" label="marketingPermission" prop="marketingPermission"></el-table-column>
                  <el-table-column min-width="80" label="orderId" prop="orderId"></el-table-column> -->
                 
                 
                  <!-- <el-table-column min-width="80" label="phone" prop="phone" sortable="custom"></el-table-column>
                  <el-table-column min-width="80" label="platformOrderId" prop="platformOrderId"></el-table-column>
                  <el-table-column min-width="80" label="postcode" prop="postcode" sortable="custom"></el-table-column> -->
                  <!-- <el-table-column min-width="80" label="price" prop="price"></el-table-column>
                  <el-table-column min-width="80" label="productOptoins" prop="productOptoins"></el-table-column>
                  <el-table-column min-width="80" label="quantity" prop="quantity"></el-table-column> -->
                
                  
                  <!-- <el-table-column min-width="80" label="shippingMethod" prop="shippingMethod" sortable="custom"></el-table-column>
                  <el-table-column min-width="80" label="sku" prop="sku"></el-table-column>
                  <el-table-column min-width="80" label="spec" prop="spec"></el-table-column> -->
                
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
        url: "/wowcher/order/search",
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
    let orderstatus = axios({
      url: "/wowcher/value/orderstatus",
      method: "post",
      data: {
        token: this.token
      }
    });
    let ordertype = axios({
      url: "/wowcher/value/ordertype",
      method: "post",
      data: {
        token: this.token
      }
    });
    Promise.all([account, country, orderstatus, ordertype]).then(
      ([account,country,orderstatus,ordertype]) => {
        this.searchAccountOption = _.cloneDeep(account.data);
        this.searchCountryOption = _.cloneDeep(country.data);
        this.searchOrderstatusOption = _.cloneDeep(orderstatus.data);
        this.searchOrdertypeOption = _.cloneDeep(ordertype.data);
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
      if (sign == "status") {
        if (!this.searchOrderstatus) {
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
      if (sign == "type") {
        if (!this.searchOrdertype) {
          _.pull(this.condition, "4");
        } else {
          this.condition.push("4");
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
      if (this.condition.includes("2")) {
        data.orderstatus = this.searchOrderstatus;
      }
      if (this.condition.includes("3")) {
        data.country = this.searchCountry;
      }
      if (this.condition.includes("4")) {
        data.ordertype = this.searchOrdertype;
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
      handleCheck(val){
        this.$router.push({
        name: "wocherEdit",
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
