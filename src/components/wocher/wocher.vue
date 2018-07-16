<template>
    <div>
        <el-row>
            <el-col :span="12">
        <el-input v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:50%;float:left">
            <el-button  style="width:100%;margin:0 " @click="handleSearch" slot="append" type="text" icon="el-icon-search"></el-button>
        </el-input>
        </el-col>
        <br>
        <br>
        <br>
        <el-col>
               <el-table  :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">   
                 <el-table-column min-width="80" label="addressLine1" prop="addressLine1"></el-table-column>
                 <el-table-column min-width="80" label="addressLine2" prop="addressLine2"></el-table-column>
                 <el-table-column min-width="80" label="agent" prop="agent" sortable="custom"></el-table-column>
                 <el-table-column min-width="80" label="birthday" prop="birthday"></el-table-column>
                 <el-table-column min-width="80" label="city" prop="city"></el-table-column>
                 <el-table-column min-width="80" label="colour" prop="colour"></el-table-column>
                  <el-table-column min-width="80" label="country" prop="country"></el-table-column>
                  <el-table-column min-width="80" label="county" prop="county"></el-table-column>
                  <el-table-column min-width="80" label="currency" prop="currency"></el-table-column>
                  <el-table-column min-width="80" label="customField" prop="customField"></el-table-column>
                  <el-table-column min-width="80" label="customerName" prop="customerName" sortable="custom"></el-table-column>
                  <el-table-column min-width="80" label="dealId" prop="dealId"></el-table-column>
                  <el-table-column min-width="80" label="dealTitle" prop="dealTitle"></el-table-column>
                  <el-table-column min-width="80" label="email" prop="email"></el-table-column>
                  <el-table-column min-width="80" label="houseNumber" prop="houseNumber"></el-table-column>
                  <el-table-column min-width="80" label="logistic" prop="logistic"></el-table-column>
                  <el-table-column min-width="80" label="marketingPermission" prop="marketingPermission"></el-table-column>
                  <el-table-column min-width="80" label="orderId" prop="orderId"></el-table-column>
                  <el-table-column min-width="80" label="orderStatus" prop="orderStatus" sortable="custom"></el-table-column>
                  <el-table-column min-width="80" label="orderType" prop="orderType" sortable="custom"></el-table-column>
                  <el-table-column min-width="80" label="phone" prop="phone" sortable="custom"></el-table-column>
                  <el-table-column min-width="80" label="platformOrderId" prop="platformOrderId"></el-table-column>
                  <el-table-column min-width="80" label="postcode" prop="postcode" sortable="custom"></el-table-column>
                  <el-table-column min-width="80" label="price" prop="price"></el-table-column>
                  <el-table-column min-width="80" label="productName" prop="productName"></el-table-column>
                  <el-table-column min-width="80" label="productOptoins" prop="productOptoins"></el-table-column>
                  <el-table-column min-width="80" label="quantity" prop="quantity"></el-table-column>
                  <el-table-column min-width="80" label="redeemedAt" prop="redeemedAt" sortable="custom"></el-table-column>
                  <el-table-column min-width="80" label="shipoutTime" prop="shipoutTime"></el-table-column>
                  <el-table-column min-width="80" label="shippingMethod" prop="shippingMethod" sortable="custom"></el-table-column>
                  <el-table-column min-width="80" label="sku" prop="sku"></el-table-column>
                  <el-table-column min-width="80" label="spec" prop="spec"></el-table-column>
                  <el-table-column min-width="80" label="trackingNo" prop="trackingNo" sortable="custom"></el-table-column>
                  <el-table-column min-width="80" label="wowcherCode" prop="wowcherCode" sortable="custom"></el-table-column>
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
      isTableLoading: false,
      maxHeight: "",
      fetchCondition: {
        skip: 0,
        limit: 10,
        order: "city"
      },
      fetchOption: {
        url: "http://api.myfbmanage.com:8000/data-server/wowcher/order/search",
        where: "",
        method: "post"
      }
    };
  },
  created() {
    this.handleSearch();
  },
  methods: {
      handleSearch:_.debounce(function(){
         this.isTableLoading = true;
       axios({
         url: this.fetchOption.url,
         method: this.fetchOption.method,
         data: {
          where: this.fetchOption.where,
          token: this.token,
          skip: this.fetchCondition.skip,
          limit: this.fetchCondition.limit,
          order: this.fetchCondition.order
        }
        }).then(({data,count}) => {
        this.isTableLoading = false;
        this.tableData = _.cloneDeep(data);
        this.total = count;
      });
      },500)
     
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
