<template>
<div id="edit">
    <div style="padding:20px"> 
    <div class="heade">
      <i class="el-icon-arrow-left"></i>
      <a href="javascript:void(0)" @click="goBack">返回</a>
    </div>
    <br>
    <h2>新增文案</h2>
    <br> 
    <el-form ref="form" :model="data" label-position="top"   v-loading="!loading">
      <el-row :gutter="20"> 
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
          <el-col :span="12">
            <el-form-item label="帳號" class="el-form-left">
               <el-select  clearable  filterable allow-create v-model="data.Account" >
                <el-option v-for="(v,i) in searchAccountOption" :key="'acc'+i" :label="v.account" :value="v.account"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="替换字1" class="el-form-left">
                <el-input v-model="data.ReplaceWordValue1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="平台" class="el-form-left">
               <el-select clearable  filterable allow-create v-model="data.Platform">
                <el-option v-for="(v,i) in searchPlatformOption" :key="'plat'+i" :label="v.platform" :value="v.platform"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="替換值 1" class="el-form-left">
               <el-input v-model="data.ReplaceWordKey1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="國家" class="el-form-left"> 
               <el-select clearable  filterable allow-create v-model="data.Country">
               <el-option v-for="(v,i) in searchCountryOption" :key="'country'+i" :label="v.countryCode" :value="v.countryNameChinese" >
                   <span style="float: left">{{ v.countryCode }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryNameChinese }}</span>
                </el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="替換字 2" class="el-form-left">
               <el-input v-model="data.ReplaceWordValue2"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="語言" class="el-form-left">
               <el-select clearable  filterable allow-create v-model="data.Language">
                <el-option v-for="(v,i) in searchLanguageOption" :key="'languate'+i" :value="v.languageName">
                  <span style="float: left">{{ v.languageCode }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ v.languageName }}</span>
                </el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="替換值 2" class="el-form-left">
               <el-input v-model="data.ReplaceWordKey2"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="品牌" class="el-form-left">
               <el-select  clearable  filterable allow-create v-model="data.Brand">
               <el-option v-for="(v,i) in searchBrandOption" :key="'brand'+i" :label="v.brand" :value="v.brand"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="替換字 3" class="el-form-left">
               <el-input v-model="data.ReplaceWordValue3"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="製造商" class="el-form-left">
               <el-select clearable  filterable allow-create v-model="data.Manufacturer">
                <el-option v-for="(v,i) in searchManufacturerOption" :key="'mau'+i" :label="v.manufacturer" :value="v.manufacturer"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
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
          <el-col :span="20">
              <el-form-item label="產品標題">
                  <el-input v-model="data.Title"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="8">
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
       <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="Bullet Point 1">
                  <el-input v-model="data.BulletPoint1"></el-input>
              </el-form-item>   
          </el-col>
          <el-col :span="20">
            <el-form-item label="Bullet Point 2">
                  <el-input v-model="data.BulletPoint2"></el-input>
              </el-form-item>   
          </el-col>
          <el-col :span="20">
            <el-form-item label="Bullet Point 3">
                  <el-input v-model="data.BulletPoint3"></el-input>
              </el-form-item>   
          </el-col>
          <el-col :span="20">
            <el-form-item label="Bullet Point 4">
                  <el-input v-model="data.BulletPoint4"></el-input>
              </el-form-item>   
          </el-col>
          <el-col :span="20">
            <el-form-item label="Bullet Point 5">
                  <el-input v-model="data.BulletPoint5"></el-input>
              </el-form-item>   
          </el-col>
       </el-row>
       <hr>
       <br> 
       <h2>Description</h2>
       <br> 
         <el-row :gutter="20"> 
          <el-col :span="24">
            <el-form-item  class="label" label="short Description">
              <template slot="label">
                  <span>short Description</span>
                  <span style="float:right">{{data.shortDescription.length}}字符</span>
              </template>
                <tinymce v-if="loading" v-model="data.shortDescription"></tinymce>
              </el-form-item>   
          </el-col>
          <el-col :span="24" key="1">
            <el-form-item class="label" label="Description 1">
              <template slot="label">
                  <span>Description 1</span>
                  <span style="float:right">{{data.Description1.length}}字符</span>
              </template>
                <tinymce v-if="loading" v-model="data.Description1"></tinymce>
              </el-form-item>   
          </el-col>
          <el-col :span="24" key="2">
            <el-form-item class="label" label="Description 2">
              <template slot="label">
                  <span>Description 2</span>
                  <span style="float:right">{{data.Description2.length}}字符</span>
              </template>
                <tinymce v-if="loading" v-model="data.Description2"></tinymce>
              </el-form-item>   
          </el-col>
          <el-col :span="24" key="3">
            <el-form-item class="label" label="Description 3">
              <template slot="label">
                  <span>Description 3</span>
                  <span style="float:right">{{data.Description3.length}}字符</span>
              </template>
                <tinymce v-if="loading" v-model="data.Description3"></tinymce>
              </el-form-item>   
          </el-col>
          <el-col :span="24" key="4">
            <el-form-item class="label" label="Description 4">
              <template slot="label">
                  <span>Description 4</span>
                  <span style="float:right">{{data.Description4.length}}字符</span>
              </template>
                <tinymce v-if="loading" v-model="data.Description4"></tinymce>
              </el-form-item>   
          </el-col>
          <el-col :span="24" key="5">
            <el-form-item class="label" label="Description 5">
              <template slot="label">
                  <span>Description 5</span>
                  <span style="float:right">{{data.Description5.length}}字符</span>
              </template>
                <tinymce v-if="loading" v-model="data.Description5"></tinymce>
              </el-form-item>   
          </el-col>
       </el-row>
       <el-row>
        <el-button size="small" type="success" @click="handlePreview">点击预览</el-button>
       </el-row>
       <br>
       <hr>
       <br>
       <h2>關鍵字</h2>
       <br>
       <el-row :gutter="20">
          <el-col :span="8" >
            <el-form-item label="關鍵字 1 (Search Term)">
              <el-input v-model="data.Keyword1"> </el-input>
              </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="關鍵字 2 (Search Term)">
              <el-input v-model="data.Keyword2"> </el-input>
              </el-form-item>
          </el-col>
          <el-col :span="8" >
            <el-form-item label="關鍵字 3 (Search Term)">
              <el-input v-model="data.Keyword3"> </el-input>
              </el-form-item>
          </el-col>
       </el-row>
       <hr>
       <br>
       <h2>圖片</h2>
       <br>
       <el-row>
        <el-button size="small" type="success" @click="handleUpload">点击上传</el-button>
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
            <el-input type="textarea" :rows="4" v-model="data.version"></el-input>
        </el-form-item>
        </el-col>
       </el-row>
       <el-button @click="submit"  :loading="submitLoading" type="primary" style="width:150px;height:60px;font-size:18px;display:inline-block">新增</el-button> 
    </el-form> 
    </div>         
 </div>     
</template>
<script>
import tinymce from "@/common/tinymce";
export default {
  components: {
    tinymce
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
      fileList: [],
      loading: false,
      data: {
        ContentId: "NA_test2_test2",
        SKU: "",
        Enable: true,
        Language: "",
        Country: "",
        Title: "",
        Platform: "",
        Account: "",
        cartLongTitle: "",
        cartShortTitle: "",
        imageName1: "test111",
        imageName2: "test111",
        imageName3: "test111",
        imageName4: "test111",
        imageName5: "test111",
        imageName6: "test111",
        imageName7: "test111",
        imageName8: "test111",
        imageName9: "test111",
        imageName10: "test111",
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
        version: "test111"
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
      this.loading = true;
    });
  },
  methods: {
    goBack() {
      this.$router.push("/documentManage");
    },
    handleClose(index) {
      this.fileList.splice(index, 1);
    },
    handlePreview(){
      let Description = this.data.shortDescription;
      let Description1 = this.data.Description1;
      let Description2 = this.data.Description2;
      let Description3 = this.data.Description3;
      let Description4 = this.data.Description4;
      let Description5 = this.data.Description5;
      let totalDescription = Description + Description1 + Description2 + Description3 + Description4 + Description5;
      let previewWindow = window.open('', '_blank');
      previewWindow.document.write(totalDescription);
    },
    handleUpload() {
      if (this.fileList.length >= 10) {
        this.$message.warning("最多上传10张");
        return;
      }
      let input = document.createElement("input");
      input.type = "file";
      input.click();
      input.addEventListener("change", () => {
        let URL = window.URL || window.webkitURL;
        var base64 = URL.createObjectURL(input.files[0]);
        let obj = {
          name: input.files[0].name + "",
          base64
        };
        this.fileList.push(obj);
      });
    },
    submit() {
      this.$refs["form"].validate(action => {
        if (action) {
          this.submitLoading = true;
          let info = [];
          _.each(this.fileList, (v, i) => {
            this.data["imageName" + (i + 1)] = v.name;
          });
          info.push(_.cloneDeep(this.data));
          let obj = {
            data: info
          };
          axios({
            url: "/content/add",
            method: "post",
            data: {
              value: JSON.stringify(obj),
              token: this.token
            }
          }).then(res => {
            this.submitLoading = true;
            this.Bus.$emit('refresh');
            this.$router.push("/documentManage");
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


