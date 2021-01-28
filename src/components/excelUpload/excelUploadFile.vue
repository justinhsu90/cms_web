<template>
  <div id="excelUpload">
    <div style="padding:20px">
      <div class="heade">
        <i class="el-icon-arrow-left"></i>
        <a
          href="javascript:void(0)"
          @click="goBack"
        >返回</a>
      </div>
      <br>
      <el-row>
        <el-form
          ref="form"
          :model="form"
          label-position="right"
        >
          <el-form-item label="上傳文件">
            <template slot="label">
              <span>上傳文件</span>
              <!-- <span class="f-12 label-tips">可以選擇多個文件</span> -->
            </template>
            <el-button
              size="small"
              type="success"
              :disabled="!!files.length"
              @click="handleUpload"
            >點擊上傳</el-button>
          </el-form-item>
          <!-- <el-form-item label="檔案類型全選">
            <el-select
              placeholder="檔案類型"
              v-model="typeAll"
              clearable
              @change="handleSelectAll"
            >
              <el-option
                v-for="(v,i) in searchFiletypeOption"
                :key="'acc'+i"
                :label="v.name"
                :value="v.code"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <div style="width:80%;margin-top:10px">
              <el-table :data="files">
                <el-table-column
                  label="文件名"
                  min-width="100"
                  prop="name"
                ></el-table-column>
                <el-table-column
                  label="檔案大小"
                  prop="size"
                  width="200"
                >
                  <template slot-scope="scope">
                    {{(scope.row.size/1024).toFixed(2)}}&nbsp;KB
                  </template>
                </el-table-column>
                <el-table-column
                  label="檔案類型"
                  prop="size"
                  width="200"
                >
                  <template slot-scope="scope">
                    <el-form
                      v-for="v in [1]"
                      ref="formChild"
                      :model="type"
                      :key="v"
                    >
                      <el-form-item
                        :prop="scope.$index + ''"
                        :rules="{required:true,message:'此項必填'}"
                      >
                        <el-select
                          placeholder="檔案類型"
                          v-model="type[scope.$index]"
                          clearable
                        >
                          <el-option
                            v-for="(v,i) in searchFiletypeOption"
                            :key="'acc'+i"
                            :label="v.name"
                            :value="v.code"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  width="80"
                  label="操作"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-button
                      class="btnh"
                      type="text"
                      title="下載"
                      icon="el-icon-won-22"
                      @click="handleDelete(scope)"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
          <!-- <el-form-item>
            <div
              class="progress-container mb40"
              v-if="!!progressFiles.length"
            >
              <span class="progress-title">文件上傳進度</span>
              <template v-for="(v, i) in progressFiles">
                <div
                  class="progress-item"
                  :key="v.name + i"
                >
                  <span class="progress-item__text">{{ i + 1 }}. {{ v.name }}</span>
                  <el-progress :percentage="v.percentage"></el-progress>
                </div>
              </template>
            </div>
          </el-form-item> -->
          <el-form-item v-if="!!url && typeAll == 'WOWCHER_ORDER_UNPAID_LIST'">
            <el-button
              type="success"
              size="small"
              @click="saveFile(url, '文件')"
            >
              點擊下載
            </el-button>
          </el-form-item>
        </el-form>
        <div
          class="custom-mask"
          v-if="showMask"
        >
          <template v-if="showProgress">
            <el-progress
              v-for="(v,i) in progressFiles"
              :key="i"
              type="circle"
              :percentage="v.percentage"
              :width="250"
            ></el-progress>
          </template>
          <span
            v-else
            class="custom-label-tips"
          >匯入中, 請稍候...</span>
        </div>
        <el-button
          @click="submit"
          :loading="isLoading"
          type="primary"
          size="large"
        >匯入</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import U from "@/common/until/U";
import saveFile from "won-service/_mixins/save-file";
import copy from "won-service/_mixins/copy";

export default {
  mixins: [saveFile, copy],
  data() {
    return {
      url: "",
      Div: U.Math.Div,
      Mul: U.Math.Mul,
      form: {},
      formChild: {},
      files: [],
      progressFiles: [],
      isLoading: false,
      isEmpty: _.isEmpty,
      searchFiletypeOption: [],
      type: {},
      typeAll: "",
      showMask: false,
      showProgress: false
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
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    handleSelectAll(value) {
      this.url = "";
      _.each(this.type, (v, k) => {
        this.type[k] = value;
      });
    },
    handleUpload() {
      let input = document.createElement("input");
      input.type = "file";
      input.multiple = "multiple";
      input.click();
      input.addEventListener("change", () => {
        _.each(input.files, v => {
          this.files.push(v);
        });
        this.progressFiles = this.files.map(item => {
          return {
            name: item.name,
            percentage: 0
          };
        });
        _.each(this.files, (value, index) => {
          if (!this.type[index]) {
            this.$set(this.type, index, "");
          }
        });
      });
    },
    handleDelete(scope) {
      this.files.splice(scope.$index, 1);
      this.progressFiles.splice(scope.$index, 1);
      delete this.type[scope.$index];
      let index = 0;
      let obj = {};
      _.each(this.type, v => {
        obj[index] = v;
        index++;
      });
      this.type = obj;
    },
    submit() {
      let h = this.$createElement;
      let _that = this;
      let validate = true;
      if (!this.$refs["formChild"]) {
        this.$message.warning("請上傳文件");
        return;
      }
      _.each(this.$refs["formChild"], v => {
        if (!validate) return;
        v.validate(valid => {
          if (!valid) {
            validate = false;
          }
        });
      });

      if (!validate && !!this.files.length) {
        return;
      }
      _.each(this.files, (v, i) => {
        let formData = new FormData();
        formData.append("token", this.token);
        formData.append("uploadfile", v);
        formData.append("filetype", this.type[i]);
        this.showMask = true;
        this.showProgress = true;
        axios({
          url: "/excel/upload/add",
          method: "post",
          data: formData,
          headers: {
            "Content-type": "multipart/form-data"
          },
          isFormData: true,
          onUploadProgress: progressEvent => {
            var complete =
              ((progressEvent.loaded / progressEvent.total) * 100) | 0;
            this.progressFiles = this.progressFiles.map((item, index) => {
              if (i == index) {
                return {
                  ...item,
                  percentage: complete
                };
              }
              return item;
            });
          }
        })
          .then(
            res => {
              setTimeout(() => {
                this.showProgress = false;
                setTimeout(() => {
                  this.showMask = false;
                  this.showProgress = false;
                  if (!res) {
                    _that.$router.push("excelUpload");
                    _that.Bus.$emit("refresh");
                    return;
                  }
                  this.$confirm("", "", {
                    message: h(
                      "div",
                      {
                        style: "text-align: center;"
                      },
                      [
                        h(
                          "div",
                          {
                            style: "color: #45a2ff; cursor: pointer;",
                            on: {
                              click: e => {
                                _that.copy(_that, res, e);
                              }
                            }
                          },
                          "點擊複製連結"
                        )
                      ]
                    ),
                    confirmButtonText: "確定",
                    showCancelButton: false,
                    beforeClose(action, instance, done) {
                      if (action == "confirm") {
                        _that.$router.push("excelUpload");
                        _that.Bus.$emit("refresh");
                        done();
                      } else {
                        done();
                      }
                    }
                  }).catch(() => {});
                }, 1000);
              }, 1000);
            },
            () => {
              this.$message.error("上传失敗");
            }
          )
          .finally(() => {});
      });
    }
  }
};
</script>

<style scoped lang="scss">
#excelUpload .heade {
  font-size: 16px;
  color: #45a2ff;
}
#excelUpload .heade a {
  color: #45a2ff;
}
#excelUpload {
  .el-button--text {
    color: #606266;
  }
}
.progress-container {
  width: 500px;
  .progress-title {
    color: #606266;
    font-size: 13px;
  }
  .progress-item {
    .progress-item__text {
      color: #606266;
      font-size: 13px;
    }
  }
}
.f-12 {
  font-size: 12px;
}
/deep/ .el-form-item .el-form-item {
  margin-bottom: 18px;
  margin-top: 16px;
}

.custom-mask {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: #000;
  opacity: 0.5;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-label-tips {
  color: white;
}
</style>
