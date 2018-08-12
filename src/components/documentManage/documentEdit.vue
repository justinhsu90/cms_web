<template>
<div id="edit">
    <div  style="padding:20px"> 
    <div class="heade">
      <i class="el-icon-arrow-left"></i>
      <a href="javascript:void(0)" @click="goBack">返回</a>
    </div>
    <br>
    <h2>{{!type?'增加':'編輯'}}文案</h2>
    <br> 
    <el-form ref="form" :model="data" label-position="top"   v-loading="!loading">
      <el-row :gutter="20"> 
        <el-col :span="12">
          <el-form-item label="Content ID" class="el-form-left" v-if="type"> 
            <el-input  disabled v-model="data.ContentId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="el-form-left" v-if="type">
          <el-form-item label="最後更新時間">
            <el-input disabled v-model="data.lastUpdatedTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="SKU" class="el-form-left">
            <el-input v-model="data.SKU"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="啟用" class="el-form-left">
            <el-switch style="margin-top:9px" v-model="data.Enable"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="帳號" class="el-form-left">
               <el-select  clearable  filterable allow-create v-model="data.Account" >
                <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v.account" :value="v.account"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="平台" class="el-form-left">
               <el-select clearable  filterable allow-create v-model="data.Platform">
                <el-option v-for="(v,i) in searchPlatformOption" :key="'plat'+i" :label="v.platform" :value="v.platform"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="替换字 1" class="el-form-left">
                <el-input v-model="data.ReplaceWordValue1"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="替換值 1" class="el-form-left">
               <el-input v-model="data.ReplaceWordKey1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="國家" class="el-form-left"> 
               <el-select clearable  filterable allow-create v-model="data.Country">
               <el-option v-for="(v,i) in searchCountryOption" :key="'country'+i" :label="v.countryCode" :value="v.countryNameChinese" >
                   <span style="float: left">{{ v.countryCode }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryNameChinese }}</span>
                </el-option>
            </el-select>
            </el-form-item>
          </el-col>
         <el-col :span="5">
            <el-form-item label="語言" class="el-form-left">
               <el-select clearable  filterable allow-create v-model="data.Language">
                <el-option v-for="(v,i) in searchLanguageOption" :key="'languate'+i" :value="v.languageName">
                  <span style="float: left">{{ v.languageCode }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ v.languageName }}</span>
                </el-option>
            </el-select>
            </el-form-item>
          </el-col>
           <el-col :span="5">
              <el-form-item label="替換字 2" class="el-form-left">
               <el-input v-model="data.ReplaceWordValue2"></el-input>
            </el-form-item>
          </el-col>
           
          <el-col :span="8">
              <el-form-item label="替換值 2" class="el-form-left">
               <el-input v-model="data.ReplaceWordKey2"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="5">
            <el-form-item label="品牌" class="el-form-left">
               <el-select  clearable  filterable allow-create v-model="data.Brand">
               <el-option v-for="(v,i) in searchBrandOption" :key="'brand'+i" :label="v.brand" :value="v.brand"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="製造商" class="el-form-left">
               <el-select clearable  filterable allow-create v-model="data.Manufacturer">
                <el-option v-for="(v,i) in searchManufacturerOption" :key="'mau'+i" :label="v.manufacturer" :value="v.manufacturer"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="替換字 3" class="el-form-left">
               <el-input v-model="data.ReplaceWordValue3"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="8">
          <el-form-item label="替換值 3" class="el-form-left">
               <el-input v-model="data.ReplaceWordKey3"></el-input>
            </el-form-item>
          </el-col>
       </el-row>
       <hr>
       <br>
       <h2>標題</h2>
       <br>
       <el-row :gutter="20">
         
          <el-col :span="24">
             <el-form-item class="label" label="產品標題">
              <template slot="label">
                  <span>產品標題</span>
                  <span style="float:right">{{data.Title.length}}字符</span>
              </template>
              <el-input v-model="data.Title"> </el-input>
              </el-form-item>
          </el-col>
           <el-col :span="12">
             <el-form-item class="label" label="購物車短標題">
              <template slot="label">
                  <span>購物車短標題</span>
                  <span style="float:right">{{data.cartShortTitle.length}}字符</span>
              </template>
              <el-input v-model="data.cartShortTitle"> </el-input>
              </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
             <el-form-item label="購物車長標題">
                  <el-input v-model="data.cartLongTitle"></el-input>
              </el-form-item>
          </el-col> -->
       </el-row>
       <el-row>
        <el-button size="small" type="success" @click="handleTitlePreview">點擊預覽</el-button>
       </el-row>
       <br> 
       <hr>
       <br>
       <h2>Bullet Point</h2>
       <br>
       <el-row :gutter="20">
          <el-col :span="24">
             <el-form-item class="label" label="Bullet Point 1">
              <template slot="label">
                  <span>Bullet Point 1</span>
                  <span style="float:right">{{data.BulletPoint1.length}}字符</span>
              </template>
              <el-input v-model="data.BulletPoint1"> </el-input>
              </el-form-item>
          </el-col>
           <el-col :span="24">
             <el-form-item class="label" label="Bullet Point 2">
              <template slot="label">
                  <span>Bullet Point 2</span>
                  <span style="float:right">{{data.BulletPoint2.length}}字符</span>
              </template>
              <el-input v-model="data.BulletPoint2"> </el-input>
              </el-form-item>
          </el-col>
           <el-col :span="24">
             <el-form-item class="label" label="Bullet Point 3">
              <template slot="label">
                  <span>Bullet Point 3</span>
                  <span style="float:right">{{data.BulletPoint3.length}}字符</span>
              </template>
              <el-input v-model="data.BulletPoint3"> </el-input>
              </el-form-item>
          </el-col>
           <el-col :span="24">
             <el-form-item class="label" label="Bullet Point 4">
              <template slot="label">
                  <span>Bullet Point 4</span>
                  <span style="float:right">{{data.BulletPoint4.length}}字符</span>
              </template>
              <el-input v-model="data.BulletPoint4"> </el-input>
              </el-form-item>
          </el-col>
          <el-col :span="24">
             <el-form-item class="label" label="Bullet Point 5">
              <template slot="label">
                  <span>Bullet Point 5</span>
                  <span style="float:right">{{data.BulletPoint5.length}}字符</span>
              </template>
              <el-input v-model="data.BulletPoint5"> </el-input>
              </el-form-item>
          </el-col>
       </el-row>
       <el-row>
       <el-button  style="margin-bottom:10px" size="small" type="success" @click="handleBulletPointPreview">點擊預覽</el-button>
       </el-row>
       <br> 
       <hr>
       <br> 
       <h2>Description <el-select  style="margin-left:16px" v-model="selectTinymce">
            <el-option v-for="(v,i) in selectTinymceOption" :key="i" :label="v.label" :value="v.value"></el-option>
        </el-select></h2>
       <br> 
        <el-row :gutter="20"> 
          <el-col :span="24">
            <el-form-item  class="label" label="Short Description">
              <template slot="label">
                  <span>Short Description</span>
                  <span style="float:right">{{data.shortDescription.length}}字符</span>
              </template>
                <tinymce v-if="loading&&selectTinymce==2" v-model="data.shortDescription"></tinymce>
                <minTinymce v-if="loading&&selectTinymce==1" v-model="data.shortDescription"></minTinymce>
                <smallTinymce v-if="loading&&selectTinymce==3" v-model="data.shortDescription"></smallTinymce>
              </el-form-item>   
          </el-col>
          <el-col :span="24" key="1">
            <el-form-item class="label" label="Description 1">
              <template slot="label">
                  <span>Description 1</span>
                  <span style="float:right">{{data.Description1.length}}字符</span>
              </template>
                <tinymce v-if="loading&&selectTinymce==2" v-model="data.Description1"></tinymce>
                <minTinymce v-if="loading&&selectTinymce==1" v-model="data.Description1"></minTinymce>
                <smallTinymce v-if="loading&&selectTinymce==3" v-model="data.Description1"></smallTinymce>
              </el-form-item>   
          </el-col>
          <el-col :span="24" key="2">
            <el-form-item class="label" label="Description 2">
              <template slot="label">
                  <span>Description 2</span>
                  <span style="float:right">{{data.Description2.length}}字符</span>
              </template>
                <tinymce v-if="loading&&selectTinymce==2" v-model="data.Description2"></tinymce>
                <minTinymce v-if="loading&&selectTinymce==1" v-model="data.Description2"></minTinymce>
                <smallTinymce v-if="loading&&selectTinymce==3" v-model="data.Description2"></smallTinymce>
              </el-form-item>   
          </el-col>
          <el-col :span="24" key="3">
            <el-form-item class="label" label="Description 3">
              <template slot="label">
                  <span>Description 3</span>
                  <span style="float:right">{{data.Description3.length}}字符</span>
              </template>
                <tinymce v-if="loading&&selectTinymce==2" v-model="data.Description3"></tinymce>
                <minTinymce v-if="loading&&selectTinymce==1" v-model="data.Description3"></minTinymce>
                <smallTinymce v-if="loading&&selectTinymce==3" v-model="data.Description3"></smallTinymce>
              </el-form-item>   
          </el-col>
          <el-col :span="24" key="4">
            <el-form-item class="label" label="Description 4">
              <template slot="label">
                  <span>Description 4</span>
                  <span style="float:right">{{data.Description4.length}}字符</span>
              </template>
                <tinymce v-if="loading&&selectTinymce==2" v-model="data.Description4"></tinymce>
                <minTinymce v-if="loading&&selectTinymce==1" v-model="data.Description4"></minTinymce>
                <smallTinymce v-if="loading&&selectTinymce==3" v-model="data.Description4"></smallTinymce>
              </el-form-item>   
          </el-col>
          <el-col :span="24" key="5">
            <el-form-item class="label" label="Description 5">
              <template slot="label">
                  <span>Description 5</span>
                  <span style="float:right">{{data.Description5.length}}字符</span>
              </template>
                <tinymce v-if="loading&&selectTinymce==2" v-model="data.Description5"></tinymce>
                <minTinymce v-if="loading&&selectTinymce==1" v-model="data.Description5"></minTinymce>
                <smallTinymce v-if="loading&&selectTinymce==3" v-model="data.Description5"></smallTinymce>
              </el-form-item>   
          </el-col>
          <el-col :span="24" key="6">
            <el-form-item class="label" label="Description 6">
              <template slot="label">
                  <span>Description 6</span>
                  <span style="float:right">{{data.Description6.length}}字符</span>
              </template>
               <tinymce v-if="loading&&selectTinymce==2" v-model="data.Description6"></tinymce>
                <minTinymce v-if="loading&&selectTinymce==1" v-model="data.Description6"></minTinymce>
                <smallTinymce v-if="loading&&selectTinymce==3" v-model="data.Description6"></smallTinymce>
              </el-form-item>   
          </el-col>
          <el-col :span="24" key="7">
            <el-form-item class="label" label="Description 7">
              <template slot="label">
                  <span>Description 7</span>
                  <span style="float:right">{{data.Description7.length}}字符</span>
              </template>
               <tinymce v-if="loading&&selectTinymce==2" v-model="data.Description7"></tinymce>
                <minTinymce v-if="loading&&selectTinymce==1" v-model="data.Description7"></minTinymce>
                <smallTinymce v-if="loading&&selectTinymce==3" v-model="data.Description7"></smallTinymce>
              </el-form-item>   
          </el-col>
       </el-row>
       <el-row>
        <el-button  size="small" type="success" @click="handlePreview">點擊預覽</el-button>
        <el-button style="margin-left:20px" size="small" type="success" @click="handleCheck">查看源码</el-button>
       
        </el-row>
       <br>
       <hr>
       <br>
       <h2>關鍵字</h2>
       <br>
     <el-row :gutter="24">
          <el-col :span="24" >
            <el-form-item class="label" label="關鍵字 1 (Search Term)">
              <template slot="label">
                  <span>關鍵字 1 (Search Term)</span>
                  <span style="float:right">{{data.Keyword1.length}}字符</span>
              </template>
              <el-input v-model="data.Keyword1"> </el-input>
              </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="label" label="關鍵字 2 (Search Term)">
              <template slot="label">
                  <span>關鍵字 2 (Search Term)</span>
                  <span style="float:right">{{data.Keyword2.length}}字符</span>
              </template>
              <el-input v-model="data.Keyword2"> </el-input>
              </el-form-item>
          </el-col>
          <el-col :span="24" >
            <el-form-item  class="label" label="關鍵字 3 (Search Term)">
              <template slot="label">
                  <span>關鍵字 3 (Search Term)</span>
                  <span style="float:right">{{data.Keyword3.length}}字符</span>
              </template>
              <el-input v-model="data.Keyword3"> </el-input>
              </el-form-item>
          </el-col>
          <el-col :span="24" >
            <el-form-item class="label" label="關鍵字 4 (Search Term)">
              <template slot="label">
                  <span>關鍵字 4 (Search Term)</span>
                  <span style="float:right">{{data.Keyword4.length}}字符</span>
              </template>
              <el-input v-model="data.Keyword4"> </el-input>
              </el-form-item>
          </el-col>
          <el-col :span="24" >
            <el-form-item class="label" label="關鍵字 5 (Search Term)">
              <template slot="label">
                  <span>關鍵字 5 (Search Term)</span>
                  <span style="float:right">{{data.Keyword5.length}}字符</span>
              </template>
              <el-input v-model="data.Keyword5"> </el-input>
              </el-form-item>
          </el-col>
       </el-row>
       <hr>
       <br>
       <h2>圖片</h2>
       <br>
       <el-row>
        <el-button size="small" type="success" @click="handleUpload">點擊上傳</el-button>
       </el-row>
       <br>
       <el-row :gutter="20">
          <el-col :span="8" v-for="(item,i) in fileList" :key="'img'+i">
            <div class="imgcontainer"> 
              <div style="height:190px">
              <img  style="max-height:190px;" width="60%" :src="item.base64" alt="">
              </div>
              <div>
              <i class="icon el-icon-close" @click="handleClose(i)"></i>
              <span class="name">&nbsp;{{item.name}}</span>
              </div>
            </div>
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
       <el-button @click="submit"  :loading="submitLoading" type="primary" style="width:150px;height:60px;font-size:18px;display:inline-block">新增</el-button> 
    </el-form> 
    </div>
    <wonDialog ref="title" title="标题" :showConfirm="false">
      <div v-html="titleHtml" slot="content"></div>
    </wonDialog>    
    <wonDialog ref="bulletPoint" title="Bullet Point" :showConfirm="false">
      <div v-html="bulletPointHtml" slot="content"></div>    
    </wonDialog>         
 </div>  
</template>
<script>
import tinymce from '@/common/tinymce'
import minTinymce from "@/common/minTinymce";
import smallTinymce from "@/common/smallTinymce";
import wonDialog from "@/common/wonDialog";
export default {
  components: {
    tinymce,
    minTinymce,
    smallTinymce,
    wonDialog
  },
  data() {
    return {
      selectTinymce:1,
      selectTinymceOption:[{
        label:'Amazon',
        value:1
      },
      {
        label:'Cdiscount',
        value:3
      },
      {
        label:'完整版',
        value:2
      }],
      titleHtml:'',
      bulletPointHtml:'',
      submitLoading: false,
      searchAccountOption: [],
      searchPlatformOption: [],
      searchCountryOption: [],
      searchLanguageOption: [],
      searchBrandOption: [],
      searchManufacturerOption: [],
      fileList: [],
      loading:false,
      type:true,
      data: {
        ContentId: "",
        SKU: "",
        Enable: true,
        Language: "",
        Country: "",
        Title: "",
        Platform: "",
        Account: "",
        cartLongTitle: "",
        cartShortTitle: "",
        imageName1: "",
        imageName2: "",
        imageName3: "",
        imageName4: "",
        imageName5: "",
        imageName6: "",
        imageName7: "",
        imageName8: "",
        imageName9: "",
        imageName10: "",
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
        Keyword4: "",
        Keyword5: "",
        Manufacturer: "",
        Brand: "",
        ReplaceWordKey1: "",
        ReplaceWordKey2: "",
        ReplaceWordKey3: "",
        ReplaceWordValue1: "",
        ReplaceWordValue2: "",
        ReplaceWordValue3: "",
        version: "",
        note:""
      }
    };
  },
  created() {
    if(this.$route.query.type == "copy"){
      this.type = false;
    }
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
      this.data.Country = oldData.country; 
      this.data.Description1 = oldData.description1 || ""; 
      this.data.Description2 = oldData.description2 || ""; 
      this.data.Description3 = oldData.description3 || ""; 
      this.data.Description4 = oldData.description4 || ""; 
      this.data.Description5 = oldData.description5 || ""; 
      this.data.Description6 = oldData.description6 || ""; 
      this.data.Description7 = oldData.description7 || "";  
      this.data.Keyword1 = oldData.keyword1 || "";  
      this.data.Keyword2 = oldData.keyword2 || ""; 
      this.data.Keyword3 = oldData.keyword3 || ""; 
      this.data.Keyword4 = oldData.keyword4 || ""; 
      this.data.Keyword5 = oldData.keyword5 || ""; 
      this.data.ContentId = oldData.contentId; 
      this.data.Enable = oldData.enable; 
      this.data.lastUpdatedTime = oldData.lastUpdatedTime;
      this.data.note = oldData.note;
      setTimeout(()=>{
        this.loading = true;
      },2000)
    });
  },
  methods: {
     goBack() {
      this.$router.push("/documentManage");
    },
    handleTitlePreview(){
      let title1 = this.data.Title;
      let title2 = this.data.cartLongTitle;
      let title3 = this.data.cartShortTitle;
      let totalTitle = title1 + title2 + title3;
      let ReplaceWordValue1 = this.data.ReplaceWordValue1;
      let ReplaceWordValue2 = this.data.ReplaceWordValue2;
      let ReplaceWordValue3 = this.data.ReplaceWordValue3;
      let ReplaceWordKey1 = this.data.ReplaceWordKey1;
      let ReplaceWordKey2 = this.data.ReplaceWordKey2;
      let ReplaceWordKey3 = this.data.ReplaceWordKey3;

      ReplaceWordValue1 = ReplaceWordValue1.replace(/\[/g,'\\[');
      ReplaceWordValue1 = ReplaceWordValue1.replace(/\]/g,'\\]');
      ReplaceWordValue2 = ReplaceWordValue2.replace(/\[/g,'\\[');
      ReplaceWordValue2 = ReplaceWordValue2.replace(/\]/g,'\\]');
      ReplaceWordValue3 = ReplaceWordValue3.replace(/\[/g,'\\[');
      ReplaceWordValue3 = ReplaceWordValue3.replace(/\]/g,'\\]');

      if(!!ReplaceWordValue1){
        let reg = new RegExp(`${ReplaceWordValue1}`,'g');
        totalTitle = totalTitle.replace(reg,ReplaceWordKey1);
      }else if(!!ReplaceWordValue2){
        let reg = new RegExp(`${ReplaceWordValue2}`,'g');
        totalTitle = totalTitle.replace(reg,ReplaceWordKey1);
      }else if(!!ReplaceWordValue3){
        let reg = new RegExp(`${ReplaceWordValue3}`,'g');
        totalTitle = totalTitle.replace(reg,ReplaceWordKey1);
      }
      this.titleHtml = totalTitle;
      this.$refs['title'].$emit('visible',true);
    },
    handleBulletPointPreview(){
      let title1 = this.data.BulletPoint1;
      let title2 = this.data.BulletPoint2;
      let title3 = this.data.BulletPoint3;
      let title4 = this.data.BulletPoint4;
      let title5 = this.data.BulletPoint5;
      let totalBullet = title1 + title2 + title3 + title4 + title5;
      let ReplaceWordValue1 = this.data.ReplaceWordValue1;
      let ReplaceWordValue2 = this.data.ReplaceWordValue2;
      let ReplaceWordValue3 = this.data.ReplaceWordValue3;
      let ReplaceWordKey1 = this.data.ReplaceWordKey1;
      let ReplaceWordKey2 = this.data.ReplaceWordKey2;
      let ReplaceWordKey3 = this.data.ReplaceWordKey3;
      
      ReplaceWordValue1 = ReplaceWordValue1.replace(/\[/g,'\\[');
      ReplaceWordValue1 = ReplaceWordValue1.replace(/\]/g,'\\]');
      ReplaceWordValue2 = ReplaceWordValue2.replace(/\[/g,'\\[');
      ReplaceWordValue2 = ReplaceWordValue2.replace(/\]/g,'\\]');
      ReplaceWordValue3 = ReplaceWordValue3.replace(/\[/g,'\\[');
      ReplaceWordValue3 = ReplaceWordValue3.replace(/\]/g,'\\]');

      if(!!ReplaceWordValue1){
        let reg = new RegExp(`${ReplaceWordValue1}`,'g');
        totalBullet = totalBullet.replace(reg,ReplaceWordKey1);
      }else if(!!ReplaceWordValue2){
        let reg = new RegExp(`${ReplaceWordValue2}`,'g');
        totalBullet = totalBullet.replace(reg,ReplaceWordKey1);
      }else if(!!ReplaceWordValue3){
        let reg = new RegExp(`${ReplaceWordValue3}`,'g');
        totalBullet = totalBullet.replace(reg,ReplaceWordKey1);
      }
      this.bulletPointHtml = totalBullet;
      this.$refs['bulletPoint'].$emit('visible',true);
    },
    handlePreview(){
      let Description = this.data.shortDescription;
      let Description1 = this.data.Description1;
      let Description2 = this.data.Description2;
      let Description3 = this.data.Description3;
      let Description4 = this.data.Description4;
      let Description5 = this.data.Description5;
      let totalDescription = Description + Description1 + Description2 + Description3 + Description4 + Description5;
      let ReplaceWordValue1 = this.data.ReplaceWordValue1;
      let ReplaceWordValue2 = this.data.ReplaceWordValue2;
      let ReplaceWordValue3 = this.data.ReplaceWordValue3;
      let ReplaceWordKey1 = this.data.ReplaceWordKey1;
      let ReplaceWordKey2 = this.data.ReplaceWordKey2;
      let ReplaceWordKey3 = this.data.ReplaceWordKey3;

      ReplaceWordValue1 = ReplaceWordValue1.replace(/\[/g,'\\[');
      ReplaceWordValue1 = ReplaceWordValue1.replace(/\]/g,'\\]');
      ReplaceWordValue2 = ReplaceWordValue2.replace(/\[/g,'\\[');
      ReplaceWordValue2 = ReplaceWordValue2.replace(/\]/g,'\\]');
      ReplaceWordValue3 = ReplaceWordValue3.replace(/\[/g,'\\[');
      ReplaceWordValue3 = ReplaceWordValue3.replace(/\]/g,'\\]'); 

       if(!!ReplaceWordValue1){
        let reg = new RegExp(`${ReplaceWordValue1}`,'g');
        totalDescription = totalDescription.replace(reg,ReplaceWordKey1);
      }else if(!!ReplaceWordValue2){
        let reg = new RegExp(`${ReplaceWordValue2}`,'g');
        totalDescription = totalDescription.replace(reg,ReplaceWordKey1);
      }else if(!!ReplaceWordValue3){
        let reg = new RegExp(`${ReplaceWordValue3}`,'g');
        totalDescription = totalDescription.replace(reg,ReplaceWordKey1);
      }
      let previewWindow = window.open('', '_blank');
      previewWindow.document.write(totalDescription);
    },
    handleCheck(){
      let Description = this.data.shortDescription;
      let Description1 = this.data.Description1;
      let Description2 = this.data.Description2;
      let Description3 = this.data.Description3;
      let Description4 = this.data.Description4;
      let Description5 = this.data.Description5;
      let totalDescription = Description + Description1 + Description2 + Description3 + Description4 + Description5;
      let ReplaceWordValue1 = this.data.ReplaceWordValue1;
      let ReplaceWordValue2 = this.data.ReplaceWordValue2;
      let ReplaceWordValue3 = this.data.ReplaceWordValue3;
      let ReplaceWordKey1 = this.data.ReplaceWordKey1;
      let ReplaceWordKey2 = this.data.ReplaceWordKey2;
      let ReplaceWordKey3 = this.data.ReplaceWordKey3;
       if(!!ReplaceWordValue1){
        let reg = new RegExp(`${ReplaceWordValue1}`,'g');
        totalDescription = totalDescription.replace(reg,ReplaceWordKey1);
      }else if(!!ReplaceWordValue2){
        let reg = new RegExp(`${ReplaceWordValue2}`,'g');
        totalDescription = totalDescription.replace(reg,ReplaceWordKey1);
      }else if(!!ReplaceWordValue3){
        let reg = new RegExp(`${ReplaceWordValue3}`,'g');
        totalDescription = totalDescription.replace(reg,ReplaceWordKey1);
      }
      let previewWindow = window.open('', '_blank');
      previewWindow.document.body.innerText = totalDescription;
    },
    handleClose(index){
      this.fileList.splice(index,1);
    },
    handleUpload(){
      if(this.fileList.length>=10){
        this.$message.warning('最多上传10张')
        return
      }
      let input = document.createElement('input');
      input.type = "file";
      input.click()
      input.addEventListener('change',()=>{
        let URL = window.URL || window.webkitURL;
        var base64 = URL.createObjectURL(input.files[0]);
        let obj = {
          name:input.files[0].name+'',
          base64
        }
        this.fileList.push(obj);
      })
    },
    submit() {
      this.$refs["form"].validate(action => {
        if (action) {
          this.submitLoading = true;
          let info = [];
          _.each(this.fileList,(v,i)=>{
            this.data['imageName'+(i+1)] = v.name;
          })
          info.push(_.cloneDeep(this.data));
          let obj = {
            data: info
          };
          axios({
            url: "/content/update",
            method: "post",
            data: {
              value: JSON.stringify(obj),
              token: this.token
            }
          }).then(res => {
            this.submitLoading = true;
            this.Bus.$emit('refresh');
            this.$router.push('/documentManage');
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
#edit .heade {
  font-size: 16px;
  color: #45a2ff;
}
#edit .heade a {
  color: #45a2ff;
}
#edit{
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
  .imgcontainer {
    padding: 5px 5px 5px 5px;
    border: 1px dashed #dfe4ec;
    position: relative;
    text-align: center;
    height: 240px;
    & div{
      margin-top: 15px; 
    }
    & div:after{
      content: '';
      display: block;
      clear: both;
    }
  }
  .icon {
    float: right;;
    cursor: pointer;
  }
  .name {
    float: left;
    font-size: 14px;
  }
  .label{
    .el-form-item__label{
      width: 100%;
    }
  }
  .el-form-left {
    & div:nth-child(1) {
      float: left;
      margin-right: 10px;
    }
    .el-form-item__content {
      overflow: hidden;
    }
  }
 }
</style>


