<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-input class="ibbox w-max200" placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch">
                </el-input>
                <div @click="handleSearch" class="el-input-group__append search">
                    <i class="el-icon-search"></i>
                </div>
                <el-switch v-model="showNonPurposeOnly" @change="handleSwitch"></el-switch>
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                <el-table-column width="120" label="用途"  align="center">
                        :disabled="!!row.originPurpose"
                        <template slot-scope="{row}">
                            <el-select  v-model="row.purpose" @change="handleSelect(row)">
                                <el-option class="option-directive" v-for="(item,value) in purposeOption" :key="value" :label="item.purposeName" :value="item.purposeCode"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column width="200" label="用途2" align="center"  >
                        <template slot-scope="{row}">
                            <!-- :disabled="!!row.originPurpose"
                            :disabled="!!row.originPurpose" -->
                            <el-select   v-model="row.toPerson"  v-if="specialData.includes(row.purpose)">
                                <el-option class="option-directive" v-for="(item,value) in peopleOption" :key="value" :label="item" :value="item"></el-option>
                            </el-select>
                            <el-select   v-model="row.hedging" v-else-if="row.purpose == 'HEDGING'">
                                <el-option class="option-directive" v-for="(item,value) in row.hedgingOption" :key="value" :label="item" :value="item"></el-option>
                            </el-select>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="130" label="日期" prop="dateTime" sortable="custom" :formatter="formatToTime"></el-table-column>
                    <el-table-column min-width="100" label="ID" prop="id" sortable="custom"></el-table-column>
                    <!-- <el-table-column min-width="160" label="帳號" prop="accountNumber"></el-table-column> -->
                    <!-- <el-table-column min-width="100" label="餘額" prop="accountBalance"> -->
                      <!-- <template slot-scope="scope"> -->
                          <!-- {{scope.row.accountBalance}} {{scope.row.currency}} -->
                      <!-- </template> -->
                    <!-- </el-table-column> -->
                    <el-table-column min-width="100" label="交易類型" prop="transactionType" sortable="custom"></el-table-column>
                    <el-table-column min-width="100" label="交易金額" prop="transactionAmount">
                      <template slot-scope="scope">
                          {{scope.row.transactionAmount}} {{scope.row.currency}}
                      </template>
                    </el-table-column>
                    <el-table-column min-width="80" label="銀行" prop="bankName" sortable="custom"></el-table-column>
                    <el-table-column min-width="300" label="內容" prop="content" sortable="custom"></el-table-column>
                    <el-table-column width="80" label="操作" align="center" fixed="right">
                      <template slot-scope="{row}">
                            <!-- <i v-if="row.loading" class="el-icon-check"></i>
                            <i v-else class="el-icon-loading"></i> -->
                            <!-- || !!row.originPurpose -->
                            <el-button :loading="row.loading" type="success" :disabled="!!row.disabled" @click="handleSend(row)" size="small">发送</el-button>
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
import _ from "lodash";
export default {
  extends: wonTableContainer,
  data() {
    return {
      showNonPurposeOnly: false,
      specialData: ["SALARY", "OVERTIME_WORK_FEE", "ALLOWANCE", "LOAN"],
      purpose: "",
      normalPurposeOption: [],
      purposeOption: [],
      peopleOption: [],
      fetchCondition: {
        skip: 0,
        limit: 20,
        order: "-id"
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
    let people = axios({
      url: "/erp/bankstatement/value/people",
      method: "post",
      data: {
        token: this.token
      }
    });
    Promise.all([purpose, people]).then(([res, resTwo]) => {
      this.purposeOption = _.cloneDeep(res);
      this.normalPurposeOption = _.filter(this.purposeOption, item => {
        return !this.specialData.includes(item.purposeCode);
      });
      this.normalPurposeOption = _.map(this.normalPurposeOption, item => {
        return item.purposeCode;
      });
      this.peopleOption = _.cloneDeep(resTwo);
    });
  },
  watch: {
    tableData: {
      handler() {
        // _.each(this.tableData, res => {
        //   if (this.specialData.includes(res.purpose) && res.toPerson) {
        //     res.disabled = false;
        //   }
        //   if (res.purpose == "HEDGING" && res.hedging) {
        //     res.disabled = false;
        //   }
        //   if (this.normalPurposeOption.includes(res.purpose)) {
        //     res.disabled = false;
        //   }
        // });
      },
      deep: true
    }
  },
  methods: {
    handleSwitch() {
      this.handleSearch();
    },
    fetchEnd() {
      this.tableData = _.each(this.tableData, item => {
        this.$set(item, "loading", false);
        this.$set(item, "disabled", false);
        item.hedgingOption = [];
        item.originPurpose = item.purpose;
      });
    },
    handleSelect(row) {
      if (!this.specialData.includes(row.purpose)) {
        let data = [];
        _.each(this.tableData, item => {
          if (!item.purpose) {
            data.push(item.id);
          }
        });
        row.hedgingOption = data;
      }
    },
    getValue(row) {
      let obj = {
        transactionId: row.id,
        purposeCode: row.purpose
      };
      if (this.specialData.includes(row.purpose) && row.toPerson) {
        obj.toPerson = row.toPerson;
      }
      if (row.purpose == "HEDGING" && row.hedging) {
        obj.hedgingTo = row.hedging;
      }
      return obj;
    },
    handleSend(row) {
      row.loading = true;
      axios({
        url: "erp/bankstatement/update/purpose",
        method: "post",
        data: {
          token: this.token,
          ...this.getValue(row)
        }
      }).then(res => {
        this.$message.success("發送成功");
        row.loading = false;
        row.disabled = res;
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
      if (this.showNonPurposeOnly) {
        data.showNonPurposeOnly = true;
      }
      this.fetchTableData(data);
    }, 500)
  }
};
</script>
<style lang="scss">
.option-directive {
  height: 25px !important;
  line-height: 25px !important;
}
.option-directive.el-select-dropdown__item span {
  line-height: 25px !important;
}
</style>
