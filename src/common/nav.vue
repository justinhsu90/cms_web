<template>
  <div id="nav">
    <el-container>
      <el-header>
        <h2 class="f-l lh60">
          <i class="el-icon-menu va-m"></i>
          <span class="fz20 va-m">Flybuddy Product Selection System</span>
          <i class="clearmid"></i>
        </h2>
        <h2 class="f-r">
          <!-- <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{language}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zh">中文</el-dropdown-item>
              <el-dropdown-item command="en">ENGLISH</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </h2>
        <h2 class="f-r">
          <el-popover
            placement="bottom"
            width="200"
            trigger="click"
          >
            <div>
              <span>帳號資訊：</span>
              <span>{{username}}</span>
              <i
                type="text"
                class="el-icon-setting va-m co-p"
                @click="handleQuit"
              ></i>
            </div>
            <i
              type="text"
              slot="reference"
              class="el-icon-won-50 va-m co-p"
            ></i>
            <i class="clearmid"></i>
          </el-popover>
        </h2>
        <!-- <div class="f-r pt10">
          <el-autocomplete
            ref="input"
            size="small"
            class="mr15 autocomplete"
            v-model="autoAutocomplete"
            :fetch-suggestions="querySearch"
            placeholder="搜索菜單"
            :trigger-on-focus="false"
            @select="handleSearch"
          >
            <i
              class="el-icon-won-40"
              slot="suffix"
            >
            </i>
          </el-autocomplete>
        </div> -->
      </el-header>
      <el-container style="height: calc(100% - 50px)">
        <!-- <div class="aside">
          <div class="lh50 t_a-c">
            <i
              class="el-icon-won-28 co-po fz20 c-white"
              @click="handleClick"
            ></i>
          </div>
          <div>
            <el-menu
              :unique-opened="true"
              :collapse="isCollapse"
              :default-active="defaultNav"
              class="el-menu-vertical-demo"
              background-color="rgb(50, 65, 87)"
              text-color="white"
              active-text-color="#409eff"
              @select="handleSelect"
            >
              <template v-for="(v,i) in nav">
                <el-submenu
                  v-if="v.isLevel"
                  :index="v.index"
                  :key="i"
                >
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{v.label}}</span>
                  </template>
                  <el-menu-item-group>
                    <div slot="title"></div>
                    <el-menu-item
                      v-for="(value,index) in v.child"
                      :key="index+'child'"
                      :index="value.index"
                    >{{value.label}}</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-menu-item
                  :index="v.index"
                  v-else
                  :key="i"
                >
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{v.label}}</span>
                </el-menu-item>
              </template>
            </el-menu>
          </div>
        </div> -->
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
import navData from "./navData";
import C from "js-cookie";
export default {
  data() {
    let nav = _.cloneDeep(navData);
    // let adminErp = {
    // index: "admin_erp",
    // label: "管理者ERP",
    // isLevel: true,
    // child: [
    //   {
    //     index: "receivableReport",
    //     label: "(1) 費用應收表"
    //   }
    // ]
    // };
    // if (C.get("privilege") == "admin") {
    //   nav.splice(6, 0, adminErp);
    // }
    return {
      language: "中文",
      defaultNav: "",
      asideShow: true,
      username: C.get("userName"),
      isCollapse: false,
      nav,
      autoAutocomplete: ""
    };
  },
  methods: {
    handleCommand(type) {
      if (type == "en") {
        this.$i18n.locale = "en";
        this.language = "ENGLISH";
      }
      if (type == "zh") {
        this.$i18n.locale = "zh";
        this.language = "中文";
      }
    },
    querySearch(queryString, cb) {
      let data = [];
      _.each(this.nav, v => {
        if ("child" in v) {
          _.each(v.child, value => {
            if (value.label.includes(queryString)) {
              let obj = {
                index: value.index,
                value: value.label
              };
              data.push(obj);
            }
          });
        }
        if (v.label.includes(queryString)) {
          let obj = {
            index: v.index,
            value: v.label
          };
          data.push(obj);
        }
      });
      cb(data);
    },
    handleSearch(val) {
      let that = this;
      this.$confirm("是否跳轉到指定菜單", "提示", {
        type: "info",
        beforeClose(action, instance, done) {
          if (action == "confirm") {
            that.$router.push(`/${val.index}`);
            done();
          } else {
            done();
          }
        }
      }).catch(() => {});
    },
    handleSelect(index) {
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
            C.remove("name");
            C.remove("userName");
            C.remove("privilege");
            C.remove("token");
            that.$router.push("/");
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
  .el-dropdown-link {
    // color: white !important;
  }
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
  }
  .aside {
    background: rgb(50, 65, 87);
    overflow: auto;
  }
  .el-main {
    padding: 10px 15px;
    flex-basis: initial;
    flex: 12;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    height: 100%;
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
}
.autocomplete {
  width: 150px;
  .el-input__suffix {
    line-height: 34px;
  }
  input {
    width: 100px;
    float: right;
    background: #3f4350;
    color: white;
  }
  input:focus {
    width: 150px;
    transition: all 0.5s cubic-bezier(0.56, -0.33, 0.01, 1.01);
    border: 1px solid #dcdfe6 !important;
  }
}
</style>
