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
                        <div  style="width:80%;margin-top:10px">
                            <!-- <ul>
                                <li v-for="(v,i) in files" :key="i">
                                    <i class="el-icon-document"></i>
                                    <span style="color:#606266">{{v.name}}</span>
                                    <el-button type="text" icon="el-icon-close" @click="handleDelete(i)"></el-button>
                                </li>
                            </ul> -->
                            <el-table :data="files">
                                <el-table-column label="文件名" min-width="100" prop="name"></el-table-column>
                                <el-table-column label="檔案大小" prop="size" width="200">
                                    <template slot-scope="scope">
                                        {{scope.row.size}}b
                                    </template>
                                </el-table-column>
                                <el-table-column label="檔案类型" prop="size" width="200">
                                    <template slot-scope="scope">
                                        <el-select placeholder="檔案类型" v-model="type[scope.$index]" clearable>
                                            <el-option v-for="(v,i) in searchFiletypeOption" :key="'acc'+i" :label="v" :value="v"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column width="80" label="操作" fixed="right" align="center">
                                    <template slot-scope="scope">
                                        <el-button class="btnh" type="text" title="下载" icon="el-icon-won-22" @click="handleDelete(scope)"></el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
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
import U from '@/common/until/until'
export default {
    data() {
        return {
            Div:U.Math.Div,
            Mul:U.Math.Mul,
            form: {},
            files: [],
            isLoading: false,
            isEmpty:_.isEmpty,
            searchFiletypeOption:[],
            type:{},
        };
    },    
    created(){
          let filetype = axios({
            url: "/excel/upload/value/filetype",
            method: "post",
            data: {
                token: this.token
            }
        });
        Promise.all([filetype]).then(([filetype]) => {
            this.searchFiletypeOption = _.cloneDeep(filetype);
        });
    },
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
                _.each(input.files, (v,i) => {
                    this.files.push(v);
                });
                _.each(this.files,(value,index)=>{
                    if(this.type[index] == ''){
                        this.$set(this.type,index,'');
                    }
                })
            });
        },
        handleDelete(scope) {
            this.files.splice(scope.$index, 1);

            delete this.type[scope.$index];
            let index = 0;
            let obj = {
                    
            }
            _.each(this.type,(v,k)=>{
                 obj[index] = v;
                 index++;
            })
            this.type = obj;
        },
        submit() {
            let totalAjax = [];
            _.each(this.files, (v,i) => {
                let formData = new FormData();
                formData.append("token", this.token);
                formData.append("uploadfile", v);
                formData.append("filetype", this.type[i]);
                let ajax = axios({
                    url: "/excel/upload/add",
                    method: "post",
                    data: formData,
                    headers: {
                        "Content-type": "multipart/form-data"
                    },
                    isFormData: true
                });
                totalAjax.push(ajax);
            });
            this.isLoading = true;
            if (_.isEmpty(totalAjax)) {
                this.goBack();
                return;
            }
            Promise.all(totalAjax)
                .then(() => {
                    this.goBack();
                    this.$message.success("保存成功");
                })
                .catch(() => {
                    this.$message.error("保存失败");
                });
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
.f-12 {
    font-size: 12px;
}
</style>

