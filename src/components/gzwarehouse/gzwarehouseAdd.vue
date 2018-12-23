<template>
    <div class="p20"> 
    <div class="goBack">
      <i class="el-icon-arrow-left"></i>
      <a href="javascript:void(0)" @click="goBack">返回</a>
    </div>
    <h2 class="mt10">查看</h2>
     <el-form :model="form" >
       <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="簽收單號：">
                  <el-input :value="form.id" disabled></el-input>  
            </el-form-item>       
          </el-col>
          <el-col :span="6">
            <el-form-item label="簽收箱數：">
                  <el-input :value="form.quan" disabled></el-input>  
            </el-form-item>       
          </el-col>
          <el-col :span="6">
            <el-form-item label="快遞單號：">
                  <el-input :value="form.trackingNumber" disabled></el-input>  
            </el-form-item>       
          </el-col>
          <el-col :span="6">
            <el-form-item label="簽收時間：">
                  <el-input :value="form.addedTime" disabled></el-input>  
            </el-form-item>       
          </el-col>
          <el-col :span="6" v-if="form.imageUrl">
            <el-form-item label="圖片：">
                  <img :src="form.imageUrl" width="100" alt="">
            </el-form-item>       
          </el-col>
        </el-row>  
        <el-row :gutter="20">
              <el-col :span="6" v-for="(o, index) in imgData" :key="index">
                <el-card>
                  <div style="padding: 14px;">
                    <span class="label-tips">{{++index}}.</span>
                  </div>
                  <img :src="o" class="image">
                </el-card>
              </el-col>
        </el-row>
    </el-form>   
    </div>
</template>  

<script>
export default {
  methods: {
    goBack() {
      this.$router.push("/gzwarehouseList");
    }
  },
  data() {
    return {
      imgData: [],
      form: {},
      currentDate: new Date()
    };
  },
  created() {
    let data = JSON.parse(this.$route.query.data);
    this.form = _.cloneDeep(data);
    axios({
      url: "gzwarehouse/id/image",
      method: "post",
      data: {
        token: this.token,
        id: data.id
      }
    }).then(res => {
      this.imgData = res;
    });
  }
};
</script>
<style scoped>
.image {
  width: 100%;
  display: block;
}
</style>
