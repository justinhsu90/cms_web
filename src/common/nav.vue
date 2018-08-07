<template>
<div id="nav">
 <el-container>
  <el-header>
      <h1>
          <i class="el-icon-menu"></i>&nbsp;&nbsp;
          <span>菲德利內部管理系統</span> 
      </h1>
      <h1 style="float:right">
        <el-popover placement="bottom" width="200" trigger="click">
            <div >
               <span>帳號資訊：</span>
               <span>{{username}}</span>
            </div>
            <i type="text"  slot="reference" class="el-icon-won-50"></i>
        </el-popover>
        <i   type="text"  class="el-icon-setting" @click="handleQuit"></i>     
      </h1> 
  </el-header>
  <el-container>
    <el-aside width="200px">
  <el-row class="tac">
     <el-col :span="24">
       <el-menu
      :default-active="defaultNav"
      class="el-menu-vertical-demo" 
      background-color="rgb(50, 65, 87)"
      text-color="white"
      active-text-color="#409eff"
      @select="handleSelect"
      collapse-transition
      >
    <template  v-for="(v,i) in navData">
      <el-submenu v-if="v.isLevel" :index="v.index" :key="i">
            <template  slot="title"> 
          <i class="el-icon-menu"></i>
          <span slot="title">{{v.label}}</span>
      </template>
       <template>
        <el-menu-item-group >
           <template slot="title">
             <div></div>
           </template>
          <el-menu-item v-for="(value,index) in v.child" :key="index+'child'" :index="value.index">{{value.label}}</el-menu-item>
        </el-menu-item-group>
        </template>
      </el-submenu>
       <el-menu-item :index="v.index" v-else  :key="i">
        <template  slot="title"> 
          <i class="el-icon-menu"></i>
          <span slot="title">{{v.label}}</span>
      </template>
      </el-menu-item>
      </template>
    </el-menu>
  </el-col>
</el-row>
    </el-aside>
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
      username: "",
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
          index: "wowcherMain",
          label: "WowcherMain",
          isLevel: true,
          child: [
            {
              index: "wowcher",
              label: "Wowcher訂單"
            },
            {
              index: "wowcherDealList",
              label: "Wowcher上架清單"
            }
          ]
        },
        {
          index: "documentManage",
          label: "文案管理"
        },
        {
          index: "erp",
          label: "ERP",
          isLevel: true,
          child: [
            {
              index: "purchaRequire",
              label: "採購需求單"
            },
            {
              index: "erpPurchase",
              label: "採購單"
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
      }).catch(()=>{

      })
    }
  },
  watch: {
    $route: {
      handler(newRouter) {    
        if(newRouter.meta.sign){
          this.defaultNav = newRouter.meta.sign;
        }else{
          this.defaultNav = newRouter.path.slice(1);
        }    
      },
      immediate: true
    }
  }
};
</script>  
<style lang="scss">
#nav{
  width: 100%;
  height: 100%;
.el-container {
    width: 100%;
    height: 100%;
  }
  .el-header {
    background-color: rgb(83, 90, 107);
    color: white;
    height: 50px !important;
    line-height: 50px;
  }
  h1 {
    float: left;
  }

  .el-aside {
    background-color: rgb(50, 65, 87);
    color: white;
    height: 100%;
  }
  .el-menu {
    border: none;
  }
  .el-menu-item {
    color: white;
    border: none;
  }
  .el-main {
    height: 100%;
  }
  .el-menu-item-group__title{
    display: none !important;
  }
  }
</style>
