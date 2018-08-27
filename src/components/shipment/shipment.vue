<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-input placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:15%;float:left">
                </el-input>
                <div style="margin-left:5px;display:inline-block;width:140px">
                    <el-select placeholder="顯示類型" v-model="searchAccount" @change="handleCondition('display')" clearable>
                        <el-option v-for="(v,i) in searchAccountOption" :key="'display'+i" :label="v.account" :value="v.account"></el-option>
                    </el-select>
                </div>
                <div style="display:inline-block;width:140px">
                    <el-select placeholder="合併做單" v-model="searchMerge" @change="handleCondition('merge')" clearable>
                        <el-option v-for="(v,i) in searchMergeOption" :key="'merge'+i" :label="v.label" :value="v.value"></el-option>
                    </el-select>
                </div>
                <div style="margin-left:5px;display:inline-block;width:140px">
                    <el-select placeholder="帳號" v-model="searchAccount" @change="handleCondition('acc')" clearable>
                        <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v.account" :value="v.account"></el-option>
                    </el-select>
                </div>
                
                <div style="display:inline-block;width:140px">
                    <el-select placeholder="國家" v-model="searchCountry" @change="handleCondition('cou')" clearable>
                        <el-option v-for="(v,i) in searchCountryOption" :key="'country'+i" :label="v.countryCode" :value="v.countryNameChinese">
                            <span style="float: left">{{ v.countryCode }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryNameChinese }}</span>
                        </el-option>
                    </el-select>
                </div>
                <div style="cursor:pointer;display: inline-block;width: 14px;height: 35px;text-align: center;border: 1px solid #dcdfe6;border-radius: 4px;line-height: 35px;" @click="handleSearch" class="el-input-group__append">
                    <i class="el-icon-search"></i>
                </div>
                <el-button style="float:right" @click="handleAdd" type="primary">shipment</el-button>
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                    <el-table-column type="expand">
                        <template slot-scope="scope">
                            <!-- <h5 style="margin-bottom:3px;margin-top:3px;">訂單</h5> -->
                            <table class="wonTable" cellspacing="0" cellpadding="0" border="0">
                                <thead>
                                <th>Wowcher Code</th>
                                <th class="w30">產品名稱</th>
                                <th>申報中文名稱</th>
                                <th>申報英文名稱</th>
                                <th>數量</th>
                                <th>顏色</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(v,i) in scope.row.list" :key="i">
                                        <td>{{v.wowchercode}}</td>
                                        <td>{{v.productName}}</td>
                                        <td>{{v.declareNameChinese}}</td>
                                        <td>{{v.declareNameEnglish}}</td>
                                        <td>{{v.quantity}}</td>
                                        <td>{{v.color}}</td>
                                        
                                    </tr>
                                </tbody>
                            </table>   
                            <h5 style="margin-bottom:3px"></h5>                         
                        </template>
                    </el-table-column>
                    
                    <el-table-column min-width="60" label="狀態" prop="status">
                        <template slot-scope="scope">
                            <span class="line2">{{scope.row.title}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="100" label="Platform Order ID" prop="platformOrderId" sortable="custom"></el-table-column>
                    <el-table-column min-width="100" label="物流單號" prop="trackingNumber" sortable="custom"></el-table-column>
                    <el-table-column min-width="100" label="發貨方式" prop="shippingMethod" sortable="custom"></el-table-column>
                    <el-table-column min-width="100" label="貨代" prop="hippingAgent" sortable="hippingAgent"></el-table-column>
                    
                    <el-table-column width="60" label="動作" align="center">
                        <template slot-scope="scope">
                            <el-button class="btnh" type="text" title="編輯" icon="el-icon-won-1" @click="handleEdit(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <!-- <div style="float:right;margin-top:5px">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :total='total' :current-page="currentPage" :page-sizes="pageSizes" :layout="layout">
                </el-pagination>
            </div> -->
        </el-row>
    </div>
</template>
<script>
import wonTableContainer from "../../common/wonTableContainer";

export default {
    extends: wonTableContainer,
    data() {
        return {
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
                url: "/shipment/unship/search",
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
            }).then(({ data, count }) => {
                this.isTableLoading = false;
                this.tableData = _.cloneDeep(data);
                this.total = count;
            });
        }, 500),
        handleEdit(val) {
            this.$router.push({
                name: "shipmentEdit",
                query: { data: JSON.stringify(val) }
            });
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
        handleCopy(val) {
            this.$router.push({
                name: "shipmentEdit",
                query: { data: JSON.stringify(val), type: "copy" }
            });
        },
        handleAdd() {
            this.$router.push("/shipmentAdd");
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
                    this.condition.push("1");
                }
            }

            if (sign == "merge") {
                if (!this.searchMerge) {
                    _.pull(this.condition, "2");
                } else {
                    this.condition.push("2");
                }
            }

            if (sign == "cou") {
                if (!this.searchCountry) {
                    _.pull(this.condition, "3");
                } else {
                    this.condition.push("3");
                }
            }
            // if (sign == "lang") {
            //     if (!this.searchLanguage) {
            //         _.pull(this.condition, "4");
            //     } else {
            //         this.condition.push("4");
            //     }
            // }
            this.handleSearch();
        }
    }
};
</script>

<style scoped lang="scss">
.el-table th {
    color: #62717e;
    background: rgb(237, 241, 245);
    text-align: center;
}
.wonTable {
    width:100%;
    table-layout: fixed;
    th{
        border: 1px solid #ebeef5;
        background: oldlace !important; 
    }
    td{
        border: 1px solid #ebeef5;
        text-align: center;
        background: #f0f9eb;
    }
    .w30{
        width:30%;
    }
}
</style>
