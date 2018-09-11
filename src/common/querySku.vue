<template>
    <div id="querySku">
        <wonDialog title="查询" :showConfirm="false">
            <el-row slot="content">
                <el-col :span="22">
                    <el-input placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:30%;float:left">
                        <el-button slot="append" @click="handleSearch" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col class="mt5">
                    <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                        <el-table-column min-width="50" label="sku" prop="sku" ></el-table-column>
                        <el-table-column min-width="60" label="productName" prop="productName" ></el-table-column>
                        <el-table-column min-width="70" label="snapshotURL" prop="snapshotURL"></el-table-column>
                     </el-table>   
                     <div style="float:right;margin-top:5px">
                            <el-pagination :small="true" @size-change="handleSizeChange" @current-change="handleCurrentChange" :total='total' :current-page="currentPage" :page-sizes="pageSizes" :layout="layout">
                            </el-pagination>
                        </div>
                  </el-col>      
            </el-row>
        </wonDialog>
    </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
import wonDialog from "./wonDialog"; 
export default {
    name: "querySku",
    extends: wonTableContainer,
    components: {
        wonDialog
    },
    data() {
        return {
            tableData: [],
            maxHeight: 450,
            setMaxHeight:false,
            condition: [],
            isTableLoading: false,
            fetchCondition: {
                skip: 0,
                limit: 15
            },
            fetchOption: {
                url: "/erp/search/sku",
                method: "post",
                where: ""
            }
        };
    },
    created() {
        this.handleSearch();
    },
    methods: {
        handleSearch: _.debounce(function() {
            this.isTableLoading = true;
            let data = {
                value:this.fetchOption.where,
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
        }, 500)
    }
};
</script>

<style>
    #querySku .el-table th{
        height:30px;
    }
</style>


