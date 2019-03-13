

<script>
import wonPagination from "./wonPagination";
import money from "won-service/_filters/money";
import time from "won-service/_filters/time";
import percent from "won-service/_filters/percent";
import empty from "won-service/_filters/empty";
import saveFile from "won-service/_mixins/save-file";
import wonToolbar from "won-service/component/won-toolbar";
export default {
  mixins: [money, time, percent, saveFile, empty],
  components: {
    wonPagination,
    wonToolbar
  },
  data() {
    return {
      tableData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      currentPage: 1,
      total: 20,
      maxHeight: 450,
      fetchOption: {
        url: "",
        where: "",
        method: "get"
      },
      fetchCondition: {
        skip: 0,
        limit: 20,
        order: "created"
      },
      isTableLoading: true,
      pageSizes: [20, 50, 100],
      layout: "total, sizes, prev, pager, next, jumper",
      paginationProps: {
        total: 20,
        currentPage: 1,
        pageSizes: [20, 50, 100],
        layout: "total, sizes, prev, pager, next, jumper"
      }
    };
  },
  watch: {
    "fetchOption.where": {
      handler: "handleSearch",
      immediate: true
    },
    total(n) {
      if (_.isEmpty(this.tableData) && n > 0) {
        this.fetchCondition.skip = 0;
        this.handleSearch();
      }
    },
    "paginationProps.total"(n) {
      if (_.isEmpty(this.tableData) && n > 0) {
        this.fetchCondition.skip = 0;
        this.handleSearch();
      }
    }
  },
  created() {
    this.paginationListeners = {
      "size-change": this.handleSizeChange,
      "current-change": this.handleCurrentChange
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.$refs.wonTable) return;
      this.maxHeight =
        document.scrollingElement.clientHeight -
        this.$refs.wonTable.$el.getBoundingClientRect().top -
        60;
      window.addEventListener(
        "resize",
        _.debounce(() => {
          if (!this.$refs.wonTable) return;
          this.maxHeight =
            document.scrollingElement.clientHeight -
            this.$refs.wonTable.$el.getBoundingClientRect().top -
            60;
        }, 500)
      );
    });
  },
  methods: {
    rowKey(row) {
      return row.sku;
    },
    handleSizeChange(size) {
      this.fetchCondition.limit = size;
      this.handleSearch();
    },
    handleCurrentChange(current) {
      this.fetchCondition.skip = current - 1;
      this.handleSearch();
    },
    handleSortChange(row) {
      if (row.order == "ascending") {
        this.fetchCondition.order = "-" + row.prop;
      } else {
        this.fetchCondition.order = row.prop;
      }
      this.handleSearch();
    },
    fetchTableData(data) {
      this.isTableLoading = true;
      axios({
        url: this.fetchOption.url,
        method: this.fetchOption.method,
        data
      }).then(res => {
        this.isTableLoading = false;
        let { data, count } = res;
        this.originRes = res;
        this.tableData = _.cloneDeep(data);
        this.paginationProps.total = count;
        this.fetchEnd && this.fetchEnd();
      });
    }
  }
};
</script>
