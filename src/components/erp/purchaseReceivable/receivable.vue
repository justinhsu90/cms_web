<template>
    <div>
        <el-row>
            <el-col :span="22">
                <el-input class="w-max200 ibbox" placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch">
                </el-input>
                <el-select class="w-max150" placeholder="費用類型" v-model="searchType" @change="handleCondition('type')" clearable>
                    <el-option v-for="(v,i) in searchTypeOption" :key="'type'+i" :label="v.financialSpendType" :value="v.financialSpendType"></el-option>
                </el-select>
                <el-select class="w-max150" placeholder="國家" v-model="searchCountry" @change="handleCondition('cou')" clearable>
                    <el-option v-for="(v,i) in searchCountryOption" :key="'type'+i" :value="v.countryNameChinese">
                        <span style="float: left">{{ v.countryCode }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryNameChinese }}</span>
                    </el-option>
                </el-select>
                <el-select class="w-max150" placeholder="平台" v-model="searchPlatform" @change="handleCondition('plat')" clearable>
                    <el-option v-for="(v,i) in searchPlatformOption" :key="'plat'+i" :label="v" :value="v"></el-option>
                </el-select>
                <el-select class="w-max150" placeholder="帳號" v-model="searchAccount" @change="handleCondition('acc')" clearable>
                    <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v" :value="v"></el-option>
                </el-select>
                <el-date-picker class="w-max180" clearable style="width:100%" @change="handleChange" value-format="yyyy-MM-dd" v-model="date" type="daterange" align="right" unlink-panels range-separator="~" start-placeholder="開始日期" end-placeholder="結束日期" :picker-options="pickerOptions">
                </el-date-picker>
                <div @click="handleSearch" class="el-input-group__append search">
                    <i class="el-icon-search"></i>
                </div>
            </el-col>
            <el-col :span="2">
                <el-button style="float:right" @click="handleAdd" type="primary">新增</el-button>
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                    <el-table-column min-width="30" label="ID" prop="id"></el-table-column>
                    <el-table-column min-width="50" label="費用類型" prop="financialSpendType"></el-table-column>
                    <el-table-column min-width="50" label="國家" prop="country" sortable="custom"></el-table-column>
                    <el-table-column min-width="50" label="帳號" prop="account"></el-table-column>
                    <el-table-column min-width="50" label="平台" prop="platform"></el-table-column>
                    <el-table-column min-width="60" label="金額" prop="amount">
                        <template slot-scope="scope">
                            {{scope.row.amount | formatToYuan}}&nbsp;{{scope.row.currency.toUpperCase()}}
                        </template>
                    </el-table-column>
                    <el-table-column min-width="80" label="日期" prop="periodEndDate">
                        <template slot-scope="scope">
                            {{scope.row.periodStartDate}}&nbsp;{{"~"}}&nbsp;{{scope.row.periodEndDate}}
                        </template>
                    </el-table-column>
                    <el-table-column width="50" label="動作" align="center">
                        <template slot-scope="scope">
                            <el-button class="btnh" type="text" title="編輯" icon="el-icon-won-1" @click="handleEdit(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <won-pagination v-bind="paginationProps" v-on="paginationListeners">
            </won-pagination>
        </el-row>
    </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
import { format } from "@/common/until/format";
export default {
    extends: wonTableContainer,
    data() {
        return {
            date: [],
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            },
            tableData: [],
            maxHeight: 450,
            condition: [],
            isTableLoading: false,
            searchAccount: "",
            searchPlatform: "",
            searchType: "",
            searchCountry: "",
            searchAccountOption: [],
            searchPlatformOption: [],
            searchTypeOption: [],
            searchCountryOption: [],
            fetchCondition: {
                skip: 0,
                limit: 15,
                order: "-lastUpdatedTime"
            },
            fetchOption: {
                url: "/accountreceivable/search",
                method: "post",
                where: ""
            }
        };
    },
    created() {
        let receivablePlatform = axios({
            url: "/accountreceivable/value/platform",
            method: "post",
            data: {
                token: this.token
            }
        });
        let receivableType = axios({
            url: "/accountreceivable/value/financialSpendType ",
            method: "post",
            data: {
                token: this.token
            }
        });
        let receivableAccount = axios({
            url: "/accountreceivable/value/account",
            method: "post",
            data: {
                token: this.token
            }
        });
        let receivableCountry = axios({
            url: "/accountreceivable/value/country",
            method: "post",
            data: {
                token: this.token
            }
        });
        Promise.all([
            receivablePlatform,
            receivableAccount,
            receivableCountry, 
            receivableType
        ]).then(([platform, account, country, type]) => {
            this.searchAccountOption = _.cloneDeep(account);
            this.searchPlatformOption = _.cloneDeep(platform);
            this.searchTypeOption = _.cloneDeep(type.data);
            this.searchCountryOption = _.cloneDeep(country.data);
            
        });
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
            if (this.condition.includes("1")) {
                data.platform = this.searchPlatform;
            }
            if (this.condition.includes("2")) {
                data.financialSpendType = this.searchType;
            }
            if (this.condition.includes("3")) {
                data.account = this.searchAccount;
            }
            if (this.condition.includes("4")) {
                data.country = this.searchCountry;
            }
            if (!_.isEmpty(this.date)) {
                data.periodStartDate = this.date[0];
                data.periodEndDate = this.date[1];
            }
            this.fetchTableData(data);
        }, 500),
        handleChange(n) {
            this.handleSearch();
        },
        handleEdit(val) {
            this.$router.push({
                name: "receivableEdit",
                query: { data: JSON.stringify(val) }
            });
        },
        handleAdd() {
            this.$router.push("/receivableAdd");
        },
        handleCondition(sign) {
            if (sign == "plat") {
                if (!this.searchPlatform) {
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
            if (sign == "acc") {
                if (!this.searchAccount) {
                    _.pull(this.condition, "3");
                } else {
                    if (!this.condition.includes("3")) {
                        this.condition.push("3");
                    }
                }
            }
            if (sign == "cou") {
                if (!this.searchCountry) {
                    _.pull(this.condition, "4");
                } else {
                    if (!this.condition.includes("4")) {
                        this.condition.push("4");
                    }
                }
            }
            this.handleSearch();
        }
    }
};
</script>

<style scoped>
</style>
