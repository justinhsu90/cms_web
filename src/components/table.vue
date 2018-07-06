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
            <el-button style="float:right" @click="handleAdd"  type="primary" >Add SKU</el-button>
            <el-checkbox-group v-model="record" @change="handleSize" size="small" fill="#67c23a" style="display:inline-block;padding:5px;float:right">
         <el-checkbox-button   label="ama" :key="1">Amazon出货尺寸</el-checkbox-button>
         <el-checkbox-button   label="parcel" :key="2">小包出货尺寸</el-checkbox-button>
         <el-checkbox-button   label="deprecatedSku" :key="3">已停用SKU</el-checkbox-button>
         <el-checkbox-button   label="price" :key="4">採購成本</el-checkbox-button>
    </el-checkbox-group>
        </el-col>
        <br>
        <br>
        <br>
        <el-col>
               <el-table :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">   
                 <el-table-column sortable="custom"   label="Product Name" prop="productName"  :min-width="150"></el-table-column>  
                 <el-table-column sortable="custom"   width="150" label="SKU" prop="sku"></el-table-column>
                <el-table-column  sortable="custom"   width="150"  label="New SKU" prop="newSKU"></el-table-column>
                  <!-- ama   -->
                <template v-if="amaShow">
                    <el-table-column  width="130" key="4"  label="AMZ Length" prop="amazonLengthCM" fixed="right">
                    <template slot-scope="scope">
                        <span>{{scope.row.amazonLengthCM}}cm</span>
                    </template>
                </el-table-column>
                <el-table-column  width="130"  key="1"  label="AMZ Width" prop="amazonWidthCM" fixed="right">
                    <template slot-scope="scope">
                        <span>{{scope.row.amazonWidthCM}}cm</span>
                    </template>
                </el-table-column>
                <el-table-column  width="130" key="2"  label="AMZ Height" prop="amazonHeightCM" fixed="right">
                    <template slot-scope="scope">
                        <span>{{scope.row.amazonHeightCM}}cm</span>
                    </template>
                </el-table-column>
                <el-table-column  width="130"  key="3" label="AMZ Weight" prop="amazonWeightKG" fixed="right">
                    <template slot-scope="scope">
                        <span>{{scope.row.amazonWeightKG}}kg</span>
                    </template>
                </el-table-column>
                </template>  
                <!-- parcel -->
              <template v-if="parcelShow">
                  <el-table-column  width="100"  key="7" label="Length" prop="parcelLengthCM" >
                    <template slot-scope="scope">
                        <span>{{scope.row.parcelLengthCM}}kg</span>
                    </template>
                </el-table-column>
                <el-table-column  width="100" key="5" label="Width" prop="parcelWidthCM" >
                        <template slot-scope="scope">
                        <span>{{scope.row.parcelWidthCM}}cm</span>
                    </template>
                </el-table-column>
                <el-table-column  width="100"  key="6" label="Height" prop="parcelHeightCM" >
                        <template slot-scope="scope">
                        <span>{{scope.row.parcelHeightCM}}cm</span>
                    </template>
                </el-table-column>
                <el-table-column  width="100" key="8"  label="Weight" prop="parcelWeightKG" >
                    <template slot-scope="scope">
                        <span>{{scope.row.parcelWeightKG}}cm</span>
                    </template>
                </el-table-column>
                
              </template>  
            <template v-if="deprecatedSkuShow">
                <el-table-column  width="100"  label="Deprecated SKU" prop="deprecatedSKU" algin="center" key="11"> </el-table-column>
              </template>
              <template v-if="priceShow">
                <el-table-column  width="100"  label="RMB" prop="priceRMB" key="10">
                        <template slot-scope="scope">
                        <span>{{scope.row.priceRMB}}</span>
                    </template>
                </el-table-column>
              </template>
                <el-table-column label="Image" width="100">
                    <template slot-scope="scope" >
                        <img  width="100%" style="cursor:pointer" :src="scope.row.snapshotURL" @click="scope.row.dialogTableVisible = true">                        
                        <el-dialog title="图片"  :modal="false" :visible.sync="scope.row.dialogTableVisible" width="30%">
                            <img  width="100%"  :src="scope.row.imageURL" >                        
                        </el-dialog>
                    </template>
                </el-table-column>
               <el-table-column width="100" label="Action"   fixed="right">
                   <template slot-scope="scope">
                    <el-button type="text" title="编辑" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
                   </template>
               </el-table-column>
        </el-table>
        </el-col>
        <el-col>
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
        </el-col>
        </el-row>
        <br>
        <br>
        <directiveDialog :title="title" :row="row" v-if="showDialog" @showDailog="handleShow"></directiveDialog>    
    </div>
</template>
<script>
import directiveDialog from "./dialog";
import wonTableContainer from "../common/wonTableContainer";
export default {
  extends:wonTableContainer,
  data() {
    return {
      record: [],
      amaShow: false,
      parcelShow: false,
      deprecatedSkuShow: false,
      priceShow: false,
      value: "",
      tableData: [],
      isTableLoading: false,
      maxHeight: "",
      showDialog: false,
      title: "添加",
      row: [],
      dialogTableVisible: false,
      fetchCondition: {
        skip: 0,
        limit: 10,
        order:"productName"
      },
      fetchOption: {
        url: "http://61.216.178.44:8000/data-server/sku/search",
        where: "",
        method: "post"
      }
    };
  },
  created() {
    this.maxHeight = document.scrollingElement.clientHeight / 1.5;
    this.handleSearch();
  },
  methods: {
    handleSearch() {
      this.isTableLoading = true;
      this.axios({
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
        this.loadsh.each(data, v => {
          v.dialogTableVisible = false;
        });
        this.tableData = this.loadsh.cloneDeep(data);
        this.total = count;
      });
    },
    handleAdd() {
      this.showDialog = true;
      this.title = "添加";
    },
    handleShow() {
      this.showDialog = false;
    },
    handleEdit(row) {
      this.title = "编辑";
      this.showDialog = true;
      this.row = _.cloneDeep(row);
    },
    handleSize(val) {
      if (val.includes("ama")) {
        this.amaShow = true;
      } else {
        this.amaShow = false;
      }

      if (val.includes("parcel")) {
        this.parcelShow = true;
      } else {
        this.parcelShow = false;
      }

      if (val.includes("deprecatedSku")) {
        this.deprecatedSkuShow = true;
      } else {
        this.deprecatedSkuShow = false;
      }

      if (val.includes("price")) {
        this.priceShow = true;
      } else {
        this.priceShow = false;
      }
      //   switch (val) {
      //     case "ama":
      //       this.amaShow = true;
      //       this.parcelShow = false;
      //       this.deprecatedSkuShow = false;
      //       this.priceShow = false;
      //       break;
      //     case "parcel":
      //       this.amaShow = false;
      //       this.parcelShow = true;
      //       this.deprecatedSkuShow = false;
      //       this.priceShow = false;
      //       break;
      //     case "deprecatedSku":
      //       this.deprecatedSkuShow = true;
      //       this.priceShow = false;
      //       break;
      //     case "price":
      //       this.deprecatedSkuShow = false;
      //       this.priceShow = true;
      //       break;
      //   }
    }
  },
  components: {
    directiveDialog
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

