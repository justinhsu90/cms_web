<template>
  <div>
    <ve-line
      :data="chartData"
      :extend="chartExtend"
      :settings="chartSettings"
      width="800px"
    ></ve-line>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";

export default {
  components: {
    VeLine
  },
  data() {
    this.chartExtend = {
      xAxis: {
        axisLabel: {
          rotate: 45
        },
        axisLine: {
          lineStyle: {
            color: "#333"
          }
        },
        offset: 10
      }
    };
    this.chartSettings = {
      xAxisType: "category"
    };
    return {
      show: false,
      chartData: {
        columns: [],
        rows: []
      }
    };
  },
  created() {
    axios({
      url: "/diagram/get",
      method: "get",
      data: {}
    }).then(res => {
      let { data } = res;
      let chartData = {
        columns: [
          "date",
          "BuySomething-Wowcher-英國-銷售額",
          "MagicTrend-Wowcher-英國-銷售額",
          "歷史最高",
          "歷史平均"
        ],
        rows: []
      };
      data.forEach(item => {
        let { xAxis, ydata } = item;
        let obj = {
          date: xAxis,
          "BuySomething-Wowcher-英國-銷售額": "",
          "MagicTrend-Wowcher-英國-銷售額": "",
          歷史最高: "",
          歷史平均: ""
        };
        ydata.forEach(({ name, value }) => {
          obj[name] = value;
        });
        chartData.rows.push(obj);
      });
      this.chartData = chartData;
    });
  }
};
</script>
