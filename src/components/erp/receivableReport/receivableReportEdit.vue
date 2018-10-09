<template>
    <div id="receivableEdit">
        <div style="padding:20px">
            <div class="heade">
                <i class="el-icon-arrow-left"></i>
                <a href="javascript:void(0)" @click="goBack">返回</a>
            </div>
            <br>
            <h2>查看费用帳款
            </h2>
            <br>
            <!-- <el-form ref="form" :model="formData" label-position="top">
                <el-row :gutter="20">
                    <el-col :span="4">
                        <el-form-item label="Report ID">
                            <el-input v-model="formData.reportId" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="年">
                            <el-input v-model="formData.year" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="月">
                            <el-input v-model="formData.month" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="生成時間">
                            <el-date-picker disabled  type="datetime" v-model="formData.generatedTime"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="生成人">
                            <el-input v-model="formData.generatedBy" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form> -->
            
        </div>
    </div>
</template>
<script>
export default {
    name: "receivableReportEdit",
    data() {
        return {
            // formData: {
            //     generatedBy: "",
            //     generatedTime: "",
            //     month: "",
            //     reportId: "",
            //     year: ""
            // }
            data:[]
        };
    },
    created() {
        let id = JSON.parse(this.$route.query.id);
           axios({
               url:'/accountreceivable/report',
               method:'post',
               data:{
                   token:this.token,
                   reportid: id
               }
           }).then((res)=>{
               
           })
    },
    methods: {
        goBack() {
            this.$router.push("/receivableReport");
        }
    }
};
</script>
<style lang="scss" scoped>
#receivableEdit {
    .heade {
        font-size: 16px;
        color: #45a2ff;
    }
}
/deep/ .el-form-item {
    margin-bottom: 6px;
}
/deep/ .el-form-item__label {
    padding: 0px !important;
}
.heade a {
    color: #45a2ff;
}
/deep/ .el-card__body {
    padding: 10px;
}
</style>