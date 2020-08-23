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
          placeholder="平台"
          v-model="searchPlatform"
          @change="handleCondition('plat')"
          clearable
        >
          <el-option
            v-for="(v,i) in searchPlatformOption"
            :key="'plat'+i"
            :label="v"
            :value="v"
          ></el-option>
        </el-select>
        <el-select
          class="w-max150"
          placeholder="帳號"
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
          placeholder="國家"
          v-model="country"
          @change="handleCondition('country')"
          clearable
        >
          <el-option
            v-for="(v,i) in searchCountryOption"
            :key="'country'+i"
            :label="v.countryNameChinese"
            :value="v.countryCode"
          >
          </el-option>
        </el-select>
        <el-select
          class="w-max150"
          placeholder="經理"
          v-model="manager"
          @change="handleCondition('manager')"
          clearable
        >
          <el-option
            v-for="(v,i) in managerOption"
            :key="'manager'+i"
            :label="v"
            :value="v"
          >
          </el-option>
        </el-select>
        <el-select
          class="w-max150"
          placeholder="擁有者"
          v-model="currentOwner"
          @change="handleCondition('currentOwner')"
          clearable
        >
          <el-option
            v-for="(v,i) in currentOwnerOption"
            :key="'currentOwner'+i"
            :label="v"
            :value="v"
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
        >新增</el-button>
      </el-col>
      <el-col>
        <el-checkbox
          v-model="showPermanentClose"
          @change="handleCondition"
        >顯示永久關閉</el-checkbox>
        <el-checkbox
          class="showNoRrpLink"
          v-model="showNoRrpLink"
          @change="handleCondition"
        >顯示無RRP連結</el-checkbox>
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
            min-width="30"
            label="ID"
            prop="id"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="50"
            label="SKU"
            prop="sku"
            sortable="custom"
            :formatter="formatEmptyText"
          ></el-table-column>
          <el-table-column
            min-width="50"
            label="狀態"
            prop="listingStatus"
          >
          </el-table-column>

          <el-table-column
            min-width="100"
            label="最新留言"
            prop="message"
          >
            <template slot-scope="scope">
              <span class="message-color">[{{ scope.row.messages &&  scope.row.messages[0] && scope.row.messages[0].messageType }}]</span>
              <span v-html="scope.row.messages &&  scope.row.messages[0] ? scope.row.messages[0].message : ''"></span>
            </template>
          </el-table-column>
          <el-table-column
            class-name="tableColumn"
            label="圖片"
            width="70"
            align="center"
          >
            <template slot-scope="scope">
              <img
                v-if="scope.row.imageUrl"
                width="50"
                height="50"
                style="cursor:pointer; display: block"
                :src="scope.row.imageUrl"
                @click="scope.row.dialogTableVisible = true"
              >
              <span v-else>—</span>
              <el-dialog
                title="圖片"
                :modal="false"
                :visible.sync="scope.row.dialogTableVisible"
                width="30%"
              >
                <img
                  width="100%"
                  :src="scope.row.imageUrl"
                >
              </el-dialog>
            </template>
          </el-table-column>
          <el-table-column
            min-width="100"
            label="商品名稱"
            prop="productName"
          ></el-table-column>
          <el-table-column
            min-width="50"
            label="帳號"
            prop="account"
            align="center"
            :formatter="formatEmptyText"
          ></el-table-column>
          <el-table-column
            min-width="40"
            label="貨代"
            prop="shippingAgent"
            class-name="shipping-agent-info"
          >
            <template slot-scope='scope'>
              {{ scope.row.shippingFee.shippingAgent }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="40"
            label="發貨方式"
            prop="shippingMethod"
            class-name="shipping-agent-info"
          >
            <template slot-scope='scope'>
              {{ scope.row.shippingFee.shippingMethod }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="40"
            label="報價(FP)"
            prop="finalPrice"
            class-name="shipping-fee-info"
          >
            <template slot-scope="scope">
              {{scope.row.shippingFee.finalPriceCurrency | formatToUnit }} {{scope.row.shippingFee.finalPrice | formatToMoney}}
            </template>
          </el-table-column>
          <el-table-column
            min-width="40"
            label="銷貨成本"
            prop="productCost"
            class-name="shipping-fee-info"
          >
            <template slot-scope="scope">
              {{scope.row.shippingFee.productCostCurrency | formatToUnit }} {{scope.row.shippingFee.productCost | formatToMoney}}
            </template>
          </el-table-column>
          <el-table-column
            min-width="40"
            label="運費"
            prop="shippingFee"
            class-name="shipping-fee-info"
          >
            <template slot-scope="scope">
              {{scope.row.shippingFee.shippingFeeCurrency | formatToUnit}} {{scope.row.shippingFee.shippingFee | formatToMoney}}
            </template>
          </el-table-column>

          <el-table-column
            min-width="40"
            label="毛利"
            prop="margin"
            class-name="shipping-fee-info"
          >
            <template slot-scope="scope">
              {{scope.row.shippingFee.finalPriceCurrency | formatToUnit}} {{scope.row.shippingFee.margin | formatToMoney}}
            </template>
          </el-table-column>
          <el-table-column
            min-width="40"
            label="毛利率"
            prop="marginPercentage"
            class-name="shipping-fee-info"
          >
            <template slot-scope='scope'>
              {{ scope.row.shippingFee.marginPercentage * 100 + "%"  }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="40"
            label="平台"
            prop="platform"
            align="center"
            :formatter="formatEmptyText"
          ></el-table-column>
          <el-table-column
            min-width="40"
            label="國家"
            align="center"
            prop="country"
            :formatter="formatEmptyText"
          ></el-table-column>
          <el-table-column
            min-width="40"
            label="擁有者"
            prop="currentOwner"
          >
          </el-table-column>

          <el-table-column
            width="80"
            label="動作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                class="btnh"
                type="text"
                title="查看"
                icon="el-icon-won-40"
                @click="handleLook(scope.row)"
              ></el-button>
              <el-button
                class="btnh"
                type="text"
                title="編輯"
                icon="el-icon-won-1"
                @click="handleEdit(scope.row)"
              ></el-button>
              <el-button
                class="btnh-three"
                type="text"
                title="複製"
                icon="el-icon-won-124"
                @click="handleCopy(scope.row)"
              ></el-button>
              <el-button
                class="btnh"
                type="text"
                title="删除"
                icon="el-icon-won-22"
                @click="handleDelete(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <div style="float:right;margin-top:5px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total='total'
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :layout="layout"
        >
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
import { format } from "@/common/until/format";
export default {
  extends: wonTableContainer,
  data() {
    return {
      showPermanentClose: false,
      showNoRrpLink: false,
      tableData: [],
      maxHeight: 450,
      condition: [],
      isTableLoading: false,
      searchAccount: "",
      searchPlatform: "",
      country: "",
      manager: "",
      currentOwner: "",
      searchAccountOption: [],
      searchPlatformOption: [],
      searchCountryOption: [],
      managerOption: [],
      currentOwnerOption: [],
      fetchCondition: {
        skip: 0,
        limit: 20,
        order: ""
      },
      fetchOption: {
        url: "/candidateproduct/search",
        method: "post",
        where: ""
      }
    };
  },
  created() {
    let purchasePlatform = axios({
      url: "/candidateproduct/value/platform",
      method: "post",
      data: {
        token: this.token
      }
    });
    let purchaseType = axios({
      url: "/candidateproduct/value/country",
      method: "post",
      data: {
        token: this.token
      }
    });
    let purchaseAccount = axios({
      url: "/candidateproduct/value/account",
      method: "post",
      data: {
        token: this.token
      }
    });

    let manager = axios({
      url: "/candidateproduct/value/manager",
      method: "post",
      data: {
        token: this.token
      }
    });

    let currentOwner = axios({
      url: "/candidateproduct/value/owner",
      method: "post",
      data: {
        token: this.token
      }
    });

    Promise.all([
      purchasePlatform,
      purchaseType,
      purchaseAccount,
      manager,
      currentOwner
    ]).then(([platform, country, account, manager, currentOwner]) => {
      this.searchAccountOption = _.cloneDeep(account);
      this.searchPlatformOption = _.cloneDeep(platform);
      this.searchCountryOption = _.cloneDeep(country.data);
      this.managerOption = _.cloneDeep(manager);
      this.currentOwnerOption = _.cloneDeep(currentOwner);
    });
    this.handleSearch();
    this.Bus.$on("refresh", this.handleSearch);
  },
  filters: {
    ...format
  },
  methods: {
    handleCopy() {},
    handleSearch: _.debounce(function() {
      this.isTableLoading = true;
      let data = {
        where: this.fetchOption.where,
        token: this.token,
        skip: this.fetchCondition.skip,
        limit: this.fetchCondition.limit,
        order: this.fetchCondition.order
      };
      let searchCriteria = [];
      if (this.condition.includes("1")) {
        searchCriteria.push({
          key: "platform",
          value: this.searchPlatform
        });
      }
      if (this.condition.includes("2")) {
        searchCriteria.push({
          key: "country",
          value: this.country
        });
      }
      if (this.condition.includes("3")) {
        searchCriteria.push({
          key: "account",
          value: this.searchAccount
        });
      }
      if (this.condition.includes("4")) {
        searchCriteria.push({
          key: "manager",
          value: this.manager
        });
      }
      if (this.condition.includes("5")) {
        searchCriteria.push({
          key: "owner",
          value: this.currentOwner
        });
      }

      if (this.showPermanentClose) {
        searchCriteria.push({
          key: "showPermanentClose",
          value: true
        });
      }
      if (this.showNoRrpLink) {
        searchCriteria.push({
          key: "showNoRrpLink",
          value: true
        });
      }
      data.searchCriteria = JSON.stringify(searchCriteria);
      axios({
        url: this.fetchOption.url,
        method: this.fetchOption.method,
        data
      }).then(({ data, count }) => {
        this.isTableLoading = false;
        _.each(data, v => {
          v.dialogTableVisible = false;
        });
        this.tableData = _.cloneDeep(data);
        this.total = count;
      });
    }, 500),
    handleDelete(val) {
      this.$confirm("是否删除", "提示", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            url: "erp/purchase/delete",
            method: "post",
            data: {
              purchaseId: val.purchaseId,
              token: this.token
            }
          }).then(() => {
            this.handleSearch();
            this.$message.success("删除成功");
          });
        })
        .catch(() => {});
    },
    handleChange() {
      this.handleSearch();
    },
    handleEdit(val) {
      this.$router.push({
        path: "/candidateEdit",
        query: { data: JSON.stringify(val) }
      });
    },
    handleLook(val) {
      this.$router.push({
        path: "/candidateEdit",
        query: { data: JSON.stringify(val), type: "look" }
      });
    },
    handleAdd() {
      this.$router.push("/candidateAdd");
    },
    handleCondition(sign) {
      if (sign == "plat") {
        if (!this.searchPlatform) {
          _.pull(this.condition, "1");
        } else {
          if (!this.condition.includes("1")) {
            this.condition.push("1");
          }
        }
      }
      if (sign == "country") {
        if (!this.country) {
          _.pull(this.condition, "2");
        } else {
          if (!this.condition.includes("2")) {
            this.condition.push("2");
          }
        }
      }
      if (sign == "acc") {
        if (!this.searchAccount) {
          _.pull(this.condition, "3");
        } else {
          if (!this.condition.includes("3")) {
            this.condition.push("3");
          }
        }
      }
      if (sign == "manager") {
        if (!this.manager) {
          _.pull(this.condition, "4");
        } else {
          if (!this.condition.includes("4")) {
            this.condition.push("4");
          }
        }
      }
      if (sign == "currentOwner") {
        if (!this.currentOwner) {
          _.pull(this.condition, "5");
        } else {
          if (!this.condition.includes("5")) {
            this.condition.push("5");
          }
        }
      }
      this.handleSearch();
    }
  }
};
</script>

<style scoped lang="scss">
/deep/ .shipping-agent-info {
  background: #f4eed8;
}
// /deep/ .final-price {
//   background: #409eff;
// }

// /deep/ .margin-column {
//   background: #f5e294;
// }

// /deep/ .margin-percentage {
//   background: #f56c6c;
// }

/deep/ .shipping-fee-info {
  background: #d8ebcf;
}

.btnh-three {
  margin-left: 0px;
}
.showNoRrpLink {
  margin-left: 10px;
}

.message-color {
  color: rgb(103, 194, 58);
}
</style>
