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
                 <el-table-column width="80" label="地址1" prop="addressLine1"></el-table-column>
                 <el-table-column width="80" label="地址2" prop="addressLine2"></el-table-column>
                 <el-table-column width="80" label="貨代" prop="agent"></el-table-column>
                 <el-table-column width="80" label="生日" prop="birthday"></el-table-column>
                 <el-table-column width="80" label="城市" prop="city"></el-table-column>
                 <el-table-column width="80" label="產品顏色" prop="colour"></el-table-column>
                  <el-table-column width="80" label="國家" prop="country"></el-table-column>
                  <el-table-column width="80" label="縣/省/州" prop="county"></el-table-column>
                  <el-table-column width="80" label="貨幣" prop="currency"></el-table-column>
                  <el-table-column width="80" label="customField" prop="customField"></el-table-column>
                  <el-table-column width="80" label="客戶姓名" prop="customerName"></el-table-column>
                  <el-table-column width="80" label="Deal ID" prop="dealId"></el-table-column>
                  <el-table-column width="80" label="Deal 名稱" prop="dealTitle"></el-table-column>
                  <el-table-column width="80" label="Email" prop="email"></el-table-column>
                  <el-table-column width="80" label="門牌號" prop="houseNumber"></el-table-column>
                  <el-table-column width="80" label="物流" prop="logistic"></el-table-column>
                  <el-table-column width="80" label="marketingPermission" prop="marketingPermission"></el-table-column>
                  <el-table-column width="80" label="貨代單號" prop="orderId"></el-table-column>
                  <el-table-column width="80" label="出貨狀態" prop="orderStatus"></el-table-column>
                  <el-table-column width="80" label="訂單裝態" prop="orderType"></el-table-column>
                  <el-table-column width="80" label="聯絡電話" prop="phone"></el-table-column>
                  <el-table-column width="80" label="貨代自訂單號" prop="platformOrderId"></el-table-column>
                  <el-table-column width="80" label="郵編" prop="postcode"></el-table-column>
                  <el-table-column width="80" label="售價" prop="price"></el-table-column>
                  <el-table-column width="80" label="產品名稱" prop="productName"></el-table-column>
                  <el-table-column width="80" label="產品選項" prop="productOptoins"></el-table-column>
                  <el-table-column width="80" label="數量" prop="quantity"></el-table-column>
                  <el-table-column width="80" label="訂單時間" prop="redeemedAt"></el-table-column>
                  <el-table-column width="80" label="發貨時間" prop="shipoutTime"></el-table-column>
                  <el-table-column width="80" label="運輸方式" prop="shippingMethod"></el-table-column>
                  <el-table-column width="80" label="SKU" prop="sku"></el-table-column>
                  <el-table-column width="80" label="規格" prop="spec"></el-table-column>
                  <el-table-column width="80" label="物流單號" prop="trackingNo"></el-table-column>
                  <el-table-column width="80" label="Ｗowcher Code" prop="wowcherCode"></el-table-column>
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
        console.log(res)
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
