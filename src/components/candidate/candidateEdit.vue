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
    <h2>{{type == 'look' ? '查看' :  '编辑'}}產品</h2>
    <br>
    <el-form
      ref="form"
      :model="newForm"
      label-position="left"
      label-width="150px"
    >
      <el-form-item
        label="ID"
        prop="sku"
      >
        <el-input
          class="w50"
          v-model="newForm.id"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item
        label="SKU"
        prop="sku"
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
      <el-form-item
        label="產品名稱"
        prop="productName"
        :rules="{required:true,message:'此項必填'}"
      >
        <el-input
          v-model="newForm.productName"
          class="w50"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="圖片"
        prop="image"
      >
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          action=''
          :before-upload="beforeAvatarUpload"
          :on-change="handleAvatarSuccess"
          :show-file-list="false"
        >

        </el-upload>
      </el-form-item>
      <el-form-item
        label="圖片url"
        prop="imageUrl"
      >
        <el-input
          class="w50"
          :value="newForm.imageUrl"
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
            <!-- <el-input v-model="newForm.country"></el-input> -->
            <el-select
              class="w-max150"
              placeholder="國家"
              v-model="newForm.country"
              clearable
            >
              <el-option
                v-for="(v,i) in countrys"
                :key="'country'+i"
                :label="v.countryNameChinese"
                :value="v.countryCode"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="平台經理："
            prop="belongToManager"
          >
            <el-input v-model="newForm.belongToManager"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="目前擁有者"
            prop="currentOwner"
          >
            <el-input v-model="newForm.currentOwner"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="狀態："
            prop="listingStatus"
          >
            <el-input v-model="newForm.listingStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="永久關閉："
            prop="permanentClose"
          >
            <el-input v-model="newForm.permanentClose"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="電池貨："
            prop="battery"
          >
            <el-input v-model="newForm.battery"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <h3 class="second-title">樣品</h3>
        <el-col :span="6">
          <el-form-item
            label="樣品發貨單號："
            prop="sample.trackingNumber"
          >
            <el-input v-model="newForm.sample.trackingNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="樣品狀態："
            prop="sample.sampleStatus"
          >
            <el-input v-model="newForm.sample.sampleStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="樣品發貨貨代："
            prop="sample.trackingNumberAgent"
          >
            <el-input v-model="newForm.sample.trackingNumberAgent"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="樣品發貨時間："
            prop="sample.shipoutTime"
          >
            <el-input v-model="newForm.sample.shipoutTime"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <h3 class="second-title">產品</h3>
        <el-col :span="6">
          <el-form-item
            label="產品包裝高度："
            prop="productDimension.height"
          >
            <el-input v-model="newForm.productDimension.height"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="產品包裝寬度："
            prop="productDimension.width"
          >
            <el-input v-model="newForm.productDimension.width"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="產品包裝長度："
            prop="productDimension.length"
          >
            <el-input v-model="newForm.productDimension.length"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="產品包裝重量："
            prop="productDimension.weight"
          >
            <el-input v-model="newForm.productDimension.weight"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="產品包裝重量單位："
            prop="productDimension.weightUnit"
          >
            <el-input v-model="newForm.productDimension.weightUnit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="產品包裝長度單位："
            prop="productDimension.dimensionUnit"
          >
            <el-input v-model="newForm.productDimension.dimensionUnit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <h3 class="second-title">出貨</h3>
        <el-col :span="6">
          <el-form-item
            label="出貨包裝高度："
            prop="shippingDimension.height"
          >
            <el-input v-model="newForm.shippingDimension.height"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="出貨包裝寬度："
            prop="shippingDimension.width"
          >
            <el-input v-model="newForm.shippingDimension.width"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="出貨包裝長度："
            prop="shippingDimension.length"
          >
            <el-input v-model="newForm.shippingDimension.length"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="出貨包裝重量："
            prop="shippingDimension.weight"
          >
            <el-input v-model="newForm.shippingDimension.weight"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="出貨包裝重量單位："
            prop="shippingDimension.weightUnit"
          >
            <el-input v-model="newForm.shippingDimension.weightUnit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="出貨包裝長度單位："
            prop="shippingDimension.dimensionUnit"
          >
            <el-input v-model="newForm.shippingDimension.dimensionUnit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <h3 class="second-title">預估</h3>
        <el-col :span="6">
          <el-form-item
            label="預估報1價(FP)："
            prop="shippingFee.finalPrice"
          >
            <el-input v-model="newForm.shippingFee.finalPrice"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="預估毛利率："
            prop="shippingFee.marginPercentage"
          >
            <el-input v-model="newForm.shippingFee.marginPercentage"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="預估毛利："
            prop="shippingFee.margin"
          >
            <el-input v-model="newForm.shippingFee.margin"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="預估發貨方式："
            prop="shippingFee.shippingMethod"
          >
            <el-input v-model="newForm.shippingFee.shippingMethod"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="預估貨代："
            prop="shippingFee.shippingAgent"
          >
            <el-input v-model="newForm.shippingFee.shippingAgent"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="預估運費："
            prop="shippingFee.shippingFee"
          >
            <el-input v-model="newForm.shippingFee.shippingFee"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="預估運費幣別："
            prop="shippingFee.shippingFeeCurrency"
          >
            <el-input v-model="newForm.shippingFee.shippingFeeCurrency"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="銷貨成本："
            prop="shippingFee.productCost"
          >
            <el-input v-model="newForm.shippingFee.productCost"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="銷貨成本幣別："
            prop="shippingFee.productCostCurrency"
          >
            <el-input v-model="newForm.shippingFee.productCostCurrency"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="出貨包材成本："
            prop="shippingFee.packageMaterialFee"
          >
            <el-input v-model="newForm.shippingFee.packageMaterialFee"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="預估報價幣別："
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
            label="預估報價空/海運："
            prop="shippingFee.air"
          >
            <el-input v-model="newForm.shippingFee.air"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item
            label="是否用產品包裝尺寸計算運費："
            prop="shippingFee.calculatedByProductDimension"
          >
            <el-input v-model="newForm.shippingFee.calculatedByProductDimension"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="form-two__add">
      <el-button
        type="success"
        @click="this.handleAddSearch"
      >新增查询</el-button>
    </div>
    <el-card>
      <div class="candidate-search">
        <div class="candidate-search__left">
          <div class="sl-item">國家</div>
          <div class="sl-item">出貨方式</div>
          <div class="sl-item">發貨方式</div>
          <div class="sl-item">貨代</div>
          <div class="sl-item">尾程派送方式</div>
          <div class="sl-item">計算方式</div>
          <div class="sl-item">毛利率</div>
          <div class="sl-item">毛利</div>
          <div class="sl-item">Final Price</div>
          <div class="sl-item">總成本</div>
          <div class="sl-item"></div>
        </div>
        <div class="candidate-search__right">
          <table class="search__right-table">
            <colgroup>
              <col width="180">
              <col width="180">
              <col width="180">
              <col width="180">
              <col width="180">
            </colgroup>
            <tbody>
              <tr
                v-for="(v, i) in tableData"
                :key="i"
              >
                <td v-if="showTableCount >= 1">
                  <el-input
                    class="td__input-one"
                    v-model="v.countryOne"
                  ></el-input>
                </td>
                <td v-if="showTableCount >= 2">
                  <el-input
                    class="td__input-two"
                    v-model="v.countryTwo"
                  ></el-input>
                </td>
                <td v-if="showTableCount >= 3">
                  <el-input
                    class="td__input-three"
                    v-model="v.countryThree"
                  ></el-input>
                </td>
                <td v-if="showTableCount >= 4">
                  <el-input
                    class="td__input-four"
                    v-model="v.countryFour"
                  ></el-input>
                </td>
                <td v-if="showTableCount >= 5">
                  <el-input
                    class="td__input-five"
                    v-model="v.countryFive"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td v-if="showTableCount >= 1">
                  <div class="btn-container">
                    <el-button
                      size="small"
                      type="primary"
                    >計算</el-button>
                    <el-button
                      size="small"
                      type="success"
                    >使用</el-button>
                  </div>
                </td>
                <td v-if="showTableCount >= 2">
                  <div class="btn-container">
                    <el-button
                      size="small"
                      type="primary"
                    >計算</el-button>
                    <el-button
                      size="small"
                      type="success"
                    >使用</el-button>
                  </div>
                </td>
                <td v-if="showTableCount >= 3">
                  <div class="btn-container">
                    <el-button
                      size="small"
                      type="primary"
                    >計算</el-button>
                    <el-button
                      size="small"
                      type="success"
                    >使用</el-button>
                  </div>
                </td>
                <td v-if="showTableCount >= 4">
                  <div class="btn-container">
                    <el-button
                      size="small"
                      type="primary"
                    >計算</el-button>
                    <el-button
                      size="small"
                      type="success"
                    >使用</el-button>
                  </div>
                </td>
                <td v-if="showTableCount >= 5">
                  <div class="btn-container">
                    <el-button
                      size="small"
                      type="primary"
                    >計算</el-button>
                    <el-button
                      size="small"
                      type="success"
                    >使用</el-button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </el-card>
    <br>
    <div>
      <el-button
        @click="handleConfirm"
        :loading="submitLoading"
        type="primary"
        size="large"
      >修改</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      countrys: [],
      submitLoading: false,
      tableData: [
        {
          countryOne: "",
          countryTwo: "",
          countryThree: "",
          countryFour: "",
          countryFive: ""
        },
        {
          countryOne: "",
          countryTwo: "",
          countryThree: "",
          countryFour: "",
          countryFive: ""
        },
        {
          countryOne: "",
          countryTwo: "",
          countryThree: "",
          countryFour: "",
          countryFive: ""
        },
        {
          countryOne: "",
          countryTwo: "",
          countryThree: "",
          countryFour: "",
          countryFive: ""
        },
        {
          countryOne: "",
          countryTwo: "",
          countryThree: "",
          countryFour: "",
          countryFive: ""
        },
        {
          countryOne: "",
          countryTwo: "",
          countryThree: "",
          countryFour: "",
          countryFive: ""
        },
        {
          countryOne: "",
          countryTwo: "",
          countryThree: "",
          countryFour: "",
          countryFive: ""
        },
        {
          countryOne: "",
          countryTwo: "",
          countryThree: "",
          countryFour: "",
          countryFive: ""
        },
        {
          countryOne: "",
          countryTwo: "",
          countryThree: "",
          countryFour: "",
          countryFive: ""
        },
        {
          countryOne: "",
          countryTwo: "",
          countryThree: "",
          countryFour: "",
          countryFive: ""
        }
      ],
      showTableCount: 0,
      newForm: {
        sku: "",
        productName: "",
        productNameChinese: "",
        imageUrl: "",
        lastUpdatedTime: "",
        addedTime: "",
        details: "",
        addedBy: "",
        referralUrl: "",
        platform: "",
        account: "",
        country: "",
        currentOwner: "",
        listingStatus: "",
        permanentClose: "",
        battery: "",
        belongToManager: "",
        messages: [
          {
            productId: "",
            messageIndex: "",
            messageTime: "",
            messageType: "",
            message: "",
            addedBy: ""
          }
        ],
        sample: {
          trackingNumber: "",
          sampleStatus: "",
          trackingNumberAgent: "",
          shipoutTime: ""
        },
        productDimension: {
          id: "",
          height: "",
          width: "",
          length: "",
          weight: "'",
          weightUnit: "",
          dimensionUnit: ""
        },
        shippingDimension: {
          id: "",
          height: "",
          width: "",
          length: "",
          weight: "",
          weightUnit: "",
          dimensionUnit: ""
        },
        shippingFee: {
          finalPrice: "",
          marginPercentage: "",
          margin: "",
          shippingMethod: "",
          shippingAgent: "",
          shippingFee: "",
          shippingFeeCurrency: "",
          productCost: "",
          productCostCurrency: "",
          packageMaterialFee: "",
          finalPriceCurrency: "",
          productDimensionPrefix: "",
          productWeightPrefix: "",
          air: "",
          calculatedByProductDimension: ""
        }
      }
    };
  },
  beforeCreate() {
    this.type = this.$route.query.type;
  },
  created() {
    let data = JSON.parse(this.$route.query.data);
    this.newForm = Object.assign({}, this.newForm, data);
  },
  mounted() {
    let countrys = axios({
      url: "/candidateproduct/value/country",
      method: "post",
      data: {
        token: this.token
      }
    });
    Promise.all([countrys]).then(([countrys]) => {
      this.countrys = countrys.data;
    });
  },
  methods: {
    handleAddSearch() {
      this.showTableCount = this.showTableCount + 1;
    },
    handleAddSku() {},
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
.candidate-search {
  overflow: hidden;
}
.candidate-search__left {
  width: 100px;
  background: #f5f7fa;
  float: left;
  color: #606266;
  .sl-item {
    padding: 10px 0px;
    text-align: center;
    height: 42px;
    box-sizing: border-box;
  }
}
.candidate-search__right {
  overflow: hidden;
  .search__right-table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    td {
      box-sizing: border-box;
      border: 1px solid #ebeef5;
      /deep/ .el-input__inner {
        border: none;
      }
      /deep/ .el-input {
        height: 41px;
      }
      /deep/ .el-input__inner {
        height: 41px;
        border-radius: 0px;
      }
      .td__input-one {
        /deep/ .el-input__inner {
          background: #67c23a;
        }
      }
      .td__input-two {
        /deep/ .el-input__inner {
          background: gray;
        }
      }
      .td__input-three {
        /deep/ .el-input__inner {
          background: blue;
        }
      }
      .td__input-four {
        /deep/ .el-input__inner {
          background: green;
        }
      }
      .td__input-five {
        /deep/ .el-input__inner {
          background: gold;
        }
      }
    }
    .btn-container {
      display: flex;
      height: 40px;
      padding: 5px 0px;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

.form-two__add {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 20px;
}

.second-title {
  // position: relative;
  padding-bottom: 20px;
  // padding-top: 10px;
  // &:after {
  //   width: 100%;
  //   position: absolute;
  //   border-bottom: 1px solid #eee;
  //   content: "";
  //   bottom: 15px;
  //   left: 0px;
  // }
}

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
