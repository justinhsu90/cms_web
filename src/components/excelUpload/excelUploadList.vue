<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-input
          class="w-max200 ibbox"
          placeholder="搜索"
          v-model="fetchOption.where"
          @keyup.enter.native="handleSearch"
        >
        </el-input>
        <el-select
          class="w-max150"
          placeholder="文件類型"
          v-model="searchFileType"
          @change="handleCondition('file')"
          clearable
        >
          <el-option
            v-for="(v,i) in searchFiletypeOption"
            :key="'acc'+i"
            :label="v.name"
            :value="v.code"
          ></el-option>
        </el-select>
        <div
          @click="handleSearch"
          class="el-input-group__append search"
        >
          <i class="el-icon-search"></i>
        </div>
      </el-col>
      <el-col :span="12">
        <el-button
          style="float:right"
          type="primary"
          @click="handleUpload"
          size="small"
        >上傳文件</el-button>
        <el-button
          style="float:right"
          type="primary"
          @click="handleDownLoadAll"
          size="small"
          class="mr5"
        >模板下載</el-button>
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
            min-width="80"
            label="File ID"
            prop="fileId"
          >
          </el-table-column>
          <el-table-column
            min-width="100"
            label="文件名稱"
            prop="fileName"
          >
          </el-table-column>
          <el-table-column
            min-width="80"
            label="文件類型"
            prop="fileType"
          >
          </el-table-column>

          <el-table-column
            min-width="80"
            label="加入"
            prop="addedBy"
          >
          </el-table-column>
          <!-- <el-table-column min-width="80" label="fileUrl" prop="fileUrl">
              <template slot-scope="scope">
                  <img :src="scope.row.fileUrl" alt="" style="width:80px">
              </template>
          </el-table-column> -->
          <!-- <el-table-column min-width="80" label="匯入狀態" prop="uploadStatus"> -->
          <!-- </el-table-column> -->
          <el-table-column
            min-width="80"
            label="加入時間"
            prop="addedTime"
            :formatter="formatToTime"
          >
          </el-table-column>
          <el-table-column
            min-width="80"
            label="最夠更新時間"
            prop="lastUpdatedTime"
            :formatter="formatToTime"
          >
          </el-table-column>
          <el-table-column
            width="80"
            label="下載文件"
            fixed="right"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                class="btnh"
                type="text"
                title="下載"
                icon="el-icon-won-102"
                @click="handleDown(scope.row)"
              ></el-button>
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
      <div style="float:right;margin-top:5px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total='total'
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :layout="layout"
        >
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
import showDialog from "won-service/component/won-dialog/dialog";
import ExcelDownAll from "./excelDownAll";
export default {
  extends: wonTableContainer,
  data() {
    return {
      tableData: [],
      condition: [],
      searchFileType: "",
      searchFiletypeOption: [],
      maxHeight: 450,
      isTableLoading: false,
      fetchCondition: {
        skip: 0,
        limit: 20
      },
      fetchOption: {
        url: "/excel/upload/search",
        where: "",
        method: "post"
      }
    };
  },
  created() {
    let filetype = axios({
      url: "/excel/upload/value/filetype",
      method: "post",
      data: {
        token: this.token
      }
    });
    Promise.all([filetype]).then(([filetype]) => {
      this.searchFiletypeOption = _.cloneDeep(filetype);
    });
    this.handleSearch();
    this.Bus.$on("refresh", this.handleSearch);
  },
  methods: {
    handleDelete(row) {
      let _this = this;
      this.$confirm(
        `<div>確定要刪除<div> <div>File ID:${row.fileId}</div> <div>文件名稱:${
          row.fileName
        }</div>`,
        "提示",
        {
          dangerouslyUseHTMLString: true,
          type: "warning",
          beforeClose(action, instance, done) {
            if (action == "confirm") {
              axios({
                url: "/excel/upload/delete",
                method: "post",
                data: {
                  fileId: row.fileId
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
        }
      ).catch(() => {});
    },
    handleCondition(sign) {
      if (sign == "file") {
        if (!this.searchFileType) {
          _.pull(this.condition, "1");
        } else {
          if (!this.condition.includes("1")) {
            this.condition.push("1");
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
      if (this.condition.includes("1")) {
        data.type = this.searchFileType;
      }
      axios({
        url: this.fetchOption.url,
        method: this.fetchOption.method,
        data
      }).then(({ data, count }) => {
        this.isTableLoading = false;
        this.tableData = _.cloneDeep(data);
        this.total = count;
      });
    }, 500),
    handleUpload() {
      this.$router.push({
        name: "addUpload"
      });
    },
    handleDown(row) {
      this.saveFile(row.fileUrl, row.fileName);
    },
    handleDownLoadAll() {
      showDialog(ExcelDownAll, {
        title: "模板下載",
        width: "40%"
      });
    }
  }
};
</script>

<style scoped>
.el-table th {
  color: #62717e;
  background: rgb(237, 241, 245);
  text-align: center;
}
</style>
