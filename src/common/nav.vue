<template>
    <div id="nav">
        <el-container>
            <el-header>
                <div class="logo">
                    <img   width="140px" src="../assets/img/logo.png" alt="">
                    <span>菲德利內部管理系統</span>
                </div>
                <div class="headerRight">
                    <el-popover placement="bottom" width="200" trigger="click">
                        <div>
                            <span>帳號資訊：</span>
                            <span>{{username}}</span>
                        </div>
                        <i  style="font-size:20px" type="text" slot="reference" class="el-icon-won-50"></i>
                    </el-popover>
                    <i style="font-size:20px" type="text" class="el-icon-setting" @click="handleQuit"></i>
                </div>
            </el-header>
            <el-container>
                <div class="backgroud">
                    <div style="line-height:50px;text-align:center;border-bottom:1px solid #E4E9EE">
                        <span class="el-icon-won-28" style="cursor:pointer;font-size:15px;color:#62717E;" @click="handleClick"></span>
                    </div>
                    <div>
                        <el-menu :collapse="isCollapse" :default-active="defaultNav" class="el-menu-vertical-demo" background-color="#F4F7FC" text-color="#62717E" active-text-color="#62717E" @select="handleSelect">
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
                    index: "wowcher",
                    label: "Wowcher",
                    isLevel: true,
                    child: [
                        {
                            index: "wowcher",
                            label: "訂單查詢"
                        },
                        {
                            index: "wowcherDealList",
                            label: "上架清單"
                        },
                        {
                            index: "replacement",
                            label: "補發清單"
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
                            index: "shipment",
                            label: "(4) 物流單"
                        }
                    ]
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
@import "../assets/css/fontStyle.css";
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
    .backgroud {
        background: #f4f7fc;
    }
    .el-submenu .el-menu-item {
        height: 50px;
        line-height: 50px;
        padding: 0 45px;
        min-width: 180px;
    }
    .el-header {
        background-color: #45a2ff;
        color: white;
    }
    .logo{
        width:400px;
        float: left;
        line-height: 60px;
        img{
            vertical-align: middle;
        }
        span{
            display:inline-block;
            vertical-align: middle;
            font-size: 20px;
        }
    }
    .headerRight{
        float: right;
        line-height: 60px;
        i{
           font-size: 20px;
           cursor: pointer; 
        }
    }
    .el-menu {
        border: none;
    }
    .el-menu-item {
        color: #62717e;
        border: none;
    }
    .el-menu-item:focus,
    .el-menu-item:hover {
        background-color: white !important;
    }
    .el-menu-item:focus, .el-menu-item:hover{
        background-color: white !important;
    }
    .el-submenu__title:focus,
    .el-submenu__title:hover {
        background-color: white !important;
    }
    .el-menu-item-group__title {
        display: none !important;
    }
    .el-table th {
        color: #62717e;
        background: rgb(237, 241, 245);
        text-align: center;
    }
    .el-button--primary {
        background: #45a2ff !important;
    }
}
</style>
