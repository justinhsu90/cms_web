export default {
  filters: {
    formatToYuan(row, column, cellValue) {
      if (cellValue) {
        return cellValue.toFixed(2);
      } else {
        return row.toFixed(2);
      }
    },
    formatToUnit(row, column, cellValue) {
      let value = cellValue || row;
      switch (value) {
        case "EUR":
          return "€";
        case "GBP":
          return "£";
        case "USD":
          return "$";
        case "RMB":
          return "¥";
      }
    }
  },
  methods: {
    formatToYuan(row, column, cellValue) {
      if (cellValue) {
        return cellValue.toFixed(2);
      } else {
        return row.toFixed(2);
      }
    },
    formatToUnit(row, column, cellValue) {
      let value = cellValue || row;
      switch (value) {
        case "EUR":
          return "€";
        case "GBP":
          return "£";
        case "USD":
          return "$";
        case "RMB":
          return "¥";
      }
    }
  }
};
