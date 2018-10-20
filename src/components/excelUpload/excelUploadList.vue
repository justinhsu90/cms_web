<template>
    <div>
        <el-row>
            <el-col :span="22">
                <el-input placeholder="搜索" v-model="fetchOption.where" @keyup.enter.native="handleSearch" style="width:22%;float:left">
                </el-input>
                <div style="margin-left:5px;display:inline-block;width:140px">
                    <el-select placeholder="file" v-model="searchFileType" @change="handleCondition('file')" clearable>
                        <el-option v-for="(v,i) in searchFiletypeOption" :key="'acc'+i" :label="v" :value="v"></el-option>
                    </el-select>
                </div>
                <div style="cursor:pointer;display: inline-block;width: 14px;height: 35px;text-align: center;border: 1px solid #dcdfe6;border-radius: 4px;line-height: 35px;" @click="handleSearch" class="el-input-group__append">
                    <i class="el-icon-search"></i>
                </div>
            </el-col>
            <el-col :span="2">
                <el-button style="float:right" type="primary" @click="handleUpload" size="small">上传文件</el-button>
            </el-col>
            <el-col class="mt5">
                <el-table ref="wonTable" :max-height="maxHeight" :data="tableData" v-loading="isTableLoading" @sort-change="handleSortChange">
                    <el-table-column min-width="80" label="fileId" prop="fileId">
                    </el-table-column>
                    <el-table-column min-width="100" label="fileName" prop="fileName">
                    </el-table-column>
                    <el-table-column min-width="80" label="fileType" prop="fileType">
                    </el-table-column>

                    <el-table-column min-width="80" label="addedBy" prop="addedBy">
                    </el-table-column>
                    <!-- <el-table-column min-width="80" label="fileUrl" prop="fileUrl">
              <template slot-scope="scope">
                  <img :src="scope.row.fileUrl" alt="" style="width:80px">
              </template>
          </el-table-column> -->
                    <el-table-column min-width="80" label="uploadStatus" prop="uploadStatus">
                    </el-table-column>
                    <el-table-column min-width="80" label="addedTime" prop="addedTime" :formatter="formatToTime">
                    </el-table-column>
                    <el-table-column min-width="80" label="lastUpdatedTime" prop="lastUpdatedTime" :formatter="formatToTime">
                    </el-table-column>
                    <el-table-column width="80" label="動作" fixed="right" align="center">
                        <template slot-scope="scope">
                            <el-button class="btnh" type="text" title="下载" icon="el-icon-won-102" @click="handleDown(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <div style="float:right;margin-top:5px">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :total='total' :current-page="currentPage" :page-sizes="pageSizes" :layout="layout">
                </el-pagination>
            </div>
        </el-row>
    </div>
</template>
<script>
import wonTableContainer from "@/common/wonTableContainer";
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
                limit: 15
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
    },
    methods: {
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
           this.saveFile(row.fileUrl,row.fileName)
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
