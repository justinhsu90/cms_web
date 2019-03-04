<template>
    <div v-loading="pageLoadng">
        <h3 class="mb20">文件下載</h3>
        <div class="ml20">
          <el-form ref="form" :model="form" label-width="100px" label-position="right" :rules="rules">
            <el-form-item label="文件類型：" prop="fileType">
                <el-select v-model="form.fileType" placeholder="文件類型">
                    <el-option v-for="(value,item) in fileTypeOption" :key="item" :value="value.fileTypeCode" :label="value.fileTypeName"></el-option>
                </el-select>
            </el-form-item>
            <el-row :span="20">
                <el-col :span="4" v-if="!accountHide.includes(form.fileType)">
                  <el-form-item label="帳號：" prop="account">
                      <el-select v-model="form.account" placeholder="帳號">
                          <el-option v-for="(value,item) in accountOption" :key="item" :value="value.account" :label="value.account"></el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4" v-if="!accountHide.includes(form.fileType)">
                  <el-form-item label="國家：" prop="country">
                      <el-select v-model="form.country" placeholder="國家">
                          <el-option v-for="(value,item) in countryOption" :key="item" :value="value.countryCode" :label="value.countryName"></el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6"  v-if="!accountHide.includes(form.fileType)">
                    <el-form-item label="日期：" prop="date">
                        <el-date-picker class="w-max220" v-model="form.date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="開始日期" end-placeholder="結束日期" :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                  </el-row>
            <el-row :gutter="20">
                <el-col :span="20"  v-if="!accountHide.includes(form.fileType)">
                    <el-form-item label="是否包括：">
                        <el-switch v-model="form.fullDoc"></el-switch>
                        <span class="label-tips pl5">毛利,運費,產品成本,退貨率</span>
                    </el-form-item>
                </el-col>
              </el-row>
            <el-row :gutter="20">
              <el-col :span="4">
                <el-form-item label="生成文件：">
                      <el-button type="success" :loading="loading" size="small" @click="submit">點擊生成文件</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="下載文件：" v-if="url">
                    <a :href="url">點擊下載</a>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
    </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      accountHide: ["CKE_OVERSEA_WAREHOUSE_CREATE_ORDER"],
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
      accountOption: [],
      countryOption: [],
      loading: false,
      pageLoadng: true,
      url: "",
      rules: {
        fileType: {
          required: true,
          message: "此項必填"
        },
        account: {
          required: true,
          message: "此項必填"
        },
        country: {
          required: true,
          message: "此項必填"
        },
        date: {
          required: true,
          message: "此項必填"
        }
      },
      form: {
        fileType: "",
        account: "",
        country: "",
        date: "",
        fullDoc: false
      }
    };
  },
  created() {
    let filetype = axios({
      url: "excel/download/value/filetype",
      method: "post",
      data: {
        token: this.token
      }
    }).then(res => {
      this.fileTypeOption = _.cloneDeep(res);
    });
    let account = axios({
      url: "wowcher/value/account",
      method: "post",
      data: {
        token: this.token
      }
    }).then(res => {
      this.accountOption = _.cloneDeep(res.data);
    });
    let country = axios({
      url: "wowcher/value/country",
      method: "post",
      data: {
        token: this.token
      }
    }).then(res => {
      this.countryOption = _.cloneDeep(res.data);
    });
    Promise.all([filetype, account, country]).then(() => {
      this.pageLoadng = false;
    });
  },
  methods: {
    getValue() {
      let _form = _.cloneDeep(this.form);
      _form.startDate = moment(_form.date[0]).format("YYYY-MM-DD");
      _form.endDate = moment(_form.date[1]).format("YYYY-MM-DD");

      delete _form.date;

      if (this.accountHide.includes(_form.fileType)) {
        _form = {
          fileType: _form.fileType,
          account: "",
          country: "",
          endDate: "",
          fullDoc: false,
          startDate: ""
        };
      }
      console.log(_form);
      return {
        token: this.token,
        ..._form
      };
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          axios({
            url: "excel/download/get",
            method: "post",
            data: this.getValue()
          }).then(
            res => {
              this.$message.success("獲取成功");
              this.loading = false;
              this.url = res;
            },
            () => {
              this.$message.error("獲取失败");
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
a {
  color: #45a2ff;
}
</style>
