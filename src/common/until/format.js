import accounting from 'accounting'
export const format = {
  formatToPercent(row, column, cellValue) {
    return (cellValue * 100).toFixed(2) + "%"
  },
  formatToYuan(row, column, cellValue) {
    return cellValue.toFixed(2)
  },
  formatToMoney(value) {
    let data = accounting.formatMoney(value, {
      symbol: ""
    }) || "";
    if (data == '0.00') {
      return ""
    }
    return data
  }
}
