<template>
  <div>
    <el-row>
      <el-col :span="22">
        <el-input
          class="w-max200 ibbox"
          placeholder="搜索"
          v-model="fetchOption.where"
          @keyup.enter.native="handleSearch"
        >
        </el-input>
        <el-select
          class="w-max150"
          placeholder="樣品"
          v-model="searchAccount"
          @change="handleCondition('acc')"
          clearable
        >
          <el-option
            v-for="(v,i) in searchAccountOption"
            :key="'acc'+i"
            :label="v"
            :value="v"
          ></el-option>
        </el-select>
        <el-select
          class="w-max150"
          placeholder="購買"
          v-model="searchLanguage"
          @change="handleCondition('lang')"
          clearable
        >
          <el-option
            v-for="(v,i) in searchLanguageOption"
            :key="'country'+i"
            :label="v.countryCode"
            :value="v.countryNameChinese"
          >
          </el-option>
        </el-select>
        <div
          @click="handleSearch"
          class="el-input-group__append search"
        >
          <i class="el-icon-search"></i>
        </div>
      </el-col>
      <el-col :span="2">
        <el-button
          style="float:right"
          @click="handleAdd"
          type="primary"
        >新增採購需求單</el-button>
      </el-col>
      <el-col class="mt5">
        <el-table
          ref="wonTable"
          :max-height="maxHeight"
          :data="tableData"
          v-loading="isTableLoading"
          @sort-change="handleSortChange"
        >
          <!-- <el-table-column min-width="75" label="更新時間" prop="lastUpdatedTime" sortable="custom"></el-table-column> -->
          <el-table-column
            min-width="90"
            label="新增時間"
            prop="queryTime"
          ></el-table-column>
          <el-table-column
            min-width="70"
            label="採購需求單號"
            prop="purchaseQueryId"
          ></el-table-column>
          <!-- <el-table-column min-width="75" label="對應採購單號" prop="purchaseId"></el-table-column> -->
          <el-table-column
            min-width="50"
            label="採購類型"
            prop="purchaseType"
          ></el-table-column>
          <el-table-column
            min-width="50"
            label="採購數量"
            prop="queryQuantity"
          ></el-table-column>
          <el-table-column
            min-width="90"
            label="SKU"
            prop="sku"
          ></el-table-column>
          <el-table-column
            min-width="150"
            label="產品名稱"
            prop="productName"
          ></el-table-column>
          <!-- <el-table-column min-width="" label="產品規格" prop="productSpec"></el-table-column> -->
          <!-- <el-table-column min-width="75" label="新增人" prop="addedBy"></el-table-column> -->
          <!-- <el-table-column min-width="75" label="最後編輯" prop="lastModifiedBy"></el-table-column> -->
          <el-table-column
            min-width="60"
            label="備註"
            prop="note"
          ></el-table-column>
          <el-table-column
            min-width="50"
            label="已購買"
            prop="enable"
          >
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.isPurchased"
                type="success"
              >true</el-tag>
              <el-tag
                v-else
                type="info"
              >false</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            label="動作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                class="btnh"
                type="text"
                title="删除"
                icon="el-icon-won-22"
                @click="handleDelete(scope.row)"
              ></el-button>
              <el-button
                class="btnh"
                type="text"
                title="編輯"
                icon="el-icon-won-1"
                @click="handleEdit(scope.row)"
              ></el-button>
              <el-button
                class="btnh"
                type="text"
                title="複製"
                icon="el-icon-won-124"
                @click="handleCopy(scope.row)"
              ></el-button>
              <el-button
                class="btnh"
                type="text"
                title="轉採購單"
                icon="el-icon-won-139"
                @click="handleTransfer(scope.row)"
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

export default {
  extends: wonTableContainer,
  data() {
    return {
      tableData: [],
      maxHeight: 450,
      condition: ["2"],
      isTableLoading: false,
      searchAccount: "",
      searchAccountOption: [],
      searchLanguage: 2,
      searchLanguageOption: [
        { countryCode: "是", countryNameChinese: 1 },
        { countryCode: "否", countryNameChinese: 2 }
      ],
      fetchCondition: {
        skip: 0,
        limit: 20,
        order: "-lastUpdatedTime"
      },
      fetchOption: {
        url: "/erp/purchasequery/search",
        method: "post",
        where: ""
      }
    };
  },
  created() {
    let account = axios({
      url: "/erp/purchasequery/value/purchasetype",
      method: "post",
      data: {
        token: this.token
      }
    });
    Promise.all([account]).then(([account]) => {
      this.searchAccountOption = _.cloneDeep(account.data);
      this.handleSearch();
    });
    this.Bus.$on("refresh", this.handleSearch);
  },
  methods: {
    handleSearch: _.debounce(function() {
      let data = {
        where: this.fetchOption.where,
        token: this.token,
        skip: this.fetchCondition.skip,
        limit: this.fetchCondition.limit
      };
      if (this.condition.includes("1")) {
        data.purchaseType = this.searchAccount;
      }
      if (this.condition.includes("2")) {
        if (this.searchLanguage == 2) {
          data.isPurchased = 0;
        } else {
          data.isPurchased = this.searchLanguage;
        }
      }
      this.fetchTableData(data);
    }, 500),
    handleEdit(val) {
      this.$router.push({
        name: "purchaEdit",
        query: { data: JSON.stringify(val) }
      });
    },
    handleDelete(val) {
      this.$confirm("是否删除", "提示", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            url: "erp/purchasequery/delete",
            method: "post",
            data: {
              purchaseQueryId: val.purchaseQueryId,
              token: this.token
            }
          }).then(() => {
            this.handleSearch();
            this.$message.success("删除成功");
          });
        })
        .catch(() => {});
    },
    handleTransfer(val) {
      this.$router.push({
        path: "/erpPurchaseAdd",
        query: { data: JSON.stringify(val), transfer: "transfer" }
      });
    },
    handleAdd() {
      this.$router.push("/purchaAdd");
    },
    handleCopy(row) {
      this.$router.push({
        path: "/purchaAdd",
        query: { data: JSON.stringify(row), copy: "copy" }
      });
    },
    handleCondition(sign) {
      if (sign == "acc") {
        if (!this.searchAccount) {
          _.pull(this.condition, "1");
        } else {
          if (!this.condition.includes("1")) {
            this.condition.push("1");
          }
        }
      }
      if (sign == "lang") {
        if (!this.searchLanguage) {
          _.pull(this.condition, "2");
        } else {
          if (!this.condition.includes("2")) {
            this.condition.push("2");
          }
        }
      }
      this.handleSearch();
    }
  }
};
</script>
