<template>
    <div>
        <el-row>
            <el-col :span="22">
                <el-input class="w-max200" placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch">
                </el-input>
                <el-select class="w-max150" placeholder="費用類型" v-model="searchStock" @change="handleCondition('stock')" clearable>
                    <el-option v-for="(v,i) in stockCondition" :key="i" :label="v.financialSpendType" :value="v.financialSpendType"></el-option>
                </el-select>
                <el-date-picker class="w-max180" clearable @change="handleChange" value-format="yyyy-MM-dd" v-model="date" type="daterange" align="right" unlink-panels range-separator="~" start-placeholder="開始日期" end-placeholder="結束日期" :picker-options="pickerOptions">
                </el-date-picker>
                <div @click="handleSearch" class="el-input-group__append search">
                    <i class="el-icon-search"></i>
                </div>
            </el-col>
            <el-col :span="2">
                <el-button style="float:right" @click="handleAdd" type="primary">新增入庫單</el-button>
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                    <el-table-column min-width="50" label="入庫單號" prop="warehouseReceiveId"></el-table-column>
                    <el-table-column min-width="70" label="入庫時間" prop="receivedDate" :formatter="formatToTime"></el-table-column>
                    <el-table-column min-width="60" label="SKU" prop="sku"></el-table-column>
                    <el-table-column min-width="60" label="庫存狀態" prop="stockCondition"></el-table-column>
                    <!-- <el-table-column min-width="130" label="商品名稱"    prop="productName" ></el-table-column> -->
                    <el-table-column min-width="50" label="對應採購單號" prop="purchaseId"></el-table-column>
                    <el-table-column min-width="40" label="入庫數量" prop="quantity"></el-table-column>
                    <el-table-column min-width="60" label="質檢人" prop="inspectionBy"></el-table-column>
                    <el-table-column min-width="40" label="物流/快遞" prop="agent"> </el-table-column>
                    <!-- <el-table-column min-width="60" label="添加人"    prop="addedBy" ></el-table-column> -->
                    <!-- <el-table-column min-width="80" label="添加時間"  prop="addedTime" :formatter="formatToTime" > </el-table-column> -->
                    <!-- <el-table-column min-width="60" label="lastModifiedBy"    prop="lastModifiedBy" ></el-table-column> -->
                    <!-- <el-table-column min-width="60" label="lastUpdatedTime"    prop="lastUpdatedTime" :formatter="formatToTime"></el-table-column> -->
                    <el-table-column min-width="50" label="快遞單號" prop="trackingNumber"></el-table-column>
                    <!-- <el-table-column min-width="60" label="備註"    prop="note" ></el-table-column> -->
                    <el-table-column width="50" label="動作" align="center">
                        <template slot-scope="scope">
                            <el-button class="btnh" type="text" title="編輯" icon="el-icon-won-1" @click="handleEdit(scope.row)"></el-button>
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
            date: [],
            stockCondition: [],
            searchStock: "",
            tableData: [],
            condition: [],
            isTableLoading: false,
            fetchCondition: {
                skip: 0,
                limit: 15,
                order: "-lastUpdatedTime"
            },
            fetchOption: {
                url: "/erp/warehouse/receive/search",
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
        handleChange() {
            this.handleSearch();
        },
        handleCondition() {},
        handleSearch: _.debounce(function() {
            this.isTableLoading = true;
            let data = {
                where: this.fetchOption.where,
                token: this.token,
                skip: this.fetchCondition.skip,
                limit: this.fetchCondition.limit,
                order: this.fetchCondition.order
            };
            if (!_.isEmpty(this.date)) {
                data.startDate = this.date[0];
                data.endDate = this.date[1];
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
            this.$router.push({
                name: "put-storage-edit",
                query: { data: JSON.stringify(val) }
            });
        },
        handleAdd() {
            this.$router.push("/putStorageAdd");
        }
    }
};
</script>
