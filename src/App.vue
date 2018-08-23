<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
@import "./assets/css/fontStyle.css";
*{
    padding: 0;
    margin: 0;
}
html,
body,
#app{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.login-wrap {
    background: #324157;
}
a{
    text-decoration: none;
}
</style>