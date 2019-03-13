export default {
  filters: {
    formatEmptyText(row, column) {
      return row[column.property] || "—";
    }
  },
  methods: {
    formatEmptyText(row, column) {
      return row[column.property] || "—";
    }
  }
};
