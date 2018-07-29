<script>
export default {
  data() {
    return {
      currentPage: 4,
      total: 10,
      fetchOption: {
        url: "",
        where: "",
        method: "get"
      },
      fetchCondition: {
        skip: 0,
        limit: 10,
        order: "created"
      },
      isTableLoading: true,
      pageSizes: [10, 20, 50, 100, 200],
      layout: "total, sizes, prev, pager, next, jumper"
    };
  },
  watch: {
    "fetchOption.where"() {
      this.handleSearch();
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.maxHeight = document.scrollingElement.clientHeight - this.$refs.wonTable.$el.getBoundingClientRect().top - 52;
      this.$refs.wonTable.$el.style.maxHeight = this.maxHeight +'px';
    })
  },
  methods: {
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
    }
    // fetchTableData() {
    //   this.isTableLoading = true;
    //   axios({
    //     url: this.fetchOption.url,
    //     method:this.fetchOption.method,
    //     data: {
    //       where: this.fetchOption.where,
    //       token: this.token,
    //       skip:  this.fetchCondition.skip,
    //       limit: this.fetchCondition.limit,
    //       order: this.fetchCondition.order
    //     }
    //   }).then((res) => {
    //     this.isTableLoading = false;
    //     this.tableData = this.loadsh.cloneDeep(res.data);
    //     this.total = res.count;

    //   });
    // }
  }
};
</script>