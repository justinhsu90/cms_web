<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-input class="w-max200 ibbox" placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch">
                </el-input>
                <el-select class="w-max150" placeholder="貨代" v-model="searchAgent" @change="handleCondition('agent')" clearable>
                    <el-option v-for="(v,i) in searchAgentOption" :key="'acc'+i" :label="v" :value="v"></el-option>
                </el-select>
                <el-select class="w-max150" placeholder="運輸方式" v-model="searchShippingMethod" @change="handleCondition('shipping')" clearable>
                    <el-option v-for="(v,i) in searchShippingMethodOption" :key="'country'+i" :label="v" :value="v">
                    </el-option>
                </el-select>
                <el-select class="w-max150" placeholder="訂單狀態" v-model="searchOrderstatus" @change="handleCondition('status')" clearable>
                    <el-option v-for="(v,i) in searchOrderstatusOption" :key="'plat'+i" :label="v" :value="v"></el-option>
                </el-select>
                <el-date-picker class="w-max180" clearable  @change="handleCondition" value-format="yyyy-MM-dd" v-model="orderDate" type="daterange" align="right" unlink-panels range-separator="~" start-placeholder="做單日期" end-placeholder="結束日期" :picker-options="pickerOptions">
                </el-date-picker>
                <el-date-picker class="w-max180"  clearable  @change="handleCondition" value-format="yyyy-MM-dd" v-model="shipoutDate" type="daterange" align="right" unlink-panels range-separator="~" start-placeholder="出貨日期" end-placeholder="結束日期" :picker-options="pickerOptions">
                </el-date-picker>
                <div @click="handleSearch" class="el-input-group__append search">
                    <i class="el-icon-search"></i>
                </div>
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">

                    <el-table-column min-width="50" label="貨代" prop="agent">
                    </el-table-column>
                    <el-table-column min-width="100" label="貨代單號" prop="orderId"></el-table-column>
                    <el-table-column min-width="100" label="平台訂單號" prop="platformOrderId"></el-table-column>
                    <el-table-column min-width="70" label="訂單狀態" prop="orderStatus">
                        <template slot-scope="scope">
                            <el-tag type="warning">{{scope.row.orderStatus}}</el-tag>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column min-width="75" label="平台" prop="platform"></el-table-column> -->
                    <!-- <el-table-column min-width="200" label="商品名稱" prop="productName"></el-table-column> -->
                    <el-table-column min-width="70" label="做單時間" prop="orderTime"></el-table-column>
                    <el-table-column min-width="70" label="發出時間" prop="shipoutTime"></el-table-column>
                    <el-table-column min-width="70" label="費用" prop="shippingFee">
                        <template slot-scope="scope">
                            {{scope.row.shippingFee + scope.row.shippingFeeCurrency}}
                        </template>
                    </el-table-column>
                    <el-table-column min-width="80" label="運輸方式" prop="shippingMethod"></el-table-column>
                    <el-table-column min-width="100" label="物流單號" prop="trackingNumber"></el-table-column>

                    <el-table-column min-width="130" label="最後更新時間" prop="lastUpdatedTime" sortable="custom" :formatter="formatToTime">
                    </el-table-column>
                    <el-table-column width="50" label="動作" fixed="right">
                        <template slot-scope="scope">
                            <el-button class="btnh" type="text" title="查看" icon="el-icon-won-40" @click="handleCheck(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <won-pagination v-bind="paginationProps" v-on="paginationListeners">
            </won-pagination>
        </el-row>
    </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
export default {
  extends: wonTableContainer,
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      tableData: [],
      orderDate: [],
      shipoutDate: [],
      condition: [],
      searchAgent: "",
      searchAgentOption: [],
      searchShippingMethod: "",
      searchShippingMethodOption: [],
      searchOrderstatus: "",
      searchOrderstatusOption: [],
      maxHeight: 450,
      isTableLoading: false,
      fetchCondition: {
        skip: 0,
        order: "",
        limit: 20
      },
      fetchOption: {
        url: "/shippingagent/search",
        where: "",
        method: "post"
      }
    };
  },
  created() {
    let agent = axios({
      url: "/shippingagent/value/agent",
      method: "post",
      data: {
        token: this.token
      }
    });
    let shippingMethod = axios({
      url: "/shippingagent/value/shippingMethod",
      method: "post",
      data: {
        token: this.token
      }
    });
    let orderstatus = axios({
      url: "/shippingagent/value/orderStatus",
      method: "post",
      data: {
        token: this.token
      }
    });
    Promise.all([agent, shippingMethod, orderstatus]).then(
      ([agent, shippingMethod, orderstatus]) => {
        this.searchAgentOption = _.cloneDeep(agent);
        this.searchShippingMethodOption = _.cloneDeep(shippingMethod);
        this.searchOrderstatusOption = _.cloneDeep(orderstatus);
      }
    );
    this.handleSearch();
  },
  methods: {
    handleCondition(sign) {
      if (sign == "agent") {
        if (!this.searchAgent) {
          _.pull(this.condition, "1");
        } else {
          if (!this.condition.includes("1")) {
            this.condition.push("1");
          }
        }
      }
      if (sign == "status") {
        if (!this.searchOrderstatus) {
          _.pull(this.condition, "2");
        } else {
          if (!this.condition.includes("2")) {
            this.condition.push("2");
          }
        }
      }
      if (sign == "shipping") {
        if (!this.searchShippingMethod) {
          _.pull(this.condition, "3");
        } else {
          if (!this.condition.includes("3")) {
            this.condition.push("3");
          }
        }
      }
      this.handleSearch();
    },
    handleSearch: _.debounce(function() {
      this.isTableLoading = true;
      let data = {
        where: this.fetchOption.where,
        token: this.token,
        skip: this.fetchCondition.skip,
        limit: this.fetchCondition.limit,
        order: this.fetchCondition.order
      };
      if (this.condition.includes("1")) {
        data.agent = this.searchAgent;
      }
      if (this.condition.includes("2")) {
        data.orderStatus = this.searchOrderstatus;
      }
      if (this.condition.includes("3")) {
        data.shippingMethod = this.searchShippingMethod;
      }
      if (!_.isEmpty(this.orderDate)) {
        data.orderStartDate = this.orderDate[0];
        data.orderEndDate = this.orderDate[1];
      }
      if (!_.isEmpty(this.shipoutDate)) {
        data.shipoutStartDate = this.shipoutDate[0];
        data.shipoutEndDate = this.shipoutDate[1];
      }

      this.fetchTableData(data);
    }, 2000),
    handleCheck(val) {
      this.$router.push({
        name: "shippingView",
        query: { data: JSON.stringify(val) }
      });
    }
  }
};
</script>

<style scoped>
.el-table th {
  color: #62717e;
  background: rgb(237, 241, 245);
  text-align: center;
}
</style>
