<template>
    <div>
        <el-row>
            <el-col :span="12">
        <el-input v-model="value" @keyup.enter.native="handleSearch" style="width:50%;float:left">
            <el-button  style="width:100%;margin:0" @click="handleSearch" slot="append" type="text" icon="el-icon-search"></el-button>
        </el-input>
        </el-col>
        <br>
        <br>
        <br>
        <el-col>
               <el-table :data="tableData" v-loading="isTableLoading">   
                 <el-table-column width="80" label="addressLine1" prop="addressLine1"></el-table-column>
                 <el-table-column width="80" label="addressLine2" prop="addressLine2"></el-table-column>
                 <el-table-column width="80" label="agent" prop="agent"></el-table-column>
                 <el-table-column width="80" label="birthday" prop="birthday"></el-table-column>
                 <el-table-column width="80" label="city" prop="city"></el-table-column>
                 <el-table-column width="80" label="colour" prop="colour"></el-table-column>
                  <el-table-column width="80" label="country" prop="country"></el-table-column>
                  <el-table-column width="80" label="county" prop="county"></el-table-column>
                  <el-table-column width="80" label="currency" prop="currency"></el-table-column>
                  <el-table-column width="80" label="customField" prop="customField"></el-table-column>
                  <el-table-column width="80" label="customerName" prop="customerName"></el-table-column>
                  <el-table-column width="80" label="dealId" prop="dealId"></el-table-column>
                  <el-table-column width="80" label="dealTitle" prop="dealTitle"></el-table-column>
                  <el-table-column width="80" label="email" prop="email"></el-table-column>
                  <el-table-column width="80" label="houseNumber" prop="houseNumber"></el-table-column>
                  <el-table-column width="80" label="logistic" prop="logistic"></el-table-column>
                  <el-table-column width="80" label="marketingPermission" prop="marketingPermission"></el-table-column>
                  <el-table-column width="80" label="orderId" prop="orderId"></el-table-column>
                  <el-table-column width="80" label="orderStatus" prop="orderStatus"></el-table-column>
                  <el-table-column width="80" label="orderType" prop="orderType"></el-table-column>
                  <el-table-column width="80" label="phone" prop="phone"></el-table-column>
                  <el-table-column width="80" label="platformOrderId" prop="platformOrderId"></el-table-column>
                  <el-table-column width="80" label="postcode" prop="postcode"></el-table-column>
                  <el-table-column width="80" label="price" prop="price"></el-table-column>
                  <el-table-column width="80" label="productName" prop="productName"></el-table-column>
                  <el-table-column width="80" label="productOptoins" prop="productOptoins"></el-table-column>
                  <el-table-column width="80" label="quantity" prop="quantity"></el-table-column>
                  <el-table-column width="80" label="redeemedAt" prop="redeemedAt"></el-table-column>
                  <el-table-column width="80" label="shipoutTime" prop="shipoutTime"></el-table-column>
                  <el-table-column width="80" label="shippingMethod" prop="shippingMethod"></el-table-column>
                  <el-table-column width="80" label="sku" prop="sku"></el-table-column>
                  <el-table-column width="80" label="spec" prop="spec"></el-table-column>
                  <el-table-column width="80" label="trackingNo" prop="trackingNo"></el-table-column>
                  <el-table-column width="80" label="wowcherCode" prop="wowcherCode"></el-table-column>
        </el-table>
        </el-col>
        </el-row>
        <br>
        <br>
    
    </div>
</template>
<script>
import directiveDialog from "./dialog";
export default {
  data() {
    return {   
      value: "",
      tableData: [],
      isTableLoading: false,
      maxHeight: "",
    };
  },
  created() {
    this.maxHeight = document.scrollingElement.clientHeight / 1.5;
  },
  methods: {
    handleSearch() {
      this.isTableLoading = true;  
      this.axios({
        url: "http://61.216.178.44:8000/data-server/wowcher/search",
        method: "post",
        data: {
          value: this.value,
          token: this.token,
          type:'wowcherOrder'
        }
      }).then(res => {
        this.isTableLoading = false;
        this.tableData = this.loadsh.cloneDeep(res);
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

