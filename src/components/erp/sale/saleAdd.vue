<template>
    <div id="sale">
        <div style="padding:20px">
            <div class="heade">
                <i class="el-icon-arrow-left"></i>
                <a href="javascript:void(0)" @click="goBack">返回</a>
            </div>
            <br>
            <h2>新增銷貨單
                <el-button :disabled="disabled" style="float:right" type="success" size="small" @click="handleAdd">新增產品</el-button>
            </h2>
            <br>
            <el-form ref="form" :model="formData" :rules="rules">
                <el-row :gutter="10">
                    <el-col :span="4">
                        <el-form-item label="salePlatform" prop="salePlatform">
                            <el-select v-model="formData.salePlatform">
                                <el-option v-for="(value,i) in searchPlatformOption" :label="value" :value="value" :key="i"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="saleAccount" prop="saleAccount">
                            <el-select v-model="formData.saleAccount">
                                <el-option v-for="(value,i) in searchAccountOption" :label="value" :value="value" :key="i"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="saleCountry" prop="saleCountry">
                            <el-select v-model="formData.saleCountry">
                                <el-option v-for="(value,i) in searchCountryOption" :label="value" :value="value" :key="i"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="currency" prop="currency">
                            <el-select v-model="formData.currency">
                                <el-option v-for="(value,i) in searchCurrecyOption" :label="value" :value="value" :key="i"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="saleTime" prop="saleTime">
                            <el-date-picker value-format="yyyy-MM-dd" style="width:100%" v-model="formData.saleTime" type="date" placeholder="選擇日期時間"> </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <br>
                <div>
                    <table cellspacing="0" cellpadding="0">
                        <colgroup>
                            <col width="100">
                            <col width="100">
                            <col width="200">
                            <col width="100">
                            <col width="100">
                            <col width="100">
                            <col width="40">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>sku</th>
                                <th>productName</th>
                                <th>saleTotalAmount</th>
                                <th>saleQuantity</th>
                                <th>productSpec</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(v,i) in formData.data" :key="i">
                                <td>{{i+1}}</td>
                                <td>
                                    <el-form-item :prop="'data.'+i+'.sku'" :rules="requredRule">
                                        <el-input v-model="v.sku" @blur="handleCheckSku(v.sku,v)"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item :prop="'data.'+i+'.productName'" :rules="requredRule">
                                        <el-input v-model="v.productName"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item :prop="'data.'+i+'.saleTotalAmount'" :rules="requredRule">
                                        <el-input v-model.number="v.saleTotalAmount"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item :prop="'data.'+i+'.saleQuantity'" :rules="requredRule">
                                        <el-input v-model.number="v.saleQuantity"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item :prop="'data.'+i+'.productSpec'" :rules="requredRule">
                                        <el-input v-model="v.productSpec"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-button :disabled="i==0" class="btnh" type="text" title="删除" icon="el-icon-won-22" @click="handleDelete(i)"></el-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br>
                <el-button @click="submit" :loading="submitLoading" type="primary" style="width:150px;height:60px;font-size:18px;display:inline-block">新增</el-button>
            </el-form>
        </div>

    </div>

</template>
<script>
export default {
    data() {
        return {
            submitLoading: false,
            loading: false,
            searchAccountOption: [],
            searchPlatformOption: [],
            searchCountryOption: [],
            searchCurrecyOption: [],
            requredRule: {
                required: true
            },
            rules: {
                currency: {
                    required: true,
                    message:'此项必填'
                }
            },
            formData: {
                currency: "",
                saleTime: "",
                salePlatform: "",
                saleAccount: "",
                saleCountry: "",
                note:"",
                data: [
                    {
                        sku: "",
                        productName: "",
                        saleTotalAmount: "",
                        saleQuantity: "",
                        productSpec:""
                    }
                ]
            }
        };
    },
    created() {
        let saleCurrency = axios({
            url: "/erp/value/currency",
            method: "post",
            data: {
                token: this.token
            }
        });
        let salePlatform = axios({
            url: "/erp/value/salePlatform",
            method: "post",
            data: {
                token: this.token
            }
        });
        let saleCountry = axios({
            url: "/erp/value/saleCountry",
            method: "post",
            data: {
                token: this.token
            }
        });
        let saleAccount = axios({
            url: "/erp/value/saleAccount",
            method: "post",
            data: {
                token: this.token
            }
        });
        Promise.all([
            salePlatform,
            saleCountry,
            saleAccount,
            saleCurrency
        ]).then(([platform, country, account, currency]) => {
            this.searchAccountOption = _.cloneDeep(account);
            this.searchPlatformOption = _.cloneDeep(platform);
            this.searchCountryOption = _.cloneDeep(country);
            this.searchCurrecyOption = _.cloneDeep(currency);
        });
    },
    computed: {
        disabled() {
            let disabled = false;
            _.each(this.formData.data, v => {
                if (!v.sku) {
                    disabled = true;
                }
            });
            return disabled;
        }
    },
    methods: {
        goBack() {
            this.$router.push("/erpSale");
        },
        handleDelete(i) {
            this.formData.data.splice(i, 1);
        },
        handleCheckSku(value, row) {
            if (!value) {
                return;
            }
            axios({
                url: "/erp/check/sku",
                method: "post",
                data: {
                    token: this.token,
                    sku: value
                }
            }).then(res => {
                if (!res.message) {
                    this.$message.success("SKU檢查成功");
                    row.productName = res.productName;
                } else {
                    this.$message.error("SKU不存在");
                    row.sku = "";
                    row.productName = "";
                }
            });
        },
        handleAdd() {
            let obj = {
                sku: "",
                productName: "",
                saleTotalAmount: "",
                saleQuantity: "",
                productSpec:""
            };
            this.formData.data.push(obj);
        },
        handleDelete(index) {
            this.formData.data.splice(index, 1);
        },
        getValue() {
            let data = [];
            _.each(this.formData.data, (v) => {
                let obj = _.cloneDeep(v);
                obj.currency = this.formData.currency;
                obj.saleTime = this.formData.saleTime;
                obj.salePlatform = this.formData.salePlatform;
                obj.saleAccount = this.formData.saleAccount;
                obj.saleCountry = this.formData.saleCountry;
                data.push(obj);
            });
            return JSON.stringify(data);
        },
        submit() {
            this.$refs["form"].validate(action => {
                if (action) {
                    this.submitLoading = true;
                    axios({
                        url: "/sale/add",
                        method: "post",
                        data: {
                            value: this.getValue(),
                            token: this.token
                        }
                    }).then(res => {
                        this.submitLoading = true;
                        this.Bus.$emit("refresh");
                        this.$router.push("/erpSale");
                    });
                }
            });
        }
    }
};
</script>
<style lang="scss">
#sale {
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
        }
    }
}
</style>


