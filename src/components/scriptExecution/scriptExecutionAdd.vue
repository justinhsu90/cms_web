<template>
    <div class="p20"> 
    <div>
      <i class="el-icon-arrow-left"></i>
      <a href="javascript:void(0)" @click="goBack">返回</a>
    </div>
    <br>
    <h2>新增清單</h2>
    <br> 
     <el-form :model="form">
         <el-row :gutter="20">
             <el-col :span="6">
        <el-form-item label="sku">
              <el-input v-model="form.sku">
              </el-input>
        </el-form-item>       
        </el-col>
             <el-col :span="6">
        <el-form-item label="quantity">
              <el-input v-model="form.quantity">
              </el-input>
        </el-form-item>       
        </el-col>
             <el-col :span="6">
        <el-form-item label="inventoryType">
              <el-input v-model="form.inventoryType">
              </el-input>
        </el-form-item>       
        </el-col>
             <el-col :span="6">
        <el-form-item label="datetime">
              <el-input v-model="form.datetime">
              </el-input>
              
        </el-form-item>       
        </el-col>
             <el-col :span="6">
        <el-form-item label="moveTo">
              <el-input v-model="form.moveTo">
              </el-input>
        </el-form-item>       
        </el-col>
             <el-col :span="6">
        <el-form-item label="moveFrom">
              <el-input v-model="form.moveFrom">
              </el-input>
        </el-form-item>       
        </el-col>
             <el-col :span="6">
        <el-form-item label="platform">
              <el-input v-model="form.platform">
              </el-input>
        </el-form-item>       
        </el-col>
             <el-col :span="6">
        <el-form-item label="account">
              <el-input v-model="form.account">
              </el-input>
        </el-form-item>       
        </el-col>
             <el-col :span="6">
        <el-form-item label="warehouse">
              <el-input v-model="form.warehouse">
              </el-input>
        </el-form-item>       
        </el-col>
        </el-row>
        <br>
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
        submit() {
            this.submitLoading = true;
            axios({
                url: "script/run",
                method: "post",
                data: {
                    token: this.token,
                    scriptCode: this.form.scriptCode
                }
            }).then(res => {
                this.submitLoading = false;
                this.$message.success("添加成功");
                this.goBack();
            });
        }
    },
    data() {
        return {
            selectOption: [],
            form: {
                sku: "",
                quantity: "",
                inventoryType: "",
                datetime: "",
                moveTo: "",
                moveFrom: "",
                platform: "",
                account: "",
                warehouse: ""
            },
            submitLoading: false
        };
    },
    created() {
        axios({
            url: "/script/value/scriptList",
            method: "post",
            data: {
                token: this.token
            }
        }).then(res => {
            this.selectOption = _.cloneDeep(res);
        });
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
/deep/ .el-form-item {
    margin-bottom: 5px
}
</style>
