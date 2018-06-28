<template>
    <div id="app">
        <keep-alive include="purchase">
        <router-view></router-view>
        </keep-alive>
    </div>
</template>
<style >
    /* @import "./assets/less/main.less"; */
    @import "../static/css/main.css";
    @import "../static/css/color-dark.css"; 
    @import "../static/css/fontStyle.css"; 
    /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
</style>