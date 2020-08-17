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
          @change="handleCondition('type')"
          clearable
        >
          <el-option
            v-for="(v,i) in searchCountryOption"
            :key="'country'+i"
            :label="v.countryNameChinese"
            :value="v.countryCode"
          >
            <span style="float: left">{{ v.countryNameChinese }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ v.countryNameEnglish }}</span>
          </el-option>
        </el-select>
        <!-- <el-date-picker
          class="w-max260"
          clearable
          style="width:100%"
          @change="handleChange"
          value-format="yyyy-MM-dd"
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker> -->
        <div
          @click="handleSearch"
          class="el-input-group__append search"
        >
          <i class="el-icon-search"></i>
        </div>
      </el-col>
      <el-col :span="2">
        <!-- <el-button
          style="float:right"
          @click="handleAdd"
          type="primary"
        >新增採購</el-button> -->
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
            min-width="35"
            label="Id"
            prop="id"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="50"
            label="Sku"
            prop="sku"
            sortable="custom"
            :formatter="formatEmptyText"
          ></el-table-column>
          <el-table-column
            min-width="60"
            label="報價狀態"
            prop="listingStatus"
          >
          </el-table-column>
          <!-- <el-table-column
            min-width="25"
            label="圖片"
            prop="picurl"
          ></el-table-column> -->
          <el-table-column
            class-name="tableColumn"
            label="圖片"
            width="70"
            align="center"
          >
            <template slot-scope="scope">
              <img
                v-if="scope.row.picurl"
                width="50"
                height="50"
                style="cursor:pointer"
                :src="scope.row.picurl"
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
                  :src="scope.row.picurl"
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
            label="賬號"
            prop="account"
            align="center"
            :formatter="formatEmptyText"
          ></el-table-column>
          <el-table-column
            min-width="50"
            label="平台"
            prop="platform"
            align="center"
            :formatter="formatEmptyText"
          ></el-table-column>
          <el-table-column
            min-width="50"
            label="國家"
            align="center"
            prop="country"
            :formatter="formatEmptyText"
          ></el-table-column>
          <el-table-column
            min-width="50"
            label="擁有者"
            prop="currentOwner"
          >
          </el-table-column>
          <el-table-column
            min-width="50"
            label="貨代"
            prop="shippingAgent"
            class-name="shipping-agent"
          >
            <template slot-scope='scope'>
              {{ scope.row.shippingFee.shippingAgent }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="50"
            label="發貨方式"
            prop="shippingMethod"
            class-name="shipping-method"
          >
            <template slot-scope='scope'>
              {{ scope.row.shippingFee.shippingMethod }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="50"
            label="finalprice"
            prop="finalPrice"
            class-name="final-price"
          >
            <template slot-scope='scope'>
              {{ scope.row.shippingFee.finalPrice }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="50"
            label="毛利"
            prop="margin"
            class-name="margin-column"
          >
            <template slot-scope='scope'>
              {{ scope.row.shippingFee.margin + "%" }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="50"
            label="毛利率"
            prop="marginPercentage"
            class-name="margin-percentage"
          >
            <template slot-scope='scope'>
              {{ scope.row.shippingFee.marginPercentage }}
            </template>
          </el-table-column>
          <el-table-column
            width="130"
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
                class="btnh"
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
      date: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      tableData: [],
      maxHeight: 450,
      condition: [],
      isTableLoading: false,
      searchAccount: "",
      searchPlatform: "",
      country: "",
      searchAccountOption: [],
      searchPlatformOption: [],
      searchCountryOption: [],
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
    Promise.all([purchasePlatform, purchaseType, purchaseAccount]).then(
      ([platform, country, account]) => {
        this.searchAccountOption = _.cloneDeep(account);
        this.searchPlatformOption = _.cloneDeep(platform);
        this.searchCountryOption = _.cloneDeep(country.data);
      }
    );
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
      if (this.condition.includes("1")) {
        data.platform = this.searchPlatform;
      }
      if (this.condition.includes("2")) {
        data.country = this.country;
      }
      if (this.condition.includes("3")) {
        data.account = this.searchAccount;
      }
      data.searchCriteria = '{["key":"productName", "value":"test"]}';
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
        name: "erpPurchaseEdit",
        query: { data: JSON.stringify(val) }
      });
    },
    handleLook(val) {
      this.$router.push({
        name: "erpPurchaseEdit",
        query: { data: JSON.stringify(val), type: "look" }
      });
    },
    handleAdd() {
      this.$router.push("/erpPurchaseAdd");
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
      if (sign == "type") {
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
      this.handleSearch();
    }
  }
};
</script>

<style scoped lang="scss">
/deep/ .shipping-agent {
  background: #67c23a;
}

/deep/ .shipping-method {
  background: #909399;
}

/deep/ .final-price {
  background: #409eff;
}

/deep/ .margin-column {
  background: #e6a23c;
}

/deep/ .margin-percentage {
  background: #f56c6c;
}
</style>
