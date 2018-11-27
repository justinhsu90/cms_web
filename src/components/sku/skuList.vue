<template>
    <div id="sku">
        <el-row>
            <el-col :span="10">
                <el-input class="w-max200 fl" v-model="fetchOption.where" @keyup.enter.native="handleSearch">
                </el-input>
                <div @click="handleSearch" class="el-input-group__append search">
                    <i class="el-icon-search"></i>
                </div>
                <el-popover ref="popover" placement="top-start" title="搜索" width="200" trigger="hover" content="Search SKU, NEW SKU, Product Name, Deprecated SKU 字段">
                    <el-button slot="reference" style="width:20px;height:20px;margin:10px 0px 0px 10px;padding:0px;border-radius:50%;color:#666">?</el-button>
                </el-popover>
            </el-col>
            <el-col :span="14">
                <el-button class="fr" @click="handleAdd" type="primary">新增SKU</el-button>
                <el-button :loding="exportLoading" class="fr mr10 mt5" @click="handleExport" size="small">导出SKU</el-button>
                <el-checkbox-group v-model="record" @change="handleSize" size="small" style="display:inline-block;padding:5px;float:right">
                    <el-checkbox-button label="deprecatedSku" :key="4">已停用SKU</el-checkbox-button>
                    <el-checkbox-button label="price" :key="5">成本</el-checkbox-button>
                </el-checkbox-group>
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange" :row-key="rowKey">
                    <el-table-column type="selection" width="55" reserve-selection>
                    </el-table-column>
                    <el-table-column sortable="custom" label="產品名稱" prop="productName" min-width="180"></el-table-column>
                    <el-table-column sortable="custom" min-width="80" label="SKU" prop="sku"></el-table-column>
                    <el-table-column min-width="100" key="4" label="Amazon(長x寬x高/重)" prop="Amazon">
                        <template slot-scope="scope">
                            <span>{{scope.row.amazonLengthCM}}</span>x<span>{{scope.row.amazonWidthCM}}</span>x<span>{{scope.row.amazonHeightCM}}cm</span>/<span>{{scope.row.amazonWeightKG}}kg</span>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="80" key="7" label="小包(長x寬x高/重)" prop="parcel">
                        <template slot-scope="scope">
                            <span>{{scope.row.parcelLengthCM}}</span>x<span>{{scope.row.parcelWidthCM}}</span>x<span>{{scope.row.parcelHeightCM}}cm</span>/<span>{{scope.row.parcelWeightKG}}kg</span>
                        </template>
                    </el-table-column>
                    <template v-if="deprecatedSkuShow">
                        <el-table-column min-width="100" label="已停用 SKU" prop="deprecatedSKU" algin="center" key="11"> </el-table-column>
                    </template>
                    <template v-if="priceShow">
                        <el-table-column min-width="70" label="成本" prop="productCost" key="10">
                            <template slot-scope="scope">
                                {{scope.row.productCost | formatToMoney}}&nbsp;{{scope.row.productCostCurrency}}
                            </template>
                        </el-table-column>
                    </template>
                    <el-table-column class-name="tableColumn" label="圖片" width="70" align="center">
                        <template slot-scope="scope">
                            <img width="50" height="50" style="cursor:pointer" :src="scope.row.snapshotURL" @click="scope.row.dialogTableVisible = true">
                            <el-dialog title="圖片" :modal="false" :visible.sync="scope.row.dialogTableVisible" width="30%">
                                <img width="100%" :src="scope.row.imageURL">
                            </el-dialog>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="50" label="動作" fixed="right">
                        <template slot-scope="scope">
                            <el-button class="btnh" type="text" title="編輯" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
                            <el-button class="btnh" type="text" title="複製" icon="el-icon-won-124" @click="handleCopy(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <won-pagination v-bind="paginationProps" v-on="paginationListeners">
                <span class="fz13 c-gray5 lh33">共選擇 {{selection.length}} 條 </span>
            </won-pagination>
        </el-row>
        <wonDialog name="sku" ref="dialog" size="35%" title="sku导出" :showConfirm="false">
            <div slot="content" class="t_a-c">
                <a class="pic-text" :href="url">点击下载</a>
            </div>
        </wonDialog>
    </div>
</template>
<script>
import wonTableContainer from "../../common/wonTableContainer";
import wonDialog from "@/common/wonDialog";
export default {
    extends: wonTableContainer,
    name: "sku",
    components: {
        wonDialog
    },
    data() {
        return {
            url: "javascript:void(0)",
            exportLoading: false,
            record: [],
            maxHeight: 450,
            amaShow: false,
            parcelShow: false,
            deprecatedSkuShow: false,
            priceShow: false,
            productShow: false,
            selection: [],
            value: "",
            tableData: [],
            isTableLoading: false,
            showDialog: false,
            row: [],
            dialogTableVisible: false,
            fetchCondition: {
                skip: 0,
                limit: 15,
                order: "-AddedTime"
            },
            fetchOption: {
                url: "sku/search",
                where: "",
                method: "post"
            }
        };
    },
    created() {
        this.handleSearch();
        this.Bus.$on("refresh", this.handleSearch);
    },
    mounted() {
        this.$refs["wonTable"].$watch("store.states.selection", v => {
            this.selection = v;
        });
    },
    methods: {
        handleExport() {            
            this.exportLoading = true;
            let data = [];
            _.each(this.selection, v => {
                data.push(v.sku);
            });
            axios({
                url:"sku/generate/excel",
                method: "post",
                data: {
                    token: this.token,
                    value:JSON.stringify(data)
                }
            }).then((res) => {
                this.$refs["dialog"].dialogVisible = true;
                this.exportLoading = false;
                this.url = res;
            });
        },
        handleSearch: _.debounce(function() {
            this.isTableLoading = true;
            if (this.fetchOption.where) {
                this.fetchCondition.order = "sku";
            } else {
                this.fetchCondition.order = "-AddedTime";
            }
            axios({
                url: this.fetchOption.url,
                method: this.fetchOption.method,
                data: {
                    where: this.fetchOption.where,
                    token: this.token,
                    skip: this.fetchCondition.skip,
                    limit: this.fetchCondition.limit,
                    order: this.fetchCondition.order
                }
            }).then(({ data, count }) => {
                this.isTableLoading = false;
                _.each(data, v => {
                    v.dialogTableVisible = false;
                });
                this.tableData = _.cloneDeep(data);
                this.total = count;
                this.paginationProps.total = count;
            });
        }, 500),
        handleAdd() {
            this.$router.push("/skuAdd");
        },
        handleCopy(row) {
            this.$router.push({
                name: "skuAdd",
                query: { data: JSON.stringify(row), copy: 1 }
            });
        },
        handleShow() {
            this.showDialog = false;
        },
        handleEdit(row) {
            this.$router.push({
                name: "skuEdit",
                query: { data: JSON.stringify(row) }
            });
        },
        handleSize(val) {
            if (val.includes("ama")) {
                this.amaShow = true;
            } else {
                this.amaShow = false;
            }

            if (val.includes("parcel")) {
                this.parcelShow = true;
            } else {
                this.parcelShow = false;
            }

            if (val.includes("product")) {
                this.productShow = true;
            } else {
                this.productShow = false;
            }

            if (val.includes("deprecatedSku")) {
                this.deprecatedSkuShow = true;
            } else {
                this.deprecatedSkuShow = false;
            }

            if (val.includes("price")) {
                this.priceShow = true;
            } else {
                this.priceShow = false;
            }
        }
    }
};
</script>

<style lang="scss">
#sku {
    img {
        display: block;
    }
}
</style>