

<script>
import moment from "moment";
import U from "@/common/until/U";
import wonPagination from './wonPagination'
export default {
    components:{
        wonPagination
    },
    data() {
        return {
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            },
            setMaxHeight: true,
            currentPage: 1,
            total: 15,
            maxHeight: 450,
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
            layout: "total, sizes, prev, pager, next, jumper",
            paginationProps:{
                total:15,
                currentPage:1,
                pageSizes:[15, 30, 45, 100, 200],
                layout:"total, sizes, prev, pager, next, jumper",
            }
        };
    },
    watch: {
        "fetchOption.where":{
            handler: 'handleSearch',
            immediate: true
        },
        total(n, o) {
            if (_.isEmpty(this.tableData) && n > 0) {
                this.fetchCondition.skip = 0;
                this.handleSearch();
            }
        },
        'paginationProps.total'(n, o) {
            if (_.isEmpty(this.tableData) && n > 0) {
                this.fetchCondition.skip = 0;
                this.handleSearch();
            }
        }
    },
    created(){
        this.paginationListeners = {
            'size-change':this.handleSizeChange,
            'current-change':this.handleCurrentChange
        }
    },  
    mounted() {
        if (this.setMaxHeight) {
            this.$nextTick(() => {
                try {
                    if (!this.$refs.wonTable) {
                        return;
                    }
                    this.maxHeight =
                        document.scrollingElement.clientHeight -
                        this.$refs.wonTable.$el.getBoundingClientRect().top -
                        60;
                    this.$refs.wonTable.$el.style.maxHeight =
                        this.maxHeight + "px";
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
                } catch (e) {}
            });
        }
    },
    filters: {
        formatToTime(row, col) {
            return moment(row[col.property]).format("YYYY-MM-DD HH:mm:ss");
        },
        formatToDate(row, col) {
            return moment(row[col.property]).format("YYYY-MM-DD");
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
        formatToDate(row, col) {
            return moment(row[col.property]).format("YYYY-MM-DD");
        },
        formatToTime(row, col) {
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
        rowKey(row){
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
        saveFile(url, filename) {
            var save_link = document.createElementNS(
                "http://www.w3.org/1999/xhtml",
                "a"
            );
            save_link.href = url;
            save_link.download = filename;
            save_link.target = "_blank";

            var event = document.createEvent("MouseEvents");
            event.initMouseEvent(
                "click",
                true,
                false,
                window,
                0,
                0,
                0,
                0,
                0,
                false,
                false,
                false,
                false,
                0,
                null
            );
            save_link.dispatchEvent(event);
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