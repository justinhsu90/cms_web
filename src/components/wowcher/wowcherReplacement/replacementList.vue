<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-input placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:22%;float:left">
        </el-input>
        <div style="margin-left:5px;display:inline-block;width:140px">
          <el-select placeholder="狀態" v-model="searchAccount" @change="handleCondition('acc')" clearable>
            <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v.account" :value="v.account"></el-option>
          </el-select>
        </div>
        <div style="cursor:pointer;display: inline-block;width: 14px;height: 35px;text-align: center;border: 1px solid #dcdfe6;border-radius: 4px;line-height: 35px;" @click="handleSearch" class="el-input-group__append">
          <i class="el-icon-search"></i>
        </div>
        <el-button style="float:right" @click="handleAdd" type="primary">新增補/重發</el-button>
      </el-col>
      <el-col class="mt5">
        <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
          <el-table-column min-width="130" label="Platform Order ID" prop="platformOrderId"></el-table-column>
          <!-- <el-table-column min-width="140" label="Wowcher Code" prop="wowcherCode"></el-table-column> -->
          <el-table-column min-width="100" label="建單時間" prop="addedTime" sortable="custom"></el-table-column>
          <el-table-column min-width="110" label="物流單時間" prop="shipmentCreatedTime"></el-table-column>
          <el-table-column min-width="110" label="發貨時間" prop="shipoutTime" sortable="custom"></el-table-column>
          <el-table-column min-width="50" label="手動" prop="isManual"></el-table-column>
          <el-table-column min-width="100" label="單號" prop="trackingNumber"></el-table-column>
          <el-table-column min-width="100" label="備註" prop="note"></el-table-column>
          <el-table-column min-width="200" label="發貨品名" prop="shipmentProductName"></el-table-column>
          <el-table-column width="80" label="動作" fixed="right">
            <template slot-scope="scope">
              <!-- <el-button type="text" title="編輯" icon="el-icon-won-1" @click="handleEdit(scope.row)"></el-button> -->
              <el-button class="btnh" type="text" title="查看" icon="el-icon-won-40" @click="handleCheck(scope.row)"></el-button>
              <el-button class="btnh" type="text" title="删除" icon="el-icon-won-22" @click="handleDelete(scope.row)"></el-button>
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
                limit: 15,
                order: "-lastUpdatedTime"
            },
            fetchOption: {
                url: "wowcher/rpm/search",
                method: "post",
                where: "",
                order: "-lastUpdatedTime"
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
        handleDelete(val) {
            this.$confirm("是否删除", "提示", {
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    axios({
                        url: "wowcher/rpm/delete",
                        method: "post",
                        data: {
                            value: val.platformOrderId,
                            token: this.token
                        }
                    }).then(() => {
                        this.handleSearch();
                        this.$message.success("删除成功");
                    });
                })
                .catch(() => {});
        },
        handleAdd() {
            this.$router.push("/replacementAdd");
        },
        handleCheck(val) {
            this.$router.push({
                name: "replacementCheck",
                query: { data: JSON.stringify(val) }
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
