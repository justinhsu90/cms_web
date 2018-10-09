
<script>
export default {
    data() {
        return {
            setMaxHeight: true,
            currentPage: 1,
            total: 15,
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
            pageSizes: [15, 30, 45, 100, 200],
            layout: "total, sizes, prev, pager, next, jumper"
        };
    },
    watch: {
        "fetchOption.where"() {
            this.handleSearch();
        }
    },
    mounted() {
        if (this.setMaxHeight) {
            this.$nextTick(() => {
                this.maxHeight =
                    document.scrollingElement.clientHeight -
                    this.$refs.wonTable.$el.getBoundingClientRect().top -
                    60;
                this.$refs.wonTable.$el.style.maxHeight = this.maxHeight + "px";
                let that = this;
                window.addEventListener(
                    "resize",
                    _.debounce(() => {
                        that.maxHeight =
                            document.scrollingElement.clientHeight -
                            that.$refs.wonTable.$el.getBoundingClientRect()
                                .top -
                            60;
                        that.$refs.wonTable.$el.style.maxHeight =
                            that.maxHeight + "px";
                    }, 500)
                );
            });
        }
    },
    filters: {
        formatToTime(row,col) {
            return this.moment(row[col.property]).format("YYYY-MM-DD HH:mm:ss");
        },
        formatToPercent(row, column, cellValue) {
            return (cellValue * 100).toFixed(2) + "%";
        },
        formatToYuan(row, column, cellValue) {
            if (cellValue) {
                return cellValue.toFixed(2);
            } else {
                return row.toFixed(2);
            }
        }
    },
    methods: {
        formatToTime(row,col) {
            return this.moment(row[col.property]).format("YYYY-MM-DD HH:mm:ss");
        },
        formatToPercent(row, column, cellValue) {
            return (cellValue * 100).toFixed(2) + "%";
        },
        formatToYuan(row, column, cellValue) {
            if (cellValue) {
                return cellValue.toFixed(2);
            } else {
                return row.toFixed(2);
            }
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