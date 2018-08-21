<template>
  <div id="sku">
    <el-row>
      <el-col :span="10">
        <el-input v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:50%;float:left">
          <el-button style="width:100%;margin:0" @click="handleSearch" slot="append" type="text" icon="el-icon-search"></el-button>
        </el-input>
        <el-popover ref="popover" placement="top-start" title="搜索" width="200" trigger="hover" content="Search SKU, NEW SKU, Product Name, Deprecated SKU 字段">
          <el-button slot="reference" style="width:20px;height:20px;margin:10px 0px 0px 10px;padding:0px;border-radius:50%;color:#666">?</el-button>
        </el-popover>
      </el-col>
      <el-col :span="14">
        <el-button style="float:right" @click="handleAdd" type="primary">新增SKU</el-button>
        <el-checkbox-group v-model="record" @change="handleSize" size="small" style="display:inline-block;padding:5px;float:right">
          <el-checkbox-button label="deprecatedSku" :key="4">已停用SKU</el-checkbox-button>
          <el-checkbox-button label="price" :key="5">成本</el-checkbox-button>
        </el-checkbox-group>
      </el-col>
      <el-col>
        <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
          <el-table-column sortable="custom" label="產品名稱" prop="productName" min-width="180"></el-table-column>
          <el-table-column sortable="custom" min-width="80" label="SKU" prop="sku"></el-table-column>
          <!-- <el-table-column sortable="custom" min-width="80" label="New SKU" prop="newSKU"></el-table-column> -->
          <!-- ama   -->
          <!-- <template v-if="amaShow"> -->
            <el-table-column min-width="100" key="4" label="Amazon(長x寬x高/重)" prop="Amazon" >
              <template slot-scope="scope">
                <span>{{scope.row.amazonLengthCM}}</span>x<span>{{scope.row.amazonWidthCM}}</span>x<span>{{scope.row.amazonHeightCM}}cm</span>/<span>{{scope.row.amazonWeightKG}}kg</span>
              </template>
            </el-table-column>
            <el-table-column min-width="80" key="7" label="小包(長x寬x高/重)" prop="parcel">
              <template slot-scope="scope">
                <span>{{scope.row.parcelLengthCM}}</span>x<span>{{scope.row.parcelWidthCM}}</span>x<span>{{scope.row.parcelHeightCM}}cm</span>/<span>{{scope.row.parcelWeightKG}}kg</span>
              </template>
            </el-table-column>
            <el-table-column min-width="80"  label="產品(長x寬x高/重)" prop="productLengthCM">
              <template slot-scope="scope">
                <span>{{scope.row.productLengthCM}}</span>x<span>{{scope.row.productWidthCM}}</span>x<span>{{scope.row.productHeightCM}}cm</span>/<span>{{scope.row.productWeightKG}}kg</span>
              </template>
            </el-table-column>
          <template v-if="deprecatedSkuShow">
            <el-table-column min-width="100" label="已停用 SKU" prop="deprecatedSKU" algin="center" key="11"> </el-table-column>
          </template>
          <template v-if="priceShow">
            <el-table-column min-width="70" label="成本 (RMB)" prop="priceRMB" key="10">
              <template slot-scope="scope">
                <span>{{scope.row.priceRMB}}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column class-name="tableColumn" label="圖片" width="70" align="center">
            <template slot-scope="scope">
              <img width="50" height="50" style="cursor:pointer" :src="scope.row.snapshotURL" @click="scope.row.dialogTableVisible = true">
              <el-dialog title="圖片" :modal="false" :visible.sync="scope.row.dialogTableVisible" width="30%">
                <img width="100%" :src="scope.row.imageURL">
              </el-dialog>
            </template>
          </el-table-column>
          <el-table-column min-width="50" label="動作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" title="編輯" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col>
        <div style="float:right;margin-top:5px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :total='total' :current-page="currentPage" :page-sizes="pageSizes" :layout="layout">
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
    name: "sku",
    data() {
        return {
            record: [],
            maxHeight: 450,
            amaShow: false,
            parcelShow: false,
            deprecatedSkuShow: false,
            priceShow: false,
            productShow: false,
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
                url: "sku/search",
                where: "",
                method: "post"
            }
        };
    },
    created() {
        this.handleSearch();
        this.Bus.$on("refresh", this.handleSearch);
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

            if (val.includes("product")) {
                this.productShow = true;
            } else {
                this.productShow = false;
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

<style lang="scss">
#sku {
    // .el-table th {
    //     color: #62717e;
    //     background: rgb(237, 241, 245);
    //     text-align: center;
        
    // }
    .tableColumn {
        padding: 5px !important;
    }
}
</style>