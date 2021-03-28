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
      :data="tableData"
    >
      <el-table-column
        label="Index"
        prop="Index"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Picture"
        prop="picture"
        width="80"
      >
        <template slot-scope="{ row }">
          <img
            width="50"
            height="50"
            :src="row.snapshotURL"
          >
        </template>
      </el-table-column>
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
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    let tableData = this.data ? this.data : [];
    console.log(tableData, 22);
    return {
      tableData,
      btnLoaidng: false
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
