<script>
export default {
  data(){
      return {
          currentPage: 4,
          total:10,
          fetchOption:{
              url:'',
              where:'',
              method:'get',
          },
          fetchCondition:{
              skip:0,
              limit:10,
              order:'created'
          },
         isTableLoading:true,
         pageSizes:[10,20,30,40],
         layout:'total, sizes, prev, pager, next, jumper'
      }
  }, 
  methods: {
    handleSizeChange(size){
        this.fetchCondition.limit = size;
        this.fetchTableData();
    },
    handleCurrentChange(current){
       this.fetchCondition.skip = current-1; 
       this.fetchTableData();
    },
     handleSortChange(row) {
         
      if (row.order == "ascending") {
        this.fetchCondition.order = '-'+row.prop;
      } else {
        this.fetchCondition.order = row.prop;
      }
      this.fetchTableData();
    },
    fetchTableData() {
      this.isTableLoading = true;
      this.axios({
        url: this.fetchOption.url,
        method:this.fetchOption.method,
        data: {
          where: this.fetchOption.where,
          token: this.token,
          skip:  this.fetchCondition.skip,
          limit: this.fetchCondition.limit,
          order: this.fetchCondition.order
        }
      }).then((res) => {
        this.isTableLoading = false;
        this.tableData = this.loadsh.cloneDeep(res.data);
        this.total = res.count;
        
      });
    }
  }
};
</script>