<template>
<div class="mt5">
    <div class="fr">
        <el-pagination v-bind="$attrs" v-on="$listeners"></el-pagination>
    </div>
    <div class="fr">
        <slot></slot>  
    </div>
</div>    
</template>

<script>
export default {};
</script>

<style>
</style>
