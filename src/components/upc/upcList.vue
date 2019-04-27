<template>
  <div id="upc">
    <el-row>
      <el-col :span="24">
        <el-input
          class="w-max200"
          placeholder="搜索"
          v-model="fetchOption.where"
          @keyup.enter.native="handleSearch"
        >
        </el-input>
        <div
          @click="handleSearch"
          class="el-input-group__append search ml0"
        >
          <i class="el-icon-search"></i>
        </div>
        <el-popover
          ref="popover"
          placement="top-start"
          width="200"
          trigger="hover"
          content="剩餘 UPC 數量"
        >
          <el-button
            slot="reference"
            class="radius"
          >?</el-button>
        </el-popover>
        <el-button
          class="f-r ml10"
          size="small"
          @click="handleAdd"
          type="primary"
        >指派 UPC</el-button>
        <el-button
          class="f-r"
          size="small"
          @click="handleMore"
          type="primary"
        >批量指派 UPC</el-button>
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
            min-width="80"
            label="EAN (UPC)"
            prop="ean"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="180"
            label="對應SKU"
            prop="subSku"
            sortable="custom"
          ></el-table-column>
          <!-- <el-table-column
                        min-width="200"
                        label="產品名稱"
                        prop="productName"
                        sortable="custom"
                    ></el-table-column> -->
          <el-table-column
            min-width="70"
            label="平台"
            prop="platform"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="50"
            label="國家"
            prop="country"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="90"
            label="帳號"
            prop="account"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            width="70"
            label="動作"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                class="btnh"
                type="text"
                title="編輯"
                icon="el-icon-won-1"
                @click="handleEdit(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <won-pagination
        v-bind="paginationProps"
        v-on="paginationListeners"
      >
      </won-pagination>
    </el-row>
  </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
import showDialog from "won-service/component/won-dialog/dialog";
import upcMore from "./upcMore";
export default {
  extends: wonTableContainer,
  data() {
    return {
      condition: [],
      searchAccount: "",
      searchAccountOption: [],
      searchCountry: "",
      searchCountryOption: [],
      searchOrderstatus: "",
      searchOrderstatusOption: [],
      searchOrdertype: "",
      searchOrdertypeOption: [],
      isTableLoading: false,
      fetchCondition: {
        skip: 0,
        limit: 20,
        order: "-lastUpdatedTime"
      },
      fetchOption: {
        url: "/upc/search",
        where: "",
        method: "post"
      }
    };
  },
  created() {
    this.Bus.$on("refresh", this.handleSearch);
    this.handleSearch();
  },
  methods: {
    handleCondition(sign) {
      if (sign == "acc") {
        if (!this.searchAccount) {
          _.pull(this.condition, "1");
        } else {
          this.condition.push("1");
        }
      }
      if (sign == "cou") {
        if (!this.searchCountry) {
          _.pull(this.condition, "3");
        } else {
          this.condition.push("3");
        }
      }
      this.handleSearch();
    },
    handleMore() {
      showDialog(upcMore, {
        title: "批量指派UPC"
      });
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
      this.fetchTableData(data);
    }, 2000),
    handleEdit(val) {
      this.$router.push({
        name: "upcEdit",
        query: { data: JSON.stringify(val) }
      });
    },
    handleAdd() {
      this.$router.push("/upcAdd");
    },
    handleCheck(val) {
      this.$router.push({
        name: "/upcList",
        query: { data: JSON.stringify(val) }
      });
    }
  }
};
</script>
