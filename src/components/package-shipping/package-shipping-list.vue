<template>
  <div>
    <el-row>
      <el-col :span="22">
        <el-input
          class="w-max200"
          placeholder="搜索"
          v-model="fetchOption.where"
          @keyup.enter.native="handleSearch"
        >
        </el-input>
        <el-date-picker
          class="w-max220"
          clearable
          @change="handleChange"
          value-format="yyyy-MM-dd"
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="~"
          start-placeholder="開始日期"
          end-placeholder="結束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
        <div
          @click="handleSearch"
          class="el-input-group__append search"
        >
          <i class="el-icon-search"></i>
        </div>
      </el-col>
      <el-col :span="2">
        <el-button
          type="success"
          size="medium"
          @click="showImg = !showImg"
        >{{showImg ? '隱藏':'顯示'}}圖片</el-button>
      </el-col>
      <el-col class="mt5">
        <el-table
          ref="wonTable"
          :max-height="maxHeight"
          :data="tableData"
          v-loading="isTableLoading"
          @sort-change="handleSortChange"
        >
          <el-table-column
            min-width="150"
            label="商品名稱"
            prop="productName"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="100"
            label="商品中文名稱"
            prop="productNameChinese"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="60"
            label="SKU"
            prop="sku"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="80"
            label="海外倉發貨"
            prop="overseaWarehouse"
            align="center"
          >
            <template slot-scope="{row}">
              <el-tag
                type="success"
                v-if="row.overseaWarehouse"
              >true</el-tag>
              <el-tag
                type="info"
                v-else
              >false</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            min-width="60"
            label="目的地"
            prop="country"
            align="center"
            sortable="custom"
          ></el-table-column>

          <el-table-column
            min-width="60"
            label="包裹重量"
            prop="parcelWeightAVG"
            sortable="custom"
          >
            <template slot-scope="{row}">
              <span>{{row.parcelWeightAVG}} {{row.parceWeightUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column
            min-width="60"
            label="運輸費用"
            prop="shippingFeeAVG"
            sortable="custom"
          >
            <template slot-scope="{row}">
              <span>{{row.shippingFeeAVG}} {{row.shippingFeeCurrency}}</span>
            </template>
          </el-table-column>
          <el-table-column
            min-width="60"
            label="開始時間"
            prop="startDate"
            align="center"
            :formatter="formatToDate"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="60"
            label="結束時間"
            prop="endDate"
            align="center"
            :formatter="formatToDate"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="50"
            label="圖片"
            v-if="showImg"
          >
            <template slot-scope="{row}">
              <img
                style="maxWidth:50px;maxHeight:50px"
                :src="row.imageUrl"
                alt=""
                @click="handleClick(row)"
              >
            </template>
          </el-table-column>
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
  components: {},
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
          hideConfirm: true,
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
    }, 500)
  }
};
</script>
