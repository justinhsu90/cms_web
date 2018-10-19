<template>
    <div class="container">
        <img src="../../assets/img/404.png" alt="">
        <div class="tip">
            <br>
            <br>
            <br>
            <br>
            <p class="tip-p1">网管说这个页面你不能进......</p>
            <br>
            <p class="tip-p2">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</p>
            <br>
            <el-button @click="goBack" type="primary">返回首页</el-button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style scoped lang="scss">
.container {
    width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-around;
    .tip-p1 {
        color: #222;
        font-size: 20px;
    }
    .tip-p2 {
        color: grey;
        font-size: 13px;
    }
}
img {
    width: 600px;
    height: 308px;
}
</style>
