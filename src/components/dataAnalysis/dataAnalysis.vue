<template>
  <div v-loading="loading">
    <!-- <el-row :gutter="10" style="padding:0px">
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
        <br> -->
    <el-row
      v-if="todayPlatformPerformance.length"
      class="dataAnaly"
      :gutter="5"
      style="padding:0px"
    >
      <el-card style="height:160px;background-color:#fdfdfd;">
        <h4>各平台本日銷售表現</h4>
        <!-- <br> -->
        <el-col
          class="mt10"
          :span="6"
          v-for="(v,i) in todayPlatformPerformance"
          :key="i"
        >
          <el-card style="height:115px">
            <h5>{{v.title}}</h5>
            <br>
            <div class="w30 fl">
              <div class="font tc">
                <span>{{v.quantity}}</span>
              </div>
              <div class="mt10 tc">
                <span class=" f13 label-tips">數量</span>
              </div>
            </div>
            <div class="w35 fn">
              <div class="font tc">
                <span>{{v.revenue | formatToMoney}}</span>
              </div>
              <div class="mt10 tc">
                <span class="f13 label-tips">銷售額{{`(${v.currency})`}}</span>
              </div>
            </div>
            <div class="w30 fr">
              <div class="font tc">
                <span>{{(v.marginPercent* 100).toFixed(2)}}%</span>
              </div>
              <div class="mt10 tc">
                <span class="f13 label-tips">毛利率</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-card>
    </el-row>
    <el-row
      v-if="previousDayPlatformPerformance.length"
      class="dataAnaly"
      :gutter="5"
      style="padding:0px"
    >
      <el-card style="height:160px;background-color:#fdfdfd;">
        <h4>各平台前日銷售表現</h4>
        <!-- <br> -->
        <el-col
          class="mt10"
          :span="6"
          v-for="(v,i) in previousDayPlatformPerformance"
          :key="i"
        >
          <el-card style="height:115px">
            <h5>{{v.title}}</h5>
            <br>
            <div class="w30 fl">
              <div class="font tc">
                <span>{{v.quantity}}</span>
              </div>
              <div class="mt10 tc">
                <span class=" f13 label-tips">數量</span>
              </div>
            </div>
            <div class="w35 fn">
              <div class="font tc">
                <span>{{v.revenue | formatToMoney}}</span>
              </div>
              <div class="mt10 tc">
                <span class="f13 label-tips">銷售額{{`(${v.currency})`}}</span>
              </div>
            </div>
            <div class="w30 fr">
              <div class="font tc">
                <span>{{(v.marginPercent* 100).toFixed(2)}}%</span>
              </div>
              <div class="mt10 tc">
                <span class="f13 label-tips">毛利率</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-card>
    </el-row>
    <!-- <br>   -->
    <el-row
      v-if="platformPerformance.length"
      class="dataAnaly"
      :gutter="5"
      style="padding:0px"
    >
      <el-card style="height:160px;background-color:#fdfdfd;">
        <h4>各平台本月銷售表現</h4>
        <!-- <br> -->
        <el-col
          class="mt10"
          :span="6"
          v-for="(v,i) in platformPerformance"
          :key="i"
        >
          <el-card style="height:115px">
            <h5>{{v.title}}</h5>
            <br>
            <div class="w30 fl">
              <div class="font tc">
                <span>{{v.quantity}}</span>
              </div>
              <div class="mt10 tc">
                <span class=" f13 label-tips">數量</span>
              </div>
            </div>
            <div class="w35 fn">
              <div class="font tc">
                <span>{{v.revenue | formatToMoney}}</span>
              </div>
              <div class="mt10 tc">
                <span class="f13 label-tips">銷售額{{`(${v.currency})`}}</span>
              </div>
            </div>
            <div class="w30 fr">
              <div class="font tc">
                <span>{{(v.marginPercent* 100).toFixed(2)}}%</span>
              </div>
              <div class="mt10 tc">
                <span class="f13 label-tips">毛利率</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-card>
    </el-row>
    <!-- <br>   -->
    <!-- <el-row :gutter="10" style="padding:0px">
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
        </el-row> -->
    <br>
    <el-row style="padding:0px">
      <el-col :span="24">
        <el-card>
          <div>
            <h4 style="display:inline-block;">Wowcher本月產品銷售排行</h4>
            <div style="display:inline-block;">
              <el-select
                v-model="account"
                placeholder="帳號"
                @change="handleSelect('account')"
              >
                <el-option
                  v-for="(v,i) in selectAccountOption"
                  :label="v"
                  :value="v"
                  :key="i"
                ></el-option>
              </el-select>
            </div>
            <div style="display:inline-block;">
              <el-select
                v-model="year"
                placeholder="年份"
                @change="handleSelect('year')"
              >
                <el-option
                  v-for="(v,i) in selectYearOption"
                  :label="v"
                  :value="v"
                  :key="i"
                ></el-option>
              </el-select>
            </div>
            <div style="display:inline-block;">
              <el-select
                v-model="month"
                placeholder="月份"
                @change="handleSelect('month')"
              >
                <el-option
                  v-for="(v,i) in selectMonthOption"
                  :label="v.monthInEng"
                  :value="v.monthInEng"
                  :key="i"
                ></el-option>
              </el-select>
            </div>
          </div>
          <br>
          <el-table :data="productPerformance">
            <el-table-column
              min-width="220"
              label="產品名稱"
              prop="productName"
            ></el-table-column>
            <!-- <el-table-column  min-width="60" label="Sku" prop="sku"></el-table-column> -->
            <!-- <el-table-column  min-width="60" label="等級" prop="ranking"></el-table-column> -->
            <el-table-column
              min-width="60"
              label="銷售額"
              prop="revenue"
            >
              <template slot-scope="scope">
                {{scope.row.revenue | formatToMoney}}&nbsp;GBP
              </template>
            </el-table-column>
            <el-table-column
              min-width="60"
              label="毛利"
              prop="margin"
            >
              <template slot-scope="scope">
                {{scope.row.margin | formatToMoney}}&nbsp;GBP
              </template>
            </el-table-column>
            <el-table-column
              min-width="50"
              label="毛利%"
              prop="percentageOfMargin"
              :formatter="formatToPercent"
            ></el-table-column>
            <!-- <el-table-column min-width="60" label="毛利佔比%" prop="percentageOfMargin" :formatter="formatToPercent"></el-table-column> -->
            <!-- <el-table-column  min-width="60" label="商品成本" prop="productCost">
                        <template slot-scope="scope">
                          {{scope.row.productCost | formatToMoney}}&nbsp;GBP
                        </template>
                    </el-table-column> -->
            <el-table-column
              min-width="50"
              label="成本%"
              prop="productCostPercent"
              :formatter="formatToPercent"
            ></el-table-column>
            <!-- <el-table-column  min-width="60" label="運費" prop="shippingCost"></el-table-column> -->
            <el-table-column
              min-width="50"
              label="運費%"
              prop="shippingCostPercent"
              :formatter="formatToPercent"
            ></el-table-column>
            <el-table-column
              min-width="50"
              label="營業額%"
              prop="percentageOfTotalRevenue"
              :formatter="formatToPercent"
            ></el-table-column>

          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="padding-top:20px">
      <el-col :span="24">
        <el-card>
          <h4>Wowcher月度銷售表現</h4>
          <br>
          <el-table :data="monthlyPerformance">
            <el-table-column
              width="80"
              label="月份"
              prop="title"
            ></el-table-column>
            <el-table-column
              min-width="60"
              label="售出數量"
              prop="quantity"
            ></el-table-column>
            <el-table-column
              min-width="80"
              label="營業額"
              prop="revenue"
            >
              <template slot-scope="scope">
                {{scope.row.revenue | formatToMoney}}&nbsp;GBP
              </template>
            </el-table-column>
            <el-table-column
              min-width="80"
              label="毛利"
              prop="margin"
            >
              <template slot-scope="scope">
                {{scope.row.margin | formatToMoney}}&nbsp;GBP
              </template>
            </el-table-column>
            <el-table-column
              min-width="80"
              label="日均毛利"
              prop="dailyAverageMargin"
            >
              <template slot-scope="scope">
                {{scope.row.dailyAverageMargin | formatToMoney}}&nbsp;GBP
              </template>
            </el-table-column>
            <el-table-column
              min-width="80"
              label="日均營業額"
              prop="dailyAverageRevenue"
            >
              <template slot-scope="scope">
                {{scope.row.dailyAverageRevenue | formatToMoney}}&nbsp;GBP
              </template>
            </el-table-column>
            <el-table-column
              min-width="80"
              label="毛利率"
              prop="marginPercent"
              :formatter="formatToPercent"
            ></el-table-column>
            <el-table-column
              min-width="80"
              label="採購成本"
              prop="productCost"
            >
              <template slot-scope="scope">
                {{scope.row.productCost | formatToMoney}}&nbsp;GBP
              </template>
            </el-table-column>
            <el-table-column
              min-width="80"
              label="採購成本率"
              prop="productCostPercent"
              :formatter="formatToPercent"
            ></el-table-column>
            <el-table-column
              min-width="80"
              label="運輸成本"
              prop="shippingCost"
            >
              <template slot-scope="scope">
                {{scope.row.shippingCost | formatToMoney}}&nbsp;GBP
              </template>
            </el-table-column>
            <el-table-column
              min-width="80"
              label="運輸成本率"
              prop="shippingCostPercent"
              :formatter="formatToPercent"
            ></el-table-column>
            <el-table-column
              min-width="80"
              label="退貨率"
              prop="refundPercent"
              :formatter="formatToPercent"
            ></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <br>
    <el-row>
    <el-card>
      <calendar
        v-loading="calendarLoading"
        locale="zh-cn"
        :value="calendarValue"
        @changeMonth="changeMonth"
        @dayClick="dayClick"
      >
        
      </calendar>
      </el-card>
    </el-row>
    <el-button
      class="fixed refresh"
      @click="refresh"
      size="small"
      icon="el-icon-won-30"
    ></el-button>
  </div>
</template>
<script>
import { format } from "@/common/until/format";
import calendar from "won-service/component/won-calendar";
import moment from "moment";
export default {
  data: () => ({
    calendarLoading: false,
    calendarValue: [],
    parcelCount: {},
    MarginTarget: {},
    performance: [],
    previousDayPlatformPerformance: [],
    todayPlatformPerformance: [],
    productPerformance: [],
    monthlyPerformance: [],
    platformPerformance: [],
    loading: true,
    account: "",
    month: "",
    year: "",
    selectAccountOption: [],
    selectMonthOption: [],
    selectYearOption: [],
    condition: {},
    dateRangeList: []
  }),
  created() {
    this.refresh();
  },
  methods: {
    ...format,
    changeMonth(month) {
      this.calendarLoading = true;
      let endDate = moment(
        new Date(month.format("YYYY"), month.format("MM"), 0)
      ).format("YYYY-MM-DD");

      let startDate =
        month.format("YYYY") + "-" + month.format("MM") + "-" + "01";
      axios({
        url: "/dashboard/dateRangeSoldPerformance",
        method: "post",
        data: {
          startDate,
          endDate,
          token: this.token
        }
      }).then(({ list }) => {
        this.calendarLoading = false;
        this.calendarValue = list || [];
      });
    },
    dayClick() {
      console.log("dayClick");
    },
    refresh() {
      this.loading = true;
      let account = axios({
        url: "dashboard/value/productPerformance/account",
        method: "post",
        data: {
          token: this.token
        }
      });
      let month = axios({
        url: "dashboard/value/productPerformance/month",
        method: "post",
        data: {
          token: this.token
        }
      });

      let all = axios({
        url: "/dashboard/all",
        method: "post",
        data: {
          token: this.token
        }
      });
      Promise.all([account, month, all]).then(([account, month, res]) => {
        this.selectAccountOption = Array.isArray(account)
          ? _.cloneDeep(account)
          : [];
        this.selectMonthOption = Array.isArray(month) ? _.cloneDeep(month) : [];
        let data = [];
        _.each(this.selectMonthOption, v => {
          if (!data.includes(v.year)) {
            data.push(v.year);
          }
        });
        this.selectYearOption = data;
        this.parcelCount = _.cloneDeep(res.parcelCount) || {};
        this.MarginTarget = _.cloneDeep(res.marginTarget) || {};
        this.performance = _.cloneDeep(res.performance) || [];
        this.productPerformance = _.cloneDeep(res.productPerformance) || [];
        this.originProductPerformance =
          _.cloneDeep(res.productPerformance) || [];
        this.monthlyPerformance = _.cloneDeep(res.monthlyPerformance) || [];
        this.platformPerformance = _.cloneDeep(res.platformPerformance) || [];
        this.previousDayPlatformPerformance =
          _.cloneDeep(res.previousDayPlatformPerformance) || [];
        this.todayPlatformPerformance =
          _.cloneDeep(res.todayPlatformPerformance) || [];
        this.dateRangeSoldPerformance =
          _.cloneDeep(res.dateRangeSoldPerformance) || {};
        this.loading = false;
      });
    },
    handleSelect(v) {
      if (v == "account") {
        this.condition.productPerformanceAccount = this.account;
      }

      if (v == "year") {
        this.condition.productPerformanceYear = this.year;
      }

      if (v == "month") {
        this.condition.productPerformanceMonth = this.month;
      }
      this.fetchTableData();
    },
    fetchTableData() {
      if (!this.account && !this.year && !this.month) {
        this.productPerformance = this.originProductPerformance;
        return;
      }
      axios({
        url: "dashboard/productPerformace",
        method: "post",
        data: {
          ...this.condition,
          token: this.token
        }
      }).then(res => {
        this.productPerformance = res || [];
      });
    }
  },
  filters: {
    ...format
  },
  components: {
    calendar
  }
};
</script>
<style lang="scss" scoped>
.fl {
  float: left;
}
.fr {
  float: right;
}
.fn {
  display: inline-block;
  margin: 0 auto;
}
.ft {
  float: top;
}
.fb {
  float: bottom;
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
.w20 {
  width: 20%;
}
.w35 {
  width: 35%;
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
.refresh {
  bottom: 10px;
  right: 15px;
  z-index: 999;
}
.label-tips {
  color: #bbbbbb;
}
/deep/ .el-card__body {
  padding: 10px !important;
}
</style>
