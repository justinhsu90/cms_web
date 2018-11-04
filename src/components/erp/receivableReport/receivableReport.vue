<template>
    <div>
        <el-row>
            <el-col :span="22">
                <el-input placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:15%;float:left">
                </el-input>
                <div style="margin-left:5px;display:inline-block;width:120px">
                    <el-date-picker clearable style="width:100%;" v-model="year" type="year" placeholder="选择年" @change="handleChange" value-format="yyyy">
                    </el-date-picker>
                </div>
                <div style="margin-left:5px;display:inline-block;width:120px">
                    <el-date-picker clearable style="width:100%;" v-model="month" type="month" placeholder="选择月" @change="handleChange" value-format="MM">
                    </el-date-picker>
                </div>
                <div style="margin-left:5px;display:inline-block;width:250px">
                    <el-date-picker clearable style="width:100%" @change="handleChange" value-format="yyyy-MM-dd" v-model="date" type="daterange" align="right" unlink-panels range-separator="~" start-placeholder="開始日期" end-placeholder="結束日期" :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
                <div @click="handleSearch" class="el-input-group__append search">
                    <i class="el-icon-search"></i>
                </div>
            </el-col>
            <el-col :span="2">
                <el-button style="float:right" @click="handleExport" size="small">生成報告</el-button>
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                    <el-table-column min-width="30" label="Report ID" prop="reportId"></el-table-column>
                    <el-table-column min-width="50" label="年" prop="year"></el-table-column>
                    <el-table-column min-width="50" label="月" prop="month"></el-table-column>
                    <el-table-column min-width="50" label="生成時間" prop="generatedTime" :formatter="formatToTime"></el-table-column>
                    <el-table-column min-width="50" label="生成人" prop="generatedBy"></el-table-column>
                    <el-table-column width="100" label="动作" align="center">
                        <template slot-scope="scope">
                            <el-button class="btnh" type="text" title="查看" icon="el-icon-won-40" @click="handleEdit(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <div style="float:right;margin-top:5px">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :total='total' :current-page="currentPage" :page-sizes="pageSizes" :layout="layout">
                </el-pagination>
            </div>
        </el-row>
        <wonDialog name="receivableReport" ref="dialog" size="45%" title="生成報告" type="form">
            <el-form ref="form" :model="form" slot="content" label-position="top">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="年" prop="year" :rules="{required:true}">
                            <el-date-picker clearable style="width:100%;" v-model="form.year" type="year" placeholder="选择年" value-format="yyyy">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="月" prop="month" :rules="{required:true}">
                            <el-date-picker clearable style="width:100%;" v-model="form.month" type="month" placeholder="选择月" format="MM" value-format="MM">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="平台">
                            <el-select style="width:100%" v-model="form.platform" clearable>
                                <el-option v-for="(v,i) in searchPlatformOption" :label="v" :value="v" :key="i"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="账号">
                            <el-select style="width:100%" v-model="form.account" clearable>
                                <el-option v-for="(v,i) in searchAccountOption" :label="v" :value="v" :key="i"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="国家">
                            <el-select style="width:100%" v-model="form.country" clearable>
                                <el-option v-for="(v,i) in searchCountryOption" :value="v.countryNameChinese" :key="i">
                                    <span style="float: left">{{ v.countryCode }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryNameChinese }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </wonDialog>
    </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
import wonDialog from "@/common/wonDialog";
export default {
    name: "receivableReport",
    extends: wonTableContainer,
    components: {
        wonDialog
    },
    data() {
        return {
            export: false,
            searchAccountOption: [],
            searchPlatformOption: [],
            searchCountryOption: [],
            form: {
                year: "",
                month: "",
                country: "",
                account: "",
                platform: ""
            },
            year: "",
            month: "",
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
            fetchCondition: {
                skip: 0,
                limit: 15,
                order: "-lastUpdatedTime"
            },
            fetchOption: {
                url: "/accountreceivable/report/search",
                method: "post",
                where: ""
            }
        };
    },
    created() {
        this.handleSearch();
        this.$on("selectSku", this.submit);
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
            if (!_.isEmpty(this.date)) {
                data.generatedStartDate = this.date[0];
                data.generatedEndDate = this.date[1];
            }
            if (this.year) {
                data.year = this.year;
            }
            if (this.month) {
                data.month = Number(this.month);
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
        handleChange() {
            this.handleSearch();
        },
        handleEdit(val) {
            this.$router.push({
                name: "receivableReportEdit",
                query: {
                    id: val.reportId,
                    year: val.year,
                    month: val.month,
                    generatedTime: val.generatedTime
                }
            });
        },
        handleExport() {
            this.$refs["dialog"].dialogVisible = true;
            if (this.export) return;
            this.export = true;
            let platform = axios({
                url: "/accountreceivable/report/value/platform",
                method: "post",
                data: {
                    token: this.token
                }
            });
            let country = axios({
                url: "/accountreceivable/report/value/country",
                method: "post",
                data: {
                    token: this.token
                }
            });
            let account = axios({
                url: "/accountreceivable/report/value/account",
                method: "post",
                data: {
                    token: this.token
                }
            });
            Promise.all([platform, country, account]).then(
                ([platform, { data: country }, account]) => {
                    this.searchAccountOption = _.cloneDeep(account);
                    this.searchPlatformOption = _.cloneDeep(platform);
                    this.searchCountryOption = _.cloneDeep(country);
                }
            );
        },
        getValue() {
            let data = {};
            if (this.form.country) {
                data.country = this.form.country;
            }
            if (this.form.account) {
                data.account = this.form.account;
            }
            if (this.form.platform) {
                data.platform = this.form.platform;
            }
            data.year = this.form.year;
            data.month = Number(this.form.month);
            data.token = this.token;
            return data;
        },
        submit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    this.$refs["dialog"].dialogVisible = false;
                    axios({
                        url: "/accountreceivable/report/generate",
                        method: "post",
                        data: this.getValue()
                    }).then(() => {
                        this.handleSearch();
                    });
                }
            });
        }
    }
};
</script>

<style scoped>
</style>
