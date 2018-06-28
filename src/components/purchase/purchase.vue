<template>

    <div id="table">
        <el-row>
            <el-col :span="12">
        <el-input     v-model="value" @keyup.enter.native="handleSearch" style="width:50%;float:left">
            <el-button  style="width:100%;margin:0" @click="handleSearch" slot="append" type="text" icon="el-icon-search"></el-button>
        </el-input>
        <el-popover
  placement="top-start"
  title="搜索"
  width="200"
  trigger="hover"
  content="Search SKU, NEW SKU, Product Name, Deprecated SKU 字段">
  <el-button slot="reference" >提示</el-button>
</el-popover>
        </el-col>
        <el-col :span="12">
            <el-button style="float:right" @click="handleAdd"  type="primary" >建立採購單</el-button>
            <el-checkbox-group v-model="record" @change="handleSize" size="small" fill="#67c23a" style="display:inline-block;padding:5px;float:right">
         <el-checkbox-button   label="explore" :key="1">採購</el-checkbox-button>
         <el-checkbox-button   label="people" :key="2">产品图片</el-checkbox-button>
         <el-checkbox-button   label="treasure" :key="3">財務</el-checkbox-button>
         <el-checkbox-button   label="logistics" :key="4">物流</el-checkbox-button>
         <el-checkbox-button   label="remark" :key="5">備註</el-checkbox-button>
    </el-checkbox-group>
        </el-col>
        <br>
        <br>
        <br>
        <el-col>
               <el-table :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">   
                <el-table-column    label="狀態" prop="status" width="150"></el-table-column>  
                <el-table-column    min-width="150" label="建單時間" prop="addedTime"></el-table-column>
                <el-table-column     min-width="100"  label="採購單號" prop="purchaseId"></el-table-column>
                <el-table-column     width="150"  label="產品SKU" prop="productSKU"></el-table-column>
                <el-table-column     width="150"  label="產品名稱" prop="productName"></el-table-column>
                <el-table-column     width="100"  label="需採購數量" prop="quantity"></el-table-column>
                <el-table-column     width="120"  label="採購數量" prop="purchasedQuantity"></el-table-column>
                <el-table-column     width="150"  label="付款時間" prop="paymentTime"></el-table-column>
                 <el-table-column     width="80"  label="建單員" prop="purchaseQueryCreatedBy" fixed="right"></el-table-column>
                 <el-table-column     width="80"  label="採購員" prop="purchasedBy" ></el-table-column>
                  <!-- explore  -->
                <template v-if="exploreShow">
                   <el-table-column     width="100"  label="採購平台" prop="purchasedPlatform"  fixed="right"></el-table-column>
                   <el-table-column     width="150"  label="採購帳號" prop="purchasedAccount" fixed="right"></el-table-column>
                    <el-table-column     width="150"  label="採購平台單號" prop="purchaseOrderId"></el-table-column> 
                  <el-table-column     width="150"  label="採購時間" prop="purchasedTime" ></el-table-column>
                </template> 
                  <!-- treasure -->
            <template v-if="treasureShow">      
                 <el-table-column     width="80"  label="付款員" prop="paidBy" ></el-table-column>        
                <el-table-column     width="100"  label="採購總金額" prop="purchasedAmount" ></el-table-column>
                <el-table-column     width="60"  label="運費" prop="shippingCost" ></el-table-column>
              </template>

              <template v-if="logisticsShow">
                <el-table-column     width="150"  label="物流單號" prop="trackingNumber" ></el-table-column>
                 <el-table-column     width="100"  label="物流" prop="logistic" ></el-table-column>
              </template>
              <template v-if="peopleShow">
                <el-table-column label="產品圖片" width="100" fixed="right">
                    <template slot-scope="scope" >
                        <img  width="100%" style="cursor:pointer" :src="scope.row.snapshotURL" @click="scope.row.dialogTableVisible = true">                        
                        <el-dialog title="图片"  :modal="false" :visible.sync="scope.row.dialogTableVisible" width="30%">
                            <img  width="100%"  :src="scope.row.imageURL" >                        
                        </el-dialog>
                    </template>
                </el-table-column>
                </template>
                <template v-if="remarkShow">
                 <el-table-column     width="80"  label="備註" prop="note" ></el-table-column>
              </template>
               <el-table-column width="100" label="動作"   fixed="right">
                   <template slot-scope="scope">
                    <el-button type="text" title="编辑" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
                   </template>
               </el-table-column>
        </el-table>
        </el-col>
        </el-row>
        <br>
        <br>
    </div>
    
</template>
<script>
export default {
  name:'purchase',
  data() {
    return {
      record: [],
      exploreShow: false,
      peopleShow:false,
      treasureShow: false,
      logisticsShow: false,
      remarkShow: false,
      value: "",
      tableData: [],
      isTableLoading: false,
      maxHeight: "",
      showDialog: false,
      title: "添加",
      row: [],
      dialogTableVisible:false
    };
  },
  created() {
    this.maxHeight = document.scrollingElement.clientHeight / 1.5;
    this.handleSearch();
    this.Bus.$on('refresh',this.handleSearch);
  },
  methods: {
    handleSearch() {
      this.isTableLoading = true;
      this.axios({
        url: "http://61.216.178.44:8000/data-server/purchase/list",
        method: "post",
        data: {
          value: this.value,
          token: this.token,
          sortBy:'productName',
          isDesc:true,
        }
      }).then(res => {
        this.isTableLoading = false;
        this.loadsh.each(res,(v)=>{
          v.dialogTableVisible = false;
        })
        this.tableData = this.loadsh.cloneDeep(res);
      });
    },
    handleSortChange(row){
      if(row.order=="ascending"){
        var isDesc = false;
      }else{
        var isDesc = true;
      }
      this.isTableLoading = true; 
      this.axios({
        url: "http://61.216.178.44:8000/data-server/sku/search",
        method: "post",
        data: {
          sortBy: row.prop,
          isDesc,
          value: this.value,
          token: this.token
        }
      }).then(res => {
          this.loadsh.each(res,(v)=>{
            v.dialogTableVisible = false;
          })
          this.tableData = this.loadsh.cloneDeep(res);
          this.isTableLoading = false;
      });
    },
    handleAdd() {
      this.$router.push('/purchase/add')
    },
    handleEdit(row) {
        this.$router.push({name:'purchaseEdit',query:{data:JSON.stringify(row)},params:{id:'edit'}});
    },
    handleSize(val) {
      if (val.includes("explore")) {
        this.exploreShow = true;
      } else {
        this.exploreShow = false;
      }

      if (val.includes("treasure")) {
        this.treasureShow = true;
      } else {
        this.treasureShow = false;
      }

      if (val.includes("people")) {
        this.peopleShow = true;
      } else {
        this.peopleShow = false;
      }

      if (val.includes("logistics")) {
        this.logisticsShow = true;
      } else {
        this.logisticsShow = false;
      }

      if (val.includes("remark")) {
        this.remarkShow = true;
      } else {
        this.remarkShow = false;
      }
     
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



                