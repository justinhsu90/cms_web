<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-input class="ibbox w-max200" placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch">
                </el-input>
                <div  @click="handleSearch" class="el-input-group__append search">
                    <i class="el-icon-search"></i>
                </div>
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                    <el-table-column min-width="110" label="簽收流水號" prop="id" ></el-table-column>
                    <el-table-column min-width="120" label="簽收時間" prop="addedTime" :formatter="formatToTime"></el-table-column>
                    <el-table-column min-width="150" label="物流單號" prop="trackingNumber"></el-table-column>
                    <el-table-column min-width="110" label="簽收箱數" prop="quan" ></el-table-column>
                    <el-table-column min-width="150" label="物流單號" prop="trackingNumber"></el-table-column>
                    <el-table-column min-width="150" label="快遞/物流" prop="logistic"></el-table-column>
                    <!-- <el-table-column width="120" label="圖片" prop="imageUrl" algin="center">
                      <template slot-scope="{row}">
                          <img :src="row.imageUrl" width="100" alt="">
                      </template>
                    </el-table-column> -->
                    <el-table-column width="80" algin="center" label="詳情">
                      <template slot-scope="{row}">
                          <el-button icon="el-icon-won-40" @click="handleClick(row)" type="text" title="查看"></el-button>
                      </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <won-pagination v-bind="paginationProps" v-on="paginationListeners">
            </won-pagination>
        </el-row>
    </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
export default {
  extends: wonTableContainer,
  data() {
    return {
      fetchCondition: {
        skip: 0,
        limit: 20
      },
      fetchOption: {
        url: "/gzwarehouse/search",
        method: "post",
        where: ""
      }
    };
  },
  created() {
    this.handleSearch();
  },
  methods: {
    handleClick(row) {
      this.$router.push({
        name: "gzwarehouseAdd",
        params: {
          id: row.id
        },
        query: {
          data: JSON.stringify(row)
        }
      });
    },
    handleSearch: _.debounce(function() {
      this.isTableLoading = true;
      let data = {
        where: this.fetchOption.where,
        token: this.token,
        skip: this.fetchCondition.skip,
        limit: this.fetchCondition.limit
      };
      this.fetchTableData(data);
    }, 2000),
    handleLook() {
      this.$router.push("/gzwarehouseAdd");
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
</style>
