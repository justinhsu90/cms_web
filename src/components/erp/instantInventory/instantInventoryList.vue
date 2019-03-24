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
        <el-button
          icon="el-icon-search"
          @click="handleSearch"
        ></el-button>
        <div class="ibbox">
          <wonPopoverChooser
            :chooser="$options.warehouse"
            @select="handleSelect"
            :select="select"
          >
            <el-button
              name="reference"
              type="success"
              size="small"
            >選擇倉庫</el-button>
          </wonPopoverChooser>
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
            width="150"
            label="SKU"
            prop="sku"
            align="center"
          ></el-table-column>
          <template v-for="(v,i) in parmas">
            <el-table-column
              v-if="v.showSellable"
              :key="i"
              min-width="200"
              :label="v.warehouseName + '(可售)'"
              :prop="v.warehouseCode + '_SELLABLE'"
              :formatter="formatEmptyText"
              align="center"
              sortable="custom"
            ></el-table-column>
          </template>
          <template v-for="(v,i) in parmas">
            <el-table-column
              v-if="v.showUnsellable"
              :key="i+'index'"
              width="300"
              :label="v.warehouseName + '(不可售)'"
              :prop="v.warehouseCode + '_UNSELLABLE'"
              :formatter="formatEmptyText"
              align="center"
              sortable="custom"
            ></el-table-column>
          </template>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
import warehouse from "won-service/_chooser/warehouse";
import wonPopoverChooser from "won-service/component/won-popover/won-chooser-popover";
export default {
  extends: wonTableContainer,
  components: {
    wonPopoverChooser
  },
  warehouse,
  data() {
    return {
      isTableLoading: false,
      date: [],
      parmas: [],
      fetchCondition: {
        skip: 0,
        limit: 20
      },
      showNonEmpty: false,
      showWarehouse: "",
      select: [],
      fetchOption: {
        url: "erp/instantInventory/search",
        method: "post",
        where: ""
      }
    };
  },
  mounted() {
    this.handleSelect();
  },
  methods: {
    handleSortChange(row) {
      if (row.order == "ascending") {
        this.tableData = _.orderBy(this.tableData, [`${row.prop}`], ["asc"]);
      }
      if (row.order == "descending") {
        this.tableData = _.orderBy(this.tableData, [`${row.prop}`], ["desc"]);
      }
    },
    handleSelect(originData) {
      let data = _.cloneDeep(originData);
      if (!this.hasinit) {
        this.hasinit = true;
        data = [
          {
            warehouseName: "廣州倉",
            warehouseCode: "GZ",
            showSellable: true,
            showUnsellable: false
          },
          {
            warehouseName: "廣州出貨需求",
            warehouseCode: "GZ-SHIPMENT-NEED",
            showSellable: true,
            showUnsellable: false
          },
          {
            warehouseName: "廣州採購在途",
            warehouseCode: "GZ-TRANSIT",
            showSellable: true,
            showUnsellable: false
          }
        ];
      }

      this.select = _.cloneDeep(data);
      this.parmas = data.filter(item => {
        return item.showUnsellable || item.showSellable;
      });
      this.selectOption = data
        .filter(item => {
          return item.showUnsellable || item.showSellable;
        })
        .map(v => {
          return {
            warehouseCode: v.warehouseCode,
            showUnsellable: v.showUnsellable,
            showSellable: v.showSellable
          };
        });
      this.handleSearch();
    },
    fetchEnd() {
      let data = [];
      _.each(this.originRes, (value, key) => {
        let obj = {};
        obj.sku = key;
        _.each(value, (vc, vk) => {
          obj[vk] = vc;
        });
        data.push(obj);
      });
      this.tableData = data;
    },
    handleSearch: _.debounce(function() {
      this.isTableLoading = true;
      let warehouseList;
      if (JSON.stringify(this.selectOption)) {
        warehouseList = JSON.stringify(this.selectOption);
      } else {
        warehouseList = "[]";
      }
      let data = {
        where: this.fetchOption.where,
        token: this.token,
        warehouseList
      };
      this.fetchTableData(data);
    }, 2000)
  }
};
</script>
