<template>
    <div>
        <el-row class="mb5">
            <h3>
                <div class="ibbox">
                    <span>生成做單上傳文件</span>
                    <span class="label-tips fz14">
                    請先選擇貨代,在選擇運輸方式
                    </span>
                </div>
                <div class="ibbox">
                    <el-button size="small" type="primary" :loading="pullLoading" @click="handleClick">抓取未發貨清單</el-button>
                    <el-button size="small" type="primary" :loading="fileLoading" @click="submit">生成文件</el-button>
                </div>
            </h3>
        </el-row>
        <el-row class="mb5" :gutter="10">
                <el-select class="w15"  placeholder="合併貨代方式" v-model="searchAgent" @change="handleChange('agent')">
                    <el-option v-for="(v,i) in shippingMethodAgent" :key="i" :label="v" :value="v"></el-option>
                </el-select>
                <el-select class="w15" placeholder="合併運輸方式" v-model="searchShippingMethod">
                    <el-option v-for="(v,i) in serachShippingMethodData" :key="i" :label="v.shippingMethodName" :value="v.shippingMethodCode">
                    </el-option>
                </el-select>
                <el-select class="w15" placeholder="愛爾蘭貨代方式" v-model="isearchAgent" @change="handleAgentChange('iagent')">
                    <el-option v-for="(v,i) in iagent" :key="i" :label="v" :value="v"></el-option>
                </el-select>
                <el-select  class="w15" placeholder="愛爾蘭運輸方式" v-model="isearchShippingMethod" @change="handleChangeShippingMethod('iagent')">
                    <el-option v-for="(v,i) in iserachShippingMethodData" :key="i" :label="v.shippingMethodName" :value="v.shippingMethodCode">
                    </el-option>
                </el-select>   
                <el-select class="w15" placeholder="英国貨代方式" v-model="ysearchAgent" @change="handleAgentChange('yagent')">
                    <el-option v-for="(v,i) in yagent" :key="i" :label="v" :value="v"></el-option>
                </el-select>
                <el-select class="w15" placeholder="英国運輸方式" v-model="ysearchShippingMethod" @change="handleChangeShippingMethod('yagent')">
                    <el-option v-for="(v,i) in yserachShippingMethodData" :key="i" :label="v.shippingMethodName" :value="v.shippingMethodCode">
                    </el-option>
                </el-select>
        </el-row>
        <el-row class="mb5">
            <span>平台：</span>
            <el-checkbox-group v-model="platform" class="ibbox">
                <el-checkbox :label="1">Wowcher</el-checkbox>
                <el-checkbox :label="2">MightyDeals</el-checkbox>
                <el-checkbox :label="3">Gogroopie</el-checkbox>
                <el-checkbox :label="4">Replacement</el-checkbox>
            </el-checkbox-group>
        </el-row>
        <el-row>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                    <el-table-column width="50" label="國家" prop="country"></el-table-column>
                    <el-table-column width="70" label="重量" prop="parcelWeight">
                           <template slot-scope="scope">
                           {{scope.row.parcelWeight}}kg
                          </template>

                    </el-table-column>
                    <el-table-column min-width="50" label="貨代" prop="agent">
                        <template slot-scope="{row}">
                            <el-select v-model="row.agent" @change="handleChange(row)">
                                <el-option v-for="(v,i) in methodAgent(row)" :key="i" :label="v" :value="v"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="70" label="運送方式" prop="shippingMethod">
                        <template slot-scope="{row}">
                            <el-select v-model="row.shippingMethod">
                                <el-option v-for="(v,i) in row.shippingMethodData" :key="i" :label="v.shippingMethodName" :value="v.shippingMethodCode"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="220" label="商品名稱" prop="productName"></el-table-column>
                </el-table>
            </el-col>
            <!-- <div style="float:right;margin-top:5px">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :total='total' :current-page="currentPage" :page-sizes="pageSizes" :layout="layout">
                </el-pagination>
            </div> --> 
        </el-row>
        <wonDialog size="30%" title="下载" :showConfirm="false" ref="wonDialog">
            <div class="t_a-c" slot="content">
                <a :href="url" class="c-a">请点击下载报告</a>
            </div>
        </wonDialog>
    </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
import wonDialog from "@/common/wonDialog";
export default {
    components: {
        wonDialog
    },
    extends: wonTableContainer,
    data() {
        return {
            fileLoading: false,
            pullLoading: false,
            url: "",
            tableData: [],
            condition: [],
            searchShippingMethodOption: [],
            maxHeight: 450,
            isTableLoading: false,
            fetchCondition: {
                skip: 0,
                order: "",
                limit: 15
            },
            fetchOption: {
                url: "/shipment/productList",
                where: "",
                method: "post"
            },
            platform: [],
            shippingMethodAgent: [],
            shippingMethodData: [],
            serachShippingMethodData: [],
            isearchAgent: "",
            iserachShippingMethodData: [],
            isearchShippingMethod: "",
            ysearchAgent: "",
            yserachShippingMethodData: [],
            ysearchShippingMethod: "",
            searchShippingMethod: "",
            searchAgent: "",
            agent: [],
            iagent: [],
            yagent: []
        };
    },
    created() {
        let shippingMethod = axios({
            url: "shipment/shippingMethod",
            method: "post",
            data: {
                token: this.token
            }
        }).then(shippingMethod => {
            let shippingMethodAgent = [];
            let iagent = [];
            let yagent = [];
            let shippingMethodData = _.cloneDeep(shippingMethod);
            this.agent = _.cloneDeep(shippingMethod);
            _.each(shippingMethod, v => {
                if (!shippingMethodAgent.includes(v.shippingMethodAgent)) {
                    shippingMethodAgent.push(v.shippingMethodAgent);
                }
                if (v.shippingMethodCountry == "IE") {
                    if (!iagent.includes(v.shippingMethodAgent)) {
                        iagent.push(v.shippingMethodAgent);
                    }
                }
                if (v.shippingMethodCountry == "GB") {
                    if (!yagent.includes(v.shippingMethodAgent)) {
                        yagent.push(v.shippingMethodAgent);
                    }
                }
            });
            this.shippingMethodAgent = shippingMethodAgent;
            this.shippingMethodData = shippingMethodData;
            this.iagent = iagent;
            this.yagent = yagent;
        });
    },
    methods: {
        methodAgent(row) {
            let data = _.filter(this.agent, v => {
                return v.shippingMethodCountry == row.country;
            });
            let agent = [];
            _.each(data, v => {
                if (!agent.includes(v.shippingMethodAgent)) {
                    agent.push(v.shippingMethodAgent);
                }
                return;
            });
            return agent;
        },
        handleClick() {
            this.pullLoading = true;
            this.handleSearch();
        },
        handleCondition(sign) {
            this.handleSearch();
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
            axios({
                url: this.fetchOption.url,
                method: this.fetchOption.method,
                data
            }).then(res => {
                this.isTableLoading = false;
                this.pullLoading = false;
                this.tableData = _.cloneDeep(res);
                _.each(this.tableData, v => {
                    if (v.agent) {
                        let data = _.filter(this.shippingMethodData, value => {
                            return value.shippingMethodAgent == v.agent;
                        });
                        this.$set(v, "shippingMethodData", data);
                    } else {
                        this.$set(v, "shippingMethodData", []);
                    }
                });
                // this.total = count;
            });
        }, 500),
        handleChangeShippingMethod(val) {
            if (val == "iagent") {
                _.each(this.tableData, v => {
                    if (v.country == "IE") {
                        v.shippingMethod = this.isearchShippingMethod;
                    }
                });
            }
            if (val == "yagent") {
                _.each(this.tableData, v => {
                    if (v.country == "GB") {
                        v.shippingMethod = this.ysearchShippingMethod;
                    }
                });
            }
        },
        handleAgentChange(val) {
            if (val == "iagent") {
                let data = _.filter(this.shippingMethodData, value => {
                    return value.shippingMethodAgent == this.isearchAgent;
                });
                this.iserachShippingMethodData = data;
                this.isearchShippingMethod = "";
                _.each(this.tableData, v => {
                    if (v.country == "IE") {
                        v.agent = this.isearchAgent;
                        this.handleChange(v);
                    }
                });
            }
            if (val == "yagent") {
                let data = _.filter(this.shippingMethodData, value => {
                    return value.shippingMethodAgent == this.ysearchAgent;
                });
                this.yserachShippingMethodData = data;
                this.ysearchShippingMethod = "";
                _.each(this.tableData, v => {
                    if (v.country == "GB") {
                        v.agent = this.ysearchAgent;
                        this.handleChange(v);
                    }
                });
            }
        },
        handleChange(row) {
            if (row == "agent") {
                let data = _.filter(this.shippingMethodData, value => {
                    return value.shippingMethodAgent == this.searchAgent;
                });
                this.serachShippingMethodData = data;
                return;
            }
            if (row == "iagent") {
                let data = _.filter(this.shippingMethodData, value => {
                    return value.shippingMethodAgent == this.isearchAgent;
                });
                this.iserachShippingMethodData = data;
                return;
            }
            if (row == "yagent") {
                let data = _.filter(this.shippingMethodData, value => {
                    return value.shippingMethodAgent == this.ysearchAgent;
                });
                this.yserachShippingMethodData = data;
                return;
            }
            if (row != "agent" && row != "iagent") {
                let data = _.filter(this.shippingMethodData, value => {
                    return value.shippingMethodAgent == row.agent;
                });
                row.shippingMethodData = data;
                row.shippingMethod = "";
            }
        },
        getValue() {
            let data = _.cloneDeep(this.tableData);
            if (_.isEmpty(data)) {
                this.$message.warning("請抓取未發貨清單");
                return false;
            }
            let init = false;
            _.each(data, v => {
                if (init) return;
                if (!v.agent || !v.shippingMethod) {
                    init = true;
                    this.$message.warning("選擇貨代或運輸方式必須全部選擇");
                }
                delete v.shippingMethodData;
            });
            if (init) {
                return false;
            }
            if (this.searchAgent && this.searchShippingMethod) {
                data.push({
                    productName: "batch",
                    country: "",
                    shippingMethod: this.searchShippingMethod,
                    agent: this.searchAgent,
                    parcelWeight: 0
                });
            }
            let obj = {
                token: this.token,
                value: JSON.stringify({data})
            };
            return obj;
        },
        submit() {
            if (this.getValue()) {
                this.fileLoading = true;
                axios({
                    url: "/shipment/generate",
                    method: "post",
                    data: this.getValue()
                }).then(res => {
                    if (res.includes("http")) {
                        this.url = res;
                        this.$refs["wonDialog"].$emit("visible", res);
                    } else {
                        this.$message.error("生成失败");
                    }
                    this.fileLoading = false;
                });
            }
        }
    }
    // computed:{
    //     methodAgent(){

    //     }
    // }
};
</script>


