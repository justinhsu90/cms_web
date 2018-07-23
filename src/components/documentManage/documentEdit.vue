<template>
<div>
    <div id="edit" style="padding:20px"> 
    <div class="heade">
      <i class="el-icon-arrow-left"></i>
      <a href="javascript:void(0)" @click="goBack">返回</a>
    </div>
    <br>
    <h1>編輯文案</h1>
    <br>
    <el-form ref="form" :model="data" label-position="top" v-loading="loading">
      <el-row :gutter="10">
        <el-col :span="4">
       <el-form-item label="Content ID">
          <el-input  v-model="data.contentId"></el-input>
       </el-form-item>
       </el-col>
        <el-col :span="6">
       <el-form-item label="SKU">
          <el-input  v-model="data.SKU"></el-input>
       </el-form-item>
       </el-col>
        <el-col :span="6">
       <el-form-item label="最後更新時間">
          <el-input  v-model="data.lastUpdatedTime"></el-input>
       </el-form-item>
       </el-col>
       </el-row>
       <el-row :gutter="4">
          <el-col :span="4">
            <el-form-item label="帳號">
               <el-select  clearable  filterable allow-create v-model="data.Account">
                <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v.account" :value="v.account"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="平台">
               <el-select clearable  filterable allow-create v-model="data.Platform">
                <el-option v-for="(v,i) in searchPlatformOption" :key="'plat'+i" :label="v.platform" :value="v.platform"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="國家">
               <el-select clearable  filterable allow-create v-model="data.Country">
               <el-option v-for="(v,i) in searchCountryOption" :key="'country'+i" :label="v.countryCode" :value="v.countryNameChinese" >
                   <span style="float: left">{{ v.countryCode }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryNameChinese }}</span>
                </el-option>
            </el-select>
            </el-form-item>
          </el-col>
           <el-col :span="4">
            <el-form-item label="語言">
               <el-select clearable  filterable allow-create v-model="data.Language">
                <el-option v-for="(v,i) in searchLanguageOption" :key="'languate'+i" :value="v.languageName">
                  <span style="float: left">{{ v.languageCode }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ v.languageName }}</span>
                </el-option>
            </el-select>
            </el-form-item>
          </el-col>
           <el-col :span="4">
            <el-form-item label="品牌">
               <el-select  clearable  filterable allow-create v-model="data.Brand">
               <el-option v-for="(v,i) in searchBrandOption" :key="'brand'+i" :label="v.brand" :value="v.brand"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="製造商">
               <el-select clearable  filterable allow-create v-model="data.Manufacturer">
                <el-option v-for="(v,i) in searchManufacturerOption" :key="'mau'+i" :label="v.manufacturer" :value="v.manufacturer"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
       </el-row>
       <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="替換字1">
               <el-input v-model="data.ReplaceWordValue1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="替換字2">
               <el-input v-model="data.ReplaceWordValue2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="替換字3">
               <el-input v-model="data.ReplaceWordValue3"></el-input>
            </el-form-item>
          </el-col>
       </el-row>
       <hr>
       <br>
       <h2>產品標題</h2>
       <br>
       <el-row :gutter="24">
          <el-col :span="24">
              <el-form-item label="產品標題">
                  <el-input v-model="data.Title"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="10">
              <el-form-item label="購物車短標題">
                  <el-input v-model="data.cartShortTitle"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="購物車長標題">
                  <el-input v-model="data.cartLongTitle"></el-input>
              </el-form-item>
          </el-col>
       </el-row>
       <hr>
       <br>
       <h2>Bullet Point</h2>
       <br>
       <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="Bullet Point 1">
                  <el-input v-model="data.BulletPoint1"></el-input>
              </el-form-item>   
            <el-form-item label="Bullet Point 2">
                  <el-input v-model="data.BulletPoint2"></el-input>
              </el-form-item>   
            <el-form-item label="Bullet Point 3">
                  <el-input v-model="data.BulletPoint3"></el-input>
              </el-form-item>   
            <el-form-item label="Bullet Point 4">
                  <el-input v-model="data.BulletPoint4"></el-input>
              </el-form-item>   
            <el-form-item label="Bullet Point 5">
                  <el-input v-model="data.BulletPoint5"></el-input>
              </el-form-item>   
          </el-col>
       </el-row>
       <hr>
       <br>
       <h2>Description</h2>
       <br>
         <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="Short Description">
                  <el-input  rows="4" type="textarea" v-model="data.shortDescription"></el-input>
              </el-form-item>   
          </el-col>
          <el-col :span="24">
            <el-form-item label="Description 1">
                  <el-input  rows="4" type="textarea" v-model="data.Description1"></el-input>
              </el-form-item>   
          </el-col>
          <el-col :span="24">
            <el-form-item label="Description 2">
                  <el-input  rows="4" type="textarea" v-model="data.Description2"></el-input>
              </el-form-item>   
          </el-col>
          <el-col :span="24">
            <el-form-item label="Description 3">
                  <el-input  rows="4" type="textarea" v-model="data.Description3"></el-input>
              </el-form-item>   
          </el-col>
          <el-col :span="24">
            <el-form-item label="Description 4">
                  <el-input  rows="4" type="textarea" v-model="data.Description4"></el-input>
              </el-form-item>   
          </el-col>
          <el-col :span="24">
            <el-form-item label="Description 5">
                  <el-input  rows="4" type="textarea" v-model="data.Description5"></el-input>
              </el-form-item>   
          </el-col>
       </el-row>
       <hr>
       <br>
       <h2>關鍵字</h2>
       <br>
       <el-row :gutter="20">
          <el-col :span="20" >
            <el-form-item label="關鍵詞 1 (Search Term)">
              <el-input v-model="data.Keyword1"> </el-input>
              </el-form-item>
            <el-form-item label="關鍵詞 2 (Search Term)">
              <el-input v-model="data.Keyword2"> </el-input>
              </el-form-item>
            <el-form-item label="關鍵詞 3 (Search Term)">
              <el-input v-model="data.Keyword3"> </el-input>
              </el-form-item>
          </el-col>
       </el-row>
       <hr>
       <br>
       <h2>圖片</h2>
       <br>
       <el-row>
          <el-col class="w20 p10">
              <wonImage name="image1" :value="data.image1" @select="data.image1 = arguments[0]"></wonImage>
          </el-col>
          <el-col class="w20 p10">
              <wonImage name="image2" :value="data.image2" @select="data.image2 = arguments[0]"></wonImage>
          </el-col>
          <el-col class="w20 p10">
              <wonImage name="image3" :value="data.image3" @select="data.image3 = arguments[0]"></wonImage>
          </el-col>
          <el-col class="w20 p10">
              <wonImage name="image4" :value="data.image4" @select="data.image4 = arguments[0]"></wonImage>
          </el-col>
          <el-col class="w20 p10">
              <wonImage name="image5" :value="data.image5" @select="data.image5 = arguments[0]"></wonImage>
          </el-col>
          <el-col class="w20 p10">
              <wonImage name="image6" :value="data.image6" @select="data.image6 = arguments[0]"></wonImage>
          </el-col>
          <el-col class="w20 p10">
              <wonImage name="image7" :value="data.image7" @select="data.image7 = arguments[0]"></wonImage>
          </el-col>
          <el-col class="w20 p10">
              <wonImage name="image8" :value="data.image8" @select="data.image8 = arguments[0]"></wonImage>
          </el-col>
          <el-col class="w20 p10">
              <wonImage name="image9" :value="data.image9" @select="data.image9 = arguments[0]"></wonImage> 
          </el-col>
          <el-col class="w20 p10">
              <wonImage name="image10" :value="data.image10" @select="data.image10 = arguments[0]"></wonImage>
          </el-col>
       </el-row>
       <br>
       <hr>
       <br>
       <el-row :gutter="20">
         <el-col>
          <el-form-item label="備註">
            <el-input type="textarea" :rows="4" v-model="data.note"></el-input>
        </el-form-item>
        </el-col>
       </el-row>
    </el-form> 
    <el-button @click="submit"  :loading="submitLoading" type="primary" style="width:150px;height:60px;font-size:18px;display:inline-block">新增</el-button> 
    </div>         
 </div>     
</template>
<script>
import wonImage from "./wonImage/wonImage";
export default {
  components: {
    wonImage
  },
  data() {
    return {
      submitLoading: false,
      searchAccountOption: [],
      searchPlatformOption: [],
      searchCountryOption: [],
      searchLanguageOption: [],
      searchBrandOption: [],
      searchManufacturerOption: [],
      loading:false,
      data: {
        contentId:'',
        SKU: "",
        Enable: true,
        Language: "",
        Country: "",
        Title: "",
        Platform: "",
        Account: "",
        cartLongTitle: "",
        cartShortTitle: "",
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        image5: "",
        image6: "",
        image7: "",
        image8: "",
        image9: "",
        image10: "",
        BulletPoint1: "",
        BulletPoint2: "",
        BulletPoint3: "",
        BulletPoint4: "",
        BulletPoint5: "",
        shortDescription: "",
        Description1: "",
        Description2: "",
        Description3: "",
        Description4: "",
        Description5: "",
        Description6: "",
        Description7: "",
        Keyword1: "",
        Keyword2: "",
        Keyword3: "",
        Manufacturer: "",
        Brand: "",
        ReplaceWordKey1: "",
        ReplaceWordKey2: "",
        ReplaceWordKey3: "",
        ReplaceWordValue1: "",
        ReplaceWordValue2: "",
        ReplaceWordValue3: "",
        version: ""
      }
    };
  },
  created() {
    let account = axios({
      url: "/content/value/account",
      method: "post",
      data: {
        token: this.token
      }
    });
    let platform = axios({
      url: "/content/value/platform",
      method: "post",
      data: {
        token: this.token
      }
    });
    let country = axios({
      url: "/content/value/country",
      method: "post",
      data: {
        token: this.token
      }
    });
    let language = axios({
      url: "/content/value/language",
      method: "post",
      data: {
        token: this.token
      }
    });
    let brand = axios({
      url: "/content/value/brand",
      method: "post",
      data: {
        token: this.token
      }
    });
    let manufacturer = axios({
      url: "/content/value/manufacturer",
      method: "post",
      data: {
        token: this.token
      }
    });
    this.loading = true;
    Promise.all([
      account,
      platform,
      country,
      language,
      brand,
      manufacturer
    ]).then(([account, platform, country, language, brand, manufacturer]) => {
      this.searchAccountOption = _.cloneDeep(account.data);
      this.searchPlatformOption = _.cloneDeep(platform.data);
      this.searchCountryOption = _.cloneDeep(country.data);
      this.searchLanguageOption = _.cloneDeep(language.data);
      this.searchBrandOption = _.cloneDeep(brand.data);
      this.searchManufacturerOption = _.cloneDeep(manufacturer.data);
      let oldData = JSON.parse(this.$route.query.data);
      this.loading = false;
      this.data.Account = oldData.account;
      this.data.Brand = oldData.brand;
      this.data.Language = oldData.language;
      this.data.Manufacturer = oldData.manufacturer;
      this.data.Platform = oldData.platform;
      this.data.ReplaceWordKey1 = oldData.replaceWordKey1;
      this.data.ReplaceWordKey2 = oldData.replaceWordKey2;
      this.data.ReplaceWordKey3 = oldData.replaceWordKey3;
      this.data.ReplaceWordValue1 = oldData.replaceWordValue1;
      this.data.ReplaceWordValue2 = oldData.replaceWordValue2;
      this.data.ReplaceWordValue3 = oldData.replaceWordValue3;
      this.data.shortDescription = oldData.shortDescription;
      this.data.SKU = oldData.sku;
      this.data.Title = oldData.title;
      this.data.version = oldData.version;
      this.data.BulletPoint1 = oldData.bulletPoint1;
      this.data.BulletPoint2 = oldData.bulletPoint2;
      this.data.BulletPoint3 = oldData.bulletPoint3;
      this.data.BulletPoint4 = oldData.bulletPoint4;
      this.data.BulletPoint5 = oldData.bulletPoint5;
      this.data.cartLongTitle = oldData.cartLongTitle;
      this.data.cartShortTitle = oldData.cartShortTitle;
      this.data.contentId = oldData.contentId; 
      this.data.Country = oldData.country; 
      this.data.Description1 = oldData.description1;
      this.data.Description2 = oldData.description2; 
      this.data.Description3 = oldData.description3;
      this.data.Description4 = oldData.description4;
      this.data.Description5 = oldData.description5; 
      this.data.Keyword1 = oldData.keyword1; 
      this.data.Keyword2 = oldData.keyword2; 
      this.data.Keyword3 = oldData.keyword3; 
    });
  },
  methods: {
    goBack() {
      this.$router.push("/documentManage");
    },
    submit() {
      this.$refs["form"].validate(action => {
        if (action) {
          let data = [];
          data.push(_.cloneDeep(this.data));

          axios({
            url: "/content/add",
            method: "post",
            data: {
              data: JSON.stringify(data),
              token: this.token
            }
          }).then(res => {});
        }
      });
    }
  }
};
</script>
<style scoped>
#edit .heade {
  font-size: 16px;
  color: #45a2ff;
}
#edit .heade a {
  color: #45a2ff;
}
.w50 {
  width: 50%;
}
.w20 {
  width: 20%;
}
.p10 {
  padding: 10px !important;
}
hr {
  border: none;
  border-top: 1px solid #dfe4ec;
}
</style>


