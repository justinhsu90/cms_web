<template>
    <div>
        <el-row>
            <el-col :span="10">
        <el-input v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:50%;float:left">
            <el-button  style="width:100%;margin:0 " @click="handleSearch" slot="append" type="text" icon="el-icon-search"></el-button>
        </el-input>
        </el-col>
        <el-col :span="14">
            <el-button style="float:right" @click="handleAdd"  type="primary" >新增文案</el-button>
          <el-checkbox-group v-model="condition" @change="handleCondition" size="small" style="display:inline-block;padding:5px;float:right">
            <el-checkbox-button  label="1" >account</el-checkbox-button>
            <el-checkbox-button   label="2" >language</el-checkbox-button>
            <el-checkbox-button   label="3" >platform</el-checkbox-button>
             <el-checkbox-button   label="4">country</el-checkbox-button>
          </el-checkbox-group>
        </el-col>
        <br>
        <br>
        <br>
        <el-col>
               <el-table  :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">   
                 <el-table-column min-width="140" label="lastUpdatedTime" prop="lastUpdatedTime" sortable="custom"></el-table-column>
                 <el-table-column min-width="70" label="contentId" prop="contentId"></el-table-column>
                 <el-table-column min-width="70" label="platform" prop="platform" ></el-table-column>
                 <el-table-column min-width="70" label="language" prop="language"></el-table-column>
                 <el-table-column min-width="70" label="country" prop="country"></el-table-column>
                 <el-table-column min-width="80" label="account" prop="account"></el-table-column>
                  <el-table-column min-width="80" label="sku" prop="sku"></el-table-column>
                  <el-table-column min-width="180" label="title" prop="title"></el-table-column>
                  <el-table-column min-width="80" label="Enable" prop="enable">
                      <template slot-scope="scope">
                            <el-tag  v-if="scope.row.enable" type="success">true</el-tag>
                            <el-tag  v-else type="info">false</el-tag>
                      </template>
                  </el-table-column>
                  <el-table-column min-width="80" label="Action" align="center">
                    <template slot-scope="scope">
                       <el-button type="text" title="编辑" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
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
import wonTableContainer from "../../common/wonTableContainer";
export default {
  extends: wonTableContainer,
  data() {
    return {
      tableData: [],
      condition:[],
      isTableLoading: false,
      maxHeight: "",
      fetchCondition: {
        skip: 0,
        limit: 10,
        order: "lastUpdatedTime"
      },
      fetchOption: {
        url: "/content/search",
        method: "post",
        where:""
      },
    };
  },
  created() {
    this.handleSearch();
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
        data.account = this.fetchOption.where;
      }
      if(this.condition.includes('2')){
        data.language = this.fetchOption.where;
      }
      if(this.condition.includes('3')){
        data.platform = this.fetchOption.where;
      }
      if(this.condition.includes('4')){
        data.country = this.fetchOption.where;
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

    },
    handleAdd(){

    },
    handleCondition(){
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
