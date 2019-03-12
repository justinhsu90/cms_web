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
        <div
          @click="handleSearch"
          class="el-input-group__append search"
        >
          <i class="el-icon-search"></i>
        </div>
        <div class="ibbox">
          <wonPopoverChooser :chooser="$options.warehouse" @select="handleSelect" :select="select">
              <el-button name="reference" type="success" size="small">選擇倉庫</el-button>
          </wonPopoverChooser>
        </div>
        <div class="fr ml10">
            <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                <!-- <el-table-column width="60" label="單號" prop="inventoryChangeId"></el-table-column>
                <el-table-column width="90" label="類型" prop="inventoryTypeName"></el-table-column>
                <el-table-column min-width="110" label="SKU" prop="sku"></el-table-column>
                <el-table-column min-width="50" max-width="100" label=" 所屬倉庫" prop="warehouse"></el-table-column>
                <el-table-column width="60" label="數量" prop="quantity"></el-table-column>
                <el-table-column width="700" label="產品名稱" prop="productName"></el-table-column> -->
            </el-table>
        </div>
      </el-col>
      <el-col class="mt5">
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
      date: [],
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
  methods: {
    handleSelect(data) {
      this.select = _.cloneDeep(data);
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
      console.log(this.selectOption);
      this.handleSearch();
    },
    handleSearch: _.debounce(function() {
      this.isTableLoading = true;
      let data = {
        where: this.fetchOption.where,
        token: this.token,
        warehouseList: JSON.stringify(this.selectOption)
      };
      this.fetchTableData(data);
    }, 2000)
  }
};
</script>
