<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-input
          class="w-max200 ibbox"
          placeholder="搜索"
          v-model="fetchOption.where"
          @keyup.enter.native="handleSearch"
        >
        </el-input>
        <el-select
          class="w-max150"
          placeholder="帳號"
          v-model="searchAccount"
          @change="handleCondition('acc')"
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
          placeholder="國家"
          v-model="searchCountry"
          @change="handleCondition('cou')"
        >
          <el-option
            v-for="(v,i) in searchCountryOption"
            :key="'country'+i"
            :label="v"
            :value="v"
          >
          </el-option>
        </el-select>
        <el-checkbox
          :value="replenishment"
          @input="replenishment = $event ,handleSearch()"
        >
          需補貨
        </el-checkbox>
        <div
          @click="handleSearch"
          class="el-input-group__append search"
        >
          <i class="el-icon-search"></i>
        </div>
        <div class="fr">
          <el-checkbox-group
            size="medium"
            v-model="checkbox"
          >
            <el-checkbox-button :label="2">圖片</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </el-col>
      <el-col class="mt5">
        <el-table
          ref="wonTable"
          :max-height="maxHeight"
          :data="tableData"
          @sort-change="handleSortChange"
          v-loading="isTableLoading"
        >
          <el-table-column
            min-width="30"
            label="流水號"
          >
            <template slot-scope="scope">
              {{scope.$index++}}
            </template>
          </el-table-column>
          <!-- <el-table-column
            min-width="100"
            label="國家"
            prop="country"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="100"
            label="帳號"
            prop="account"
            sortable="custom"
          ></el-table-column> -->
          <el-table-column
            min-width="90"
            label="SKU"
            prop="sku"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="120"
            label="品名"
            prop="productName"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="70"
            label="可售庫存"
            prop="currentStock"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="70"
            label="銷售天數"
            prop="estimatedSaleDays"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="70"
            label="建議補貨數量"
            prop="restockQuantity"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="60"
            label="7天銷量"
            prop="sold7days"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="60"
            label="15天銷量"
            prop="sold15days"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="60"
            label="30天銷量"
            prop="sold30days"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            width="80"
            label="圖片"
            v-if="checkbox.includes(2)"
          >
            <template slot-scope="{row}">
              <img
                width="50"
                height="50"
                style="cursor:pointer"
                :src="row.imageUrl"
                @click="handleShowDialog(row.imageUrl)"
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <won-pagination
        v-bind="paginationProps"
        v-on="paginationListeners"
      >
      </won-pagination>
      <el-dialog
        title="圖片"
        :modal="false"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <img
          width="100%"
          :src="imageURL"
        >
      </el-dialog>
    </el-row>
  </div>
</template>
      <script>
import wonTableContainer from "@/common/wonTableContainer";
export default {
  extends: wonTableContainer,
  data() {
    return {
      dialogVisible: false,
      replenishment: true,
      imageURL: "",
      checkbox: [],
      tableData: [],
      condition: ["1", "3"],
      searchAccount: "DalTech",
      searchAccountOption: ["DalTech"],
      searchCountry: "CA",
      searchCountryOption: ["CA"],
      isTableLoading: false,
      fetchCondition: {
        skip: 0,
        limit: 15
      },
      fetchOption: {
        url: "amazon/restock/count",
        where: "",
        method: "post"
      }
    };
  },
  created() {
    let account = axios({
      url: "/amazon/value/account",
      method: "post",
      data: {
        token: this.token
      }
    });
    let country = axios({
      url: "/amazon/value/country",
      method: "post",
      data: {
        token: this.token
      }
    });

    Promise.all([account, country]).then(([account, country]) => {
      this.searchAccountOption = account;
      this.searchCountryOption = country;
    });
  },
  methods: {
    handleShowDialog(url) {
      this.dialogVisible = true;
      this.imageURL = url;
    },
    handleSortChange(row) {
      if (row.order == "ascending") {
        this.tableData = _.orderBy(this.tableData, [`${row.prop}`], ["asc"]);
      }
      if (row.order == "descending") {
        this.tableData = _.orderBy(this.tableData, [`${row.prop}`], ["desc"]);
      }
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

      if (sign == "cou") {
        if (!this.searchCountry) {
          _.pull(this.condition, "3");
        } else {
          if (!this.condition.includes("3")) {
            this.condition.push("3");
          }
        }
      }
      this.handleSearch();
    },
    handleSearch: _.debounce(function() {
      this.isTableLoading = true;
      let data = {
        where: this.fetchOption.where,
        token: this.token,
        skip: this.fetchCondition.skip,
        limit: this.fetchCondition.limit
      };
      if (this.condition.includes("1")) {
        data.account = this.searchAccount;
      }

      if (this.condition.includes("3")) {
        data.country = this.searchCountry;
      }

      if (this.replenishment) {
        data.restock = true;
      }
      this.fetchTableData(data);
    }, 500),
    handleEdit(val) {
      this.$router.push({
        name: "wowcherDealEdit",
        query: { data: JSON.stringify(val) }
      });
    },
    handleAdd() {
      this.$router.push("/wowcherDealAdd");
    },
    handleCheck(val) {
      this.$router.push({
        name: "wowcherDealList",
        query: { data: JSON.stringify(val) }
      });
    }
  }
};
</script>
