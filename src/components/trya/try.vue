<template>
    <div>
        <el-button type="info" @click="hanlde">dialog</el-button>
    </div>
</template>

<script>
import dialog from 'won-service/component/won-dialog/dialog';
import b from './bb';
export default {   
    methods:{
        hanlde(){
            dialog(b)
        }
    }
}
</script>

<style>

</style>
