<template>
    <div v-loading="loading">
        <el-row :gutter="40" style="padding:20px">
            <el-col :span="5"  class="p10">
                <el-card  style="height:190px"> 
                <h3>&nbsp;&nbsp;今日須出貨包裹數量</h3>
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
            <el-col :span="5" class="p10">
                <el-card style="height:190px">
                  <h3>&nbsp;&nbsp;目前準備出貨包裹數量</h3>
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
              <el-col :span="7" class="p10">
                  <el-card style="height:190px">
                  <h3>&nbsp;&nbsp;本月日均毛利</h3>
                <br>
                <div class="w50 fl">
                    <div class="font ta ">
                         <span style="color:black">{{MarginTarget.dailyMarginTarget}}</span>  
                     </div>
                     <div  class="mt10">   
                             <span class="fr f13 label-tips">目标毛利</span>
                     </div>
                </div>
                <div class="w50 fr "> 
                     <div class="font ta">
                        <span style="color:black">{{MarginTarget.dailyMarginActual}}</span>
                    </div>
                    <div  class="mt10">
                         <span class="fr f13 label-tips" >实际毛利</span>
                         <span class="fr f13" style="color:rgb(170,52,48)">{{MarginTarget.dailyMarginPerformancePercent*100}}%&nbsp;</span>   
                    </div>
                </div>
                </el-card>
            </el-col>
              <el-col :span="7" class="p10">
                  <el-card style="height:190px">
                  <h3>&nbsp;&nbsp;本月日均毛利</h3>
                <br>
                <div class="w50 fl">
                    <div class="font ta ">
                         <span style="color:black">{{MarginTarget.monthlyMarginTarget}}</span>  
                     </div>
                     <div  class="mt10">   
                             <span class="fr f13 label-tips">目标毛利</span>
                             <span class="fr f13 label-tips">剩餘{{MarginTarget.remainDaysOfMonth}}天&nbsp;</span>
                     </div>
                </div>
                <div class="w50 fr "> 
                     <div class="font ta">
                        <span style="color:black">{{MarginTarget.monthlyMarginActual}}</span>
                    </div>
                    <div  class="mt10">
                         <span class="fr f13 label-tips" >实际毛利</span>
                         <span class="fr f13" style="color:rgb(170,52,48)">{{MarginTarget.monthlyMarginPerformancePercent*100}}%&nbsp;</span>   
                          <span class="fr  f13 label-tips">尚須{{MarginTarget.daysToReachTarget}}天&nbsp;</span>
                    </div>
                </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="padding:20px">
            <el-col :span="8"  v-for="(v,i) in performance" :key="i">
                <el-card style="height:320px">
                <h3>{{v.title}}</h3>
                <div style="border-bottom:1px solid #E4E9EE;padding-bottom:10px">
                <h3>Revenue</h3>
                <span class="font">&nbsp;&nbsp;${{v.revenue}}</span>
                <div>
                    <h4>Sold : {{v.revenue}}</h4>
                </div>
                </div>
                <div class="mt10">
                  <div class="fl" style="width:33.3%">
                        <div><h4 style="height:40px" class="ta">Margin</h4></div>
                        <div class="mt10"><h4 class="ta">${{v.margin}}</h4></div>  
                        <div class="mt10"><h4 class="ta">{{v.marginPercent*100}}%</h4></div>  
                        <div class="mt10">
                            <div style="width:80px;height:20px;border-radius:10px;background:rgb(231,235,238);margin:0 auto"><div :style="`width:${80*v.marginPercent}px;height:20px;border-radius:10px;background:rgb(241,76,108)`"></div></div>
                        </div>
                  </div>
                  <div class="fl"  style="width:33.3%">
                        <div><h4 style="height:40px" class="ta">Product Cost</h4></div>
                        <div class="mt10"><h4 class="ta">${{v.productCost}}</h4></div>  
                        <div class="mt10"><h4 class="ta">{{v.productCostPercent*100}}%</h4></div>  
                        <div class="mt10">
                            <div style="width:80px;height:20px;border-radius:10px;background:rgb(231,235,238);margin:0 auto"><div :style="`width:${80*v.productCostPercent}px;height:20px;border-radius:10px;background:rgb(9,194,214)`"></div></div>
                        </div>
                    </div>  
                    <div class="fl" style="width:33.3%">
                        <div><h4 style="height:40px" class="ta">Shipping Cost</h4></div>
                        <div class="mt10"><h4 class="ta">${{v.shippingCost}}</h4></div>  
                        <div class="mt10"><h4 class="ta">{{(v.shippingCostPercent*100).toFixed(2)}}%</h4></div>  
                        <div class="mt10">
                            <div style="width:80px;height:20px;border-radius:10px;background:rgb(231,235,238);margin:0 auto"><div :style="`width:${80*v.shippingCostPercent}px;height:20px;border-radius:10px;background:rgb(251,184,53)`"></div></div>
                        </div>
                    </div>    
                </div>
                </el-card>
            </el-col>
        </el-row>
        <br>
        <el-row style="padding:20px">
            <el-col :span="16">
                <el-card >
                <h3>Sales Reports</h3>
                <el-table :data="productPerformance">
                    <el-table-column  width="150" label="productName" prop="productName"></el-table-column>
                    <el-table-column  width="80" label="rank" prop="ranking"></el-table-column>
                    <el-table-column  width="80" label="margin" prop="maring"></el-table-column>
                    <el-table-column  width="220" label="percetageofTotalRevenue" prop="percentageOfTotalRevenue"></el-table-column>
                    <el-table-column  width="200" label="percentageOfMargin" prop="percentageOfMargin"></el-table-column>
                </el-table>
                </el-card>
            </el-col>
            <el-col :span="24">
                <el-card>
                <el-table :data="monthlyPerformance">
                    <el-table-column width="100" label="title" prop="title"></el-table-column>
                    <el-table-column  min-width="80" label="revenue" prop="revenue"></el-table-column>
                    <el-table-column  min-width="100" label="productCost" prop="productCost" :formatter="formatToYuan"></el-table-column>
                    <el-table-column  min-width="100" label="productCostPercent" prop="productCostPercent" :formatter="formatToPercent"></el-table-column>
                    <el-table-column  min-width="100" label="shippingCost" prop="shippingCost" :formatter="formatToYuan"></el-table-column>
                    <el-table-column  min-width="100" label="shippingCostPercent" prop="shippingCostPercent" :formatter="formatToPercent"></el-table-column>
                    <el-table-column  min-width="80" label="margin" prop="margin"></el-table-column>
                    <el-table-column  min-width="100" label="marginPercent" prop="marginPercent" :formatter="formatToPercent"></el-table-column>
                    <el-table-column  min-width="80" label="quantity" prop="quantity"></el-table-column>
                    <el-table-column  min-width="80" label="refundQuantity" prop="refundQuantity"></el-table-column>
                    <el-table-column  min-width="80" label="refundAmount" prop="refundAmount"></el-table-column>
                    <el-table-column  min-width="80" label="refundPercent" prop="refundPercent" :formatter="formatToPercent"></el-table-column>
                </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { format } from "../../common/until/format";
export default {
  data: () => ({
    parcelCount: {},
    MarginTarget: {},
    performance: [],
    productPerformance: [],
    monthlyPerformance: [],
    loading: 1
  }),
  created() {
    axios({
      url: "http://api.myfbmanage.com:8000/data-server/dashboard/all",
      method: "post",
      data: {
        token: this.token
      }
    })
      .then(res => {
        this.parcelCount = _.cloneDeep(res.parcelCount);
        this.MarginTarget = _.cloneDeep(res.marginTarget);
        this.performance = _.cloneDeep(res.performance);
        this.productPerformance = _.cloneDeep(res.productPerformance);
        this.monthlyPerformance = _.cloneDeep(res.monthlyPerformance);
        this.loading--;
      })
      .catch(() => {});
  },
  methods: {
    ...format
  }
};
</script>
<style scoped>
.fl {
  float: left;
}
.fr {
  float: right;
}
.font {
  font-size: 28px;
  color: rgb(122, 113, 202);
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
.mt10 {
  margin-top: 10px;
}
.ta {
  text-align: center;
}
.label-tips {
  color: #bbbbbb;
}
</style>



