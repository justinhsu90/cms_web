<template>
    <div id="skuAdd" style="padding:20px">
        <div class="heade">
            <i class="el-icon-arrow-left"></i>
            <a href="javascript:void(0)" @click="goBack">返回</a>
        </div>
        <br>
        <h2>编辑SKU</h2>
        <br>
        <el-form ref="form2" :model="form" label-position="left" label-width="150px">
            <div style="position:relative">
                <el-form-item ref="formItemTwo" label="SKU" :rules="skuValidate" prop="sku">
                    <el-input :disabled="true" v-model.trim="form.sku" style="width:50%;" @blur="handleInspect"></el-input>
                </el-form-item>
                <img :src="detectorURL" v-if="showDetector" style="width:100px;height:100px;position:absolute;top:0px;right:25%" alt="">
        </div>
                <el-form-item label="New SKU" prop="newSku">
                    <el-input v-model="form.newSku" style="width:50%"></el-input>
                </el-form-item>
                <el-form-item label="商品名稱" prop="productName" :rules="{required:true}">
                    <el-input v-model="form.productName" style="width:50%"></el-input>
                </el-form-item>
                <el-form-item label="圖片" prop="image" :show-message="showMessage">
                    <el-upload class="avatar-uploader" action='' :before-upload="beforeAvatarUpload" :on-change="handleAvatarSuccess" :show-file-list="false">
                        <img v-if="base64" :src="base64" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="狀態：" prop="status" class="inline">
                    <el-input v-model="form.status" style="width:50%"></el-input>
                </el-form-item>
                <el-form-item label="採購成本 (RMB)：" prop="priceRMB">
                    <el-input style="width:20%" v-model="form.priceRMB"></el-input>
                </el-form-item>
        </el-form>

        <el-form ref="form3" :model="form" label-position="top">
            <el-row :gutter="20">
                <el-col :span="4" >
                    <el-form-item label="Amazon 長(CM)" prop="amazonLengthCM">
                        <el-input v-model="form.amazonLengthCM"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="Amazon 寬(CM)" prop="amazonWidthCM">
                        <el-input v-model="form.amazonWidthCM"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="Amazon 高(CM))" prop="amazonHeightCM">
                        <el-input v-model="form.amazonHeightCM"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" >
                    <el-form-item label="Amazon 重(kg)" prop="amazonWeightKG">
                        <el-input v-model="form.amazonWeightKG"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4" >
                    <el-form-item label="小包 長(CM)" prop="parcelLengthCM">
                        <el-input v-model="form.parcelLengthCM"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" >
                    <el-form-item label="小包 寬(CM)" prop="parcelWidthCM">
                        <el-input v-model="form.parcelWidthCM"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" >
                    <el-form-item label="小包 高(CM)" prop="parcelHeightCM">
                        <el-input v-model="form.parcelHeightCM"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="小包 重(kg)" prop="parcelWeightKG">
                        <el-input v-model="form.parcelWeightKG"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="已停用 SKU：" prop="deprecatedSKU">
                <template slot="label">
                    <span>Deprecated SKU：</span>
                </template>
                <el-input type="textarea" rows='4' v-model="form.deprecatedSKU" style="width:70%"></el-input>
            </el-form-item>
            <el-button @click="handleConfirm" :loading="submitLoading" type="primary" style="width:150px;height:60px;font-size:18px;display:inline-block">更新</el-button>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        var that = this;
        return {
            centerDialogVisible: true,
            popoverVisible: false,
            searchValue: "IT",
            base64: "",
            showDetector: false,
            detectorURL: "../../static/img/1.png",
            searchOptions: [],
            submitLoading: false,
            form: {
                autoSku: "",
                sku: "",
                newSku: "",
                productName: "",
                status: "",
                image: "",
                amazonWidthCM: "",
                amazonHeightCM: "",
                amazonWeightKG: "",
                amazonLengthCM: "",
                parcelWidthCM: "",
                parcelHeightCM: "",
                parcelWeightKG: "",
                parcelLengthCM: "",
                deprecatedSKU: "",
                priceRMB: ""
            },
            skuValidate: {
                required: true,
                token: this.token,
                validator(rule, value, callback) {
                    let rules = /[A-Za-z]{2}[0-9]{4}[a-zA-Z]{3}/;
                    if (!rule.required) {
                        callback();
                    }
                    if (!rules.test(value)) {
                        callback(new Error("SKU結構有誤"));
                    } else {
                        axios({
                            url: "sku/similarimg",
                            method: "post",
                            data: {
                                sku: value,
                                token: rule.token
                            }
                        }).then(res => {
                            that.showDetector = true;
                            if (!_.isEmpty(res)) {
                                that.detectorURL = res[0];
                            }
                            callback();
                        });
                    }
                }
            },
            autoSkuValidate: {
                required: true
            },
            showMessage: true,
            autoShowMessage: true,
            skuShowMessage: true,
            trueSku: true,
            image: "",
            base64: ""
        };
    },
    mounted() {
        axios({
            url: "sku/cat",
            method: "post",
            data: {
                token: this.token
            }
        }).then(res => {
            this.searchOptions = _.cloneDeep(res);
        });
        let data = JSON.parse(this.$route.query.data);  
        this.url = "sku/update";
        this.form.image = data.imageURL;
        this.base64 = data.imageURL;
        this.form.productName = data.productName;
        this.form.newSku = data.newSku;
        this.form.sku = data.sku;

        this.form.amazonWidthCM = data.amazonWidthCM;
        this.form.amazonHeightCM = data.amazonHeightCM;
        this.form.amazonWeightKG = data.amazonWeightKG;
        this.form.amazonLengthCM = data.amazonLengthCM;

        this.form.parcelWidthCM = data.parcelWidthCM;
        this.form.parcelHeightCM = data.parcelHeightCM;
        this.form.parcelWeightKG = data.parcelWeightKG;
        this.form.parcelLengthCM = data.parcelLengthCM;

        this.form.deprecatedSKU = data.deprecatedSKU;

        this.form.priceRMB = data.priceRMB;
        
    },
    watch: {
        "form.autoSku"(newVal, oldVal) {
            if (!!newVal) {
                this.skuValidate.required = false;
                this.form.sku = "";
            } else {
                this.skuValidate.required = true;
            }
        },
        "form.sku"(newVal, oldVal) {
            if (!!newVal) {
                this.autoSkuValidate.required = false;
                this.form.autoSku = "";
            } else {
                this.autoSkuValidate.required = true;
            }
        }
    },
    methods: {
        handleInspect(){
            
        },
        goBack() {
            this.$router.push("/sku");
        },
        beforeAvatarUpload(file) {
            let isJPG = file.type === "image/jpeg";
            let isPNG = file.type === "image/png";
            if (!isJPG && !isPNG) {
                this.$message.error("上傳頭像圖片只能是 JPG PNG 格式!");
            } else {
                return isJPG;
            }
        },
        handleAvatarSuccess(file, fileList) {
            let url = URL || webkitURL;
            this.form.image = file.raw;
            let blob = url.createObjectURL(file.raw);
            let canvas = document.createElement("canvas");
            let image = document.createElement("img");
            image.src = blob;
            this.image = file.raw;
            image.addEventListener("load", () => {
                canvas.width = image.width;
                canvas.height = image.height;
                let cas = canvas.getContext("2d");
                cas.drawImage(image, 0, 0);
                let base64 = canvas.toDataURL(file.raw.type);
                this.base64 = base64;
            });
        },
        handleAuto() {
            axios({
                url: "sku/newindex",
                method: "post",
                data: {
                    category: this.searchValue,
                    token: this.token
                }
            }).then(res => {
                this.form.autoSku = res.index;
            });
        },
        handleUpload() {
            this.input = document.createElement("input");
            this.input.type = "file";
            this.input.addEventListener("change", () => {
                this.form.photoTotal = this.input.files.length;
                this.showMessage = false;
            });
            this.input.click();
        },
        handleConfirm() {
            this.$refs["form2"].validate((action, dom) => {
                if (!action) return;
                this.$refs["form3"].validate((action, dom) => {
                    if (action) {
                        this.submitLoading = true;
                        let obj = {
                        };
                        let value = {
                            data: []
                        };
                        if (this.form.autoSku) {
                            obj.sku = this.searchValue + this.form.autoSku;
                        } else {
                            obj.sku = this.form.sku;
                        }
                            obj.amazonWidthCM = this.form.amazonWidthCM;
                            obj.amazonHeightCM = this.form.amazonHeightCM;
                            obj.amazonWeightKG = this.form.amazonWeightKG;
                            obj.amazonLengthCM = this.form.amazonLengthCM;

                            obj.parcelWidthCM = this.form.parcelWidthCM;
                            obj.parcelHeightCM = this.form.parcelHeightCM;
                            obj.parcelWeightKG = this.form.parcelWeightKG;
                            obj.parcelLengthCM = this.form.parcelLengthCM;

                            obj.deprecatedSKU = this.form.deprecatedSKU;

                            obj.priceRMB = this.form.priceRMB;

                        obj.productName = this.form.productName;
                        obj.status = this.form.status;
                        obj.newSku = this.form.newSku;
                        var formData = new FormData();
                        value.data.push(obj);
                        value = JSON.stringify(value);
                        formData.append("value", value);
                        formData.append("token", this.token);
                        if (this.form.image) {
                            formData.append("uploadfile", this.form.image);
                        }
                        var request = new XMLHttpRequest();
                        let url =
                            "http://60.251.57.138:8000/data-server/" + this.url;
                        request.open("POST", url);
                        request.onreadystatechange = () => {
                            if (
                                request.readyState == 4 &&
                                request.status == 200
                            ) {
                                this.submitLoading = false;
                                this.$message.success("編輯成功");
                                this.goBack();
                                this.Bus.$emit('refresh')
                            }
                            if (request.status != 200) {
                                this.$message.warning("編輯失敗");
                            }
                        };
                        request.send(formData);
                    }
                });
            });
        }
    }
};
</script>
<style lang="scss">
#skuAdd {
    .heade {
        font-size: 16px;
        color: #45a2ff;
    }
    .heade a {
        color: #45a2ff;
    }
    .el-switch__input:focus~.el-switch__core{
        outline: none !important;
    }
    h3 {
        text-align: left;
    }
    .tip {
        margin-left: 5px;
        line-height: 1.2;
        color: #bbbbbb;
        font-size: 12px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    img {
        width: 100%;
        height: 100%;
    }
    #dialog ml18 {
        margin-left: 18px !important;
    }
}
</style>


