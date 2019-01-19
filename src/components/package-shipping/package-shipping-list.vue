<template>
    <div>
        <el-row>
            <el-col :span="22">
                <el-input class="w-max200" placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch">
                </el-input>
                <el-date-picker class="w-max180" clearable @change="handleChange" value-format="yyyy-MM-dd" v-model="date" type="daterange" align="right" unlink-panels range-separator="~" start-placeholder="開始日期" end-placeholder="結束日期" :picker-options="pickerOptions">
                </el-date-picker>
                <div @click="handleSearch" class="el-input-group__append search">
                    <i class="el-icon-search"></i>
                </div>
            </el-col>
            <!-- <el-col :span="2">
                <el-button style="float:right" @click="handleAdd" type="primary">新增入庫單</el-button>
            </el-col> -->
            <el-col :span="2">
                <el-button type="success" size="medium" @click="showImg = !showImg">{{showImg ? '隱藏':'顯示'}}圖片</el-button>
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                    <el-table-column min-width="150" label="商品名稱" prop="productName"></el-table-column>
                    <el-table-column min-width="100" label="商品中文名稱" prop="productNameChinese" :formatter="formatToTime"></el-table-column>
                    <el-table-column min-width="60" label="SKU" prop="sku"></el-table-column>
                    <el-table-column min-width="50" label="包裹重量" prop="parcelWeight">
                        <template slot-scope="{row}">
                              <span>{{row.parcelWeight}}{{row.parceWeightUnit}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="40" label="運輸費用" prop="shippingFee">
                        <template slot-scope="{row}">
                              <span>{{row.shippingFee}}{{row.shippingFeeCurrency}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="60" label="開始時間" prop="startDate" align="center" :formatter="formatToTime"></el-table-column>
                    <el-table-column min-width="60" label="結束時間" prop="endDate" align="center" :formatter="formatToTime"></el-table-column>
                    <el-table-column min-width="50" label="圖片" v-if="showImg">
                        <template slot-scope="{row}">
                              <img  style="maxWidth:50px;maxHeight:50px" :src="row.imageUrl" alt="" @click="handleClick(row)">
                        </template>
                    </el-table-column>
                    <!-- <el-table-column width="50" label="動作" align="center">
                        <template slot-scope="scope">
                            <el-button class="btnh" type="text" title="編輯" icon="el-icon-won-1" @click="handleEdit(scope.row)"></el-button>
                        </template>
                    </el-table-column> -->
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
import showDialog from "won-service/component/won-dialog/dialog";
export default {
  extends: wonTableContainer,
  data() {
    return {
      date: [],
      showImg: true,
      condition: [],
      isTableLoading: false,
      fetchCondition: {
        skip: 0,
        limit: 10000,
        order: "-lastUpdatedTime"
      },
      fetchOption: {
        url: "/shipmentFee/search",
        method: "post",
        where: ""
      }
    };
  },
  created() {
    this.handleSearch();
    this.Bus.$on("refresh", this.handleSearch);
  },
  methods: {
    handleClick(row) {
      showDialog(
        {
          render(h) {
            return h("img", {
              attrs: {
                src: row.imageUrl,
                width: "100%"
              }
            });
          }
        },
        {
          title: "圖片"
        }
      );
    },
    handleChange() {
      this.handleSearch();
    },
    handleSearch: _.debounce(function() {
      this.isTableLoading = true;
      let data = {
        where: this.fetchOption.where,
        token: this.token,
        skip: this.fetchCondition.skip,
        limit: this.fetchCondition.limit,
        order: this.fetchCondition.order
      };
      if (!_.isEmpty(this.date)) {
        data.startDate = this.date[0];
        data.endDate = this.date[1];
      }
      this.fetchTableData(data);
    }, 500),
    handleEdit(val) {
      this.$router.push({
        name: "put-storage-edit",
        query: { data: JSON.stringify(val) }
      });
    },
    handleAdd() {
      this.$router.push("/putStorageAdd");
    }
  }
};
</script>
