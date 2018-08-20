<template>
  <div>
    <el-row>
      <el-col :span="22">
        <el-input placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:20%;float:left">
          <el-button slot="append" @click="handleSearch" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button style="float:right" @click="handleAdd" type="primary">新增樣品</el-button>
      </el-col>
      <br>
      <br>
      <br>
      <el-col>
        <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
          <el-table-column min-width="75" label="樣品單號" prop="agentOrderId" sortable="custom"></el-table-column>
          <el-table-column min-width="60" label="快遞單號" prop="trackingNumber" sortable="custom"></el-table-column>
          <el-table-column min-width="60" label="收件者" prop="toWhom" sortable="custom"></el-table-column>
          <el-table-column min-width="60" label="發貨方式" prop="shippingMethod"></el-table-column>
          <el-table-column min-width="150" label="樣品名稱" prop="sampleName"></el-table-column>
          <el-table-column min-width="60" label="發貨時間" prop="shipoutTime"></el-table-column>
          <el-table-column min-width="60" label="備註" prop="note"></el-table-column>
          <el-table-column width="50" label="動作" align="center">
            <template slot-scope="scope">
               <el-button type="text" title="編輯" icon="el-icon-won-1" @click="handleEdit(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <div style="float:right;margin-top:5px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :total='total' :current-page="currentPage" :page-sizes="pageSizes" :layout="layout">
        </el-pagination>
      </div>
    </el-row>
    <br>
    <br>
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
            condition: [],
            isTableLoading: false,
            fetchCondition: {
                skip: 0,
                limit: 10,
                order: "-lastUpdatedTime"
            },
            fetchOption: {
                url: "wowcher/sample/search",
                method: "post",
                where: ""
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
            let data = {
                where: this.fetchOption.where,
                token: this.token,
                skip: this.fetchCondition.skip,
                limit: this.fetchCondition.limit,
                order:this.fetchCondition.order
            };
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
                name: "wowcherSampleEdit",
                query: { data: JSON.stringify(val) }
            });
        },
        handleAdd() {
            this.$router.push("/wowcherSampleAdd");
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
