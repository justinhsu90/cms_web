<template>
  <div id="dialog">
    <el-dialog :visible.sync="centerDialogVisible" width="50%" @close="handleClose">
      <h3 slot="title">{{title}}</h3>
      <el-form ref="form1" label-position="top" :model="form">
        <el-form-item v-if="title!='編輯'" ref="formItem" label="自動生成SKU" :rules="autoSkuValidate" prop="autoSku">
          <template slot="label">
            <span>自動生成SKU流水號</span>
            <span class="tip">手動填寫SKU, 自動生成SKU將無效</span>
          </template>
          <el-select v-model.trim="searchValue" placeholder="請選擇" style="width:25%">
            <el-option v-for="item in searchOptions" :key="item.header" :label="item.header" :value="item.header">
              <span style="float: left">{{ item.header }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
            </el-option>
          </el-select>
          <el-input v-model="form.autoSku" style="width:40%"></el-input>
          <el-button @click="handleAuto" type="primary">生成流水號</el-button>
        </el-form-item>

      </el-form>
      <el-form ref="form2" :model="form" label-position="left" label-width="100px">
        <div style="position:relative">
          <el-form-item ref="formItemTwo" label="SKU" :rules="skuValidate" prop="sku">
            <el-input :disabled="title=='編輯'" v-model.trim="form.sku" style="width:50%;" @blur="handleInspect"></el-input>
          </el-form-item>
          <img :src="detectorURL" v-if="showDetector" style="width:100px;height:100px;position:absolute;top:0px;right:25%" alt="">
        </div>
        <el-form-item label="New SKU" prop="newSku">
          <el-checkbox v-if="title=='編輯'" v-model="trueNewSku"></el-checkbox>
          <el-input v-model="form.newSku" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="商品名稱" prop="productName" :rules="{required:true}">
          <el-checkbox v-if="title=='編輯'" v-model="trueProductName"></el-checkbox>
          <el-input v-model="form.productName" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="圖片" prop="image" :show-message="showMessage">
          <el-checkbox v-if="title=='編輯'" v-model="imageStatus"></el-checkbox>
          <el-upload class="avatar-uploader" action='' :before-upload="beforeAvatarUpload" :on-change="handleAvatarSuccess" :show-file-list="false">
            <img v-if="base64" :src="base64" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="狀態：" prop="status" class="inline">
          <el-checkbox v-if="title=='編輯'" v-model="trueStatus"></el-checkbox>
          <el-input v-model="form.status" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item v-if="title=='編輯'" label="採購成本 (RMB)：" prop="priceRMB">
          <el-checkbox v-model="priceShow"></el-checkbox>
          <el-input style="width:20%" v-model="form.priceRMB"></el-input>
        </el-form-item>
      </el-form>

      <el-form ref="form3" :model="form" label-position="top" v-if="title=='編輯'">
        <el-form-item label="Amazon 出貨尺寸" style="margin-bottom:0px">
          <template slot="label">
            <span>Amazon尺寸</span> &nbsp;&nbsp;&nbsp;
            <el-switch v-model="amaShow"></el-switch>
          </template>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="4" v-if="amaShow">
            <el-form-item label="Amazon 長(CM)" prop="amazonLengthCM">
              <el-input v-model="form.amazonLengthCM"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" v-if="amaShow">
            <el-form-item label="Amazon 寬(CM)" prop="amazonWidthCM">
              <el-input v-model="form.amazonWidthCM"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" v-if="amaShow">
            <el-form-item label="Amazon 高(CM))" prop="amazonHeightCM">
              <el-input v-model="form.amazonHeightCM"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" v-if="amaShow">
            <el-form-item label="Amazon 重(kg)" prop="amazonWeightKG">
              <el-input v-model="form.amazonWeightKG"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="小包出貨尺寸" style="margin-bottom:0px">
          <template slot="label">
            <span>小包尺寸</span>&nbsp;&nbsp;&nbsp;
            <el-switch v-model="pricalShow"></el-switch>
          </template>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="4" v-if="pricalShow">
            <el-form-item label="小包 長(CM)" prop="parcelLengthCM">
              <el-input v-model="form.parcelLengthCM"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" v-if="pricalShow">
            <el-form-item label="小包 寬(CM)" prop="parcelWidthCM">
              <el-input v-model="form.parcelWidthCM"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" v-if="pricalShow">
            <el-form-item label="小包 高(CM)" prop="parcelHeightCM">
              <el-input v-model="form.parcelHeightCM"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" v-if="pricalShow">
            <el-form-item label="小包 重(kg)" prop="parcelWeightKG">
              <el-input v-model="form.parcelWeightKG"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="title=='編輯'" label="已停用 SKU：" prop="deprecatedSKU" :show-message="deprecatedSkuShow">
          <template slot="label">
            <span>Deprecated SKU：</span>
            <el-switch v-model="deprecatedSkuShow"></el-switch>
          </template>
          <el-input type="textarea" rows='4' v-if="deprecatedSkuShow" v-model="form.deprecatedSKU" style="width:70%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-popover placement="top" width="160" v-model="popoverVisible">
          <p>是否要提交？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="popoverCancel">取消</el-button>
            <el-button type="primary" size="mini" @click="popoverConfirm">確定</el-button>
          </div>
          <el-button type="primary" slot="reference" :loading="isLoading" @click="handleConfirm">確定</el-button>
        </el-popover>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
    props: ["title", "row"],
    data() {
        var that = this;
        return {
            centerDialogVisible: true,
            popoverVisible: false,
            searchValue: "IT",
            isLoading: false,
            base64: "",
            showDetector: false,
            trueStatus: false,
            trueProductName: false,
            imageStatus: false,
            detectorURL: "../../static/img/1.png",
            trueNewSku: false,
            searchOptions: [],
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
            amaShow: false,
            pricalShow: false,
            deprecatedSkuShow: false,
            priceShow: false,
            trueSku: true,
            image: "",
            base64:""
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
        if (this.title == "編輯") {
            this.form.image = this.row.imageURL;
            this.form.productName = this.row.productName;
            this.form.newSku = this.row.newSku;
            this.form.sku = this.row.sku;

            this.form.amazonWidthCM = this.row.amazonWidthCM;
            this.form.amazonHeightCM = this.row.amazonHeightCM;
            this.form.amazonWeightKG = this.row.amazonWeightKG;
            this.form.amazonLengthCM = this.row.amazonLengthCM;

            this.form.parcelWidthCM = this.row.parcelWidthCM;
            this.form.parcelHeightCM = this.row.parcelHeightCM;
            this.form.parcelWeightKG = this.row.parcelWeightKG;
            this.form.parcelLengthCM = this.row.parcelLengthCM;

            this.form.deprecatedSKU = this.row.deprecatedSKU;

            this.form.priceRMB = this.row.priceRMB;
            this.url = "sku/update";
        } else {
            this.url = "sku/add";
        }
    },
    watch: {
        "form.autoSku"(newVal, oldVal) {
            if (!!newVal) {
                this.skuValidate.required = false;
                this.form.sku = "";
            } else {
                this.skuValidate.required = true;
            }
            if (this.title != "編輯") {
                this.$nextTick(() => {
                    this.$refs["formItemTwo"].clearValidate();
                });
            }
        },
        "form.sku"(newVal, oldVal) {
            if (!!newVal) {
                this.autoSkuValidate.required = false;
                this.form.autoSku = "";
            } else {
                this.autoSkuValidate.required = true;
            }
            if (this.title != "編輯") {
                this.$nextTick(() => {
                    this.$refs["formItem"].clearValidate();
                });
            }
        }
    },
    methods: {
        beforeAvatarUpload(file) {
            let isJPG = file.type === "image/jpeg";
            let isPNG = file.type === "image/png";
            if (!isJPG && !isPNG) {
                this.$message.error("上傳頭像圖片只能是 JPG PNG 格式!");
            } else {
                return isJPG;
            }
        },
        handleAvatarSuccess(file,fileList) {
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
        handleCancel() {
            this.$emit("showDailog", false);
        },
        handleConfirm() {
            this.popoverVisible = true;
        },
        handleClose() {
            this.centerDialogVisible = true;
            this.$emit("showDailog", false);
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
        handleInspect() {},
        popoverCancel() {
            this.popoverVisible = false;
        },
        popoverConfirm() {
            this.popoverVisible = false;
            this.$refs["form1"].validate((action, dom) => {
                if (!action) return;
                this.$refs["form2"].validate((action, dom) => {
                    if (!action) return;
                    if (this.title == "編輯") {
                        this.$refs["form3"].validate((action, dom) => {
                            if (action) {
                                let obj = {
                                    trueStatus: true,
                                    trueProductName: true,
                                    imageStatus: true,
                                    trueNewSku: true
                                };
                                let value = {
                                    data: []
                                };
                                if (this.form.autoSku) {
                                    obj.sku =
                                        this.searchValue + this.form.autoSku;
                                } else {
                                    obj.sku = this.form.sku;
                                }
                                if (this.amaShow) {
                                    obj.amazonWidthCM = this.form.amazonWidthCM;
                                    obj.amazonHeightCM = this.form.amazonHeightCM;
                                    obj.amazonWeightKG = this.form.amazonWeightKG;
                                    obj.amazonLengthCM = this.form.amazonLengthCM;
                                }

                                if (this.pricalShow) {
                                    obj.parcelWidthCM = this.form.parcelWidthCM;
                                    obj.parcelHeightCM = this.form.parcelHeightCM;
                                    obj.parcelWeightKG = this.form.parcelWeightKG;
                                    obj.parcelLengthCM = this.form.parcelLengthCM;
                                }

                                if (this.deprecatedSkuShow) {
                                    obj.deprecatedSKU = this.form.deprecatedSKU;
                                }

                                if (this.priceShow) {
                                    obj.priceRMB = this.form.priceRMB;
                                }

                                obj.productName = this.form.productName;
                                obj.status = this.form.status;
                                obj.newSku = this.form.newSku;
                                var formData = new FormData(); 
                                this.isLoading = true;
                                value.data.push(obj);
                                value = JSON.stringify(value);
                                formData.append("value", value);
                                formData.append("token", this.token);   
                                if (this.form.image) {
                                    formData.append("uploadfile", this.form.image);
                                }                     
                                this.isLoading = true;
                                var request = new XMLHttpRequest();
                                let url =
                                    "http://127.0.0.1:8080/data-server/" +
                                    // "http://60.251.57.138:8000/data-server/" +
                                    this.url;
                                request.open("POST", url);
                                request.onreadystatechange = () => {
                                    if (
                                        request.readyState == 4 &&
                                        request.status == 200
                                    ) {
                                        this.isLoading = false;
                                        this.$emit("showDailog", false);
                                        // this.$findFather("sku").$emit(
                                        //     "refresh"
                                        // );
                                        this.$findFather("sku").handleSearch();
                                        this.$message.success("編輯成功");
                                    }
                                    if (request.status != 200) {
                                        this.isLoading = false;
                                        this.$emit("showDailog", false);
                                        this.$message.warning("編輯失敗");
                                    }
                                };
                                request.send(formData);
                            }
                        });
                    } else {
                        var formData = new FormData();
                        let obj = {};
                        let value = {
                            data: []
                        };
                        if (this.form.autoSku) {
                            obj.sku = this.searchValue + this.form.autoSku;
                        } else {
                            obj.sku = this.form.sku;
                        }

                        obj.productName = this.form.productName;
                        obj.status = this.form.status;
                        obj.newSku = this.form.newSku;
                        value.data.push(obj);
                        value = JSON.stringify(value);
                        formData.append("value", value);
                        formData.append("token", this.token);
                        if (this.form.image) {
                            formData.append("uploadfile", this.form.image);
                        }
                        this.isLoading = true;
                        var request = new XMLHttpRequest();
                        let url =
                            // "http://60.251.57.138:8000/data-server/" + this.url;
                            "http://127.0.0.1:8080/data-server/" + this.url;
                        request.open("POST", url);
                        request.onreadystatechange = () => {
                            if (
                                request.readyState == 4 &&
                                request.status == 200
                            ) {
                                this.isLoading = false;
                                this.$emit("showDailog", false);
                                this.$message.success("新增成功");
                                this.$findFather("sku").handleSearch();
                            }
                            if (request.status != 200) {
                                this.isLoading = false;
                                this.$emit("showDailog", false);
                                this.$message.warning("新增失敗");
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
#dialog {
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


