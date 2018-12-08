export default {
  filters: {
    formatToPercent(row, column, cellValue) {
      return (cellValue * 100).toFixed(2) + "%";
    },
  },
  methods: {
    formatToPercent(row, column, cellValue) {
      return (cellValue * 100).toFixed(2) + "%";
    }
  }
}
