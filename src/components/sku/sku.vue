<template>
    <div id="table">
        <el-row>
            <el-col :span="10">
        <el-input     v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:50%;float:left">
            <el-button style="width:100%;margin:0" @click="handleSearch" slot="append" type="text" icon="el-icon-search"></el-button>
        </el-input>

        <el-popover
  ref="popover"      
  placement="top-start"
  title="搜索"
  width="200"
  trigger="hover"
  content="Search SKU, NEW SKU, Product Name, Deprecated SKU 字段"> 
<el-button slot="reference"  style="width:20px;height:20px;margin:10px 0px 0px 10px;padding:0px;border-radius:50%;color:#666" >?</el-button>
</el-popover>

        </el-col>
        <el-col :span="14">
            <el-button style="float:right" @click="handleAdd"  type="primary" >新增SKU</el-button>
            <el-checkbox-group v-model="record" @change="handleSize" size="small" style="display:inline-block;padding:5px;float:right">
         <el-checkbox-button   label="ama" :key="1">Amazon出貨尺寸</el-checkbox-button>
         <el-checkbox-button   label="parcel" :key="2">小包出貨尺寸</el-checkbox-button>
         <el-checkbox-button   label="deprecatedSku" :key="3">已停用SKU</el-checkbox-button>
         <el-checkbox-button   label="price" :key="4">成本</el-checkbox-button>
    </el-checkbox-group>
        </el-col>
        <br>
        <br>
        <br>
        <el-col>
               <el-table  ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">   
                 <el-table-column sortable="custom"   label="Product Name" prop="productName"  min-width="180"></el-table-column>  
                 <el-table-column sortable="custom"   min-width="80" label="SKU" prop="sku"></el-table-column>
                <el-table-column  sortable="custom"   min-width="80"  label="New SKU" prop="newSKU"></el-table-column>
                  <!-- ama   -->
                <template v-if="amaShow">
                    <el-table-column  min-width="100" key="4"  label="Amazon(長)" prop="amazonLengthCM" fixed="right">
                    <template slot-scope="scope">
                        <span>{{scope.row.amazonLengthCM}}cm</span>
                    </template>
                </el-table-column>
                <el-table-column  min-width="100"  key="1"  label="Amazon(寬)" prop="amazonWidthCM" fixed="right">
                    <template slot-scope="scope">
                        <span>{{scope.row.amazonWidthCM}}cm</span>
                    </template>
                </el-table-column>
                <el-table-column  min-width="100" key="2"  label="Amazon(高)" prop="amazonHeightCM" fixed="right">
                    <template slot-scope="scope">
                        <span>{{scope.row.amazonHeightCM}}cm</span>
                    </template>
                </el-table-column>
                <el-table-column  min-width="100"  key="3" label="Amazon(重)" prop="amazonWeightKG" fixed="right">
                    <template slot-scope="scope">
                        <span>{{scope.row.amazonWeightKG}}kg</span>
                    </template>
                </el-table-column>
                </template>  
                <!-- parcel -->
              <template v-if="parcelShow">
                  <el-table-column  min-width="80"  key="7" label="小包(長)" prop="parcelLengthCM" >
                    <template slot-scope="scope">
                        <span>{{scope.row.parcelLengthCM}}kg</span>
                    </template>
                </el-table-column>
                <el-table-column  min-width="80" key="5" label="小包(寬)" prop="parcelWidthCM" >
                        <template slot-scope="scope">
                        <span>{{scope.row.parcelWidthCM}}cm</span>
                    </template>
                </el-table-column>
                <el-table-column  min-width="80"  key="6" label="小包(高)" prop="parcelHeightCM" >
                        <template slot-scope="scope">
                        <span>{{scope.row.parcelHeightCM}}cm</span>
                    </template>
                </el-table-column>
                <el-table-column  min-width="80" key="8"  label="小包(重)" prop="parcelWeightKG" >
                    <template slot-scope="scope">
                        <span>{{scope.row.parcelWeightKG}}cm</span>
                    </template>
                </el-table-column>
                
              </template>  
            <template v-if="deprecatedSkuShow">
                <el-table-column  min-width="100"  label="已停用 SKU" prop="deprecatedSKU" algin="center" key="11"> </el-table-column>
              </template>
              <template v-if="priceShow">
                <el-table-column  min-width="70"  label="成本 (RMB)" prop="priceRMB" key="10">
                        <template slot-scope="scope">
                        <span>{{scope.row.priceRMB}}</span>
                    </template>
                </el-table-column>
              </template>
                <el-table-column label="Image" min-width="100">
                    <template slot-scope="scope" >
                        <img  width="80" height="80" style="cursor:pointer" :src="scope.row.snapshotURL" @click="scope.row.dialogTableVisible = true">                        
                        <el-dialog title="圖片"  :modal="false" :visible.sync="scope.row.dialogTableVisible" width="30%">
                            <img  width="100%"  :src="scope.row.imageURL" >                        
                        </el-dialog>
                    </template>
                </el-table-column>
               <el-table-column min-width="50" label="Action"   fixed="right">
                   <template slot-scope="scope">
                    <el-button type="text" title="編輯" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
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
import wonTableContainer from "../../common/wonTableContainer";
export default {
  extends: wonTableContainer,
  data() {
    return {
      record: [],
      maxHeight: 450,
      amaShow: false,
      parcelShow: false,
      deprecatedSkuShow: false,
      priceShow: false,
      value: "",
      tableData: [],
      isTableLoading: false,
      showDialog: false,
      title: "新增",
      row: [],
      dialogTableVisible: false,
      fetchCondition: {
        skip: 0,
        limit: 10,
        order: "productName"
      },
      fetchOption: {
        url: "http://api.myfbmanage.com:8000/data-server/sku/search",
        where: "",
        method: "post"
      }
    };
  },
  created() {
    this.handleSearch();
  },
  methods: {
    handleSearch: _.debounce(function() {
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
      }).then(({ data, count }) => {
        this.isTableLoading = false;
        _.each(data, v => {
          v.dialogTableVisible = false;
        });
        this.tableData = _.cloneDeep(data);
        this.total = count;
      });
    }, 500),
    handleAdd() {
      this.showDialog = true;
      this.title = "新增";
    },
    handleShow() {
      this.showDialog = false;
    },
    handleEdit(row) {
      this.title = "編輯";
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