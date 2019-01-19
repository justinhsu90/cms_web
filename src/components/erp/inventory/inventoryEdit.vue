<template>
  <div class="p20">
    <div class="goBack">
      <i class="el-icon-arrow-left"></i>
      <a
        href="javascript:void(0)"
        @click="goBack"
      >返回</a>
    </div>
    <br>
    <h2>編輯清單</h2>
    <br>
    <el-form
      ref="form"
      :model="form"
    >
      <template v-for="(v,i) in form.data">
        <el-card
          class="relative mb20"
          :key="i"
        >
          <span
            class="absolute"
            style="top:2px;left:10px;"
          >{{i+1}}.</span>
          <el-button
            @click="handleRemove(i)"
            :disabled="form.data.length == 1"
            type="text"
            icon="el-icon-close"
            class="absolute"
            style="top:0px;right:10px;"
          ></el-button>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item
                label="Sku"
                :rules='rules'
                :prop="'data.'+ i + '.sku'"
              >
                <el-input v-model="v.sku">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="数量"
                :rules='rules'
                :prop="'data.'+ i + '.quantity'"
              >
                <el-input v-model="v.quantity">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="inventoryType"
                :rules='rules'
                :prop="'data.'+ i + '.inventoryType'"
              >
                <el-select
                  placeholder="類型"
                  v-model="v.inventoryType"
                  clearable
                  class="w100"
                >
                  <el-option
                    v-for="(v,i) in inventoryTypeOption"
                    :key="i"
                    :label="v.inventoryTypeName"
                    :value="v.inventoryType"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="時間"
                :rules='rules'
                :prop="'data.'+ i + '.datetime'"
              >
                <el-date-picker
                  clearable
                  v-model="v.datetime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  class="w100"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="moveTo"
                v-if="showColumnTwo.includes(v.inventoryType)"
              >
                <el-input v-model="v.moveTo">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="moveFrom"
                v-if="showColumnTwo.includes(v.inventoryType)"
              >
                <el-input v-model="v.moveFrom">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="6"
              v-if="showColumnOne.includes(v.inventoryType) || showColumnThree.includes(v.inventoryType) || showColumnTwo.includes(v.inventoryType)"
            >
              <el-form-item label="平台">
                <el-input v-model="v.platform">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="賬號"
                v-if="showColumnOne.includes(v.inventoryType) || showColumnThree.includes(v.inventoryType) || showColumnTwo.includes(v.inventoryType)"
              >
                <el-input v-model="v.account">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="收樣方"
                v-if="showColumnThree.includes(v.inventoryType)"
              >
                <el-select
                  placeholder="收樣方"
                  v-model="v.sampleTo"
                  clearable
                  class="w100"
                >
                  <el-option
                    v-for="(v,i) in sampleToOption"
                    :key="'smaple'+i"
                    :value="v.managerName"
                    style="width:450px;"
                  >
                    <div class="w45 ibbox">
                      經理名稱:{{v.managerName}}
                    </div>
                    <div class="w30 ibbox">
                      平台:{{ v.platform }}
                    </div>
                    <div class="w15 ibbox">
                      賬號:{{ v.account }}
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="6"
              v-if="showColumnOne.includes(v.inventoryType) || showColumnThree.includes(v.inventoryType)"
            >
              <el-form-item label="倉庫">
                <el-select
                  placeholder="倉庫"
                  v-model="form.warehouse"
                  clearable
                  class="w100"
                >
                  <el-option
                    v-for="(v,i) in warehouseOption"
                    :key="i"
                    :label="v"
                    :value="v"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </template>
      <el-form-item>
        <el-button
          @click="submit"
          :loading="submitLoading"
          type="primary"
          size="mediumn"
        >編輯</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.push("inventoryList");
    },
    handleRemove(i) {
      this.form.data.splice(i, 1);
    },
    handleAdd() {
      this.form.data.push({
        sku: "",
        quantity: "",
        inventoryType: "INVENTORY_SHORTAGE",
        datetime: "",
        moveTo: "",
        moveFrom: "",
        platform: "",
        account: "",
        warehouse: "",
        sampleTo: ""
      });
    },
    getValue() {
      let data = _.cloneDeep(this.form.data);
      return {
        token: this.token,
        value: JSON.stringify({ data })
      };
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          axios({
            url: "erp/inventoryChange/update",
            method: "post",
            data: this.getValue()
          }).then(() => {
            this.submitLoading = false;
            this.$message.success("編輯成功");
            this.goBack();
          });
        }
      });
    }
  },
  mounted() {
    let type = axios({
      url: "/erp/inventoryChange/value/inventoryType",
      method: "post",
      data: {
        token: this.token
      }
    });
    let warehouse = axios({
      url: "/erp/inventoryChange/value/warehouse",
      method: "post",
      data: {
        token: this.token
      }
    });
    let sampleTo = axios({
      url: "/erp/inventoryChange/value/manager",
      method: "post",
      data: {
        token: this.token
      }
    });
    Promise.all([type, warehouse, sampleTo]).then(
      ([type, warehouse, sampleTo]) => {
        this.sampleToOption = sampleTo;
        this.warehouseOption = _.cloneDeep(warehouse);
        this.inventoryTypeOption = _.cloneDeep(type);
        let inventoryData = this.inventoryTypeOption.slice(0, 3);
        inventoryData.push(this.inventoryTypeOption.slice(-1)[0]);
        this.inventoryTypeOption = inventoryData;
        let value = JSON.parse(this.$route.query.value);
        this.form.data[0] = _.cloneDeep(value);
        this.form.data[0].sku = value.sku;
        this.form.data[0].quantity = value.quantity;
        this.form.data[0].inventoryType = value.inventoryType;
        this.form.data[0].datetime = value.datetime;
        this.form.data[0].moveTo = value.moveTo;
        this.form.data[0].moveFrom = value.moveFrom;
        this.form.data[0].platform = value.platform;
        this.form.data[0].account = value.account;
        this.form.data[0].warehouse = value.warehouse;
        this.form.data[0].sampleTo = value.sampleTo;
        this.form.data[0].inventoryChangeId = value.inventoryChangeId;
      }
    );
  },
  data() {
    return {
      rules: {
        required: true,
        message: "此項必填"
      },
      showColumnOne: ["INVENTORY_SHORTAGE", "INVENTORY_OVERAGE"],
      showColumnTwo: ["TRANSFER"],
      showColumnThree: ["SAMPLE_OUT"],
      inventoryTypeOption: [],
      warehouseOption: [],
      sampleToOption: [],
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
      form: {
        data: [
          {
            sku: "",
            quantity: "",
            inventoryType: "INVENTORY_SHORTAGE",
            datetime: "",
            moveTo: "",
            moveFrom: "",
            platform: "",
            account: "",
            warehouse: "",
            sampleTo: ""
          }
        ]
      },
      submitLoading: false
    };
  }
};
</script>

<style scoped lang="scss">
/deep/ .el-form-item {
  margin-bottom: 5px;
}
</style>
