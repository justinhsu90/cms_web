<template>
<div style="width:80%">
  <ve-line :data="chartData" :extend="chartExtend" :settings="chartSettings" width="800px"></ve-line>
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
        offset: 5
      }
    };
    this.chartSettings = {
      xAxisType: "time"
    };
    return {
      chartData: {
        columns: ["日期", "访问用户", "下单用户"],
        rows: [
          { 日期: "2018-01-01", 访问用户: 1393, 下单用户: 1093 },
          { 日期: "2018-01-02", 访问用户: 3530, 下单用户: 3230 },
          { 日期: "2018-01-03", 访问用户: 2923, 下单用户: 2623 },
          { 日期: "2018-01-05", 访问用户: 1723, 下单用户: 1423 },
          { 日期: "2018-01-10", 访问用户: 3792, 下单用户: 3492 },
          { 日期: "2018-01-18", 访问用户: 4593, 下单用户: 4293 },
          { 日期: "2018-01-19", 访问用户: 4593, 下单用户: 4293 },
          { 日期: "2018-01-20", 访问用户: 4593, 下单用户: 4293 },
          { 日期: "2018-01-21", 访问用户: 4593, 下单用户: 4293 },
          { 日期: "2018-01-22", 访问用户: 4593, 下单用户: 4293 },
          { 日期: "2018-01-23", 访问用户: 4593, 下单用户: 4293 },
          { 日期: "2018-01-24", 访问用户: 4593, 下单用户: 4293 }
        ]
      }
    };
  }
};
</script>
