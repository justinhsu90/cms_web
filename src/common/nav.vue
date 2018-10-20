<template>
    <div id="nav">
        <el-container>
            <el-header>
                <h2 class="h2">
                    <i class="el-icon-menu"></i>&nbsp;&nbsp;
                    <span style="font-size:20px">菲德利內部管理系統</span>
                </h2>
                <h1 style="float:right">
                    <el-popover placement="bottom" width="200" trigger="click">
                        <div>
                            <span>帳號資訊：</span>
                            <span>{{username}}</span>
                        </div>
                        <i type="text" slot="reference" class="el-icon-won-50"></i>
                    </el-popover>
                    <i type="text" class="el-icon-setting" @click="handleQuit"></i>
                </h1>
            </el-header>
            <el-container>
                <div class="aside">
                    <div style="line-height:50px;text-align:center;">
                        <span class="el-icon-won-28" style="cursor:pointer;font-size:20px;color:white;" @click="handleClick"></span>
                    </div>
                    <div>
                        <el-menu :unique-opened="true" :collapse="isCollapse" :default-active="defaultNav" class="el-menu-vertical-demo" background-color="rgb(50, 65, 87)" text-color="white" active-text-color="#409eff" @select="handleSelect">
                            <template v-for="(v,i) in navData">
                                <el-submenu v-if="v.isLevel" :index="v.index" :key="i">
                                    <template slot="title">
                                        <i class="el-icon-menu"></i>
                                        <span slot="title">{{v.label}}</span>
                                    </template>
                                    <el-menu-item-group>
                                        <div slot="title"></div>
                                        <el-menu-item v-for="(value,index) in v.child" :key="index+'child'" :index="value.index">{{value.label}}</el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                                <el-menu-item :index="v.index" v-else :key="i">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">{{v.label}}</span>
                                </el-menu-item>
                            </template>
                        </el-menu>
                    </div>
                </div>
                <el-main>
                    <keep-alive :exclude="$route.meta.exclude">
                        <router-view v-if="$route.meta.keepAlive"></router-view>
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive"></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            defaultNav: "",
            asideShow: true,
            username: "",
            isCollapse: false,
            navData: [
                {
                    index: "dataAnalysis",
                    label: "儀表板"
                },
                {
                    index: "sku",
                    label: "SKU管理"
                },
                {
                    index: "upc",
                    label: "UPC管理"
                },
                {
                    index: "documentManage",
                    label: "文案管理"
                },
                {
                    index: "shipment",
                    label: "小包做單"
                },
                {
                    index: "orderList",
                    label: "訂單查詢"
                },
                {
                    index: "replacement",
                    label: "補發清單"
                },
                {
                    index: "wowcher",
                    label: "Wowcher",
                    isLevel: true,
                    child: [
                        {
                            index: "wowcherDealList",
                            label: "上架清單"
                        },
                        {
                            index: "wowcherSample",
                            label: "樣品清單"
                        }
                    ]
                },
                {
                    index: "erp",
                    label: "ERP",
                    isLevel: true,
                    child: [
                        {
                            index: "purchaRequire",
                            label: "(1) 採購需求單"
                        },
                        {
                            index: "erpPurchase",
                            label: "(2) 採購單"
                        },
                        {
                            index: "payment",
                            label: "(3) 付款單"
                        },
                        {
                            index: "erpSale",
                            label: "(4) 銷貨單"
                        },
                        {
                            index: "receivable",
                            label: "(5-1) 應收帳款單"
                        },
                        {
                            index: "receivableReport",
                            label: "(5-2) 費用應收表"
                        }
                    ]
                },
                {
                    index: "singleLetter",
                    label: "補發信單"
                },
                {
                    index: "excelUpload",
                    label: "表格匯入"
                }
            ]
        };
    },
    created() {
        document.cookie.split(";").forEach((v, i) => {
            let str = v.split("=")[0].trim();
            if (str == "username") {
                this.username = v.split("=")[1];
            }
        });
    },
    methods: {
        handleSelect(index, router) {
            this.$router.push(`/${index}`);
        },
        handleClick() {
            this.isCollapse = !this.isCollapse;
        },
        handleQuit() {
            let that = this;
            this.$confirm("是否要退出", "提示", {
                type: "info",
                beforeClose(action, instance, done) {
                    if (action == "confirm") {
                        let d = new Date();
                        d.setTime(d.getTime() + -1 * 24 * 60 * 60 * 1000);
                        let expires = "expires=" + d.toUTCString();
                        document.cookie = `token="";path="/";expires=${expires}`;
                        document.cookie = `username="";path="/";expires=${expires}`;
                        document.cookie = `name="";path="/";expires=${expires}`;
                        that.$router.push("/login");
                        done();
                    } else {
                        done();
                    }
                }
            }).catch(() => {});
        }
    },
    watch: {
        $route: {
            handler(newRouter) {
                if (newRouter.meta.sign) {
                    this.defaultNav = newRouter.meta.sign;
                } else {
                    this.defaultNav = newRouter.path.slice(1);
                }
            },
            immediate: true
        }
    }
};
</script>  
<style lang="scss">
#nav {
    width: 100%;
    height: 100%;
    .el-container {
        width: 100%;
        height: 100%;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 180px;
        height: 100%;
    }
    .aside {
        background: rgb(50, 65, 87);
        overflow: auto;
    }
    .el-submenu .el-menu-item {
        height: 50px;
        line-height: 50px;
        padding: 0 45px;
        min-width: 180px;
    }
    .el-header {
        background-color: rgb(83, 90, 107);
        color: white;
        height: 50px !important;
        line-height: 50px;
    }
    .h2 {
        float: left;
    }
    .el-menu {
        border: none;
    }
    .el-menu-item {
        color: white;
        border: none;
    }
    .el-menu-item-group__title {
        display: none !important;
    }
    .el-table th {
        color: #62717e;
        background: rgb(237, 241, 245);
    }
    .el-table:before {
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        z-index: 99;
    }
    .el-table td,
    .el-table th {
        padding: 0px 0;
        min-width: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-overflow: ellipsis;
        vertical-align: middle;
        position: relative;
        height: 20px;
    }
    .el-main {
        padding: 10px 15px;
        flex-basis: initial;
        flex: 12;
    }
    .label-tips {
        color: #bbbbbb;
    }
}
</style>
