export default {
  filters: {
    formatToYuan(row, column, cellValue) {
      if (cellValue) {
        return cellValue.toFixed(2);
      } else {
        return row.toFixed(2);
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
    }
  }
};
