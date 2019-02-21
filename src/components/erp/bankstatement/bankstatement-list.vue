<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-input class="ibbox w-max200" placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch">
                </el-input>
                <div @click="handleSearch" class="el-input-group__append search">
                    <i class="el-icon-search"></i>
                </div>
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                  <!-- <el-table-column label="狀態" align="center">
                      <template slot-scope="{row}">
                            <i v-if="row.loading" class="el-icon-check"></i>
                            <i v-else class="el-icon-loading"></i>
                        </template>
                  </el-table-column> -->
                  <el-table-column width="200" label="用途"  align="center">
                        <template slot-scope="{row}">
                            <el-select v-model="row.purpose" @change="handleSelect">
                                <el-option v-for="(item,value) in purposeOption" :key="value" :label="item.purposeName" :value="item.purposeCode"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="180" label="ID" prop="id"></el-table-column>
                    <el-table-column min-width="200" label="accountNumber" prop="accountNumber"></el-table-column>
                    <el-table-column min-width="160" label="accountBalance" prop="accountBalance">
                      <template slot-scope="scope">
                          {{scope.row.accountBalance}} {{scope.row.currency}}
                      </template>
                    </el-table-column>
                    <el-table-column min-width="180" label="transactionAmount" prop="transactionAmount">
                      <template slot-scope="scope">
                          {{scope.row.transactionAmount}} {{scope.row.currency}}
                      </template>
                    </el-table-column>
                    <el-table-column min-width="110" label="bankName" prop="bankName"></el-table-column>
                    <el-table-column min-width="200" label="content" prop="content"></el-table-column>
                    <el-table-column min-width="190" label="datetime" prop="dateTime" :formatter="formatToTime"></el-table-column>
                    <el-table-column min-width="180" label="transactionType" prop="transactionType"></el-table-column>
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
      date: [],
      condition: [],
      isTableLoading: false,
      purpose: "",
      purposeOption: [],
      fetchCondition: {
        skip: 0,
        limit: 20
      },
      fetchOption: {
        url: "/erp/bankstatement/search",
        method: "post",
        where: ""
      }
    };
  },
  created() {
    let purpose = axios({
      url: "/erp/bankstatement/value/purpose",
      method: "post",
      data: {
        token: this.token
      }
    });
    Promise.all([purpose]).then(([res]) => {
      this.purposeOption = _.cloneDeep(res);
    });
  },
  methods: {
    fetchEnd() {
      this.tableData = _.each(this.tableData, item => {
        item.loading = false;
      });
    },
    handleSelect() {
      // { purpose }
      // axios({
      //   url: "erp/bankstatement/update/purpose",
      //   method: "post",
      //   data: {
      //     token: this.token,
      //     purposeCode: purpose
      //   }
      // });
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
        data.inventoryType = this.inventoryType;
      }
      if (this.condition.includes("2")) {
        data.warehouse = this.warehouse;
      }
      if (this.condition.includes("3")) {
        data.startDate = this.date[0];
        data.endDate = this.date[1];
      }
      this.fetchTableData(data);
    }, 2000)
  }
};
</script>
