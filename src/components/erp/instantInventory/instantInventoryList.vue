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
        <!-- <div class="ibbox">
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
        </div> -->
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
            width="80"
            label="縮圖"
            align="center"
          >
            <template slot-scope="scope">
              <img
                class="table-column-img"
                :src="scope.row.snapshotUrl"
                alt=""
              >
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            label="SKU"
            prop="sku"
            align="center"
          ></el-table-column>
          <el-table-column
            width="100"
            label="可用庫存"
            prop="availableStock"
            align="center"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="75"
            label="今日"
            align="center"
            label-class-name="table-today"
          >
            <el-table-column
              min-width="75"
              label="入庫"
              align="center"
            >
              <el-table-column
                min-width="75"
                label="採購"
                align="center"
                sortable="custom"
                prop='WAREHOUSE_IN'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('WAREHOUSE_IN', false)}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="80"
                label="領料後"
                align="center"
                sortable="custom"
                prop='WAREHOUSE_OUT_IN'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('WAREHOUSE_OUT_IN', false)}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              min-width="75"
              label="出庫"
              align="center"
            >
              <el-table-column
                min-width="75"
                label="領料"
                align="center"
                sortable="custom"
                prop='WAREHOUSE_OUT'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('WAREHOUSE_OUT', false)}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="75"
                label="樣品"
                align="center"
                sortable="custom"
                prop='SAMPLE_OUT'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('SAMPLE_OUT', false)}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              min-width="75"
              label="其他"
              align="center"
            >
              <el-table-column
                min-width="75"
                label="報廢"
                align="center"
                sortable="custom"
                prop='SCRAP'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('SCRAP', false)}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="80"
                label="待處理"
                align="center"
                sortable="custom"
                prop='WAITING_HANDLE'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('WAITING_HANDLE', false)}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>

          <el-table-column
            min-width="75"
            label="總數"
            align="center"
            label-class-name="table-total"
          >
            <el-table-column
              min-width="75"
              label="入庫"
              align="center"
            >
              <el-table-column
                min-width="75"
                label="採購"
                align="center"
                sortable="custom"
                prop='WAREHOUSE_IN-TOTAL'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('WAREHOUSE_IN', true)}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="80"
                label="領料後"
                align="center"
                sortable="custom"
                prop='WAREHOUSE_OUT_IN-TOTAL'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('WAREHOUSE_OUT_IN', true)}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              min-width="75"
              label="出庫"
              align="center"
            >
              <el-table-column
                min-width="75"
                label="領料"
                align="center"
                sortable="custom"
                prop='WAREHOUSE_OUT-TOTAL'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('WAREHOUSE_OUT', true)}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="75"
                label="樣品"
                align="center"
                sortable="custom"
                prop='SAMPLE_OUT-TOTAL'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('SAMPLE_OUT', true)}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              min-width="75"
              label="其他"
              align="center"
            >
              <el-table-column
                min-width="75"
                label="報廢"
                align="center"
                sortable="custom"
                prop='SCRAP-TOTAL'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('SCRAP', true)}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="80"
                label="待處理"
                align="center"
                sortable="custom"
                prop='WAITING_HANDLE-TOTAL'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('WAITING_HANDLE', true)}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
          <!--
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
          </template> -->
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
import warehouse from "won-service/_chooser/warehouse";
// import wonPopoverChooser from "won-service/component/won-popover/won-chooser-popover";
export default {
  extends: wonTableContainer,
  // components: {
  //   wonPopoverChooser
  // },
  filters: {
    filterListItem(list, inventoryType, total) {
      let obj =
        list.find(item => {
          return item.inventoryType == inventoryType && item.total == total;
        }) || {};
      return obj.quantity || "-";
    }
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
    sortAvailableStock(type) {
      this.tableData.sort((a, b) => {
        let availableStockA = a.availableStock || 0;
        let availableStockB = b.availableStock || 0;
        if (type == "asc") {
          return availableStockA - availableStockB;
        } else {
          return availableStockB - availableStockA;
        }
      });
    },
    handleSortChange(row) {
      if (!row.prop) return;
      let arr = row.prop.split("-");
      let key1 = arr[0];
      let key2 = arr[1];
      let isTotal = !!key2;
      if (row.order == "ascending") {
        if (key1 == "availableStock") {
          this.sortAvailableStock("asc");
          return;
        }
        this.tableData.sort((a, b) => {
          let objA =
            _.find(a.list, citem => {
              return citem.inventoryType == key1 && citem.total == isTotal;
            }) || {};

          let objB =
            _.find(b.list, citem => {
              return citem.inventoryType == key1 && citem.total == isTotal;
            }) || {};

          let quantityA = objA.quantity || 0;
          let quantityB = objB.quantity || 0;

          return quantityA - quantityB;
        });
      }
      if (row.order == "descending") {
        if (key1 == "availableStock") {
          this.sortAvailableStock("des");
          return;
        }
        this.tableData.sort((a, b) => {
          let objA =
            _.find(a.list, citem => {
              return citem.inventoryType == key1 && citem.total == isTotal;
            }) || {};

          let objB =
            _.find(b.list, citem => {
              return citem.inventoryType == key1 && citem.total == isTotal;
            }) || {};

          let quantityA = objA.quantity || 0;
          let quantityB = objB.quantity || 0;

          return quantityB - quantityA;
        });
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
      if (!this.hasInit) {
        this.sortAvailableStock();
        this.hasInit = true;
      }
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
    }, 500)
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-table th {
  background: #f5f7fa !important;
}
/deep/ .table-today {
  background: oldlace;
}

/deep/ .table-total {
  background: #f0f9eb;
}
</style>
