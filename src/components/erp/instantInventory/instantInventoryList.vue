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
        <el-popover
          ref="popover"
          placement="top-start"
          title="搜索"
          width="200"
          trigger="hover"
          content="要按搜索鍵才會顯示, 搜索空白可以看到全部庫存"
        >
          <el-button
            slot="reference"
            class="radius"
          >?</el-button>
        </el-popover>
        <el-button
          style="float:right"
          @click="handleShowImg"
          type="primary"
          size="small"
          :loading="btnLoading"
        >{{ showTotalImg ? '關閉' : '顯示'}}縮略圖</el-button>
        <!-- <el-date-picker
          v-model="endDate"
          type="date"
          placeholder="选择日期"
          @change="handleSearch"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker> -->
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
            width="100"
            label="縮圖"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <img
                  v-if="scope.row.showImg"
                  class="table-column-img mt5"
                  :src="scope.row.snapshotUrl"
                  alt=""
                >
                <el-button
                  class="mt5 mb5"
                  type="primary"
                  @click="handleShowScopeImg(scope.row)"
                  size="small"
                >{{ scope.row.showImg ? '關閉' : '顯示'}}</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            label="SKU"
            prop="sku"
            align="center"
          ></el-table-column>
          <!-- label="廣州可售庫存" -->
          <el-table-column
            width="60"
            :render-header="(h) => (h('div', null, [h('div', { style: {
                  display: 'block',
                  height: '25px',
                  lineHeight: '25px'
                }, }, '廣州'), h('div', {style: {
                  display: 'block',
                  height: '25px',
                  lineHeight: '25px'
                }}, '可售'), h('div',{ style: {
                  display: 'block',
                  height: '25px',
                  lineHeight: '25px'
                }}, '庫存')]))"
            prop="availableStock"
            align="center"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            min-width="40"
            label="海外倉"
            align="center"
            label-class-name="table-warehouse"
          >
            <el-table-column
              min-width="40"
              label="萬邑通"
              align="center"
            >
              <el-table-column
                min-width="40"
                label="可售"
                align="center"
                sortable="custom"
                prop='Available'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('Available', false, 'Winit')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="40"
                label="在途"
                align="center"
                sortable="custom"
                prop='OnWay'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('OnWay', false, 'Winit')}}</span>
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column
              min-width="40"
              label="谷倉"
              align="center"
            >
              <el-table-column
                min-width="40"
                label="可售"
                align="center"
                sortable="custom"
                prop='Available'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('Available', false, 'GoodCang')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="40"
                label="在途"
                align="center"
                sortable="custom"
                prop='OnWay'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('OnWay', false, 'GoodCang')}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              min-width="40"
              label="4PX"
              align="center"
            >
              <el-table-column
                min-width="40"
                label="可售"
                align="center"
                sortable="custom"
                prop='Available'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('Available', false, '4PX')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="40"
                label="在途"
                align="center"
                sortable="custom"
                prop='OnWay'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('OnWay', false, '4PX')}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              min-width="40"
              label="昂博"
              align="center"
            >
              <el-table-column
                min-width="40"
                label="可售"
                align="center"
                sortable="custom"
                prop='Available'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('Available', false, 'Aumbow')}}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column
                min-width="40"
                label="在途"
                align="center"
                sortable="custom"
                prop='OnWay'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('OnWay', false, 'Aumbow')}}</span>
                </template>
              </el-table-column> -->
            </el-table-column>
          </el-table-column>
          <el-table-column
            min-width="40"
            label="今日"
            align="center"
            label-class-name="table-today"
          >
            <el-table-column
              min-width="40"
              label="入庫"
              align="center"
            >
              <el-table-column
                min-width="40"
                label="採購"
                align="center"
                sortable="custom"
                prop='WAREHOUSE_IN'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('WAREHOUSE_IN', false, 'GZ')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="40"
                label="領料後"
                align="center"
                sortable="custom"
                prop='WAREHOUSE_OUT_IN'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('WAREHOUSE_OUT_IN', false, 'GZ')}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              min-width="40"
              label="出庫"
              align="center"
            >
              <el-table-column
                min-width="40"
                label="領料"
                align="center"
                sortable="custom"
                prop='WAREHOUSE_OUT'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('WAREHOUSE_OUT', false, 'GZ')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="40"
                label="樣品"
                align="center"
                sortable="custom"
                prop='SAMPLE_OUT'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('SAMPLE_OUT', false, 'GZ')}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              min-width="40"
              label="其他"
              align="center"
            >
              <el-table-column
                min-width="40"
                label="報廢"
                align="center"
                sortable="custom"
                prop='SCRAP'
              >
                <!-- <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('SCRAP', false, 'GZ')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="40"
                label="待處理"
                align="center"
                sortable="custom"
                prop='WAITING_HANDLE'
              > -->
                <!-- <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('WAITING_HANDLE', false, 'GZ')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="40"
                label="轉料號"
                align="center"
                sortable="custom"
                prop='SKU_CONVERT_FROM'
              > -->
                <!-- <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('SKU_CONVERT_FROM ', false, 'GZ')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="40"
                label="盤盈"
                align="center"
                sortable="custom"
                prop='INVENTORY_OVERAGE'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('INVENTORY_OVERAGE', false, 'GZ')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="40"
                label="盤虧"
                align="center"
                sortable="custom"
                prop='INVENTORY_SHORTAGE'
              > -->
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('INVENTORY_SHORTAGE', false, 'GZ')}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>

          <el-table-column
            min-width="40"
            label="總數"
            align="center"
            label-class-name="table-total"
          >
            <el-table-column
              min-width="40"
              label="入庫"
              align="center"
            >
              <el-table-column
                min-width="40"
                label="採購"
                align="center"
                sortable="custom"
                prop='WAREHOUSE_IN-TOTAL'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('WAREHOUSE_IN', true, 'GZ')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="40"
                label="領料後"
                align="center"
                sortable="custom"
                prop='WAREHOUSE_OUT_IN-TOTAL'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('WAREHOUSE_OUT_IN', true, 'GZ')}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              min-width="40"
              label="出庫"
              align="center"
            >
              <el-table-column
                min-width="40"
                label="領料"
                align="center"
                sortable="custom"
                prop='WAREHOUSE_OUT-TOTAL'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('WAREHOUSE_OUT', true, 'GZ')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="40"
                label="樣品"
                align="center"
                sortable="custom"
                prop='SAMPLE_OUT-TOTAL'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('SAMPLE_OUT', true, 'GZ')}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              min-width="40"
              label="其他"
              align="center"
            >
              <el-table-column
                min-width="40"
                label="報廢"
                align="center"
                sortable="custom"
                prop='SCRAP-TOTAL'
              >
                <!-- <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('SCRAP', true, 'GZ')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="40"
                label="待處理"
                align="center"
                sortable="custom"
                prop='WAITING_HANDLE-TOTAL'
              > -->
                <!-- <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('WAITING_HANDLE', true, 'GZ')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="40"
                label="轉料號"
                align="center"
                sortable="custom"
                prop='SKU_CONVERT_FROM-FROM'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('SKU_CONVERT_FROM ', true, 'GZ')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="40"
                label="盤盈"
                align="center"
                sortable="custom"
                prop='INVENTORY_OVERAGE-OVERAGE'
              >
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('INVENTORY_OVERAGE', true, 'GZ')}}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="40"
                label="盤虧"
                align="center"
                sortable="custom"
                prop='INVENTORY_SHORTAGE-SHORTAGE'
              > -->
                <template slot-scope="scope">
                  <span>{{scope.row.list | filterListItem('INVENTORY_SHORTAGE', true, 'GZ')}}</span>
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
    filterListItem(list, inventoryType, total, warehouse) {
      let obj =
        list.find(item => {
          return (
            item.inventoryType == inventoryType &&
            item.total == total &&
            item.warehouse == warehouse
          );
        }) || {};
      return obj.quantity || "-";
    }
  },
  warehouse,
  data() {
    return {
      isTableLoading: false,
      endDate: "",
      date: [],
      parmas: [],
      fetchCondition: {
        skip: 0,
        limit: 20
      },
      showTotalImg: false,
      btnLoading: false,
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
    handleShowScopeImg(row) {
      row.showImg = !row.showImg;
    },
    handleShowImg() {
      this.btnLoading = true;
      setTimeout(() => {
        this.showTotalImg = !this.showTotalImg;
        this.tableData.forEach(item => {
          item.showImg = this.showTotalImg;
        });
        this.btnLoading = false;
      }, 500);
    },
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
      // this.handleSearch();
    },
    fetchEnd() {
      let data = [];
      _.each(this.originRes, (value, key) => {
        let obj = {};
        obj.sku = key;
        obj.showImg = false;
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
        warehouseList,
        endDate: this.endDate
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

/deep/ .table-warehouse {
  background: #e6f3f7;
}

/deep/ .table-total {
  background: #f0f9eb;
}
</style>
