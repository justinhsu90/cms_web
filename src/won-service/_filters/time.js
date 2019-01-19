import moment from "moment";
export default {
  filters: {
    formatToTime(row, col) {
      if (!row[col.property]) {
        return "--";
      }
      return moment(row[col.property]).format("YYYY-MM-DD HH:mm:ss");
    },
    formatToDate(row, col) {
      if (!row[col.property]) {
        return "--";
      }
      return moment(row[col.property]).format("YYYY-MM-DD");
    }
  },
  methods: {
    formatToTime(row, col) {
      if (!row[col.property]) {
        return "--";
      }
      return moment(row[col.property]).format("YYYY-MM-DD HH:mm:ss");
    },
    formatToDate(row, col) {
      if (!row[col.property]) {
        return "--";
      }
      return moment(row[col.property]).format("YYYY-MM-DD");
    }
  }
};
