<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-input class="ibbox w-max200" placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch">
                </el-input>
                <div  @click="handleSearch" class="el-input-group__append search">
                    <i class="el-icon-search"></i>
                </div>
                <el-button style="float:right" @click="handleAdd" type="primary">執行</el-button>
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                    <el-table-column min-width="50" label="ID" prop="id"></el-table-column>
                    <el-table-column min-width="110" label="執行狀態" prop="executionStatus" ></el-table-column>
                    <el-table-column min-width="110" label="執行名稱" prop="scriptName" ></el-table-column>
                    <el-table-column min-width="150" label="執行代號" prop="scriptCode"></el-table-column>
                    <el-table-column min-width="100" label="建單人" prop="addedBy"></el-table-column>
                    <el-table-column min-width="100" label="建單時間" prop="addedTime" ></el-table-column>
                    <el-table-column min-width="100" label="最後更新時間" prop="lastUpdatedTime" ></el-table-column>
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
            searchAccount: "",
            searchAccountOption: [
                {
                    account: "已補發"
                }
            ],
            fetchCondition: {
                skip: 0,
                limit: 15
            },
            fetchOption: {
                url: "/script/search",
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
        handleCondition(sign) {
            if (sign == "acc") {
                if (!this.searchAccount) {
                    _.pull(this.condition, "1");
                } else {
                    if (!this.condition.includes("1")) {
                        this.condition.push("1");
                    }
                }
            }
            this.handleSearch();
        },
        handleSearch: _.debounce(function() {
            this.isTableLoading = true;
            let data = {
                where: this.fetchOption.where,
                token: this.token,
                skip: this.fetchCondition.skip,
                limit: this.fetchCondition.limit
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
        handleAdd() {
            this.$router.push("/scriptExecutionAdd");
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
