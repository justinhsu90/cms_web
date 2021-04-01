<template>
  <div>
    <div class="fr">
      <el-button
        size="small"
        type="primary"
        :loading="btnLoaidng"
        @click="handleShowQuestion"
      >
        Send Inquery
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
            style="cursor:pointer"
            :src="row.snapshotURL"
            @click="row.dialogTableVisible = true"
          >
          <el-dialog
            title="Preview"
            :modal="false"
            :visible.sync="row.dialogTableVisible"
            width="30%"
          >
            <img
              width="100%"
              :src="row.imageURL"
            >
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column
        min-width="80"
        label="ProductName"
        prop="productName"
      ></el-table-column>
      <el-table-column
        width="120"
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
          <el-input
            type="textarea"
            :rows="2"
            v-model="scope.row.requirements"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import showDialog from "won-service/component/won-dialog/dialog";
import ShowQuestion from "./showQuestion";
export default {
  props: ["data"],
  data() {
    let tableData = this.data ? this.data : [];
    return {
      tableData,
      btnLoaidng: false
    };
  },
  methods: {
    handleShowQuestion() {
      let that = this;
      this.btnLoaidng = true;
      axios({
        url: "/productselection/hasquestionnaire",
        method: "POST",
        data: {}
      })
        .then(res => {
          if (!res) {
            showDialog(
              ShowQuestion,
              {
                width: "800px",
                title: "Question"
              },
              {
                submit(res) {
                  if (res) {
                    that.handleSendInquery();
                  }
                }
              }
            );
          } else {
            this.handleSendInquery();
          }
        })
        .finally(() => {
          this.btnLoaidng = false;
        });
    },
    handleSendInquery() {
      let error = false;
      let data = this.tableData.map(item => {
        if (error) {
          return;
        }
        if (!item.quantity) {
          error = true;
        }
        return {
          sku: item.sku,
          quantity: item.quantity,
          requirements: item.requirements
        };
      });
      if (!this.tableData.length) {
        this.$message.error("請選擇商品");
        return;
      }
      if (error) {
        this.$message.error("請填寫");
        return;
      }
      axios({
        url: "/productselection/submit",
        method: "post",
        data: {
          productList: JSON.stringify(data)
        }
      }).then(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
