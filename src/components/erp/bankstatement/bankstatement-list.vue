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
                <el-table-column min-width="80" label="同步狀態" prop="updateStatus" :formatter="formatToTime"></el-table-column>
                <el-table-column width="120" label="用途"  align="center">
                        <template slot-scope="{row}">
                            <el-select :disabled="!!row.originPurpose"  v-model="row.purpose" @change="handleSelect(row)">
                                <el-option v-for="(item,value) in purposeOption" :key="value" :label="item.purposeName" :value="item.purposeCode"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column width="120" label="用途2"  align="center">
                        <template slot-scope="{row}">

                            <el-select  :disabled="!!row.originPurpose" v-model="row.toPerson"  v-if="specialData.includes(row.purpose)">
                                <el-option v-for="(item,value) in peopleOption" :key="value" :label="item" :value="item"></el-option>
                            </el-select>
                            <el-select :disabled="!!row.originPurpose"  v-model="row.hedging" v-else-if="row.purpose == 'HEDGING'">
                                <el-option v-for="(item,value) in row.hedgingOption" :key="value" :label="item" :value="item"></el-option>
                            </el-select>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="130" label="日期" prop="dateTime" :formatter="formatToTime"></el-table-column>
                    <el-table-column min-width="100" label="ID" prop="id"></el-table-column>
                    <!-- <el-table-column min-width="160" label="帳號" prop="accountNumber"></el-table-column> -->
                    <!-- <el-table-column min-width="100" label="餘額" prop="accountBalance"> -->
                      <!-- <template slot-scope="scope"> -->
                          <!-- {{scope.row.accountBalance}} {{scope.row.currency}} -->
                      <!-- </template> -->
                    <!-- </el-table-column> -->
                    <el-table-column min-width="100" label="交易類型" prop="transactionType"></el-table-column>
                    <el-table-column min-width="100" label="交易金額" prop="transactionAmount">
                      <template slot-scope="scope">
                          {{scope.row.transactionAmount}} {{scope.row.currency}}
                      </template>
                    </el-table-column>
                    <el-table-column min-width="70" label="銀行" prop="bankName"></el-table-column>
                    <el-table-column min-width="250" label="內容" prop="content"></el-table-column>
                    <el-table-column width="140" label="操作" align="center" fixed="right">
                      <template slot-scope="{row}">
                            <!-- <i v-if="row.loading" class="el-icon-check"></i>
                            <i v-else class="el-icon-loading"></i> -->
                            <el-button :loading="row.loading" type="success" :disabled="!!row.disabled || !!row.originPurpose " @click="handleSend(row)" size="small">发送</el-button>
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
      specialData: ["SALARY", "OVERTIME_WORK_FEE", "ALLOWANCE", "LOAN"],
      purpose: "",
      normalPurposeOption: [],
      purposeOption: [],
      peopleOption: [],
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
        _.each(this.tableData, res => {
          if (this.specialData.includes(res.purpose) && res.toPerson) {
            res.disabled = false;
          }
          if (res.purpose == "HEDGING" && res.hedging) {
            res.disabled = false;
          }
          if (this.normalPurposeOption.includes(res.purpose)) {
            res.disabled = false;
          }
        });
      },
      deep: true
    }
  },
  methods: {
    fetchEnd() {
      this.tableData = _.each(this.tableData, item => {
        this.$set(item, "loading", false);
        item.hedgingOption = [];
        item.originPurpose = item.purpose;
        item.disabled = true;
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
      }).then(() => {
        this.$message.success("發送成功");
        row.loading = false;
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
    }, 2000)
  }
};
</script>
