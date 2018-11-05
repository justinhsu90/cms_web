<template>
    <div class="p20"> 
    <div>
      <i class="el-icon-arrow-left"></i>
      <a href="javascript:void(0)" @click="goBack">返回</a>
    </div>
    <br>
     <el-form :model="form">
          <el-form-item label="文本碼">
              <el-select v-model="form.scriptCode" class="w40">
                  <el-option v-for="(v,i) in selectOption" :key="i" :value="v.scriptCode">
                        <span style="float: left">{{ v.scriptName }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ v.scriptPurpose }}</span>
                  </el-option>
              </el-select>
        </el-form-item>       
        <el-form-item>
                <el-button @click="submit"  :loading="submitLoading" type="primary" size="mediumn">新增</el-button> 
        </el-form-item>
    </el-form>   
    </div>
</template>  

<script>
export default {
    methods: {
        goBack() {
            this.$router.push("scriptExecutionList");
        },
        submit(){
            this.submitLoading = true;
            axios({
                url:'script/run',
                method:'post',
                data:{
                    token:this.token,
                    scriptCode:this.form.scriptCode    
                }
            }).then((res)=>{
                this.submitLoading = false;
                this.$message.success('添加成功');
                this.goBack();
            })
        }   
    },
    data(){
        return {
            selectOption:[],
            form:{
                scriptCode:''
            },
            submitLoading:false
        }
    },
    created(){
        axios({
            url:'/script/value/scriptList',
            method:'post',
            data:{
                token:this.token
            }
        }).then((res)=>{
            this.selectOption = _.cloneDeep(res);
        })
    }
};
</script>

<style scoped lang="scss">
a {
    color: #45a2ff;
}
/deep/ .el-icon-arrow-left {
    color: #45a2ff;
}
</style>
