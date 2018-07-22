<template>
    <div>
        <div :class="container" @click="handleSelect">
             <img  width="100%" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532248703488&di=f049fdf9f775663ec8d03812772af7ee&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201504%2F25%2F20150425H1530_EyuJt.thumb.700_0.jpeg" alt="">   
        </div>   
    </div>
</template>
<script>
export default {
    props:['value','name'],
    created(){
        if(this.value){
            this.handleSelect()
        }
    },
    data(){
        return {
            container:['imgContainer'],
            checked:false,
        }
    },
    methods:{
       handleSelect(){
           this.checked = !this.checked;
           if(this.checked){
               this.container = ['imgContainer'];
               this.$emit('select','test111');
           }else{
               this.container = ['imgContainer','checked'];
               this.$emit('select',this.name)
           }
       } 
    } 
}
</script>

<style lang="scss" scoped>
 .imgContainer{
     padding: 5px;
     border: 1px dashed #c0ccda;
     cursor: pointer;
 } 
 .checked{
     border: 1px dashed #13ce66;
 }
</style>

