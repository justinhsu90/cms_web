<template>
 <el-container>
  <el-header>
      <h1>
          <i class="el-icon-menu"></i>&nbsp;&nbsp;
          <span>后台管理系统</span> 
      </h1>
      <h1 style="float:right">
        <el-popover placement="bottom" width="200" trigger="click">
            <div >
               <span>账户信息：</span>
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
      >
      <el-menu-item :index="v.index" v-for="(v,i) in navData" :key="i">
        <i class="el-icon-menu"></i>
        <span slot="title">{{v.label}}</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
    </el-aside>
    <el-main>
         <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

</template>
<script>
export default {
  data() {
    return {
      defaultNav: "",
      username:'',
      navData:[{
        index:'sku',
        label:'SKU管理'
      },{
        index:'search',
        label:'Wowcher 訂單管理'
      },
      {
        index:'purchase',
        label:'採購單'
      },
      {
        index:'dataAnalysis',
        label:'儀表板'
      },
      {
        index:'edit',
        label:'edit'
      },
      {
        index:'documentManage',
        label:'文案管理'
      }]
    }; 
  },
  created(){
    document.cookie.split(';').forEach((v,i)=>{
    let str = v.split('=')[0].trim();
    if(str == "username"){
        this.username = v.split('=')[1];
     }
   })

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
      });
    }
  },
  watch: {
    $route: {
      handler(newRouter) {
        this.defaultNav = newRouter.path.slice(1);
      },
      immediate: true
    }
  }
};
</script>  
<style scoped>
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: rgb(83, 90, 107);
  color: white;
  height: 90px !important;
  line-height: 90px;
}
h1 {
  float: left;
}

.el-aside {
  background-color: rgb(50, 65, 87);
  color: white;
  text-align: center;
  height: 100%;
}
.el-menu{
  border: none;
}
.el-menu-item {
  color: white;
  text-align: left;
  border:none;
}
.el-main {
  height: 100%;
}

.el-submenu__title:hover {
  background: rgb(191, 205, 217, 0.4) !important;
}
.el-menu-item:hover,
.el-submenu:hover {
  background: rgb(191, 205, 217, 0.4) !important;
}
</style>
