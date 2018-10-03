<template>
    <div id="purchaseAdd">
        <div style="padding:20px">
            <div class="heade">
                <i class="el-icon-arrow-left"></i>
                <a href="javascript:void(0)" @click="goBack">返回</a>
            </div>
            <br>
            <h2>编辑應收帳款   
            </h2>
            <br>
            <el-form ref="form" :model="formData" v-loading="loading" label-position="top">
                <el-card class="box-card" v-for="(v,i) in formData.data" :key="i" style="margin-bottom:10px">
                    <el-row :gutter="10">
                        <el-col :span="2">
                            <el-form-item label="ID">
                                <span>{{id}}</span>
                            </el-form-item>
                        </el-col>    
                        <el-col :span="3">
                            <el-form-item label="金額" :rules="rules">
                                <el-input v-model="v.amount"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="費用類型" :prop="'data.'+i+'.financialSpendType'" :rules="rules">
                                <el-select placeholder="请选择" v-model="v.financialSpendType" clearable>
                                    <el-option v-for="(v,i) in searchAccountOption" :key="'type'+i" :label="v" :value="v"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="平台" :prop="'data.'+i+'.platform'" :rules="rules">
                                <el-select placeholder="请选择" v-model="v.platform" clearable>
                                    <el-option v-for="(v,i) in searchPlatformOption" :key="'plat'+i" :label="v" :value="v"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="帳號" :prop="'data.'+i+'.account'" :rules="rules">
                                <el-select placeholder="请选择" v-model="v.account" clearable>
                                    <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v" :value="v"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="国家" :prop="'data.'+ i + '.country'" :rules="rules">
                                <el-select placeholder="请选择" v-model="v.country" clearable>
                                    <el-option v-for="(v,i) in searchCountryOption" :key="'type'+i" :value="v.countryNameChinese">
                                        <span style="float: left">{{ v.countryCode }}</span>
                                        <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryNameChinese }}</span>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="幣別" :prop="'data.'+i+'.currency'" :rules="rules">
                                <el-select v-model="v.currency">
                                    <el-option v-for="(value,i) in searchCurrencyOption" :label="value.currency" :value="value.currency" :key="i"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="時間" :prop="'data.'+ i + '.date'" :rules="rules">
                                <el-date-picker clearable style="width:100%" value-format="yyyy-MM-dd" v-model="v.date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
            </el-form>
            <br>
            <el-button @click="submit" :loading="submitLoading" type="primary" style="width:150px;height:60px;font-size:18px;display:inline-block">编辑</el-button>

        </div>
    </div>
</template>
<script>
import { format } from "@/common/until/format";
export default {
    name: "receivableEdit",
    data() {
        return {
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
            submitLoading: false,
            loading: false,
            searchAccountOption: [],
            searchPlatformOption: [],
            searchTypeOption: [],
            searchCountryOption: [],
            searchCurrencyOption: [],
            id:'',
            requredRule: {
                required: true
            },
            rules: {
                required: true,
                message: "此項目必填"
            },
            formData: {
                data: [
                    {
                        date: "",
                        country: "",
                        account: "",
                        platform: "",
                        currency: "",
                        financialSpendType: "",
                        amount: "",
                        periodStartDate: "",
                        periodEndDate: ""
                    }
                ]
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

        let receivableCurrencies = axios({
            url: "/accountreceivable/value/currencies",
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
            receivableCurrencies
        ]).then(([platform, account, country, currencies]) => {
            this.searchAccountOption = _.cloneDeep(account);
            this.searchPlatformOption = _.cloneDeep(platform);
            // this.searchTypeOption = _.cloneDeep(type);
            this.searchCountryOption = _.cloneDeep(country.data);
            this.searchCurrencyOption = _.cloneDeep(currencies);

            let data = JSON.parse(this.$route.query.data);
            this.id = data.id;
            this.formData.data[0].country = data.country;
            this.formData.data[0].account = data.account;
            this.formData.data[0].platform = data.platform;
            this.formData.data[0].currency = data.currency;
            this.formData.data[0].financialSpendType = data.financialSpendType;
            this.formData.data[0].amount = data.amount;
            this.formData.data[0].date = [data.periodStartDate,data.periodEndDate];
        });
    },
    filters: {
        ...format
    },
    methods: {
        goBack() {
            this.$router.push("/receivable");
        },
        handleDelete(index) {
            this.formData.data.splice(index, 1);
        },
        getValue() {
            let data = _.cloneDeep(this.formData.data);
            _.each(data, v => {
                v.periodStartDate = this.moment(
                    v.date[0]
                ).format("YYYY-MM-DD");
                v.periodEndDate = this.moment(
                    v.date[1]
                ).format("YYYY-MM-DD");
                delete v.date
            });
            let obj = {
                data
            };
            return JSON.stringify(obj);
        },
        submit() {
            this.$refs["form"].validate(action => {
                if (action) {
                    this.getValue();
                    this.submitLoading = true;
                    axios({
                        url: "/accountreceivable/add",
                        method: "post",
                        data: {
                            value: this.getValue(),
                            token: this.token
                        }
                    }).then(res => {
                        this.submitLoading = true;
                        this.Bus.$emit("refresh");
                        this.$router.push("/receivable");
                    });
                }
            });
        }
    }
};
</script>
<style lang="scss">
#purchaseAdd {
    .heade {
        font-size: 16px;
        color: #45a2ff;
    }
    .el-form-item {
        margin-bottom: 6px;
    }
    .el-form-item__label {
        padding: 0px !important;
    }
    .heade a {
        color: #45a2ff;
    }
    .total {
        height: 35px;
        background: #f0f9eb;
        td {
            background: transparent !important;
        }
    }
    #table {
        table {
            table-layout: fixed;
            width: 100%;
            border-top: 1px solid #ebeef5;
            border-bottom: 1px solid #ebeef5;
            border-left: 1px solid #ebeef5;
            .btnh {
                padding: 4px 0px;
                color: #62717e;
            }
            .cell {
                padding: 0px;
            }
            .el-form-item {
                overflow: hidden;
                margin: 0px;
            }
            .el-form-item__content {
                line-height: 0px;
            }
            .is-error input {
                background: #f56c6c;
                border-radius: 0%;
            }
            .el-input__inner {
                border: none;
                height: 35px;
                text-align: center;
                color: #62717e;
                font-size: 14px;
            }
            th {
                padding: 4px;
                background: #edf1f5;
                text-align: center;
                color: #62717e;
                // border-right: 1px solid #ebeef5;
            }
            td {
                padding: 0px;
                border-top: 1px solid #ebeef5;
                border-right: 1px solid #ebeef5;
                text-align: center;
                background: white;
                color: #62717e;
                font-size: 14px;
            }
        }
    }
}
</style>


