<template>
  <el-form
    ref="form"
    :model="formData"
    label-position="top"
    :rules='formRules'
  >
    <el-row :gutter="20">
      <el-col :span="5">
        <el-form-item
          class="el-form-left"
          label="箱數："
          prop="packingnumber"
        >
          <el-input v-model.number="formData.packingnumber">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-button
          @click="handleSure"
          type="primary"
          size="small"
        >確定</el-button>
      </el-col>
    </el-row>
    <br>
    <div id="table">
      <table
        cellspacing="0"
        cellpadding="0"
      >
        <colgroup>
          <col width="100">
          <col width="250">
          <col width="40">
          <col
            width="40"
            v-if="arrNumber.length"
          >
          <template v-for="(item, index) in arrNumber">
            <col
              width="80"
              :key="index"
            >
          </template>
        </colgroup>
        <thead>
          <tr>
            <th>FNSKU, EAN</th>
            <th>Sku</th>
            <th>數量</th>
            <th v-if="arrNumber.length">差量</th>
            <template v-for="(item, index) in arrNumber">
              <th :key="index">第{{index + 1}}箱</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(v,i) in formData.itemList"
            :key="i"
          >
            <td>
              <el-form-item label="">
                <span>{{v.fnskuOrEan}}</span>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="">
                <span>{{v.sku}}</span>
              </el-form-item>
            </td>
            <!-- :prop="'itemList.' + `${i}` + '.quantity'"
                    :rules="{
                      required: true,
                      message:'此項必填',
                      type:'number'
                    }" -->
            <td>
              <el-form-item label="">
                <span>{{v.quantity}}</span>
                <!-- <el-input v-model.number="v.quantity"></el-input> -->
              </el-form-item>
            </td>

            <td v-if="arrNumber.length">
              <el-form-item label="">
                <span>{{v.balance}}</span>
              </el-form-item>
            </td>

            <template v-for="(item, index) in arrNumber">
              <td :key="index">
                <el-form-item
                  label=""
                  :prop="'itemList.' + `${i}` + `.packing${index}`"
                  :rules="{
                      required: true,
                      message:'此項必填',
                      type:'number'
                    }"
                >
                  <el-input
                    @blur="handleBlur(i, `packing${index}`)"
                    v-model.number="v[`packing${index}`]"
                  ></el-input>
                </el-form-item>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </el-form>
</template>
<script>
import form from "won-service/_mixins/form";
export default {
  props: ["data"],
  mixins: [form],
  data() {
    let formData = _.cloneDeep(this.data);
    return {
      arrNumber: [],
      formData
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.formRules = {
      packingnumber: {
        required: true,
        message: "此項必填",
        type: "number"
      }
    };
    this.formData.packingnumber = 0;
    this.$watch("formData.packingnumber", this.addpacking);
  },
  methods: {
    handleBlur(i) {
      _.each(this.formData.itemList[i], (value, key) => {
        if (key.startsWith("packing")) {
          // if(/^\d+$/)
        }
      });
    },
    handleSure() {
      if (/^\d+$/.test(this.formData.packingnumber)) {
        this.arrNumber = Array(this.formData.packingnumber).fill(0);
        this.formData.itemList = _.map(this.formData.itemList, item => {
          _.each(this.arrNumber, (itemArr, indexArr) => {
            item[`packing${indexArr + 1}`] = "";
          });
          item.balance = item.quantity;
          return item;
        });
      } else {
        this.$message.error("請在箱數一欄輸入數字");
      }
    },
    addpacking() {},
    goBack() {
      this.$router.push("/shipmentbinning");
    },
    getValue() {
      let data = _.cloneDeep(this.formData);
      return JSON.stringify(data);
    },
    submit() {
      this.$refs["form"].validate(action => {
        if (action) {
          this.popoverVisible = false;
          this.submitLoading = true;
          axios({
            url: "/shipmentPacking/update",
            method: "post",
            data: {
              data: this.getValue()
            }
          }).then(() => {
            this.submitLoading = true;
            this.Bus.$emit("refresh");
            this.goBack();
          });
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
/deep/ .el-form-item {
  margin-bottom: 6px;
}
/deep/ .el-form-item__label {
  padding: 0px !important;
}

.total {
  height: 35px;
  background: #f0f9eb;
  td {
    background: transparent !important;
  }
}
#table {
  overflow: auto;
  table {
    table-layout: fixed;
    width: 100%;
    border-top: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    // max-height: 100px;
    // overflow: auto;
    .btnh {
      padding: 4px 0px;
      color: #62717e;
    }
    .cell {
      padding: 0px;
    }
    /deep/ .el-form-item {
      overflow: hidden;
      margin: 0px;
    }
    /deep/ .el-form-item__content {
      line-height: 25px;
    }
    /deep/ .is-error input {
      background: #f56c6c;
      border-radius: 0%;
    }
    /deep/ .el-input__inner {
      border: none;
      height: 35px;
      text-align: center;
      color: #62717e;
      font-size: 14px;
    }
    th {
      padding: 4px;
      background: #edf1f5;
      text-align: center;
      color: #62717e;
      // border-right: 1px solid #ebeef5;
    }
    td {
      padding: 0px;
      border-top: 1px solid #ebeef5;
      border-right: 1px solid #ebeef5;
      text-align: center;
      background: white;
      color: #62717e;
      font-size: 14px;
    }
  }
}
</style>
