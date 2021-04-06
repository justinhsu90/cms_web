<template>
  <div>
    <!-- <div class="fr">
      <el-button
        size="small"
        type="primary"
        :loading="btnLoaidng"
        @click="handleShowQuestion"
      >
        Send Inquery
      </el-button>
    </div> -->
    <el-table
      ref="wonTable"
      :data="tableData"
      v-loading="loading"
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
          <el-form
            v-for="(v, i) in 1"
            :key="i"
            ref="form"
            :model="{
            quantity: scope.row.quantity
          }"
            :rules="{
            quantity: {
              required: true,
              message: 'required'
            }
          }"
          >
            <el-form-item
              class="el-form-item"
              prop="quantity"
            >
              <el-input v-model="scope.row.quantity"></el-input>
            </el-form-item>
          </el-form>
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
      loading: false
    };
  },
  methods: {
    handleShowQuestion(resolve, reject) {
      let that = this;
      let error = false;
      this.tableData.map(item => {
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
        this.$message.error("Please select goods");
        return;
      }
      if (error) {
        this.$message.error("Please fill out the");
        return;
      }
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
                    that.handleSendInquery(resolve, reject);
                  }
                }
              }
            );
          } else {
            this.handleSendInquery(resolve, reject);
          }
        })
        .finally(() => {});
    },
    handleSendInquery(resolve, reject) {
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
        this.$message.error("Please select goods");
        return;
      }
      if (error) {
        this.$message.error("Please fill out the");
        return;
      }
      axios({
        url: "/productselection/submit",
        method: "post",
        data: {
          productList: JSON.stringify(data)
        }
      }).then(resolve, reject);
    },
    async submit() {
      let isValid = true;
      this.$refs["form"] &&
        this.$refs["form"].forEach(form => {
          form.validate(vaild => {
            if (!vaild) {
              isValid = false;
            }
          });
        });
      if (!isValid) {
        return Promise.reject();
      }
      let p = new Promise((res, rej) => {
        this.handleShowQuestion(res, rej);
      }).finally(() => {});
      return p;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0px !important;
}
</style>
