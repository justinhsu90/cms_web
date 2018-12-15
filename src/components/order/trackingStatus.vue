<template>
    <div id="edit">
      <div class="heade">
            <i class="el-icon-arrow-left"></i>
            <a href="javascript:void(0)" @click="goBack">返回</a>
        </div>
          <br>
               <el-table ref="wonTable"  :data="tableData" v-loading="isTableLoading" >   
                 <el-table-column min-width="20" label="流水號" prop="index" ></el-table-column>
                 <el-table-column min-width="80" label="地點" prop="location" ></el-table-column>
                 <el-table-column min-width="100" label="狀態" prop="status" ></el-table-column>
                 <el-table-column min-width="75" label="時間" prop="time" ></el-table-column>
        </el-table> 
    </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      isTableLoading: false,
      fetchOption: {
        url: "/wowcher/order/track",
        where: "",
        method: "post"
      }
    };
  },
  created() {
    this.handleSearch();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    handleSearch() {
      (this.isTableLoading = true),
        axios({
          url: this.fetchOption.url,
          method: this.fetchOption.method,
          data: {
            token: this.token,
            trackingnumber: this.$route.query.id
          }
        }).then(({ data: { trackList } }) => {
          this.tableData = _.cloneDeep(trackList);
          this.isTableLoading = false;
        });
    }
  }
};
</script>

<style scoped>
.el-table th {
  color: #62717e;
  background: rgb(237, 241, 245);
  text-align: center;
}
#edit .heade {
  font-size: 16px;
  color: #45a2ff;
}
#edit .heade a {
  color: #45a2ff;
}
</style>
