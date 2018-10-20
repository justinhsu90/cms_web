<template>
    <div id="excelUpload">
        <div style="padding:20px">
            <div class="heade">
                <i class="el-icon-arrow-left"></i>
                <a href="javascript:void(0)" @click="goBack">返回</a>
            </div>
            <br>
            <el-row>
                <el-form ref="form" :model="form" label-position="top">
                    <el-form-item>
                          <div v-if="files">
                            <ul>
                                <li v-for="(v,i) in files" :key="i" >
                                    <i class="el-icon-document"></i>
                                    <span style="color:#606266">{{v.name}}</span>
                                    <el-button type="text" icon="el-icon-close" @click="handleDelete(i)"></el-button>
                                </li>
                            </ul>
                        </div>
                        <el-button size="small" type="success" @click="handleUpload">点击上传文件</el-button>
                    </el-form-item>
                </el-form>
                <br>
               <el-button  @click="submit" type="primary" style="width:150px;height:60px;font-size:18px;display:inline-block">匯入</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {},
            files:'',
            formData:new FormData()
        };
    },
    created(){
        this.formData.append('token',this.token);
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        handleUpload() {
            let input = document.createElement("input");
            input.type = "file";
            input.multiple = 'multiple';
            input.click();
            input.addEventListener("change", () => {
                this.files = input.files;
            });
        },
        handleDelete(i){
            this.formData.delete('uploadfile');
            this.files = this.files.splice(i,1);
            debugger
        },
        upload() {
            axios({
                url:'/excel/upload/add',
                method: "post",
                data:this.formData,
                headers: {
                    "Content-type": "multipart/form-data"
                },
                isFormData: true
            }).then((res)=>{
                this.goBack();
            })
        },
        submit(){
               this.formData.append('uploadfile',files);
                this.upload();
        }
    }
};
</script>

<style scoped lang="scss">
#excelUpload .heade {
    font-size: 16px;
    color: #45a2ff;
}
#excelUpload .heade a {
    color: #45a2ff;
}
#excelUpload {
    .el-button--text {
        color: #606266;
    }
}
</style>

