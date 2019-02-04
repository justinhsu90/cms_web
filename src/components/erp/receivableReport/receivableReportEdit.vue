<template>
    <div id="receivableEdit">
        <div style="padding:20px">
            <div class="heade">
                <i class="el-icon-arrow-left"></i>
                <a href="javascript:void(0)" @click="goBack">返回</a>
            </div>
            <br>
            <h2>查看費用帳款
            </h2>
            <br>
            <table cellspacing="0" cellpadding="0" v-loading="loading">
                <caption>
                    <h3 class="mt">
                        {{year}}年{{month}}月費用應收帳款表
                    </h3>
                    <h5 class="tr">
                        生成時就 {{generatedTime | formatToTime}}
                    </h5>
                </caption>
                <thead>
                    <tr>
                        <th colspan="5">客戶資料</th>
                        <th colspan="3">收入</th>
                        <th colspan="4">變動成本</th>
                        <th colspan="3">固定成本</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>客工商</td>
                        <td>平台</td>
                        <td>ERP賬戶名稱</td>
                        <td>賬號</td>
                        <td>國家</td>
                        <td>幣別</td>
                        <td>銷售額</td>
                        <td>退貨退款</td>
                        <td>應收</td>
                        <td>成交費</td>
                        <td>運費</td>
                        <td>倉儲費</td>
                        <td>總金額</td>
                        <td>規費</td>
                        <td>廣告費</td>
                        <td>總金額</td>
                    </tr>
                    <tr v-for="(v,i) in data" :key="i">
                        <td>{{v.erpClientId | formToEmpty}}</td>
                        <td>{{v.platform | formToEmpty}}</td>
                        <td>{{v.erpAccountName}}</td>
                        <td>{{v.account | formToEmpty}}</td>
                        <td>{{v.country | formToEmpty}}</td>
                        <td>{{v.currency | formToEmpty}}</td>
                        <td>{{v.incomeSale | formToEmpty}}</td>
                        <td>{{v.incomeRefund | formToEmpty}}</td>
                        <td>{{v.incomeReceivable | formToEmpty}}</td>
                        <td>{{v.successFee | formToEmpty}}</td>
                        <td>{{v.freight | formToEmpty}}</td>
                        <td>{{v.storageCharge | formToEmpty}}</td>
                        <td>{{ add(add(v.successFee,v.freight),v.storageCharge) | formToEmpty}}</td>
                        <td>{{v.fees | formToEmpty}}</td>
                        <td>{{v.advertising | formToEmpty}}</td>
                        <td>{{add(v.fees,v.advertising).toFixed(2) | formToEmpty}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import moment from "moment";
import U from "@/common/until/U";
export default {
  name: "receivableReportEdit",
  data() {
    return {
      loading: true,
      add: U.Math.Add,
      data: [],
      year: "",
      month: "",
      generatedTime: ""
    };
  },
  filters: {
    formatToTime(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    },
    formToEmpty(val) {
      return val ? val : "0";
    }
  },
  created() {
    let id = JSON.parse(this.$route.query.id);
    this.year = this.$route.query.year;
    this.month = this.$route.query.month;
    this.generatedTime = this.$route.query.generatedTime;
    axios({
      url: "/erp/accountreceivable/report",
      method: "post",
      data: {
        token: this.token,
        reportid: id
      }
    }).then(res => {
      //   let obj = {
      //     incomeSale: "",
      //     incomeRefund: "",
      //     incomeReceivable: "",
      //     successFee: "",
      //     freight: "",
      //     storageCharge: "",
      //     fees: "",
      //     advertising: ""
      //   };
      let data = {};
      _.each(res, v => {
        let str =
          v.account +
          "-" +
          v.country +
          "-" +
          v.currency +
          "-" +
          v.platform +
          "-" +
          (v.erpAccountName || "");
        if (str in data) {
          data[str].push(v);
        } else {
          data[str] = [v];
        }
      });
      _.each(data, (v, key) => {
        let arr = key.split("-");
        let obj = {
          account: arr[0],
          country: arr[1],
          currency: arr[2],
          platform: arr[3],
          incomeSale: 0,
          incomeRefund: 0,
          incomeReceivable: 0,
          successFee: 0,
          freight: 0,
          storageCharge: 0,
          fees: 0,
          advertising: 0,
          erpAccountName: arr[4]
        };
        let dataObj = v.reduce((accumulator, currentValue) => {
          if (
            currentValue.financialType == "頭程運費" ||
            currentValue.financialType == "尾程運費"
          ) {
            accumulator.freight = this.add(
              accumulator.freight,
              currentValue.amount
            );
          }
          if (
            currentValue.financialType == "倉儲費" ||
            currentValue.financialType == "海外倉儲費"
          ) {
            accumulator.storageCharge = this.add(
              accumulator.storageCharge,
              currentValue.amount
            );
          }
          if (currentValue.financialType == "訂單成交費") {
            accumulator.successFee = this.add(
              accumulator.successFee,
              currentValue.amount
            );
          }
          if (currentValue.financialType == "帳號使用規費") {
            accumulator.fees = this.add(accumulator.fees, currentValue.amount);
          }
          if (currentValue.financialType == "廣告費") {
            accumulator.advertising = this.add(
              accumulator.advertising,
              currentValue.amount
            );
          }
          if (currentValue.financialType == "銷售額") {
            accumulator.incomeSale = this.add(
              accumulator.incomeSale,
              currentValue.amount
            );
          }
          if (currentValue.financialType == "退貨(減項)") {
            accumulator.incomeRefund = this.add(
              accumulator.incomeRefund,
              currentValue.amount
            );
          }
          if (currentValue.financialType == "應收") {
            accumulator.incomeReceivable = this.add(
              accumulator.incomeReceivable,
              currentValue.amount
            );
          }
          return accumulator;
        }, obj);
        this.data.push(dataObj);
      });
      this.loading = false;
    });
  },
  methods: {
    goBack() {
      this.$router.push("/receivableReport");
    }
  }
};
</script>
<style lang="scss" scoped>
#receivableEdit {
  .heade {
    color: #45a2ff;
    & a {
      color: #45a2ff;
      font-size: 16px;
    }
  }
}
table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
}
th {
  padding: 4px;
  text-align: center;
  color: #62717e;
  border-right: 1px solid #ebeef5;
}
td {
  padding: 0px;
  border-top: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  text-align: center;
  background: white;
  color: #62717e;
  font-size: 14px;
  word-break: break-all;
}
caption {
  border-top: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
  height: 60px;
}
.tr {
  text-align: right;
  padding-right: 10px;
}
.mt {
  margin-top: 10px;
}
</style>
