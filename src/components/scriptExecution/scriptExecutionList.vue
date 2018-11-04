<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-input placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:22%;float:left">
                </el-input>
                      <div style="margin-left:5px;display:inline-block;width:140px">
                    <el-select placeholder="類型" v-model="inventoryType" @change="handleCondition('type')" clearable>
                        <el-option v-for="(v,i) in inventoryTypeOption" :key="i" :label="v.inventoryTypeName" :value="v.inventoryType"></el-option>
                    </el-select>
                </div>
                <div style="display:inline-block;width:140px">
                    <el-select placeholder="商品" v-model="warehouse" @change="handleCondition('warehouse')" clearable>
                        <el-option v-for="(v,i) in warehouseOption" :key="'merge'+i" :label="v.inventoryTypeName" :value="v.inventoryType"></el-option>
                    </el-select>
                </div>
                <div  @click="handleSearch" class="el-input-group__append search">
                    <i class="el-icon-search"></i>
                </div>
                <el-button style="float:right" @click="handleAdd" type="primary">新增清單</el-button>
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                    <el-table-column min-width="130" label="sku" prop="sku"></el-table-column>
                    <el-table-column min-width="130" label="snapshotUrl" prop="snapshotUrl"></el-table-column>
                    <el-table-column min-width="130" label="warehouse" prop="warehouse"></el-table-column>
                    <el-table-column width="100" label="quantity" prop="quantity"></el-table-column>
                    <el-table-column width="100" label="productName" prop="productName"></el-table-column>
                    <el-table-column width="100" label="account" prop="account"></el-table-column>
                    <el-table-column width="80" label="platform" prop="platform"></el-table-column>
                    <el-table-column width="80" label="addedBy" prop="addedBy"></el-table-column>
                    <el-table-column width="80" label="addedTime" prop="addedTime" sortable="custom" ></el-table-column>
                    <el-table-column width="80" label="inventoryChangeId" prop="inventoryChangeId" sortable="custom" ></el-table-column>
                    <el-table-column width="80" label="inventoryType" prop="inventoryType"></el-table-column>
                    <el-table-column width="80" label="lastUpdatedTime" prop="lastUpdatedTime"></el-table-column>
                    <el-table-column width="80" label="lastModifiedBy" prop="lastModifiedBy" sortable="custom"></el-table-column>
                    <el-table-column width="80" label="moveFrom" prop="moveFrom" sortable="custom"></el-table-column>
                    <el-table-column width="80" label="moveTo" prop="moveTo" sortable="custom"></el-table-column>
                    <el-table-column width="50" label="動作" fixed="right">
                        <template slot-scope="scope">
                            <el-button class="btnh" type="text" title="刪除" icon="el-icon-won-22" @click="handleDelete(scope.row)"></el-button>
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
            warehouse:'',
            warehouseOption:[],
            inventoryType: "",
            inventoryTypeOption: [
            ],
            fetchCondition: {
                skip: 0,
                limit: 15
            },
            fetchOption: {
                url: "/inventory/change/search",
                method: "post",
                where: ""
            }
        };
    },
    created() {
        this.handleSearch();
        this.Bus.$on("refresh", this.handleSearch);
        let type = axios({
            url:'/inventory/change/value/inventoryType',
            method:'post',
            data:{
                token:this.token
            }
        })
        let warehouse = axios({
            url:'/inventory/change/value/warehouse',
            method:'post',
            data:{
                token:this.token
            }
        })
        Promise.all([type,warehouse]).then(([type,warehouse])=>{
            this.warehouseOption = _.cloneDeep(warehouse);
            this.inventoryTypeOption = _.cloneDeep(type);
        })
    },
    methods: {
        handleCondition(sign) {
            if (sign == "type") {
                if (!this.searchAccount) {
                    _.pull(this.condition, "1");
                } else {
                    if (!this.condition.includes("1")) {
                        this.condition.push("1");
                    }
                }
            }

            if (sign == "warehouse") {
                if (!this.searchAccount) {
                    _.pull(this.condition, "2");
                } else {
                    if (!this.condition.includes("2")) {
                        this.condition.push("2");
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
              if (this.condition.includes("1")) {
                data.inventoryType = this.inventoryType;
            }
            if (this.condition.includes("2")) {
                data.warehouse = this.warehouse;
            }
            // if (this.condition.includes("3")) {
            //     data.country = this.searchCountry;
            // }
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
        },
        handleDelete(row) {
            this.$confirm("確定要刪除", "提示", {
                type: "warning",
                beforeClose(action, instance, done) {
                    if (action == "confirm") {
                        axios({
                            url: "/inventory/change/remove",
                            method: "post",
                            data: {
                                token: this.token,
                                inventoryChangeId: row.inventoryChangeId
                            }
                        })
                            .then(() => {
                                this.$message.success("刪除成功");
                                this.handleSearch();
                                done();
                            })
                            .catch(() => {
                                this.$message.success("刪除成功");
                                done();
                            });
                    } else {
                        done();
                    }
                }
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
