<template>
    <div id="singleLetter">
        <el-row>
            <el-col :span="22">
                <el-input class="w-max200 ibbox" placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch">
                </el-input>
                <el-select class="w-max150" placeholder="所屬帳號" v-model="searchAccount" @change="handleCondition('account')" clearable>
                    <el-option v-for="(v,i) in singleLetterAccountOption" :key="'acc'+i" :label="v.account" :value="v.account"></el-option>
                </el-select>
                <el-select class="w-max150" placeholder="通知狀態" v-model="searchType" @change="handleCondition('type')" clearable>
                    <el-option v-for="(v,i) in singleLetterTypeOption" :key="'type'+i" :label="v.type" :value="v.type"></el-option>
                </el-select>
                <div @click="handleSearch" class="el-input-group__append search">
                    <i class="el-icon-search"></i>
                </div>
            </el-col>
            <el-col :span="2">
                <el-button style="float:right" @click="handleAdd" type="primary">新增</el-button>
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                    <!-- <el-table-column min-width="100" label="最後更新時間" prop="lastUpdatedTime" sortable="custom"></el-table-column> -->
                    <el-table-column min-width="90" label="物流單號" prop="trackingNumber" sortable="custom"></el-table-column>
                    <el-table-column min-width="80" label="帳號" prop="account" sortable="custom"></el-table-column>
                    <el-table-column min-width="80" label="客戶姓名" prop="customerName"></el-table-column>
                    <el-table-column min-width="160" label="郵箱" prop="email"></el-table-column>
                    <el-table-column min-width="100" label="加入時間" prop="addedTime" sortable="custom"></el-table-column>
                    <el-table-column min-width="100" label="補發時間" prop="emailSentTime" sortable="custom"></el-table-column>
                </el-table>
            </el-col>
            <div style="float:right">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :total='total' :current-page="currentPage" :page-sizes="pageSizes" :layout="layout">
                </el-pagination>
            </div>
        </el-row>
        <wonDialog :row="valueAdd" name="single" ref="wonDialog" title="新增通知" size="40%">
            <el-input slot="content" type="textarea" :rows="4" :autosize="{ minRows: 4, maxRows: 6}" v-model="valueAdd" placeholder="請輸入單號,並以逗號區隔"></el-input>
        </wonDialog>
    </div>
</template>
      <script>
import wonTableContainer from "@/common/wonTableContainer";
import wonDialog from "@/common/wonDialog";
export default {
    name: "single",
    extends: wonTableContainer,
    components: {
        wonDialog
    },
    data() {
        return {
            valueAdd: "",
            tableData: [],
            pageSizes: [20, 40, 60, 100, 200],
            condition: [],
            singleLetterAccountOption: [],
            searchAccount: "",
            searchType: "",
            singleLetterTypeOption: [],
            maxHeight: 450,
            isTableLoading: false,
            fetchCondition: {
                skip: 0,
                limit: 20,
                order: "-lastUpdatedTime"
            },
            fetchOption: {
                url: "/wowcher/informcustomer/search",
                where: "",
                method: "post"
            }
        };
    },
    created() {
        this.$on("selectSku", this.handleAddData);
        this.handleSearch();
        let singleLetterAccount = axios({
            url: "/wowcher/informcustomer/value/account",
            method: "post",
            data: {
                token: this.token
            }
        });
        let singleLetterType = axios({
            url: "/wowcher/informcustomer/value/type",
            method: "post",
            data: {
                token: this.token
            }
        });
        Promise.all([singleLetterAccount, singleLetterType]).then(
            ([account, type]) => {
                this.singleLetterAccountOption = _.cloneDeep(account.data);
                this.singleLetterTypeOption = _.cloneDeep(type.data);
            }
        );
    },
    methods: {
        handleCondition(sign) {
            if (sign == "account") {
                if (!this.searchAccount) {
                    _.pull(this.condition, "1");
                } else {
                    if (!this.condition.includes("1")) {
                        this.condition.push("1");
                    }
                }
            }
            if (sign == "type") {
                if (!this.searchType) {
                    _.pull(this.condition, "2");
                } else {
                    if (!this.condition.includes("2")) {
                        this.condition.push("2");
                    }
                }
            }
            this.handleSearch();
        },
        handleAddData(v1, v2) {
            if (!v1) return;

            axios({
                url: "wowcher/informcustomer/add",
                method: "post",
                data: {
                    value: v1[0],
                    token: this.token
                }
            }).then(res => {
                this.valueAdd = "";
                this.handleSearch();
            });
        },
        handleSearch: _.debounce(function() {
            this.isTableLoading = true;
            let data = {
                where: this.fetchOption.where,
                token: this.token,
                skip: this.fetchCondition.skip,
                limit: this.fetchCondition.limit,
                order: this.fetchCondition.order
            };
            if (this.condition.includes("1")) {
                data.account = this.searchAccount;
            } else {
                data.account = "";
            }
            if (this.condition.includes("2")) {
                data.type = "Y";
            } else {
                data.type = "N";
            }
            this,fetchTableData(data);
        }, 500),
        handleAdd() {
            this.$refs["wonDialog"].dialogVisible = true;
        }
    }
};
</script>
<style lang="scss">
#singleLetter {
    .el-input-group__append {
        text-align: center;
    }
}
</style>
