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
                    <el-form-item label="上传文件">
                        <template slot="label">
                            <span>上传文件</span>
                            <span class="f-12 label-tips">可以选择多文件</span>
                        </template>
                        <el-button size="small" type="success" @click="handleUpload">点击上传</el-button>
                         <div v-if="files">
                            <ul>
                                <li v-for="(v,i) in files" :key="i">
                                    <i class="el-icon-document"></i>
                                    <span style="color:#606266">{{v.name}}</span>
                                    <el-button type="text" icon="el-icon-close" @click="handleDelete(i)"></el-button>
                                </li>
                            </ul>
                        </div>
                    </el-form-item>
                </el-form>
                <br>
                <el-button @click="submit" :loading="isLoading" type="primary" style="width:100px;height:50px;font-size:18px;display:inline-block">匯入</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {},
            files: "",
            isLoading:false,
        };
    },
    created() {},
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        handleUpload() {
            let input = document.createElement("input");
            input.type = "file";
            input.multiple = "multiple";
            input.click();
            input.addEventListener("change", () => {
                let data = [];
                _.each(input.files, v => {
                    data.push(v);
                });
                this.files = data;
            });
        },
        handleDelete(i) {
            this.files.splice(i, 1);
        },
        submit() {
            let totalAjax = [];
            _.each(this.files, v => {
                let formData = new FormData();
                formData.append("token", this.token);
                formData.append("uploadfile", v);
                let ajax = axios({
                    url: "/excel/upload/add",
                    method: "post",
                    data: formData,
                    headers: {
                        "Content-type": "multipart/form-data"
                    },
                    isFormData: true
                });
                totalAjax.push(ajax)
            });
            this.isLoading = true;
            if(_.isEmpty(totalAjax)){
                this.goBack();
                return;
            }
            Promise.all(totalAjax).then(()=>{
                this.goBack();
                this.$message.success('保存成功');
            }).catch(()=>{
                this.$message.error('保存失败');
            })
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
.f-12{
    font-size: 12px;;
}
</style>

