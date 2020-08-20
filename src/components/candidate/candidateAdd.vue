<template>
  <div style="padding:20px">
    <div class="heade">
      <i class="el-icon-arrow-left"></i>
      <a
        href="javascript:void(0)"
        @click="goBack"
      >返回</a>
    </div>
    <br>
    <h2>添加產品</h2>
    <br>
    <el-form
      ref="form"
      :model="newForm"
      label-position="left"
      label-width="150px"
    >
      <el-alert
        type="warning"
        show-icon
        title=""
        class="mb10 w50"
        v-if="isCopy"
      >
        <small>修改sku，才能保存。</small>
      </el-alert>
      <div style="position:relative">
        <el-form-item
          ref="formItemTwo"
          label="SKU"
          prop="sku"
          :rules="skuValidate"
        >
          <template slot='label'>
            <span>SKU</span>
          </template>
          <el-input
            :value="newForm.sku"
            @input="newForm.sku = $event"
            @blur="newForm.sku = newForm.sku.toUpperCase()"
            class="w50"
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
        label="英文名稱"
        prop="productName"
        :rules="{required:true,message:'此項必填'}"
      >
        <el-input
          v-model="newForm.productName"
          class="w50"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="中文名稱"
        prop="productNameChinese"
        :rules="{required:true,message:'此項必填'}"
      >
        <el-input
          v-model="newForm.productNameChinese"
          class="w50"
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
          class="w50"
          :value="form.imageUrl"
          @input="form.imageUrl = $event;"
          @blur="handleBlur"
        >
        </el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item
            label="最後更新時間："
            prop="lastUpdatedTime"
          >
            <el-date-picker
              clearable
              style="width:100%"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="newForm.lastUpdatedTime"
              type="datetime"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="加入時間："
            prop="addedTime"
          >
            <el-date-picker
              clearable
              style="width:100%"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="newForm.addedTime"
              type="datetime"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="規格："
            prop="details"
          >
            <el-input v-model="newForm.details"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="加入人："
            prop="addedBy"
          >
            <el-input v-model="newForm.addedBy"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">

          <el-form-item
            label="參考連結："
            prop="referralUrl"
          >
            <el-input v-model="newForm.referralUrl"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- account: "MagicTrend",
        country: "GB", -->
          <el-form-item
            label="平台："
            prop="platform"
          >
            <el-input v-model="newForm.platform"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="用戶："
            prop="account"
          >
            <el-input v-model="newForm.account"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="國家："
            prop="country"
          >
            <el-input v-model="newForm.country"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="belongToManager："
            prop="belongToManager"
          >
            <el-input v-model="newForm.belongToManager"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="currentOwner："
            prop="currentOwner"
          >
            <el-input v-model="newForm.currentOwner"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="listingStatus："
            prop="listingStatus"
          >
            <el-input v-model="newForm.listingStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="permanentClose："
            prop="permanentClose"
          >
            <el-input v-model="newForm.permanentClose"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="battery："
            prop="battery"
          >
            <el-input v-model="newForm.battery"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="sample.trackingNumber："
            prop="sample.trackingNumber"
          >
            <el-input v-model="newForm.sample.trackingNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="sample.sampleStatus："
            prop="sample.sampleStatus"
          >
            <el-input v-model="newForm.sample.sampleStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="sample.trackingNumberAgent："
            prop="sample.trackingNumberAgent"
          >
            <el-input v-model="newForm.sample.trackingNumberAgent"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="sample.shipoutTime："
            prop="sample.shipoutTime"
          >
            <el-input v-model="newForm.sample.shipoutTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="productDimension.height："
            prop="productDimension.height"
          >
            <el-input v-model="newForm.productDimension.height"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="productDimension.width："
            prop="productDimension.width"
          >
            <el-input v-model="newForm.productDimension.width"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="productDimension.length："
            prop="productDimension.length"
          >
            <el-input v-model="newForm.productDimension.length"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="productDimension.weight："
            prop="productDimension.weight"
          >
            <el-input v-model="newForm.productDimension.weight"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="productDimension.weightUnit："
            prop="productDimension.weightUnit"
          >
            <el-input v-model="newForm.productDimension.weightUnit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="productDimension.dimensionUnit："
            prop="productDimension.dimensionUnit"
          >
            <el-input v-model="newForm.productDimension.dimensionUnit"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="shippingDimension.height："
            prop="shippingDimension.height"
          >
            <el-input v-model="newForm.shippingDimension.height"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="shippingDimension.width："
            prop="shippingDimension.width"
          >
            <el-input v-model="newForm.shippingDimension.width"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="shippingDimension.length："
            prop="shippingDimension.length"
          >
            <el-input v-model="newForm.shippingDimension.length"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="shippingDimension.weight："
            prop="shippingDimension.weight"
          >
            <el-input v-model="newForm.shippingDimension.weight"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="shippingDimension.weightUnit："
            prop="shippingDimension.weightUnit"
          >
            <el-input v-model="newForm.shippingDimension.weightUnit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="shippingDimension.dimensionUnit："
            prop="shippingDimension.dimensionUnit"
          >
            <el-input v-model="newForm.shippingDimension.dimensionUnit"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="shippingFee.finalPrice："
            prop="shippingFee.finalPrice"
          >
            <el-input v-model="newForm.shippingFee.finalPrice"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="shippingFee.marginPercentage："
            prop="shippingFee.marginPercentage"
          >
            <el-input v-model="newForm.shippingFee.marginPercentage"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="shippingFee.margin："
            prop="shippingFee.margin"
          >
            <el-input v-model="newForm.shippingFee.margin"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="shippingFee.shippingMethod："
            prop="shippingFee.shippingMethod"
          >
            <el-input v-model="newForm.shippingFee.shippingMethod"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="shippingFee.shippingAgent："
            prop="shippingFee.shippingAgent"
          >
            <el-input v-model="newForm.shippingFee.shippingAgent"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="shippingFee.shippingFee："
            prop="shippingFee.shippingFee"
          >
            <el-input v-model="newForm.shippingFee.shippingFee"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="shippingFee.shippingFeeCurrency："
            prop="shippingFee.shippingFeeCurrency"
          >
            <el-input v-model="newForm.shippingFee.shippingFeeCurrency"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="shippingFee.productCost："
            prop="shippingFee.productCost"
          >
            <el-input v-model="newForm.shippingFee.productCost"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="shippingFee.productCostCurrency："
            prop="shippingFee.productCostCurrency"
          >
            <el-input v-model="newForm.shippingFee.productCostCurrency"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="shippingFee.packageMaterialFee："
            prop="shippingFee.packageMaterialFee"
          >
            <el-input v-model="newForm.shippingFee.packageMaterialFee"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="shippingFee.finalPriceCurrency："
            prop="shippingFee.finalPriceCurrency"
          >
            <el-input v-model="newForm.shippingFee.finalPriceCurrency"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="shippingFee.productDimensionPrefix："
            prop="shippingFee.productDimensionPrefix"
          >
            <el-input v-model="newForm.shippingFee.productDimensionPrefix"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="shippingFee.productWeightPrefix："
            prop="shippingFee.productWeightPrefix"
          >
            <el-input v-model="newForm.shippingFee.productWeightPrefix"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="shippingFee.air："
            prop="shippingFee.air"
          >
            <el-input v-model="newForm.shippingFee.air"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="shippingFee.calculatedByProductDimension："
            prop="shippingFee.calculatedByProductDimension"
          >
            <el-input v-model="newForm.shippingFee.calculatedByProductDimension"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button
        @click="handleConfirm"
        :loading="submitLoading"
        type="primary"
        size="large"
        :disabled="formModified || imgLoad"
      >新增</el-button>
    </el-form>

  </div>
</template>
<script>
export default {
  data() {
    var that = this;
    return {
      imageUrlLoad: false,
      imgLoad: false,
      centerDialogVisible: true,
      popoverVisible: false,
      showDetector: false,
      trueStatus: false,
      trueProductName: false,
      imageStatus: false,
      detectorURL: "../../static/img/1.png",
      trueNewSku: false,
      searchOptions: [],
      searchColor: [],
      searchQuantity: [],
      costCurrency: [],
      submitLoading: false,
      isCopy: false,
      captureSku: "",
      newForm: {
        sku: "1",
        productName: "test product name test product name",
        productNameChinese: "2",
        imageUrl:
          "https://ejwnrpeak4skp96pz4kb.blob.core.windows.net/hh0259tre01/HH0259TRE01-snapshot.png",
        lastUpdatedTime: "2020-08-18 12:00:53.0",
        addedTime: "2020-08-13 11:22:33.0",
        details: "test details\n",
        addedBy: "test addedby",
        referralUrl: "https://www.hoijo2342352",
        platform: "Wowcher",
        account: "MagicTrend",
        country: "GB",
        currentOwner: "Justin",
        listingStatus: "PROCESSING",
        permanentClose: false,
        battery: true,
        belongToManager: "",
        messages: [
          {
            productId: 1,
            messageIndex: 0,
            messageTime: "2020-08-21 11:22:33.0",
            messageType: "na",
            message: "haha\n",
            addedBy: "Justin"
          }
        ],
        sample: {
          trackingNumber: "",
          sampleStatus: null,
          trackingNumberAgent: "",
          shipoutTime: ""
        },
        productDimension: {
          id: 0,
          height: 1.0,
          width: 3.0,
          length: 2.0,
          weight: 0.4,
          weightUnit: "kg",
          dimensionUnit: "cm"
        },
        shippingDimension: {
          id: 0,
          height: 2.2,
          width: 3.3,
          length: 1.1,
          weight: 0.6,
          weightUnit: "kg",
          dimensionUnit: "cm"
        },
        shippingFee: {
          finalPrice: 23.45,
          marginPercentage: 0.3456,
          margin: 12.0,
          shippingMethod: "RM1R",
          shippingAgent: "SFC",
          shippingFee: 56.7,
          shippingFeeCurrency: "RMB",
          productCost: 11.0,
          productCostCurrency: "RMB",
          packageMaterialFee: 1.0,
          finalPriceCurrency: "GBP",
          productDimensionPrefix: 2.0,
          productWeightPrefix: 0.2,
          air: true,
          calculatedByProductDimension: true
        }
      },
      form: {
        searchValue: "IT",
        colorValue: "",
        quantityValue: "",
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
              callback(new Error("輸入網址不合法"));
            }
          } else {
            callback();
          }
        }
      },
      rules: {
        required: true,
        message: "此項必填"
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
  mounted() {
    axios({
      url: "sku/value/colour",
      method: "post",
      data: {
        token: this.token
      }
    }).then(({ data }) => {
      this.searchColor = _.cloneDeep(data);
    });
    axios({
      url: "sku/value/quantity",
      method: "post",
      data: {
        token: this.token
      }
    }).then(({ data }) => {
      this.searchQuantity = _.cloneDeep(data);
    });

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

    this.isCopy = this.$route.query.copy;
    if (!this.isCopy) return;
    this.imgLoad = true;
    let data = JSON.parse(this.$route.query.data);
    this.form.base64 = data.imageURL;
    this.$nextTick(() => {
      this.disposeCopy();
    });

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
    handleAddSku() {
      // if (this.form.captureSku) {
      //   this.form.sku =
      //     this.form.searchValue +
      //     this.form.captureSku +
      //     this.form.colorValue +
      //     this.form.quantityValue;
      // }
    },
    handleBlur() {
      this.imageUrlLoad = true;
      this.$nextTick(() => {
        this.$refs["img"].src = this.form.imageUrl;
        this.$refs["img"].onload = () => {
          this.blob = "";
          this.form.base64 = "";
        };
        this.$refs["img"].onerror = () => {
          this.imageUrlLoad = false;
          this.$message.error("url地址獲取不到圖片");
        };
      });
    },
    disposeCopy() {
      let _that = this;
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      var img = new Image();
      img.src = this.form.base64;
      img.setAttribute("crossOrigin", "Anonymous");
      img.addEventListener("load", function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(this, 0, 0);
        document.body.appendChild(canvas);
        let base64 = canvas.toDataURL("image/png");
        _that.dataURLtoBlob(base64);
      });
      img.addEventListener("error", function() {
        this.imgLoad = false;
      });
    },
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      let blob = new Blob([u8arr], { type: mime });
      this.blobToFile(blob, "圖片");
    },
    blobToFile(theBlob, fileName) {
      theBlob.lastModifiedDate = new Date();
      theBlob.name = fileName;
      this.blob = theBlob;
      this.imgLoad = false;
    },
    handleImageDelete() {
      this.form.base64 = "";
      this.form.imageUrl = "";
      this.blob = "";
    },
    goBack() {
      this.$router.back();
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
      this.imgLoad = false;
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
    handleAuto() {
      axios({
        url: "sku/newindex",
        method: "post",
        data: {
          category: this.form.searchValue,
          token: this.token
        }
      }).then(res => {
        this.form.captureSku = res.index;
        this.form.sku =
          this.form.searchValue +
          this.form.captureSku +
          this.form.colorValue +
          this.form.quantityValue;
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
      this.$refs["form1"].validate(action => {
        if (!action) return;
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
              if (this.blob) {
                formData.append("uploadfile", this.blob);
              } else {
                if (this.form.base64) {
                  formData.append("uploadfile", this.image);
                }
              }
            }
            value.data.push(obj);
            value = JSON.stringify(value);
            this.submitLoading = true;
            formData.append("value", value);
            formData.append("token", this.token);
            this.isLoading = true;
            let url = "/sku/add";
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
                this.$message.success("新增成功");
                this.Bus.$emit("refresh");
                this.goBack();
              })
              .catch(() => {
                this.submitLoading = false;
                this.$message.warning("新增失敗");
              });
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
