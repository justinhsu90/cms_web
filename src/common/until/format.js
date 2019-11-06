import accounting from "accounting";
import moment from "moment";
export const format = {
  formatToPercent(row, column, cellValue) {
    return (cellValue * 100).toFixed(2) + "%";
  },
  formatToYuan(row, column, cellValue) {
    return cellValue.toFixed(2);
  },
  formatToMoney(value) {
    let data =
      accounting.formatMoney(value, {
        symbol: ""
      }) || "0";
    if (data == "0.00") {
      return "0";
    }
    return data;
  },
  formatToTime(val) {
    return moment(val).format("YYYY-MM-DD HH:mm:ss");
  }
};
