<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-input
          class="ibbox w-max200"
          placeholder="搜索"
          v-model="fetchOption.where"
          @keyup.enter.native="handleSearch"
        >
        </el-input>
        <el-select v-model="takeBy" @change="handleChange('takeBy')">
            <el-option v-for="(v,i) in takeByOption" :key="i" :value="v.value" :label="v.label"></el-option>
        </el-select>
        <el-date-picker
          class="w-max200"
          clearable
          @change="handleCondition('date')"
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
        <div class="fr ml10">
          <el-button @click="handleAdd" type="primary">新增盤點</el-button>
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
          v-loading="isTableLoading"
          @sort-change="handleSortChange"
        >
          <el-table-column
            width="70"
            label="ID"
            prop="id"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="70"
            max-width="100"
            label="SKU"
            prop="sku"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            width="70"
            label="盤點人"
            prop="addedBy"
          ></el-table-column>
          <el-table-column
            width="80"
            label="數量"
            prop="quantity"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            width="190"
            label="時間"
            prop="takeTime"
            sortable="custom"
            :formatter="formatToDate"
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
          <el-table-column
            width="80"
            label="動作"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                class="btnh"
                type="text"
                title="刪除"
                icon="el-icon-won-22"
                @click="handleDelete(scope.row)"
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
  </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
import C from "js-cookie";
import showDialog from "@/won-service/component/won-dialog/dialog";
import takeStockAdd from "./takestockAdd";
export default {
  extends: wonTableContainer,
  data() {
    let name = C.get("name");
    let takeByOption = [
      {
        label: name,
        value: name
      }
    ];
    return {
      imageURL: "",
      dialogVisible: false,
      checkbox: [],
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
      condition: ["1"],
      takeBy: name,
      takeByOption,
      fetchCondition: {
        skip: 0,
        limit: 15
      },
      fetchOption: {
        url: "erp/inventoryTakeStock/search",
        method: "post",
        where: "",
        order: "-takeTime"
      }
    };
  },
  created() {
    this.Bus.$on("update:takestockList", this.handleSearch);
  },
  methods: {
    handleAdd() {
      showDialog(takeStockAdd, {
        title: "新增盤點"
      });
    },
    handleDelete(row) {
      let _this = this;
      this.$confirm("確定要刪除", "提示", {
        type: "warning",
        beforeClose(action, instance, done) {
          if (action == "confirm") {
            axios({
              url: "/erp/inventoryTakeStock/remove",
              method: "post",
              data: {
                token: this.token,
                id: row.id
              }
            })
              .then(res => {
                if (res) {
                  _this.$message.success("刪除成功");
                } else {
                  _this.$message.error("刪除失敗");
                }
                _this.handleSearch();
                done();
              })
              .catch(() => {
                _this.$message.success("刪除失敗");
                done();
              });
          } else {
            done();
          }
        }
      }).catch(() => {});
    },
    handleShowDialog(url) {
      this.dialogVisible = true;
      this.imageURL = url;
    },
    handleCondition(sign) {
      if (sign == "date") {
        if (_.isEmpty(this.date)) {
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
      if (this.condition.includes("3")) {
        data.startDate = this.date[0];
        data.endDate = this.date[1];
      }
      if (this.condition.includes("1")) {
        data.takeBy = this.takeBy;
      }
      this.fetchTableData(data);
    }, 2000),
    handleChange(sign) {
      if (sign == "takeBy") {
        if (!this.searchPlatform) {
          _.pull(this.condition, "1");
        } else {
          if (!this.condition.includes("1")) {
            this.condition.push("1");
          }
        }
      }
    }
  }
};
</script>
