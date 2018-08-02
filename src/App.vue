<template>
    <div id="app">
    <!-- <keep-alive :exclude="$route.meta.exclude">
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    <router-view></router-view>
    </div>
</template>
<style >
    /* @import "./assets/less/main.less"; */
    @import "../static/css/main.css";
    @import "../static/css/color-dark.css"; 
    @import "../static/css/fontStyle.css"; 
    /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
</style>