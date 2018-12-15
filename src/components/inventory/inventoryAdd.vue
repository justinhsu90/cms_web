<template>
    <div class="p20"> 
    <div>
      <i class="el-icon-arrow-left"></i>
      <a href="javascript:void(0)" @click="goBack">返回</a>
    </div>
    <br>
    <h2>新增清單</h2>
    <br> 
     <el-form ref="form" :model="form">
         <el-row :gutter="20">
             <el-col :span="6">
        <el-form-item label="sku" :rules='rules'>
              <el-input v-model="form.sku">
              </el-input>
        </el-form-item>       
        </el-col>
             <el-col :span="6">
        <el-form-item label="quantity" :rules='rules'>
              <el-input v-model="form.quantity">
              </el-input>
        </el-form-item>       
        </el-col>
             <el-col :span="6">
        <el-form-item label="inventoryType" :rules='rules'>
              <el-select placeholder="類型" v-model="form.inventoryType"  clearable>
                        <el-option v-for="(v,i) in inventoryTypeOption" :key="i" :label="v.inventoryTypeName" :value="v.inventoryType"></el-option>
                    </el-select>
        </el-form-item>       
        </el-col>
             <el-col :span="6">
        <el-form-item label="datetime" :rules='rules'>
                      <el-date-picker
                      clearable
      v-model="form.datetime"
      type="date"
      value-format="yyyy-MM-dd" 
      placeholder="选择日期">
    </el-date-picker>
        </el-form-item>       
        </el-col>
             <el-col :span="6">
        <el-form-item label="moveTo">
              <el-input v-model="form.moveTo">
              </el-input>
        </el-form-item>       
        </el-col>
             <el-col :span="6">
        <el-form-item label="moveFrom">
              <el-input v-model="form.moveFrom">
              </el-input>
        </el-form-item>       
        </el-col>
             <el-col :span="6">
        <el-form-item label="platform">
              <el-input v-model="form.platform">
              </el-input>
        </el-form-item>       
        </el-col>
             <el-col :span="6">
        <el-form-item label="account">
              <el-input v-model="form.account">
              </el-input>
        </el-form-item>       
        </el-col>
             <el-col :span="6">
        <el-form-item label="warehouse">
              <el-select placeholder="商品" v-model="form.warehouse"  clearable>
                        <el-option v-for="(v,i) in warehouseOption" :key="'merge'+i" :label="v.inventoryTypeName" :value="v.inventoryType"></el-option>
                </el-select>
        </el-form-item>       
        </el-col>
        </el-row>
        <br>
        <el-form-item>
                <el-button @click="submit"  :loading="submitLoading" type="primary" size="mediumn">新增</el-button> 
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
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          axios({
            url: "inventory/change/add",
            method: "post",
            data: {
              token: this.token,
              ...this.form
            }
          }).then(() => {
            this.submitLoading = false;
            this.$message.success("添加成功");
            this.goBack();
          });
        }
      });
    }
  },
  mounted() {
    let type = axios({
      url: "/inventory/change/value/inventoryType",
      method: "post",
      data: {
        token: this.token
      }
    });
    let warehouse = axios({
      url: "/inventory/change/value/warehouse",
      method: "post",
      data: {
        token: this.token
      }
    });
    Promise.all([type, warehouse]).then(([type, warehouse]) => {
      this.warehouseOption = _.cloneDeep(warehouse);
      this.inventoryTypeOption = _.cloneDeep(type);
    });
  },
  data() {
    return {
      rules: {
        required: true,
        message: "此項必填"
      },
      inventoryTypeOption: [],
      warehouseOption: [],
      selectOption: [],
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
        sku: "",
        quantity: "",
        inventoryType: "",
        datetime: "",
        moveTo: "",
        moveFrom: "",
        platform: "",
        account: "",
        warehouse: ""
      },
      submitLoading: false
    };
  },

  created() {
    axios({
      url: "/script/value/scriptList",
      method: "post",
      data: {
        token: this.token
      }
    }).then(res => {
      this.selectOption = _.cloneDeep(res);
    });
  }
};
</script>

<style scoped lang="scss">
a {
  color: #45a2ff;
}
/deep/ .el-icon-arrow-left {
  color: #45a2ff;
}
/deep/ .el-form-item {
  margin-bottom: 5px;
}
</style>
