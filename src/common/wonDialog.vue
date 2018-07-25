<template>
    <el-dialog :title="title" v-model="show">
        122123
    </el-dialog>
</template>
<script>
export default {
    props:{
        title:{
            default:'編輯'
        },
        data:{
            default:[]
        }
    },
    data(){
        return {
            show:true
        }
    },
    created(){
        this.$on('showDialog',this.handleShow)
    },
    mounted:{
        handleShow(){
            
        }
    }
}
</script>
<style lang="sass">

</style>


