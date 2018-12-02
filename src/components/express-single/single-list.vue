<template>
    <div id="shipment">
        <el-row>
            <el-col :span="24">
                <el-input class="w-max200 ibbox" placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch">
                </el-input>
                <el-select class="w-max150" placeholder="顯示類型" v-model="searchAccount" @change="handleCondition('display')" clearable>
                    <el-option v-for="(v,i) in searchAccountOption" :key="'display'+i" :label="v.account" :value="v.account"></el-option>
                </el-select>
                <el-select class="w-max150" placeholder="合併做單" v-model="searchMerge" @change="handleCondition('merge')" clearable>
                    <el-option v-for="(v,i) in searchMergeOption" :key="'merge'+i" :label="v.label" :value="v.value"></el-option>
                </el-select>
                <el-select class="w-max150" placeholder="帳號" v-model="searchAccount" @change="handleCondition('acc')" clearable>
                    <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v.account" :value="v.account"></el-option>
                </el-select>

                <el-select class="w-max150" placeholder="國家" v-model="searchCountry" @change="handleCondition('cou')" clearable>
                    <el-option v-for="(v,i) in searchCountryOption" :key="'country'+i" :label="v.countryCode" :value="v.countryNameChinese">
                        <span style="float: left">{{ v.countryCode }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryNameChinese }}</span>
                    </el-option>
                </el-select>
                <div @click="handleSearch" class="el-input-group__append search">
                    <i class="el-icon-search"></i>
                </div>
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                    <el-table-column type="expand">
                        <template slot-scope="scope">
                            <el-row type="flex" justify="space-around" style="padding:5px;margin-left:50px">
                                <el-col :span="6">
                                    <div>
                                        <span class="infol">收件人:</span>
                                        <span class="infoR"> {{scope.row.shipToAddress.contact}}</span>
                                    </div>
                                    <div>
                                        <span class="infol">電話:</span>
                                        <span class="infoR"> {{scope.row.shipToAddress.phone}}</span>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div style="margin-bottom:4px">
                                        <span class="infol">地址1:</span>
                                        <span class="infoR"> {{scope.row.shipToAddress.street1}}</span>
                                    </div>
                                    <div style="margin-bottom:4px">
                                        <span class="infol">省/州:</span>
                                        <span class="infoR"> {{scope.row.shipToAddress.province}}</span>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div>
                                        <span class="infol">城市:</span>
                                        <span class="infoR"> {{scope.row.shipToAddress.city}}</span>
                                    </div>
                                    <div style="margin-bottom:4px">
                                        <span class="infol">國家:</span>
                                        <span class="infoR"> {{scope.row.shipToAddress.country}}</span>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div style="margin-bottom:4px">
                                        <span class="infol">郵編:</span>
                                        <span class="infoR"> {{scope.row.shipToAddress.postcode}}</span>
                                    </div>
                                </el-col>
                            </el-row>
                            <table class="wonTable" cellspacing="0" cellpadding="0" border="0">
                                <thead>
                                    <th>sku</th>
                                    <th>數量</th>
                                    <th class="w30">產品名稱</th>
                                    <th>申報價值</th>
                                    <th>申報中文名稱</th>
                                    <th>申報英文名稱</th>
                                    <th>重量</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(v,i) in scope.row.skus" :key="i">
                                        <td>{{v.sku}}</td>
                                        <td>{{v.quantity}}</td>
                                        <td>{{v.productName}}</td>
                                        <td>{{v.declareValue}}</td>
                                        <td>{{v.declareNameCn}}</td>
                                        <td>{{v.declareNameEn}}</td>
                                        <td>{{v.weight}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="100" label="packageId" prop="packageId" align="left">
                        <template slot-scope="scope">
                            <span @click="handleToggle(scope.row)" style="color:#45a2ff;cursor:pointer">{{scope.row.packageId}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column min-width="60" label="serviceCode" prop="serviceCode">
                    </el-table-column>
                    <el-table-column min-width="100" label="remark" prop="remark"></el-table-column>
                    <el-table-column min-width="100" label="custom" prop="custom"></el-table-column>
                    <el-table-column width="60" label="動作" align="center">
                        <template slot-scope="{row,$index}">
                            <el-button class="btnh" type="text" title="編輯" icon="el-icon-won-1" @click="handleEdit(row,$index)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <wonDialog ref="dialogVisible" title="编辑"  name="single">
            <singleEdit ref="singleEdit" :row="row" slot="content"></singleEdit>
        </wonDialog>
    </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
import wonDialog from "@/common/wonDialog"
import singleEdit from "./single-edit"
export default {
    name:'single',
    extends: wonTableContainer,
    components:{
      wonDialog,
      singleEdit 
    },
    data() {
        return {
            row:{},
            tableData: [],
            searchMerge: "",
            searchMergeOption: [
                {
                    label: "Y",
                    value: "Y"
                },
                {
                    label: "N",
                    value: "N"
                }
            ],
            maxHeight: 450,
            condition: [],
            isTableLoading: false,
            pageSizes: [20, 40, 60, 100, 200],
            searchAccount: "",
            searchAccountOption: [],
            searchPlatform: "",
            searchPlatformOption: [],
            searchCountry: "",
            searchCountryOption: [],
            searchLanguage: "",
            searchLanguageOption: [],
            fetchCondition: {
                skip: 0,
                limit: 10000
            },
            fetchOption: {
                url: "/cke/shipment/unshiplist",
                method: "post",
                where: ""
            }
        };
    },
    created() {
        let account = axios({
            url: "/content/value/account",
            method: "post",
            data: {
                token: this.token
            }
        });
        let country = axios({
            url: "/content/value/country",
            method: "post",
            data: {
                token: this.token
            }
        });
        Promise.all([account, country]).then(([account, country]) => {
            this.searchAccountOption = _.cloneDeep(account.data);
            this.searchCountryOption = _.cloneDeep(country.data);
        });
        this.handleSearch();
        this.Bus.$on("refresh", this.handleSearch);
    },
    mounted(){
        this.$on('selectSku',(v)=>{
            let data = this.tableData;
            _.each(data,(v,i)=>{
                if(i == this.$index){
                    data[i] = _.cloneDeep(this.$refs['singleEdit'].form);
                }
            })
            this.tableData = _.cloneDeep(data);
        })
    },
    methods: {
        handleSearch: _.debounce(function() {
            this.isTableLoading = true;
            let data = {
                where: this.fetchOption.where,
                token: this.token,
                skip: this.fetchCondition.skip,
                limit: this.fetchCondition.limit
            };
            if (this.condition.includes("1")) {
                data.account = this.searchAccount;
            }
            if (this.condition.includes("2")) {
                data.merge = this.searchMerge;
            }
            if (this.condition.includes("3")) {
                data.country = this.searchCountry;
            }
            axios({
                url: this.fetchOption.url,
                method: this.fetchOption.method,
                data
            }).then(({ packages }) => {
                this.isTableLoading = false;
                this.tableData = _.cloneDeep(packages);
            });
        }, 500),
        handleEdit(row,index) { 
            this.$refs['dialogVisible'].dialogVisible = true;
            this.row = row;
            this.$index = index;
        },
        handleDelete(val) {
            this.$confirm("是否删除", "提示", {
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    axios({
                        url: "/content/remove",
                        method: "post",
                        data: {
                            value: val.contentId,
                            token: this.token
                        }
                    }).then(() => {
                        this.handleSearch();
                        this.$message.success("删除成功");
                    });
                })
                .catch(() => {});
        },
        handleToggle(row) {
            row.toggle = !row.toggle;
            this.$refs["wonTable"].toggleRowExpansion(row, row.toggle);
        },
        handleCopy(val) {
            this.$router.push({
                name: "single-edit",
                query: { data: JSON.stringify(val), type: "copy" }
            });
        },
        handleCondition(sign) {
            if (sign == "acc") {
                if (!this.searchAccount) {
                    _.pull(this.condition, "1");
                } else {
                    this.condition.push("1");
                }
            }
            if (sign == "display") {
                if (!this.searchAccount) {
                    _.pull(this.condition, "1");
                } else {
                    if (!this.condition.includes("1")) {
                        this.condition.push("1");
                    }
                }
            }

            if (sign == "merge") {
                if (!this.searchMerge) {
                    _.pull(this.condition, "2");
                } else {
                    if (!this.condition.includes("2")) {
                        this.condition.push("2");
                    }
                }
            }

            if (sign == "cou") {
                if (!this.searchCountry) {
                    _.pull(this.condition, "3");
                } else {
                    if (!this.condition.includes("3")) {
                        this.condition.push("3");
                    }
                }
            }
            this.handleSearch();
        }
    }
};
</script>

<style lang="scss">
#shipment {
    .tc {
        text-align: center;
    }
    .infol {
        color: #99a9bf;
        font-size: 15px;
    }
    .infoR {
        font-size: 15px;
    }
    .el-table th {
        color: #62717e;
        background: rgb(237, 241, 245);
    }
    .wonTable {
        width: 85%;
        table-layout: fixed;
        margin: 0 auto;
        margin-left: 4%;
        th {
            border-bottom: 1px solid #ebeef5;
            padding: 4px;
            background: oldlace !important;
            text-align: center;
        }
        td {
            padding: 4px;
            border-bottom: 1px solid #ebeef5;
            text-align: center;
            background: #f0f9eb;
        }
        .w30 {
            width: 30%;
        }
    }
    .el-table__expand-icon {
        color: #45a2ff;
    }
    .btnh {
        padding: 6px 0;
    }
}
</style>
