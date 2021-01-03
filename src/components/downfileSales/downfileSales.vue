<template>
  <div v-loading="pageLoadng">
    <h3 class="mb20">文件下載</h3>
    <div class="ml20">
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        label-position="right"
        :rules="rules"
      >
        <el-form-item
          label="文件類型："
          prop="fileType"
        >
          <el-select
            class="w30"
            v-model="form.fileType"
            placeholder="文件類型"
            @change="handleSelect"
          >
            <el-option
              v-for="(value,item) in fileTypeOption"
              :key="item"
              :value="value.fileTypeCode"
              :label="value.fileTypeName"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-row :span="20">
          <el-col
            :span="4"
            v-if="accountShow.includes(form.fileType)"
          >
            <el-form-item
              label="帳號："
              prop="account"
            >
              <el-select
                v-model="form.account"
                placeholder="帳號"
              >
                <el-option
                  v-for="(value,item) in accountOption"
                  :key="item"
                  :value="value.account"
                  :label="value.account"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="4"
            v-if="accountShow.includes(form.fileType)"
          >
            <el-form-item
              label="國家："
              prop="country"
            >
              <el-select
                v-model="form.country"
                placeholder="國家"
              >
                <el-option
                  v-for="(value,item) in countryOption"
                  :key="item"
                  :value="value.countryCode"
                  :label="value.countryName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="6"
            v-if="accountShow.includes(form.fileType)"
          >
            <el-form-item
              label="日期："
              prop="date"
            >
              <el-date-picker
                class="w-max220"
                v-model="form.date"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="開始日期"
                end-placeholder="結束日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col
            :span="20"
            v-if="accountShow.includes(form.fileType)"
          >
            <el-form-item label="是否包括：">
              <el-switch v-model="form.fullDoc"></el-switch>
              <span class="label-tips pl5">毛利,運費,產品成本,退貨率</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
          v-if="(!accountShow.includes(form.fileType) && form.fileType) || selectfileTypeName.includes('做單')"
        >
          <el-col :span="20">
            <el-form-item label="下載全文件：">
              <el-switch v-model="form.fullDocTwo"></el-switch>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="生成文件：">
              <el-button
                type="success"
                :loading="loading"
                size="small"
                @click="submit"
              >點擊生成文件</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              label="下載文件："
              v-if="url && !loading"
            >
              <a :href="url">點擊下載</a>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
      <Jsonform
        v-if="formInit"
        ref="cform"
        :jsonform="jsonForm"
      >
      </Jsonform>
      <el-form
        :model="form"
        label-width="100px"
        label-position="right"
      >
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="生成文件：">
              <el-button
                type="success"
                :loading="loading"
                size="small"
                @click="submit"
              >點擊生成文件</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              label="下載文件："
              v-if="url && !loading"
            >
              <a
                class="link"
                :href="url"
              >點擊下載</a>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- <Jsonform
        ref="cform"
        :jsonform="formData"
      >
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="生成文件：">
              <el-button
                type="success"
                :loading="loading"
                size="small"
                @click="submit"
              >點擊生成文件</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              label="下載文件："
              v-if="url && !loading"
            >
              <a :href="url">點擊下載</a>
            </el-form-item>
          </el-col>
        </el-row>
      </Jsonform> -->
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Jsonform from "./jsonform";
import lget from "lodash/get";
export default {
  components: {
    Jsonform
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      fileTypeOption: [],
      pageLoadng: true,
      loading: false,
      url: "",
      rules: {
        fileType: {
          required: true,
          message: "此項必填"
        }
      },
      showDownBtn: true,
      formInit: false,
      jsonForm: [],
      form: {
        fileType: ""
      }
    };
  },
  watch: {
    form: {
      handler() {
        this.url = "";
      },
      deep: true
    }
  },
  created() {
    axios({
      url: "excel/download/value/filetype",
      method: "post",
      data: {}
    }).then(res => {
      this.fileTypeOption = _.cloneDeep(res);
      this.pageLoadng = false;
    });
  },
  methods: {
    handleSelect(val) {
      let obj =
        this.fileTypeOption.find(item => {
          return item.fileTypeCode == val;
        }) || {};
      this.formInit = false;
      this.jsonForm = lget(obj, "columns", []);
      Promise.resolve().then(() => {
        if (!_.isEmpty(this.jsonForm)) {
          this.formInit = true;
        }
      });
    },
    getValue(data) {
      let _form = {
        fileType: this.form.fileType
      };
      Object.entries(data).map(([key, value]) => {
        let keys = key.split("-");
        if (keys[1] == "datetimes") {
          _form.startDate = moment(value[0]).format("YYYY-MM-DD");
          _form.endDate = moment(value[1]).format("YYYY-MM-DD");
        } else {
          _form[keys[0]] = value;
        }
      });
      return _form;
    },
    submit() {
      let data = {};
      if (this.$refs["cform"]) {
        data = this.$refs["cform"].submit();
        if (_.isEmpty(data)) {
          return;
        }
      }
      data = this.getValue(data);
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          this.pageLoadng = true;
          axios({
            url: "excel/download/get",
            method: "post",
            data
          })
            .then(
              res => {
                this.$message.success("獲取成功");
                this.url = res;
              },
              () => {
                this.$message.error("獲取失败");
              }
            )
            .finally(() => {
              this.loading = false;
              this.pageLoadng = false;
            });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.link {
  color: #45a2ff;
}
</style>
