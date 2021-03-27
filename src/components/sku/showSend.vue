<template>
  <div>
    <div class="fr">
      <el-button
        size="small"
        type="primary"
      >
        send inquery
      </el-button>
    </div>
    <el-table
      ref="wonTable"
      :max-height="maxHeight"
      :data="tableData"
    >
      <el-table-column
        sortable="custom"
        label="Picture"
        prop="picture"
        min-width="180"
      ></el-table-column>
      <el-table-column
        min-width="80"
        label="ProductName"
        prop="productName"
      ></el-table-column>
      <el-table-column
        min-width="80"
        label="Quantity"
        prop="quantity"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.quantity"></el-input>
        </template>

      </el-table-column>
      <el-table-column
        min-width="80"
        label="Requirements"
        prop="requirements"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.requirements"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <won-pagination
      v-bind="paginationProps"
      v-on="paginationListeners"
    >
    </won-pagination>
  </div>
</template>

<script>
import wonTableContainer from "@/common/wonTableContainer";
// v-loading="isTableLoading"
export default {
  extends: wonTableContainer,
  data() {
    return {
      d: "xx",
      tableData: [
        {
          picture: "xxx",
          productName: "xxx",
          quantity: "x",
          requirements: "x"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-dialog__body {
  padding-top: 10px;
}
</style>
