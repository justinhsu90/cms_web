<template>
  <div
    id="skuEdit"
    style="padding:20px"
  >
    <div class="heade">
      <i class="el-icon-arrow-left"></i>
      <a
        href="javascript:void(0)"
        @click="goBack"
      >返回</a>
    </div>
    <br>
    <h2>{{
      look ? "查看" : "编辑"
    }}SKU</h2>
    <br>
    <el-form
      ref="form2"
      :model="form"
      label-position="left"
      label-width="150px"
    >
      <div class="relative">
        <el-form-item
          ref="formItemTwo"
          label="SKU"
          prop="sku"
          :rules="skuValidate"
        >
          <el-input
            :disabled="true"
            v-model.trim="form.sku"
            style="width:50%;"
          ></el-input>
        </el-form-item>
        <div
          class="reference"
          v-if="showDetector"
        >
          <p>同SKU产品参考图</p>
          <img
            height="100%"
            width="100%"
            :src="detectorURL"
            alt=""
          >
        </div>
      </div>
      <el-form-item
        label="New SKU"
        prop="newSku"
      >
        <el-input
          v-model="form.newSku"
          style="width:50%"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="英文名稱"
        prop="productName"
        :rules="{required:true}"
      >
        <el-input
          v-model="form.productName"
          style="width:50%"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="中文名稱"
        prop="productNameChinese"
        :rules="{required:true}"
      >
        <el-input
          v-model="form.productNameChinese"
          style="width:50%"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="中文申報名"
        prop="declareNameChinese"
      >
        <el-input
          v-model="form.declareNameChinese"
          style="width:50%"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="英文申報名"
        prop="declareNameEnglish"
      >
        <el-input
          v-model="form.declareNameEnglish"
          style="width:50%"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="圖片"
        prop="image"
        :show-message="showMessage"
      >
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          action=''
          :before-upload="beforeAvatarUpload"
          :on-change="handleAvatarSuccess"
          :show-file-list="false"
        >
          <div
            v-if="form.base64 || imageUrlLoad"
            class="avatar"
          >
            <img
              ref="img"
              :src="form.base64"
              crossOrigin="anonymous"
            >
            <div class="delete">
              <i @click.stop="handleImageDelete"> 删除</i>
            </div>
          </div>
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="圖片url"
        prop="imageUrl"
        :rules="imageUrlValidate"
      >
        <el-input
          style="width:50%"
          :value="form.imageUrl"
          @input="form.imageUrl = $event;"
          @blur="handleBlur"
        >
        </el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item
            label="採購成本 (RMB)："
            prop="productCost"
          >
            <el-input v-model="form.productCost"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="採購幣別："
            prop="productCostCurrency"
          >
            <el-select v-model="form.productCostCurrency">
              <el-option
                v-for="(v,i) in costCurrency"
                :key="i"
                :label="v"
                :value="v"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-form
      ref="form3"
      :model="form"
      label-position="left"
      label-width="150px"
    >
      <el-row :gutter="20">
        <el-col :span=6>
          <el-form-item
            label="Amazon 長(CM)"
            prop="amazonLengthCM"
          >
            <el-input v-model="form.amazonLengthCM"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="Amazon 寬(CM)"
            prop="amazonWidthCM"
          >
            <el-input v-model="form.amazonWidthCM"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="Amazon 高(CM)"
            prop="amazonHeightCM"
          >
            <el-input v-model="form.amazonHeightCM"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="Amazon 重(kg)"
            prop="amazonWeightKG"
          >
            <el-input v-model="form.amazonWeightKG"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item
            label="小包 長(CM)"
            prop="parcelLengthCM"
          >
            <el-input v-model="form.parcelLengthCM"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="小包 寬(CM)"
            prop="parcelWidthCM"
          >
            <el-input v-model="form.parcelWidthCM"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="小包 高(CM)"
            prop="parcelHeightCM"
          >
            <el-input v-model="form.parcelHeightCM"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="小包 重(kg)"
            prop="parcelWeightKG"
          >
            <el-input v-model="form.parcelWeightKG"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item
            label="商品 長(CM)"
            prop="productLengthCM"
          >
            <el-input v-model="form.productLengthCM"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="商品 寬(CM)"
            prop="productWidthCM"
          >
            <el-input v-model="form.productWidthCM"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="商品 高(CM)"
            prop="productHeightCM"
          >
            <el-input v-model="form.productHeightCM"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="商品 重(kg)"
            prop="productWeightKG"
          >
            <el-input v-model="form.productWeightKG"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="已停用 SKU："
        prop="deprecatedSKU"
      >
        <template slot="label">
          <span>已停用 SKU：：</span>
        </template>
        <el-input
          type="textarea"
          rows='4'
          v-model="form.deprecatedSKU"
          style="width:70%"
        ></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item
            label="最後更新時間"
            prop="lastUpdatedTime"
          >
            <el-date-picker
              style="width:100%"
              v-model="form.lastUpdatedTime"
              disabled
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item
            label="最後更新"
            prop="lastModifiedBy"
          >
            <el-input
              v-model="form.lastModifiedBy"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item
            label="加入時間"
            prop="addedTime"
          >
            <el-date-picker
              style="width:100%"
              v-model="form.addedTime"
              disabled
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item
            label="加入人"
            prop="addedBy"
          >
            <el-input
              v-model="form.addedBy"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button
        v-if="!look"
        @click="handleConfirm"
        :loading="submitLoading"
        type="primary"
        size="large"
      >更新</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var that = this;
    return {
      imageUrlLoad: false,
      centerDialogVisible: true,
      popoverVisible: false,
      searchValue: "IT",
      showDetector: false,
      trueStatus: false,
      trueProductName: false,
      imageStatus: false,
      detectorURL: "../../static/img/1.png",
      trueNewSku: false,
      searchOptions: [],
      costCurrency: [],
      submitLoading: false,
      isCopy: false,
      form: {
        base64: "",
        imageUrl: "",
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
        productWidthCM: "",
        productHeightCM: "",
        productWeightKG: "",
        productLengthCM: "",
        productNameChinese: "",
        declareNameChinese: "",
        declareNameEnglish: "",
        deprecatedSKU: "",
        productCost: "",
        productCostCurrency: "RMB"
      },
      skuValidate: {
        required: true,
        token: this.token,
        validator(rule, value, callback) {
          // let rules = /[A-Za-z]{2}[0-9]{4}[a-zA-Z]{3}/;
          let rules = /^[A-Za-z]{2}[0-9]{4}/;
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
      imageUrlValidate: {
        validator(rule, value, callback) {
          let rules = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&amp;:/~+#]*[\w\-@?^=%&amp;/~+#])?/;
          if (value) {
            if (rules.test(value)) {
              callback();
            } else {
              callback(new Error("输入网址不合法"));
            }
          } else {
            callback();
          }
        }
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
      formModified: false
    };
  },
  created() {
    this.look = this.$route.query.type == "look";
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

    axios({
      url: "sku/value/currency",
      method: "post",
      data: {
        token: this.token
      }
    }).then(res => {
      this.costCurrency = _.cloneDeep(res.data);
    });

    let data = JSON.parse(this.$route.query.data);
    this.form.base64 = data.imageURL;
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
    this.form.productWidthCM = data.productWidthCM;
    this.form.productHeightCM = data.productHeightCM;
    this.form.productWeightKG = data.productWeightKG;
    this.form.productLengthCM = data.productLengthCM;
    this.form.lastUpdatedTime = data.lastUpdatedTime;
    this.form.lastModifiedBy = data.lastModifiedBy;
    this.form.addedTime = data.addedTime;
    this.form.addedBy = data.addedBy;
    this.form.productCostCurrency = data.productCostCurrency;
    this.form.productNameChinese = data.productNameChinese;
    this.form.declareNameChinese = data.declareNameChinese;
    this.form.declareNameEnglish = data.declareNameEnglish;
    this.form.deprecatedSKU = data.deprecatedSKU;
    this.form.productCost = data.productCost;
    this.formModified = true;
    this.$watch("form.sku", () => {
      this.formModified = false;
    });
  },
  methods: {
    handleBlur() {
      this.imageUrlLoad = true;
      this.$nextTick(() => {
        this.$refs["img"].src = this.form.imageUrl;
        this.$refs["img"].onload = () => {
          this.form.base64 = "";
        };
        this.$refs["img"].onerror = () => {
          this.imageUrlLoad = false;
          this.form.base64 = "";
          this.$message.error("url地址获取不到图片");
        };
      });
    },
    handleImageDelete() {
      this.form.base64 = "";
      this.form.imageUrl = "";
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
    handleAvatarSuccess(file) {
      let url = URL || Window.webkitURL;
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
        this.form.base64 = base64;
        this.form.imageUrl = "";
        this.blob = "";
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
      this.$refs["form2"].validate(action => {
        if (!action) return;
        this.$refs["form3"].validate(() => {
          var formData = new FormData();
          let obj = {};
          let value = {
            data: []
          };

          obj.sku = this.form.sku;
          obj.productName = this.form.productName;
          obj.status = this.form.status;
          obj.newSku = this.form.newSku;
          obj.amazonWidthCM = this.form.amazonWidthCM;
          obj.amazonHeightCM = this.form.amazonHeightCM;
          obj.amazonWeightKG = this.form.amazonWeightKG;
          obj.amazonLengthCM = this.form.amazonLengthCM;

          obj.parcelWidthCM = this.form.parcelWidthCM;
          obj.parcelHeightCM = this.form.parcelHeightCM;
          obj.parcelWeightKG = this.form.parcelWeightKG;
          obj.parcelLengthCM = this.form.parcelLengthCM;

          obj.productWidthCM = this.form.productWidthCM;
          obj.productHeightCM = this.form.productHeightCM;
          obj.productWeightKG = this.form.productWeightKG;
          obj.productLengthCM = this.form.productLengthCM;
          obj.productCost = this.form.productCost;
          obj.productCostCurrency = this.form.productCostCurrency;
          obj.productNameChinese = this.form.productNameChinese;
          obj.declareNameChinese = this.form.declareNameChinese;
          obj.declareNameEnglish = this.form.declareNameEnglish;
          obj.deprecatedSKU = this.form.deprecatedSKU;
          if (this.form.imageUrl) {
            obj.imageUrl = this.form.imageUrl;
          } else {
            formData.append("uploadfile", this.image);
          }
          value.data.push(obj);
          value = JSON.stringify(value);
          this.submitLoading = true;
          formData.append("value", value);
          formData.append("token", this.token);
          this.isLoading = true;
          let url = "/sku/update";
          axios({
            url,
            method: "post",
            data: formData,
            headers: {
              "Content-type": "multipart/form-data"
            },
            isFormData: true
          })
            .then(() => {
              this.submitLoading = false;
              this.$message.success("編輯成功");
              this.Bus.$emit("refresh");
              this.goBack();
            })
            .catch(() => {
              this.submitLoading = false;
              this.$message.warning("編輯失敗");
            });
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.imageUrl {
  width: 150px;
  position: absolute;
  top: -40px;
  right: 27%;
  border: 1px dashed #d9d9d9;
  box-sizing: border-box;
  p {
    font-size: 12px;
    text-align: center;
    margin-bottom: 5px;
  }
}
.reference {
  width: 150px;
  position: absolute;
  top: 0px;
  right: 25%;
  border: 1px dashed #d9d9d9;
  padding: 5px;
  box-sizing: border-box;
  p {
    font-size: 12px;
    text-align: center;
    margin-bottom: 5px;
  }
}
/deep/ .el-form-item {
  margin-bottom: 18px;
}
.heade {
  font-size: 16px;
  color: #45a2ff;
}
.heade a {
  color: #45a2ff;
}
/deep/ .el-switch__input:focus ~ .el-switch__core {
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
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
/deep/ .avatar {
  width: 178px;
  height: 178px;
  position: relative;
  &:hover .delete {
    display: block;
  }
  .delete {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0px;
    display: none;
  }
  .delete i {
    position: absolute;
    top: 50% !important;
    left: 50%;
    color: #62717e;
    transform: translate(-50%, -50%);
    font-style: normal;
  }
  .delete i:hover {
    background-color: #45a2ff;
    color: #fff !important;
    width: 60px;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
  }
}

img {
  width: 100%;
  height: 100%;
}
</style>
