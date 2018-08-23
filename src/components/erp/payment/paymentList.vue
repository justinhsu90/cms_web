<template>
  <div>
    <el-row>
      <el-col :span="22">
        <el-input placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:20%;float:left">
          <el-button slot="append" @click="handleSearch" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button style="float:right" @click="handleAdd" type="primary">新增Replacement</el-button>
      </el-col>
      <el-col>
        <br>
        <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
          <el-table-column min-width="75" label="lastUpdatedTime" prop="lastUpdatedTime" sortable="custom"></el-table-column>
          <el-table-column min-width="60" label="paymentId" prop="paymentId" sortable="custom"></el-table-column>
          <el-table-column min-width="65" label="purchaseId" prop="purchaseId" sortable="custom"></el-table-column>
          <el-table-column min-width="65" label="paymentTime" prop="paymentTime" sortable="custom"></el-table-column>
          <el-table-column min-width="60" label="paymentAccount" prop="paymentAccount" sortable="custom"></el-table-column>
          <el-table-column min-width="60" label="paymentMethod" prop="paymentMethod"></el-table-column>
          <el-table-column min-width="60" label="paymentPlatformId" prop="paymentPlatformId"></el-table-column>
          <el-table-column min-width="60" label="paymentTotalAmount" prop="paymentTotalAmount"></el-table-column>
          <el-table-column min-width="60" label="note" prop="note"></el-table-column>
          <el-table-column min-width="60" label="lastModifiedBy" prop="lastModifiedBy"></el-table-column>
          <el-table-column min-width="60" label="paidBy" prop="paidBy"></el-table-column>
          <el-table-column width="80" label="動作" align="center">
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
                url: "/payment/search",
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
                order: this.fetchCondition.order
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
                name: "paymentEdit",
                query: { data: JSON.stringify(val) }
            });
        },
        handleAdd() {
            this.$router.push("/paymentAdd");
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
