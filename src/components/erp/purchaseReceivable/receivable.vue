<template>
    <div>
        <el-row>
            <el-col :span="22">
                <el-input placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:15%;float:left">
                </el-input>
                <!-- <div style="margin-left:5px;display:inline-block;width:120px">
                    <el-select placeholder="應收帳款類型" v-model="searchType" @change="handleCondition('type')" clearable>
                        <el-option v-for="(v,i) in searchTypeOption" :key="'type'+i" :label="v" :value="v"></el-option>
                    </el-select>
                </div> -->
                <div style="margin-left:5px;display:inline-block;width:120px">
                    <el-select placeholder="應收帳款国家" v-model="searchCountry" @change="handleCondition('cou')" clearable>
                        <el-option v-for="(v,i) in searchCountryOption" :key="'type'+i"  :value="v.countryNameChinese">
                            <span style="float: left">{{ v.countryCode }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryNameChinese }}</span>
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-left:5px;display:inline-block;width:120px">
                    <el-select placeholder="應收帳款平台" v-model="searchPlatform" @change="handleCondition('plat')" clearable>
                        <el-option v-for="(v,i) in searchPlatformOption" :key="'plat'+i" :label="v" :value="v"></el-option>
                    </el-select>
                </div>
                <div style="margin-left:5px;display:inline-block;width:120px">
                    <el-select placeholder="應收帳款帳號" v-model="searchAccount" @change="handleCondition('acc')" clearable>
                        <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v" :value="v"></el-option>
                    </el-select>
                </div>
                <div style="margin-left:5px;display:inline-block;width:250px">
                    <el-date-picker clearable style="width:100%" @change="handleChange" value-format="yyyy-MM-dd" v-model="date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
                <div style="cursor:pointer;display: inline-block;width: 14px;height: 35px;text-align: center;border: 1px solid #dcdfe6;border-radius: 4px;line-height: 35px;" @click="handleSearch" class="el-input-group__append">
                    <i class="el-icon-search"></i>
                </div>
            </el-col>
            <el-col :span="2">
                <el-button style="float:right" @click="handleAdd" type="primary">新增應收帳款</el-button>
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                    <el-table-column min-width="20" label="ID" prop="id" sortable="custom"></el-table-column>
                    <el-table-column min-width="50" label="國家" prop="country" sortable="custom"></el-table-column>
                    <el-table-column min-width="50" label="帳號" prop="account"></el-table-column>
                    <el-table-column min-width="50" label="平台" prop="platform"></el-table-column>
                    <el-table-column min-width="50" label="幣別" prop="currency"></el-table-column>
                    <el-table-column min-width="50" label="費用類型" prop="financialSpendType"></el-table-column>
                    <el-table-column min-width="40" label="金額" prop="amount">
                        <template slot-scope="scope">
                            <span>{{scope.row.amount | formatToMoney}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="50" label="費用涵蓋起始日期" prop="periodStartDate"></el-table-column>
                    <el-table-column min-width="50" label="費用涵蓋結束日期" prop="periodEndDate"></el-table-column>
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
        // let receivableType = axios({
        //     url: "/accountreceivable/value/financialSpendType ",
        //     method: "post",
        //     data: {
        //         token: this.token
        //     }
        // });
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
            receivableCountry
        ]).then(([platform, account, country]) => {
            this.searchAccountOption = _.cloneDeep(account);
            this.searchPlatformOption = _.cloneDeep(platform);
            // this.searchTypeOption = _.cloneDeep(type);
            this.searchCountryOption = _.cloneDeep(country.data);
        });
        this.handleSearch();
        this.Bus.$on("refresh", this.handleSearch);
    },
    filters: {
        ...format
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
                data.financialSpendType  = this.searchType;
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
