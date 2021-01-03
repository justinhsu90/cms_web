<template>
  <div>
    <el-form
      v-if="initforms"
      ref="form"
      :model="form"
      label-width="100px"
      label-position="right"
      :rules="formRules"
      label-suffix="："
    >
      <el-row :gutter="20">
        <el-col
          :span="12"
          v-for="(item, index) in jsonform"
          :key="index"
        >
          <el-form-item
            :label="item.columnName"
            :prop="`${item.columnCode}-${item.format}`"
          >
            <el-date-picker
              v-model="form[`${item.columnCode}-${item.format}`]"
              align="right"
              type="date"
              placeholder="選擇日期"
              v-if="item.format == 'datetime'"
              :picker-options="singlepickerOptions"
            >
            </el-date-picker>
            <el-date-picker
              v-if="item.format == 'datetimes'"
              v-model="form[`${item.columnCode}-${item.format}`]"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="開始日期"
              end-placeholder="結束日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
            <el-select
              v-model="form[`${item.columnCode}-${item.format}`]"
              v-if="item.format == 'dropdown'"
            >
              <el-option
                v-for="(value,item) in item.datas"
                :key="item"
                :value="value.value"
                :label="value.label"
              ></el-option>
            </el-select>
            <el-switch
              v-if="item.format == 'switch'"
              v-model="form[`${item.columnCode}-${item.format}`]"
            ></el-switch>
            <el-input
              class="w-max200"
              v-if="item.format == 'text'"
              v-model="form[`${item.columnCode}-${item.format}`]"
            ></el-input>
            <el-input
              class="w-max200"
              v-if="item.format == 'int'"
              v-model="form[`${item.columnCode}-${item.format}`]"
            ></el-input>
            <span
              v-if="item.columnHint"
              class="label-tips pl5"
            >{{ item.columnHint }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import lIsEmpty from "lodash/isEmpty";
import lget from "lodash/get";
export default {
  props: ["jsonform"],
  data() {
    return {
      initforms: false,
      forms: {},
      form: {},
      formRules: {},
      singlepickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
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
      }
    };
  },
  methods: {
    submit() {
      let isValid = false;
      this.$refs["form"].validate(valid => {
        if (valid) {
          isValid = true;
        }
      });
      if (!isValid) return {};
      else return this.form;
    }
  },
  created() {
    let collectionP = [];
    this.forms = this.jsonform;
    this.jsonform.forEach(item => {
      // 收集请求
      if (item.source) {
        let p = axios({
          url: item.source,
          method: "post",
          data: {}
        });
        collectionP.push(p);
      }
      // 记录form
      this.$set(
        this.form,
        `${item.columnCode}-${item.format}`,
        item.defaultValue
      );
      this.formRules[`${item.columnCode}-${item.format}`] = {
        required: true,
        message: "此項必填"
      };
    });
    if (!lIsEmpty(collectionP)) {
      Promise.all(collectionP).then(res => {
        if (!lIsEmpty(res)) {
          this.forms = this.jsonform.map(item => {
            if (item.source) {
              item.datas = lget(res.splice(0, 1), "0.data", []).map(citem => {
                return {
                  label: citem.label,
                  value: citem.value
                };
              });
            }
            return item;
          });
        }
        this.initforms = true;
      });
    } else {
      this.initforms = true;
    }
  }
};
</script>

<style>
</style>
