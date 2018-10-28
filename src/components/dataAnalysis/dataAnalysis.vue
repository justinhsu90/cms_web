<template>
    <div  v-loading="loading" class="dataAnaly">
        <el-row :gutter="10" style="padding:0px">
            <el-col :span="5"  >
                <el-card  style="height:130px"> 
                <h5>今日須出貨包裹數量</h5>
                <br>
                <div class="w50 fl">
                    <div class="font ta">
                         <span>{{parcelCount.singleParcelCount}}</span>  
                     </div>
                     <div class="mt10">
                             <span class="fr f13 label-tips">單件裝</span>
                     </div>
                </div>
                <div class="w50 fr "> 
                     <div class="font ta">
                        <span>{{parcelCount.multiParcelCount}}</span>
                    </div>
                    <div  class="mt10">
                         <span class="fr f13 label-tips">多件裝</span>
                    </div>
                </div>
                </el-card>
            </el-col>
            <el-col :span="5" >
                <el-card style="height:130px">
                  <h5>目前準備出貨包裹數量</h5>
                <br>
                <div class="w50 fl">
                    <div class="font ta">
                         <span >{{parcelCount.currectPackedSingleParcelCount}}</span>  
                     </div>
                     <div  class="mt10">   
                             <span class="fr f13 label-tips">單件裝</span>
                             <span  class="fr f13" style="color:rgb(170,52,48)">{{parcelCount.completeRateOfSingle*100}}%&nbsp;</span>   
                     </div>
                </div>
                <div class="w50 fr "> 
                     <div class="font ta">
                        <span>{{parcelCount.currectPackedMultiParcelCount}}</span>
                    </div>
                    <div  class="mt10">
                         <span class="fr f13 label-tips" >多件裝</span>
                         <span class="fr f13" style="color:rgb(170,52,48)">{{parcelCount.completeRateOfMulti*100}}%&nbsp;</span>   
                    </div>
                </div>
                </el-card>
            </el-col>
              <el-col :span="7" >
                  <el-card style="height:130px">
                  <h5>&nbsp;&nbsp;本月日均毛利</h5>
                <br>
                <div class="w50 fl">
                    <div class="font ta ">
                         <span style="color:black">£{{MarginTarget.dailyMarginTarget | formatToMoney}}</span>  
                     </div>
                     <div  class="mt10">   
                             <span class="fr f13 label-tips">目標毛利</span>
                     </div>
                </div>
                <div class="w50 fr "> 
                     <div class="font ta">
                        <span style="color:black">£{{MarginTarget.dailyMarginActual | formatToMoney}}</span>
                    </div>
                    <div  class="mt10">
                         <span class="fr f13 label-tips" >實際毛利</span>
                         <span class="fr f13" style="color:rgb(170,52,48)">{{MarginTarget.dailyMarginPerformancePercent*100}}%&nbsp;</span>   
                    </div>
                </div>
                </el-card>
            </el-col>
              <el-col :span="6" >
                  <el-card style="height:130px">
                  <h5>&nbsp;&nbsp;本月日均毛利</h5>
                <br>
                <div class="w50 fl">
                    <div class="font2 ta ">
                         <span>£{{MarginTarget.monthlyMarginTarget | formatToMoney}}</span>  
                     </div>
                     <div  class="mt10">   
                             <span class="fr f13 label-tips">目標毛利</span>
                             <span class="fr f13 label-tips" style="color:rgb(170,52,48)">剩餘{{MarginTarget.remainDaysOfMonth}}天&nbsp;</span>
                     </div>
                </div>
                <div class="w50 fr "> 
                     <div class="font2 ta">
                        <span>£{{MarginTarget.monthlyMarginActual | formatToMoney}}</span>
                    </div>
                    <div  class="mt10">
                         <span class="fr f13 label-tips" >實際毛利</span>
                         <span class="fr f13" style="color:rgb(170,52,48)">{{MarginTarget.monthlyMarginPerformancePercent*100}}%&nbsp;</span>   
                          <span class="fr  f13 label-tips" style="color:rgb(170,52,48)">尚須{{MarginTarget.daysToReachTarget}}天&nbsp;</span>
                    </div>
                </div>
                </el-card>
            </el-col>
        </el-row>
        <br>
        <el-row class="dataAnaly" :gutter="10" style="padding:0px">
            <el-card style="height:320px">
            <h3>各平台銷售表現</h3>
            <el-col class="mt10" :span="6" v-for="(v,i) in platformPerformance" :key="i">
                <el-card  style="height:120px"> 
                <h5>{{v.title}}</h5>
                <br>
                <div class="w30 fl">
                    <div class="font tc">
                        <span>{{v.quantity}}</span>  
                     </div>
                     <div class="mt10 tc" >
                        <span class=" f13 label-tips">數量</span>
                     </div>
                </div>               
                <div class="w35 fn"> 
                     <div class="font tc">
                        <span>{{v.revenue | formatToMoney}}</span>
                    </div>
                    <div  class="mt10 tc">
                         <span class="f13 label-tips">銷售額{{`(${v.currency})`}}</span>
                    </div>
                </div>
                <div class="w30 fr"> 
                     <div class="font tc">
                        <span>{{(v.marginPercent* 100).toFixed(2)}}%</span>
                    </div>
                    <div  class="mt10 tc">
                         <span class="f13 label-tips">毛利率</span>
                    </div>
                </div>
                </el-card>
            </el-col>
            </el-card>
        </el-row>
        <br>  
        <el-row :gutter="10" style="padding:0px">
            <el-col :span="8"  v-for="(v,i) in performance" :key="i">
                <el-card style="height:250px">
                <h5>{{v.title}}</h5>
                <div style="border-bottom:1px solid #E4E9EE;padding-bottom:10px">
                <h5>利潤<span class="font" style="padding-right:15px">&nbsp;&nbsp;£{{v.revenue | formatToMoney}}</span>售出數量 : {{v.revenue}}</h5>
                </div>
                <div class="mt10">
                  <div class="fl" style="width:33.3%">
                        <div><h5 style="height:30px" class="ta">毛利</h5></div>
                        <div class="mt10"><h5 class="ta">£{{v.margin | formatToMoney}}</h5></div>  
                        <div class="mt10"><h5 class="ta">{{(v.marginPercent*100).toFixed(2)}}%</h5></div>  
                        <div class="mt10">
                            <div style="width:80px;height:20px;border-radius:10px;background:rgb(231,235,238);margin:0 auto"><div :style="`width:${80*v.marginPercent}px;height:20px;border-radius:10px;background:rgb(241,76,108)`"></div></div>
                        </div>
                  </div>
                  <div class="fl"  style="width:33.3%">
                        <div><h5 style="height:30px" class="ta">產品成本</h5></div>
                        <div class="mt10"><h5 class="ta">£{{v.productCost | formatToMoney}}</h5></div>  
                        <div class="mt10"><h5 class="ta">{{(v.productCostPercent*100).toFixed(2)}}%</h5></div>  
                        <div class="mt10">
                            <div style="width:80px;height:20px;border-radius:10px;background:rgb(231,235,238);margin:0 auto"><div :style="`width:${80*v.productCostPercent}px;height:20px;border-radius:10px;background:rgb(9,194,214)`"></div></div>
                        </div>
                    </div>  
                    <div class="fl" style="width:33.3%">
                        <div><h5 style="height:30px" class="ta">運輸成本</h5></div>
                        <div class="mt10"><h5 class="ta">£{{v.shippingCost | formatToMoney}}</h5></div>  
                        <div class="mt10"><h5 class="ta">{{(v.shippingCostPercent*100).toFixed(2)}}%</h5></div>  
                        <div class="mt10">
                            <div style="width:80px;height:20px;border-radius:10px;background:rgb(231,235,238);margin:0 auto"><div :style="`width:${80*v.shippingCostPercent}px;height:20px;border-radius:10px;background:rgb(251,184,53)`"></div></div>
                        </div>
                    </div>    
                </div>
                </el-card>
            </el-col>
        </el-row>
        <br>
        <el-row style="padding:0px">
            <el-col :span="15">
                <h5>本月產品銷售排行</h5>
                <el-card >
                <el-table :data="productPerformance">
                    <el-table-column  min-width="220" label="產品名稱" prop="productName"></el-table-column>
                    <el-table-column  min-width="60" label="毛利" prop="margin">
                        <template slot-scope="scope">
                          {{scope.row.margin | formatToMoney}}&nbsp;GBP
                        </template>
                    </el-table-column>
                    <el-table-column  min-width="60" label="毛利率" prop="percentageOfMargin" :formatter="formatToPercent"></el-table-column>
                    <el-table-column  min-width="60" label="毛利占比" prop="percentageOfTotalRevenue" :formatter="formatToPercent"></el-table-column>
                    <!-- <el-table-column  min-width="60" label="採購成本" prop="margin">
                        <template slot-scope="scope">
                          {{scope.row.ProductCost | formatToMoney}}&nbsp;GBP
                        </template>
                    </el-table-column>
                    <el-table-column  min-width="60" label="採購成本率" prop="ProductCostPercent" :formatter="formatToPercent"></el-table-column>
                    <el-table-column  min-width="60" label="運費成本" prop="margin">
                        <template slot-scope="scope">
                          {{scope.row.ProductCost | formatToMoney}}&nbsp;GBP
                        </template>
                    </el-table-column>
                    <el-table-column  min-width="60" label="運費成本率" prop="ShippingCostPercent" :formatter="formatToPercent"></el-table-column>
                     -->
                </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row style="padding-top:20px">
            <el-col :span="24">
                <h5>月度銷售表現</h5>
                <el-card>
                <el-table :data="monthlyPerformance">
                    <el-table-column width="80" label="月份" prop="title"></el-table-column>
                    <el-table-column  min-width="60" label="售出數量" prop="quantity"></el-table-column>
                    <el-table-column  min-width="80" label="營業額" prop="revenue">
                         <template slot-scope="scope">
                          {{scope.row.revenue | formatToMoney}}&nbsp;GBP
                        </template>
                    </el-table-column>
                     <el-table-column  min-width="80" label="毛利" prop="margin">
                        <template slot-scope="scope">
                          {{scope.row.margin | formatToMoney}}&nbsp;GBP
                        </template>
                    </el-table-column>
                    <el-table-column  min-width="80" label="毛利率" prop="marginPercent" :formatter="formatToPercent"></el-table-column>
                    <el-table-column  min-width="80" label="採購成本" prop="productCost">
                         <template slot-scope="scope">
                          {{scope.row.productCost | formatToMoney}}&nbsp;GBP
                        </template>
                    </el-table-column>
                    <el-table-column  min-width="80" label="採購成本率" prop="productCostPercent" :formatter="formatToPercent"></el-table-column>
                    <el-table-column  min-width="80" label="運輸成本" prop="shippingCost">
                         <template slot-scope="scope">
                          {{scope.row.shippingCost | formatToMoney}}&nbsp;GBP
                        </template>
                    </el-table-column>
                    <el-table-column  min-width="80" label="運輸成本率" prop="shippingCostPercent" :formatter="formatToPercent"></el-table-column>
                   
                    <!-- <el-table-column  min-width="80" label="退貨數量" prop="refundQuantity"></el-table-column> -->
                    <!-- <el-table-column  min-width="80" label="退貨總金額" prop="refundAmount"></el-table-column> -->
                    <el-table-column  min-width="80" label="退貨率" prop="refundPercent" :formatter="formatToPercent"></el-table-column>
                </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { format } from "@/common/until/format";
export default {
  data: () => ({
    parcelCount: {},
    MarginTarget: {},
    performance: [],
    productPerformance: [],
    monthlyPerformance: [],
    platformPerformance:[],
    loading: 1
  }),
  created() {
    axios({
      url: "/dashboard/all",
      method: "post",
      data: {
        token: this.token
      }
    })
      .then(res => {
        this.parcelCount = _.cloneDeep(res.parcelCount) || {};
        this.MarginTarget = _.cloneDeep(res.marginTarget) || {};
        this.performance = _.cloneDeep(res.performance) || [];
        this.productPerformance = _.cloneDeep(res.productPerformance) || [];
        this.monthlyPerformance = _.cloneDeep(res.monthlyPerformance) || [];
        this.platformPerformance = _.cloneDeep(res.platformPerformance) || [];
        this.loading--;
      })
      .catch(() => {});
  },
  methods:{
    ...format  
  },
  filters: {
    ...format
  }
};
</script>
<style lang="scss" >
.dataAnaly {
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .fn {
    display: inline-block;
    margin:0 auto;
    // width:100px;
  }
  .font {
    font-size: 20px;
    color: rgb(122, 113, 202);
  }
  .font2 {
    font-size: 20px;
    color: rgb(0, 0, 0);
  }
  .f20 {
    font-size: 20px;
    color: rgb(122, 113, 202);
  }
  .f13 {
    font-size: 13px;
  }
  .w100 {
    width: 100%;
  }
  .w20{
      width:20%
  }
  .w35{
      width:35%
  }
  .p10 {
    padding: 10px;
  }
  .clear::after {
    content: "";
    display: block;
    clear: both;
  }
  .w50 {
    width: 50%;
  }
  .w30 {
    width: 30%;
  }
  .w20 {
    width: 20%;
  }
  .mt10 {
    margin-top: 5px;
  }
  .ta {
    text-align: center;
  }
  .tr {
    text-align: right;
  }
  .label-tips {
    color: #bbbbbb;
  }
  .dataAnaly .el-card__body {
    padding: 10px !important;
  }
}
</style>



